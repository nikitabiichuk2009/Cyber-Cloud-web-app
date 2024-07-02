import React from 'react'
// import { useNavigate } from 'react-router-dom'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
  VStack,
} from '@chakra-ui/react'

import 'bootstrap-icons/font/bootstrap-icons.css'
// import { APP_PATHS } from '../../paths'

interface ConnectWalletModalProps {
  isOpen: boolean
  onClose: () => void
  onWalletLogin: any
}

export const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({
  isOpen,
  onClose,
  onWalletLogin,
}) => {
  // const navigate = useNavigate()

  const wallets = [
    {
      name: 'MetaMask',
      icon: '/images/walletNetwork/MetaMask.svg',
      isDisabled: false,
      onClick: () => {
        onWalletLogin('oauth')
        // navigate(APP_PATHS.oauth)
        // onClose()
      },
    },
    {
      name: 'CoinBase Wallet',
      icon: '/images/walletNetwork/Coin.svg',
      isDisabled: true,
      onClick: () => {
        // navigate(APP_PATHS.oauth)
        // onClose()
      },
    },
    {
      name: 'WalletConnect',
      icon: '/images/walletNetwork/Connect.svg',
      isDisabled: true,
      onClick: () => {
        // navigate(APP_PATHS.oauth)
        // onClose()
      },
    },
    {
      name: 'Keplr',
      icon: '/images/walletNetwork/Connect2.png',
      isDisabled: true,
      onClick: () => {
        // navigate(APP_PATHS.oauth)
        // onClose()
      },
    },
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connect wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack gap="16px">
            {wallets.map((wallet, index) => (
              <Button
                variant="wallet"
                key={index}
                w="100%"
                // leftIcon={wallet.icon}
                leftIcon={<Image src={wallet.icon} alt={wallet.name} boxSize="32px" />}
                rightIcon={<i className="bi bi-chevron-right"></i>}
                color="mainGreen"
                size={{ base: 'md', md: 'lg' }}
                fontSize={{ base: 'md', md: 'lg' }}
                boxShadow="xl"
                isDisabled={wallet.isDisabled}
                onClick={wallet.onClick}
              >
                {wallet.name}
              </Button>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
