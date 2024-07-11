import { getProvider, requestAccounts } from './provider'
import { ethers } from 'ethers'

export const connectMetamask = async (
  baseProvider: ethers.providers.ExternalProvider
): Promise<string[]> => {
  const provider = await getProvider(baseProvider)
  return await requestAccounts(provider)
}

export const connectRoninWallet = async () => {
  if (window.ronin === undefined) {
    throw new Error('Ronin Wallet is not installed')
  }

  const provider = new ethers.providers.Web3Provider(window.ronin.provider)
  const signer = await provider.getSigner()
  if (signer._address === null) {
    await provider.send('eth_requestAccounts', [])
  }

  const { chainId } = await provider.getNetwork()
  const firstAddress = await signer.getAddress()

  return { address: firstAddress, provider, signer, chainId }
}
