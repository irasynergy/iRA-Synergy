import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase environment variables are missing. Database integrations will run on local mock fallbacks.");
}

// Fallback to placeholder dummy URL/key during build time if credentials are not configured,
// which prevents @supabase/supabase-js from throwing a validation error and crashing the build.
const dummyUrl = "https://placeholder-project-ref.supabase.co";
const dummyKey = "placeholder-anon-key";

export const supabase = createClient(
  supabaseUrl || dummyUrl,
  supabaseAnonKey || dummyKey
);
