import { createClient } from '@supabase/supabase-js';

// Securely read Supabase credentials from Vite environment variables (.env)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(
  SUPABASE_URL || 'https://placeholder.supabase.co',
  SUPABASE_ANON_KEY || 'placeholder-anon-key'
);

export const hasValidSupabaseConfig = Boolean(
  SUPABASE_URL && 
  SUPABASE_ANON_KEY && 
  !SUPABASE_URL.includes('placeholder') &&
  !SUPABASE_URL.includes('your-project')
);

/**
 * Returns the public web URL for an image from Supabase Storage bucket 'tractor-images'.
 * Falls back cleanly to local path if Supabase URL is not configured.
 */
export const getSupabaseImageUrl = (imagePath: string): string => {
  if (!imagePath) return 'images/dhan-tractor.jpg';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  const cleanName = imagePath.replace(/^images\//, '');
  if (hasValidSupabaseConfig && SUPABASE_URL) {
    return `${SUPABASE_URL}/storage/v1/object/public/tractor-images/${cleanName}`;
  }
  
  return imagePath;
};
