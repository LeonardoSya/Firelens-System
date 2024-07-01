import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from '@/routes/error-page'
import HomePage from '@/pages/home-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [{}],
  },
  {
    path: '*',
    element: <div className='font-semibold text-slate-800'>No Match</div>,
  },
])

export default router
