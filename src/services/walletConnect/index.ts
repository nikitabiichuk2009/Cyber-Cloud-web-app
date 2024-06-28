import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'
import { convertUtf8ToHex } from '@walletconnect/utils'
// import abi from 'erc-20-abi'
// import { ethers } from 'ethers'

// import { apiGetGasPrices, apiGetAccountNonce } from '../helpers/api' // eslint-disable-line
import { ETHEREUM } from '../helpers/chains'
import {
  // sanitizeHex,
  verifySignature,
} from '../helpers/utilities'
import {
  // convertAmountToRawNumber,
  convertStringToHex,
} from '../helpers/bignumber'
import { hashMessage } from 'ethers/lib/utils'

interface WalletConnectServiceOptions {
  provider?: any
  bridge?: string
  chainId?: number
}

// interface TransactionResult {
//   success: boolean
//   method?: string
//   txHash?: string
//   from?: string
//   to?: string
//   error?: any
// }

export class WalletConnectService {
  private bridge: string
  private chainId: number
  private accounts: string[]
  private assets: any[]
  private address: string
  private provider: any
  private connector: WalletConnect

  constructor({
    provider,
    bridge = 'https://bridge.walletconnect.org',
    chainId = ETHEREUM.chain_id,
  }: WalletConnectServiceOptions) {
    this.bridge = bridge
    this.chainId = chainId
    this.accounts = []
    this.assets = []
    this.address = ''
    this.provider = provider
    this.connector = new WalletConnect({
      bridge: this.bridge,
      qrcodeModal: QRCodeModal,
    })
  }

  async connect(): Promise<void> {
    const { connector, chainId } = this
    if (!connector.connected) {
      await connector.connect()
    }
    if (connector.chainId !== chainId) {
      const customRequest = {
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${convertStringToHex(chainId)}` }],
      }
      await connector.sendCustomRequest(customRequest)
    }
    await this.subscribeToEvents()
  }

  async disconnect(): Promise<void> {
    const { connector } = this
    if (connector.connected) {
      await connector.killSession()
    }
    await this.subscribeToEvents()
  }

  private subscribeToEvents(): void {
    const { connector } = this
    if (!connector) {
      return
    }
    connector.on('session_update', async (error, payload) => {
      if (error) {
        throw error
      }
      const { chainId, accounts } = payload.params[0]
      this.onSessionUpdate(accounts, chainId)
    })
    connector.on('connect', (error, payload) => {
      console.log(`connector.on("connect")`)
      if (error) {
        throw error
      }
      this.onConnect(payload)
    })
    connector.on('disconnect', (error) => {
      console.log(`connector.on("disconnect")`)
      if (error) {
        throw error
      }
      this.onDisconnect()
    })
    if (connector.connected) {
      const { chainId, accounts } = connector
      const address = accounts[0]
      this.chainId = chainId
      this.accounts = accounts
      this.address = address
      this.onSessionUpdate(accounts, chainId)
    }
  }

  private resetInstance(): void {
    this.connector = {} as WalletConnect
    this.chainId = ETHEREUM.chain_id
    this.accounts = []
    this.address = ''
  }

  private onConnect(payload: any): void {
    const { chainId, accounts } = payload.params[0]
    const address = accounts[0]
    this.chainId = chainId
    this.accounts = accounts
    this.address = address
  }

  private onDisconnect(): void {
    this.resetInstance()
  }

  private onSessionUpdate(accounts: string[], chainId: number): void {
    const address = accounts[0]
    this.chainId = chainId
    this.accounts = accounts
    this.address = address
  }

  // private async _prepareTransaction(to: string, data: string, decimals = 18): Promise<any> {
  //   const { address } = this
  //   const from = address
  //   // const _nonce = await apiGetAccountNonce(address, chainId);
  //   // const nonce = sanitizeHex(convertStringToHex(_nonce));
  //   const gasPrices = await apiGetGasPrices()
  //   const _gasPrice = gasPrices.slow.price
  //   const gasPrice = sanitizeHex(
  //     convertStringToHex(convertAmountToRawNumber(_gasPrice, Math.round(decimals / 2)))
  //   )
  //   const _gas = 30000
  //   const gas = sanitizeHex(convertStringToHex(_gas))
  //   console.log(gas)
  //   console.log(gasPrice)
  //   const tx = {
  //     from,
  //     to,
  //     // nonce,
  //     data,
  //   }
  //   return tx
  // }

  // async sendTransaction(
  //   tokenContract: string,
  //   to: string,
  //   amount: string,
  //   decimals: number
  // ): Promise<TransactionResult | undefined> {
  //   const { connector, address } = this
  //   const iprovider = new ethers.utils.Interface(abi)
  //   const data = iprovider.encodeFunctionData('transfer', [
  //     to,
  //     ethers.utils.parseUnits(amount, decimals),
  //   ])
  //   if (!connector) {
  //     console.log('No connector')
  //     return
  //     // {
  //     //   success: false,
  //     //   error: "No connector",
  //     // }
  //   }
  //   const tx = await this._prepareTransaction(tokenContract, data, decimals)
  //   try {
  //     const result = await connector.sendTransaction(tx)
  //     await this.provider.waitForTransaction(result)
  //     return {
  //       success: true,
  //       method: 'eth_sendTransaction',
  //       txHash: result,
  //       from: address,
  //       to,
  //     }
  //   } catch (error) {
  //     return {
  //       success: false,
  //       error,
  //     }
  //   }
  // }

  async signMessage(message: string): Promise<{ result: string; valid: boolean }> {
    const { connector, address, chainId } = this
    const hexMsg = convertUtf8ToHex(message)
    const msgParams = [hexMsg, address]
    try {
      if (!connector) {
        return {
          valid: false,
          result: 'No connector',
        }
      }
      const result = await connector.signPersonalMessage(msgParams)

      const hash = hashMessage(message)
      const valid = await verifySignature(address, result, hash, chainId)
      return {
        valid: valid,
        result: hash,
      }
    } catch (error) {
      console.error(error)
      return {
        valid: false,
        result: `{error}`,
      }
    }
  }
}

// import WalletConnect from "@walletconnect/client";
// import QRCodeModal from "@walletconnect/qrcode-modal";
// import { convertUtf8ToHex } from "@walletconnect/utils";
// import abi from "erc-20-abi";
// import { ethers } from "ethers";

// import { apiGetGasPrices, apiGetAccountNonce } from "../helpers/api"; // eslint-disable-line
// import { ETHEREUM } from "../helpers/chains";
// import { sanitizeHex, verifySignature } from "../helpers/utilities";
// import {
//   convertAmountToRawNumber,
//   convertStringToHex,
// } from "../helpers/bignumber";
// import { hashMessage } from "ethers/lib/utils";

// export class WalletConnectService {
//   constructor({
//     provider,
//     bridge = "https://bridge.walletconnect.org",
//     chainId = ETHEREUM.chain_id,
//   }) {
//     this.bridge = bridge;
//     this.chainId = chainId;
//     this.accounts = [];
//     this.assets = [];
//     this.address = "";
//     this.provider = provider;
//     this.connector = new WalletConnect({
//       bridge: this.bridge,
//       qrcodeModal: QRCodeModal,
//     });
//   }

//   async connect() {
//     const { connector, chainId } = this;
//     if (!connector.connected) {
//       await connector.connect();
//     }
//     if (connector.chainId !== chainId) {
//       const customRequest = {
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: `0x${convertStringToHex(chainId)}` }],
//       };
//       await connector.sendCustomRequest(customRequest);
//     }
//     await this.subscribeToEvents();
//   }

//   async disconnect() {
//     const { connector } = this;
//     if (connector.connected) {
//       await connector.killSession();
//     }
//     await this.subscribeToEvents();
//   }

//   subscribeToEvents() {
//     const { connector } = this;
//     if (!connector) {
//       return;
//     }
//     connector.on("session_update", async (error, payload) => {
//       if (error) {
//         throw error;
//       }
//       const { chainId, accounts } = payload.params[0];
//       this.onSessionUpdate(accounts, chainId);
//     });
//     connector.on("connect", (error, payload) => {
//       console.log(`connector.on("connect")`);
//       if (error) {
//         throw error;
//       }
//       this.onConnect(payload);
//     });
//     connector.on("disconnect", (error) => {
//       console.log(`connector.on("disconnect")`);
//       if (error) {
//         throw error;
//       }
//       this.onDisconnect();
//     });
//     if (connector.connected) {
//       const { chainId, accounts } = connector;
//       const address = accounts[0];
//       this.chainId = chainId;
//       this.accounts = accounts;
//       this.address = address;
//       this.onSessionUpdate(accounts, chainId);
//     }
//   }

//   resetInstance() {
//     this.connector = {};
//     this.chainId = ETHEREUM.chain_id;
//     this.accounts = [];
//     this.address = "";
//   }

//   onConnect(payload) {
//     const { chainId, accounts } = payload.params[0];
//     const address = accounts[0];
//     this.chainId = chainId;
//     this.accounts = accounts;
//     this.address = address;
//   }

//   onDisconnect() {
//     this.resetInstance();
//   }

//   onSessionUpdate(accounts, chainId) {
//     const address = accounts[0];
//     this.chainId = chainId;
//     this.accounts = accounts;
//     this.address = address;
//   }

//   async _prepareTransaction(to, data, decimals = 18) {
//     const { address, chainId } = this; // eslint-disable-line
//     const from = address;
//     // const _nonce = await apiGetAccountNonce(address, chainId);
//     // const nonce = sanitizeHex(convertStringToHex(_nonce));
//     const gasPrices = await apiGetGasPrices();
//     const _gasPrice = gasPrices.slow.price;
//     const gasPrice = sanitizeHex(
//       convertStringToHex(
//         convertAmountToRawNumber(_gasPrice, Math.round(decimals / 2))
//       )
//     );
//     const _gas = 30000;
//     const gas = sanitizeHex(convertStringToHex(_gas));
//     console.log(gas);
//     console.log(gasPrice);
//     const tx = {
//       from,
//       to,
//       // nonce,
//       data,
//     };
//     return tx;
//   }
//   async sendTransaction(tokenContract, to, amount, decimals) {
//     const { connector, address } = this;
//     const iprovider = new ethers.utils.Interface(abi);
//     const data = iprovider.encodeFunctionData("transfer", [
//       to,
//       ethers.utils.parseUnits(amount, decimals),
//     ]);
//     if (!connector) {
//       console.log("No connector");
//       return;
//     }
//     const tx = await this._prepareTransaction(tokenContract, data, decimals);
//     try {
//       const result = await connector.sendTransaction(tx);
//       await this.provider.waitForTransaction(result);
//       return {
//         success: true,
//         method: "eth_sendTransaction",
//         txHash: result,
//         from: address,
//         to,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         error,
//       };
//     }
//   }
//   async signMessage(message) {
//     const { connector, address, chainId } = this;
//     const hexMsg = convertUtf8ToHex(message);
//     const msgParams = [hexMsg, address];
//     try {
//       if (!connector) {
//         return;
//       }
//       const result = await connector.signPersonalMessage(msgParams);

//       const hash = hashMessage(message);
//       const valid = await verifySignature(address, result, hash, chainId);
//       return {
//         result,
//         valid,
//       };
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }
