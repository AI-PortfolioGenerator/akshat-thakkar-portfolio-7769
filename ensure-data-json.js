// Custom build script that ensures data.json is included in the build
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module equivalent for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the source data.json file
const srcDataFile = path.resolve(__dirname, 'src', 'data.json');
// Path to the destination in build output
const destDataFile = path.resolve(__dirname, 'dist', 'data.json');

async function copyDataJson() {
  try {
    // Check if source file exists
    if (fs.existsSync(srcDataFile)) {
      console.log('📂 Copying data.json to build output...');
      
      // Ensure the destination directory exists
      await fs.ensureDir(path.dirname(destDataFile));
      
      // Copy the file
      await fs.copy(srcDataFile, destDataFile);
      
      console.log('✅ Successfully copied data.json to build output');
      
      // Verify the file was copied
      if (fs.existsSync(destDataFile)) {
        const stats = fs.statSync(destDataFile);
        console.log(`✅ Verified: data.json is in build output (${stats.size} bytes)`);
        
        // Read and log the content to verify it's not empty
        const content = fs.readFileSync(destDataFile, 'utf8');
        console.log(`✅ data.json content length: ${content.length} bytes`);
      } else {
        console.error('❌ Failed to copy data.json to build output');
      }
    } else {
      console.error('❌ Source data.json not found');
    }
  } catch (error) {
    console.error('❌ Error copying data.json:', error.message);
  }
}

// Run the function
copyDataJson();
