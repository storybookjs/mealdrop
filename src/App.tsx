import { useEffect } from 'react'
import useDarkMode from 'use-dark-mode'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider as StoreProvider } from 'react-redux'

import { store } from './app-state'
import { AppRoutes } from './Routes'
import { GlobalStyle } from './styles/GlobalStyle'

export default function App() {
  const { value } = useDarkMode(false, { global: globalThis.window })

  // Mirrors the dark-mode toggle onto the root element: data-ds-theme is
  // the attribute both @droppy-ui/design-system's stylesheet and this app's
  // own CSS read for their dark-mode custom properties.
  useEffect(() => {
    document.documentElement.dataset.dsTheme = value ? 'dark' : 'light'
  }, [value])

  return (
    <Router>
      <StoreProvider store={store}>
        <GlobalStyle />
        <AppRoutes />
      </StoreProvider>
    </Router>
  )
}
