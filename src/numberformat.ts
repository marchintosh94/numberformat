export interface NumberFormatOptions {
  delimitersChar: { decimal: string; thousands: string};
  defaultDecimals: number | undefined;
  defaultErrorValue: number | undefined,
  defaultCurrecySymbol?: {code: string; sign: string};
}

let state: string | undefined

const _initConfig: NumberFormatOptions = {
  defaultDecimals: 2,
  defaultErrorValue: 0,
  delimitersChar: {
    decimal: ',',
    thousands: '.'
  },
  defaultCurrecySymbol: {
    code: '',
    sign: ''
  }
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
    defaultCurrecySymbol: config.defaultCurrecySymbol ?? _initConfig.defaultCurrecySymbol
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
  const { defaultDecimals, delimitersChar: { decimal, thousands}, defaultCurrecySymbol, defaultErrorValue } = _config

  const setNumber = (value?: string | number) => {
    if(value != undefined && value != null){
      switch(typeof value){
        case 'number':
          state = value.toString()
          break
        case 'string':
          state = value == ''? Number(undefined).toString() : Number(value.replace(',', '.')).toString()
          break
        default:
          throw TypeError('Invalid number type')
      }
    } else {
      state = value! as string
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
    if(state == undefined){
      console.error("Number not defined on useNumberFormat decalration", `value to be formatted: ${state}`)
      return (defaultErrorValue ?? 0).toString()
    } 
    if(isNaN(Number(state)) || state == ''){
      console.error("Number defined on useNumberFormat decalration is not valid number.", `value to be formatted: ${state}`) 
      return (defaultErrorValue ?? 0).toString()
    }
    const numberSplitted = state.toString().split('.')
    const intPortion = numberSplitted.length? numberSplitted[0] : '0'
    const decimalPortion = (numberSplitted.length > 1? Number(`0.${numberSplitted[1]}`).toFixed(decimals) : Number().toFixed(decimals)).substring(2)

    return `${intPortion.replace(/\B(?=(\d{3}){0,20}(?!\d))/g, thousands)}${decimalPortion? decimal : ''}${decimalPortion}`
  }

  const formatCurrency = (decimals?: number, currecySymbol?: string): string => {
    const symbol = currecySymbol || defaultCurrecySymbol
    return `${format(decimals ?? defaultDecimals)} ${symbol}`
  } 

  const setCurrencySymbol = (sign: string, code: string) => {
    _config = {
      ..._config,
      defaultCurrecySymbol: {sign, code}
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