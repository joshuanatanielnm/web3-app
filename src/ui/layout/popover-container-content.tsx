import { Stack, StackProps } from '@chakra-ui/react'
import React from 'react'

export const PopoverContainerContent: React.FC<StackProps> = (props) => {
  return (
    <Stack
      as='button'
      w='full'
      align='center'
      direction='row'
      my='2'
      p='2'
      rounded='lg'
      role='group'
      _hover={{
        bg: 'gray.50',
      }}
      {...props}
    >
      {props.children}
    </Stack>
  )
}
