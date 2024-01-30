import { DateTime } from 'luxon'

const citiFormat = 'LL/dd/yyyy'
const nonIsoFormats = [ citiFormat ]

export function rawDateToDateTime(rawDate: string): DateTime {
  let result: DateTime

  result = DateTime.fromISO(rawDate)

  if (result.isValid) return result
  
  for (const format of nonIsoFormats) {
    const attempt = DateTime.fromFormat(rawDate, format)

    if (attempt.isValid) return attempt
  }

  return DateTime.invalid('Cannot parse date')
}