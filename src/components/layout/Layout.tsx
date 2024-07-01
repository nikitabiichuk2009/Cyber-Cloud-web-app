import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container, Flex } from '@chakra-ui/react'
// import { isEmpty } from 'lodash'

import { Header } from '../PageElements/Header'
import { Footer } from '../PageElements/Footer'

// import { useUserContextState } from 'shared/contexts/user-context-provider'

export const Layout: React.FC = () => {
  //   const { user } = useUserContextState()

  //   const isNotLogIn = isEmpty(user)
  //   const langIsSet = user.isLanguagesSet

  return (
    // isNotLogIn &&
    <Flex direction="column" minH="100vh">
      <Header />

      {/* {!isNotLogIn && langIsSet && ( */}
      <Container as="main" maxW="container.2xl" flex="1" p="16px">
        <Outlet />
      </Container>
      {/* )} */}
      {/* {(isNotLogIn || !langIsSet) && <Box fit="contain" h={`calc(100vh - 295px)`} />} */}
      <Footer />
    </Flex>
  )
}
