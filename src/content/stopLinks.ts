export type StopLinkLabel = 'travelGuide' | 'thingsToDo' | 'beachesAndCoves'

export interface StopResourceLink {
  label: StopLinkLabel
  title: string
  url: string
}

export const stopResourceLinks: Readonly<Record<string, readonly StopResourceLink[]>> = {
  izmir: [
    { label: 'travelGuide', title: 'İzmir Gezi Rehberi', url: 'https://www.gezipedia.net/13-izmirde-gezilecek-yerler.html' },
    { label: 'thingsToDo', title: 'İzmir’de 2 Günlük Gezi Rotası', url: 'https://turkiyekesfet.com/izmirde-gezilecek-20-yer-2-gunluk-rota-ve-gezi-rehberi/' }
  ],
  guzelcamli: [
    { label: 'travelGuide', title: 'Güzelçamlı Gezi Rehberi', url: 'https://www.gezipedia.net/583-guzelcamlida-gezilecek-yerler.html' },
    { label: 'beachesAndCoves', title: 'Milli Park, Zeus Mağarası ve Plajlar', url: 'https://www.turkiyedegezilecekyerler.com/guzelcamli-da-gezilecek-yerler-dilek-yarimadasi-zeus-magarasi-panionion-ve-plajlar' }
  ],
  'bafa-lake': [
    { label: 'travelGuide', title: 'Bafa Gölü ve Kapıkırı Rehberi', url: 'https://www.bizevdeyokuz.com/bafa-golu/' },
    { label: 'thingsToDo', title: 'Bafa Gölü’nde Gezilecek Yerler', url: 'https://www.etstur.com/letsgo/bafa-golu-gezi-rehberi/' }
  ],
  gumusluk: [
    { label: 'travelGuide', title: 'Gümüşlük Gezi Rehberi', url: 'https://www.flypgs.com/blog/gumusluk-gezilecek-yerler/' },
    { label: 'thingsToDo', title: 'Gümüşlük’te Gezilecek Yerler', url: 'https://www.bodrumdayasam.com.tr/rehber/bodrum-gumusluk-rehberi' }
  ],
  akyarlar: [
    { label: 'thingsToDo', title: 'Akyarlar’da Yapılacaklar', url: 'https://www.tripadvisor.com.tr/Attractions-g951437-Activities-Akyarlar_Turgutreis_Bodrum_District_Mugla_Province_Turkish_Aegean_Coast.html' },
    { label: 'beachesAndCoves', title: 'Akyarlar Plajları ve Gezi Rehberi', url: 'https://www.koycegiz-haber.com/bodrum/akyarlar-bodrum-2026-plajlari-ruzgr-sorfu-ve-gezi-rehberi/6601' }
  ],
  mazi: [
    { label: 'travelGuide', title: 'Mazı Köyü ve Sekiz Koy Rehberi', url: 'https://bodrumguru.com/mazikoy-rehberi/' },
    { label: 'thingsToDo', title: 'Mazı Köyü Gezi Notları', url: 'https://gezimanya.com/GeziNotlari/mazi-koyu' }
  ],
  'akbuk-bay-gokova': [
    { label: 'travelGuide', title: 'Akbük Koyu Gezi Rehberi', url: 'https://www.gezgorbence.com/akbuk-koyu/' },
    { label: 'beachesAndCoves', title: 'Muğla Tatil Bölgeleri Rehberi', url: 'https://www.enuygun.com/bilgi/mugla-nin-populer-tatil-yerleri/' }
  ],
  dalyan: [
    { label: 'travelGuide', title: 'Dalyan Gezi Rehberi', url: 'https://www.flypgs.com/blog/dalyan-gezi-rehberi/' },
    { label: 'thingsToDo', title: 'Dalyan’da Gezilecek Yerler', url: 'https://www.gezipgeliyorum.com/dalyan-gezilecek-yerler/' },
    { label: 'beachesAndCoves', title: 'İztuzu, Kaunos ve Dalyan Rehberi', url: 'https://www.turna.com/blog/dalyan-gezi-rehberi' }
  ],
  'karaot-beach': [
    { label: 'beachesAndCoves', title: 'Fethiye’de Denize Girilecek Yerler', url: 'https://www.enuygun.com/bilgi/fethiye-de-denize-girilecek-yerler/' },
    { label: 'travelGuide', title: 'Karaot ve Fethiye Plajları Rehberi', url: 'https://www.enuygun.com/bilgi/fethiye-plajlari/' }
  ],
  faralya: [
    { label: 'travelGuide', title: 'Faralya Gezi Rehberi', url: 'https://gezimanya.com/faralya' },
    { label: 'thingsToDo', title: 'Faralya, Kabak ve Kelebekler Vadisi', url: 'https://www.enuygun.com/bilgi/faralya-koyu/' }
  ],
  kas: [
    { label: 'travelGuide', title: 'Kaş Gezi Rehberi', url: 'https://www.kasguide.de/' },
    { label: 'beachesAndCoves', title: 'Kaş Plajları, Koyları ve Gezilecek Yerler', url: 'https://www.gezire.com/kas-gezilecek-yerler/' }
  ],
  cirali: [
    { label: 'travelGuide', title: 'Çıralı Gezi Rehberi', url: 'https://kesfet.tv/cirali-gezisi.html' },
    { label: 'thingsToDo', title: 'Çıralı, Olimpos ve Yanartaş Rehberi', url: 'https://www.olympostekneturu.com/cirali-gezi-rehberi' }
  ],
  'lara-antalya': [
    { label: 'travelGuide', title: 'Lara Gezi Rehberi', url: 'https://nerdenalinir.com/antalya-rehberi/antalya-larada-gezilecek-yerler/' },
    { label: 'beachesAndCoves', title: 'Lara ve Antalya Plajları', url: 'https://www.enuygun.com/bilgi/antalya-plajlari/' }
  ]
}
