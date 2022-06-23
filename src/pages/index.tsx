import { Container } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Navbar } from '../ui/navbar'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Web3 App</title>
        <meta name='description' content='about web3 stuff' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container maxW='6xl'>
        <Navbar />
      </Container>
    </>
  )
}

export default Home
