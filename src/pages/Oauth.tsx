import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Spinner, Text, Tooltip, useDisclosure, VStack } from '@chakra-ui/react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { differenceInDays, addDays } from 'date-fns'
import { isNull } from 'lodash'

import { setDocumentTitle } from '../components/PageElements/helpers'
import { APP_PATHS } from '../paths'
import { CERTIFICATE_VALID_PERIOD_DAYS } from '../shared/helpers/const'
import { certificatesInfoProps, CertificatesModal } from '../components/Modals/CertificatesModal'

import {
  useAppleAuth,
  useAppleAuthCallback,
  useDiscordAuth,
  useDiscordAuthCallback,
  useFacebookAuth,
  useFacebookAuthCallback,
  useGithubAuth,
  useGithubAuthCallback,
  useGoogleAuth,
  useGoogleAuthCallback,
  useLinkedInAuth,
  useLinkedInAuthCallback,
  useTelegramAuth,
  useTelegramAuthCallback,
  useTwitterAuth,
  useTwitterAuthCallback,
} from '../shared/queries/oauth'

export const Oauth: React.FC = () => {
  setDocumentTitle('OAuth')
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentDate = new Date()
  const [certificatesInfo, setCertificatesInfo] = useState({} as certificatesInfoProps)

  const [AppleAuthCallback, setAppleAuthCallback] = useState<string | null>(null)
  const [DiscordAuthCallback, setDiscordAuthCallback] = useState<string | null>(null)
  const [FacebookAuthCallback, setFacebookAuthCallback] = useState<string | null>(null)
  const [GithubAuthCallback, setGithubAuthCallback] = useState<string | null>(null)
  const [GoogleAuthCallback, setGoogleAuthCallback] = useState<string | null>(null)
  const [LinkedInAuthCallback, setLinkedInAuthCallback] = useState<string | null>(null)
  const [TelegramAuthCallback, setTelegramAuthCallback] = useState<string | null>(null)
  const [TwitterAuthCallback, setTwitterAuthCallback] = useState<string | null>(null)

  const { data: appleAuth, isLoading: isAppleAuthLoading } = useAppleAuth()
  const { data: discordAuth, isLoading: isDiscordAuthLoading } = useDiscordAuth()
  const { data: facebookAuth, isLoading: isFacebookAuthLoading } = useFacebookAuth()
  const { data: githubAuth, isLoading: isGithubAuthLoading } = useGithubAuth()
  const { data: googleAuth, isLoading: isGoogleAuthLoading } = useGoogleAuth()
  const { data: linkedinAuth, isLoading: isLinkedInAuthLoading } = useLinkedInAuth()
  const { data: telegramAuth, isLoading: isTelegramAuthLoading } = useTelegramAuth()
  const { data: twitterAuth, isLoading: isTwitterAuthLoading } = useTwitterAuth()

  const { data: appleAuthCallback, isLoading: isAppleAuthCallbackLoading } =
    useAppleAuthCallback(AppleAuthCallback)
  const { data: discordAuthCallback, isLoading: isDiscordAuthCallbackLoading } =
    useDiscordAuthCallback(DiscordAuthCallback)
  const { data: facebookAuthCallback, isLoading: isFacebookAuthCallbackLoading } =
    useFacebookAuthCallback(FacebookAuthCallback)
  const { data: githubAuthCallback, isLoading: isGithubAuthCallbackLoading } =
    useGithubAuthCallback(GithubAuthCallback)
  const { data: googleAuthCallback, isLoading: isGoogleAuthCallbackLoading } =
    useGoogleAuthCallback(GoogleAuthCallback)
  const { data: linkedInAuthCallback, isLoading: isLinkedInAuthCallbackLoading } =
    useLinkedInAuthCallback(LinkedInAuthCallback)
  const { data: telegramAuthCallback, isLoading: isTelegramAuthCallbackLoading } =
    useTelegramAuthCallback(TelegramAuthCallback)
  const { data: twitterAuthCallback, isLoading: isTwitterAuthCallbackLoading } =
    useTwitterAuthCallback(TwitterAuthCallback)

  const saveAuthCallbackData = (networkName: string, authCallbackData: object) => {
    const fullName = networkName.toUpperCase() + '_DATA'

    const expireDates = addDays(currentDate, CERTIFICATE_VALID_PERIOD_DAYS)

    const authCallbackInfo = {
      name: networkName,
      expireDates,
      additionalInfo: authCallbackData,
    }

    localStorage.setItem(fullName, JSON.stringify(authCallbackInfo))

    setAppleAuthCallback(null)
    setDiscordAuthCallback(null)
    setFacebookAuthCallback(null)
    setGithubAuthCallback(null)
    setGoogleAuthCallback(null)
    setLinkedInAuthCallback(null)
    setTelegramAuthCallback(null)
    setTwitterAuthCallback(null)

    navigate(APP_PATHS.oauth)
    onNetworkClick(networkName)
  }

  useEffect(() => {
    if (appleAuthCallback && !isAppleAuthCallbackLoading) {
      saveAuthCallbackData('Apple', appleAuthCallback)
    }
    if (discordAuthCallback && !isDiscordAuthCallbackLoading) {
      saveAuthCallbackData('Discord', discordAuthCallback)
    }
    if (facebookAuthCallback && !isFacebookAuthCallbackLoading) {
      saveAuthCallbackData('Facebook', facebookAuthCallback)
    }
    if (githubAuthCallback && !isGithubAuthCallbackLoading) {
      saveAuthCallbackData('Github', githubAuthCallback)
    }
    if (googleAuthCallback && !isGoogleAuthCallbackLoading) {
      saveAuthCallbackData('Google', googleAuthCallback)
    }
    if (linkedInAuthCallback && !isLinkedInAuthCallbackLoading) {
      saveAuthCallbackData('LinkedIn', linkedInAuthCallback)
    }
    if (telegramAuthCallback && !isTelegramAuthCallbackLoading) {
      saveAuthCallbackData('Telegram', telegramAuthCallback)
    }
    if (twitterAuthCallback && !isTwitterAuthCallbackLoading) {
      saveAuthCallbackData('Twitter', twitterAuthCallback)
    }
  }, [
    appleAuthCallback,
    discordAuthCallback,
    facebookAuthCallback,
    githubAuthCallback,
    googleAuthCallback,
    linkedInAuthCallback,
    telegramAuthCallback,
    twitterAuthCallback,
  ])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const type = params.get('type') as string
    const code = params.get('code') as string

    if (type === 'apple') {
      console.log('apple Auth URL:', code)
      setAppleAuthCallback(code)
    }
    if (type === 'discord') {
      console.log('discord Auth URL:', code)
      setDiscordAuthCallback(code)
    }
    if (type === 'facebook') {
      console.log('facebook Auth URL:', code)
      setFacebookAuthCallback(code)
    }
    if (type === 'github') {
      console.log('github Auth URL:', code)
      setGithubAuthCallback(code)
    }
    if (type === 'google') {
      console.log('Google Auth URL:', code)
      setGoogleAuthCallback(code)
    }
    if (type === 'linkedin') {
      console.log('linkedin Auth URL:', code)
      setLinkedInAuthCallback(code)
    }
    if (type === 'telegram') {
      console.log('telegram Auth URL:', code)
      setTelegramAuthCallback(code)
    }
    if (type === 'twitter') {
      console.log('twitter Auth URL:', code)
      setTwitterAuthCallback(code)
    }
  }, [])

  const isAuthUrlLoading =
    isAppleAuthLoading ||
    isDiscordAuthLoading ||
    isFacebookAuthLoading ||
    isGithubAuthLoading ||
    isGoogleAuthLoading ||
    isLinkedInAuthLoading ||
    isTelegramAuthLoading ||
    isTwitterAuthLoading

  if (isAuthUrlLoading) {
    return (
      <VStack alignItems={{ base: 'start', md: 'center' }} gap={{ base: '10px', md: '30px' }}>
        <Spinner size="xl" alignItems="center" />
      </VStack>
    )
  }
  const networkAuthData: Record<string, any> = {
    apple: { auth: appleAuth, loading: isAppleAuthLoading },
    discord: { auth: discordAuth, loading: isDiscordAuthLoading },
    facebook: { auth: facebookAuth, loading: isFacebookAuthLoading },
    github: { auth: githubAuth, loading: isGithubAuthLoading },
    google: { auth: googleAuth, loading: isGoogleAuthLoading },
    linkedin: { auth: linkedinAuth, loading: isLinkedInAuthLoading },
    telegram: { auth: telegramAuth, loading: isTelegramAuthLoading },
    twitter: { auth: twitterAuth, loading: isTwitterAuthLoading },
  }

  const isCertificateExpire = (networkName: string) => {
    const fullName = networkName.toUpperCase() + '_DATA'
    const storageData = localStorage.getItem(fullName)
    if (storageData) {
      const decodeData = JSON.parse(storageData)
      const expireDate = differenceInDays(decodeData.expireDates, currentDate)

      if (expireDate <= 0) {
        localStorage.setItem(fullName, '')
        return 0
      }

      return expireDate
    } else {
      return 0
    }
  }

  const isConnect = (networkName: string) => {
    const fullName = networkName.toUpperCase() + '_DATA'
    const storageData = localStorage.getItem(fullName)

    return !isNull(storageData) ? true : false
  }

  const onNetworkClick = (networkName: string) => {
    const networkNameLowercase = networkName.toLowerCase()
    const fullName = networkName.toUpperCase() + '_DATA'
    const storageData = localStorage.getItem(fullName)

    if (storageData) {
      const decodeData = JSON.parse(storageData)
      // openModal(decodeData)
      setCertificatesInfo(decodeData)
      onOpen()
    } else if (
      networkAuthData[networkNameLowercase] &&
      !networkAuthData[networkNameLowercase].loading
    ) {
      const authUrl = networkAuthData[networkNameLowercase].auth?.authUrl
      if (authUrl) {
        window.open(authUrl, '_self')
      }
    }
  }

  const buttonList = [
    {
      leftIcon: <i className="bi bi-apple"></i>,
      rightIcon: <i className="bi bi-plus"></i>,
      isDisabled: false,
      name: 'Apple',
    },
    {
      leftIcon: <i className="bi bi-discord"></i>,
      rightIcon: <i className="bi bi-plus"></i>,
      isDisabled: false,
      name: 'Discord',
    },
    {
      leftIcon: <i className="bi bi-facebook"></i>,
      rightIcon: <i className="bi bi-plus"></i>,
      isDisabled: false,
      name: 'Facebook',
    },
    {
      leftIcon: <i className="bi bi-github"></i>,
      rightIcon: <i className="bi bi-plus"></i>,
      isDisabled: false,
      name: 'Github',
    },
    {
      leftIcon: <i className="bi bi-google"></i>,
      rightIcon: <i className="bi bi-plus"></i>,
      isDisabled: false,
      name: 'Google',
    },
    {
      leftIcon: <i className="bi bi-linkedin"></i>,
      rightIcon: <i className="bi bi-plus"></i>,
      isDisabled: false,
      name: 'LinkedIn',
    },
    {
      leftIcon: <i className="bi bi-telegram"></i>,
      rightIcon: <i className="bi bi-plus"></i>,
      isDisabled: false,
      name: 'Telegram',
    },
    {
      leftIcon: <i className="bi bi-twitter-x"></i>,
      rightIcon: <i className="bi bi-plus"></i>,
      isDisabled: false,
      name: 'Twitter',
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

      <VStack alignItems="center" gap="16px" textShadow="0px 0px 1px #040404" textAlign="center">
        {buttonList.map((button, index: number) => (
          <Tooltip
            key={`${index}-tooltip`}
            label={
              !isConnect(button.name) ? (
                'Not connected'
              ) : !isCertificateExpire(button.name) ? (
                'Get new certificates'
              ) : (
                <>
                  Check exists certificates <br />
                  Will expire in {isCertificateExpire(button.name)} days
                </>
              )
            }
            placement="right"
            hasArrow
          >
            <Button
              key={`${index}-button`}
              w={{ base: '160px', md: '200px' }}
              leftIcon={button.leftIcon}
              rightIcon={
                !isConnect(button.name) && !isCertificateExpire(button.name)
                  ? button.rightIcon
                  : undefined
              }
              color={
                isConnect(button.name) && isCertificateExpire(button.name)
                  ? 'greenNotActive'
                  : 'mainGreen'
              }
              size={{ base: 'md', md: 'lg' }}
              fontSize={{ base: 'md', md: 'lg' }}
              boxShadow="xl"
              onClick={() => onNetworkClick(button.name)}
              isDisabled={button.isDisabled}
              // onClick={button.onClick}
              // isLoading={isAuthUrlLoading}
              //  isLoading={networkAuthData[button.name]?.loading}
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
