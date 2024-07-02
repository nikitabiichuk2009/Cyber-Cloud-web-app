export const environment = {
  production: import.meta.env.VITE_REACT_APP_PRODUCTION ?? false,
  BACKEND_URL: import.meta.env.VITE_REACT_APP_BACKEND,
  NEAR_IS_MAIN_NETWORK: import.meta.env.VITE_REACT_APP_NEAR_MAIN_NETWORK === 'true',
  NEAR_AVAILABLE: false,
  BACKEND_URL_SUFFIX: '/api',
}
