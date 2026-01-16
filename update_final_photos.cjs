const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const geminiDir = 'C:/Users/wcast/.gemini/antigravity/brain/a00914d1-7639-42f0-84bf-90c12775f1c5';
const publicDir = path.join(__dirname, 'public');

// Mapping UPDATED dengan foto-foto terbaru yang berhasil
const fileMapping = {
    // Batch 1 (Generate awal - Wajah OK)
    'rusheng_pulse_real_face': 'tcm_pulse_rusheng.webp',
    'rusheng_acupuncture_real_face': 'tcm_acupuncture_rusheng.webp',
    'rusheng_cupping_real_face': 'tcm_cupping_rusheng.webp',
    'rusheng_consultant_real_face': 'xj_consultant_rusheng.webp',
    'rusheng_reading_real_face': 'xj_reading_rusheng.webp',

    // Batch 2 (TCM specific - Berhasil sebelum kuota habis)
    'rusheng_sports_knee_real_face': 'tcm_sports_rusheng.webp',
    'rusheng_tcm_bone_orange': 'tcm_bone_setting_rusheng.webp'
};

async function updatePhotos() {
    console.log('🚀 Starting FINAL photo update...\n');

    try {
        const files = fs.readdirSync(geminiDir);

        for (const [baseFilename, targetName] of Object.entries(fileMapping)) {
            // Find the latest file matching the base name
            const matchingFiles = files
                .filter(f => f.startsWith(baseFilename) && f.endsWith('.png'))
                .sort((a, b) => fs.statSync(path.join(geminiDir, b)).mtimeMs - fs.statSync(path.join(geminiDir, a)).mtimeMs); // Sort by newest

            const latestFile = matchingFiles[0];

            if (!latestFile) {
                console.log(`⚠️  ${baseFilename} not found, skipping...`);
                continue;
            }

            console.log(`Processing: ${latestFile}`);
            const sourcePath = path.join(geminiDir, latestFile);
            const targetPath = path.join(publicDir, targetName);

            // Backup logic
            if (fs.existsSync(targetPath)) {
                // Only backup if we haven't already backed up the original original
                const backupPath = path.join(publicDir, targetName.replace('.webp', '_old_v3.webp'));
                if (!fs.existsSync(backupPath)) {
                    fs.copyFileSync(targetPath, backupPath);
                    console.log(`📦 Backed up to ${path.basename(backupPath)}`);
                }
            }

            // Convert
            await sharp(sourcePath)
                .webp({ quality: 95, effort: 6 }) // Max quality attempt
                .toFile(targetPath);

            console.log(`✅ INSTALLED: ${targetName}\n`);
        }

        console.log('🎉 Photos updated!');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

updatePhotos();
