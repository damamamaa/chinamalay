const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const geminiDir = 'C:/Users/wcast/.gemini/antigravity/brain/a00914d1-7639-42f0-84bf-90c12775f1c5';
const publicDir = path.join(__dirname, 'public');

// Mapping for the missing 2 photos
const fileMapping = {
    // TCM Homepage Card (Corrects the 'Compass' error)
    'tcm_artistic_orange_final': ['tcm-artistic-rusheng.webp'],

    // Xin Jian "Art of Clear Seeing" Discussion (Corrects the 'Black Shirt' error)
    'xj_discussion_orange_final': ['xj_discussion_rusheng.webp']
};

async function updateMissingPhotos() {
    console.log('🚀 Finalizing LAST 2 Photos...\n');

    try {
        const files = fs.readdirSync(geminiDir);

        for (const [baseFilename, targets] of Object.entries(fileMapping)) {
            // Find the latest generated file
            const matchingFiles = files
                .filter(f => f.startsWith(baseFilename) && f.endsWith('.png'))
                .sort((a, b) => fs.statSync(path.join(geminiDir, b)).mtimeMs - fs.statSync(path.join(geminiDir, a)).mtimeMs);

            const latestFile = matchingFiles[0];

            if (!latestFile) {
                console.log(`⚠️  SOURCE MISSING: ${baseFilename}`);
                continue;
            }

            const sourcePath = path.join(geminiDir, latestFile);

            // Process each target filename for this source
            for (const targetName of targets) {
                const targetPath = path.join(publicDir, targetName);

                // Convert and Save
                await sharp(sourcePath)
                    .webp({ quality: 90, effort: 6 })
                    .toFile(targetPath);

                const stats = fs.statSync(targetPath);
                const sizeKB = (stats.size / 1024).toFixed(2);
                console.log(`✅ INSTALLED: ${targetName} (${sizeKB} KB)`);
            }
        }

        console.log('\n🎉 ALL PHOTOS COMPLETED! Website should now be perfect.');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

updateMissingPhotos();
