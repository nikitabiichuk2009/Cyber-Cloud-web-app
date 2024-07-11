import React, { useCallback, useEffect, useReducer, Dispatch, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { useDisclosure } from '@chakra-ui/react'
import { jwtDecode } from 'jwt-decode'

import { connectMetamask, connectRoninWallet } from '../../../services/metamask/index'
import {
  signMessage,
  signRoninMessage,
  signRoninMessageVerify,
} from '../../../services/metamask/provider'
import { useWalletLoginMutation } from '../../mutations/sessions'

import { WalletConnectService } from '../../../services/walletConnect'
import { ConnectWalletModal } from '../../../components/Modals/ConnectWalletModal'
import { AUTH_ISSUER } from '../../helpers/const'
import { APP_PATHS } from '../../../paths'

interface UserState {
  user: Record<string, any>
}

interface UserAction {
  type: 'update' | 'logout'
  payload: UserState
}

interface DecodedToken {
  iss: string
  aud: string
  exp: number
  userId: string
  type: string
  iat: number
  permissions?: string[]
  context?: any
}

const UserStateContext = React.createContext<UserState | undefined>(undefined)

interface UserDispatchContextProps {
  updateUserContext: Dispatch<UserAction>
  onLogout: () => Promise<void>
  onOpenLoginModal: () => void
  isUserLogIn: boolean
  handleWalletLogIn: any
  handleRoninWalletLogIn: any
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
  const [isUserLogIn, setIsUserLogIn] = useState(false)

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
    setIsUserLogIn(false)
  }, [handleDispatch])

  const handleOpenLoginModal = useCallback(() => {
    onOpenLogin()
  }, [onOpenLogin])

  const checkAuthToken = () => {
    const token = localStorage.getItem('AUTH_TOKEN')
    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token)

      if (
        !decodedToken.exp ||
        decodedToken.exp * 1000 < Date.now() ||
        decodedToken.iss !== AUTH_ISSUER
      ) {
        handleLogout()
      }

      handleDispatch({
        type: 'update',
        payload: {
          user: { userId: decodedToken.userId },
        },
      })
      setIsUserLogIn(true)
    } else {
      handleLogout()
      onOpenLogin()
    }
  }

  const handleWalletLogIn = async (pageRedirect?: keyof typeof APP_PATHS) => {
    let signedMessage: { signature: string; digest: string } | undefined
    const walletConnect = new WalletConnectService({})
    await walletConnect.disconnect()
    const message = 'Log in to Cyber Cloud (P)'
    const expiresAt = Date.now() + 1 * 60 * 1000
    const dataSignObject = { expiresAt, payload: message }
    const dataSign = JSON.stringify(dataSignObject)

    try {
      if (window.ethereum) {
        await connectMetamask(window.ethereum)
        signedMessage = await signMessage(window.ethereum, dataSign)
      } else {
        await walletConnect.connect()
        const signedResult = await walletConnect.signMessage(dataSign)
        if (signedResult?.valid) {
          signedMessage = {
            signature: signedResult.result,
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
          checkAuthToken()
          if (pageRedirect) {
            navigate(APP_PATHS[pageRedirect])
          }
        },
      })
    }
  }

  const handleRoninWalletLogIn = async (pageRedirect?: keyof typeof APP_PATHS) => {
    let signedMessage: { signature: string; digest: string } | undefined
    const message = 'Log in to Cyber Cloud (P)'
    const expiresAt = Date.now() + 1 * 60 * 1000
    const dataSignObject = { expiresAt, payload: message }
    const dataSign = JSON.stringify(dataSignObject)

    try {
      if (window.ronin) {
        signedMessage = await signRoninMessage(dataSign)
      } else {
        window.alert('Please install Ronin Wallet')
      }
    } catch (e) {
      console.log(e)
    }
    if (signedMessage) {
      // For test
      // console.log('signedMessage', signedMessage)
      // const walletAddress = await signRoninMessageVerify(dataSign, signedMessage.signature)
      // console.log('walletAddress', walletAddress)

      await onWalletLogin(signedMessage, {
        onSuccess: async ({ token }) => {
          localStorage.setItem('AUTH_TOKEN', token)
          await queryCache.refetchQueries()
          onCloseLogin()
          checkAuthToken()
          if (pageRedirect) {
            navigate(APP_PATHS[pageRedirect])
          }
        },
      })
    }
  }

  useEffect(() => {
    checkAuthToken()
  }, [])

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider
        value={{
          updateUserContext: handleDispatch,
          onLogout: handleLogout,
          onOpenLoginModal: handleOpenLoginModal,
          handleWalletLogIn: handleWalletLogIn,
          handleRoninWalletLogIn: handleRoninWalletLogIn,
          isUserLogIn: isUserLogIn,
        }}
      >
        {children}
        <ConnectWalletModal
          isOpen={isLoginModalOpen}
          onClose={onCloseLogin}
          onWalletLogin={handleWalletLogIn}
          onRoninWalletLogin={handleRoninWalletLogIn}
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
