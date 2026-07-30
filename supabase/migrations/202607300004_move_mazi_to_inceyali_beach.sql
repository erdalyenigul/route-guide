begin;

update public.stops
set latitude = 37.0020527,
    longitude = 27.7333534,
    verification_status = 'partially_verified',
    source_note = 'Destination moved from the inland Mazı road to the İnceyalı shoreline. Coastal destination confirmed by the Muğla Provincial Directorate of Culture and Tourism; exact parking and overnight permission require an arrival check.',
    last_verified_at = '2026-07-30T00:00:00+03:00',
    updated_at = now()
where slug = 'mazi';

commit;
