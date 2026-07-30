type EnglishContent = typeof import('./en').default
type TranslationShape<T> = {
  [Key in keyof T]: T[Key] extends string ? string : TranslationShape<T[Key]>
}

const content = {
  placeholder: {
    routeTitle: 'İzmir - Lara',
    routeDescription: 'Kişisel karavan rotası.',
    region: 'Konum bilgileri bekleniyor',
    overview: 'Konum doğrulandıktan sonra içerik eklenecek.',
    whyVisit: 'Ziyaret notları henüz eklenmedi.',
    sunrise: 'Gün doğumu konumu eklenmedi.',
    sunset: 'Gün batımı konumu eklenmedi.'
  },
  route: {
    title: 'Ege’den Akdeniz’e Karavan Rotası',
    description:
      'İzmir’den Antalya’ya sakin koylar, antik coğrafyalar ve çamlarla çevrili sahiller boyunca yavaş bir kıyı yolculuğu.',
    firstLegTitle: 'İlk İzmir–Bafa etabı',
    firstLegDescription:
      'İzmir’e dönmeden önce Güzelçamlı ve Bafa Gölü üzerinden tamamlanan ilk yolculuk.'
  },
  facilities: {
    electricity: 'Elektrik',
    freshWater: 'Temiz su',
    market: 'Market',
    wc: 'WC',
    shower: 'Duş',
    wasteDisposal: 'Atık boşaltma',
    restaurant: 'Restoran',
    wasteBins: 'Yakında çöp kutusu',
    waste_bins: 'Çöp kutuları',
    shade: 'Gölge',
    supermarkets: 'Yakında süpermarket'
  },
  freecampNetwork: {
    common: {
      strong:
        'Yakın tarihli karavan deneyimlerinde olumlu değerlendirilen, ulaşımı kolay ücretsiz park ve geceleme seçeneği.',
      good: 'Gecelemek için kullanılabilir; ancak levhaları, zemini ve güncel yerel uygulamayı vardığınızda kontrol edin.',
      backup:
        'Eğim, gürültü, zemin veya güncelliğini yitirmiş bilgi nedeniyle yalnızca yedek seçenek olarak düşünün.',
      free: 'Ücretsiz olduğu bildiriliyor; güncel levhalar ve resmî yönlendirmeler her zaman önceliklidir.',
      arrival:
        'Hava kararmadan gidin, çıkış yolunu kapatmayın ve yerleşmeden önce gecelemeye izin verildiğinden emin olun.',
      safety:
        'Masa, sandalye ve tente açarak alanı kamp yerine çevirmeyin. Geceleme yasaksa başka bir yere geçin.'
    },
    spots: {
      didimYali: 'Altınkum — Yalı Caddesi',
      didim19: 'Altınkum — 19. Sokak',
      didimAytepe: 'Didim — Aytepe Caddesi',
      bodrumSeyit: 'Bodrum — Seyit Kaptan Sokak',
      bodrumKumbahce: 'Bodrum — Kumbahçe Sahil Yolu',
      bodrumEren: 'Bodrum — 20 Eren Sokak',
      akyakaKultak: 'Akyaka — Kultak Yolu',
      koycegizLake: 'Köyceğiz göl kenarı',
      koycegizCenter: 'Köyceğiz — Atatürk Bulvarı',
      koycegizNature: 'Köyceğiz doğa noktası',
      fethiyeMuammer: 'Fethiye — Muammer Aksoy Bulvarı',
      fethiyeAtapark: 'Fethiye — Atapark',
      fethiyeMarina: 'Fethiye — 518. Sokak',
      fethiyeKumsal: 'Fethiye — Kumsal Sokak',
      fethiyeWater: 'Fethiye D400 su noktası',
      kalkanPier: 'Kalkan — İskele Sokak',
      kasTheatre: 'Kaş — Antik Tiyatro',
      kasBuyukCakil: 'Kaş — Büyük Çakıl Caddesi',
      kasDemokrasi: 'Kaş — Demokrasi Caddesi',
      demreMyra: 'Demre — Myra / Karabucak Caddesi',
      demreNoel: 'Demre — Noel Baba Caddesi',
      demreAkdeniz: 'Demre — Akdeniz Bulvarı',
      finikeRoad: 'Finike — Demre–Finike Yolu',
      ciraliBeach: 'Çıralı sahilinde varışta değerlendirilecek park alanı',
      lara261: 'Lara — 261 Lara Caddesi'
    }
  },
  prices: {
    permitted: 'Park izni olan yerlerde ücretsiz',
    permission: 'Yerel izinle ücretsiz',
    arrivalCheckFree: 'Ücretsiz olarak listeleniyor; güncel durumu varışta kontrol edin',
    seasonal: 'Sezonluk ücret; güncel tutarı işletmeden öğrenin',
    reserve: 'Sezonluk ücret; rezervasyon önerilir',
    premium: 'Yüksek sezon ücreti; önceden ayırtın',
    local: 'Yerinde sorun; ücretler değişebilir'
  },
  stops: {
    izmir: {
      title: 'İzmir Home',
      region: 'Bayraklı TOKİ 7. Etap, İzmir',
      overview: 'Karavan rotasının başladığı Bayraklı TOKİ 7. Etap’taki ev noktası.',
      whyVisit:
        'Yola çıkmadan karavanı yüklemek, temiz suyu doldurmak, araç içini sabitlemek ve hareket kontrol listesini tamamlamak için.',
      luna: {
        subject: 'Yola çıkış sabahı ve karavan hazırlığı',
        lens: '24 mm ana kamera',
        timing: 'Hareket etmeden hemen önce',
        settings: 'RAW veya standart fotoğraf modu',
        note: 'Bu durağı yolculuğun başlangıcını belgelemek için kullanın.'
      },
      municipality:
        'Burası özel ev ve rota başlangıç noktasıdır; halka açık karavan hizmet durağı değildir.',
      marketName: 'İzmir marketleri',
      marketNotes: 'Yiyecek ve ev alışverişini yola çıkmadan tamamlayın.',
      fuelName: 'Ana yol üzerindeki akaryakıt istasyonları',
      fuelNotes: 'Otoyola girmeden önce yakıt alın.',
      waterName: 'Evde temiz su hazırlığı',
      waterNotes: 'Temiz su tankını yola çıkmadan, bildiğiniz ev kaynağından doldurun.',
      dumpName: 'Bu durak için atık noktası gerekmiyor',
      dumpNotes: 'Atık ve tuvalet hazırlığını evden ayrılmadan tamamlayın.',
      warning1: 'Yola çıkmadan dolapları, çekmeceleri ve serbest eşyaları sabitleyin.',
      warning2: 'Otoyola çıkmadan normal hareket kontrol listesini tamamlayın.',
      sunrise: 'İsterseniz hareket anını yolculuk günlüğü için fotoğraflayın.',
      sunset: 'Bu nokta fotoğraf durağı olarak planlanmadı.',
      photoAlt: 'İzmir Home’dan yola çıkmak için hazırlanan karavan'
    },
    guzelcamli: {
      title: 'Güzelçamlı',
      region: 'Kuşadası, Aydın',
      overview:
        'Kara, deniz ve sulak alan habitatları korunan Dilek Yarımadası–Büyük Menderes Deltası Millî Parkı yanındaki kıyı üssü.',
      whyVisit:
        'Güzelçamlı’yı doğa yürüyüşü ve fotoğraf için üs olarak kullanın. Güncel park saatlerini, araç erişimini ve geceleme kurallarını gelmeden kontrol edin.',
      spots: {
        hayalBahcesi: {
          title: 'Kuşadası Hayal Bahçesi Karavan Alanı',
          overview:
            'Milli Park Caddesi’nde, plaja yaklaşık 50 metre ve millî park girişine 700 metre mesafedeki işletmeli karavan alanı. İşletme su, elektrik, sıcak duş ve ortak mutfak hizmetlerini listeliyor.',
          price: 'Sezon ücreti ve kapasite değişebilir; gelmeden arayın.',
          access:
            'Milli Park Caddesi üzerinden 34 numaradaki işaretli girişe gidin. Yol asfalt ve Ducato için uygundur; tesise gitmeden yer ayırtın.',
          safety:
            'Yasal geceleme üssü burasıdır. Millî park otoparkları gündüz ziyareti içindir ve kampın uzantısı değildir.'
        },
        davutlar: {
          title: 'Davutlar Kamu Karavan Alanı',
          overview:
            'Market, park, WC ve duş hizmetleriyle topluluk kaydında yer alan belediye/kamu karavan alanı.',
          price: 'Kamu alanı durumu ve güncel ücret kontrol edilmelidir.',
          access:
            'Güzelçamlı–Davutlar yolunu kullanın; koordinat yaklaşık olduğundan levhayı izleyin.',
          safety: 'Alanın açık olup olmadığını, ücretini ve güncel kuralları gitmeden sorun.'
        }
      },
      luna: {
        subject: 'Çamlarla çevrili koylar ve berrak Ege',
        lens: '24 mm ana kamera',
        timing: 'Sabah erken saatler',
        settings: 'RAW, -0,3 EV, isteğe bağlı polarize filtre',
        note: 'Belirlenmiş patikalarda kalın ve yaban hayatını koruyun.'
      },
      municipality:
        'Millî park koylarında çalışma saatleri içinde işaretli otoparklar ve ziyaretçi WC’leri bulunur; bunlar karavan servis noktası değildir.',
      marketName: 'Güzelçamlı marketleri',
      marketNotes:
        'Meşelikuyu Caddesi’ndeki güncel Şok şubesi ve yerel pazar, parka girmeden temel alışverişi karşılar.',
      fuelName: 'Shell Davutlar Çıkışı',
      fuelNotes:
        'Shell’in resmî kaydı; dizel, market, WC ve geçiş trafiğine uygun pompa alanı bulunan 24 saat açık istasyonu doğruluyor.',
      waterName: 'Hayal Bahçesi kamp suyu',
      waterNotes:
        'Kamp işletmesi karavan misafirleri için su listeliyor. İçme tankına doldurmadan içilebilirliğini sorun.',
      dumpName: 'Kaset veya gri su boşaltımı doğrulanmadı',
      dumpNotes:
        'Hayal Bahçesi boşaltım noktası ilan etmiyor; açıkça kabul eden bir tesis bulunana kadar tankları kapalı tutun.',
      warning1:
        'Dilek Yarımadası içinde yalnızca işaretli otoparklara park edin ve ziyaretçi koylarında kalın. Millî park içinde kamp ve geceleme yapılamaz.',
      warning2:
        'Araç girişi kapasiteyle sınırlandırılır ve yaz giriş saatleri değişebilir. Erken girin, ilan edilen son çıkıştan önce ayrılın.',
      sunrise:
        'Park açılmadan önce kasaba kıyısını; kapı açıldıktan sonra ise yalnızca izinli koyları kullanın.',
      sunset:
        'Güncel çıkış saati güvenli pay bırakmıyorsa park içinde gün batımı planlamayın; Güzelçamlı kıyısı daha düşük riskli alternatiftir.',
      photoAlt: 'Çamlarla çevrili turkuaz Ege koyu',
      ops: {
        lastMile:
          'Güzelçamlı ve Milli Park Caddesi asfalt olup normal şartlarda Ducato için rahattır. Park içinde ana ziyaretçi yolundan ayrılmayın, yalnızca işaretli koy otoparklarını kullanın; kapasite dolunca kuyruk veya giriş durdurma bekleyin.',
        supply:
          'Parka girmeden Güzelçamlı’da alışveriş yapın ve 24 saat açık Shell Davutlar Çıkışı’nda yakıt alın. Hayal Bahçesi karavan misafirlerine su sağlıyor; tanka doldurmadan önce içilebilir olup olmadığını sorun.',
        decision:
          'Güzelçamlı’ya asfalt ana yoldan girin ve geceyi Hayal Bahçesi’nde geçirin. Dilek Yarımadası’nı yalnızca gündüz ziyaret edin, işaretli koy otoparklarına park edin ve kapanıştan önce çıkın. Millî park içindeki yol ceplerinde veya plaj otoparklarında gecelemeyin. Korunan alana girmeden yiyecek, yakıt ve su işini tamamlayın.'
      }
    },
    bafaLake: {
      title: 'Bafa Gölü',
      region: 'Aydın–Muğla',
      overview: 'Latmos bölgesi ve Herakleia antik yerleşimiyle ilişkili korunan göl peyzajı.',
      whyVisit:
        'Doğal ve kültürel peyzajı birlikte görmek için durun. Park, erişim ve koruma kurallarını konaklamadan önce yerinde doğrulayın.',
      spots: {
        selenes: {
          title: 'Selenes Pansiyon Bahçe Kampı',
          overview:
            'Kapıkırı’daki işletmeli bahçe kampı. İşletme, korunan göl kıyısında ve Herakleia içinde kampın yasak olduğunu açıkça belirtiyor ve bahçesini yasal alternatif olarak sunuyor.',
          price: 'Güncel bahçe kampı ücretini sorun ve araç yeri ayırtın.',
          access:
            'Asfalt Kapıkırı yolunu kullanın. Ana yoldan ayrılmadan 15 m³ Ducato ölçülerini bildirin; son köy sokakları ve bahçe manevrası karayolundan daha dardır.',
          safety:
            'Yalnızca işletmenin gösterdiği alanda kalın. Yumuşak göl kıyısına veya arkeolojik zemine araçla girmeyin.'
        }
      },
      luna: {
        subject: 'Latmos yansımaları ve granit kayalar',
        lens: '24 mm ana kamera',
        timing: 'Gün doğumundan otuz dakika önce',
        settings: 'RAW, tripod, ISO 50, pozlama serisi',
        note: 'Dağlara ölçek vermek için önde bir kaya kullanın.'
      },
      municipality:
        'Kapıkırı’da pansiyon ve restoranlar var; ancak karavanlara özel belediye hizmet noktası bulunmuyor.',
      marketName: 'Alışverişi Kapıkırı’ya girmeden yapın',
      marketNotes:
        'Köyde küçük işletmeler var ancak kapsamlı alışveriş yapabileceğiniz bir süpermarket yok. Temel ihtiyaçları Söke–Milas yolu üzerindeyken tamamlayın.',
      fuelName: 'Yakıtı ana yolda alın',
      fuelNotes:
        'Kapıkırı sapağına girmeden D525 üzerindeki bir istasyonda yakıt alın; köyde akaryakıt istasyonu yok.',
      waterName: 'Suyu konakladığınız tesisten isteyin',
      waterNotes:
        'İçme suyu deposuyla dolu gelin. Selenes, konaklayan misafirlere su sağlayabilir; göl suyunu kesinlikle tanka doldurmayın.',
      dumpName: 'Atık boşaltma noktası yok',
      dumpNotes:
        'Kapıkırı ve Selenes’te karavan atığı boşaltılabilecek bir nokta bulunmuyor; tankları uygun bir tesise ulaşana kadar kapalı tutun.',
      warning1:
        'Kapıkırı yolu asfalt olsa da köy içinde taş duvarlar ve park etmiş araçlar nedeniyle daralıyor. Hava kararmadan varın; Ducato ile dar yan sokaklara girmeyin.',
      warning2:
        'Koruma altındaki göl kıyısı ve Herakleia kalıntılarının çevresi serbest kamp alanı değildir. Yağmurdan sonra kıyı zemini yumuşayabilir.',
      sunrise:
        'Aracı kıyıya sürmeden, köyden yürüyerek ulaşılabilen noktalardan göldeki gün doğumu yansımalarını izleyin.',
      sunset:
        'Herakleia ve Latmos manzarasını köyün açık patikalarından fotoğraflayın; kalıntıların üzerine veya yumuşak kıyı zeminine çıkmayın.',
      photoAlt: 'Şafakta Latmos Dağları’nın altındaki Bafa Gölü',
      ops: {
        lastMile:
          'Kapıkırı’ya giden ana yol asfalt. Köyün son bölümünde taş duvarlar ve park etmiş araçlar yolu daraltıyor; manevra alanı sınırlı. Selenes’te yerinizi önceden ayırın ve doğrudan tesise gidin.',
        supply:
          'Yiyecek ve yakıt alışverişini D525 üzerinde tamamlayın. Kapıkırı’da büyük market, akaryakıt istasyonu veya karavan atık noktası yok; içme suyu deponuz dolu olsun.',
        decision:
          'Kapıkırı’ya gündüz gidin ve önceden ayarladığınız tesise doğrudan geçin. Göl kıyısına araçla inmeyin; koruma alanını ve Herakleia çevresini serbest kamp yeri olarak kullanmayın. Aracı bıraktıktan sonra gölü ve kalıntıları yürüyerek keşfedin.'
      }
    },
    izmirRestart: {
      title: 'İzmir Home',
      region: 'Bayraklı TOKİ 7. Etap, İzmir',
      overview:
        'Bafa Gölü’nden teknik sorunlar nedeniyle İzmir Bayraklı TOKİ 7. Etap’taki eve dönüş noktası.',
      whyVisit:
        'Araçtaki sorunu evde çözüp hazırlıkları tamamladıktan sonra Palmiye Beach’e uzanan yeni bölüme başlamak için.',
      luna: {
        subject: 'Yola çıkış sabahı ve karavan hazırlığı',
        lens: '24 mm ana kamera',
        timing: 'Hareket etmeden hemen önce',
        settings: 'RAW veya standart fotoğraf modu',
        note: 'Bu noktayı gezi durağından çok yolculuğun yeni başlangıcını belgelemek için kullanın.'
      },
      municipality:
        'Burası eve dönüş ve yeniden hareket noktasını gösterir; gezi amaçlı geceleme veya karavan hizmet durağı değildir.',
      marketName: 'İzmir marketleri',
      marketNotes: 'Yiyecek ve ev alışverişini yola çıkmadan tamamlayın.',
      fuelName: 'Ana yol üzerindeki akaryakıt istasyonları',
      fuelNotes: 'Çeşme otoyoluna girmeden önce yakıt alın.',
      waterName: 'Evde temiz su hazırlığı',
      waterNotes: 'Temiz su tankını yola çıkmadan, bildiğiniz ev kaynağından doldurun.',
      dumpName: 'Bu durak için atık noktası gerekmiyor',
      dumpNotes: 'Atık ve tuvalet hazırlığını evden ayrılmadan tamamlayın.',
      warning1:
        'Bafa’dan dönmenize neden olan teknik sorunun giderildiğini yeni etaba başlamadan kontrol edin.',
      warning2:
        'Otoyola çıkmadan dolapları, çekmeceleri ve araç içindeki serbest eşyaları sabitleyin.',
      sunrise: 'İsterseniz hareket anını yolculuk günlüğü için fotoğraflayın.',
      sunset: 'Bu nokta fotoğraf durağı olarak planlanmadı.',
      photoAlt: 'İzmir’den yeniden yola çıkmak için hazırlanan karavan',
      ops: {
        lastMile: 'Navigasyonda İzmir Bayraklı TOKİ 7. Etap’taki evi hedefleyin.',
        supply: 'Evden yeniden çıkmadan yiyecek, temiz su, yakıt ve araç kontrollerini tamamlayın.',
        decision:
          'Bafa Gölü’nden Bayraklı TOKİ 7. Etap’taki eve dönün. Buradan Palmiye Beach’e, ardından Torba Halk Plajı’na gidin ve Gümüşlük’ten ana rotaya devam edin.'
      }
    },
    cesmePalmiye: {
      title: 'Palmiye Beach',
      region: 'Çeşme, İzmir',
      overview:
        'Çeşme merkez yerine doğrudan Üniversite Mahallesi’ndeki Palmiye Beach’i hedefleyen, yüzme odaklı tek gecelik mola.',
      whyVisit:
        'Uzun Bodrum etabından önce berrak Ege suyunda yüzmek, dinlenmek ve güne sakin başlamak için.',
      luna: {
        subject: 'Berrak Ege suyu, kıyı dokusu ve akşam siluetleri',
        lens: '24 mm ana kamera',
        timing: 'Öğleden sonra sonu ve mavi saat',
        settings: 'RAW çekin, sudaki parlak alanları koruyun',
        note: 'Plajdaki insanları yakın planda çekmeyin; güncel çekim kurallarını kontrol edin.'
      },
      municipality:
        'Herkese açık kaynaklarda plaj çevresinde WC ve duş bulunduğu belirtiliyor; çalışma durumu, ücret ve sezon koşulları varışta kontrol edilmeli.',
      marketName: 'Çeşme süpermarketleri',
      marketNotes: 'Uzun Bodrum etabının alışverişini Çeşme’den ayrılmadan tamamlayın.',
      fuelName: 'Çeşme akaryakıt istasyonları',
      fuelNotes: 'Bodrum yoluna çıkmadan önce ana yol üzerindeki bir istasyonda yakıt alın.',
      waterName: 'İçme suyu dolumu doğrulanmadı',
      waterNotes:
        'Görevli suyun içilebilir olduğunu açıkça doğrulamadıkça temiz su tankını doldurmayın.',
      dumpName: 'Atık boşaltma noktası doğrulanmadı',
      dumpNotes: 'Lisanslı bir tesis bulunana kadar gri ve siyah su tanklarını kapalı tutun.',
      warning1:
        'Plaja ulaşan son bölüm şehir içindeki dar bir sokaktan geçiyor ve yazın otopark hızla dolabilir; gündüz varın.',
      warning2:
        'Plaja giriş veya sıradan bir park yeri geceleme izni anlamına gelmez. Tabelaları kontrol edin ve gece kalmadan önce işletmeden ya da yetkiliden izin alın.',
      sunrise:
        'Gün doğumu için yalnızca gündüzden kontrol edilmiş, erişimi açık kıyı noktalarını kullanın.',
      sunset:
        'Akşam fotoğrafı için plajı ve Ege üzerinde batan güneşin kıyıya vuran ışığını kullanın.',
      photoAlt: 'Çeşme kıyısındaki Palmiye Beach',
      ops: {
        lastMile:
          'Navigasyon hedefi Çeşme merkez değil; Palmiye Beach, Üniversite Mahallesi, 4381 Sokak No:18 olmalı. Yol asfalt ancak kalabalık son sokağa girmeden park ve dönüş alanını kontrol edin.',
        supply:
          'Çeşme’den çıkmadan alışveriş ve yakıtı tamamlayın. Plaj çevresinde WC ve duş bildiriliyor; içme suyu ile atık boşaltma hizmeti doğrulanmış değil.',
        decision:
          'Doğrudan Palmiye Beach’e gidin. Gündüz varıp tabela, park kapasitesi ve geceleme koşullarını yerinde kontrol edin.'
      }
    },
    torba: {
      title: 'Torba Halk Plajı',
      region: 'Torba, Bodrum, Muğla',
      overview:
        'Bodrum Yarımadası’nın doğu girişinde, Çeşme’den gelen uzun yolu bölen ve Gümüşlük’e geçişi kolaylaştıran deniz kenarı mola.',
      whyVisit:
        'Uzun Çeşme etabından sonra deniz kıyısında dinlenmek ve ertesi gün Gümüşlük’e büyük bir sapma yapmadan devam etmek için.',
      luna: {
        subject: 'Torba Koyu, küçük tekneler ve sabahın sakin denizi',
        lens: 'Geniş koy manzarası için 24 mm; uzaktaki kıyı ve tekneler için 70 mm',
        timing: 'Sabah erken veya öğleden sonra sonu',
        settings: 'RAW, hafif eksi pozlama',
        note: 'Halka açık alandan çekim yapın; denize giren insanları rahatsız edecek kadrajlardan kaçının.'
      },
      municipality:
        'Resmî kaynaklarda halk plajında tuvalet, duş, yiyecek hizmeti ve otopark bulunduğu belirtiliyor. Sezon ve çalışma saatleri değişebilir.',
      marketName: 'Torba ve Bodrum marketleri',
      marketNotes:
        'Temel ihtiyaçlar yakında bulunabilir; Ducato için parkı rahat, ana yol üzerindeki marketleri tercih edin.',
      fuelName: 'Bodrum ana yol istasyonları',
      fuelNotes: 'Dar plaj sokaklarına girmeden önce ana yarımada yolu üzerinde yakıt alın.',
      waterName: 'İçme suyu dolumu doğrulanmadı',
      waterNotes:
        'Plaj duşu içme suyu kaynağı değildir. Yalnızca içilebilir olduğu doğrulanan noktadan dolum yapın.',
      dumpName: 'Atık boşaltma noktası doğrulanmadı',
      dumpNotes: 'Plajda kaset veya gri su boşaltımı için lisanslı bir nokta doğrulanmadı.',
      warning1:
        'Resmî sayfada karavan kapasitesi yazması geceleme iznini garanti etmez. Gece kalmadan önce güncel uygulamayı görevliye sorun.',
      warning2: 'Yazın otopark yoğun olabilir; giriş yolunu ve aracın çıkış alanını açık bırakın.',
      sunrise:
        'Koyu sabah erken saatte, yalnızca halka açık ve düzenlenmiş plaj erişiminden değerlendirin.',
      sunset: 'Akşam ışığını özel otel alanlarına girmeden halk plajı kıyısından çekebilirsiniz.',
      photoAlt: 'Bodrum Yarımadası’ndaki Torba Koyu ve halk plajı',
      ops: {
        lastMile:
          'Ana Bodrum–Torba yolunu kullanıp Herodot Bulvarı No:27 civarındaki Torba Halk Plajı’na gidin. Yol asfalt; otel ve mahalle içi kestirmelerden kaçının.',
        supply:
          'Resmî listede WC, duş, yiyecek hizmeti ve otopark bulunuyor. Güncel saatleri kontrol edin; içme suyu ve atık boşaltma hizmeti doğrulanmış değil.',
        decision:
          'Torba’yı Gümüşlük öncesi tek gecelik mola olarak kullanın. Varışta tabela ve güncel karavan kurallarını kontrol edin; geceleme açıkça kabul edilmiyorsa doğrulanmış yasal bir tesise geçin.'
      }
    },
    gumusluk: {
      title: 'Gümüşlük',
      region: 'Bodrum, Muğla',
      overview: 'Antik Myndos çevresinde, batı manzaralı sakin kıyı yerleşimi.',
      whyVisit: 'Taş sokakları, kıyıyı ve Tavşan Adası gün batımını yaşayın.',
      spots: {
        mandi: {
          title: 'Mandi Camping',
          overview:
            'Gümüşlük’e dört kilometre, denize kısa yürüyüş mesafesinde; temiz su, gri su gideri, elektrik ve kaset boşaltım terminalleri bulunan güvenlikli karavan kampı.',
          price: 'Gitmeden yer ayırtın ve güncel sezon ücretini işletmeden öğrenin.',
          access:
            'Sahil içindeki kestirmeler yerine işletmenin tarif ettiği ana giriş yolunu kullanın. Son iniş dardır; 15 m³ Ducato için yer ve manevra durumunu önceden sorun.'
        }
      },
      luna: {
        subject: 'Tavşan Adası ile sahilin üst üste gelen görünümü',
        lens: '70 mm telefoto',
        timing: 'Gün batımından mavi saate',
        settings: 'RAW, -0,7 EV, telefonu sabitleyin',
        note: '70 mm kamerayla Tavşan Adası’nı sahile daha yakın görünüyormuş gibi kadrajlayın.'
      },
      municipality: 'Gümüşlük’te karavanlara özel bir belediye hizmet noktası bulunmuyor.',
      marketName: 'Gümüşlük Çarşamba Pazarı',
      marketNotes:
        'Yerel pazar çarşamba günleri kuruluyor. Güncel yerini ve saatini kontrol edin; Ducato’yu pazar yoğunluğunun dışında bırakın.',
      fuelName: 'Yakıtı merkeze girmeden alın',
      fuelNotes:
        'Ana yarımada yolu üzerinde, rahat manevra edebileceğiniz bir istasyon tercih edin.',
      waterName: 'Planlı su dolum noktası yok',
      waterNotes:
        'Halka açık çeşmelere güvenmeyin. Suyu kamp işletmesinden izin alarak ve içilebilirliğini sorarak doldurun.',
      dumpName: 'Karavan atık noktası yok',
      dumpNotes:
        'Gri suyu ve tuvalet kasetini yalnızca bu hizmeti açıkça sunan bir tesiste boşaltın.',
      warning1:
        'Gümüşlük merkezindeki sahil sokakları dar, yazın park yeri bulmak zor. Ducato ile sahil içindeki kestirmelere girmeyin.',
      warning2: 'Gümüşlük’te güvenle önerebildiğimiz yasal bir ücretsiz geceleme noktası yok.',
      sunrise:
        'Gün doğumu için özel bir nokta önermiyoruz; aracı güvenli bir yere bıraktıktan sonra açık kıyı alanlarını yürüyerek keşfedin.',
      sunset:
        'Gün batımı için batıya bakan halk sahili iyi bir seçenek. Ducato’yu merkezin dışında bırakıp kıyıya yürüyün.',
      photoAlt: 'Gün batımında Gümüşlük sahili',
      ops: {
        lastMile:
          'Ana yarımada yolunu kullanın; Ducato’yu dar sahil merkezinin dışında bırakıp kıyıya yürüyün.',
        supply:
          'Mandi Camping; temiz su, elektrik, gri su ve tuvalet kaseti boşaltımı için kullanılabilecek en pratik seçenek.',
        decision:
          'Merkezin dışında park edip sahile yürüyün. Güvenilir bir ücretsiz geceleme noktası olmadığı için geceyi Mandi gibi karavan kabul eden bir kampta geçirin.'
      }
    },
    akyarlar: {
      title: 'Akyarlar',
      region: 'Bodrum, Muğla',
      overview: 'Sığ denizi ve Kos manzarasıyla güneye bakan koy.',
      whyVisit: 'Rahat bir yüzme günü geçirin, rüzgâr sörfçülerini fotoğraflayın.',
      spots: {
        cuce: {
          title: 'Akyarlar Karavan Kampı (Cüce Camping)',
          overview:
            '“Cüce Camping” işletmenin adıdır. Deniz kıyısındaki karavan alanında su, elektrik, atık su gideri, duş, WC, çamaşırhane ve güvenlik hizmetleri bulunuyor.',
          price: 'Güncel ücreti ve Ducato için boş yer olup olmadığını gitmeden sorun.',
          access:
            'Ducato’nun ölçülerini işletmeye bildirin ve tarif ettikleri ana giriş yolunu kullanın.'
        },
        fenerburnu: {
          title: 'Fenerburnu ücretsiz geceleme seçeneği',
          overview:
            'Diğer karavancıların ücretsiz konakladığını bildirdiği, Kos manzaralı bir sahil noktası. Zemin yer yer bozuk ve hafif eğimli olabilir.',
          price:
            'Ücretsiz kullanıldığı bildiriliyor; güncel levhaları ve geceleme iznini vardığınızda kontrol edin.',
          access:
            'Hava kararmadan gidin; rüzgârı, zemini, levhaları ve rahat çıkış imkânını kontrol edin.',
          safety: 'Uzun süreli kamp düzeni kurmayın; geceleme yasaksa ayrılın.'
        }
      },
      luna: {
        subject: 'Kos silüeti ve rüzgâr sörfçüleri',
        lens: '70 mm telefoto',
        timing: 'Öğleden sonra',
        settings: '1/1000 sn, Otomatik ISO, seri çekim',
        note: 'Sert rüzgârda telefonu tuzlu sudan koruyun.'
      },
      municipality:
        'Fenerburnu yalnızca diğer karavancıların kullandığını bildirdiği bir seçenek; resmî kamp alanı değil.',
      marketName: 'Akyarlar’da alışveriş',
      marketNotes: 'Dar plaj sokaklarına girmeden önce temel ihtiyaçları alın.',
      fuelName: 'Yakıtı Akyarlar’a girmeden alın',
      fuelNotes: 'Ana yarımada yolu üzerindeki geniş bir istasyonu kullanın.',
      waterName: 'Akyarlar Cüce Camping’de su',
      waterNotes: 'Kampta konaklayan misafirler su kullanabiliyor.',
      dumpName: 'Akyarlar Cüce Camping’de atık su boşaltımı',
      dumpNotes: 'Tuvalet kasetinin nereye ve nasıl boşaltılacağını işletmeye sorun.',
      warning1:
        'Fenerburnu rüzgârlı; zemin yer yer bozuk ve hafif eğimli. Hava kararmadan gidip park edeceğiniz yeri inceleyin.',
      warning2:
        'Diğer karavancıların burada kalmış olması bugün de izin verildiği anlamına gelmez; levhaları kontrol edin.',
      sunrise:
        'Gün doğumu için özel bir nokta önermiyoruz; sahile erişimi ve park durumunu gündüz kontrol edin.',
      sunset:
        'Rüzgâr uygunsa ve aracı güvenle bırakabiliyorsanız halk sahilinden gün batımını izleyin.',
      photoAlt: 'Akyarlar kıyısı ve açık Ege manzarası',
      ops: {
        lastMile: 'Akyarlar’a girilir; plaj sokakları ve yaz parkı dikkat gerektirir.',
        supply:
          'Ücretsiz geceleme uygun değilse Akyarlar Cüce Camping; su, elektrik, atık su gideri, WC ve duş ihtiyacını tek yerde karşılayan ücretli seçenektir.',
        decision:
          'Fenerburnu’na gündüz gidip levhaları, rüzgârı ve zemini kontrol edin. Gecelemeye izin verilmiyorsa veya zemin güvenli değilse Akyarlar Cüce Camping’e geçin.'
      }
    },
    mazi: {
      title: 'Mazı — İnceyalı Sahili',
      region: 'Bodrum, Muğla',
      overview:
        'Gökova Körfezi’ndeki sakin Mazı kıyısı; hedef artık iç bölgedeki köy yolu değil, doğrudan İnceyalı Sahili.',
      whyVisit:
        'İnceyalı’da denize girmek; yakındaki Çakıllıyalı ve Hurma sahillerini görmek için. Park ve geceleme iznini vardığınızda kontrol edin.',
      luna: {
        subject: 'Çam sırtları, koylar ve Samanyolu',
        lens: '24 mm ana kamera',
        timing: 'Mavi saat veya aysız gece',
        settings: 'Tripodda Gece modu; gündüz RAW',
        note: 'Sağlam zeminde durun, uzun pozlamada farları kapatın.'
      },
      municipality:
        'İnceyalı hedefinde karavan hizmeti bulunmuyor; su, WC, duş ve atık boşaltma imkânı beklemeyin.',
      marketName: 'Alışverişi Mazı’ya gelmeden yapın',
      marketNotes: 'Koy yollarına sapmadan önce büyük alışverişi tamamlayın.',
      fuelName: 'Depoyu önceden doldurun',
      fuelNotes: 'Mazı’ya yeterli yakıtla gelin.',
      waterName: 'Suyunuzu yanınızda getirin',
      waterNotes: 'Güvenilir bir su dolum noktası bulunmuyor.',
      dumpName: 'Atık boşaltma noktası yok',
      dumpNotes: 'Tankları uygun bir karavan tesisine ulaşana kadar kapalı tutun.',
      warning1:
        'Koylara inen yolların genişliği ve dönüş alanları 15 m³ Ducato için her yerde uygun değil. İnmeden önce yolu gündüz kontrol edin.',
      warning2: 'Yangın yasaklarına uyun; orman ve acil durum yollarını hiçbir zaman kapatmayın.',
      sunrise:
        'Gün doğumu için yalnızca gündüz görüp güvenli olduğundan emin olduğunuz, aracı yol dışına çıkarabildiğiniz bir nokta kullanın.',
      sunset: 'Gün batımı için sağlam zemini ve güvenli park alanı olan bir seyir noktası seçin.',
      photoAlt: 'Ormanlı yamaçların altındaki Mazı kıyısı',
      ops: {
        lastMile:
          'Her koy inişini ayrı değerlendirin; genişlik, zemin ve dönüşü gündüz kontrol edin.',
        supply: 'Yiyecek, yakıt ve suyla hazırlıklı gelin.',
        decision:
          'Doğrudan seçtiğimiz İnceyalı noktasına gidin. Hava kararmadan varın; son yolun genişliğini, zemini, 15 m³ Ducato için dönüş alanını ve güncel yasak levhalarını kontrol edin. Uygunsa geçişi kapatmadan ve dışarıya kamp düzeni kurmadan araç içinde kalın; uygun değilse bir sonraki ücretsiz adaya devam edin.'
      }
    },
    akbuk: {
      title: 'Akbük Koyu',
      region: 'Gökova Körfezi, Muğla',
      overview: 'Gökova tepeleriyle çevrili berrak sulu geniş koy.',
      whyVisit:
        'Berrak denizde yüzmek, açık körfez manzarasını izlemek ve güneş panellerinden iyi verim almak için.',
      spots: {
        pasali: {
          title: 'Paşalı Camping & Caravan',
          overview:
            'Akbük kıyısına yakın, zeytin ağaçları altında ve kendi karavanıyla gelen misafirleri açıkça kabul eden küçük işletmeli karavan parkı.',
          price: 'Kapasite sınırlı olduğundan yer ayırtın ve güncel ücreti işletmeden öğrenin.',
          access:
            'Güvenlik bariyeri rezervasyon teyidi isteyebilir. Gündüz varın ve 15 m³ Ducato için dönüş alanını önceden sorun.'
        }
      },
      luna: {
        subject: 'Gökova’nın turkuaz suyu ve arka plandaki dağ sıraları',
        lens: '24 mm ana kamera',
        timing: 'Gün doğumundan sonraki ilk saat',
        settings: 'RAW, -0,3 EV, isteğe bağlı polarize filtre',
        note: 'Sabah sisi ve sıcak hava puslanması başlamadan, güvenli ve halka açık bir seyir noktasından çekim yapın.'
      },
      municipality:
        'Akbük koruma alanı içinde; kıyıdaki boş alanlar kamp yeri olarak kullanılamaz.',
      marketName: 'Alışverişi koya gelmeden yapın',
      marketNotes: 'Büyük alışverişi Akbük yoluna girmeden tamamlayın.',
      fuelName: 'Yakıtı ana yolda alın',
      fuelNotes: 'Kıyı yoluna sapmadan önce depoyu doldurun.',
      waterName: 'Su için kamp tesisini kullanın',
      waterNotes: 'Suyu yalnızca konakladığınız kampın izin verdiği noktadan alın.',
      dumpName: 'Atığı yalnızca izin verilen yerde boşaltın',
      dumpNotes: 'İşletme açıkça izin vermedikçe gri su veya tuvalet kaseti boşaltmayın.',
      warning1:
        'Koruma alanındaki boş kıyı parçalarını ücretsiz kamp alanı sanmayın; çevre ve işgal denetimleri yapılıyor.',
      warning2: 'Yola çıkmadan kıyıya inen son yolun durumunu ve kampın açık olduğunu sorun.',
      sunrise: 'Gün doğumu için belirli bir nokta önermiyoruz.',
      sunset: 'Gün batımını yalnızca halka açık ve güvenli kıyı erişiminden izleyin.',
      photoAlt: 'Gökova kıyısındaki Akbük Koyu',
      ops: {
        lastMile: 'Son bölüme dikkatli girin ve rezervasyon yaptığınız tesise doğrudan gidin.',
        supply: 'Açık bir kamp; su, elektrik ve atık hizmetlerini tek yerde sağlayabilir.',
        decision:
          'Koyu gündüz gezin; koruma altındaki sahili ücretsiz kamp alanı olarak kullanmayın. Geceyi karavan kabul eden bir tesiste geçirin.'
      }
    },
    dalyan: {
      title: 'Dalyan',
      region: 'Ortaca, Muğla',
      overview: 'Likya mezarlarına ve korunan sazlıklara bakan nehir kasabası.',
      whyVisit:
        'Ducato’yu doğrulanmış Sarıgerme karavan alanına bırakın. İsterseniz Dalyan merkezini ayrıca ziyaret edip izinli bir günübirlik geziye katılın; tekne yolculuğu sürüş rotasının parçası değildir.',
      spots: {
        sarigerme: {
          title: 'Sarıgerme Belediye Karavan Alanı',
          overview:
            'Dalyan etabının pratik geceleme üssü olarak seçilen, Sarıgerme kıyısındaki belediye işletmeli çadır ve karavan alanı.',
          price:
            'Sezon ücretini ve alanın açık olup olmadığını Ortaca Belediyesinden gitmeden öğrenin.',
          access:
            'Sarıgerme Plajı’na giden işaretli ana yolu kullanın. Yola çıkmadan tesisin açık olduğunu ve Ducato için yer bulunduğunu sorun.'
        }
      },
      luna: {
        subject: 'Dalyan Nehri üzerindeki Likya mezarları',
        lens: '70 mm telefoto',
        timing: 'Öğleden sonra',
        settings: 'RAW, -0,3 EV; telefonu halka açık seyir alanında sabitleyin',
        note: 'Ducato’yu yasal alanda bırakın. Tekne gezisi karavan rotası değil, yalnızca isteğe bağlı günübirlik etkinliktir.'
      },
      municipality:
        'Geceyi karavan kabul eden bir tesiste geçirin; İztuzu Plajı geceleme alanı değildir.',
      marketName: 'Dalyan’da alışveriş',
      marketNotes: 'Ducato için geniş otoparkı olan bir market tercih edin.',
      fuelName: 'Yakıtı merkeze girmeden alın',
      fuelNotes: 'Dar nehir kıyısı sokaklarına girmeden önce yakıt alın.',
      waterName: 'Suyu konakladığınız kamptan alın',
      waterNotes: 'Plajdaki suyu içme suyu olarak kullanmayın.',
      dumpName: 'Halka açık atık noktası yok',
      dumpNotes: 'Karavan atığını yalnızca bu hizmeti açıkça sunan bir tesiste boşaltın.',
      warning1:
        'İztuzu, deniz kaplumbağalarının koruma altındaki yuvalama alanıdır ve yalnızca gündüz ziyaret edilmelidir; burada gecelemeyin.',
      warning2:
        'Ducato’yu yasal bir park alanında bırakın; sazlıklara, sulak zemine veya plaja araçla girmeyin.',
      sunrise:
        'Gün doğumunu yalnızca ziyarete açık alanlardan, yaban hayatını rahatsız etmeden izleyin.',
      sunset: 'Gün batımı için Dalyan merkezindeki nehir kıyısı yürüyüş yolunu kullanın.',
      photoAlt: 'Dalyan’ın koruma altındaki sazlık kanalları',
      ops: {
        lastMile:
          'Dalyan’a ana yoldan ulaşım rahattır; nehir kıyısındaki merkez sokakları ise dardır. Merkeze girmeden park edin.',
        supply:
          'Dalyan’da market ve akaryakıt bulunur. Su ve atık boşaltımı için hizmet verdiğini önceden doğruladığınız bir karavan alanını kullanın.',
        decision:
          'Ducato’yu geniş yasal alan veya kampta bırakıp Dalyan ve İztuzu’yu ayrı gezin. İztuzu’da gecelemeyin.'
      }
    },
    karaotBeach: {
      title: 'Karaot Plajı',
      region: 'Fethiye, Muğla',
      overview: 'Sulak alanın yanında doğal plaj ve geniş gökyüzü.',
      whyVisit: 'Kuş gözlemi, şafak yürüyüşü ve sade bir plaj günü için durun.',
      spots: {
        onur: {
          title: 'Onur Kamping ve Karavan Alanı',
          overview: 'Yanıklar’daki işletmeli deniz kıyısı karavan kampı.',
          price: 'Güncel ücreti ve boş yer durumunu gitmeden sorun.',
          access: 'Yanıklar üzerinden gelen ana giriş yolunu kullanın.'
        },
        karaotFree: {
          title: 'Karaot Halk Plajı ücretsiz geceleme seçeneği',
          overview:
            'Diğer karavancıların ücretsiz konakladığını bildirdiği halk plajı otoparkı. Yakınında su, WC, duş ve çöp konteynerleri bulunduğu aktarılıyor.',
          price: 'Ücretsiz bildiriliyor; araç ücreti ve geceleme levhasını kontrol edin.',
          access:
            'Hava kararmadan gidin ve yalnızca mevcut sert zeminli otoparkı kullanın. Kumullara girmeyin; plaj ve acil geçiş yollarını kapatmayın.',
          safety:
            'Vardığınızda gördüğünüz levhalar ve yetkililerin yönlendirmesi eski kullanıcı yorumlarından daha geçerlidir.'
        }
      },
      luna: {
        subject: 'Sulak alan kuşları ve plaj otları',
        lens: '70 mm telefoto',
        timing: 'Gün doğumu',
        settings: '1/1000 sn, Otomatik ISO, seri çekim',
        note: 'Yaban hayatını uzaktan fotoğraflayın.'
      },
      municipality:
        'Halk plajında kafe, duş ve lavabo bulunuyor; bu hizmetler sezon dışında kapalı olabilir.',
      marketName: 'Ana yolda market',
      marketNotes: 'En yakın marketin yaklaşık 2 km uzakta olduğu bildiriliyor.',
      fuelName: 'Yakıtı Karaot’a gelmeden alın',
      fuelNotes: 'Ana yol üzerindeki bir istasyonu kullanın.',
      waterName: 'Karaot’taki su noktaları',
      waterNotes:
        'Girişte ve plaj çevresinde çeşme bulunduğu bildiriliyor; tanka doldurmadan önce suyun içilebilirliğini sorun.',
      dumpName: 'Karavan atık noktası yok',
      dumpNotes: 'Çöp konteynerlerine gri su veya tuvalet atığı boşaltmayın.',
      warning1:
        'Yalnızca mevcut otopark alanında kalın; kumullara ve koruma alanına araçla girmeyin.',
      warning2:
        'Güncel levhaları ve varsa araç giriş ücretini kontrol edin. Yazın kalabalık ve sivrisinek olabilir.',
      sunrise: 'Gün doğumunu plajın halka açık bölümünden, koruma alanına girmeden izleyin.',
      sunset: 'Gün batımını güncel kullanım kurallarına uyarak halk plajından izleyin.',
      photoAlt: 'Karaot halk plajı ve açık kıyı manzarası',
      ops: {
        lastMile:
          'Halk plajına ulaşım Ducato için uygun görünüyor; yine de zemini ve giriş bariyerlerini vardığınızda kontrol edin.',
        supply:
          'Su, WC, duş ve çöp konteyneri bulunduğu bildiriliyor. Tesislerin açık olduğunu ve suyun içilebilirliğini yerinde sorun.',
        decision:
          'Karaot, bu rota üzerindeki daha uygulanabilir ücretsiz geceleme seçeneklerinden biri. Hava kararmadan gidin, levhaları kontrol edin, koruma alanına girmeyin ve geçiş yollarını açık bırakın.'
      }
    },
    faralya: {
      title: 'Faralya',
      region: 'Fethiye, Muğla',
      overview: 'Kelebekler Vadisi ve Akdeniz üzerinde yüksek dağ köyü.',
      whyVisit:
        'Ducato’yu riskli koy yollarına indirmeden Kelebekler Vadisi ve Kabak manzarasını görmek, serin bir akşam ve gün batımı yaşamak için.',
      spots: {
        aydede: {
          title: 'Aydede Camping Ölüdeniz',
          overview:
            'Faralya’nın dar ve uçurumlu yoluna Ducato ile çıkmak istemeyenler için Ovacık’ta kullanılabilecek karavan kampı.',
          price: 'Güncel karavan ücretini ve boş yer durumunu gitmeden sorun.',
          access:
            'Ovacık’a ana yoldan girin. Faralya yolundaki trafik, yol genişliği veya hava koşulları güven vermiyorsa Ducato’yu burada bırakıp Faralya–Kabak minibüsüne geçin.',
          safety:
            'Burası güvenli ve temkinli üs seçeneğidir; Faralya’da deniz manzaralı bir yer değildir.'
        },
        bagCamp: {
          title: 'Bağ Camp Kabak',
          overview:
            'Kabak’ın üstünde panoramik deniz manzarası sunan; campervan yeri, WC, sıcak duş, su, elektrik ve Wi-Fi bulunan küçük işletmeli kamp.',
          price: 'Alan küçük ve sezonluktur; yola girmeden Ducato uzunluğunu bildirip yer ayırtın.',
          access:
            'Asfalt Faralya–Kabak üst yolundan Kabak Caddesi No. 34’teki işaretli girişe gidin. Karavan yorumları son viraj ve girişi dar olarak tarif ediyor; Kabak sahiline inmeye devam etmeyin.',
          safety:
            'Yalnızca gösterilen alana park edin. Kamp koyun üstündedir; plaja yürüyerek inilir ve dönüş dik tırmanıştır.'
        }
      },
      luna: {
        subject: 'Kelebekler Vadisi ve arka arkaya uzanan kıyı burunları',
        lens: '70 mm telefoto',
        timing: 'Gün batımından önceki kırk dakika',
        settings: 'RAW, -0,7 EV, odak kilidi',
        note: 'Korkuluk bulunmayan uçurum kenarlarına yaklaşmayın; çekimi güvenli bir terastan yapın.'
      },
      municipality:
        'Faralya’da hizmetler birbirinden uzak; belediyeye ait karavan servis noktası yok.',
      marketName: 'Alışverişi Fethiye veya Ovacık’ta yapın',
      marketNotes:
        'Büyük alışverişi Ölüdeniz’e inmeden tamamlayın. Faralya ve Kabak’taki küçük sezonluk işletmeler, tüm karavan ihtiyaçlarını karşılamayabilir.',
      fuelName: 'Tırmanıştan önce yakıt alın',
      fuelNotes:
        'Faralya yoluna başlamadan Fethiye veya Ovacık’ta depoyu doldurun; uçurum yolunda istasyon yok.',
      waterName: 'Suyu rezervasyon yaptığınız kamptan alın',
      waterNotes:
        'Bağ Camp’in misafirlerine su sağladığı belirtiliyor. Tanka doldurmadan önce içilebilirliğini sorun; yol kenarındaki kaynaklara güvenmeyin.',
      dumpName: 'Karavan atık noktası yok',
      dumpNotes:
        'Bölgedeki kamplar gri su veya tuvalet kaseti boşaltma hizmeti vermiyor olabilir; tankları uygun bir tesise ulaşana kadar kapalı tutun.',
      warning1:
        'Ölüdeniz–Faralya yolu asfalt fakat dik, çok virajlı ve bazı yerlerde iki büyük aracın yan yana geçemeyeceği kadar dar. Nisan 2026’daki kaya düşmesi, yamaç riskinin gerçek olduğunu gösteriyor.',
      warning2:
        'Kelebekler Vadisi tabanına araç yolu yok. Kabak sahiline inen yol dik, dar, gevşek zeminli ve keskin virajlı; Ducato ile kesinlikle inmeyin.',
      sunrise:
        'Gün doğumunu rezervasyon yaptığınız üst kampın terasından veya köyde güvenli bir noktadan izleyin; yol üzerindeki dar ceplerde durmayın.',
      sunset:
        'Kelebekler Vadisi ve Kabak üzerindeki seyirler gün batımında çok güzel. Aracı yol kenarında bırakmayın; güvenli bir teras veya belirlenmiş seyir noktası kullanın.',
      photoAlt: 'Akdeniz üzerindeki Faralya uçurumları',
      ops: {
        lastMile:
          'Ölüdeniz–Faralya asfalt fakat dar, dik ve uçurumlu; bazı virajlarda iki büyük araç rahat geçemez. Faralya köyü yalnızca dikkatle yönetilebilir. Üst Kabak’a ancak rezervasyonlu bir alan için devam edin; Ducato’yu yukarıda bırakın ve Kabak sahili yoluna kesinlikle inmeyin.',
        supply:
          'Kıyı tırmanışından önce Fethiye veya Ovacık’ta yiyecek ve yakıt alın. Rezervasyonlu kamp su ve WC sağlayabilir; Faralya–Kabak yolunda belgelenmiş boşaltım noktası yoktur.',
        decision:
          'Uçurum yolunda rahat değilseniz Ducato’yu Ovacık’taki Aydede’de bırakıp Faralya–Kabak minibüsünü kullanın. Çıkacaksanız gündüz sürün ve yalnızca Bağ Camp gibi önceden ayarlanmış üst alana gidin. Kelebekler Vadisi tabanına araç yolu yoktur; Kabak sahili inişi Ducato’ya uygun değildir. Açık seyir veya geçiş ceplerinde gecelemeyin.'
      }
    },
    patara: {
      title: 'Patara',
      region: 'Kaş, Antalya',
      overview:
        'Patara’nın kum tepelerine ve uzun kumsalına yukarıdan bakan, işletmesiz ve tesissiz ücretsiz geceleme adayı.',
      whyVisit:
        'Kum denizi hissi veren manzarayı görmek, gün batımını izlemek, Patara Plajı’nda yüzmek ve Faralya–Kaş arasındaki uzun sürüşü bölmek için.',
      luna: {
        subject: 'Patara kum tepeleri, kıyı çizgisi ve gün batımı katmanları',
        lens: '24 mm ana kamera ve 70 mm telefoto',
        timing: 'Gün batımından 45 dakika önce',
        settings: 'RAW, -0,7 EV; kum tepelerinde parlak alanları koruyun',
        note: 'Koruma alanına girmeden ve kumullara basmadan yalnızca mevcut park açıklığından çekim yapın.'
      },
      municipality:
        'Kum tepeleri park adayında su, WC, duş veya karavan atık hizmeti yok; yalnızca çöp kutusu bildiriliyor.',
      marketName: 'Gelemiş’te alışveriş',
      marketNotes:
        'Kum tepeleri yoluna girmeden yiyecek ve içecek alın; park noktasında hizmet bulunmuyor.',
      fuelName: 'Kalkan–Kaş ana yolunda yakıt',
      fuelNotes: 'Patara sapağına girmeden manevra alanı geniş bir istasyonda depoyu tamamlayın.',
      waterName: 'Suyu önceden doldurun',
      waterNotes: 'Kum tepeleri park noktasında güvenilir su dolum imkânı bulunmuyor.',
      dumpName: 'Atık boşaltma noktası yok',
      dumpNotes: 'Gri suyu ve tuvalet kasetini uygun bir karavan hizmetine kadar araçta tutun.',
      warning1:
        'Patara koruma altındaki deniz kaplumbağası yuvalama kıyısıdır. Gece plaja girmeyin, kumullara araçla veya yürüyerek çıkmayın ve yapay ışık kullanmayın.',
      warning2:
        'Son 2–3 km bozuk ve kıvrımlı; bazı yaklaşımlar dik mahalle yollarına sapıyor. 15 m³ Ducato ile kuru havada, gündüz ve dönüş alanını kontrol ederek ilerleyin.',
      sunrise:
        'Gece sahil kısıtlamaları nedeniyle gün doğumu için plaja inmeyin; mevcut park açıklığından koruma alanına girmeden çekim yapın.',
      sunset:
        'Kum tepeleri üstündeki mevcut park açıklığı güçlü bir gün batımı manzarası sunuyor; kalabalık saatlerde yolu ve manzarayı kapatmayın.',
      photoAlt: 'Patara kum tepeleri ve Akdeniz kıyısı',
      ops: {
        lastMile:
          'Gelemiş merkezinden kum tepeleri yönüne gündüz ilerleyin. Navigasyonun dik mahalle kestirmelerine sokmasına izin vermeyin; son 2–3 km bozuk, dar ve virajlıdır. Yağmurda zemini zorlamayın.',
        supply:
          'Gelemiş’e ulaşmadan yakıtı, içme suyunu ve yiyeceği tamamlayın. Hedefte su, WC, duş, elektrik veya atık boşaltma hizmeti yoktur.',
        decision:
          'Hava kararmadan gidip levhaları, yolu, sert zemini ve Ducato dönüş alanını kontrol edin. Gecelemeye açıkça izin verilmiyorsa kalmayın. Uygunsa yalnızca aracın içinde, dışarıya kamp düzeni kurmadan ve tüm geçişleri açık bırakarak bir gece kalın.'
      }
    },
    kas: {
      title: 'Kaş',
      region: 'Antalya',
      overview: 'Canlı limanı ve Likya tarihiyle Akdeniz kasabası.',
      whyVisit: 'Olağanüstü denizi, yemekleri ve Kaputaş kıyı yolunu keşfedin.',
      spots: {
        kasCamp: {
          title: 'Kaş Camping',
          overview:
            'Kaş merkezine yaklaşık iki kilometre uzaklıkta, belirlenmiş karavan yerleri ve doğrudan plaj erişimi bulunan işletmeli deniz kıyısı kampı.',
          price: 'Gitmeden yer ayırtın ve güncel karavan ücretini işletmeden öğrenin.',
          access:
            'İşaretli Kaş–Kalkan ana yol girişini kullanın. Girmeden 15 m³ Ducato için alan uzunluğunu ve dönüş yerini sorun.'
        }
      },
      luna: {
        subject: 'Liman ışıkları ve Meis',
        lens: '70 mm telefoto',
        timing: 'Mavi saat',
        settings: 'RAW, 1/125 sn, -0,7 EV',
        note: 'Halka açık seyir noktalarını kullanın ve sınır bölgesindeki çekim kurallarına uyun.'
      },
      municipality:
        'Şehirdeki ziyaretçi tesisleri karavan servisi sunmuyor; geceleme ve araç ihtiyaçları için karavan kabul eden bir kamp kullanın.',
      marketName: 'Alışverişi eski şehre girmeden yapın',
      marketNotes:
        'Ducato ile dar merkeze girmeden, ana yol üzerindeki marketlerden alışveriş yapın.',
      fuelName: 'D400 üzerinde yakıt',
      fuelNotes: 'Rahat girip çıkabileceğiniz, manevra alanı geniş bir istasyon seçin.',
      waterName: 'Kaş Camping’de su',
      waterNotes: 'Kampta konaklayan misafirler için su bulunuyor.',
      dumpName: 'Kaş Camping’de atık boşaltma',
      dumpNotes: 'Gri su ve tuvalet kaseti boşaltma hizmeti sunulduğu belirtiliyor.',
      warning1:
        'Eski şehir sokakları dar ve yazın park yeri bulmak çok zor; Ducato’yu kampta bırakıp merkeze yürüyün.',
      warning2: 'Kaputaş gibi yol kenarındaki popüler plaj otoparkları geceleme alanı değildir.',
      sunrise:
        'Gün doğumunu, aracı güvenle bırakabildiğiniz halka açık bir seyir noktasından izleyin.',
      sunset:
        'Gün batımı için araç trafiğini engellemeyen halka açık kıyı noktalarını tercih edin.',
      photoAlt: 'Alacakaranlıkta Kaş limanı ve Akdeniz kıyısı',
      ops: {
        lastMile:
          'Kaş’a D400 ile girilir; eski şehir büyük Ducato ile park aramaya uygun değildir.',
        supply:
          'Kaş Camping veya Olympos Mocamp’te geceleme, temiz su ve karavan atığı boşaltma ihtiyaçlarını aynı yerde karşılayabilirsiniz.',
        decision:
          'Önceden yer ayırttığınız kampa gidip Ducato’yu bırakın; Kaş merkezini yürüyerek gezin. Merkezde güvenle önerebildiğimiz yasal bir ücretsiz geceleme alanı yok.'
      }
    },
    cirali: {
      title: 'Çıralı',
      region: 'Kemer, Antalya',
      overview: 'Dağlarla çevrili korunan plajın arkasındaki alçak katlı köy.',
      whyVisit: 'Yüzün, Olympos’u gezin ve Yanartaş’ın sonsuz alevlerine yürüyün.',
      spots: {
        olympos222: {
          title: '222 Camping & Van',
          overview:
            '220 V bağlantısı, temiz su noktaları, duş, WC ve ortak kullanım alanları bulunan Çıralı’daki işletmeli karavan alanı.',
          price: 'Güncel karavan ücretini ve boş yer durumunu işletmeden öğrenin.',
          access:
            'Çıralı’ya hava kararmadan inin ve tesisin işaretli ana girişini kullanın. 15 m³ Ducato’nun kapıdan geçip rahatça dönebileceğini gitmeden sorun.'
        }
      },
      luna: {
        subject: 'Olympos, plaj şafağı ve Yanartaş',
        lens: '24 mm ana kamera',
        timing: 'Gün doğumu veya mavi saat',
        settings: 'Gündüz RAW; Yanartaş’ta Gece modu',
        note: 'Yuvalama plajında yapay ışık kullanmayın.'
      },
      municipality:
        'Koruma altındaki plajda karavan hizmeti yok; geceyi karavan kabul eden bir kampta geçirin.',
      marketName: 'Alışverişi Çıralı’ya inmeden yapın',
      marketNotes: 'Büyük alışverişi ana yoldayken tamamlayın.',
      fuelName: 'Yakıtı ana yolda alın',
      fuelNotes: 'Çıralı sapağından önce depoyu doldurun.',
      waterName: '222 Camping’de temiz su',
      waterNotes: 'Karavan alanlarının yakınında temiz su bağlantıları bulunuyor.',
      dumpName: 'Atık boşaltma hizmeti belirsiz',
      dumpNotes: 'Gri suyu veya tuvalet kasetini boşaltmadan önce işletmeden açıkça izin alın.',
      warning1:
        'Çıralı, caretta caretta yuvalama alanıdır. Gece erişimi ve ışık kurallarına uyun; sahilde kamp kurmayın.',
      warning2:
        'Bahçe girişleri ve sahile inen yollar yazın daralıyor; rezervasyon yaptığınız alana hava kararmadan gidin.',
      sunrise:
        'Gün doğumunu, yuvalama alanı kurallarına uyarak plajın ziyarete açık bölümünden izleyin.',
      sunset:
        'Gün batımını belirlenmiş plaj girişlerinden izleyin; koruma altındaki bölümlere girmeyin.',
      photoAlt: 'Ormanlı dağların altındaki Çıralı Plajı',
      ops: {
        lastMile: 'Yerleşime araçla girilir; son bahçe yolları dikkat gerektirir.',
        supply:
          '222 Camping misafirlere temiz su ve 220 V sağlar; yakıt ve alışverişi inişten önce tamamlayın.',
        decision:
          'Sahilde rastgele bir geceleme yeri aramak yerine karavan kabul eden bir kamp kullanın. Ducato’yu kampta bırakıp koruma altındaki kıyıyı yürüyerek gezin.'
      }
    },
    lara: {
      title: 'Lara',
      region: 'Muratpaşa, Antalya',
      overview:
        'Antalya’nın doğu kıyısında, şehir ihtiyaçlarına kolay ulaşılabilen ve Güzeloba’daki belediye karavan parkının değerlendirilebileceği son durak.',
      whyVisit:
        'Volkan Konak Karavan Park’ın açıldığını doğrulayıp rotanın son servis üssü olarak kullanın.',
      spots: {
        volkanKonak: {
          title: 'Volkan Konak Karavan Parkı',
          overview:
            'Yaklaşık 120 karavan; market, çamaşırhane, duş, WC, kafe ve pis su noktaları planlanan belediye parkı.',
          price: 'Tesisin açılıp açılmadığını ve güncel ücretini gitmeden öğrenin.',
          access:
            'Güzeloba’ya ana yoldan gidin ve tesise hareket etmeden önce telefonla bilgi alın.',
          safety:
            'Haziran 2026 kaynakları açılış zamanı konusunda farklı ifade kullandı; çalıştığını doğrulayın.'
        }
      },
      luna: {
        subject: 'Plaj, kumul otları ve Beydağları',
        lens: '24 mm ana kamera',
        timing: 'İlk ışık',
        settings: 'RAW, -0,3 EV, dikeyleri düz tutun',
        note: 'Çitli kumullara girmeyin ve havalimanı yakınında drone uçurmayın.'
      },
      municipality:
        'Volkan Konak Karavan Parkı belediyenin resmî seçeneği; gitmeden önce hizmet verdiğini kontrol edin.',
      marketName: 'Lara’da alışveriş',
      marketNotes: 'Şehir içinde market ve diğer temel ihtiyaçlara kolayca ulaşılabilir.',
      fuelName: 'Yakıtı ana yol üzerinde alın',
      fuelNotes: 'Ducato ile rahatça girip çıkabileceğiniz büyük bir istasyon seçin.',
      waterName: 'Volkan Konak Karavan Parkı’nda su',
      waterNotes: 'Park hizmet veriyorsa su dolum imkânını kullanın.',
      dumpName: 'Volkan Konak’ta atık boşaltma',
      dumpNotes:
        'Gitmeden önce parkın açık olduğunu ve atık noktalarının kullanılabildiğini sorun.',
      warning1:
        'Haziran 2026 tarihli kaynaklar parkın açılış durumu hakkında çelişkili bilgi veriyor; yola çıkmadan arayın.',
      warning2: 'Halk plajı otoparkını karavan parkı yerine kullanmayın.',
      sunrise: 'Gün doğumunu Lara Halk Plajı’nın açık bölümünden izleyin.',
      sunset: 'Gün batımı için halka açık kıyı yürüyüş alanlarını kullanın.',
      photoAlt: 'Yumuşak Akdeniz ışığında Lara Halk Plajı',
      ops: {
        lastMile: 'Lara ve Güzeloba’ya ana şehir yollarından Ducato ile rahatça ulaşılabilir.',
        supply: 'Açıksa Volkan Konak Park su, WC, duş, pis su ve market hizmetini birleştirir.',
        decision:
          'Karavan parkının açık olduğunu doğrularsanız yolculuk sonundaki su, duş ve atık ihtiyaçları için kullanın. Lara Halk Plajı’nın sıradan otoparkında gecelemeyin.'
      }
    }
  },
  guide: {
    izmir: {
      hiddenTitle: 'Kemeraltı ve tarihî merkez',
      hiddenDescription:
        'Konak Meydanı’ndan Kemeraltı’na yürüyün; zamana ve açılış koşullarına göre Agora veya Tarihî Asansör’ü seçin.',
      beachTitle: 'Plaj değil, şehir kıyısı',
      beachDescription:
        'Kordon yürüyüş, bisiklet ve körfez manzarası içindir. Yüzme için yalnızca resmî olarak belirlenmiş alanları kullanın ve güncel su ile erişim bilgisini kontrol edin.',
      hikingTitle: 'Kordon–Konak şehir yürüyüşü',
      hikingDescription:
        'Kolay bir şehir yürüyüşü için kesintisiz kamusal kıyıyı ve merkezdeki yaya sokaklarını kullanın; bu, doğa parkuru değildir.',
      viewpointTitle: 'Tarihî Asansör terası',
      viewpointDescription:
        'Tarihî Asansörün üst terasından İzmir Körfezi ve şehir manzarası izlenebilir. Gitmeden önce ziyaret saatlerini kontrol edin.',
      seasonTitle: 'Yıl boyu esnek şehir durağı',
      seasonDescription:
        'Sabit bir mevsim yerine güncel hava durumuna göre plan yapın. Ilık ve kuru koşullar kıyı ve tarihî merkez yürüyüşü için daha uygundur.',
      wcNotes: 'Karavanlara özel halka açık bir tuvalet noktası bulunmuyor.',
      showerNotes: 'Karavan kullanıcılarına ayrılmış belediye duşu bulunmuyor.',
      electricityNotes: 'Halka açık karavan elektrik bağlantısı bulunmuyor.',
      practicalTitle: 'Şehir içi sürüş planı',
      practicalDescription:
        'Ana giriş yollarından birinde ikmali tamamlayın, Ducato’yu yasal bir yere park edin ve Konak merkezini yürüyerek veya toplu taşımayla gezin.',
      freecampPrice: 'Önerilen ücretsiz geceleme alanı yok',
      photo1Alt: 'Kordon yürüyüş yolu ve İzmir Körfezi',
      photo2Alt: 'Mavi saatte İzmir Körfezi’nden geçen vapurlar',
      photo3Alt: 'Konak’ın tarihî sokakları ve şehir ışıkları'
    },
    guzelcamli: {
      hiddenTitle: 'Dağlarla deltanın buluştuğu manzara',
      hiddenDescription:
        'Millî parkın bir yanında dağlık yarımada, diğer yanında delta ve sulak alanlar bulunuyor. Bu farklı manzaraları yalnızca ziyarete açık yollar, patikalar ve seyir noktalarından gözlemleyin.',
      beachTitle: 'Dilek Yarımadası koyları',
      beachDescription:
        'İçmeler, Aydınlık, Kavaklıburun ve Karasu parkın bilinen koylarıdır. Gitmeden önce hangilerinin ziyarete açık olduğunu kontrol edin.',
      hikingTitle: 'Dilek Yarımadası doğa rotaları',
      hikingDescription:
        'Resmî turizm bilgileri yarımadayı doğa yürüyüşü için tanımlar. Yalnızca açık ve işaretli rotaları kullanın; güncel park, yangın ve erişim kısıtlarını önce doğrulayın.',
      viewpointTitle: 'Yarımada seyir noktaları',
      viewpointDescription:
        'Kıyı ve delta manzaralarını açık yollar, işaretli patikalar ve belirlenmiş seyir noktalarından izleyin. Ziyarete kapalı doğal alanlara girmeyin.',
      seasonTitle: 'Yoğun sıcak dışında yürüyüş',
      seasonDescription:
        'İlkbahar ve sonbahar genellikle yürüyüşe, yaz ise yüzmeye daha uygundur ve kalabalık olabilir. Güncel hava ve park kuralları her zaman önceliklidir.',
      wcNotes:
        'Rezervasyonlu kampın veya parkın çalışma saatlerindeki belirlenmiş ziyaretçi tuvaletlerini kullanın; her koydaki tesisin açık olduğunu varsaymayın.',
      showerNotes:
        'Hayal Bahçesi misafirleri için sıcak duş listeleniyor. Park plaj hizmetleri karavan servis noktası değildir.',
      electricityNotes:
        'Hayal Bahçesi karavan misafirleri için elektrik listeliyor; yol kenarında umumi karavan bağlantısı yoktur.',
      practicalTitle: 'Yola çıkmadan parkı kontrol edin',
      practicalDescription:
        'Güncel saat ve kısıtlamalar için resmî DKMP kaydını inceleyin, getirdiğiniz her şeyi geri çıkarın ve kısıtlı alanların dışındaki doğrulanmış geceleme noktasına dönün.',
      freecampPrice: 'Önerilen ücretsiz geceleme alanı yok',
      photo1Alt: 'Dilek Yarımadası’nda çamlarla çevrili koy',
      photo2Alt: 'Güzelçamlı yakınında kayalık Ege kıyısı ve berrak su',
      photo3Alt: 'Dilek Yarımadası Millî Parkı’nda korunan kıyı habitatı'
    },
    bafaLake: {
      hiddenTitle: 'Athena Tapınağı ve Herakleia kalıntıları',
      hiddenDescription:
        'Kapıkırı köyü, Herakleia kalıntılarının arasında kurulmuş. Kalıntıları köyün açık yollarından yürüyerek gezin; antik taşların üzerine çıkmayın ve koruma altındaki bölümlere girmeyin.',
      beachTitle: 'Koruma altındaki göl kıyısı',
      beachDescription:
        'Bafa bir yüzme plajından çok doğal ve arkeolojik peyzajıyla öne çıkan bir göl. Kıyıya yalnızca halka açık geçişlerden ulaşın; yüzme konusunda yerel uyarılara uyun.',
      hikingTitle: 'Herakleia yürüyüşü',
      hikingDescription:
        'Kapıkırı çevresindeki kalıntıları köy yollarından yürüyerek keşfedin. Daha uzun Latmos yürüyüşleri için bölgeyi bilen bir rehberle hareket edin ve kaya resimlerinin bulunduğu hassas alanlara yaklaşmayın.',
      viewpointTitle: 'Athena Tapınağı çevresi',
      viewpointDescription:
        'Athena Tapınağı ve köy çevresindeki açık alanlardan gölü ve Latmos kaya oluşumlarını birlikte görebilirsiniz. Manzara için kalıntıların üzerine çıkmayın.',
      seasonTitle: 'Ilık yürüyüş havasını seçin',
      seasonDescription:
        'Açık arkeolojik peyzajı ılık ve istikrarlı havada gezmek daha uygundur. Uzun yürüyüşten önce sıcak, rüzgâr ve yağış durumunu kontrol edin.',
      wcNotes:
        'Tuvalet için Selenes gibi konakladığınız tesisin imkânlarını kullanın; halka açık karavan hizmet noktası yok.',
      showerNotes:
        'Duş yalnızca pansiyon veya kamp müşterilerine sunulabilir. Rezervasyon sırasında sorun.',
      electricityNotes:
        'Halka açık karavan elektrik bağlantısı yok. Enerjinizi önceden planlayın; tesiste bağlantı olup olmadığını rezervasyon sırasında sorun.',
      practicalTitle: 'Hazırlıklı gelin',
      practicalDescription:
        'Köy yoluna dönmeden suyu, büyük alışverişi ve yakıtı tamamlayın. Köy içindeki dar yolu ve yasal park seçeneğini rahatça değerlendirebilmek için gündüz varın.',
      freecampPrice: 'Önerilen ücretsiz geceleme alanı yok',
      photo1Alt: 'Latmos kaya oluşumları altındaki Bafa Gölü',
      photo2Alt: 'Kapıkırı köyü içindeki Herakleia taş kalıntıları',
      photo3Alt: 'Bafa Gölü ve granit kayalarda şafak ışığı'
    },
    faralya: {
      hiddenTitle: 'Kelebekler Vadisi üst seyir noktası',
      hiddenDescription:
        'Vadiyi Faralya’daki güvenli üst seyir alanlarından izleyin. Vadi tabanına araç yolu yok; dik patika da sıradan bir plaj yürüyüşü kadar kolay değil.',
      beachTitle: 'Kabak Koyu’na yürüyerek',
      beachDescription:
        'Ducato’yu rezervasyonlu üst alanda bırakıp Kabak’a yürüyerek veya uygun yerel transferle inin. Motokaravanı plaj yoluna kesinlikle sokmayın.',
      hikingTitle: 'Faralya–Alınca Likya Yolu',
      hikingDescription:
        'Resmî Likya Yolu etabı Faralya’dan Alınca yönüne devam eder. Rotayı açık bir doğa yürüyüşü olarak ele alın; sıcak, rüzgâr, ayakkabı ve gün ışığını önce kontrol edin.',
      viewpointTitle: 'Faralya kıyı panoraması',
      viewpointDescription:
        'Manzarayı güvenli bir işletme terasından veya işaretli halka açık seyir noktasından izleyin. Uçurum yolundaki dar kaçış ceplerinde durmayın ve gecelemeyin.',
      practicalTitle: 'Ducato’yu yukarıda bırakın',
      practicalDescription:
        'Gündüz varın, Ducato’yu önceden ayarlanmış üst alana güvenle bırakın ve dik koy inişlerine araçla girmeden kıyıyı keşfedin.'
    }
  },
  spots: {
    izmirFree: {
      title: 'İzmir’de önerilen ücretsiz geceleme alanı yok',
      overview:
        'Bu rehber İzmir’de bir şehir içi serbest kamp koordinatı önermiyor. Sahil parkını kamp alanı saymak yerine yasal ve doğrulanmış geceleme tesisi kullanın.',
      access: 'Gelmeden araç ölçülerini, park levhalarını ve geceleme iznini doğrudan kontrol edin.'
    },
    izmirPaid: {
      title: 'İnciraltı Karavan Tesisi',
      overview: 'Merkeze ulaşımı kolay, karavan ihtiyaçlarının karşılanabildiği şehir içi tesis.',
      access: 'Rezervasyonda araç uzunluğu sınırını sorun.'
    },
    guzelcamliFree: {
      title: 'Güzelçamlı’da önerilen ücretsiz geceleme alanı yok',
      overview:
        'Kısıtsız bir geceleme noktası önerilmiyor. Yanındaki millî park koruma altındadır; gündüz erişimi kamp izni anlamına gelmez.',
      access:
        'Doğrulanmış kamp veya yasal geceleme alanı kullanın; park ve belediye kurallarını yeniden kontrol edin.'
    },
    guzelcamliPaid: {
      title: 'Güzelçamlı Kamp Alanı',
      overview: 'Dilek Yarımadası’nı günübirlik gezmek için kullanılabilecek gölgeli kamp alanı.',
      access: 'Ducato için köy erişimi rahattır.'
    },
    bafaFree: {
      title: 'Bafa Gölü’nde önerilen ücretsiz geceleme alanı yok',
      overview:
        'Göl kıyısında serbest kamp koordinatı önerilmiyor. Durak korunan doğal ve arkeolojik peyzaj içindedir.',
      access:
        'İzin veya doğrulanmış tesis ayarlayın; kıyı bitkilerinden ve arkeolojik zeminden uzak durun.'
    },
    bafaPaid: {
      title: 'Kapıkırı Pansiyon Kampı',
      overview: 'Kapıkırı’da temel ihtiyaçların karşılanabildiği, işletmeye ait küçük kamp alanı.',
      access:
        'Köye girmeden önce Ducato için yeterli alan ve dönüş imkânı bulunduğunu işletmeye sorun.'
    },
    gumuslukFree: {
      title: 'Gümüşlük merkez dışında geceleme seçeneği',
      overview:
        'Sahil kalabalığından uzakta, ancak arazi sahibinden açık izin alınmadan kullanılmaması gereken olası park yeri.',
      access: 'Özel arazi yaygındır; açık izin alın.'
    },
    gumuslukPaid: {
      title: 'Gümüşlük Karavan Kampı',
      overview:
        'Gümüşlük’e yakın, su ve elektrik gibi karavan ihtiyaçlarının karşılanabildiği kamp alanı.',
      access: 'Sahil kestirmesi yerine ana girişi kullanın.'
    },
    akyarlarFree: {
      title: 'Akyarlar merkez dışında geceleme seçeneği',
      overview:
        'Plaj otoparklarından uzakta değerlendirilebilecek bir alan; geceleme izni ve zemin varışta kontrol edilmeli.',
      access: 'Levhaları kontrol edin, sert rüzgâra hazırlanın.'
    },
    akyarlarPaid: {
      title: 'Akyarlar Kıyı Kampı',
      overview: 'Yüzme koyuna yakın, karavan kabul eden kamp alanı.',
      access: 'Yükseklik ve uzunluk sınırlarını sorun.'
    },
    maziInceyali: {
      title: 'İnceyalı ücretsiz geceleme adayı',
      overview:
        'Mazı etabında doğrudan seçtiğimiz, özel işletmeye bağlı olmayan ücretsiz/wild geceleme adayı. Karavan altyapısı bulunmuyor; geceleme uygunluğu varışta kontrol edilmeli.',
      access:
        'Google Maps’te paylaşılan İnceyalı pinine hava kararmadan gidin. Son yolun genişliğini, zemini ve 15 m³ Ducato için dönüş alanını ilerlemeden önce kontrol edin.',
      safety:
        'Burası resmî kamp alanı değildir. Güncel yasak levhası veya yerel uyarı varsa kalmayın; yolu ve kıyı erişimini kapatmayın, ateş yakmayın ve tüm atığı araçta tutun.'
    },
    akbukFree: {
      title: 'Akbük üst yolunda olası geceleme alanı',
      overview:
        'Plaj şeridinin üzerindeki yolda değerlendirilebilecek bir park alanı; geceleme izni kesin değil.',
      access: 'Yalnızca yolun dışında kalan sert ve düz bir alan kullanın; geçişi kapatmayın.'
    },
    akbukPaid: {
      title: 'Akbük Koyu Kampı',
      overview: 'Gökova’nın berrak denizine yakın, işletmeye ait kamp alanı.',
      access: 'Dik yolu ve dönüş alanını sorun.'
    },
    dalyanFree: {
      title: 'Dalyan dışında olası kırsal geceleme alanı',
      overview:
        'Sazlık ve koruma altındaki plajdan uzakta değerlendirilebilecek kırsal alan; arazi izni olmadan kullanılmamalı.',
      access: 'Sulama yolları ve yumuşak tarlalardan kaçının.'
    },
    dalyanPaid: {
      title: 'Dalyan Bölgesi Kampı',
      overview:
        'Ducato’yu güvenle bırakıp Dalyan’ı daha küçük bir araçla veya yürüyerek gezmek için kullanılabilecek kamp alanı.',
      access: 'Dar nehir merkezinden kaçının.'
    },
    karaotFree: {
      title: 'Karaot Plaj Kenarı Geceleme',
      overview: 'Kumul ve sulak alan dışında sağlam zemin.',
      access: 'Koruma bariyerlerini asla geçmeyin.'
    },
    karaotPaid: {
      title: 'Karaot Ekolojik Kampı',
      overview: 'Plaja yakın, doğa odaklı çalışan kamp işletmesi.',
      access:
        'Tesisin açık olduğu tarihleri ve Ducato için yer bulunup bulunmadığını gitmeden sorun.'
    },
    faralyaFree: {
      title: 'Faralya üst köyde olası geceleme alanı',
      overview:
        'Uçurum kenarlarından uzakta değerlendirilebilecek bir dağlık alan; geceleme ve arazi izni kesin değil.',
      access: 'Kıyı yolundaki geçiş ceplerini kapatmayın.'
    },
    faralyaPaid: {
      title: 'Faralya Manzara Terası Kampı',
      overview: 'Güvenli manzara alanı bulunan, işletmeye ait uçurum üstü kamp.',
      access: 'Ducato ölçülerini önceden bildirin.'
    },
    pataraDunes: {
      title: 'Patara kum tepeleri ücretsiz geceleme adayı',
      overview:
        'Kum tepeleri ve deniz manzaralı, çamların çevrelediği tesissiz park açıklığı. Ücretsiz olarak kullanıldığına dair güncel karavan kayıtları var; resmî geceleme izni olarak değerlendirilmemeli.',
      access:
        'Gelemiş merkezinden gündüz yaklaşın. Son 2–3 km bozuk ve virajlıdır; dik kuzey kestirmeleri yerine daha yönetilebilir güney yaklaşımını kullanın.',
      safety:
        'Güncel levhalar veya kolluk uyarısı gecelemeyi yasaklıyorsa devam edin. Gece sahile ve kumullara girmeyin, ateş yakmayın, dışarıya masa veya tente açmayın.'
    },
    kasFree: {
      title: 'Kaş yaylasında olası geceleme alanı',
      overview:
        'Kıyı kalabalığından uzakta ve daha serin bir park seçeneği; yalnızca arazi sahibinin izniyle kullanılmalı.',
      access: 'Yalnızca arazi sahibinin izin verdiği sert ve düz zemini kullanın.'
    },
    kasPaid: {
      title: 'Kaş Yarımada Kampı',
      overview: 'Denize ulaşımı olan, karavan hizmetleri sunan manzaralı kamp alanı.',
      access: 'Yarımada yolu yoğun ve dardır.'
    },
    ciraliFree: {
      title: 'Çıralı üst köyde olası geceleme alanı',
      overview:
        'Kaplumbağa yuvalama sahilinden uzakta değerlendirilebilecek köy kenarı alanı; izin ve yangın kuralları kontrol edilmeli.',
      access: 'Yangın kapanışlarına ve özel araziye uyun.'
    },
    ciraliPaid: {
      title: 'Çıralı Bahçe Kampı',
      overview: 'Plaja yakın gölgeli narenciye bahçesi.',
      access: 'Bazı bahçe girişleri dardır.'
    },
    laraFree: {
      title: 'Lara merkez dışında olası geceleme alanı',
      overview:
        'Havalimanı ve yoğun sahil bölgesinden uzakta değerlendirilebilecek şehir dışı park alanı; geceleme izni kesin değil.',
      access: 'Bariyerleri ve park denetimini kontrol edin.'
    },
    laraPaid: {
      title: 'Antalya Doğu Karavan Tesisi',
      overview:
        'Yolculuk sonunda su, duş ve atık ihtiyaçlarını karşılamak için kullanılabilecek karavan tesisi.',
      access: 'Otel transfer yoğunluğundan kaçının.'
    }
  }
} satisfies TranslationShape<EnglishContent>

export default content
