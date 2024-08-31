import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import router from '@/routes/root-router'
import { store } from '@/app/store'
import { I18nProvider } from '@/locales/i18n'
import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>
  </Provider>
)
