export const environment = {
  production: process.env.REACT_APP_PRODUCTION ?? false,
  BACKEND_URL: process.env.REACT_APP_BACKEND,
  NEAR_IS_MAIN_NETWORK: process.env.REACT_APP_NEAR_MAIN_NETWORK === 'true',
  NEAR_AVAILABLE: false,
  BACKEND_URL_SUFFIX: '/api',
}
