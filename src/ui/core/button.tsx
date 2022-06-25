import {
  Box,
  BoxProps,
  ButtonProps,
  Button as ChakraButton,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React from 'react'

export const MyButton: React.FC<ButtonProps> = (props) => {
  return (
    <Box
      as={motion.div}
      whileHover={{
        y: -1,
      }}
    >
      <ChakraButton {...props} variant='unstyled' h='12' />
    </Box>
  )
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <MyButton {...props}>
      <Box px='5'>{props.children}</Box>
    </MyButton>
  )
}

export const WalletButton: React.FC<ButtonProps> = (props) => {
  return (
    <MyButton w='full' {...props} rounded='xl' color='white'>
      <Box px='5'>{props.children}</Box>
    </MyButton>
  )
}
