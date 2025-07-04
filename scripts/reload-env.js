// filepath: scripts/reload-env.js
/**
 * This script reloads the environment variables and verifies they're available
 * Run it with: node scripts/reload-env.js
 */

// Force reload .env.local file
require('dotenv').config({ path: '.env.local', override: true });

console.log('\n============ Environment Variable Check ============\n');

// Check Supabase URL
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!supabaseUrl) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL is missing!');
} else {
  console.log(`✅ NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl}`);
}

// Check anon key
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!anonKey) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is missing!');
} else {
  console.log(`✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: ${anonKey.substring(0, 5)}...${anonKey.substring(anonKey.length - 5)}`);
}

// Check service role key
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!serviceKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY is missing!');
  console.log('\n⚠️ The admin upload feature requires this key to be set.');
  console.log('  1. Go to Supabase Dashboard > Project Settings > API');
  console.log('  2. Copy the "service_role" key');
  console.log('  3. Add it to your .env.local file as SUPABASE_SERVICE_ROLE_KEY=your_key');
} else {
  console.log(`✅ SUPABASE_SERVICE_ROLE_KEY: ${serviceKey.substring(0, 5)}...${serviceKey.substring(serviceKey.length - 5)}`);
}

// Check JWT format for the service role key
if (serviceKey) {
  try {
    const parts = serviceKey.split('.');
    if (parts.length !== 3) {
      console.error('⚠️ SUPABASE_SERVICE_ROLE_KEY does not appear to be a valid JWT (should have 3 parts separated by periods).');
    } else {
      console.log('✅ SUPABASE_SERVICE_ROLE_KEY appears to have valid JWT format.');
      
      // Check if it contains service_role
      try {
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
        if (payload.role === 'service_role') {
          console.log('✅ SUPABASE_SERVICE_ROLE_KEY has correct role: service_role');
        } else {
          console.error(`⚠️ SUPABASE_SERVICE_ROLE_KEY has unexpected role: ${payload.role}. Should be 'service_role'.`);
        }
      } catch (err) {
        console.error('⚠️ Could not decode JWT payload:', err.message);
      }
    }
  } catch (err) {
    console.error('⚠️ Error checking JWT format:', err.message);
  }
}

console.log('\n=========== Next Steps ===========');
console.log('1. If any key is missing, add it to your .env.local file');
console.log('2. Restart your Next.js development server');
console.log('3. Try the admin upload page again');
console.log('\nCommand to restart server:');
console.log('npm run dev # or yarn dev, pnpm dev');

console.log('\n===========================================\n');
