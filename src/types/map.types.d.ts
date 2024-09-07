import mapboxgl from 'mapbox-gl'

export interface FeatureProperties {
  bright_ti4: number
  scan: number
  track: number
  acq_date: string
  acq_time: number
  satellite: string
  confidence: string
  version: string
  bright_ti5: number
  frp: number
  daynight: string
}

export interface Feature {
  type: 'Feature'
  geometry: {
    geodesic: boolean
    type: 'Point'
    coordinates: [number, number]
  }
  properties: FeatureProperties
}

export interface FeatureCollection {
  type: 'FeatureCollection'
  features: Feature[]
}

export interface FirePoint {
  loc: number[]
  district: string
  frp: number
  bright_ti4: number
  bright_ti5: number
  daynight: boolean
  dateTime: string
  satellite: string
}

export interface MapboxEvent extends mapboxgl.MapMouseEvent {
  features?: Feature[]
}
