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
