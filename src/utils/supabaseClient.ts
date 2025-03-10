import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Get the Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;

// Simple logging to help with debugging
console.log('🔌 Supabase connection parameters:');
console.log('• URL:', supabaseUrl ? 'Available' : '❌ MISSING');
console.log('• KEY:', supabaseKey ? 'Available' : '❌ MISSING');

// Create the Supabase client
const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Export the client
export default supabase;