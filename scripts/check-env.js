// filepath: scripts/check-env.js
/**
 * This script checks if the required environment variables are set correctly
 * Run it with: node scripts/check-env.js
 */

require('dotenv').config();

const REQUIRED_VARS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

console.log('\n============ Supabase Environment Check ============\n');

let allGood = true;

REQUIRED_VARS.forEach(varName => {
  const value = process.env[varName];
  
  if (!value) {
    console.error(`❌ ${varName} is not set!`);
    allGood = false;
  } else {
    // Show first few characters of the value for verification
    const displayValue = value.substring(0, 8) + '...' + value.substring(value.length - 5);
    console.log(`✅ ${varName} is set (${displayValue})`);
  }
});

console.log('\n');

if (!allGood) {
  console.error(`
❌ Some required environment variables are missing!

Please set them in your .env.local file:

NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...
SUPABASE_SERVICE_ROLE_KEY=eyJhb...

For the service role key:
1. Go to your Supabase dashboard
2. Go to Project Settings > API
3. Look for the "service_role key" (it's secret - never expose it in client-side code!)
  `);
} else {
  console.log(`
✅ All required environment variables are set!

Next steps:
1. Try the admin storage test page (/admin/storage-admin-test)
2. Run the simplified RLS policies in the Supabase SQL Editor
   (see scripts/simplified-storage-policies.sql)
3. Test regular uploads again
  `);
}

console.log('\n==================================================\n');
