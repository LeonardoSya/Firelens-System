import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl' // @ts-ignore
import GlobeMinimap from 'mapbox-gl-globe-minimap' // @ts-ignore
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

const geojsonUrl = '../../data/Global_VNP14IMGTDL_NRT_FireData_2024-07-14_to_2024-08-14.geojson'

export default function MyMap() {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [currentCoor, setCurrentCoor] = useState([])
  const [currentFrp, setCurrentFrp] = useState(0)
  const [currentIsDay, setCurrentIsDay] = useState(true)
  const [currentBright, setCurrentBright] = useState(0)
  const [currentId, setCurrentId] = useState(0)
  const [style, setStyle] = useState('mapbox://styles/mapbox/standard')

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
      pitch: 67,
      attributionControl: false,
    })

    return () => map.current.remove()
  }, [style])

  // 添加地图控件
  useEffect(() => {
    if (!map.current) return

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
  }, [])

  // 地图样式加载后处理
  useEffect(() => {
    if (!map.current) return

    map.current.on('style.load', () => {
      map.current.setConfigProperty('basemap', 'lightPreset', 'dusk')
      map.current.setConfigProperty('basemap', 'show3dObjects', true)
      map.current.addControl(
        new GlobeMinimap({
          landColor: 'rgb(250,250,250)',
          waterColor: 'rgba(3,7,18,.8)',
        }),
        'top-left',
      )
    })
  }, [])

  // 加载火点数据并处理交互事件
  useEffect(() => {
    if (!map.current) return

    fetch(geojsonUrl)
      .then(response => response.json())
      .then(data => {
        const frpValues = data.features.map(
          (feature: { properties: { frp: number } }) => feature.properties.frp,
        )
        const maxFrp = Math.max(...frpValues)
        const minFrp = Math.min(...frpValues)

        map.current.on('load', () => {
          !map.current.getSource('firePoints') &&
            map.current.addSource('firePoints', {
              type: 'geojson',
              data: data,
            })
          !map.current.getLayer('firePointsLayer') &&
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
                  ['interpolate', ['linear'], ['get', 'frp'], minFrp, 7, maxFrp, 7 * 3],
                  12,
                  ['interpolate', ['linear'], ['get', 'frp'], minFrp, 20, maxFrp, 20 * 3],
                  17,
                  ['interpolate', ['linear'], ['get', 'frp'], minFrp, 150, maxFrp, 150 * 3],
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
              pitch: 45,
            })
          })
        })
      })

    return () => {
      map.current.off('mouseenter', 'firePointsLayer')
      map.current.off('mouseleave', 'firePointsLayer')
      map.current.off('click', 'firePointsLayer')
    }
  }, [])

  useEffect(() => {
    
  }, [currentId])

  return (
    <>
      <div ref={mapContainer} className='absolute left-0 h-full w-full' />
    </>
  )
}
