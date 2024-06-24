import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { APP_PATHS } from './paths'
import { HomePage } from './pages/Home'
import { TermsPage } from './pages/Terms'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path={APP_PATHS.home} element={<HomePage />} />
      <Route path={APP_PATHS.termsAndConditions} element={<TermsPage />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default App
