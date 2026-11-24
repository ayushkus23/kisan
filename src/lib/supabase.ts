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
 * Returns clean web image URL:
 * - Full https:// URLs (e.g. from cloud storage) are returned as-is
 * - Local image paths resolve directly to /images/... from public/
 */
export const getSupabaseImageUrl = (imagePath: string): string => {
  if (!imagePath) return '/images/dhan-tractor.jpg';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  const cleanName = imagePath.replace(/^\/?images\//, '');
  return `/images/${cleanName}`;
};
