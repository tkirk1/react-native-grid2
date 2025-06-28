const { execSync } = require('child_process');

try {
  console.log('Publishing @tkirk1/react-native-grid2...');
  const result = execSync('npm publish --access=public', { 
    encoding: 'utf8',
    cwd: __dirname,
    timeout: 60000
  });
  console.log('✅ SUCCESS: Package published!');
  console.log(result);
} catch (error) {
  console.log('📋 PUBLISH OUTPUT:');
  if (error.stdout) console.log(error.stdout);
  if (error.stderr) console.log('ERROR:', error.stderr);
  
  if (error.stderr && error.stderr.includes('+ @tkirk1/react-native-grid2@1.0.0')) {
    console.log('✅ Package appears to have published successfully despite error message');
  }
}