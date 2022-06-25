import React, { useMemo, useState } from 'react'
import { useAccount } from 'wagmi'
import { WalletSelector } from './wallet-selector'
import { SignMessage } from './sign-message'
import { Account } from './Account'

export const USER_VERIFIED_KEY = 'userVerified'

export const Connect = () => {
  const { data: accountData } = useAccount()

  const isAvailable = Boolean(accountData)

  const [userVerified, setUserVerified] = useState<string>((): string => {
    const isVerified =
      typeof window !== 'undefined' ? localStorage.getItem('userVerified') : ''
    return isVerified ?? ''
  })

  const isVerified = useMemo(() => {
    const isBrowser = typeof window !== 'undefined'
    if (isAvailable && isBrowser) {
      return Boolean(localStorage.getItem(USER_VERIFIED_KEY))
    }
    return ''
  }, [isAvailable])

  // useEffect(() => {
  //   if (accountData) {
  //     setUserVerified(
  //       typeof window !== 'undefined'
  //         ? (localStorage.getItem('userVerified') as string)
  //         : ''
  //     )
  //   } else {
  //     setUserVerified('')
  //     localStorage.clear()
  //   }
  // }, [accountData, userVerified])

  if (isVerified && isAvailable)
    return <SignMessage setUserVerified={setUserVerified} />
  else if (accountData && isAvailable && userVerified) return <Account />
  return <WalletSelector />
}
