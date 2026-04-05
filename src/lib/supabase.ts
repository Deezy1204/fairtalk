import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://czlddiilsypryitewehq.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_5yZM1ZkT7SBRqsSHXkBM5Q_HR7C7cCT";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
