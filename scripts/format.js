#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('🎨 Starting safe code formatting...\n');

// Step 1: Run Prettier to format all files
console.log('📝 Running Prettier...');
try {
  execSync('npx prettier --write "src/**/*.{ts,tsx,js,jsx,json,md}"', {
    stdio: 'inherit',
  });
  console.log('✅ Prettier formatting completed\n');
} catch (error) {
  console.log('⚠️  Prettier completed with warnings\n');
}

// Step 2: Fix auto-fixable ESLint issues
console.log('🔧 Running ESLint auto-fix...');
try {
  execSync('npx eslint . --fix --ext .ts,.tsx', { stdio: 'pipe' });
  console.log('✅ ESLint auto-fix completed\n');
} catch (error) {
  console.log('⚠️  ESLint completed with some remaining issues\n');
}

console.log('🎉 Safe code formatting complete!\n');
console.log('✨ Your code is now properly formatted!\n');
console.log('💡 Run "npm run lint" to see any remaining warnings');
console.log('💡 Run "npm run build" to ensure everything still works');
console.log('💡 For more aggressive fixes, manually address lint warnings');
