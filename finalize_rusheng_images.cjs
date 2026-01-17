const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const geminiDir = 'C:/Users/wcast/.gemini/antigravity/brain/a00914d1-7639-42f0-84bf-90c12775f1c5';
const publicDir = path.join(__dirname, 'public');

// Mapping FINAL SANGAT LENGKAP
const fileMapping = {
    // TCM 1: Sports
    'tcm1_sports_orange_final': ['tcm_sports_rusheng.webp'],

    // TCM 2: Bone Setting (Replace placeholder)
    'tcm2_bone_orange_final': ['tcm_bone_setting_rusheng.webp'],

    // TCM 3: Pain Management (Update both v2 and standard to be safe)
    'tcm3_pain_orange_final': ['tcm_acupuncture_rusheng.webp', 'tcm_acupuncture_rusheng_v2.webp'],

    // TCM 4: Women
    'tcm4_women_orange_final': ['tcm_women_health_rusheng.webp', 'tcm_women_health_rusheng_v2.webp'],

    // TCM 5: Men
    'tcm5_men_orange_final': ['tcm_men_vitality_rusheng.webp', 'tcm_men_vitality_rusheng_v2.webp'],

    // XJ 1: Numerology
    'xj1_numerology_orange_final': ['xj_numerology_rusheng.webp'],

    // XJ 4: Feng Shui
    'xj4_fengshui_orange_final': ['xj_compass_rusheng.webp'],

    // XJ 5: Annual
    'xj5_annual_orange_final': ['xj_annual_rusheng.webp']
};

async function updatePhotos() {
    console.log('🚀 Starting ULTIMATE photo update sequence...\n');

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
                console.log(`✅ INSTALLED: ${targetName} (${sizeKB} KB) from ${latestFile}`);
            }
        }

        console.log('\n🎉 ALL 8 PHOTOS UPDATED SUCCESSFULLY!');
        console.log('Check website for verify.');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

updatePhotos();
