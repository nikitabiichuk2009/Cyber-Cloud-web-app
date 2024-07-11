import React from 'react'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'

import {
  Stack,
  Link,
  Container,
  Box,
  Button,
  Text,
  useDisclosure,
  HStack,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { ConnectWalletModal } from '../Modals/ConnectWalletModal'
import {
  useUserContextState,
  useUserContextStateDispatch,
} from '../../shared/contexts/user-context-provider'
import { APP_PATHS } from '../../paths'
import { trimAddress } from '../../shared/helpers/trimAddress'

export const Header: React.FC = () => {
  const {
    isOpen: isLoginModalOpen,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure()
  const { user } = useUserContextState()
  const { onLogout, handleWalletLogIn, handleRoninWalletLogIn, onOpenLoginModal, isUserLogIn } =
    useUserContextStateDispatch()

  const navigate = useNavigate()

  const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' })
  const fontSize = useBreakpointValue({ base: 'md', md: 'lg' })

  const isOauthPage = location.pathname === '/oauth'

  return (
    <Box as="header" maxW="100%" zIndex="10">
      <Container maxW="container.2xl" px={{ base: '8px', md: '16px' }}>
        <Stack
          height={{ base: '70px', sm: '100px' }}
          alignItems="center"
          direction="row"
          justify="space-between"
          align="end"
          maxW="container.2xl"
        >
          <Link as={ReactRouterLink} variant="text" to="/">
            <Text variant="bold" color="mainBlack" fontSize="2xl" as="b">
              <Text as="mark" variant="bold" bg="mainGreen" pl="4px" py="2px" fontSize="2xl">
                {'  '}
                Cyber
              </Text>
              Cloud
            </Text>
          </Link>
          {!isUserLogIn ? (
            <Button size={buttonSize} fontSize={fontSize} onClick={onOpenLoginModal}>
              Connect Wallet
            </Button>
          ) : (
            <HStack gap="16px">
              <VStack gap="4px">
                <Text variant="h4">Wallet</Text>
                <Text variant="h5" color="mainGreen">
                  {trimAddress(user.userId)}
                </Text>
              </VStack>
              {!isOauthPage && (
                <Button
                  size={buttonSize}
                  fontSize={fontSize}
                  onClick={() => navigate(APP_PATHS.oauth)}
                >
                  Connect Networks
                </Button>
              )}

              <Button size={buttonSize} fontSize={fontSize} onClick={onLogout}>
                Log out
              </Button>
            </HStack>
          )}
        </Stack>
      </Container>
      <ConnectWalletModal
        isOpen={isLoginModalOpen}
        onClose={onCloseLogin}
        onWalletLogin={handleWalletLogIn}
        onRoninWalletLogin={handleRoninWalletLogIn}
      />
    </Box>
  )
}
