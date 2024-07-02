import { ethers } from 'ethers'
import { convertUtf8ToHex } from '@walletconnect/utils'
import { TypedDataUtils } from 'eth-sig-util'
import * as ethUtil from 'ethereumjs-util'
import { SUPPORTED_CHAINS, Network } from './chains'
import { eip1271 } from './eip1271'

export const sanitizeHex = (hex: string): string => {
  hex = hex.substring(0, 2) === '0x' ? hex.substring(2) : hex
  if (hex === '') {
    return ''
  }
  hex = hex.length % 2 !== 0 ? '0' + hex : hex
  return '0x' + hex
}

export const getChainData = (chainId: number): Network => {
  const chainData = SUPPORTED_CHAINS.find((chain) => chain.chain_id === chainId)
  if (!chainData) {
    throw new Error('ChainId missing or not supported')
  }
  const API_KEY = process.env.REACT_APP_INFURA_PROJECT_ID
  if (
    chainData.rpc_url.includes('infura.io') &&
    chainData.rpc_url.includes('%API_KEY%') &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace('%API_KEY%', API_KEY)
    return {
      ...chainData,
      rpc_url: rpcUrl,
    }
  }
  return chainData
}

export const encodePersonalMessage = (msg: string): string => {
  const data = ethUtil.toBuffer(convertUtf8ToHex(msg))
  const buf = Buffer.concat([
    Buffer.from('\u0019Ethereum Signed Message:\n' + data.length.toString(), 'utf8'),
    data,
  ])
  return ethUtil.bufferToHex(buf)
}

export const hashMessage = (msg: string): string => {
  const data = encodePersonalMessage(msg)
  const buf = ethUtil.toBuffer(data)
  const hash = ethUtil.keccak256(buf)
  return ethUtil.bufferToHex(hash)
}

export const encodeTypedDataMessage = (msg: string): string => {
  const data = TypedDataUtils.sanitizeData(JSON.parse(msg))
  const buf = Buffer.concat([
    Buffer.from('1901', 'hex'),
    TypedDataUtils.hashStruct('EIP712Domain', data.domain, data.types),
    TypedDataUtils.hashStruct(data.primaryType as string, data.message, data.types),
  ])
  return ethUtil.bufferToHex(buf)
}

export const hashTypedDataMessage = (msg: string): string => {
  const data = encodeTypedDataMessage(msg)
  const buf = ethUtil.toBuffer(data)
  const hash = ethUtil.keccak256(buf)
  return ethUtil.bufferToHex(hash)
}

export const recoverAddress = (sig: string, hash: string): string => {
  const params = ethUtil.fromRpcSig(sig)
  const result = ethUtil.ecrecover(ethUtil.toBuffer(hash), params.v, params.r, params.s)
  const signer = ethUtil.bufferToHex(ethUtil.publicToAddress(result))
  return signer
}

export const recoverMessageSignature = (sig: string, msg: string): string => {
  const hash = hashMessage(msg)
  const signer = recoverAddress(sig, hash)
  return signer
}

export const recoverTypedMessage = (sig: string, msg: string): string => {
  const hash = hashTypedDataMessage(msg)
  const signer = recoverAddress(sig, hash)
  return signer
}

export const verifySignature = async (
  address: string,
  sig: string,
  hash: string,
  chainId: number
): Promise<boolean> => {
  const provider = ethers.getDefaultProvider(chainId)
  const bytecode = await provider.getCode(address)
  if (!bytecode || bytecode === '0x' || bytecode === '0x0' || bytecode === '0x00') {
    const signer = recoverAddress(sig, hash)
    return signer.toLowerCase() === address.toLowerCase()
  } else {
    return eip1271.isValidSignature(address, sig, hash, provider)
  }
}
