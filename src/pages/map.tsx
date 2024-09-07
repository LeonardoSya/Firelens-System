import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { throttle } from 'lodash'
import { format } from 'date-fns'
import mapboxgl from 'mapbox-gl' // @ts-ignore
import GlobeMinimap from 'mapbox-gl-globe-minimap' // @ts-ignore
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder' // @ts-ignore
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding'
import type { FirePoint, MapboxEvent } from '@/types/map.types'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const MyMap: React.FC = () => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false)
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)
  const [firePoint, setFirePoint] = useState<FirePoint | null>(null)
  const [firePointId, setFirePointId] = useState<number>(0)
  const [style, setStyle] = useState<string>('mapbox://styles/mapbox/standard')

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
      zoom: 5,
      // pitch: 45,
      attributionControl: false,
    })
    map.current.on('style.load', () => {
      map.current.setConfigProperty('basemap', 'lightPreset', 'dusk')
      map.current.setConfigProperty('basemap', 'show3dObjects', true)
    })

    // 地图加载时 添加地图控件
    map.current.on('load', () => {
      setIsMapLoaded(true)
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

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  // 监听style更新底图样式
  useEffect(() => {
    if (map.current && isMapLoaded) {
      map.current.setStyle(style)
      map.current.on('style.load', () => {
        map.current.setConfigProperty('basemap', 'lightPreset', 'dusk')
        map.current.setConfigProperty('basemap', 'show3dObjects', true)
      })
    }
  }, [style])

  // 加载火点数据并处理交互事件
  const fetchData = useCallback(async () => {
    try {
      setIsDataLoaded(true)
      if (abortControllerRef.current) {
        abortControllerRef.current.abort() // 拦截上一次请求
      }
      abortControllerRef.current = new AbortController() // 被中断的请求会抛出AbortError

      const bounds = map.current.getBounds()
      const zoom = map.current.getZoom()
      const url = `http://localhost:3001/api/global-48h-data?minLat=${bounds.getSouth()}&maxLat=${bounds.getNorth()}&minLon=${bounds.getWest()}&maxLon=${bounds.getEast()}&zoomLevel=${zoom}`
      const response = await fetch(url, { signal: abortControllerRef.current.signal })
      const data = await response.json()
      if (!data.features || !Array.isArray(data.features)) {
        console.error('Invalid data structure:', data)
        return null
      }
      return data
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request aborted')
      } else {
        console.error('Error fetching data:', error)
      }
      return null
    } finally {
      setIsDataLoaded(false)
    }
  }, [])

  // 渲染火点数据
  const updateData = useCallback(async () => {
    console.log('Updating data...')
    const data = await fetchData()
    if (!data) {
      console.log('No data received')
      return
    }
    console.log('Data received, updating map')
    if (map.current.getSource('firePoints')) {
      // 若数据源已存在，使用setData更新数据
      ;(map.current.getSource('firePoints') as mapboxgl.GeoJSONSource).setData(data)
    } else {
      map.current.addSource('firePoints', {
        type: 'geojson',
        data,
      })
      map.current.addLayer({
        id: 'firePointsLayer',
        type: 'circle',
        source: 'firePoints',
        paint: {
          'circle-radius': 6,
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
      map.current.on('click', 'firePointsLayer', (e: MapboxEvent) => {
        const feature = e.features[0]
        const properties = feature.properties
        const coordinates = feature.geometry.coordinates.slice()

        const acqDate = new Date(properties.acq_date)
        const hours = Math.floor(properties.acq_time / 100)
        const minutes = properties.acq_time % 100
        acqDate.setUTCHours(hours, minutes)
        const dateTime = format(acqDate, 'yyyy-MM-dd HH:mm:ss')

        setFirePoint({
          loc: coordinates,
          district: '',
          frp: properties.frp,
          bright_ti4: properties.bright_ti4,
          bright_ti5: properties.bright_ti5,
          daynight: properties.daynight === 'D',
          dateTime: dateTime,
          satellite: properties.satellite,
        })
        setFirePointId(properties.bright_ti4)
        map.current.flyTo({
          center: coordinates,
          zoom: 9,
          duration: 2000,
          pitch: 30,
        })
      })
    }
  }, [fetchData])

  const updateOnMove = useCallback(
    throttle(() => {
      updateData()
    }, 500),
    [updateData],
  )

  useEffect(() => {
    if (!map.current || !isMapLoaded) return
    updateData()
    map.current.on('moveend', updateOnMove)
    map.current.on('zoomend', updateOnMove)

    return () => {
      if (map.current) {
        map.current.off('moveend', updateOnMove)
        map.current.off('zoomend', updateOnMove)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [isMapLoaded, updateData, updateOnMove])

  useEffect(() => {
    if (map.current && isMapLoaded) {
      updateData()
    }
    if (!map.current || !isMapLoaded) return

    // 当底图样式重新加载时重新渲染数据
    map.current.on('style.load', () => {
      updateData()
    })
  }, [isMapLoaded])

  // 火点逆向地理编码
  useEffect(() => {
    if (!firePoint) return

    const fetchDistrict = async () => {
      try {
        const geocodingClient = mbxGeocoding({
          accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
        })
        const response = await geocodingClient
          .reverseGeocode({
            query: firePoint.loc,
            limit: 1,
            language: ['zh'],
          })
          .send()

        const match = response.body.features[0]
        if (match) {
          const { context = [] } = match
          const getText = (idPart: string) =>
            context.find((c: { id: string | string[] }) => c.id.includes(idPart))?.text || ''
          const country = getText('country')
          const province = getText('region')
          const city = getText('place')
          const locality = getText('locality')
          setFirePoint(prev => ({
            ...prev,
            district: `${country} ${province} ${city}${locality}`,
          }))
        }
      } catch (error) {
        console.error('Reverse Geocoding Error: ', error)
      }
    }

    fetchDistrict()
  }, [firePoint])

  return (
    <>
      {/* 火点信息弹窗 */}
      <AnimatePresence>
        {firePointId !== 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            className='absolute right-32 top-1/2 z-10 max-w-96 transform rounded-xl bg-white bg-opacity-85 p-6 duration-100 dark:bg-gray-950 dark:bg-opacity-80'
          >
            <div
              onClick={() => setFirePointId(0)}
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
                `受灾地区：${firePoint.district}`,
                `火点地理坐标：${firePoint.loc.map(c => c.toFixed(2)).join(', ')}`,
                `火灾ti4通道亮度值（单位：开尔文）：${firePoint.bright_ti4}`,
                `火灾ti5通道亮度值（单位：开尔文）：${firePoint.bright_ti5}`,
                `火灾辐射功率（单位：兆瓦）：${firePoint.frp}`,
                `受灾时间：${firePoint.dateTime}`,
                `受灾时段：${firePoint.daynight ? '白天' : '夜晚'}`,
                `监测卫星：${firePoint.satellite}`,
                `数据来源：VIIRS 375m / S-NPP`,
              ].map((item, index) => (
                <motion.li key={index} variants={listItemVariants} transition={{ duration: 0.3 }}>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 地图 */}
      <div ref={mapContainer} className='absolute left-0 h-full w-full'>
        <div
          className='absolute left-0 top-0 z-10 h-24 w-24 cursor-pointer'
          onClick={() =>
            setStyle(prev =>
              prev === 'mapbox://styles/mapbox/standard'
                ? 'mapbox://styles/mapbox/standard-satellite'
                : 'mapbox://styles/mapbox/standard',
            )
          }
        />
      </div>
      {/* 加载指示器 */}
      {isDataLoaded && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-opacity-50'>
          <div
            style={{
              borderTopColor: 'transparent',
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
            className='h-12 w-12 animate-spin rounded-full border-4 border-orange-700/80'
          />
        </div>
      )}
    </>
  )
}

export default MyMap
