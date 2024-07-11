import { ethers } from 'ethers'
import abi from 'erc-20-abi'
import { convertStringToHex } from '../helpers/bignumber'
import { ETHEREUM } from '../helpers/chains'
import { connectRoninWallet } from '.'

export const getProvider = async (
  provider: any,
  chainId: number = ETHEREUM.chain_id
): Promise<ethers.providers.Web3Provider> => {
  if (provider.networkVersion !== `${chainId}`) {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${convertStringToHex(chainId)}` }],
    })
  }
  return new ethers.providers.Web3Provider(provider, chainId)
}

export const requestAccounts = async (provider: any): Promise<string[]> => {
  return await provider.send('eth_requestAccounts', [])
}

export const sendTransaction = async (
  baseProvider: any,
  chainId: number,
  contract: string,
  to: string,
  value: string,
  decimals: number
): Promise<ethers.providers.TransactionResponse> => {
  const provider = await getProvider(baseProvider, chainId)
  const signer = await provider.getSigner()
  const USDC = new ethers.Contract(contract, abi, signer)
  return await USDC.transfer(to, ethers.utils.parseUnits(value, decimals))
}

export const signMessage = async (
  baseProvider: any,
  message: string
): Promise<{ signature: string; digest: string }> => {
  const provider = await getProvider(baseProvider)
  const signer = provider.getSigner()
  const signature = await signer.signMessage(message)
  return {
    signature,
    digest: message,
  }
}

export const signRoninMessage = async (message: string) => {
  const { signer } = await connectRoninWallet()
  const signature = await signer.signMessage(message)
  // return signature
  return {
    signature,
    digest: message,
  }
}

export const signRoninMessageVerify = async (digest: string, signature: string) => {
  const walletAddress = ethers.utils.verifyMessage(digest, signature)
  return walletAddress
}
