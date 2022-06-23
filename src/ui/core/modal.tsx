import React from 'react'
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  Heading,
  Box,
  ModalCloseButton,
} from '@chakra-ui/react'

interface Modal {
  isOpen: boolean
  onClose: () => void
  children: JSX.Element
  modalHeader: string
  modalDesc: string
}
interface ModalSignMessage extends Modal {
  isCloseable?: boolean
}

export const ModalSelectWallet = ({
  isOpen,
  onClose,
  children,
  modalHeader,
  modalDesc,
}: Modal) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered size='sm'>
      <ModalOverlay />
      <ModalContent pb='12'>
        <ModalCloseButton />
        <Heading textAlign='center' fontSize='4xl' pt='8' pb='2'>
          {modalHeader}
        </Heading>
        <Text textAlign='center' px='6' pb='4'>
          {modalDesc}
        </Text>
        <ModalBody pt='2'>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}

export const ModalSignMessage = ({
  isOpen,
  onClose,
  children,
  modalHeader,
  modalDesc,
  isCloseable,
}: ModalSignMessage) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered size='sm'>
      <ModalOverlay />
      <ModalContent pt='4' pb='10'>
        <Box px='4'>
          {isCloseable && <ModalCloseButton />}
          <Heading textAlign='center' fontSize='2xl' pt='8' pb='4'>
            {modalHeader}
          </Heading>
          <Text textAlign='center' px='6' pb='6' fontSize='sm'>
            {modalDesc}
          </Text>
        </Box>
        <ModalBody pt='2'>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}
