interface NativeCurrency {
  symbol: string
  name: string
  decimals: string
}

export interface Network {
  rpc_url?: any
  name: string
  short_name: string
  chain: string
  network: string
  chain_id: number
  network_id: number
  native_currency: NativeCurrency
}

export const ETHEREUM: Network = {
  name: 'Ethereum',
  short_name: 'eth',
  chain: 'ETH',
  network: 'ethereum',
  chain_id: 1,
  network_id: 1,
  native_currency: {
    symbol: 'ETH',
    name: 'Ether',
    decimals: '18',
  },
}

export const ROPSTEN: Network = {
  name: 'Ropsten',
  short_name: 'rop',
  chain: 'ETH',
  network: 'ropsten',
  chain_id: 3,
  network_id: 3,
  native_currency: {
    symbol: 'ETH',
    name: 'Ether',
    decimals: '18',
  },
}

export const GOERLI: Network = {
  name: 'Görli',
  short_name: 'gor',
  chain: 'ETH',
  network: 'goerli',
  chain_id: 5,
  network_id: 5,
  native_currency: {
    symbol: 'ETH',
    name: 'Ether',
    decimals: '18',
  },
}

export const SEPOLIA: Network = {
  name: 'Sepolia',
  short_name: 'sep',
  chain: 'ETH',
  network: 'sepolia',
  chain_id: 11155111,
  network_id: 11155111,
  native_currency: {
    symbol: 'ETH',
    name: 'Ether',
    decimals: '18',
  },
}

export const SUPPORTED_CHAINS = [ETHEREUM, SEPOLIA]
