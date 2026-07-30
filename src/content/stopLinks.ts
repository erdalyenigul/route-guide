export type StopLinkLabel = 'travelGuide' | 'thingsToDo' | 'beachesAndCoves'

export interface StopResourceLink {
  label: StopLinkLabel
  titleKey: `stopLinks.titles.${string}`
  url: string
}

export const stopResourceLinks: Readonly<Record<string, readonly StopResourceLink[]>> = {
  izmir: [
    {
      label: 'travelGuide',
      titleKey: 'stopLinks.titles.izmirGuide',
      url: 'https://www.gezipedia.net/13-izmirde-gezilecek-yerler.html'
    },
    {
      label: 'thingsToDo',
      titleKey: 'stopLinks.titles.izmirTwoDayRoute',
      url: 'https://turkiyekesfet.com/izmirde-gezilecek-20-yer-2-gunluk-rota-ve-gezi-rehberi/'
    }
  ],
  guzelcamli: [
    {
      label: 'travelGuide',
      titleKey: 'stopLinks.titles.guzelcamliGuide',
      url: 'https://www.gezipedia.net/583-guzelcamlida-gezilecek-yerler.html'
    },
    {
      label: 'beachesAndCoves',
      titleKey: 'stopLinks.titles.guzelcamliNature',
      url: 'https://www.turkiyedegezilecekyerler.com/guzelcamli-da-gezilecek-yerler-dilek-yarimadasi-zeus-magarasi-panionion-ve-plajlar'
    }
  ],
  'bafa-lake': [
    {
      label: 'travelGuide',
      titleKey: 'stopLinks.titles.bafaGuide',
      url: 'https://www.bizevdeyokuz.com/bafa-golu/'
    },
    {
      label: 'thingsToDo',
      titleKey: 'stopLinks.titles.bafaThingsToDo',
      url: 'https://www.etstur.com/letsgo/bafa-golu-gezi-rehberi/'
    }
  ],
  'cesme-palmiye': [
    {
      label: 'beachesAndCoves',
      titleKey: 'stopLinks.titles.palmiyeLocation',
      url: 'https://www.google.com/maps/search/?api=1&query=Palmiye%20Beach%20%C3%87e%C5%9Fme%20%C4%B0zmir'
    },
    {
      label: 'travelGuide',
      titleKey: 'stopLinks.titles.cesmeBeaches',
      url: 'https://www.enuygun.com/bilgi/cesme-plajlari/'
    }
  ],
  torba: [
    {
      label: 'beachesAndCoves',
      titleKey: 'stopLinks.titles.torbaBeach',
      url: 'https://ktbhalkplajlari.com/torba-bodrum/'
    },
    {
      label: 'travelGuide',
      titleKey: 'stopLinks.titles.torbaGuide',
      url: 'https://www.flypgs.com/blog/torba-gezi-rehberi/'
    }
  ],
  gumusluk: [
    {
      label: 'travelGuide',
      titleKey: 'stopLinks.titles.gumuslukGuide',
      url: 'https://www.flypgs.com/blog/gumusluk-gezilecek-yerler/'
    },
    {
      label: 'thingsToDo',
      titleKey: 'stopLinks.titles.gumuslukThingsToDo',
      url: 'https://www.bodrumdayasam.com.tr/rehber/bodrum-gumusluk-rehberi'
    }
  ],
  akyarlar: [
    {
      label: 'thingsToDo',
      titleKey: 'stopLinks.titles.akyarlarThingsToDo',
      url: 'https://www.tripadvisor.com.tr/Attractions-g951437-Activities-Akyarlar_Turgutreis_Bodrum_District_Mugla_Province_Turkish_Aegean_Coast.html'
    },
    {
      label: 'beachesAndCoves',
      titleKey: 'stopLinks.titles.akyarlarBeaches',
      url: 'https://www.koycegiz-haber.com/bodrum/akyarlar-bodrum-2026-plajlari-ruzgr-sorfu-ve-gezi-rehberi/6601'
    }
  ],
  mazi: [
    {
      label: 'travelGuide',
      titleKey: 'stopLinks.titles.maziCoves',
      url: 'https://bodrumguru.com/mazikoy-rehberi/'
    },
    {
      label: 'thingsToDo',
      titleKey: 'stopLinks.titles.maziNotes',
      url: 'https://gezimanya.com/GeziNotlari/mazi-koyu'
    }
  ],
  'ilgin-koyu': [
    {
      label: 'thingsToDo',
      titleKey: 'stopLinks.titles.ilginKoyuGuide',
      url: 'https://dogadakiler.com/Kamp-Alanlari/Mugla-Kamp-Alanlari/Asagi-Mazi-Ilgin-Koyu/'
    },
    {
      label: 'beachesAndCoves',
      titleKey: 'stopLinks.titles.ilginKoyuCamping',
      url: 'https://www.campalow.com/kamp-alani/ilgin-koyu-kamp-alani'
    }
  ],
  'akbuk-bay-gokova': [
    {
      label: 'travelGuide',
      titleKey: 'stopLinks.titles.akbukGuide',
      url: 'https://www.gezgorbence.com/akbuk-koyu/'
    },
    {
      label: 'beachesAndCoves',
      titleKey: 'stopLinks.titles.muglaCoastGuide',
      url: 'https://www.enuygun.com/bilgi/mugla-nin-populer-tatil-yerleri/'
    }
  ],
  dalyan: [
    {
      label: 'travelGuide',
      titleKey: 'stopLinks.titles.dalyanGuide',
      url: 'https://www.flypgs.com/blog/dalyan-gezi-rehberi/'
    },
    {
      label: 'thingsToDo',
      titleKey: 'stopLinks.titles.dalyanThingsToDo',
      url: 'https://www.gezipgeliyorum.com/dalyan-gezilecek-yerler/'
    },
    {
      label: 'beachesAndCoves',
      titleKey: 'stopLinks.titles.dalyanHighlights',
      url: 'https://www.turna.com/blog/dalyan-gezi-rehberi'
    }
  ],
  'karaot-beach': [
    {
      label: 'beachesAndCoves',
      titleKey: 'stopLinks.titles.fethiyeSwimming',
      url: 'https://www.enuygun.com/bilgi/fethiye-de-denize-girilecek-yerler/'
    },
    {
      label: 'travelGuide',
      titleKey: 'stopLinks.titles.karaotBeaches',
      url: 'https://www.enuygun.com/bilgi/fethiye-plajlari/'
    }
  ],
  faralya: [
    {
      label: 'travelGuide',
      titleKey: 'stopLinks.titles.faralyaGuide',
      url: 'https://gezimanya.com/faralya'
    },
    {
      label: 'thingsToDo',
      titleKey: 'stopLinks.titles.faralyaHighlights',
      url: 'https://www.enuygun.com/bilgi/faralya-koyu/'
    }
  ],
  patara: [
    {
      label: 'travelGuide',
      titleKey: 'stopLinks.titles.pataraGuide',
      url: 'https://www.enuygun.com/bilgi/2020-yili-ilan-edilen-patara-antik-kenti-ne-dair-her-sey/'
    },
    {
      label: 'beachesAndCoves',
      titleKey: 'stopLinks.titles.pataraDunes',
      url: 'https://www.park4night.com/en/place/75720'
    }
  ],
  kas: [
    {
      label: 'travelGuide',
      titleKey: 'stopLinks.titles.kasGuide',
      url: 'https://www.kasguide.de/'
    },
    {
      label: 'beachesAndCoves',
      titleKey: 'stopLinks.titles.kasBeaches',
      url: 'https://www.gezire.com/kas-gezilecek-yerler/'
    }
  ],
  cirali: [
    {
      label: 'travelGuide',
      titleKey: 'stopLinks.titles.ciraliGuide',
      url: 'https://kesfet.tv/cirali-gezisi.html'
    },
    {
      label: 'thingsToDo',
      titleKey: 'stopLinks.titles.ciraliHighlights',
      url: 'https://www.olympostekneturu.com/cirali-gezi-rehberi'
    }
  ],
  'lara-antalya': [
    {
      label: 'travelGuide',
      titleKey: 'stopLinks.titles.laraGuide',
      url: 'https://nerdenalinir.com/antalya-rehberi/antalya-larada-gezilecek-yerler/'
    },
    {
      label: 'beachesAndCoves',
      titleKey: 'stopLinks.titles.laraBeaches',
      url: 'https://www.enuygun.com/bilgi/antalya-plajlari/'
    }
  ]
}
