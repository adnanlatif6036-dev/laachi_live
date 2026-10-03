
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

if (!url || !key) {
  console.error("Supabase env missing! URL:", url, "KEY exists:", !!key)
}

// fallback taake white screen na aaye
export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  key || 'placeholder-key'
)
