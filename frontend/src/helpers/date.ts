import { parse, formatISO, parseISO, format } from 'date-fns'
import { es } from 'date-fns/locale/es'

export function convertToISODate(dateString: string): string {
  const date = parse(dateString, 'dd/MM/yyyy', new Date())
  return formatISO(date)
}

export function displayDate(date: Date) {
  const newDate = parseISO(date.toString())
  const formattedDate = format(newDate, 'PPPP', { locale: es })
  return formattedDate
}

export function convertToDDMMYYYY(isoDate: string): string {
  const newDate = new Date(isoDate)
  const formattedDate = format(newDate, 'dd/MM/yyyy')
  return formattedDate
}
