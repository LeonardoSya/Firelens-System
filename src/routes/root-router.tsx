import { createBrowserRouter, } from 'react-router-dom';
import ErrorPage from './error-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>hello</div>,
    errorElement: <ErrorPage />,
    children: [
      {

      }
    ]
  }
])

export default router