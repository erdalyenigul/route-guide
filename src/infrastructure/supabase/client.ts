import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import type { Database } from './database.types'

const projectUrl = import.meta.env.VITE_SUPABASE_URL
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase: SupabaseClient<Database> | null =
  projectUrl && publishableKey
    ? createClient<Database>(projectUrl, publishableKey, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      })
    : null
