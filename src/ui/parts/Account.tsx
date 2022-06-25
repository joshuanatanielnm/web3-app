import { Box, Text, useDisclosure, Stack, Flex } from '@chakra-ui/react'
import React from 'react'
import { useAccount, useDisconnect, useBalance, useNetwork } from 'wagmi'

import { Button } from '../core/button'
import { ModalSignMessage } from '../core/modal'

export const Account = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: accountData } = useAccount()
  const { data: ensBalanceData } = useBalance({
    addressOrName: accountData?.address,
  })
  const { disconnect } = useDisconnect()
  const { activeChain } = useNetwork()

  // utils/address.ts -> truncateAddress(address, 4)
  const address = `${accountData?.address?.substring(
    0,
    4
  )}...${accountData?.address?.substring(accountData?.address?.length - 4)}`

  const balance = `${ensBalanceData?.formatted} ${ensBalanceData?.unit}`

  return (
    <Box>
      <Box
        boxSize={12}
        bgGradient='linear(to-l, #7928CA, #FF0080)'
        rounded='xl'
        boxShadow='xl'
        as='button'
        onClick={onOpen}
      />

      <ModalSignMessage
        isOpen={isOpen}
        onClose={onClose}
        modalHeader={'Account Information'}
        modalDesc={'Your account detail information'}
        isCloseable
      >
        <Flex w='full' direction='column' align='center'>
          <Box p='4' rounded='lg' boxShadow='md' mb='7' bg='whiteAlpha.700'>
            <Box
              boxSize={14}
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              rounded='xl'
              boxShadow='xl'
              mx='auto'
            />
            <Box mt='2'>
              <Text>Account Code: {address}</Text>
              <Text>Wallet Ballance: {balance}</Text>
              <Text>Connected to: {activeChain?.name}</Text>
            </Box>
          </Box>
          <Button bg='red.500' color='white' onClick={() => disconnect()}>
            Disconnect
          </Button>
        </Flex>
      </ModalSignMessage>
    </Box>
  )
}
