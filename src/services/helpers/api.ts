import axios, { AxiosInstance, AxiosResponse } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: 'https://ethereum-api.xyz',
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

interface ApiResponse<T> {
  result: T
}

export const apiGetAccountAssets = async (address: string, chainId: number): Promise<any> => {
  const response: AxiosResponse<ApiResponse<any>> = await api.get(
    `/account-assets?address=${address}&chainId=${chainId}`
  )
  return response.data.result
}

export const apiGetAccountTransactions = async (
  address: string,
  chainId: number
): Promise<any> => {
  const response: AxiosResponse<ApiResponse<any>> = await api.get(
    `/account-transactions?address=${address}&chainId=${chainId}`
  )
  return response.data.result
}

export const apiGetAccountNonce = async (address: string, chainId: number): Promise<number> => {
  const response: AxiosResponse<ApiResponse<number>> = await api.get(
    `/account-nonce?address=${address}&chainId=${chainId}`
  )
  return response.data.result
}

export const apiGetGasPrices = async (): Promise<any> => {
  const response: AxiosResponse<ApiResponse<any>> = await api.get(`/gas-prices`)
  return response.data.result
}
