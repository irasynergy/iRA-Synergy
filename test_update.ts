import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ikmfcmdkjuqakvszrtxs.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_hrCGqsbG2FaIyrp4jvaH6A_K-3mx8Jx";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testUpdate() {
  const id = "p-1"; // Assuming this ID exists, we can fetch one first
  const { data: products } = await supabase.from("products").select("id").limit(1);
  if (!products || products.length === 0) return console.log("No products");
  
  const testId = products[0].id;
  console.log("Testing update on ID:", testId);
  
  const { error } = await supabase.from("products").update({ name: "Updated Test Name" }).eq("id", testId);
  console.log("Update Error:", error);
}

testUpdate();
