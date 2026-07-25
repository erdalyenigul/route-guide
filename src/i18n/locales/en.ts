import content from '../content/en'

export default {
  content,
  app: { name: 'Route Guide', tagline: 'Find your quiet place' },
  nav: { today: 'Today', route: 'Route', timeline: 'Route', map: 'Map', stops: 'Stops', gallery: 'Gallery', checklist: 'Checklist', favorites: 'Favorites', settings: 'Settings', back: 'Back' },
  common: {
    nights: 'nights', night: 'night', km: 'km', min: 'min', yes: 'Available', no: 'Unavailable',
    free: 'Free', recommended: 'Recommended', details: 'Detail', close: 'Close', cancel: 'Cancel', current: 'Current',
    planned: 'Planned', visited: 'Visited', skipped: 'Skipped', save: 'Save', done: 'Done',
    none: 'None', low: 'Low', medium: 'Medium', high: 'High', excellent: 'Excellent',
    caution: 'Caution', difficult: 'Difficult', good: 'Good', paid: 'Paid camp', municipality: 'Municipality', freecamp: 'Freecamp', unknown: 'Unknown', completed: 'Completed', next: 'Next', upcoming: 'Upcoming'
  },
  home: {
    greeting: 'Good evening', question: 'Where should we sleep tonight?',
    subtitle: 'A quiet cove, good access and sunset light — selected for your route.',
    tonightPick: "Tonight’s best match", routeProgress: 'Trip progress', nextUp: 'Next on the road',
    tripSummary: '{distance} km · {nights} nights · {stops} stops', exploreMap: 'Explore map',
    checklistTitle: 'Ready to leave?', checklistDescription: '{progress}% of your essentials are packed',
    title: 'Active route', currentStop: 'Current stop', nextStop: 'Next stop', todayDistance: "Today’s drive", remainingDistance: 'Remaining distance', remainingNights: 'Remaining nights',
    weather: 'Weather', weatherPlaceholder: 'Weather will appear here', quickActions: 'Quick actions', openMap: 'Open map', continueRoute: 'Continue route', openCurrentStop: 'Open current stop',
    noActiveRoute: 'No active route', noActiveRouteHint: 'Apply the Supabase migrations and seed to load the active route.', dataUnavailable: 'Trip data is unavailable', dataUnavailableHint: 'Check your connection and Supabase configuration, then try again.', retry: 'Try again',
    totalDistance: 'Total distance', completedDistance: 'Completed distance', totalNights: 'Total nights', nightsStayed: 'Nights stayed', routeChapters: 'Route chapters', planned: 'Planned', stayed: 'Stayed', actualDistance: 'Actual distance', driveTime: 'Drive time', stopId: 'ID'
  },
  trip: { activeTrip: 'Active trip', days: '8 days', stopsCount: '{count} stops', distance: 'Total distance', plannedNights: 'Planned nights' },
  stop: {
    overview: 'Overview', whyVisit: 'Why visit', stay: 'Recommended stay', nightRange: 'Stay range', conditions: 'Conditions', essentials: 'Nearby essentials',
    campOptions: 'Where to stay', photography: 'Photography', safety: 'Safety notes', markVisited: 'Mark as visited',
    stageIncomplete: 'Route not completed',
    markedVisited: 'Visited', stageComplete: 'Route complete', routeSkipped: 'Skipped', routeSkippedHint: 'This stop was not visited.', skipRoute: 'Skip', markIncomplete: 'Mark incomplete', stageCompleteHint: 'Include this stop in shared trip progress', stageCompleteEditableHint: 'Update this stop in the shared route progress.', stageCompleteReadOnlyHint: 'This shared route status is managed by an administrator.', nightsStayedValue: '{count} nights stayed', completionSummary: '{nights} nights · {distance} km driven', completeStopTitle: 'Update route status', plannedNightsValue: '{count} nights planned', actualNightsStayed: 'Actual nights stayed', actualDistanceTravelled: 'Actual distance driven', plannedDistanceValue: 'Planned distance: {count} km', completeAndSave: 'Complete and save', editCompletion: 'Edit trip details', favorite: 'Add to favorites', unfavorite: 'Remove from favorites', fromPrevious: 'from previous stop', stopNavigation: 'Move between route stops', previousStop: 'Previous', nextStop: 'Next', previousStopNamed: 'Previous stop: {stop}', nextStopNamed: 'Next stop: {stop}',
    water: 'Water refill', dumpStation: 'Dump station', shower: 'Shower', wc: 'WC', wasteBins: 'Waste bins', municipality: 'Municipality facilities', market: 'Market', fuel: 'Fuel',
    internet: 'Internet', mobileCoverage: 'Mobile coverage', roadSafety: 'Road safety', ducatoAccess: 'Ducato access',
    seaScore: 'Sea score', silenceScore: 'Silence score', safetyScore: 'Safety score', solar: 'Solar', shade: 'Shade', crowd: 'Crowd', sunrise: 'Best sunrise', sunset: 'Best sunset', drone: 'Drone',
    camera: 'Luna Ultra recommendation', warning: 'Before you arrive', roadWarnings: 'Road warnings', tripTools: 'Explore nearby', ourNotes: 'Personal notes', ourExperience: 'Trip note', usefulLinks: 'Useful links', experienceBy: '{name} · {date}', routeOriginCompleted: 'Route origin completed', routeDestinationCompleted: 'Arrival leg completed · {distance} km', restaurants: 'Restaurants', hiddenPlaces: 'Hidden places', nearbyBeaches: 'Nearby beaches', interactiveMap: 'Stop map', noContent: 'No verified content has been added yet.', verification: 'Content verification', verificationHint: 'Operational details can change. Recheck access, parking and facilities before relying on them.', lastVerified: 'Last reviewed', sourceNote: 'Source note'
  },
  stopLinks: { travelGuide: 'Travel guide', thingsToDo: 'Things to do', beachesAndCoves: 'Beaches and coves' },
  map: { title: 'Route map', subtitle: 'All stops on the active route', currentLocation: 'Current location', legend: 'Map legend', selectedStop: 'Selected stop', mapPlaceholder: 'Interactive route preview', cityLabel: 'Route', seaLabel: 'Coast', completed: 'Completed', upcoming: 'Upcoming', viewStop: 'View stop', navigate: 'Navigate', navigationTarget: 'Navigation target', openRoute: 'View route', fitRoute: 'Fit route', collapseStopCard: 'Collapse stop card', expandStopCard: 'Expand stop card', loading: 'Loading map', loadError: 'Map could not be loaded', noCoordinates: 'No stop coordinates are available.', missingCoordinates: 'Some stops are hidden because coordinates are missing.' },
  timeline: { title: 'Route timeline', subtitle: 'Completed, current and upcoming stops', day: 'Stop {day}', drive: '{distance} km · {minutes} min drive', stay: '{nights} nights', noDriveData: 'Drive details not added' },
  stops: { title: 'All stops', subtitle: 'Every place on your current route', search: 'Search stops', empty: 'No stops match your search' },
  gallery: { title: 'Gallery', subtitle: 'Photos grouped by stop', empty: 'No photos have been added yet', photoOf: 'Photo of {stop}', photoCount: '{count} photos', openStopGallery: 'Open {stop} gallery', allGalleries: 'All stop galleries', openPhoto: 'Open photo', previous: 'Previous photo', next: 'Next photo' },
  verification: { unverified: 'Unverified', partially_verified: 'Partially verified', verified: 'Verified' },
  checklist: { title: 'Departure checklist', subtitle: 'A calm trip starts before the engine does', progress: '{done} of {total} complete', items: { water: 'Fill fresh water tank', gas: 'Check LPG level', chairs: 'Pack outdoor chairs', camera: 'Charge Luna Ultra batteries' } },
  favorites: { title: 'Saved places', subtitle: 'The places worth returning to', empty: 'No saved places yet', emptyHint: 'Tap the heart on a stop to keep it here.' },
  settings: { title: 'Settings', subtitle: 'Make Route Guide feel like yours', appearance: 'Appearance', darkMode: 'Dark mode', language: 'Language', english: 'English', turkish: 'Turkish', storage: 'Offline & sync', offlineReady: 'App shell available offline', localData: 'Favorites and trip progress sync across devices through Supabase', management: 'Management', managementTitle: 'Content management', managementSubtitle: 'Edit stop descriptions and photos.' },
  sync: { authRequired: 'Sign in to update shared favorites and trip progress.', saveError: 'Trip state could not be synchronized. Please try again.', signIn: 'Sign in' },
  admin: {
    privateWorkspace: 'Management', roleLabel: 'Admin', loginTitle: 'Admin sign in', loginSubtitle: 'Sign in to the admin panel.', loginError: 'The username or password is incorrect.', loginConnectionError: 'Could not connect to the server. Check your internet connection and try again.', username: 'Username', password: 'Password', signIn: 'Sign in', accountMenu: 'Admin account menu',
    dashboardTitle: 'Content management', dashboardSubtitle: 'Edit stop notes and photos.', signOut: 'Sign out', sharedPoolTitle: 'Content', sharedPoolDescription: 'Manage stop content.', photoCount: '{count} photos', experienceAdded: 'Note added', experienceEmpty: 'No note', tripProgress: 'Trip progress', actualTripData: 'Trip values', progressHint: 'Planned values remain unchanged. Save the actual stay and distance separately when this leg is complete.', plannedStay: 'Planned stay', plannedDistance: 'Planned distance', saveProgress: 'Save progress', progressSaved: 'Trip progress saved.', progressSaveError: 'Trip progress could not be saved.',
    stopEditorSubtitle: 'Notes and photos', viewStop: 'View stop', loadError: 'The stop content could not be loaded.', experienceSaved: 'Note saved.', saveError: 'Note could not be saved.', photosUploaded: 'Photos uploaded.', photoLimitError: 'This stop already has 10 photos, or the selection exceeds the remaining limit.', uploadError: 'Photos could not be uploaded.', coverError: 'The cover photo could not be changed.', deleteError: 'The photo could not be deleted.',
    journal: 'Description', experienceTitle: 'Notes', published: 'Published', experienceLabel: 'Description', experienceHint: 'Write your notes about this stop.', lastEditedBy: 'Last edited by {name} · {date}', sharedGallery: 'Photos', photoUploadTitle: 'Add photos', photoUploadHint: 'You can add {count} more photos.', choosePhotos: 'Choose photos', photoCaption: 'Photo caption (optional)', uploadPhotos: 'Upload', uploadCoverPhoto: 'Upload photo', currentPhotos: 'Current photos', cover: 'Cover', makeCover: 'Make cover photo', deletePhoto: 'Delete photo', noPhotos: 'No photos yet', noPhotosHint: 'Add a photo to this stop.', deleteConfirmTitle: 'Delete photo?', deleteConfirmBody: 'A deleted photo cannot be recovered.', cancel: 'Cancel'
  },
  offline: { status: 'You are offline. Saved trip data is still available.' },
  notFound: { title: 'This road ends here', description: 'The page you are looking for could not be found.', action: 'Return to tonight' },
  seed: {
    trip: { name: 'Quiet Aegean Escape', description: 'Hidden coves, pine roads and unhurried summer evenings.' },
    stops: {
      datca: { name: 'Datça Peninsula', region: 'Muğla · Datça', overview: 'A sheltered cove with clear water and a wide western horizon.', description: 'Settle beside the pines where the peninsula grows quiet. The final approach is paved, the ground is mostly level, and town essentials remain close enough without disturbing the night.', photoAlt: 'Turquoise water beside a quiet sandy cove', cameraTip: 'Use the 24 mm lens just before sunset; protect highlights on the water and keep the foreground rocks in silhouette.', safety: 'Park facing the exit and leave the narrow turnaround clear for local vehicles.', warning: 'The last 600 m is narrow. Arrive before dark and avoid the soft shoulder.' },
      akbuk: { name: 'Akbük Forest Cove', region: 'Muğla · Gökova', overview: 'A secluded pine-framed bay with excellent morning light.', description: 'A slower, wilder stop where forest meets the gulf. Facilities are limited, so arrive self-sufficient and enjoy one of the route’s quietest shorelines.', photoAlt: 'Forest-covered coast meeting the blue sea', cameraTip: 'Blue hour works best from the eastern rocks. A low tripod and two-second timer will keep the water soft.', safety: 'Keep four metres from the vegetation line and do not light fires during summer.', warning: 'The access road has tight bends and loose gravel. Long wheelbase vans should descend slowly.' },
      bozburun: { name: 'Bozburun Harbour', region: 'Muğla · Marmaris', overview: 'A peaceful boatbuilding village with sheltered water and useful facilities.', description: 'Finish the route among traditional wooden boats and calm harbour reflections. The municipality area is easy to access and makes a comfortable reset before the road home.', photoAlt: 'Camper view over mountains at golden hour', cameraTip: 'Try the 70 mm lens after sunset to compress the boats against the mountain layers.', safety: 'Use the marked overnight bays and keep the waterfront service lane open.' }
    },
    spots: {
      datcaCove: { name: 'Pine Cove Lookout', description: 'Level coastal pull-off, sunset views and a quiet night under the pines.' },
      datcaCamp: { name: 'Datça Garden Camp', description: 'Small family camp with showers, power and shaded pitches.' },
      akbuk: { name: 'Forest Edge Freecamp', description: 'Remote shore pitch with no services and exceptional morning views.' },
      bozburun: { name: 'Bozburun Municipal Area', description: 'Simple waterfront facility within walking distance of the village.' }
    }
  }
}
