import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container, Flex } from '@chakra-ui/react'

import { Header } from '../PageElements/Header'
import { Footer } from '../PageElements/Footer'

export const Layout: React.FC = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Header />

      <Container as="main" maxW="container.2xl" flex="1" p="16px">
        <Outlet />
      </Container>

      <Footer />
    </Flex>
  )
}
