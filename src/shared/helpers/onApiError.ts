import { isEmpty } from 'lodash'

interface FieldError {
  message: string
}

interface ApiError {
  code: string
  message: string
  httpStatusCode: number
  endpointUrl: string
  context?: Record<string, any>
  originalError?: Record<string, any>
  inputParams?: Record<string, any>
}

interface ToastOptions {
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top' | 'bottom'
  status: 'error' | 'success' | 'info' | 'warning'
  title: string
}

type ToastFunction = (options: ToastOptions) => void

export const onApiError = (error: ApiError, toast: ToastFunction): void => {
  let message: string
  const { code, message: errorMessage, context } = error

  if (code === 'COM-9' && context && !isEmpty(context.fields)) {
    message = context.fields.map((field: FieldError) => field.message).join('\n')
  } else {
    message = errorMessage
  }

  toast({ position: 'top-right', status: 'error', title: message })
}
