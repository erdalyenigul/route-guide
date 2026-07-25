export type StopLinkLabel = 'municipality' | 'officialTourism' | 'regionalGuide' | 'protectedArea'

export interface StopResourceLink {
  label: StopLinkLabel
  url: string
}

const bodrumLinks: StopResourceLink[] = [
  { label: 'municipality', url: 'https://www.bodrum.bel.tr/' },
  { label: 'regionalGuide', url: 'https://www.mugla.gov.tr/bodrum' },
  { label: 'officialTourism', url: 'https://mugla.ktb.gov.tr/' }
]

const fethiyeLinks: StopResourceLink[] = [
  { label: 'municipality', url: 'https://www.fethiye.bel.tr/' },
  { label: 'regionalGuide', url: 'https://www.mugla.gov.tr/fethiye' },
  { label: 'officialTourism', url: 'https://mugla.ktb.gov.tr/' }
]

export const stopResourceLinks: Readonly<Record<string, readonly StopResourceLink[]>> = {
  izmir: [
    { label: 'municipality', url: 'https://www.izmir.bel.tr/' },
    { label: 'officialTourism', url: 'https://www.visitizmir.org/tr' },
    { label: 'regionalGuide', url: 'https://izmir.ktb.gov.tr/' }
  ],
  guzelcamli: [
    { label: 'municipality', url: 'https://kusadasi.bel.tr/' },
    { label: 'protectedArea', url: 'https://www.tarimorman.gov.tr/DKMP' },
    { label: 'regionalGuide', url: 'https://beta.kulturportali.gov.tr/turkiye/aydin/turizmaktiviteleri/guzelcamli' }
  ],
  'bafa-lake': [
    { label: 'protectedArea', url: 'https://mugla.ktb.gov.tr/TR-270775/bafa-golu--tabiat-parki.html' },
    { label: 'regionalGuide', url: 'https://kulturportali.gov.tr/turkiye/mugla/gezilecekyer/bafa-golu' },
    { label: 'municipality', url: 'https://www.milas.bel.tr/' }
  ],
  gumusluk: bodrumLinks,
  akyarlar: bodrumLinks,
  mazi: bodrumLinks,
  'akbuk-bay-gokova': [
    { label: 'municipality', url: 'https://www.mugla.bel.tr/' },
    { label: 'officialTourism', url: 'https://mugla.ktb.gov.tr/' },
    { label: 'regionalGuide', url: 'https://www.mugla.gov.tr/' }
  ],
  dalyan: [
    { label: 'municipality', url: 'https://www.ortaca.bel.tr/' },
    { label: 'regionalGuide', url: 'https://www.ortaca.gov.tr/cografya-ve-yeryuzu-sekilleri' },
    { label: 'protectedArea', url: 'https://www.ortaca.gov.tr/iztuzu-sahili' }
  ],
  'karaot-beach': fethiyeLinks,
  faralya: fethiyeLinks,
  kas: [
    { label: 'municipality', url: 'https://www.kas.bel.tr/' },
    { label: 'officialTourism', url: 'https://antalya.ktb.gov.tr/' },
    { label: 'regionalGuide', url: 'https://www.antalya.gov.tr/kas' }
  ],
  cirali: [
    { label: 'municipality', url: 'https://www.kemer.bel.tr/' },
    { label: 'officialTourism', url: 'https://antalya.ktb.gov.tr/' },
    { label: 'regionalGuide', url: 'https://www.antalya.gov.tr/kemer' }
  ],
  'lara-antalya': [
    { label: 'municipality', url: 'https://muratpasa-bld.gov.tr/' },
    { label: 'officialTourism', url: 'https://antalya.ktb.gov.tr/' },
    { label: 'regionalGuide', url: 'https://www.antalya.gov.tr/' }
  ]
}
