// Script to test GitHub Pages compatibility
const fs = require('fs');
const path = require('path');

// Paths to check
const requiredFiles = [
  'dist/.nojekyll',
  'dist/data.json',
  'dist/index.html',
  'public/.nojekyll',
  'public/data.json',
  'src/data.json'
];

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

console.log(`${colors.blue}Starting GitHub Pages compatibility test...${colors.reset}`);
console.log(`${colors.blue}===================================${colors.reset}`);

// Check if files exist
let allFilesExist = true;
for (const filePath of requiredFiles) {
  if (fs.existsSync(filePath)) {
    console.log(`${colors.green}✓ Found: ${filePath}${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ Missing: ${filePath}${colors.reset}`);
    allFilesExist = false;
  }
}

console.log(`${colors.blue}===================================${colors.reset}`);

// Check data.json consistency
const dataJsonPaths = [
  'dist/data.json',
  'public/data.json',
  'src/data.json'
].filter(path => fs.existsSync(path));

if (dataJsonPaths.length > 1) {
  console.log(`${colors.blue}Checking data.json consistency...${colors.reset}`);
  
  // Read all data.json files
  const dataJsonContents = dataJsonPaths.map(path => {
    try {
      return {
        path,
        content: fs.readFileSync(path, 'utf8'),
        hash: require('crypto').createHash('md5').update(fs.readFileSync(path, 'utf8')).digest('hex')
      };
    } catch (err) {
      return {
        path,
        error: err.message,
        hash: 'error'
      };
    }
  });
  
  // Compare hashes
  const uniqueHashes = [...new Set(dataJsonContents.map(d => d.hash))];
  if (uniqueHashes.length === 1 && uniqueHashes[0] !== 'error') {
    console.log(`${colors.green}✓ All data.json files are identical.${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ data.json files are NOT identical!${colors.reset}`);
    dataJsonContents.forEach(d => {
      console.log(`${colors.yellow}  • ${d.path}: ${d.hash}${colors.reset}`);
    });
  }
}

console.log(`${colors.blue}===================================${colors.reset}`);

if (allFilesExist) {
  console.log(`${colors.green}GitHub Pages compatibility test passed!${colors.reset}`);
} else {
  console.log(`${colors.red}GitHub Pages compatibility test failed. Please fix the missing files.${colors.reset}`);
}
