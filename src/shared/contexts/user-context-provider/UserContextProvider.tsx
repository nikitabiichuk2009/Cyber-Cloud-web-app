import React, { useCallback, useEffect, useReducer, Dispatch } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { useDisclosure } from '@chakra-ui/react'

import { connectMetamask } from '../../../services/metamask/index'
import { signMessage } from '../../../services/metamask/provider'
import { useWalletLoginMutation } from '../../mutations/sessions'

import { WalletConnectService } from '../../../services/walletConnect'
import { ConnectWalletModal } from '../../../components/Modals/ConnectWalletModal'

interface UserState {
  user: Record<string, any>
}

interface UserAction {
  type: 'update' | 'logout'
  payload: UserState
}

const UserStateContext = React.createContext<UserState | undefined>(undefined)

interface UserDispatchContextProps {
  updateUserContext: Dispatch<UserAction>
  onLogout: () => Promise<void>
  onOpenLoginModal: () => void
}

const UserDispatchContext = React.createContext<UserDispatchContextProps | undefined>(undefined)

const reducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'update':
      return { ...state, ...action.payload }
    case 'logout':
      return action.payload
    default:
      return state
  }
}

interface UserContextProviderProps {
  children: React.ReactNode
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { user: {} })

  const {
    isOpen: isLoginModalOpen,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure()

  const queryCache = useQueryClient()
  const navigate = useNavigate()
  const { mutate: onWalletLogin } = useWalletLoginMutation()
  const handleDispatch = useCallback((action: UserAction) => dispatch(action), [])
  const handleLogout = useCallback(async () => {
    navigate('./')
    localStorage.removeItem('AUTH_TOKEN')
    await queryCache.invalidateQueries()
    handleDispatch({ type: 'logout', payload: { user: {} } })
  }, [handleDispatch])
  const handleOpenLoginModal = useCallback(() => {
    onOpenLogin()
  }, [onOpenLogin])

  const handleWalletLogIn = async () => {
    let signedMessage: { signature: string; digest: string } | undefined
    const walletConnect = new WalletConnectService({})
    await walletConnect.disconnect()
    const message = 'Log in to CyberCloud'
    const expiresAt = Date.now() + 1 * 60 * 1000
    const dataSignObject = { expiresAt, payload: message }
    const dataSign = JSON.stringify(dataSignObject)
    console.log(walletConnect)
    console.log(dataSign)

    try {
      if (window.ethereum) {
        await connectMetamask(window.ethereum)
        signedMessage = await signMessage(window.ethereum, dataSign)
      } else {
        await walletConnect.connect()
        const { valid, result } = await walletConnect.signMessage(dataSign)
        if (valid) {
          signedMessage = {
            signature: result,
            digest: dataSign,
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
    if (signedMessage) {
      await onWalletLogin(signedMessage, {
        onSuccess: async ({ token }) => {
          localStorage.setItem('AUTH_TOKEN', token)
          await queryCache.refetchQueries()
          onCloseLogin()
        },
      })
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('AUTH_TOKEN')) {
      handleLogout()
      if (!isLoginModalOpen) onOpenLogin()
    }
  }, [isLoginModalOpen, handleLogout, onOpenLogin])

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider
        value={{
          updateUserContext: handleDispatch,
          onLogout: handleLogout,
          onOpenLoginModal: handleOpenLoginModal,
        }}
      >
        {children}
        <ConnectWalletModal
          isOpen={isLoginModalOpen}
          onClose={onCloseLogin}
          onWalletLogin={handleWalletLogIn}
        />
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

export const useUserContextState = (): UserState => {
  const context = React.useContext(UserStateContext)
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserContextProvider')
  }
  return context
}

export const useUserContextStateDispatch = (): UserDispatchContextProps => {
  const context = React.useContext(UserDispatchContext)
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserContextProvider')
  }
  return context
}

// import React, { useCallback, useEffect, useReducer } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useQueryClient } from 'react-query'
// import { useDisclosure } from '@chakra-ui/react'

// import { connectMetamask } from '../../../services/metamask/index'
// import { signMessage } from '../../../services/metamask/provider'
// import { useWalletLoginMutation } from '../../mutations/sessions'

// import { WalletConnectService } from '../../../services/walletConnect'
// import { ConnectWalletModal } from '../../../components/Modals/ConnectWalletModal'

// const UserStateContext = React.createContext({
//   user: {},
// })

// const UserDispatchContext = React.createContext({
//   updateUserContext: () => void 0,
//   onLogout: () => new Promise(() => void 0),
//   onOpenLoginModal: () => void 0,
// })

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'update':
//       return { ...state, ...action.payload }
//     case 'logout':
//       return action.payload
//     default: {
//       return state
//     }
//   }
// }

// export const UserContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, { user: {} })

//   const {
//     isOpen: isLoginModalOpen,
//     onOpen: onOpenLogin,
//     onClose: onCloseLogin,
//   } = useDisclosure()

//   const queryCache = useQueryClient()
//   const navigate = useNavigate()
//   const { mutate: onWalletLogin } = useWalletLoginMutation()
//   const handleDispatch = useCallback((action) => dispatch(action), [])
//   const handleLogout = useCallback(async () => {
//     navigate('./')
//     localStorage.removeItem('AUTH_TOKEN')
//     // await refetchUser();
//     await queryCache.invalidateQueries()
//     handleDispatch({ type: 'logout', payload: { user: {} } })
//   }, [handleDispatch])
//   const handleOpenLoginModal = useCallback(() => {
//     onOpenLogin()
//   }, [onOpenLogin])

//   const handleWalletLogIn = async () => {
//     let signedMessage
//     const walletConnect = new WalletConnectService({})
//     await walletConnect.disconnect()
//     const message = 'Log in to CyberCloud'
//     const expiresAt = Date.now() + 1 * 60 * 1000
//     const dataSignObject = { expiresAt, payload: message }
//     const dataSign = JSON.stringify(dataSignObject)
//     try {
//       if (window.ethereum) {
//         await connectMetamask(window.ethereum)
//         signedMessage = await signMessage(window.ethereum, dataSign)
//       } else {
//         await walletConnect.connect()
//         const { valid, result } = await walletConnect.signMessage(dataSign)
//         if (valid) {
//           signedMessage = {
//             signature: result,
//             digest: dataSign,
//           }
//         }
//       }
//     } catch (e) {
//       console.log(e)
//     }
//     if (signedMessage)
//       await onWalletLogin(signedMessage, {
//         onSuccess: async ({ token }) => {
//           localStorage.setItem('AUTH_TOKEN', token)
//           // await refetchUser();
//           await queryCache.refetchQueries()
//           onCloseLogin()
//         },
//       })
//   }

//   useEffect(() => {
//     if (!localStorage.getItem('AUTH_TOKEN')) {
//       handleLogout()
//       if (!isLoginModalOpen) onOpenLogin()
//     }
//   }, [isLoginModalOpen])

//   return (
//     <UserStateContext.Provider value={state}>
//       <UserDispatchContext.Provider
//         value={{
//           onLogout: handleLogout,
//           onOpenLoginModal: handleOpenLoginModal,
//         }}
//       >
//         {children}
//         <ConnectWalletModal
//           isOpen={isLoginModalOpen}
//           onClose={onCloseLogin}
//           onWalletLogin={handleWalletLogIn}
//         />
//       </UserDispatchContext.Provider>
//     </UserStateContext.Provider>
//   )
// }
// export const useUserContextState = () => {
//   const context = React.useContext(UserStateContext)
//   if (context === undefined) {
//     throw new Error('useUserState must be used within a UserContextProvider')
//   }
//   return context
// }
// export const useUserContextStateDispatch = () => {
//   const context = React.useContext(UserDispatchContext)
//   if (context === undefined) {
//     throw new Error('useUserDispatch must be used within a UserContextProvider')
//   }
//   return context
// }
