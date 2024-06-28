import { ethers } from 'ethers'
import abi from 'erc-20-abi'
import { convertStringToHex } from '../helpers/bignumber'
import { ETHEREUM } from '../helpers/chains'

// interface EthereumProvider extends ethers.providers.ExternalProvider {
//   networkVersion: string;
//   request: (args: { method: string; params?: any[] }) => Promise<any>;
//   send: (method: string, params?: any[]) => Promise<any>;
// }

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

// import { ethers } from "ethers";
// import abi from "erc-20-abi";
// import { convertStringToHex } from "../helpers/bignumber";
// import { ETHEREUM } from "../helpers/chains";

// export const getProvider = async (provider, chainId = ETHEREUM.chain_id) => {
//   if (provider.networkVersion !== `${chainId}`) {
//     await provider.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId: `0x${convertStringToHex(chainId)}` }],
//     });
//   }
//   return new ethers.providers.Web3Provider(provider, chainId);
// };

// export const requestAccounts = async (provider) => {
//   return await provider.send("eth_requestAccounts", []);
// };

// export const sendTransaction = async (
//   baseProvider,
//   chainId,
//   contract,
//   to,
//   value,
//   decimals
// ) => {
//   const provider = await getProvider(baseProvider, chainId);
//   const usdcWhale = await provider.getSigner();
//   const USDC = new ethers.Contract(contract, abi, provider);
//   return await USDC.connect(usdcWhale).transfer(
//     to,
//     ethers.utils.parseUnits(value, decimals)
//   );
// };

// export const signMessage = async (baseProvider, message) => {
//   const provider = await getProvider(baseProvider);
//   const signer = provider.getSigner();
//   const signature = await signer.signMessage(message);
//   return {
//     signature,
//     digest: message,
//   };
// };
