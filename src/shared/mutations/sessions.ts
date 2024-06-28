import { useToast } from '@chakra-ui/react'
import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query'
import { onApiError } from '../helpers/onApiError'
import axios from '../api/setup'

interface WalletLoginData {
  digest: string
  signature: string
}

interface ApiResponse {
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
  options?: UseMutationOptions<ApiResponse, ApiError, WalletLoginData>
): UseMutationResult<ApiResponse, ApiError, WalletLoginData> => {
  const toast = useToast()

  return useMutation<ApiResponse, ApiError, WalletLoginData>(
    async (data: WalletLoginData) => {
      const response = await axios.post<ApiResponse>('/createSessionByWallet', data)
      return response.data
    },
    {
      onError: (error: ApiError) => {
        onApiError(error, toast)
      },
      ...options,
    }
  )
}

// import { useToast } from "@chakra-ui/react";
// import { useMutation } from "react-query";
// import { onApiError } from "../helpers/onApiError";

// import axios from "../api/setup";

// export const useWalletLoginMutation = (options) => {
//     const toast = useToast();
//     return useMutation(
//       async (data) => axios.post("/createSessionByWallet", data),
//       {
//         onError: (error) => {
//           onApiError(error, toast);
//         },
//         ...options,
//       }
//     );
//   };
