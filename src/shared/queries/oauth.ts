import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'
import { useToast } from '@chakra-ui/react'
import { AxiosError } from 'axios'

import { QueriesKeysEnum } from './queries-keys-enum'
import axios from '../api/setup'

export interface AuthUrlResponse {
  authUrl: string
}

export interface AuthUrlCallbackResponse {
  userInfo: object
  user: object
}

export const useAppleAuth = (options?: any): UseQueryResult<AuthUrlResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlResponse, AxiosError>(
    QueriesKeysEnum.appleAuth,
    () => axios.get<any, AuthUrlResponse>('/appleAuthUrl'),
    {
      retry: false,
      onError: (error: AxiosError) => {
        toast({ position: 'top-right', status: 'error', title: error.message, isClosable: true })
      },
      ...options,
    }
  )
}

export const useDiscordAuth = (options?: any): UseQueryResult<AuthUrlResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlResponse, AxiosError>(
    QueriesKeysEnum.discordAuth,
    () => axios.get<any, AuthUrlResponse>('/discordAuthUrl'),
    {
      retry: false,
      onError: (error: AxiosError) => {
        toast({ position: 'top-right', status: 'error', title: error.message, isClosable: true })
      },
      ...options,
    }
  )
}

export const useFacebookAuth = (options?: any): UseQueryResult<AuthUrlResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlResponse, AxiosError>(
    QueriesKeysEnum.facebookAuthUrl,
    () => axios.get<any, AuthUrlResponse>('/facebookAuthUrl'),
    {
      retry: false,
      onError: (error: AxiosError) => {
        toast({ position: 'top-right', status: 'error', title: error.message, isClosable: true })
      },
      ...options,
    }
  )
}

export const useGithubAuth = (options?: any): UseQueryResult<AuthUrlResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlResponse, AxiosError>(
    QueriesKeysEnum.githubAuth,
    () => axios.get<any, AuthUrlResponse>('/githubAuthUrl'),
    {
      retry: false,
      onError: (error: AxiosError) => {
        toast({ position: 'top-right', status: 'error', title: error.message, isClosable: true })
      },
      ...options,
    }
  )
}

export const useGoogleAuth = (options?: any): UseQueryResult<AuthUrlResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlResponse, AxiosError>(
    QueriesKeysEnum.googleAuth,
    () => axios.get<any, AuthUrlResponse>('/googleAuthUrl'),
    {
      retry: false,
      onError: (error: AxiosError) => {
        toast({ position: 'top-right', status: 'error', title: error.message, isClosable: true })
      },
      ...options,
    }
  )
}

export const useLinkedInAuth = (options?: any): UseQueryResult<AuthUrlResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlResponse, AxiosError>(
    QueriesKeysEnum.linkedInAuth,
    () => axios.get<any, AuthUrlResponse>('/linkedInAuthUrl'),
    {
      retry: false,
      onError: (error: AxiosError) => {
        toast({ position: 'top-right', status: 'error', title: error.message, isClosable: true })
      },
      ...options,
    }
  )
}

export const useTelegramAuth = (options?: any): UseQueryResult<AuthUrlResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlResponse, AxiosError>(
    QueriesKeysEnum.telegramAuth,
    () => axios.get<any, AuthUrlResponse>('/telegramAuthUrl'),
    {
      retry: false,
      onError: (error: AxiosError) => {
        toast({ position: 'top-right', status: 'error', title: error.message, isClosable: true })
      },
      ...options,
    }
  )
}

export const useTwitterAuth = (options?: any): UseQueryResult<AuthUrlResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlResponse, AxiosError>(
    QueriesKeysEnum.twitterAuth,
    () => axios.get<any, AuthUrlResponse>('/twitterAuthUrl'),
    {
      retry: false,
      onError: (error: AxiosError) => {
        toast({ position: 'top-right', status: 'error', title: error.message, isClosable: true })
      },
      ...options,
    }
  )
}

export const useAppleAuthCallback = (
  code?: string | null,
  options?: any
): UseQueryResult<AuthUrlCallbackResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlCallbackResponse, AxiosError>(
    [QueriesKeysEnum.appleAuthCallback, code],
    async () => {
      if (code) {
        const response = await axios.get<any, AuthUrlCallbackResponse>('/appleOAuthCallback', {
          params: { code },
        })
        return response
      } else {
        return Promise.reject(new Error('No code provided'))
      }
    },
    {
      enabled: !!code, // This ensures the query only runs if code is defined
      retry: false,
      onError: (error: AxiosError) => {
        toast({ position: 'top-right', status: 'error', title: error.message, isClosable: true })
      },
      ...options,
    }
  )
}

export const useDiscordAuthCallback = (
  code?: string | null,
  options?: any
): UseQueryResult<AuthUrlCallbackResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlCallbackResponse, AxiosError>(
    [QueriesKeysEnum.discordAuthCallback, code],
    async () => {
      if (code) {
        const response = await axios.get<any, AuthUrlCallbackResponse>('/discordOAuthCallback', {
          params: { code },
        })
        return response
      } else {
        return Promise.reject(new Error('No code provided'))
      }
    },
    {
      enabled: !!code, // This ensures the query only runs if code is defined
      retry: false,
      onError: (error: AxiosError) => {
        toast({ position: 'top-right', status: 'error', title: error.message, isClosable: true })
      },
      ...options,
    }
  )
}

export const useFacebookAuthCallback = (
  code?: string | null,
  options?: any
): UseQueryResult<AuthUrlCallbackResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlCallbackResponse, AxiosError>(
    [QueriesKeysEnum.facebookAuthUrlCallback, code],
    async () => {
      if (code) {
        const response = await axios.get<any, AuthUrlCallbackResponse>(
          '/facebookOAuthCallback',
          {
            params: { code },
          }
        )
        return response
      } else {
        return Promise.reject(new Error('No code provided'))
      }
    },
    {
      enabled: !!code, // This ensures the query only runs if code is defined
      retry: false,
      onError: (error: AxiosError) => {
        toast({ position: 'top-right', status: 'error', title: error.message, isClosable: true })
      },
      ...options,
    }
  )
}

export const useGithubAuthCallback = (
  code?: string | null,
  options?: any
): UseQueryResult<AuthUrlCallbackResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlCallbackResponse, AxiosError>(
    [QueriesKeysEnum.githubAuthCallback, code],
    async () => {
      if (code) {
        const response = await axios.get<any, AuthUrlCallbackResponse>('/githubOAuthCallback', {
          params: { code },
        })
        return response
      } else {
        return Promise.reject(new Error('No code provided'))
      }
    },
    {
      enabled: !!code, // This ensures the query only runs if code is defined
      retry: false,
      onError: (error: AxiosError) => {
        toast({ position: 'top-right', status: 'error', title: error.message, isClosable: true })
      },
      ...options,
    }
  )
}

export const useGoogleAuthCallback = (
  code?: string | null,
  options?: any
): UseQueryResult<AuthUrlCallbackResponse, AxiosError> => {
  const toast = useToast()
  //   console.log('useGoogleAuthCallback- code', code)

  return useQuery<AuthUrlCallbackResponse, AxiosError>(
    [QueriesKeysEnum.googleAuthCallback, code],
    async () => {
      if (code) {
        const response = await axios.get<any, AuthUrlCallbackResponse>('/googleOAuthCallback', {
          params: { code },
        })
        return response
      } else {
        return Promise.reject(new Error('No code provided'))
      }
    },
    {
      enabled: !!code, // This ensures the query only runs if code is defined
      retry: false,
      onError: (error: AxiosError) => {
        toast({ position: 'top-right', status: 'error', title: error.message, isClosable: true })
      },
      ...options,
    }
  )
}

export const useLinkedInAuthCallback = (
  code?: string | null,
  options?: any
): UseQueryResult<AuthUrlCallbackResponse, AxiosError> => {
  const toast = useToast()
  //   console.log('useGoogleAuthCallback- code', code)

  return useQuery<AuthUrlCallbackResponse, AxiosError>(
    [QueriesKeysEnum.linkedInAuthCallback, code],
    async () => {
      if (code) {
        const response = await axios.get<any, AuthUrlCallbackResponse>(
          '/linkedInOAuthCallback',
          {
            params: { code },
          }
        )
        return response
      } else {
        return Promise.reject(new Error('No code provided'))
      }
    },
    {
      enabled: !!code, // This ensures the query only runs if code is defined
      retry: false,
      onError: (error: AxiosError) => {
        toast({ position: 'top-right', status: 'error', title: error.message, isClosable: true })
      },
      ...options,
    }
  )
}

export const useTelegramAuthCallback = (
  code?: string | null,
  options?: any
): UseQueryResult<AuthUrlCallbackResponse, AxiosError> => {
  const toast = useToast()
  //   console.log('useGoogleAuthCallback- code', code)

  return useQuery<AuthUrlCallbackResponse, AxiosError>(
    [QueriesKeysEnum.telegramAuthCallback, code],
    async () => {
      if (code) {
        const response = await axios.get<any, AuthUrlCallbackResponse>(
          '/telegramInOAuthCallback',
          {
            params: { code },
          }
        )
        return response
      } else {
        return Promise.reject(new Error('No code provided'))
      }
    },
    {
      enabled: !!code, // This ensures the query only runs if code is defined
      retry: false,
      onError: (error: AxiosError) => {
        toast({ position: 'top-right', status: 'error', title: error.message, isClosable: true })
      },
      ...options,
    }
  )
}

export const useTwitterAuthCallback = (
  code?: string | null,
  options?: any
): UseQueryResult<AuthUrlCallbackResponse, AxiosError> => {
  const toast = useToast()
  //   console.log('useGoogleAuthCallback- code', code)

  return useQuery<AuthUrlCallbackResponse, AxiosError>(
    [QueriesKeysEnum.twitterAuthCallback, code],
    async () => {
      if (code) {
        const response = await axios.get<any, AuthUrlCallbackResponse>(
          '/twitterInOAuthCallback',
          {
            params: { code },
          }
        )
        return response
      } else {
        return Promise.reject(new Error('No code provided'))
      }
    },
    {
      enabled: !!code, // This ensures the query only runs if code is defined
      retry: false,
      onError: (error: AxiosError) => {
        toast({ position: 'top-right', status: 'error', title: error.message, isClosable: true })
      },
      ...options,
    }
  )
}
