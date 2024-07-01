import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { environment } from '../../environments'

interface ErrorResponseData {
  code?: string
  error?: string
  message?: string
}

const HTTP_ERROR_MESSAGES: { [key: number]: string } = {
  400: 'Validation Error',
  401: 'You should be authenticated to be able to see this page',
  403: 'Unauthorized',
  404: 'Not found',
  406: 'Bad request',
}

const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Try again later'

const wrongCredentialsErrors = ['CCI-7', 'CCI-8', 'CCI-9']

const getMessage = (status: number, data: ErrorResponseData): string =>
  data?.error ?? data?.message ?? HTTP_ERROR_MESSAGES[status] ?? DEFAULT_ERROR_MESSAGE

axios.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError<ErrorResponseData>) => {
    if (error.response) {
      const { status, data } = error.response
      if (status === 401) {
        localStorage.removeItem('AUTH_TOKEN')
        if (data.code && wrongCredentialsErrors.includes(data.code)){
          return Promise.reject({
            message: 'Wrong credentials',
          });
        }
        return Promise.reject({
          message: getMessage(status, data),
          error: data,
        })
      }
    }

    if (error.message === 'Network Error') {
      return
    }

    return Promise.reject({
      message: error.message ?? 'Something went wrong',
    })
  }
)

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const url = new URL(environment.BACKEND_URL_SUFFIX, environment.BACKEND_URL)
    config.baseURL = url.href
    const token = localStorage.getItem('AUTH_TOKEN')
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

export default axios
