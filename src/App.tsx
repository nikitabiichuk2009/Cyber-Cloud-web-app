import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { APP_PATHS } from './paths'
import { Layout } from './components/layout'
import { HomePage } from './pages/Home'
import { TermsPage } from './pages/Terms'
import { Oauth } from './pages/Oauth'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path={APP_PATHS.home} element={<Layout />}>
        <Route path={APP_PATHS.home} element={<HomePage />} />
        <Route path={APP_PATHS.connect} element={<Oauth />} />
        <Route path={APP_PATHS.termsAndConditions} element={<TermsPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  )
}

export default App

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
