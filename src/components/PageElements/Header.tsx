import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'

import { Stack, Link, Container, Box, Button, Text, useDisclosure } from '@chakra-ui/react'
import { ConnectWalletModal } from '../Modals/ConnectWalletModal'
// import {
//   // useUserContextState,
//   // useUserContextStateDispatch,
// } from '../../shared/contexts/user-context-provider'
// import { isEmpty } from 'lodash'

// import {
//   StyledNavLink,
//   // LanguageSwitcher
// } from './helpers'

// import {
//   useUserContextState,
//   useUserContextStateDispatch,
// } from 'shared/contexts/user-context-provider'

// import { LoginModal, RegistrationModal } from '../Modals'

export const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const { user } = useUserContextState()
  // const { onLogout } = useUserContextStateDispatch()

  // const displayMenuItems = useBreakpointValue({ base: true, lg: false })
  // const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' })

  const isNotLogIn = true //isEmpty(user) || !user?.isLanguagesSet

  return (
    <Box as="header" maxW="100%" zIndex="10">
      <Container maxW="container.2xl" px={{ base: '8px', md: '16px' }}>
        <Stack
          height={{ base: '70px', sm: '100px' }}
          // alignSelf="stretch"
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
          {isNotLogIn ? (
            <Button
              size={{ base: 'md', md: 'lg' }}
              fontSize={{ base: 'md', md: 'lg' }}
              onClick={onOpen}
            >
              Connect Wallet
            </Button>
          ) : (
            <Button
              size={{ base: 'md', md: 'lg' }}
              fontSize={{ base: 'md', md: 'lg' }}
              // onClick={onLogout}
            >
              Log out
            </Button>
          )}
        </Stack>
      </Container>
      <ConnectWalletModal isOpen={isOpen} onClose={onClose} onWalletLogin={''} />
    </Box>
  )
}
