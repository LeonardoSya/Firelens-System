import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import GlobeMinimap from 'mapbox-gl-globe-minimap'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

export default function MyMap() {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(116.16)
  const [lat, setLat] = useState(40)
  const [zoom, setZoom] = useState(13)
  const [style, setStyle] = useState('mapbox://styles/mapbox/standard')

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: style,
      center: [lng, lat],
      zoom: zoom,
      pitch: 67,
      attributionControl: false,
    })

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

    map.current.on('style.load', () => {
      map.current.setConfigProperty('basemap', 'lightPreset', 'dusk')
      map.current.setConfigProperty('basemap', 'show3dObjects', true)
      map.current.addControl(
        new GlobeMinimap({
          landColor: 'rgb(250,250,250)',
          waterColor: 'rgba(3,7,18,.8)',
        }),
        'bottom-right',
      )
    })

    return () => map.current.remove()
  }, [])

  return <div ref={mapContainer} className='absolute left-0 h-[calc(100%-8rem)] w-full' />
}
