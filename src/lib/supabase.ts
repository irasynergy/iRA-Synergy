import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase environment variables are missing. Database integrations will run on local mock fallbacks.");
}

// Fallback to placeholder dummy URL/key during build time if credentials are not configured,
// which prevents @supabase/supabase-js from throwing a validation error and crashing the build.
const dummyUrl = "https://placeholder-project-ref.supabase.co";
const dummyKey = "placeholder-anon-key";

export const supabase = createClient(
  supabaseUrl || dummyUrl,
  supabaseAnonKey || dummyKey,
  {
    global: {
      fetch: (url, options) => {
        // Generous timeout to allow Supabase to respond on the server,
        // ensuring we fetch all database items rather than falling back to static lists.
        const timeoutMs = 15000;
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeoutMs);
        return fetch(url, { ...options, cache: "no-store", signal: controller.signal })
          .catch((err) => {
            if (err.name === 'AbortError') {
              console.warn(`Supabase fetch aborted due to ${timeoutMs}ms timeout.`);
              return new Response(JSON.stringify({ message: "Request timed out", code: "504" }), {
                status: 504,
                headers: { 'Content-Type': 'application/json' }
              });
            }
            throw err;
          })
          .finally(() => clearTimeout(id));
      },
    },
  }
);
