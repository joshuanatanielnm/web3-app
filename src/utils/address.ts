export const truncateAddress = (num: number, adress?: string) => {
  return adress
    ? `${adress.substring(0, num)}...${adress.substring(adress.length - num)}`
    : ''
}
