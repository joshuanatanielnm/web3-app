import React, { useEffect, useState, useMemo } from 'react'
import { useAccount } from 'wagmi'
import { WalletSelector } from './wallet-selector'
import { SignMessage } from './sign-message'
import { Account } from './account'
import { useMounted } from '../../hooks/useMounted'

export const USER_VERIFIED_KEY = 'userVerified'

export const Connect = () => {
  const { data: accountData } = useAccount()
  const { hasMounted } = useMounted()

  const isAccountDataAvailable = hasMounted && accountData
  const [userVerified, setUserVerified] = useState<string>((): string => {
    const isVerified =
      typeof window !== 'undefined' ? localStorage.getItem('userVerified') : ''
    if (isVerified) {
      return userVerified
    } else {
      return ''
    }
  })

  const isVerified = useMemo(() => {
    const isBrowser = typeof window !== 'undefined'
    if (userVerified && isBrowser) {
      return Boolean(localStorage.getItem(USER_VERIFIED_KEY))
    }
    return ''
  }, [userVerified])

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

  if (isAccountDataAvailable) {
    return isVerified ? (
      <Account />
    ) : (
      <SignMessage setUserVerified={setUserVerified} />
    )
  }

  return <WalletSelector />
}
