# Route Guide

A mobile-first caravan travel companion built with Vue 3, TypeScript, Pinia,
Vuetify, Vue I18n, MapLibre and Supabase.

The active route follows İzmir → Güzelçamlı → Bafa Lake → Gümüşlük → Akyarlar
→ Mazı → Akbük Bay → Dalyan → Karaot Beach → Faralya → Kaş → Çıralı → Lara.

## Architecture

- Supabase is the primary data source.
- Repositories and services isolate application pages from data access.
- Local typed content is available as an automatic fallback.
- MapLibre renders OpenStreetMap Standard tiles without an API key.
- Supabase Storage holds stop covers and galleries.
- The private editor area manages stop descriptions and shared trip photos.
- Supabase synchronizes shared favorites, route progress and checklist state.
- Local Storage persists only language and theme preferences.
- Vue I18n provides English and Turkish interface content.

SQL migrations and seed data live under `supabase/`.

## Development

```sh
npm install
```

Copy `.env.example` to `.env.local` and add the required Supabase values before
starting the application.

```sh
npm run dev
```

## Basemap

Maps use OpenStreetMap Standard without an API key. These tiles are for normal
interactive viewing, subject to the
[OSM tile usage policy](https://operations.osmfoundation.org/policies/tiles/).
Keep attribution visible and browser HTTP caching enabled; do not prefetch tiles
or add them to the offline service-worker cache. Map tiles require a connection.

## Quality checks

```sh
npm run lint
npm run typecheck
npm run build
```

The generated service worker caches the application shell for offline use.
