import content from '../content/tr'

export default {
  content,
  app: { name: 'Route Guide', tagline: 'Sakin yerini bul' },
  nav: { today: 'Bugün', route: 'Rota', timeline: 'Rota', map: 'Harita', stops: 'Duraklar', gallery: 'Galeri', checklist: 'Kontrol listesi', favorites: 'Favoriler', settings: 'Ayarlar', back: 'Geri' },
  common: {
    nights: 'gece', night: 'gece', km: 'km', min: 'dk', yes: 'Var', no: 'Yok', free: 'Ücretsiz',
    recommended: 'Önerilen', details: 'Detay', close: 'Kapat', cancel: 'İptal', current: 'Şu an', planned: 'Planlandı',
    visited: 'Ziyaret edildi', skipped: 'Atlandı', save: 'Kaydet', done: 'Tamam', none: 'Yok', low: 'Düşük',
    medium: 'Orta', high: 'Yüksek', excellent: 'Mükemmel', caution: 'Dikkat', difficult: 'Zor', good: 'İyi',
    paid: 'Ücretli kamp', municipality: 'Belediye', freecamp: 'Ücretsiz kamp', unknown: 'Bilinmiyor', completed: 'Tamamlandı', next: 'Sıradaki', upcoming: 'Yaklaşan'
  },
  home: {
    greeting: 'İyi akşamlar', question: 'Bu gece nerede uyuyalım?',
    subtitle: 'Rotana uygun; sakin koy, rahat erişim ve gün batımı ışığı.',
    tonightPick: 'Bu gecenin en iyi seçimi', routeProgress: 'Gezi ilerlemesi', nextUp: 'Sıradaki duraklar',
    tripSummary: '{distance} km · {nights} gece · {stops} durak', exploreMap: 'Haritayı keşfet',
    checklistTitle: 'Yola hazır mısın?', checklistDescription: 'Hazırlık ilerlemesi: {progress}%',
    title: 'Aktif rota', currentStop: 'Mevcut durak', nextStop: 'Sonraki durak', todayDistance: 'Bugünkü sürüş', remainingDistance: 'Kalan mesafe', remainingNights: 'Kalan gece',
    weather: 'Hava durumu', weatherPlaceholder: 'Hava durumu burada görünecek', quickActions: 'Hızlı işlemler', openMap: 'Haritayı aç', continueRoute: 'Rotaya devam et', openCurrentStop: 'Mevcut durağı aç',
    noActiveRoute: 'Aktif rota yok', noActiveRouteHint: 'Aktif rotayı yüklemek için Supabase migration ve seed dosyalarını uygulayın.', dataUnavailable: 'Gezi verisine ulaşılamıyor', dataUnavailableHint: 'Bağlantıyı ve Supabase ayarlarını kontrol edip tekrar deneyin.', retry: 'Tekrar dene',
    totalDistance: 'Toplam mesafe', completedDistance: 'Tamamlanan mesafe', totalNights: 'Toplam gece', nightsStayed: 'Kalınan gece', routeChapters: 'Rota bölümleri', planned: 'Planlanan', stayed: 'Kalınan', actualDistance: 'Gerçek mesafe', driveTime: 'Sürüş süresi', stopId: 'ID'
  },
  trip: { activeTrip: 'Aktif gezi', days: '8 gün', stopsCount: '{count} durak', distance: 'Toplam mesafe', plannedNights: 'Planlanan gece' },
  stop: {
    overview: 'Genel bakış', whyVisit: 'Neden ziyaret edilmeli', stay: 'Önerilen konaklama', nightRange: 'Konaklama aralığı', conditions: 'Koşullar', essentials: 'Yakındaki ihtiyaçlar', campOptions: 'Nerede kalınır',
    photography: 'Fotoğraf', safety: 'Güvenlik notları', markVisited: 'Ziyaret edildi işaretle', markedVisited: 'Ziyaret edildi', stageComplete: 'Etap tamamlandı', stageCompleteHint: 'Bu durağı ortak rota ilerlemesine dahil et', stageCompleteEditableHint: 'Bu durağın ortak rota ilerleme durumunu güncelle.', stageCompleteReadOnlyHint: 'Bu ortak rota durumu yönetici tarafından güncellenir.', nightsStayedValue: '{count} gece kalındı', completionSummary: '{nights} gece · {distance} km sürüldü', completeStopTitle: 'Etap tamamla', plannedNightsValue: '{count} gece planlandı', actualNightsStayed: 'Gerçek kalınan gece', actualDistanceTravelled: 'Gerçek yapılan mesafe', plannedDistanceValue: 'Planlanan mesafe: {count} km', completeAndSave: 'Tamamla ve kaydet', editCompletion: 'Gezi bilgilerini düzenle',
    favorite: 'Favorilere ekle', unfavorite: 'Favorilerden çıkar', fromPrevious: 'önceki duraktan', stopNavigation: 'Rota durakları arasında geçiş', previousStop: 'Önceki', nextStop: 'Sonraki', previousStopNamed: 'Önceki durak: {stop}', nextStopNamed: 'Sonraki durak: {stop}', water: 'Su dolumu',
    dumpStation: 'Atık boşaltma', shower: 'Duş', wc: 'WC', wasteBins: 'Çöp kutuları', municipality: 'Belediye tesisleri', market: 'Market', fuel: 'Yakıt', internet: 'İnternet',
    mobileCoverage: 'Mobil kapsama', roadSafety: 'Yol güvenliği', ducatoAccess: 'Ducato erişimi', solar: 'Güneş',
    seaScore: 'Deniz puanı', silenceScore: 'Sessizlik puanı', safetyScore: 'Güvenlik puanı', shade: 'Gölge', crowd: 'Kalabalık', sunrise: 'En iyi gün doğumu', sunset: 'En iyi gün batımı', drone: 'Drone',
    camera: 'Luna Ultra önerisi', warning: 'Varmadan önce', roadWarnings: 'Yol uyarıları', tripTools: 'Yakını keşfet', ourNotes: 'Kişisel notlar', ourExperience: 'Gezi notu', experienceMissingLanguage: 'Bu dilde henüz bir gezi notu bulunmuyor.', experienceBy: '{name} · {date}', routeOriginCompleted: 'Rota başlangıcı tamamlandı', routeDestinationCompleted: 'Varış etabı tamamlandı · {distance} km', restaurants: 'Restoranlar', hiddenPlaces: 'Gizli yerler', nearbyBeaches: 'Yakındaki plajlar', interactiveMap: 'Durak haritası', noContent: 'Henüz doğrulanmış içerik eklenmedi.', verification: 'İçerik doğrulama', verificationHint: 'Operasyonel bilgiler değişebilir. Erişim, park ve tesisleri kullanmadan önce yeniden kontrol edin.', lastVerified: 'Son inceleme', sourceNote: 'Kaynak notu'
  },
  map: { title: 'Rota haritası', subtitle: 'Aktif rotadaki tüm duraklar', currentLocation: 'Mevcut konum', legend: 'Harita açıklaması', selectedStop: 'Seçili durak', mapPlaceholder: 'Etkileşimli rota önizlemesi', cityLabel: 'Rota', seaLabel: 'Kıyı', completed: 'Tamamlandı', upcoming: 'Sıradaki', viewStop: 'Durağı aç', navigate: 'Yol tarifi', openRoute: 'Rotayı görüntüle', fitRoute: 'Rotayı sığdır', collapseStopCard: 'Durak kartını kapat', expandStopCard: 'Durak kartını aç', loading: 'Harita yükleniyor', loadError: 'Harita yüklenemedi', noCoordinates: 'Durak koordinatı bulunmuyor.', missingCoordinates: 'Koordinatı eksik bazı duraklar haritada gösterilmiyor.' },
  timeline: { title: 'Rota akışı', subtitle: 'Tamamlanan, mevcut ve sıradaki duraklar', day: '{day}. durak', drive: '{distance} km · {minutes} dk sürüş', stay: '{nights} gece', noDriveData: 'Sürüş bilgisi eklenmedi' },
  stops: { title: 'Tüm duraklar', subtitle: 'Mevcut rotandaki tüm yerler', search: 'Duraklarda ara', empty: 'Aramana uygun durak bulunamadı' },
  gallery: { title: 'Galeri', subtitle: 'Duraklara göre gruplandırılmış fotoğraflar', empty: 'Henüz fotoğraf eklenmedi', photoOf: '{stop} fotoğrafı', photoCount: '{count} fotoğraf', openStopGallery: '{stop} galerisini aç', allGalleries: 'Tüm durak galerileri', openPhoto: 'Fotoğrafı aç', previous: 'Önceki fotoğraf', next: 'Sonraki fotoğraf' },
  verification: { unverified: 'Doğrulanmadı', partially_verified: 'Kısmen doğrulandı', verified: 'Doğrulandı' },
  checklist: { title: 'Yola çıkış listesi', subtitle: 'Sakin bir yolculuk motor çalışmadan başlar', progress: '{total} maddeden {done} tanesi tamam', items: { water: 'Temiz su tankını doldur', gas: 'LPG seviyesini kontrol et', chairs: 'Kamp sandalyelerini yükle', camera: 'Luna Ultra bataryalarını şarj et' } },
  favorites: { title: 'Kaydedilen yerler', subtitle: 'Dönmeye değer yerler', empty: 'Henüz kayıtlı yer yok', emptyHint: 'Bir durağı burada tutmak için kalbe dokun.' },
  settings: { title: 'Ayarlar', subtitle: 'Route Guide sana uyum sağlasın', appearance: 'Görünüm', darkMode: 'Karanlık mod', language: 'Dil', english: 'İngilizce', turkish: 'Türkçe', storage: 'Çevrimdışı ve senkronizasyon', offlineReady: 'Uygulama kabuğu çevrimdışı kullanılabilir', localData: 'Favoriler ve rota ilerlemesi Supabase ile cihazlar arasında eşitlenir', management: 'Yönetim', managementTitle: 'İçerik yönetimi', managementSubtitle: 'Durak açıklamalarını ve fotoğraflarını düzenle.' },
  sync: { authRequired: 'Ortak favorileri ve rota ilerlemesini değiştirmek için giriş yap.', saveError: 'Rota durumu eşitlenemedi. Lütfen tekrar dene.', signIn: 'Giriş yap' },
  admin: {
    privateWorkspace: 'Yönetim', loginTitle: 'Admin girişi', loginSubtitle: 'Yönetim paneline giriş yap.', loginError: 'Kullanıcı adı veya parola yanlış.', username: 'Kullanıcı adı', password: 'Parola', signIn: 'Giriş yap', accountMenu: 'Admin hesap menüsü',
    dashboardTitle: 'İçerik yönetimi', dashboardSubtitle: 'Durak açıklamalarını ve fotoğraflarını düzenleyin.', signOut: 'Çıkış yap', sharedPoolTitle: 'İçerik', sharedPoolDescription: 'Durak içeriklerini yönetin.', photoCount: '{count} fotoğraf', experienceAdded: 'Açıklama var', experienceEmpty: 'Açıklama yok', tripProgress: 'Gezi ilerlemesi', actualTripData: 'Gezi değerleri', languageDrafts: 'Türkçe ve İngilizce açıklamalar', progressHint: 'Planlanan değerler değişmeden kalır. Etap tamamlandığında gerçek konaklama ve mesafeyi ayrıca kaydedin.', plannedStay: 'Planlanan konaklama', plannedDistance: 'Planlanan mesafe', saveProgress: 'İlerlemeyi kaydet', progressSaved: 'Gezi ilerlemesi kaydedildi.', progressSaveError: 'Gezi ilerlemesi kaydedilemedi.',
    stopEditorSubtitle: 'Açıklama ve fotoğraflar', viewStop: 'Durağı görüntüle', loadError: 'Durak içeriği yüklenemedi.', experienceSaved: 'Türkçe ve İngilizce notlar kaydedildi.', saveError: 'Notlar kaydedilemedi.', photosUploaded: 'Fotoğraflar yüklendi.', photoLimitError: 'Bu durakta zaten 10 fotoğraf var veya seçiminiz kalan sınırı aşıyor.', uploadError: 'Fotoğraflar yüklenemedi.', coverError: 'Kapak fotoğrafı değiştirilemedi.', deleteError: 'Fotoğraf silinemedi.',
    journal: 'Açıklama', experienceTitle: 'Notlar', published: 'Yayında', experienceLabel: 'Açıklama', experienceHint: 'Bu durakla ilgili notlarınızı yazın.', lastEditedBy: 'Son düzenleyen: {name} · {date}', sharedGallery: 'Fotoğraflar', photoUploadTitle: 'Fotoğraf ekle', photoUploadHint: '{count} fotoğraf daha ekleyebilirsiniz.', choosePhotos: 'Fotoğraf seç', photoCaption: 'Fotoğraf açıklaması (isteğe bağlı)', uploadPhotos: 'Yükle', uploadCoverPhoto: 'Fotoğraf yükle', currentPhotos: 'Mevcut fotoğraflar', cover: 'Kapak', makeCover: 'Kapak fotoğrafı yap', deletePhoto: 'Fotoğrafı sil', noPhotos: 'Henüz fotoğraf yok', noPhotosHint: 'Bu durağa fotoğraf ekleyin.', deleteConfirmTitle: 'Fotoğraf silinsin mi?', deleteConfirmBody: 'Silinen fotoğraf geri getirilemez.', cancel: 'Vazgeç'
  },
  offline: { status: 'Çevrimdışısın. Kaydedilmiş gezi verilerin hâlâ kullanılabilir.' },
  notFound: { title: 'Bu yol burada bitiyor', description: 'Aradığın sayfa bulunamadı.', action: 'Bu geceye dön' },
  seed: {
    trip: { name: 'Sakin Ege Kaçamağı', description: 'Gizli koylar, çam yolları ve telaşsız yaz akşamları.' },
    stops: {
      datca: { name: 'Datça Yarımadası', region: 'Muğla · Datça', overview: 'Berrak suyu ve geniş batı ufkuyla korunaklı bir koy.', description: 'Yarımadanın sessizleştiği çamların yanına yerleş. Son yaklaşım asfalt, zemin çoğunlukla düz ve ilçe ihtiyaçları geceyi bozmayacak kadar yakın.', photoAlt: 'Sakin kumlu koyun yanında turkuaz su', cameraTip: 'Gün batımından hemen önce 24 mm lens kullan; sudaki parlak alanları koru ve öndeki kayaları silüette bırak.', safety: 'Aracı çıkış yönüne park et ve dar dönüş alanını yerel araçlara açık bırak.', warning: 'Son 600 metre dar. Karanlık olmadan var ve yumuşak bankete çıkma.' },
      akbuk: { name: 'Akbük Orman Koyu', region: 'Muğla · Gökova', overview: 'Mükemmel sabah ışığına sahip, çamlarla çevrili tenha bir koy.', description: 'Ormanın körfezle buluştuğu daha yavaş, daha vahşi bir durak. İmkânlar sınırlı; hazırlıklı gel ve rotanın en sakin kıyılarından birinin tadını çıkar.', photoAlt: 'Mavi denizle buluşan orman kaplı kıyı', cameraTip: 'Mavi saat için doğu kayaları en iyisi. Alçak tripod ve iki saniyelik zamanlayıcı suyu yumuşatır.', safety: 'Bitki çizgisinden dört metre uzakta kal ve yaz aylarında ateş yakma.', warning: 'Erişim yolunda keskin virajlar ve gevşek çakıl var. Uzun şasili araçlar yavaş inmeli.' },
      bozburun: { name: 'Bozburun Limanı', region: 'Muğla · Marmaris', overview: 'Korunaklı suyu ve kullanışlı tesisleriyle huzurlu bir tekne yapım köyü.', description: 'Rotayı geleneksel ahşap tekneler ve sakin liman yansımaları arasında bitir. Belediye alanına erişim kolay ve eve dönüşten önce konforlu bir yenilenme sunuyor.', photoAlt: 'Altın saatte dağlara bakan karavan manzarası', cameraTip: 'Gün batımından sonra tekneleri dağ katmanlarıyla sıkıştırmak için 70 mm lensi dene.', safety: 'İşaretli geceleme alanlarını kullan ve kıyı servis yolunu açık bırak.' }
    },
    spots: {
      datcaCove: { name: 'Çam Koyu Seyir Noktası', description: 'Düz kıyı cebi, gün batımı manzarası ve çamlar altında sakin bir gece.' },
      datcaCamp: { name: 'Datça Bahçe Kampı', description: 'Duş, elektrik ve gölgeli alanları olan küçük aile kampı.' },
      akbuk: { name: 'Orman Kenarı Ücretsiz Kamp', description: 'Hizmet bulunmayan, olağanüstü sabah manzaralı uzak kıyı alanı.' },
      bozburun: { name: 'Bozburun Belediye Alanı', description: 'Köye yürüme mesafesinde sade bir kıyı tesisi.' }
    }
  }
}
