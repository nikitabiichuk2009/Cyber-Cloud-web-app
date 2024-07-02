import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
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
        <Route path={APP_PATHS.oauth} element={<Oauth />} />
        <Route path={APP_PATHS.termsAndConditions} element={<TermsPage />} />
        <Route path="*" element={<Navigate to={APP_PATHS.home} />} />
      </Route>
    </Routes>
  )
}

export default App
