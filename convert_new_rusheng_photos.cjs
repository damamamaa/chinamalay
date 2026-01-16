const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'public', 'foto baru');
const targetDir = path.join(__dirname, 'public');

// Mapping dari file baru ke nama target
const fileMapping = {
    'Gemini_Generated_Image_2y49cj2y49cj2y49 (1).png': 'tcm_pulse_rusheng.webp',
    'Gemini_Generated_Image_izfccdizfccdizfc (1).png': 'tcm_acupuncture_rusheng.webp',
    'Gemini_Generated_Image_lqj3o9lqj3o9lqj3 (1).png': 'tcm_cupping_rusheng.webp',
    'Gemini_Generated_Image_xz2gucxz2gucxz2g (1).png': 'xj_consultant_rusheng.webp',
    'Gemini_Generated_Image_z3gwiz3gwiz3gwiz (1).png': 'xj_reading_rusheng.webp'
};

async function convertAndRename() {
    console.log('🚀 Starting conversion and rename process...\n');

    const files = fs.readdirSync(sourceDir);

    for (const file of files) {
        if (file.endsWith('.png')) {
            const sourcePath = path.join(sourceDir, file);
            const targetName = fileMapping[file];

            if (!targetName) {
                console.log(`⚠️  Skipping ${file} - no mapping found`);
                continue;
            }

            const targetPath = path.join(targetDir, targetName);

            try {
                // Backup old file if exists
                if (fs.existsSync(targetPath)) {
                    const backupPath = path.join(targetDir, targetName.replace('.webp', '_old.webp'));
                    fs.copyFileSync(targetPath, backupPath);
                    console.log(`📦 Backed up old ${targetName} to ${path.basename(backupPath)}`);
                }

                // Convert PNG to WebP
                await sharp(sourcePath)
                    .webp({ quality: 90, effort: 6 })
                    .toFile(targetPath);

                const stats = fs.statSync(targetPath);
                const sizeKB = (stats.size / 1024).toFixed(2);

                console.log(`✅ Converted: ${file}`);
                console.log(`   → ${targetName} (${sizeKB} KB)\n`);

            } catch (error) {
                console.error(`❌ Error converting ${file}:`, error.message);
            }
        }
    }

    console.log('🎉 All conversions completed!');
}

convertAndRename().catch(console.error);
