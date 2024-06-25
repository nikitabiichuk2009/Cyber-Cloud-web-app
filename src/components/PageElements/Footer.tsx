import { Link as ReactRouterLink } from 'react-router-dom'

import { Box, Link, Stack, Text } from '@chakra-ui/react'

export const Footer = () => {
  return (
    <Box as="footer" alignSelf="normal" display="flex" justifyContent="center">
      <Stack
        bg="mainBlack"
        direction="row"
        justifyContent="space-between"
        align="center"
        boxShadow="dark-lg"
        h="60px"
        borderRadius="40px 40px 0 0"
        maxW="container.2xl"
        p={{ base: '0px 40px', md: '0px 75px' }}
        textColor="gray.500"
        fontWeight="bold"
        // lineHeight="5"
        fontSize={{ base: 'sm', md: 'md' }}
        w="100%"
        mx="8px"
      >
        <Text textColor="gray.500" fontWeight="bold" fontSize={{ base: 'sm', md: 'md' }}>
          © 2024, CyberCloud
        </Text>
        <Link as={ReactRouterLink} variant="text" to="/terms-and-condition" textAlign="center">
          Terms and condition
        </Link>
      </Stack>
    </Box>
  )
}
