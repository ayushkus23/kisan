import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Read .env manually
const envPath = path.resolve(process.cwd(), '.env');
let supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
let supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [k, ...v] = trimmed.split('=');
      const val = v.join('=').trim();
      if (k === 'VITE_SUPABASE_URL' || k === 'SUPABASE_URL') supabaseUrl = val;
      if (k === 'VITE_SUPABASE_ANON_KEY' || k === 'SUPABASE_ANON_KEY') supabaseAnonKey = val;
    }
  });
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase credentials not found in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const BUCKET_NAME = 'tractor-images';

async function uploadImages() {
  console.log(`🚀 Uploading images to Supabase Storage Bucket: "${BUCKET_NAME}"...`);
  
  // 1. Check or create bucket
  const { data: buckets, error: getBucketError } = await supabase.storage.listBuckets();
  if (getBucketError) {
    console.warn('⚠️ Could not list buckets (anon permissions):', getBucketError.message);
  } else {
    const exists = buckets.some(b => b.name === BUCKET_NAME);
    if (!exists) {
      console.log(`Creating public bucket "${BUCKET_NAME}"...`);
      const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true
      });
      if (createError) {
        console.warn('⚠️ Bucket creation notice (make sure bucket is created in Supabase Dashboard):', createError.message);
      }
    }
  }

  // 2. Read local images
  const imagesDir = path.resolve(process.cwd(), 'images');
  if (!fs.existsSync(imagesDir)) {
    console.error('❌ images/ directory not found');
    process.exit(1);
  }

  const files = fs.readdirSync(imagesDir);
  console.log(`Found ${files.length} images to upload.\n`);

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    if (fs.statSync(filePath).isFile()) {
      const fileBuffer = fs.readFileSync(filePath);
      const contentType = file.endsWith('.png') ? 'image/png' : 'image/jpeg';

      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(file, fileBuffer, {
          contentType,
          upsert: true
        });

      if (error) {
        console.warn(`⚠️ Error uploading ${file}: ${error.message}`);
      } else {
        const { data: publicData } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(file);

        console.log(`✅ Uploaded: ${file} -> ${publicData.publicUrl}`);
      }
    }
  }

  console.log('\n🎉 Finished processing images for Supabase Storage!');
}

uploadImages().catch(err => {
  console.error('Upload script error:', err);
});
