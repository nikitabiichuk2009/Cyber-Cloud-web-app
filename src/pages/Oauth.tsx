import { useState } from 'react'
// import React from 'react'
// import { useNavigate } from 'react-router-dom'

import { Button, Text, Tooltip, useDisclosure, VStack } from '@chakra-ui/react'
import 'bootstrap-icons/font/bootstrap-icons.css'

// import { APP_PATHS } from '../paths'
import { CertificatesModal } from '../components/Modals/CertificatesModal'
import { setDocumentTitle } from '../components/PageElements/helpers'

export const Oauth = () => {
  // const navigate = useNavigate()
  setDocumentTitle('Oauth')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [certificatesInfo, setCertificatesInfo] = useState({ name: '' })

  function openModal(data: { name: string; expireDates?: number }) {
    setCertificatesInfo(data)
    onOpen()
  }

  const buttonList = [
    {
      leftIcon: <i className="bi bi-discord"></i>,
      rightIcon: <i className="bi bi-plus"></i>,
      isConnect: false,
      isExpire: false,
      onClick: () => {
        openModal({
          name: 'Discord',
          expireDates: 90,
        })
      },
      name: 'Discord',
    },
    {
      leftIcon: <i className="bi bi-github"></i>,
      rightIcon: <i className="bi bi-plus"></i>,
      isConnect: false,
      isExpire: false,
      onClick: () => {
        openModal({
          name: 'Github',
        })
      },
      name: 'Github',
    },
    {
      leftIcon: <i className="bi bi-telegram"></i>,
      rightIcon: <i className="bi bi-plus"></i>,
      isConnect: false,
      isExpire: false,
      onClick: () => {
        openModal({
          name: 'Telegram',
        })
      },
      name: 'Telegram',
    },
    {
      leftIcon: <i className="bi bi-google"></i>,
      rightIcon: <i className="bi bi-plus"></i>,
      isConnect: true,
      isExpire: true,
      expireDates: 0,
      onClick: () => {
        openModal({
          name: 'Google',
        })
      },
      name: 'Google',
    },
    {
      leftIcon: <i className="bi bi-apple"></i>,
      rightIcon: <i className="bi bi-plus"></i>,
      isConnect: false,
      isExpire: false,
      onClick: () => {
        openModal({
          name: 'Apple',
        })
      },
      name: 'Apple',
    },
    {
      leftIcon: <i className="bi bi-twitter-x"></i>,
      rightIcon: <i className="bi bi-plus"></i>,
      isConnect: false,
      isExpire: false,
      onClick: () => {
        openModal({
          name: 'Twitter',
        })
      },
      name: 'Twitter',
    },
    {
      leftIcon: <i className="bi bi-linkedin"></i>,
      rightIcon: <i className="bi bi-plus"></i>,
      isConnect: false,
      isExpire: false,
      onClick: () => {
        openModal({
          name: 'LinkedIn',
        })
      },
      name: 'LinkedIn',
    },
    {
      leftIcon: <i className="bi bi-facebook"></i>,
      rightIcon: <i className="bi bi-plus"></i>,
      isConnect: true,
      isExpire: false,
      expireDates: 72,
      onClick: () => {
        openModal({
          name: 'Facebook',
          expireDates: 72,
        })
      },
      name: 'Facebook',
    },
  ]
  //alignItems={{ base: 'start', md: 'center' }}
  return (
    <VStack alignItems={{ base: 'start', md: 'center' }} gap={{ base: '10px', md: '30px' }}>
      <Text
        fontSize={{ base: 'lg', md: 'xl' }}
        textShadow="0px 0px 0.5px #040404"
        fontWeight="semibold"
        lineHeight="7"
        textAlign="center"
        p="16px 50px"
      >
        Choose a social networks or platforms to create certificates or download an already
        existing.
      </Text>

      <VStack
        alignItems="center"
        // px={{ base: '12px', md: '50px' }}
        gap="16px"
        textShadow="0px 0px 1px #040404"
        textAlign="center"
      >
        {buttonList.map((button, index: number) => (
          <Tooltip
            key={`${index}-tooltip`}
            label={
              !button.isConnect ? (
                'Not connected'
              ) : button.isExpire ? (
                'Get new certificates'
              ) : (
                <>
                  Check exists certificates <br />
                  Will expire in {button.expireDates} days
                </>
              )
            }
            placement="right"
            // placement="bottom"
            hasArrow
            // isOpen
          >
            <Button
              key={`${index}-button`}
              w={{ base: '160px', md: '200px' }}
              leftIcon={button.leftIcon}
              rightIcon={!button.isConnect && !button.isExpire ? button.rightIcon : undefined}
              color={button.isConnect && !button.isExpire ? 'greenNotActive' : 'mainGreen'}
              size={{ base: 'md', md: 'lg' }}
              fontSize={{ base: 'md', md: 'lg' }}
              boxShadow="xl"
              onClick={button.onClick}
            >
              {button.name}
            </Button>
          </Tooltip>
        ))}
      </VStack>
      <CertificatesModal isOpen={isOpen} onClose={onClose} certificatesInfo={certificatesInfo} />
    </VStack>
  )
}
