import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tkfmccwbzxcfmhblastr.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrZm1jY3dienhjZm1oYmxhc3RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMjg2OTgsImV4cCI6MjA0ODgwNDY5OH0.Buad4zVU5SVBiOgmm01zHA1UqElj9B1IfN35GmYpIVw';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
 