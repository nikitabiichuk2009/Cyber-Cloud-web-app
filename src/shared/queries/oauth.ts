import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'
import { useToast } from '@chakra-ui/react'
import { AxiosError } from 'axios'

import { QueriesKeysEnum } from './queries-keys-enum'
import axios from '../api/setup'

export interface AuthUrlResponse {
  authUrl: string
}

export interface AuthUrlCallbackResponse {
  stamps: string[]
  attestationResponse: any
}

const generateCodeVerifier = () => {
  const array = new Uint32Array(56)
  window.crypto.getRandomValues(array)
  return Array.from(array, (dec) => ('0' + dec.toString(16)).substr(-2)).join('')
}

const generateCodeChallenge = async (codeVerifier: string) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(codeVerifier)
  const digest = await window.crypto.subtle.digest('SHA-256', data)
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
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
    async () => {
      let codeChallenge = ''

      // Step 1: Check if a code verifier exists in localStorage
      let codeVerifier = localStorage.getItem('discord_code_verifier')

      if (!codeVerifier) {
        // If not, generate a new code verifier and code challenge
        codeVerifier = generateCodeVerifier()
        codeChallenge = await generateCodeChallenge(codeVerifier)

        // Store the code verifier in localStorage
        localStorage.setItem('discord_code_verifier', codeVerifier)
        console.log(`Generated Discord codeVerifier: ${codeVerifier}`)
      } else {
        // If it exists, generate the code challenge based on the existing code verifier
        codeChallenge = await generateCodeChallenge(codeVerifier)
        console.log(`Using existing Discord codeVerifier: ${codeVerifier}`)
      }

      // Step 2: Request OAuth URL with code challenge
      const response = await axios.get<any, AuthUrlResponse>('/discordAuthUrl', {
        params: { codeChallenge }, // Send the codeChallenge in the query parameters
      })

      return response
    },
    {
      retry: false,
      onError: (error: AxiosError) => {
        toast({
          position: 'top-right',
          status: 'error',
          title: error.message,
          isClosable: true,
        })
      },
      ...options,
    }
  )
}

export const useFacebookAuth = (options?: any): UseQueryResult<AuthUrlResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlResponse, AxiosError>(
    QueriesKeysEnum.facebookAuthUrl,
    async () => {
      let codeChallenge = ''

      // Step 1: Check if a code verifier exists in localStorage
      let codeVerifier = localStorage.getItem('facebook_code_verifier')

      if (!codeVerifier) {
        // If not, generate a new code verifier and code challenge
        codeVerifier = generateCodeVerifier()
        codeChallenge = await generateCodeChallenge(codeVerifier)

        // Store the code verifier in localStorage
        localStorage.setItem('facebook_code_verifier', codeVerifier)
        console.log(`Generated Facebook codeVerifier: ${codeVerifier}`)
      } else {
        // If it exists, generate the code challenge based on the existing code verifier
        codeChallenge = await generateCodeChallenge(codeVerifier)
        console.log(`Using existing Facebook codeVerifier: ${codeVerifier}`)
      }

      // Step 2: Request OAuth URL with code challenge
      const response = await axios.get<any, AuthUrlResponse>('/facebookAuthUrl', {
        params: { codeChallenge }, // Send the codeChallenge in the query parameters
      })

      return response
    },
    {
      retry: false,
      onError: (error: AxiosError) => {
        toast({
          position: 'top-right',
          status: 'error',
          title: error.message,
          isClosable: true,
        })
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
    async () => {
      let codeChallenge = ''

      // Step 1: Check if a code verifier exists in localStorage
      let codeVerifier = localStorage.getItem('google_code_verifier')

      if (!codeVerifier) {
        // If not, generate a new code verifier and code challenge
        codeVerifier = generateCodeVerifier()
        codeChallenge = await generateCodeChallenge(codeVerifier)

        // Store the code verifier in localStorage
        localStorage.setItem('google_code_verifier', codeVerifier)
        console.log(`Generated codeVerifier: ${codeVerifier}`)
      } else {
        // If it exists, generate the code challenge based on the existing code verifier
        codeChallenge = await generateCodeChallenge(codeVerifier)
        console.log(`Using existing Google codeVerifier: ${codeVerifier}`)
      }

      // Step 2: Request OAuth URL with code challenge
      const response = await axios.get<any, AuthUrlResponse>('/googleAuthUrl', {
        params: { codeChallenge }, // Send the codeChallenge in the body as required
      })

      return response
    },
    {
      retry: false,
      onError: (error: AxiosError) => {
        toast({
          position: 'top-right',
          status: 'error',
          title: error.message,
          isClosable: true,
        })
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
    async () => {
      let codeChallenge = ''

      // Step 1: Check if a code verifier exists in localStorage
      let codeVerifier = localStorage.getItem('twitter_code_verifier')

      if (!codeVerifier) {
        // If not, generate a new code verifier and code challenge
        codeVerifier = generateCodeVerifier()
        codeChallenge = await generateCodeChallenge(codeVerifier)

        // Store the code verifier in localStorage
        localStorage.setItem('twitter_code_verifier', codeVerifier)
        console.log(`Generated Twitter codeVerifier: ${codeVerifier}`)
      } else {
        // If it exists, generate the code challenge based on the existing code verifier
        codeChallenge = await generateCodeChallenge(codeVerifier)
        console.log(`Using existing Twitter codeVerifier: ${codeVerifier}`)
      }

      // Step 2: Request OAuth URL with code challenge
      const response = await axios.get<any, AuthUrlResponse>('/twitterAuthUrl', {
        params: { codeChallenge }, // Send the codeChallenge in the query parameters
      })

      return response
    },
    {
      retry: false,
      onError: (error: AxiosError) => {
        toast({
          position: 'top-right',
          status: 'error',
          title: error.message,
          isClosable: true,
        })
      },
      ...options,
    }
  )
}

export const useAppleAuthCallback = (
  id_token?: string | null,
  options?: any
): UseQueryResult<AuthUrlCallbackResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlCallbackResponse, AxiosError>(
    [QueriesKeysEnum.appleAuthCallback, id_token],
    async () => {
      if (id_token) {
        const response = await axios.get<any, AuthUrlCallbackResponse>('/appleOAuthCallback', {
          params: { id_token, privacy: 'only-me' },
        })
        return response
      } else {
        return Promise.reject(new Error('No id_token provided'))
      }
    },
    {
      enabled: !!id_token, // This ensures the query only runs if id_token is defined
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
        // Retrieve codeVerifier from localStorage
        const codeVerifier = localStorage.getItem('discord_code_verifier')
        if (!codeVerifier) {
          throw new Error('Missing Discord codeVerifier')
        }

        // Send code and codeVerifier to backend for token exchange
        const response = await axios.get<any, AuthUrlCallbackResponse>('/discordOAuthCallback', {
          params: {
            code,
            codeVerifier,
            privacy: 'only-me',
          },
        })

        // Clear the codeVerifier after it has been used
        localStorage.removeItem('discord_code_verifier')

        return response
      } else {
        return Promise.reject(new Error('No code provided'))
      }
    },
    {
      enabled: !!code, // Only run the query if the code is defined
      retry: false,
      onError: (error: AxiosError) => {
        toast({
          position: 'top-right',
          status: 'error',
          title: error.message,
          isClosable: true,
        })
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
        // Step 1: Retrieve codeVerifier from localStorage
        const codeVerifier = localStorage.getItem('facebook_code_verifier')
        if (!codeVerifier) {
          throw new Error('Missing Facebook codeVerifier')
        }

        // Step 2: Send code and codeVerifier to backend for token exchange
        const response = await axios.get<any, AuthUrlCallbackResponse>(
          '/facebookOAuthCallback',
          {
            params: {
              code,
              codeVerifier,
              privacy: 'only-me',
            },
          }
        )

        // Clear the codeVerifier after it has been used
        localStorage.removeItem('facebook_code_verifier')

        return response
      } else {
        return Promise.reject(new Error('No code provided'))
      }
    },
    {
      enabled: !!code, // Only run the query if the code is defined
      retry: false,
      onError: (error: AxiosError) => {
        toast({
          position: 'top-right',
          status: 'error',
          title: error.message,
          isClosable: true,
        })
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
          params: { code, privacy: 'only-me' },
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

  return useQuery<AuthUrlCallbackResponse, AxiosError>(
    [QueriesKeysEnum.googleAuthCallback, code],
    async () => {
      if (code) {
        // Retrieve codeVerifier from localStorage
        const codeVerifier = localStorage.getItem('google_code_verifier')
        if (!codeVerifier) {
          throw new Error('Missing codeVerifier')
        }

        // Send code and codeVerifier to backend for token exchange
        const response = await axios.get<any, AuthUrlCallbackResponse>('/googleOAuthCallback', {
          params: {
            code,
            codeVerifier,
            privacy: 'only-me',
          },
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

  return useQuery<AuthUrlCallbackResponse, AxiosError>(
    [QueriesKeysEnum.linkedInAuthCallback, code],
    async () => {
      if (code) {
        const response = await axios.get<any, AuthUrlCallbackResponse>(
          '/linkedInOAuthCallback',
          {
            params: { code, privacy: 'only-me' },
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
  tgAuthResult?: string | null,
  options?: any
): UseQueryResult<AuthUrlCallbackResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlCallbackResponse, AxiosError>(
    [QueriesKeysEnum.telegramAuthCallback, tgAuthResult],
    async () => {
      if (tgAuthResult) {
        const response = await axios.get<any, AuthUrlCallbackResponse>(
          '/telegramOAuthCallback',
          {
            params: { tgAuthResult, privacy: 'only-me' },
          }
        )
        return response
      } else {
        return Promise.reject(new Error('No code provided'))
      }
    },
    {
      enabled: !!tgAuthResult, // This ensures the query only runs if tgAuthResult is defined
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

  return useQuery<AuthUrlCallbackResponse, AxiosError>(
    [QueriesKeysEnum.twitterAuthCallback, code],
    async () => {
      if (code) {
        // Step 1: Retrieve codeVerifier from localStorage
        const codeVerifier = localStorage.getItem('twitter_code_verifier')
        if (!codeVerifier) {
          throw new Error('Missing Twitter codeVerifier')
        }

        // Step 2: Send code and codeVerifier to backend for token exchange
        const response = await axios.get<any, AuthUrlCallbackResponse>('/twitterOAuthCallback', {
          params: {
            code,
            codeVerifier, // Include the codeVerifier
            privacy: 'only-me',
          },
        })

        // Clear the codeVerifier after it has been used
        localStorage.removeItem('twitter_code_verifier')

        return response
      } else {
        return Promise.reject(new Error('No code provided'))
      }
    },
    {
      enabled: !!code, // Only run the query if the code is defined
      retry: false,
      onError: (error: AxiosError) => {
        toast({
          position: 'top-right',
          status: 'error',
          title: error.message,
          isClosable: true,
        })
      },
      ...options,
    }
  )
}

// ... existing imports and code ...

export const useRedditAuth = (options?: any): UseQueryResult<AuthUrlResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlResponse, AxiosError>(
    QueriesKeysEnum.redditAuth,
    async () => {
      let codeChallenge = ''

      // Step 1: Check if a code verifier exists in localStorage
      let codeVerifier = localStorage.getItem('reddit_code_verifier')

      if (!codeVerifier) {
        // If not, generate a new code verifier and code challenge
        codeVerifier = generateCodeVerifier()
        codeChallenge = await generateCodeChallenge(codeVerifier)

        // Store the code verifier in localStorage
        localStorage.setItem('reddit_code_verifier', codeVerifier)
        console.log(`Generated Reddit codeVerifier: ${codeVerifier}`)
      } else {
        // If it exists, generate the code challenge based on the existing code verifier
        codeChallenge = await generateCodeChallenge(codeVerifier)
        console.log(`Using existing Reddit codeVerifier: ${codeVerifier}`)
      }

      // Step 2: Request OAuth URL with code challenge
      const response = await axios.get<any, AuthUrlResponse>('/redditAuthUrl', {
        params: { codeChallenge },
      })

      return response
    },
    {
      retry: false,
      onError: (error: AxiosError) => {
        toast({
          position: 'top-right',
          status: 'error',
          title: error.message,
          isClosable: true,
        })
      },
      ...options,
    }
  )
}

export const useRedditAuthCallback = (
  code?: string | null,
  options?: any
): UseQueryResult<AuthUrlCallbackResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlCallbackResponse, AxiosError>(
    [QueriesKeysEnum.redditAuthCallback, code],
    async () => {
      if (code) {
        // Step 1: Retrieve codeVerifier from localStorage
        const codeVerifier = localStorage.getItem('reddit_code_verifier')
        if (!codeVerifier) {
          throw new Error('Missing Reddit codeVerifier')
        }

        // Step 2: Send code and codeVerifier to backend for token exchange
        const response = await axios.get<any, AuthUrlCallbackResponse>('/redditOAuthCallback', {
          params: {
            code,
            codeVerifier,
            privacy: 'only-me',
          },
        })

        // Clear the codeVerifier after it has been used
        localStorage.removeItem('reddit_code_verifier')

        return response
      } else {
        return Promise.reject(new Error('No code provided'))
      }
    },
    {
      enabled: !!code,
      retry: false,
      onError: (error: AxiosError) => {
        toast({
          position: 'top-right',
          status: 'error',
          title: error.message,
          isClosable: true,
        })
      },
      ...options,
    }
  )
}

export const useCoinbaseAuth = (options?: any): UseQueryResult<AuthUrlResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlResponse, AxiosError>(
    QueriesKeysEnum.coinbaseAuth,
    async () => {
      const response = await axios.get<any, AuthUrlResponse>('/coinbaseAuthUrl')
      return response
    },
    {
      retry: false,
      onError: (error: AxiosError) => {
        toast({
          position: 'top-right',
          status: 'error',
          title: error.message,
          isClosable: true,
        })
      },
      ...options,
    }
  )
}

export const useCoinbaseAuthCallback = (
  code?: string | null,
  options?: any
): UseQueryResult<AuthUrlCallbackResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlCallbackResponse, AxiosError>(
    [QueriesKeysEnum.coinbaseAuthCallback, code],
    async () => {
      if (code) {
        const response = await axios.get<any, AuthUrlCallbackResponse>(
          '/coinbaseOAuthCallback',
          {
            params: {
              code,
              privacy: 'only-me',
            },
          }
        )
        return response
      } else {
        return Promise.reject(new Error('No code provided'))
      }
    },
    {
      enabled: !!code,
      retry: false,
      onError: (error: AxiosError) => {
        toast({
          position: 'top-right',
          status: 'error',
          title: error.message,
          isClosable: true,
        })
      },
      ...options,
    }
  )
}

export const useWorldIdAuth = (options?: any): UseQueryResult<AuthUrlResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlResponse, AxiosError>(
    QueriesKeysEnum.worldIdAuth,
    async () => {
      const response = await axios.get<any, AuthUrlResponse>('/worldIdAuthUrl')
      return response
    },
    {
      retry: false,
      onError: (error: AxiosError) => {
        toast({ position: 'top-right', status: 'error', title: error.message, isClosable: true })
      },
      ...options,
    }
  )
}

export const useWorldIdAuthCallback = (
  code?: string | null,
  options?: any
): UseQueryResult<AuthUrlCallbackResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlCallbackResponse, AxiosError>(
    [QueriesKeysEnum.worldIdAuthCallback, code],
    async () => {
      if (code) {
        const response = await axios.get<any, AuthUrlCallbackResponse>('/worldIdOAuthCallback', {
          params: {
            code,
            privacy: 'only-me',
          },
        })
        return response
      } else {
        return Promise.reject(new Error('No code provided'))
      }
    },
    {
      enabled: !!code,
      retry: false,
      onError: (error: AxiosError) => {
        toast({ position: 'top-right', status: 'error', title: error.message, isClosable: true })
      },
      ...options,
    }
  )
}

export const useTikTokAuth = (options?: any): UseQueryResult<AuthUrlResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlResponse, AxiosError>(
    QueriesKeysEnum.tikTokAuth,
    async () => {
      let codeChallenge = ''
      let codeVerifier = localStorage.getItem('tiktok_code_verifier')

      if (!codeVerifier) {
        codeVerifier = generateCodeVerifier()
        codeChallenge = await generateCodeChallenge(codeVerifier)
        localStorage.setItem('tiktok_code_verifier', codeVerifier)
        console.log(`Generated TikTok codeVerifier: ${codeVerifier}`)
      } else {
        codeChallenge = await generateCodeChallenge(codeVerifier)
        console.log(`Using existing TikTok codeVerifier: ${codeVerifier}`)
      }

      const response = await axios.get<any, AuthUrlResponse>('/tikTokAuthUrl', {
        params: { codeChallenge },
      })

      return response
    },
    {
      retry: false,
      onError: (error: AxiosError) => {
        toast({
          position: 'top-right',
          status: 'error',
          title: error.message,
          isClosable: true,
        })
      },
      ...options,
    }
  )
}

export const useTikTokAuthCallback = (
  code?: string | null,
  options?: any
): UseQueryResult<AuthUrlCallbackResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlCallbackResponse, AxiosError>(
    [QueriesKeysEnum.tikTokAuthCallback, code],
    async () => {
      if (code) {
        const codeVerifier = localStorage.getItem('tiktok_code_verifier')
        if (!codeVerifier) {
          throw new Error('Missing TikTok codeVerifier')
        }

        const response = await axios.get<any, AuthUrlCallbackResponse>('/tikTokOAuthCallback', {
          params: {
            code,
            codeVerifier,
            privacy: 'only-me',
          },
        })

        localStorage.removeItem('tiktok_code_verifier')

        return response
      } else {
        return Promise.reject(new Error('No code provided'))
      }
    },
    {
      enabled: !!code,
      retry: false,
      onError: (error: AxiosError) => {
        toast({
          position: 'top-right',
          status: 'error',
          title: error.message,
          isClosable: true,
        })
      },
      ...options,
    }
  )
}

export const useInstagramAuth = (options?: any): UseQueryResult<AuthUrlResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlResponse, AxiosError>(
    QueriesKeysEnum.instagramAuth,
    async () => {
      const response = await axios.get<any, AuthUrlResponse>('/instagramAuthUrl')
      return response
    },
    {
      retry: false,
      onError: (error: AxiosError) => {
        toast({
          position: 'top-right',
          status: 'error',
          title: error.message,
          isClosable: true,
        })
      },
      ...options,
    }
  )
}

export const useInstagramAuthCallback = (
  code?: string | null,
  options?: any
): UseQueryResult<AuthUrlCallbackResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlCallbackResponse, AxiosError>(
    [QueriesKeysEnum.instagramAuthCallback, code],
    async () => {
      if (code) {
        const response = await axios.get<any, AuthUrlCallbackResponse>(
          '/instagramOAuthCallback',
          {
            params: {
              code,
              privacy: 'only-me',
            },
          }
        )
        return response
      } else {
        return Promise.reject(new Error('No code provided'))
      }
    },
    {
      enabled: !!code,
      retry: false,
      onError: (error: AxiosError) => {
        toast({
          position: 'top-right',
          status: 'error',
          title: error.message,
          isClosable: true,
        })
      },
      ...options,
    }
  )
}

export const useYoutubeAuth = (options?: any): UseQueryResult<AuthUrlResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlResponse, AxiosError>(
    QueriesKeysEnum.youtubeAuth,
    async () => {
      let codeChallenge = ''
      let codeVerifier = localStorage.getItem('youtube_code_verifier')

      if (!codeVerifier) {
        codeVerifier = generateCodeVerifier()
        codeChallenge = await generateCodeChallenge(codeVerifier)
        localStorage.setItem('youtube_code_verifier', codeVerifier)
        console.log(`Generated YouTube codeVerifier: ${codeVerifier}`)
      } else {
        codeChallenge = await generateCodeChallenge(codeVerifier)
        console.log(`Using existing YouTube codeVerifier: ${codeVerifier}`)
      }

      const response = await axios.get<any, AuthUrlResponse>('/youtubeAuthUrl', {
        params: { codeChallenge },
      })

      return response
    },
    {
      retry: false,
      onError: (error: AxiosError) => {
        toast({
          position: 'top-right',
          status: 'error',
          title: error.message,
          isClosable: true,
        })
      },
      ...options,
    }
  )
}

export const useYoutubeAuthCallback = (
  code?: string | null,
  options?: any
): UseQueryResult<AuthUrlCallbackResponse, AxiosError> => {
  const toast = useToast()

  return useQuery<AuthUrlCallbackResponse, AxiosError>(
    [QueriesKeysEnum.youtubeAuthCallback, code],
    async () => {
      if (code) {
        const codeVerifier = localStorage.getItem('youtube_code_verifier')
        if (!codeVerifier) {
          throw new Error('Missing YouTube codeVerifier')
        }

        const response = await axios.get<any, AuthUrlCallbackResponse>(
          '/youtubeOAuthCallback',
          {
            params: {
              code,
              codeVerifier,
              privacy: 'only-me',
            },
          }
        )

        localStorage.removeItem('youtube_code_verifier')

        return response
      } else {
        return Promise.reject(new Error('No code provided'))
      }
    },
    {
      enabled: !!code,
      retry: false,
      onError: (error: AxiosError) => {
        toast({
          position: 'top-right',
          status: 'error',
          title: error.message,
          isClosable: true,
        })
      },
      ...options,
    }
  )
}