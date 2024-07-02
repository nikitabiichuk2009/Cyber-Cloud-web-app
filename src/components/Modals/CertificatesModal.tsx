import React from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  Text,
  Box,
  Code,
  useBreakpointValue,
} from '@chakra-ui/react'
import { differenceInDays } from 'date-fns'
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import 'bootstrap-icons/font/bootstrap-icons.css'

export interface certificatesInfoProps {
  name: string
  expireDates: Date
  additionalInfo?: { userInfo?: object; user?: object } | any
}

interface CertificatesModalProps {
  isOpen: boolean
  onClose: () => void
  certificatesInfo: {
    name: string
    expireDates: Date
    additionalInfo?: certificatesInfoProps | any
  }
}

export const CertificatesModal: React.FC<CertificatesModalProps> = ({
  isOpen,
  onClose,
  certificatesInfo,
}) => {
  const modalSize = useBreakpointValue({ base: 'md', md: '3xl' })

  const currentDate = new Date()
  const expireDate = differenceInDays(certificatesInfo.expireDates, currentDate)

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={modalSize} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text variant="h3" color="gray.500" fontWeight="semibold">
            <Text as="span" variant="h3" color="mainGreen">
              {certificatesInfo.name}
            </Text>{' '}
            Certificates
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py="8px" minH="160px">
          <VStack gap="16px" alignItems="start">
            {!!certificatesInfo.expireDates && expireDate > 0 && (
              <Text color="gray.500" size="lg" fontWeight="semibold">
                Expires at{' '}
                <Text as="span" color="mainGreen" fontWeight="semibold">
                  {expireDate}
                </Text>{' '}
                days
              </Text>
            )}
            {!!certificatesInfo.expireDates && expireDate <= 0 && (
              <Text color="red.500" size="lg" fontWeight="bold">
                Expired
              </Text>
            )}
            <Box w="100%">
              <Text color="gray.500" size="lg" fontWeight="semibold" marginBottom="16px">
                Main user info:
              </Text>
              <Code
                bg="gray.300"
                p="4"
                borderRadius="lg"
                overflowX="auto"
                whiteSpace="pre-wrap"
                color="gray.800"
                fontSize="sm"
                fontFamily="monospace"
                w="100%"
                children={
                  certificatesInfo?.additionalInfo
                    ? JSON.stringify(certificatesInfo.additionalInfo, null, 2)
                    : 'NO DATA FROM CERTIFICATES'
                }
              />
              {/* <SyntaxHighlighter
                  language="json"
                  customStyle={{
                    backgroundColor: 'transparent',
                    padding: '0',
                    margin: '0',
                    width: '100%',
                  }}
                >
                  {JSON.stringify(certificatesInfo.additionalInfo, null, 2)}
                </SyntaxHighlighter> */}
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          <Button rightIcon={<i className="bi bi-download"></i>} isDisabled={true}>
            Download
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
