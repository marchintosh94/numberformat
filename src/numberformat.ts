export interface NumberFormatOptions {
  delimitersChar: { decimal: string; thousands: string};
  defaultDecimals: number | undefined;
  defaultCurrecySymbol?: string;
}

let value: string | undefined

const _initConfig: NumberFormatOptions = {
  defaultDecimals: 2,
  delimitersChar: {
    decimal: ',',
    thousands: '.'
  },
  defaultCurrecySymbol: ''
}
let _config: NumberFormatOptions = {..._initConfig}

/**
 * Init number format options
 * @param config NumberFormatOptions
 */
export const initNumberFormat = (config: NumberFormatOptions) => {
  _config = {
    ...config,
    defaultDecimals: config.defaultDecimals ?? 2,
    defaultCurrecySymbol: config.defaultCurrecySymbol ?? ''
  }
}

/**
 * Hook to format number 
 * @param number number | string | undefined 
 * @example 
 * useNumberFormat(100).format(2)
 * useNumberFormat('100').formatCurrency()
 */
export const useNumberFormat = (number?: string | number) => {
  const { defaultDecimals, delimitersChar: { decimal, thousands}, defaultCurrecySymbol } = _config

  const setNumber = (number?: string | number) => {
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
  }

  /**
   * Return number formatted as string with specified number of decimals.
   * It use as decimals separator the value (or default value) defined in @param delimitersChar.decimals
   * It use as thousands separator the value (or default value) defined in @param delimitersChar.thousands
   * @param decimals number  Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
   * @returns string Number formatted as string
   */
  const format = (decimals: number = defaultDecimals!): string => {
    if(value == undefined){
      throw new TypeError("Number not defined on useNumberFormat decalration") 
    } 
    if(isNaN(Number(value)) || value == ''){
      throw new TypeError("Number defined on useNumberFormat decalration is not valid number") 
    }
    const numberSplitted = value.toString().split('.')
    const intPortion = numberSplitted.length? numberSplitted[0] : '0'
    const decimalPortion = (numberSplitted.length > 1? Number(`0.${numberSplitted[1]}`).toFixed(decimals) : Number().toFixed(decimals)).substring(2)

    return `${intPortion.replace(/\B(?=(\d{3}){0,20}(?!\d))/g, thousands)}${decimalPortion? decimal : ''}${decimalPortion}`
  }

  const formatCurrency = (decimals?: number, currecySymbol?: string): string => {
    const symbol = currecySymbol || defaultCurrecySymbol
    return `${format(decimals ?? defaultDecimals)} ${symbol}`
  } 

  const setCurrencySymbol = (char: string) => {
    _config = {
      ..._config,
      defaultCurrecySymbol: char
    }
  }

  setNumber(number)

  return {
    format,
    setCurrencySymbol,
    setNumber,
    formatCurrency,
    config: {..._config}
  }
}