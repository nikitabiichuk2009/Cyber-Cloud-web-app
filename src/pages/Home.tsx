// import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { APP_PATHS } from '../paths'

export const HomePage = () => {
  const navigate = useNavigate()

  return (
    <Flex direction="column" minH="100vh" bgColor="mainPageBlack">
      <Box p={5}>
        <Heading as="h1" size="xl" mb={4}>
          Welcome to Chakra UI with TypeScript
        </Heading>
        <Text fontSize="lg" mb={4}>
          This is a simple example of a React app using Chakra UI and TypeScript.
        </Text>
        <Button
          colorScheme="teal"
          size="md"
          onClick={() => navigate(APP_PATHS.termsAndConditions)}
        >
          Terms and condition
        </Button>
      </Box>
    </Flex>
  )
}
