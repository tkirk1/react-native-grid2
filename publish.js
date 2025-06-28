#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('Publishing react-native-grid2 to npm...');

const publish = spawn('npm', ['publish'], {
  stdio: 'inherit',
  cwd: __dirname
});

publish.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Package published successfully!');
  } else {
    console.log(`❌ Publish failed with exit code ${code}`);
  }
  process.exit(code);
});

publish.on('error', (err) => {
  console.error('❌ Error during publish:', err.message);
  process.exit(1);
});