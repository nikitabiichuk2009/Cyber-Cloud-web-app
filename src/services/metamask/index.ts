import { getProvider, requestAccounts } from './provider'
import { ethers } from 'ethers'

export const connectMetamask = async (
  baseProvider: ethers.providers.ExternalProvider
): Promise<string[]> => {
  const provider = await getProvider(baseProvider)
  return await requestAccounts(provider)
}