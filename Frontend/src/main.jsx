import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/App/index.css'
import { Provider } from 'react-redux'
import App from '../src/App/App.jsx'
import { store } from './App/app.store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App/>
  </Provider>
)
