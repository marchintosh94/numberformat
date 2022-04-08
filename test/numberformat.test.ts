import { initNumberFormat, NumberFormatOptions, useNumberFormat } from "../src/numberformat"

describe('useNumberFormat hook', () => {
  let format1: NumberFormatOptions
  let format2: NumberFormatOptions

  beforeEach(() => {
    format1 = {
      defaultDecimals: 2,
      defaultErrorValue: 0,
      delimitersChar: {
        decimal: ',',
        thousands: '.'
      },
      defaultCurrecySymbol: {sign: '€', code: 'EUR'}
    }
    format2 = {
      defaultDecimals: 3,
      defaultErrorValue: 0,
      delimitersChar: {
        decimal: '.',
        thousands: ','
      },
      defaultCurrecySymbol: {sign: '$', code: 'USD'}
    }
  })

  it('init numberformat', () => {
    initNumberFormat(format1)
    const { config, format, setNumber } = useNumberFormat()
    expect(config.delimitersChar.decimal).toEqual(format1.delimitersChar.decimal)
    expect(config.delimitersChar.thousands).toEqual(format1.delimitersChar.thousands)
    expect(config.defaultCurrecySymbol).toEqual(format1.defaultCurrecySymbol)
    expect(config.defaultDecimals).toEqual(format1.defaultDecimals)

    config.delimitersChar.decimal = ''
    config.delimitersChar.thousands = ''
    config.defaultCurrecySymbol = {sign: '', code: ''}
    config.defaultDecimals = 456

    setNumber(10)
    expect(format()).toEqual('10,00')

    const { config: conf } = useNumberFormat()
    expect(conf.delimitersChar.decimal).toEqual(format1.delimitersChar.decimal)
    expect(conf.delimitersChar.thousands).toEqual(format1.delimitersChar.thousands)
    expect(conf.defaultCurrecySymbol?.code).toEqual(format1.defaultCurrecySymbol?.code)
    expect(conf.defaultCurrecySymbol?.sign).toEqual(format1.defaultCurrecySymbol?.sign)
    expect(conf.defaultDecimals).toEqual(format1.defaultDecimals)
  })

  it('format function => decimal == `,` thousands == `.`', () => {
    const number = '123456789.45688874'
    const number2 = '29944.12297946'
    const number3 = '29944'
    const number4 = 0.95
    initNumberFormat(format1)
    expect(useNumberFormat(number).format()).toEqual('123.456.789,46')
    expect(useNumberFormat(number).format(10)).toEqual('123.456.789,4568887400')
    
    expect(useNumberFormat(number2).format()).toEqual('29.944,12')
    expect(useNumberFormat(number2).format(8)).toEqual('29.944,12297946')

    expect(useNumberFormat(number3).format(0)).toEqual('29.944')
    expect(useNumberFormat(number3).format(3)).toEqual('29.944,000')
    expect(useNumberFormat(number4).format(0)).toEqual('0')
    expect(useNumberFormat(number4).format(1)).toEqual('0,9')
    expect(useNumberFormat(number4).format(3)).toEqual('0,950')
  })

  it('format function => decimal == `.` thousands == `,`', () => {
    const number = '123456789.45688874'
    const number2 = '6257897.9876543'
    initNumberFormat(format2)
    expect(useNumberFormat(number).format()).toEqual('123,456,789.457')
    expect(useNumberFormat(number).format(15)).toEqual('123,456,789.456888740000000')

    expect(useNumberFormat(number2).format()).toEqual('6,257,897.988')
    expect(useNumberFormat(number2).format(11)).toEqual('6,257,897.98765430000')
  })

  it('invalid format', () => {
    const nan = '123.456789.45688,874'
    const nan2 = ''
    const undef = undefined
    initNumberFormat(format2)
    expect(useNumberFormat(nan).format()).toEqual('0')
    expect(useNumberFormat(nan).format()).toEqual('0')

    expect(useNumberFormat(nan2).format()).toEqual('0')
    expect(useNumberFormat(undef).format()).toEqual('0')
  })

  it('format currency => €', () => {
    const number = '123456789.45688874'
    const number2 = '29944.12297946'
    const number3 = '29944'
    const number4 = 0.95
    initNumberFormat(format1)
    expect(useNumberFormat(number).formatCurrency()).toEqual('123.456.789,46 €')
    expect(useNumberFormat(number).formatCurrency(10)).toEqual('123.456.789,4568887400 €')
    
    expect(useNumberFormat(number2).formatCurrency()).toEqual('29.944,12 €')
    expect(useNumberFormat(number2).formatCurrency(8)).toEqual('29.944,12297946 €')

    expect(useNumberFormat(number3).formatCurrency(0)).toEqual('29.944 €')
    expect(useNumberFormat(number3).formatCurrency(3)).toEqual('29.944,000 €')
    expect(useNumberFormat(number4).formatCurrency(0)).toEqual('0 €')
    expect(useNumberFormat(number4).formatCurrency(1)).toEqual('0,9 €')
    expect(useNumberFormat(number4).formatCurrency(3)).toEqual('0,950 €')
  })
})