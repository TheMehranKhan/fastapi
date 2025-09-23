import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { AuthProvider } from './hooks/useAuth'
import './index.css'

// Chakra UI
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './chakra'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      {/* Ensure initial color mode matches system preference */}
      <ColorModeScript initialColorMode={theme.config?.initialColorMode} />
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
