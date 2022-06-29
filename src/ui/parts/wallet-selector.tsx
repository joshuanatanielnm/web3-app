import React from 'react'

import { ModalSelectWallet } from '../core/modal'
import { useConnect } from 'wagmi'
import {
  Box,
  HStack,
  Text,
  Stack,
  Image,
  useDisclosure,
} from '@chakra-ui/react'
import { Button } from '../core/button'

import { WalletButton } from '../core/button'
import { handleButtonColor, handleButtonImage } from '../../utils/handle-wallet'

export const WalletSelector = () => {
  const { connectors, activeConnector, connect, error } = useConnect()

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box>
      <Button bg='black' color='white' rounded='3xl' onClick={onOpen}>
        Connect Wallet
      </Button>
      <ModalSelectWallet
        isOpen={isOpen}
        onClose={onClose}
        modalHeader={'Select a wallet'}
        modalDesc={
          'By connecting your wallet, you agree to our Terms of Service and our Privacy Policy.'
        }
      >
        <Stack spacing='3'>
          {connectors
            .filter((x) => x.ready && x.id !== activeConnector?.id)
            .map((x) => (
              <WalletButton
                bgGradient={handleButtonColor(x.name)}
                key={x.id}
                onClick={() => connect(x)}
              >
                <HStack justifyContent='space-between'>
                  <Text fontSize='lg'>{x.name}</Text>
                  <Box>
                    <Image alt={x.name} src={handleButtonImage(x.name)} w='7' />
                  </Box>
                </HStack>
              </WalletButton>
            ))}

          {error && <Text color='red'>{error.message}</Text>}
        </Stack>
      </ModalSelectWallet>
    </Box>
  )
}
