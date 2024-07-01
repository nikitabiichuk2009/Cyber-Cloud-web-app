import React from 'react'
// import { useNavigate } from 'react-router-dom'

import { Heading, Image, Text, VStack } from '@chakra-ui/react'
import { setDocumentTitle } from '../components/PageElements/helpers'
// import { APP_PATHS } from '../paths'

export const HomePage: React.FC = () => {
  // const navigate = useNavigate()
  setDocumentTitle('')

  return (
    <VStack alignItems="center" gap={{ base: '10px', md: '30px' }}>
      <VStack
        alignItems="center"
        px={{ base: '12px', md: '50px' }}
        gap="16px"
        textShadow="0px 0px 1px #040404"
        textAlign="center"
      >
        <Heading as="h2" color="mainGreen">
          Welcome to Your Cyber Citizenship!
        </Heading>
        <Heading variant="h3" size="lg" as="h3">
          Let&apos;s Build Your Digital Profile Together!
        </Heading>

        <Text fontSize={{ base: 'lg', md: '2xl' }} fontWeight="medium">
          Step into the future with CyberCloud, where your digital identity takes center stage.
          Our platform enables you to create digital certificates tailored to your chosen social
          networks and platforms. Join us in crafting a seamless and personalized digital
          experience just for you. Your journey to a strong and secure digital profile begins
          here. Welcome aboard!
        </Text>
      </VStack>
      <Image src="/images/map_img.svg" alt="Map" objectFit="cover" w="100%" />
    </VStack>
  )
}
