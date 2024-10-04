import { createBrowserRouter, Navigate } from 'react-router-dom'
import Root from '@/pages/root'
import Homepage from '@/pages/homepage'
import MapView from '@/pages/map-view'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Navigate to='/' replace />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: 'map',
        element: <MapView />,
      },
    ],
  },
  {
    path: '*',
    element: <div className='font-semibold text-slate-800'>No Match</div>,
  },
])

export default router
