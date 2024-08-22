import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import mapboxgl from 'mapbox-gl' // @ts-ignore
import GlobeMinimap from 'mapbox-gl-globe-minimap' // @ts-ignore
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { useAppSelector } from '@/app/redux-hooks'
import { selectDayNight } from '@/features/filter-slice'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { features } from 'process'

interface FeatureProperties {
  Bright_ti5: number;
  DayNight: number;
  confidence: number;
  fire_point: number;
  frp: number;
}

interface Feature {
  type: 'Feature';
  geometry: {
    geodesic: boolean,
    type: 'Point' | 'LineString' | 'Polygon',
    coordinates: [number, number],
  };
  id: string;
  properties: FeatureProperties;
}

interface GeoData {
  type: 'FeatureCollection';
  features: Feature[];
  date: string;
  _id: string;
}

const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function MyMap() {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentCoor, setCurrentCoor] = useState([])
  const [currentFrp, setCurrentFrp] = useState(0)
  const [currentIsDay, setCurrentIsDay] = useState(true)
  const [currentBright, setCurrentBright] = useState(0)
  const [currentId, setCurrentId] = useState(0)
  const [style, setStyle] = useState('mapbox://styles/mapbox/standard')
  const date = useAppSelector(state => state.filter.date)
  const dayNight = useAppSelector(selectDayNight)

  // 初始化地图
  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

    if (!mapboxgl.supported()) {
      alert('您的浏览器不支持Mapbox')
      return
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: style,
      center: [116.27, 40],
      zoom: 13,
      pitch: 45,
      attributionControl: false,
    })
    map.current.on('style.load', () => {
      map.current.setConfigProperty('basemap', 'lightPreset', 'dusk')
      map.current.setConfigProperty('basemap', 'show3dObjects', true)
    })

    // 地图加载时 添加地图控件
    map.current.on('load', () => {
      setIsLoaded(true)
      map.current.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
        }),
      )
      map.current.addControl(new mapboxgl.NavigationControl())
      map.current.addControl(new mapboxgl.FullscreenControl())
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
          showAccuracyCircle: false,
        }),
      )
      map.current.addControl(
        new GlobeMinimap({
          landColor: 'rgb(250,250,250)',
          waterColor: 'rgba(3,7,18,.8)',
        }),
        'top-left',
      )
    })

    return () => map.current.remove()
  }, [style])

  // 加载火点数据并处理交互事件
  useEffect(() => {
    if (!map.current || !isLoaded) return

    // 获取数据
    const fetchData = async (
      date: String,
      dayNight: { day: boolean, night: boolean },
    ): Promise<GeoData | null> => {
      try {
        const response = await fetch(`http://localhost:3001/api/mapdata?&date=${date}`)
        let data = await response.json()
        let dataBefore = data[0]

        data = {
          ...dataBefore,
          features: dataBefore.features.filter((feature: { properties: { DayNight: number } }) => {
            const { DayNight } = feature.properties
            const { day, night } = dayNight
            if (day && night) {
              return true
            } else if (day) {
              return DayNight === 100
            } else if (night) {
              return DayNight === 0
            } else {
              return false
            }
          }),
        }

        if (!data.features || !Array.isArray(data.features)) {
          console.error('Invalid data structure:', data)
          return null
        }

        return data
      } catch (error) {
        console.error('Error fetching data:', error)
        return null
      }
    }

    // 渲染数据
    const updateData = async () => {
      const data = await fetchData(date, dayNight)

      if (!data) return

      if (map.current.getSource('firePoints')) {
        // 若数据源已存在，使用setData更新数据
        map.current.getSource('firePoints').setData(data)
      } else {
        // 若不存在，创建新的数据源和图层
        const frpValues = data.features.map(
          (feature: { properties: { frp: number } }) => feature.properties.frp,
        )
        const maxFrp = Math.max(...frpValues)
        const minFrp = Math.min(...frpValues)

        map.current.addSource('firePoints', {
          type: 'geojson',
          data,
        })

        map.current.addLayer({
          id: 'firePointsLayer',
          type: 'circle',
          source: 'firePoints',
          paint: {
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              6,
              ['interpolate', ['linear'], ['get', 'frp'], minFrp, 6, maxFrp, 6 * 2],
              12,
              ['interpolate', ['linear'], ['get', 'frp'], minFrp, 20, maxFrp, 20 * 2],
              17,
              ['interpolate', ['linear'], ['get', 'frp'], minFrp, 150, maxFrp, 150 * 2],
            ],
            'circle-color': '#e20303',
            'circle-blur': 0.4,
            'circle-stroke-color': '#333333',
            'circle-stroke-width': 1,
            'circle-stroke-opacity': 0.7,
            'circle-emissive-strength': 1,
          },
        })

        map.current.on('mouseenter', 'firePointsLayer', () => {
          map.current.getCanvas().style.cursor = 'pointer'
        })
        map.current.on('mouseleave', 'firePointsLayer', () => {
          map.current.getCanvas().style.cursor = ''
        })
        // @ts-ignore
        map.current.on('click', 'firePointsLayer', e => {
          const coordinates = e.features[0].geometry.coordinates.slice()
          setCurrentCoor(coordinates)
          setCurrentFrp(e.features[0].properties.frp / 100)
          setCurrentIsDay(e.features[0].properties.DayNight > 0)
          setCurrentBright(e.features[0].properties.Bright_ti5 / 100)
          setCurrentId(e.features[0].properties.fire_point)

          map.current.flyTo({
            center: coordinates,
            zoom: 9,
            duration: 2000,
            pitch: 30,
          })
        })
      }
    }

    updateData()

    return () => {
      if (map.current) {
        map.current.off('mouseenter', 'firePointsLayer')
        map.current.off('mouseleave', 'firePointsLayer')
        map.current.off('click', 'firePointsLayer')
      }
    }
  }, [date, isLoaded, dayNight])

  return (
    <>
      <AnimatePresence>
        {currentId > 0 && (
          <motion.div
            key={currentId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            className='absolute right-32 top-1/2 z-10 max-w-96 transform rounded-xl bg-white bg-opacity-85 p-6 duration-100 dark:bg-gray-950 dark:bg-opacity-80'
          >
            <div
              onClick={() => setCurrentId(0)}
              className='absolute right-3 top-2 transform cursor-pointer text-gray-900 duration-150 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='h-7 w-auto' viewBox='0 0 512 512'>
                <path
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='32'
                  d='M368 368L144 144M368 144L144 368'
                />
              </svg>
            </div>
            <motion.ul
              variants={containerVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
              className='space-y-1 font-semibold text-gray-950 dark:text-gray-400'
            >
              {[
                `火点编号：${currentId}`,
                `受灾地区：{}`,
                `火点地理坐标：${currentCoor.map(c => c.toFixed(2)).join(', ')}`,
                `火灾亮度值（单位：开尔文）：${currentBright}`,
                `火灾辐射功率（单位：兆瓦）：${currentFrp}`,
                `受灾时段：${currentIsDay ? '白天' : '夜晚'}`,
                `数据来源：VNP14IMGTDL_NRT Daily Raster: VIIRS (S-NPP) Band 375m Active Fire`,
              ].map((item, index) => (
                <motion.li key={index} variants={listItemVariants} transition={{ duration: 0.3 }}>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={mapContainer} className='absolute left-0 h-full w-full' />
    </>
  )
}
