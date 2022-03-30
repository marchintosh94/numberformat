export interface NumberFormatOptions {
  delimitersChar: { decimal: string; thousands: string};
  defaultDecimals: number | undefined;
  currecySymbol?: string;
}
let decimalSeparator = ','
let thousandsSeparator = '.'
let defaultNumberOfDecimals = 2
let defaultCurrecySymbol = ''
let value: string | undefined

/**
 * Init number format options
 * @param initOption NumberFormatOptions
 */
export const initNumberFormat = ({
  delimitersChar: {decimal, thousands},
  defaultDecimals,
  currecySymbol
}: NumberFormatOptions) => {
  decimalSeparator = decimal
  thousandsSeparator = thousands
  defaultNumberOfDecimals = defaultDecimals !== undefined? defaultDecimals : 2
  defaultCurrecySymbol = currecySymbol || ''
}

/**
 * Hook to format number 
 * @param number number | string | undefined 
 * @example 
 * useNumberFormat(100).format(2)
 * useNumberFormat('100').formatCurrency()
 */
export const useNumberFormat = (number?: string | number) => {
  if(number != undefined && number != null){
    switch(typeof number){
      case 'number':
        value = number.toString()
        break
      case 'string':
        value = number == ''? Number(undefined).toString() : Number(number.replace(',', '.')).toString()
        break
      default:
        throw TypeError('Invalid number type')
    }
  } else {
    value = number! as string
  }

  /**
   * Init number format behavior
   * @param numberFormatOptions NumberFormatOptions
   */
  const init = ({
    delimitersChar: {decimal, thousands},
    defaultDecimals,
    currecySymbol
  }: NumberFormatOptions) => {
    decimalSeparator = decimal
    thousandsSeparator = thousands
    defaultNumberOfDecimals = defaultDecimals !== undefined? defaultDecimals : 2
    defaultCurrecySymbol = currecySymbol || ''
  }

  /**
   * Return number formatted as string with specified number of decimals.
   * It use as decimals separator the value (or default value) defined in @param delimitersChar.decimals
   * It use as thousands separator the value (or default value) defined in @param delimitersChar.thousands
   * @param decimals number  Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
   * @returns string Number formatted as string
   */
  const format = (decimals: number = defaultNumberOfDecimals): string => {
    if(value == undefined){
      throw new TypeError("Number not defined on useNumberFormat decalration") 
    } 
    if(isNaN(Number(value)) || value == ''){
      throw new TypeError("Number defined on useNumberFormat decalration is not valid number") 
    }
    const numberSplitted = value.toString().split('.')
    const intPortion = numberSplitted.length? numberSplitted[0] : '0'
    const decimalPortion = (numberSplitted.length > 1? Number(`0.${numberSplitted[1]}`).toFixed(decimals) : Number().toFixed(decimals)).substring(2)

    return `${intPortion.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator)}${decimalPortion? decimalSeparator : ''}${decimalPortion}`
  }

  const formatCurrency = (decimals?: number, currecySymbol?: string): string => {
    const symbol = currecySymbol || defaultCurrecySymbol
    return `${format(decimals || defaultNumberOfDecimals)} ${symbol}`
  } 

  const setCurrencySymbol = (char: string) => {
    defaultCurrecySymbol = char
  }

  return {
    init,
    format,
    setCurrencySymbol,
    formatCurrency
  }
}