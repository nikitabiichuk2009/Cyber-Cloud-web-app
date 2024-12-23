import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Spinner, Text, Tooltip, useDisclosure, VStack } from '@chakra-ui/react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { differenceInDays } from 'date-fns'
import { isNull } from 'lodash'

import { setDocumentTitle } from '../components/PageElements/helpers'
import { APP_PATHS } from '../paths'
import { certificatesInfoProps, CertificatesModal } from '../components/Modals/CertificatesModal'
import { jwtDecode } from 'jwt-decode'

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
  useRedditAuth,
  useRedditAuthCallback,
  useTelegramAuth,
  useTelegramAuthCallback,
  useTwitterAuth,
  useTwitterAuthCallback,
  useCoinbaseAuth,
  useCoinbaseAuthCallback,
  useWorldIdAuth,
  useWorldIdAuthCallback,
  useTikTokAuth,
  useTikTokAuthCallback,
  useInstagramAuth,
  useInstagramAuthCallback,
  useYoutubeAuth,
  useYoutubeAuthCallback,
} from '../shared/queries/oauth'
import { useWeb3StampsMutation } from '../shared/mutations/sessions'
import { connectMetamask } from '../services/metamask'
import { signMessage } from '../services/metamask/provider'
import { WalletConnectService } from '../services/walletConnect'

export const Oauth: React.FC = () => {
  setDocumentTitle('OAuth')
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { mutate: onWeb3Login } = useWeb3StampsMutation()
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
  const [RedditAuthCallback, setRedditAuthCallback] = useState<string | null>(null)
  const [CoinbaseAuthCallback, setCoinbaseAuthCallback] = useState<string | null>(null)
  const [WorldIdAuthCallback, setWorldIdAuthCallback] = useState<string | null>(null)
  const [TikTokAuthCallback, setTikTokAuthCallback] = useState<string | null>(null)
  const [InstagramAuthCallback, setInstagramAuthCallback] = useState<string | null>(null)
  const [YoutubeAuthCallback, setYoutubeAuthCallback] = useState<string | null>(null)
  const { data: appleAuth, isLoading: isAppleAuthLoading } = useAppleAuth()
  const { data: discordAuth, isLoading: isDiscordAuthLoading } = useDiscordAuth()
  const { data: facebookAuth, isLoading: isFacebookAuthLoading } = useFacebookAuth()
  const { data: githubAuth, isLoading: isGithubAuthLoading } = useGithubAuth()
  const { data: googleAuth, isLoading: isGoogleAuthLoading } = useGoogleAuth()
  const { data: linkedinAuth, isLoading: isLinkedInAuthLoading } = useLinkedInAuth()
  const { data: telegramAuth, isLoading: isTelegramAuthLoading } = useTelegramAuth()
  const { data: twitterAuth, isLoading: isTwitterAuthLoading } = useTwitterAuth()
  const { data: redditAuth, isLoading: isRedditAuthLoading } = useRedditAuth()
  const { data: coinbaseAuth, isLoading: isCoinbaseAuthLoading } = useCoinbaseAuth()
  const { data: worldIdAuth, isLoading: isWorldIdAuthLoading } = useWorldIdAuth()
  const { data: tikTokAuth, isLoading: isTikTokAuthLoading } = useTikTokAuth()
  const { data: instagramAuth, isLoading: isInstagramAuthLoading } = useInstagramAuth()
  const { data: youtubeAuth, isLoading: isYoutubeAuthLoading } = useYoutubeAuth()
  const { data: appleAuthCallback, isLoading: isAppleAuthCallbackLoading } =
    useAppleAuthCallback(AppleAuthCallback)
  const { data: tikTokAuthCallback, isLoading: isTikTokAuthCallbackLoading } =
    useTikTokAuthCallback(TikTokAuthCallback)
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
  const { data: redditAuthCallback, isLoading: isRedditAuthCallbackLoading } =
    useRedditAuthCallback(RedditAuthCallback)
  const { data: coinbaseAuthCallback, isLoading: isCoinbaseAuthCallbackLoading } =
    useCoinbaseAuthCallback(CoinbaseAuthCallback)
  const { data: worldIdAuthCallback, isLoading: isWorldIdAuthCallbackLoading } =
    useWorldIdAuthCallback(WorldIdAuthCallback)
  const { data: instagramAuthCallback, isLoading: isInstagramAuthCallbackLoading } =
    useInstagramAuthCallback(InstagramAuthCallback)
  const { data: youtubeAuthCallback, isLoading: isYoutubeAuthCallbackLoading } =
    useYoutubeAuthCallback(YoutubeAuthCallback)

  const saveAuthCallbackData = (
    networkName: string,
    authCallbackData: {
      stamps: string[]
      attestationResponse: any
    }
  ) => {
    const fullName = networkName.toUpperCase() + '_DATA'

    interface DecodedToken {
      exp?: number
      [key: string]: any
    }

    let expireDates = new Date()
    let additionalInfo: any = 'You do not meet any Stamps criteria'

    console.log('data', authCallbackData)

    if (authCallbackData.stamps.length > 0) {
      const decodedTokens = authCallbackData.stamps.map((stamp) => ({
        decoded: jwtDecode<DecodedToken>(stamp),
        jwt: stamp,
      }))

      const firstTokenData = decodedTokens[0]?.decoded
      if (firstTokenData?.exp) {
        expireDates = new Date(firstTokenData.exp * 1000) // Convert expiration time from seconds to milliseconds
      }
      additionalInfo = decodedTokens
    }

    const authCallbackInfo = {
      name: networkName,
      expireDates,
      additionalInfo,
    }

    if (authCallbackData.stamps.length > 0) {
      localStorage.setItem(fullName, JSON.stringify(authCallbackInfo))
    } else {
      setCertificatesInfo(authCallbackInfo)
      onOpen()
    }

    setAppleAuthCallback(null)
    setDiscordAuthCallback(null)
    setFacebookAuthCallback(null)
    setGithubAuthCallback(null)
    setGoogleAuthCallback(null)
    setLinkedInAuthCallback(null)
    setTelegramAuthCallback(null)
    setTwitterAuthCallback(null)
    setRedditAuthCallback(null)
    setCoinbaseAuthCallback(null)
    setWorldIdAuthCallback(null)
    setTikTokAuthCallback(null)
    setInstagramAuthCallback(null)
    setYoutubeAuthCallback(null)
    navigate(APP_PATHS.oauth)
    if (authCallbackData.stamps.length > 0) {
      onNetworkClick(networkName)
    }
  }

  const handleWeb3Login = async () => {
    let signedMessage: { signature: string; digest: string } | undefined
    const walletConnect = new WalletConnectService({})
    await walletConnect.disconnect()
    const message = 'Issue Web3 Stamps for Cyber Cloud (P)'
    const expiresAt = Date.now() + 1 * 60 * 1000
    const dataSignObject = { expiresAt, payload: message }
    const dataSign = JSON.stringify(dataSignObject)

    try {
      if (window.ethereum) {
        await connectMetamask(window.ethereum)
        signedMessage = await signMessage(window.ethereum, dataSign)
      } else {
        await walletConnect.connect()
        const signedResult = await walletConnect.signMessage(dataSign)
        if (signedResult?.valid) {
          signedMessage = {
            signature: signedResult.result,
            digest: dataSign,
          }
        }
      }
    } catch (e) {
      console.log(e)
    }

    if (signedMessage) {
      onWeb3Login(signedMessage, {
        onSuccess: (data) => {
          saveAuthCallbackData('Web3', data)
        },
      })
    }
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
    if (redditAuthCallback && !isRedditAuthCallbackLoading) {
      saveAuthCallbackData('Reddit', redditAuthCallback)
    }
    if (coinbaseAuthCallback && !isCoinbaseAuthCallbackLoading) {
      saveAuthCallbackData('Coinbase', coinbaseAuthCallback)
    }
    if (worldIdAuthCallback && !isWorldIdAuthCallbackLoading) {
      saveAuthCallbackData('WorldId', worldIdAuthCallback)
    }
    if (tikTokAuthCallback && !isTikTokAuthCallbackLoading) {
      saveAuthCallbackData('TikTok', tikTokAuthCallback)
    }
    if (instagramAuthCallback && !isInstagramAuthCallbackLoading) {
      saveAuthCallbackData('Instagram', instagramAuthCallback)
    }
    if (youtubeAuthCallback && !isYoutubeAuthCallbackLoading) {
      saveAuthCallbackData('Youtube', youtubeAuthCallback)
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
    redditAuthCallback,
    coinbaseAuthCallback,
    worldIdAuthCallback,
    tikTokAuthCallback,
    instagramAuthCallback,
    youtubeAuthCallback,
  ])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const type = params.get('type') as string
    const code = params.get('code') as string
    console.log('code', code)

    // if (!type && code) {
    //   setWorldIdAuthCallback(code)
    // } for now we don't need this

    // if (!type && code) {
    //   setTikTokAuthCallback(code)
    // }
    if (!type && code) {
      setInstagramAuthCallback(code)
    }
    if (type === 'apple') {
      const id_token = params.get('id_token') as string
      setAppleAuthCallback(id_token)
    }
    if (type === 'discord') {
      setDiscordAuthCallback(code)
    }
    if (type === 'facebook') {
      setFacebookAuthCallback(code)
    }
    if (type === 'github') {
      setGithubAuthCallback(code)
    }
    if (type === 'google') {
      setGoogleAuthCallback(code)
    }
    if (type === 'linkedin') {
      setLinkedInAuthCallback(code)
    }
    if (type === 'telegram') {
      const tgAuthResult = window.location.hash.split('=')[1]
      setTelegramAuthCallback(tgAuthResult)
    }
    if (type === 'twitter') {
      setTwitterAuthCallback(code)
    }
    if (type === 'reddit') {
      setRedditAuthCallback(code)
    }
    if (type === 'coinbase') {
      setCoinbaseAuthCallback(code)
    }
    if (type === 'youtube') {
      setYoutubeAuthCallback(code)
    }
    // if (type === 'instagram') {
    //   setInstagramAuthCallback(code)
    // }
    // if (type === 'tiktok') {
    //   setTikTokAuthCallback(code)
    // }
    // if (type === 'worldId') {
    //   setWorldIdAuthCallback(code)
    // } broken
  }, [])

  const isAuthUrlLoading =
    isAppleAuthLoading ||
    isDiscordAuthLoading ||
    isFacebookAuthLoading ||
    isGithubAuthLoading ||
    isGoogleAuthLoading ||
    isLinkedInAuthLoading ||
    isTelegramAuthLoading ||
    isTwitterAuthLoading ||
    isCoinbaseAuthLoading ||
    isTikTokAuthCallbackLoading ||
    isInstagramAuthCallbackLoading ||
    isYoutubeAuthCallbackLoading

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
    reddit: { auth: redditAuth, loading: isRedditAuthLoading },
    coinbase: { auth: coinbaseAuth, loading: isCoinbaseAuthLoading },
    worldId: { auth: worldIdAuth, loading: isWorldIdAuthLoading },
    tiktok: { auth: tikTokAuth, loading: isTikTokAuthLoading },
    instagram: { auth: instagramAuth, loading: isInstagramAuthLoading },
    youtube: { auth: youtubeAuth, loading: isYoutubeAuthLoading },
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
    const networkNameLowercase =
      networkName === 'WorldId' ? 'worldId' : networkName.toLowerCase()
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
    } else if (networkName === 'Web3') {
      handleWeb3Login()
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
      leftIcon: <i className="bi bi-youtube"></i>,
      rightIcon: <i className="bi bi-plus"></i>,
      isDisabled: false,
      name: 'Youtube',
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
    {
      leftIcon: <i className="bi bi-reddit"></i>,
      rightIcon: <i className="bi bi-plus"></i>,
      isDisabled: false,
      name: 'Reddit',
    },
    {
      leftIcon: <i className="bi bi-tiktok"></i>,
      rightIcon: <i className="bi bi-plus"></i>,
      isDisabled: false,
      name: 'TikTok',
    },
    {
      leftIcon: <i className="bi bi-instagram"></i>,
      rightIcon: <i className="bi bi-plus"></i>,
      isDisabled: false,
      name: 'Instagram',
    },
    {
      leftIcon: (
        <img
          src="/images/coinbase.png"
          alt="coinbase icon"
          width={32}
          height={32}
          style={{
            filter:
              'brightness(0) saturate(100%) invert(89%) sepia(19%) saturate(1011%) hue-rotate(18deg) brightness(104%) contrast(98%)',
          }}
        />
      ),
      rightIcon: <i className="bi bi-plus"></i>,
      isDisabled: false,
      name: 'Coinbase',
    },
    {
      leftIcon: (
        <img
          src="/images/worldID.png"
          alt="worldId icon"
          width={32}
          height={32}
          style={{
            filter:
              'brightness(0) saturate(100%) invert(89%) sepia(19%) saturate(1011%) hue-rotate(18deg) brightness(104%) contrast(98%)',
          }}
        />
      ),
      rightIcon: <i className="bi bi-plus"></i>,
      isDisabled: false,
      name: 'WorldId',
    },
    {
      leftIcon: (
        <img
          src="/images/web3.png"
          alt="web3 icon"
          width={32}
          height={32}
          style={{
            filter:
              'brightness(0) saturate(100%) invert(89%) sepia(19%) saturate(1011%) hue-rotate(18deg) brightness(104%) contrast(98%)',
          }}
        />
      ),
      rightIcon: <i className="bi bi-plus"></i>,
      isDisabled: false,
      name: 'Web3',
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
