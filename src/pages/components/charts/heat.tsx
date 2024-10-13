// import { useEffect, useRef } from 'react'
// import { Scene, HeatmapLayer } from '@antv/l7'
// import { Mapbox } from '@antv/l7-maps'

// const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

// const HeatMap: React.FC = () => {
//   const heatmapRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const scene = new Scene({
//       id: heatmapRef.current,
//       map: new Mapbox({
//         style: 'mapbox://styles/mapbox/dark-v11',
//         center: [120.13383079335335, 29.651873105004427],
//         zoom: 7,
//         pitch: 43,
//         accessToken: token,
//       }),
//       logoVisible: false,
//     })

//     scene.on('loaded', async () => {
//       try {
//         const res = await fetch(
//           'https://gw.alipayobjects.com/os/basement_prod/a1a8158d-6fe3-424b-8e50-694ccf61c4d7.csv',
//         )
//         const data = await res.text()
//         const layer = new HeatmapLayer({})
//           .source(data, {
//             parser: { type: 'csv', x: 'lng', y: 'lat' },
//             transforms: [{ type: 'hexagon', size: 2500, field: 'v', method: 'sum' }],
//           })
//           .size('sum', (sum: number) => sum * 100)
//           .shape('hexagonColumn')
//           .style({ coverage: 0.8, angle: 0 })
//           .color('sum', [
//             '#094D4A',
//             '#146968',
//             '#1D7F7E',
//             '#289899',
//             '#34B6B7',
//             '#4AC5AF',
//             '#5FD3A6',
//             '#7BE39E',
//             '#A1EDB8',
//             '#C3F9CC',
//             '#DEFAC0',
//             '#ECFFB1',
//           ])

//         scene?.addLayer(layer)
//       } catch (error) {
//         console.error('加载数据出错: ', error)
//       }
//     })

//     return () => {
//       // if (sceneRef.current) {
//       //   sceneRef.current.destroy()
//       //   sceneRef.current = null
//       // }
//       scene.destroy()
//     }
//   }, [])

//   return (
//     <div className='flex w-full items-center justify-center'>
//       <div ref={heatmapRef} className='relative h-96 w-full md:h-[30rem] md:w-3/4' />
//     </div>
//   )
// }

// export default HeatMap
