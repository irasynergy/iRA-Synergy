import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ikmfcmdkjuqakvszrtxs.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_hrCGqsbG2FaIyrp4jvaH6A_K-3mx8Jx";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkDb() {
  const { data: products, error } = await supabase.from("products").select("id, name, short_description").order("created_at", { ascending: false }).limit(10);
  console.log("Error:", error);
  console.log("Recent Products:", products);
}

checkDb();
