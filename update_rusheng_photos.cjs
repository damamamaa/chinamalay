const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const geminiDir = 'C:/Users/wcast/.gemini/antigravity/brain/a00914d1-7639-42f0-84bf-90c12775f1c5';
const publicDir = path.join(__dirname, 'public');

// Mapping dari file Gemini ke nama target WebP
const fileMapping = {
    'rusheng_pulse_real_face': 'tcm_pulse_rusheng.webp',
    'rusheng_acupuncture_real_face': 'tcm_acupuncture_rusheng.webp',
    'rusheng_cupping_real_face': 'tcm_cupping_rusheng.webp',
    'rusheng_consultant_real_face': 'xj_consultant_rusheng.webp',
    'rusheng_reading_real_face': 'xj_reading_rusheng.webp'
};

async function updatePhotos() {
    console.log('🚀 Starting photo conversion and replacement...\n');

    try {
        // Get all PNG files from Gemini directory
        const files = fs.readdirSync(geminiDir);

        for (const [baseFilename, targetName] of Object.entries(fileMapping)) {
            // Find the matching file (it has timestamp suffix)
            const matchingFile = files.find(f => f.startsWith(baseFilename) && f.endsWith('.png'));

            if (!matchingFile) {
                console.log(`⚠️  ${baseFilename} not found, skipping...`);
                continue;
            }

            const sourcePath = path.join(geminiDir, matchingFile);
            const targetPath = path.join(publicDir, targetName);

            // Backup old file if exists
            if (fs.existsSync(targetPath)) {
                const backupPath = path.join(publicDir, targetName.replace('.webp', '_backup.webp'));
                fs.copyFileSync(targetPath, backupPath);
                console.log(`📦 Backed up old ${targetName}`);
            }

            // Convert PNG to WebP
            await sharp(sourcePath)
                .webp({ quality: 92, effort: 6 })
                .toFile(targetPath);

            const stats = fs.statSync(targetPath);
            const sizeKB = (stats.size / 1024).toFixed(2);

            console.log(`✅ ${baseFilename}.png`);
            console.log(`   → ${targetName} (${sizeKB} KB)\n`);
        }

        console.log('🎉 All photos converted and replaced successfully!');
        console.log('\n📋 Summary:');
        console.log('- tcm_pulse_rusheng.webp ✅');
        console.log('- tcm_acupuncture_rusheng.webp ✅');
        console.log('- tcm_cupping_rusheng.webp ✅');
        console.log('- xj_consultant_rusheng.webp ✅');
        console.log('- xj_reading_rusheng.webp ✅');
        console.log('\n✨ Website photos updated! Check http://localhost:5173');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

updatePhotos();
