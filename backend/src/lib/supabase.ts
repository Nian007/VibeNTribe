import { createClient } from '@supabase/supabase-js';
import { config } from '../config';

if (!config.supabase.url || !config.supabase.serviceKey) {
  throw new Error('Supabase URL and Service Key must be provided for backend client.');
}

// This is the admin client, used for server-side operations
export const supabaseAdmin = createClient(
  config.supabase.url,
  config.supabase.serviceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
