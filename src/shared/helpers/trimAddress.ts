export const trimAddress = (address: string): string => {
  if (address.length < 10) return address
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}
