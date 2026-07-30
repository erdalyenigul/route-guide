import type { RouteContent } from '../types'

export const initialCaravanRoute = {
  id: 'izmir-to-lara',
  title: 'content.route.title',
  description: 'content.route.description',
  startDate: '2026-07-22',
  endDate: '2026-08-18',
  status: 'active',
  stopIds: [
    'izmir',
    'guzelcamli',
    'bafa-lake',
    'izmir-restart',
    'cesme-palmiye',
    'torba',
    'yalikavak',
    'gumusluk',
    'akyarlar',
    'bodrum-center',
    'mazi',
    'ilgin-koyu',
    'akbuk',
    'dalyan',
    'karaot-beach',
    'faralya',
    'patara',
    'kas',
    'cirali',
    'lara'
  ],
  totalDistanceKm: 1480
} satisfies RouteContent
