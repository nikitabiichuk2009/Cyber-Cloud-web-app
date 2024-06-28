import BigNumber from 'bignumber.js'

export const isNaN = (value: string | number): boolean => new BigNumber(`${value}`).isNaN()

export const isNumber = (value: string | number): boolean => !isNaN(value)

export const isInteger = (value: string | number): boolean =>
  new BigNumber(`${value}`).isInteger()

export const isPositive = (value: string | number): boolean =>
  new BigNumber(`${value}`).isPositive()

export const isNegative = (value: string | number): boolean =>
  new BigNumber(`${value}`).isNegative()

export const isZero = (value: string | number): boolean => new BigNumber(`${value}`).isZero()

export const countDecimalPlaces = (value: string | number): number => {
  const decimalPlaces = new BigNumber(`${value}`).dp()
  return decimalPlaces !== null ? decimalPlaces : 0
}

export const convertNumberToString = (value: string | number): string =>
  new BigNumber(`${value}`).toString()

export const convertStringToNumber = (value: string | number): number =>
  new BigNumber(`${value}`).toNumber()

export const convertHexToString = (hex: string): string => new BigNumber(`${hex}`).toString()

export const convertStringToHex = (value: string | number): string =>
  new BigNumber(`${value}`).toString(16)

export const greaterThan = (numberOne: string | number, numberTwo: string | number): boolean =>
  new BigNumber(`${numberOne}`).comparedTo(new BigNumber(`${numberTwo}`)) === 1

export const greaterThanOrEqual = (
  numberOne: string | number,
  numberTwo: string | number
): boolean => new BigNumber(`${numberOne}`).comparedTo(new BigNumber(`${numberTwo}`)) >= 0

export const smallerThan = (numberOne: string | number, numberTwo: string | number): boolean =>
  new BigNumber(`${numberOne}`).comparedTo(new BigNumber(`${numberTwo}`)) === -1

export const smallerThanOrEqual = (
  numberOne: string | number,
  numberTwo: string | number
): boolean => new BigNumber(`${numberOne}`).comparedTo(new BigNumber(`${numberTwo}`)) <= 0

export const multiply = (numberOne: string | number, numberTwo: string | number): string =>
  new BigNumber(`${numberOne}`).times(new BigNumber(`${numberTwo}`)).toString()

export const divide = (numberOne: string | number, numberTwo: string | number): string =>
  new BigNumber(`${numberOne}`).dividedBy(new BigNumber(`${numberTwo}`)).toString()

export const floorDivide = (numberOne: string | number, numberTwo: string | number): string =>
  new BigNumber(`${numberOne}`).dividedToIntegerBy(new BigNumber(`${numberTwo}`)).toString()

export const mod = (numberOne: string | number, numberTwo: string | number): string =>
  new BigNumber(`${numberOne}`).mod(new BigNumber(`${numberTwo}`)).toString()

export const add = (numberOne: string | number, numberTwo: string | number): string =>
  new BigNumber(`${numberOne}`).plus(new BigNumber(`${numberTwo}`)).toString()

export const subtract = (numberOne: string | number, numberTwo: string | number): string =>
  new BigNumber(`${numberOne}`).minus(new BigNumber(`${numberTwo}`)).toString()

export const convertAmountToRawNumber = (value: string | number, decimals = 18): string =>
  new BigNumber(`${value}`).times(new BigNumber('10').pow(decimals)).toString()

export const convertAmountFromRawNumber = (value: string | number, decimals = 18): string =>
  new BigNumber(`${value}`).dividedBy(new BigNumber('10').pow(decimals)).toString()

export const handleSignificantDecimals = (
  value: string | number,
  decimals: string | number,
  buffer?: string | number
): string | null => {
  if (
    !new BigNumber(`${decimals}`).isInteger() ||
    (buffer && !new BigNumber(`${buffer}`).isInteger())
  ) {
    return null
  }
  buffer = buffer ? convertStringToNumber(buffer) : 3
  decimals = convertStringToNumber(decimals)
  const absolute = new BigNumber(`${value}`).abs().toNumber()
  if (smallerThan(absolute, 1)) {
    decimals = value.toString().slice(2).search(/[^0]/g) + buffer
    decimals = decimals < 8 ? decimals : 8
  } else {
    decimals = decimals < buffer ? decimals : buffer
  }
  let result = new BigNumber(`${value}`).toFixed(decimals)
  result = new BigNumber(`${result}`).toString()
  const dp = new BigNumber(`${result}`).dp()
  return dp !== null && dp <= 2
    ? new BigNumber(`${result}`).toFormat(2)
    : new BigNumber(`${result}`).toFormat()
}

export const formatFixedDecimals = (
  value: string | number,
  decimals: string | number
): string => {
  const _value = convertNumberToString(value)
  const _decimals = convertStringToNumber(decimals)
  return new BigNumber(new BigNumber(_value).toFixed(_decimals)).toString()
}

export const formatInputDecimals = (
  inputOne: string | number,
  inputTwo: string | number
): string => {
  const _nativeAmountDecimalPlaces = countDecimalPlaces(inputTwo)
  const decimals = _nativeAmountDecimalPlaces > 8 ? _nativeAmountDecimalPlaces : 8
  return new BigNumber(formatFixedDecimals(inputOne, decimals)).toFormat().replace(/,/g, '')
}
