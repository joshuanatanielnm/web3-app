import React from 'react'
import { Box, Text, useDisclosure, Stack, Center } from '@chakra-ui/react'

import { Button } from '../core/button'
import { verifyMessage } from 'ethers/lib/utils'
import { useDisconnect, useSignMessage } from 'wagmi'
import { ModalSignMessage } from '../core/modal'

type SignMessage = {
  setUserVerified: React.Dispatch<React.SetStateAction<string>>
}

export const SignMessage = ({ setUserVerified }: SignMessage) => {
  const { onClose } = useDisclosure()
  const { disconnect } = useDisconnect()
  const { isError, isLoading, signMessage } = useSignMessage({
    message: 'Please sign this message to connect to Foundation.',
    onSuccess(data, variables) {
      const address = verifyMessage(variables.message, data)
      localStorage.setItem('userVerified', address)
      setUserVerified(localStorage.getItem('userVerified') as string)
    },
  })

  if (isError)
    return (
      <ModalSignMessage
        isOpen={true}
        onClose={onClose}
        modalHeader={'Canceled'}
        modalDesc={
          'Looks like you canceled signing of authentication message with your provider'
        }
      >
        <Stack>
          <Button
            onClick={() => signMessage()}
            bg='black'
            color='white'
            w='full'
            rounded='xl'
          >
            Try again
          </Button>
          <Center>
            <Text
              textAlign='center'
              pt='3'
              fontWeight='medium'
              color='gray.400'
              as='button'
              onClick={() => disconnect()}
            >
              Disconnect
            </Text>
          </Center>
        </Stack>
      </ModalSignMessage>
    )

  return (
    <ModalSignMessage
      isOpen={true}
      onClose={onClose}
      modalHeader={'Sign the message in your wallet to continue'}
      modalDesc={
        'Foundation uses this signature to verify that you’re the owner of this Ethereum address.'
      }
    >
      <Box>
        <Button
          onClick={() => signMessage()}
          bg='black'
          color='white'
          w='full'
          rounded='xl'
        >
          {isLoading ? 'Sign message in wallet' : 'Continue'}
        </Button>
        <Center>
          <Text
            textAlign='center'
            pt='3'
            fontWeight='medium'
            color='gray.400'
            as='button'
            onClick={() => disconnect()}
          >
            Disconnect
          </Text>
        </Center>
      </Box>
    </ModalSignMessage>
  )
}
