import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { ReactQueryProvider } from './shared/contexts/react-query-provider'
import { UserContextProvider } from './shared/contexts/user-context-provider'
import { theme } from './theme'
import App from './App'
// import { Buffer } from "buffer";
// import process from "process";

// window.Buffer = Buffer;
// window.process = process;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReactQueryProvider>
        <ChakraProvider theme={theme}>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </ChakraProvider>
      </ReactQueryProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
