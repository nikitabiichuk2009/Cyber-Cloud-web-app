import { useToast } from '@chakra-ui/react'
import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query'
import { onApiError } from '../helpers/onApiError'
import axios from '../api/setup'

interface WalletLoginData {
  digest: string
  signature: string
}

interface CreateSessionByWalletResponse {
  token: string
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

export const useWalletLoginMutation = (
  options?: UseMutationOptions<CreateSessionByWalletResponse, ApiError, WalletLoginData>
): UseMutationResult<CreateSessionByWalletResponse, ApiError, WalletLoginData> => {
  const toast = useToast()

  return useMutation<CreateSessionByWalletResponse, ApiError, WalletLoginData>(
    async (data: WalletLoginData) =>
      await axios.post<string, CreateSessionByWalletResponse>('/createSessionByWallet', data),
    {
      onError: (error: ApiError) => {
        onApiError(error, toast)
      },
      ...options,
    }
  )
}
