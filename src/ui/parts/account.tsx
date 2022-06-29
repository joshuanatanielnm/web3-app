import {
  Box,
  Text,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useClipboard,
  Tooltip,
  Image,
} from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import {
  useAccount,
  useDisconnect,
  useBalance,
  useNetwork,
  useEnsAvatar,
} from 'wagmi'

import { truncateAddress } from '../../utils/address'
import { BsChevronRight } from 'react-icons/bs'
import { AiOutlinePoweroff } from 'react-icons/ai'
import { PopoverContainerContent } from '../layout/popover-container-content'

export const Account = () => {
  const { data: accountData } = useAccount()
  const { data: ensBalanceData } = useBalance({
    addressOrName: accountData?.address,
  })
  const { data: ensAvatarData } = useEnsAvatar({
    addressOrName: accountData?.address,
  })
  const { disconnect } = useDisconnect()
  const { activeChain } = useNetwork()
  const [value] = useState(accountData?.address ?? '')
  const { hasCopied, onCopy } = useClipboard(value)

  const address = truncateAddress(4, accountData?.address)
  const isNetworkSupported = useMemo(() => {
    return !activeChain?.unsupported
  }, [activeChain?.unsupported])

  const balance = `${Math.round(
    parseInt(ensBalanceData?.formatted ?? '0') ?? 0
  )} ETH`

  return (
    <Popover>
      <PopoverTrigger>
        <Box
          as='button'
          rounded='full'
          border='solid 2px'
          borderColor='gray.300'
          _hover={{
            borderColor: 'black',
            transition: '1s',
          }}
          _expanded={{
            borderColor: 'black',
            transition: '1s',
            bg: 'black',
          }}
          boxSize={9}
        >
          {ensAvatarData ? (
            <Image
              src={ensAvatarData}
              alt='avatar'
              boxSize={7}
              rounded='full'
              boxShadow='xl'
              mx='auto'
              my='auto'
            />
          ) : (
            <Box
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              boxSize={7}
              rounded='full'
              boxShadow='xl'
              mx='auto'
              my='auto'
            />
          )}
        </Box>
      </PopoverTrigger>
      <PopoverContent width='64' border='none' boxShadow='xl'>
        <PopoverBody>
          {/* profile button */}
          <PopoverContainerContent>
            <Box>
              {ensAvatarData ? (
                <Image
                  src={ensAvatarData}
                  alt='avatar'
                  boxSize={9}
                  rounded='full'
                  boxShadow='xl'
                />
              ) : (
                <Box
                  bgGradient='linear(to-l, #7928CA, #FF0080)'
                  boxSize={9}
                  rounded='full'
                  boxShadow='xl'
                />
              )}
            </Box>
            <Flex align='center' justifyContent='space-between' w='full'>
              <Text fontSize='md' fontWeight='medium' pl='1' pr='2'>
                Profile
              </Text>
              <Box
                color='gray'
                _groupHover={{
                  color: 'black',
                }}
              >
                <BsChevronRight size={16} />
              </Box>
            </Flex>
          </PopoverContainerContent>

          {/* Wallet balance */}
          <Box border='0.5px solid' borderColor='gray.200' rounded='lg' p='2'>
            <Flex align='center' justifyContent='space-between'>
              <Text fontSize='xs' fontWeight='medium' color='gray.500'>
                Wallet Balance
              </Text>

              <Tooltip
                label={
                  isNetworkSupported
                    ? hasCopied
                      ? 'coppied to clipboard'
                      : 'copy to clipboard'
                    : 'Change your network'
                }
                placement='top'
                closeDelay={300}
              >
                <Flex
                  align='center'
                  gap={1}
                  background='gray.100'
                  px='2'
                  py='1'
                  rounded='lg'
                  as='button'
                  onClick={onCopy}
                >
                  <Text fontSize='xs'>
                    {isNetworkSupported ? address : 'Wrong Network'}
                  </Text>
                  <Box
                    bg={isNetworkSupported ? 'green.400' : 'red.400'}
                    boxSize={3}
                    rounded='full'
                  />
                </Flex>
              </Tooltip>
            </Flex>
            <Text fontSize='lg' fontWeight='bold'>
              {balance}
            </Text>
          </Box>

          {/* Disconnect button */}
          <PopoverContainerContent onClick={() => disconnect()}>
            <Box>
              <AiOutlinePoweroff size={18} />
            </Box>
            <Flex align='center' justifyContent='space-between' w='full'>
              <Text fontSize='md' fontWeight='medium' pl='1' pr='2'>
                Disconnect
              </Text>
              <Box
                color='gray'
                _groupHover={{
                  color: 'black',
                }}
              >
                <BsChevronRight size={16} />
              </Box>
            </Flex>
          </PopoverContainerContent>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
