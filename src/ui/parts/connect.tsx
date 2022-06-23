import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { WalletSelector } from './wallet-selector'
import { SignMessage } from './sign-message'
import { Account } from './Account'

export const Connect = () => {
  const { data: accountData } = useAccount()
  const [isAvailable, setIsAvailable] = useState(false)
  const [userVerified, setUserVerified] = useState<string>((): string => {
    const isVerified =
      typeof window !== 'undefined' ? localStorage.getItem('userVerified') : ''
    if (isVerified) {
      return userVerified
    } else {
      return ''
    }
  })

  useEffect(() => {
    if (accountData) {
      setUserVerified(
        typeof window !== 'undefined'
          ? (localStorage.getItem('userVerified') as string)
          : ''
      )
    } else {
      setUserVerified('')
      localStorage.clear()
    }
  }, [accountData, userVerified])

  useEffect(() => {
    if (accountData) {
      setIsAvailable(true)
    } else {
      setIsAvailable(false)
    }
  }, [accountData])

  if (accountData && isAvailable && !userVerified)
    return <SignMessage setUserVerified={setUserVerified} />
  else if (accountData && isAvailable && userVerified) return <Account />

  return <WalletSelector />
}
