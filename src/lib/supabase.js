import { createClient } from "@supabase/supabase-js";

console.log("SUPABASE URL:", process.env.REACT_APP_SUPABASE_URL);
console.log(
  "SUPABASE KEY:",
  process.env.REACT_APP_SUPABASE_ANON_KEY ? "FOUND" : "NOT FOUND"
);

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error(
    "REACT_APP_SUPABASE_URL is missing. Check your .env file and restart the React server."
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    "REACT_APP_SUPABASE_ANON_KEY is missing. Check your .env file and restart the React server."
  );
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);