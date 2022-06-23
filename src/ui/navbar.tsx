import { Image, Stack } from '@chakra-ui/react'
import { Connect } from './parts/connect'
import React from 'react'

export const Navbar = () => {
  return (
    <Stack justifyContent='space-between' direction='row' align='center' py='4'>
      <Image src='/foundation.svg' alt='foundation' w='20' />
      <Connect />
    </Stack>
  )
}
