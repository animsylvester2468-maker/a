import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pwkelkcyjlsvncjnfaqp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3a2Vsa2N5amxzdm5jam5mYXFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NDM0MDksImV4cCI6MjA3MzAxOTQwOX0.qbiN4_jt3H9mUYjSw-WxXNaKDDyqtqip6SdcWcgkrpk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
