import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from '@/routes/error-page'
import Root from '@/pages/root'
import Homepage from '@/pages/homepage'
import MapView from '@/pages/map-view'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
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
