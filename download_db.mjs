import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabase = createClient('https://ikmfcmdkjuqakvszrtxs.supabase.co', 'sb_publishable_hrCGqsbG2FaIyrp4jvaH6A_K-3mx8Jx');

async function download() {
  console.log("Fetching products from Supabase...");
  const { data: products, error } = await supabase.from('products').select('*');
  if (error) {
    console.error("Error:", error);
    return;
  }
  
  console.log(`Fetched ${products.length} products.`);
  
  const mapped = products.map((dbP) => {
    let images = dbP.images || [];
    images = images.map((img, idx) => {
      if (img && typeof img === 'string' && img.startsWith('data:image/')) {
        const matches = img.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          let ext = matches[1];
          if (ext === 'jpeg') ext = 'jpg';
          const buffer = Buffer.from(matches[2], 'base64');
          const filename = `${dbP.slug}-${idx}.${ext}`;
          const filepath = path.join(__dirname, 'public', 'images', 'generated', filename);
          fs.writeFileSync(filepath, buffer);
          return `/images/generated/${filename}`;
        }
      }
      return img;
    });

    return {
      id: dbP.id,
      slug: dbP.slug,
      name: dbP.name,
      category: dbP.category,
      description: dbP.description,
      shortDescription: dbP.short_description || "",
      features: dbP.features || [],
      specs: dbP.specs || [],
      certifications: dbP.certifications || [],
      images: images,
      price: dbP.price || "On Request",
      inStock: dbP.in_stock ?? true,
      badge: dbP.badge || undefined,
      relatedProductSlugs: dbP.related_product_slugs || [],
      brochureUrl: dbP.brochure_url || undefined,
    };
  });
  
  const outputPath = path.join(__dirname, 'src', 'data', 'products.ts');
  const fileContent = `export const products: any[] = ${JSON.stringify(mapped, null, 2)};\n
export const productCategories = ['Smart City', 'Renewable Energy', 'Waste Management', 'Public Health', 'Fitness', 'Education'];

export function getProductBySlug(slug: string) {
  return (products as any[]).find((p: any) => p.slug === slug);
}

export function getAllProductSlugs() {
  return (products as any[]).map((p: any) => p.slug);
}

export function getFeaturedProducts() {
  const featured = (products as any[]).filter((p: any) => p.badge);
  if (featured.length >= 4) {
    return featured.slice(0, 8);
  }
  return (products as any[]).slice(0, 8);
}\n`;
  
  fs.writeFileSync(outputPath, fileContent, 'utf-8');
  console.log("Successfully overwrote src/data/products.ts with Supabase data!");
}

download();
