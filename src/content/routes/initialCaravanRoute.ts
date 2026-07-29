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
    'cesme-palmiye',
    'torba',
    'gumusluk',
    'akyarlar',
    'mazi',
    'akbuk',
    'dalyan',
    'karaot-beach',
    'faralya',
    'kas',
    'cirali',
    'lara'
  ],
  totalDistanceKm: 1068
} satisfies RouteContent
