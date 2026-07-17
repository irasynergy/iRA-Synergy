import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://ikmfcmdkjuqakvszrtxs.supabase.co", "sb_publishable_hrCGqsbG2FaIyrp4jvaH6A_K-3mx8Jx");
async function run() {
  const { data, error } = await supabase.from("products").select("*").limit(1);
  console.log("Keys:", data ? Object.keys(data[0]) : error);
}
run();
