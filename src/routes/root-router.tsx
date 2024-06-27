import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from '@/routes/error-page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div className='font-semibold text-slate-800'>hello</div>,
    errorElement: <ErrorPage />,
    children: [{}],
  },
  {
    path: '*',
    element: <div className='font-semibold text-slate-800'>No Match</div>,
  },
])

export default router
