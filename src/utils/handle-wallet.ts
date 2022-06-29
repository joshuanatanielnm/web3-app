export const handleButtonColor = (name: string): string => {
  if (name === 'MetaMask') {
    return 'linear(to-r, #FF5C00, #FFDC24)'
  } else if (name === 'WalletConnect') {
    return 'linear(to-r, #8F00FF, #0700FF)'
  } else {
    return 'linear(to-r, #3773F5, #0052FF)'
  }
}

export const handleButtonImage = (name: string): string => {
  if (name === 'MetaMask') {
    return '/metaMask.svg'
  } else if (name === 'WalletConnect') {
    return '/walletConnect.svg'
  } else {
    return '/coinBase.svg'
  }
}
