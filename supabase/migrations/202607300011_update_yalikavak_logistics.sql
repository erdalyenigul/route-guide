begin;

update public.stops
set latitude = 37.103811441060074,
    longitude = 27.292568122759068,
    overview_key = 'content.stops.yalikavak.overview',
    why_visit_key = 'content.stops.yalikavak.whyVisit',
    last_mile_note_key = 'content.stops.yalikavak.ops.lastMile',
    supply_note_key = 'content.stops.yalikavak.ops.supply',
    decision_summary_key = 'content.stops.yalikavak.ops.decision',
    verification_status = 'partially_verified',
    source_note = 'Easy Point Faturamatik Yalıkavak delivery coordinates were supplied by the travellers. Kadıoğlu Otopark publishes 24-hour service, a spacious parking area and a location about 100 m from the marina; acceptance and clearance for a 15 m³ Ducato must be confirmed by phone before entry.',
    last_verified_at = '2026-07-30T00:00:00+03:00'::timestamptz,
    updated_at = now()
where slug = 'yalikavak';

delete from public.activities
where stop_id = (select id from public.stops where slug = 'yalikavak')
  and activity_type in ('logistics_pickup', 'logistics_parking');

insert into public.activities (
  id,
  stop_id,
  activity_type,
  title_key,
  description_key,
  position,
  verification_status,
  source_note,
  last_verified_at
)
select data.id,
       stop.id,
       data.activity_type,
       data.title_key,
       data.description_key,
       data.position,
       data.verification_status,
       data.source_note,
       '2026-07-30T00:00:00+03:00'::timestamptz
from public.stops as stop
cross join (
  values
    (
      '79200000-0000-4000-8000-000000000101'::uuid,
      'logistics_pickup',
      'content.stops.yalikavak.activities.pickup.title',
      'content.stops.yalikavak.activities.pickup.description',
      0,
      'verified',
      'Traveller-supplied Easy Point delivery confirmation and coordinates: 37.103811441060074, 27.292568122759068.'
    ),
    (
      '79200000-0000-4000-8000-000000000102'::uuid,
      'logistics_parking',
      'content.stops.yalikavak.activities.parking.title',
      'content.stops.yalikavak.activities.parking.description',
      1,
      'partially_verified',
      'Kadıoğlu Otopark publishes 24-hour operation, spacious parking and an approximately 100 m walk to the marina. Ducato dimensions are not explicitly confirmed.'
    )
) as data(
  id,
  activity_type,
  title_key,
  description_key,
  position,
  verification_status,
  source_note
)
where stop.slug = 'yalikavak'
on conflict (id) do update
set stop_id = excluded.stop_id,
    activity_type = excluded.activity_type,
    title_key = excluded.title_key,
    description_key = excluded.description_key,
    position = excluded.position,
    verification_status = excluded.verification_status,
    source_note = excluded.source_note,
    last_verified_at = excluded.last_verified_at;

notify pgrst, 'reload schema';

commit;
