import currency from 'currency.js'

/**
 * This is a typescript-modified version of formatting copied from
 * https://github.com/scurker/currency.js/issues/191#issuecomment-1773759557
 * 
 * This formats with the original options first, then removes the cents if
 * cents are zero. It should leave any postfixed currency symbol alone, e.g.
 * "1000.00 AUD" -> "1000 AUD".
 */
function format(curr: currency | undefined, options: currency.Options | undefined): string {
  if (curr === undefined) {
    return '0'
  }

  let format = options?.format ?
    options.format(curr, options) :
    `${curr.dollars()}.${curr.cents()}`

  if (curr?.cents() === 0) {
    const decimalIndex = format.indexOf(options?.decimal ?? '.')
    if (decimalIndex !== -1) {
      format =
        format.slice(0, decimalIndex) +
        format.slice(decimalIndex + (options?.precision ?? 2) + 1)
    }
  }

  return format
}

export function formatCurrency(curr: currency | string): string {
  const currencyWithSettings = currency(curr, {
    negativePattern: `(#)`,
    symbol: ''
  })

  return currencyWithSettings.format(format)
}