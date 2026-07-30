import { sharedKey, spotCopy } from '../helpers'
import type { CampingType, SpotContent } from '../types'

type FacilityKey =
  | 'electricity'
  | 'freshWater'
  | 'wc'
  | 'shower'
  | 'wasteDisposal'
  | 'restaurant'
  | 'wasteBins'
  | 'shade'
  | 'supermarkets'

function createSpot(
  id: string,
  stopId: string,
  copyKey: string,
  type: CampingType,
  latitude: number,
  longitude: number,
  priceKey: string,
  rating: number,
  recommended: boolean,
  facilities: FacilityKey[]
): SpotContent {
  return {
    id,
    stopId,
    type,
    coordinates: { latitude, longitude },
    rating,
    recommended,
    ...spotCopy(copyKey),
    priceNote: sharedKey(`prices.${priceKey}`),
    facilities: facilities.map((facility) => sharedKey(`facilities.${facility}`))
  }
}

export const initialRouteSpots: SpotContent[] = [
  createSpot(
    'izmir-sasali',
    'izmir',
    'izmirFree',
    'freecamp',
    38.489,
    26.994,
    'permitted',
    3.4,
    false,
    []
  ),
  createSpot(
    'izmir-inciralti-camp',
    'izmir',
    'izmirPaid',
    'paid',
    38.405,
    27.034,
    'seasonal',
    4.1,
    true,
    ['electricity', 'freshWater', 'wc', 'shower', 'wasteDisposal']
  ),
  createSpot(
    'guzelcamli-outskirts',
    'guzelcamli',
    'guzelcamliFree',
    'freecamp',
    37.716,
    27.249,
    'permitted',
    3.7,
    false,
    ['wasteBins']
  ),
  createSpot(
    'guzelcamli-camp',
    'guzelcamli',
    'guzelcamliPaid',
    'paid',
    37.705,
    27.225,
    'reserve',
    4.4,
    true,
    ['electricity', 'freshWater', 'wc', 'shower']
  ),
  createSpot(
    'bafa-kapikiri-edge',
    'bafa-lake',
    'bafaFree',
    'freecamp',
    37.504,
    27.521,
    'permission',
    4,
    false,
    []
  ),
  createSpot(
    'bafa-lakeside-pension-camp',
    'bafa-lake',
    'bafaPaid',
    'paid',
    37.501,
    27.524,
    'local',
    4.5,
    true,
    ['freshWater', 'wc', 'shower', 'restaurant']
  ),
  createSpot(
    'gumusluk-inland-olive',
    'gumusluk',
    'gumuslukFree',
    'freecamp',
    37.062,
    27.247,
    'permission',
    3.5,
    false,
    []
  ),
  createSpot(
    'gumusluk-caravan-camp',
    'gumusluk',
    'gumuslukPaid',
    'paid',
    37.058,
    27.238,
    'reserve',
    4.3,
    true,
    ['electricity', 'freshWater', 'wc', 'shower']
  ),
  createSpot(
    'akyarlar-inland-layby',
    'akyarlar',
    'akyarlarFree',
    'freecamp',
    36.98,
    27.306,
    'permitted',
    3.3,
    false,
    []
  ),
  createSpot(
    'akyarlar-coastal-camp',
    'akyarlar',
    'akyarlarPaid',
    'paid',
    36.969,
    27.294,
    'reserve',
    4.2,
    true,
    ['electricity', 'freshWater', 'wc', 'shower']
  ),
  {
    ...createSpot(
      'inceyali-wildcamp',
      'mazi',
      'maziInceyali',
      'freecamp',
      37.001543,
      27.728339,
      'arrivalCheckFree',
      4.3,
      true,
      []
    ),
    ducatoAccess: 'caution',
    overnightStatus: 'tolerated',
    beachfront: null,
    seaView: null,
    distanceToSeaM: null,
    waterAvailable: false,
    toiletAvailable: false,
    showerAvailable: false,
    wasteAvailable: false,
    nightQuiet: null,
    verificationStatus: 'partially_verified',
    lastVerifiedAt: '2026-07-30T00:00:00+03:00',
    safetyNote: sharedKey('spots.maziInceyali.safety')
  },
  createSpot(
    'akbuk-gokova-upper-bay',
    'akbuk',
    'akbukFree',
    'freecamp',
    37.037,
    28.096,
    'permitted',
    3.9,
    false,
    []
  ),
  createSpot(
    'akbuk-gokova-camp',
    'akbuk',
    'akbukPaid',
    'paid',
    37.029,
    28.104,
    'seasonal',
    4.4,
    true,
    ['freshWater', 'wc', 'shower', 'restaurant']
  ),
  createSpot(
    'dalyan-rural-orchard-edge',
    'dalyan',
    'dalyanFree',
    'freecamp',
    36.846,
    28.654,
    'permission',
    3.6,
    false,
    []
  ),
  createSpot(
    'dalyan-camping',
    'dalyan',
    'dalyanPaid',
    'paid',
    36.838,
    28.638,
    'seasonal',
    4.6,
    true,
    ['electricity', 'freshWater', 'wc', 'shower', 'wasteDisposal']
  ),
  createSpot(
    'karaot-designated-edge',
    'karaot-beach',
    'karaotFree',
    'freecamp',
    36.706,
    29.037,
    'permitted',
    3.8,
    false,
    ['wc']
  ),
  createSpot(
    'karaot-eco-camp',
    'karaot-beach',
    'karaotPaid',
    'paid',
    36.712,
    29.042,
    'seasonal',
    4.3,
    true,
    ['freshWater', 'wc', 'shower', 'shade']
  ),
  createSpot(
    'faralya-upper-road',
    'faralya',
    'faralyaFree',
    'freecamp',
    36.5,
    29.132,
    'permission',
    3.8,
    false,
    []
  ),
  createSpot(
    'faralya-terrace-camp',
    'faralya',
    'faralyaPaid',
    'paid',
    36.495,
    29.129,
    'premium',
    4.7,
    true,
    ['freshWater', 'wc', 'shower', 'restaurant']
  ),
  {
    ...createSpot(
      'patara-dunes-wildcamp',
      'patara',
      'pataraDunes',
      'freecamp',
      36.2704,
      29.3034,
      'arrivalCheckFree',
      4.1,
      true,
      ['wasteBins', 'shade']
    ),
    ducatoAccess: 'caution',
    overnightStatus: 'restricted',
    beachfront: false,
    seaView: true,
    distanceToSeaM: null,
    groundSurface: 'rough track and firm clearings',
    levelGround: null,
    shadeAvailable: true,
    waterAvailable: false,
    toiletAvailable: false,
    showerAvailable: false,
    wasteAvailable: false,
    mobileSignal: 'good',
    crowdLevel: 'medium',
    nightQuiet: true,
    verificationStatus: 'partially_verified',
    lastVerifiedAt: '2026-07-30T00:00:00+03:00',
    safetyNote: sharedKey('spots.pataraDunes.safety')
  },
  createSpot(
    'kas-inland-plateau',
    'kas',
    'kasFree',
    'freecamp',
    36.225,
    29.65,
    'permission',
    3.7,
    false,
    []
  ),
  createSpot('kas-peninsula-camp', 'kas', 'kasPaid', 'paid', 36.191, 29.609, 'premium', 4.6, true, [
    'electricity',
    'freshWater',
    'wc',
    'shower',
    'wasteDisposal'
  ]),
  createSpot(
    'cirali-upper-village',
    'cirali',
    'ciraliFree',
    'freecamp',
    36.427,
    30.475,
    'permission',
    3.5,
    false,
    []
  ),
  createSpot(
    'cirali-garden-camp',
    'cirali',
    'ciraliPaid',
    'paid',
    36.418,
    30.481,
    'reserve',
    4.8,
    true,
    ['electricity', 'freshWater', 'wc', 'shower', 'wasteDisposal']
  ),
  createSpot(
    'lara-inland-stopover',
    'lara',
    'laraFree',
    'freecamp',
    36.872,
    30.813,
    'permitted',
    3.1,
    false,
    ['supermarkets']
  ),
  createSpot(
    'lara-caravan-park',
    'lara',
    'laraPaid',
    'paid',
    36.868,
    30.866,
    'seasonal',
    4.4,
    true,
    ['electricity', 'freshWater', 'wc', 'shower', 'wasteDisposal']
  )
]
