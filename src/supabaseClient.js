import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xoamvnencjjjynxvlcyj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvYW12bmVuY2pqanlueHZsY3lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1MzkzNjQsImV4cCI6MjA4NDExNTM2NH0.RhNGIkO8cm7XvqB2-xlWghrp6Vqmq4xYtfItbjjf9EA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
