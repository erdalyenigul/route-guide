export type DateTimeValue = Date | string | number

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

export function formatDateTime(value: DateTimeValue): string {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return '—'

  return [
    `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`,
    `${pad(date.getHours())}:${pad(date.getMinutes())}`
  ].join(' ')
}
