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
  // Image,
  VStack,
  Text,
  Box,
  // HStack,
} from '@chakra-ui/react'

import 'bootstrap-icons/font/bootstrap-icons.css'
// import { useNavigate } from 'react-router-dom'
// import { APP_PATHS } from '../../paths'

interface CertificatesModalProps {
  isOpen: boolean
  onClose: () => void
  certificatesInfo: object
}

export const CertificatesModal: React.FC<CertificatesModalProps> = ({
  isOpen,
  onClose,
  certificatesInfo,
}: any) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
              {certificatesInfo.expireDates && (
                <Text color="gray.500" size="lg" fontWeight="semibold">
                  Expires at{' '}
                  <Text as="span" color="mainGreen" fontWeight="semibold">
                    {certificatesInfo.expireDates}
                  </Text>{' '}
                  days
                </Text>
              )}
              <Box>
                <Text color="gray.500" size="lg" fontWeight="semibold">
                  Main info:
                </Text>
                <Text color="gray.500" size="lg" fontWeight="normal">
                  {' '}
                  SOME BASE DATA FROM CERTIFICATES{' '}
                </Text>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <Button rightIcon={<i className="bi bi-download"></i>}>Download</Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
