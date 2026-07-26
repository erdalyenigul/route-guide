export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

type VerificationColumns = { verification_status: string; source_note: string | null; last_verified_at: string | null }

export type RouteRow = {
  id: string; slug: string; title_key: string; description_key: string; start_date: string; end_date: string; status: string; total_distance_km: number; created_at: string; updated_at: string
}
export type StopRow = VerificationColumns & {
  id: string; slug: string; content_key: string; title_key: string; region_key: string; overview_key: string; why_visit_key: string; latitude: number | null; longitude: number | null; sea_score: number | null; silence_score: number | null; internet_score: number | null; safety_score: number | null; solar_suitability: string | null; shade: string | null; crowd_level: string | null; ducato_accessibility: string | null; ducato_access: string | null; road_surface: string | null; road_width: string | null; steep_grade: boolean | null; hairpins: boolean | null; cliff_exposure: boolean | null; guardrails: boolean | null; turnaround_possible: boolean | null; last_mile_note_key: string | null; supply_note_key: string | null; decision_summary_key: string | null; drone_suitability: string | null; best_sunrise_key: string; best_sunset_key: string; created_at: string; updated_at: string
}
export type RouteStopRow = {
  id: string; route_id: string; stop_id: string; position: number; recommended_nights: number; min_nights: number; max_nights: number; driving_distance_km: number | null; drive_time_minutes: number | null; initial_status: string; created_at: string
}
export type CampingSpotRow = VerificationColumns & {
  id: string; stop_id: string; slug: string; content_key: string; title_key: string; spot_type: string; latitude: number; longitude: number; overview_key: string; price_note_key: string; access_note_key: string; rating: number; recommended: boolean; position: number; ducato_access: string | null; overnight_status: string | null; beachfront: boolean | null; sea_view: boolean | null; distance_to_sea_m: number | null; ground_surface: string | null; level_ground: boolean | null; capacity_vehicles: number | null; shade_available: boolean | null; water_available: boolean | null; toilet_available: boolean | null; shower_available: boolean | null; waste_available: boolean | null; mobile_signal: string | null; crowd_level: string | null; night_quiet: boolean | null; safety_note_key: string | null; created_at: string; updated_at: string
}
export type GalleryRow = {
  id: string; route_id: string | null; stop_id: string | null; camping_spot_id: string | null; bucket: string; storage_path: string | null; external_url: string | null; alt_key: string; position: number; is_cover: boolean; caption: string | null; uploaded_by: string | null; source_type: string; created_at: string; updated_at: string
}
export type StopExperienceRow = {
  id: string; stop_id: string; body: string; locale: string; is_published: boolean; updated_by: string | null; author_name: string | null; created_at: string; updated_at: string
}
export type ProfileRow = {
  id: string; username: string; display_name: string; is_editor: boolean; created_at: string; updated_at: string
}
export type TripStopStateRow = {
  id: string; route_id: string; stop_id: string; status: string; is_favorite: boolean; nights_stayed: number | null; actual_distance_km: number | null; updated_by: string | null; created_at: string; updated_at: string
}
export type TripChecklistStateRow = {
  id: string; route_id: string; item_id: string; completed: boolean; updated_by: string | null; created_at: string; updated_at: string
}
export type FacilityRow = VerificationColumns & {
  id: string; stop_id: string; camping_spot_id: string | null; facility_type: string; available: boolean; is_municipal: boolean; name_key: string | null; notes_key: string | null; distance_km: number | null; metadata: Json; created_at: string
}
export type ActivityRow = VerificationColumns & {
  id: string; stop_id: string; activity_type: string; title_key: string; description_key: string; position: number; created_at: string
}
export type TipRow = VerificationColumns & {
  id: string; stop_id: string; tip_type: string; subject_key: string; body_key: string; lens_key: string | null; timing_key: string | null; settings_key: string | null; position: number; created_at: string
}
export type WarningRow = VerificationColumns & {
  id: string; stop_id: string; warning_type: string; severity: string; body_key: string; position: number; created_at: string
}

type AutoColumns = 'id' | 'created_at' | 'updated_at'
type InsertRow<Row> = Omit<Row, Extract<keyof Row, AutoColumns>> & Partial<Pick<Row, Extract<keyof Row, AutoColumns>>>
type Table<Row> = { Row: Row; Insert: InsertRow<Row>; Update: Partial<InsertRow<Row>>; Relationships: [] }

export type Database = {
  public: {
    Tables: {
      routes: Table<RouteRow>
      route_stops: Table<RouteStopRow>
      stops: Table<StopRow>
      camping_spots: Table<CampingSpotRow>
      galleries: Table<GalleryRow>
      profiles: Table<ProfileRow>
      stop_experiences: Table<StopExperienceRow>
      trip_stop_states: Table<TripStopStateRow>
      trip_checklist_states: Table<TripChecklistStateRow>
      facilities: Table<FacilityRow>
      activities: Table<ActivityRow>
      tips: Table<TipRow>
      warnings: Table<WarningRow>
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}
