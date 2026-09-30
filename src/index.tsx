import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import '@droppy-ui/design-system/styles.css'
import * as serviceWorker from './serviceWorker'

const container = document.querySelector('#root') as HTMLElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
