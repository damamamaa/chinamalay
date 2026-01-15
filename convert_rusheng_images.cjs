const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

const filesToConvert = [
    'tcm-artistic-rusheng.png',
    'tcm_acupuncture_rusheng.png',
    'tcm_bone_setting_rusheng.png',
    'tcm_men_vitality_rusheng.png',
    'tcm_pulse_rusheng.png',
    'tcm_sports_rusheng.png',
    'tcm_women_health_rusheng.png',
    'xj_annual_rusheng.png',
    'xj_compass_rusheng.png',
    'xj_consultant_rusheng.png',
    'xj_discussion_rusheng.png',
    'xj_numerology_rusheng.png',
    'xj_reading_rusheng.png'
];

async function convert() {
    for (const file of filesToConvert) {
        const inputPath = path.join(publicDir, file);
        const outputPath = path.join(publicDir, file.replace('.png', '.webp'));

        if (fs.existsSync(inputPath)) {
            try {
                await sharp(inputPath)
                    .webp({ quality: 80 })
                    .toFile(outputPath);
                console.log(`Converted: ${file} -> ${path.basename(outputPath)}`);
            } catch (err) {
                console.error(`Error converting ${file}:`, err);
            }
        } else {
            console.warn(`File not found: ${file}`);
        }
    }
}

convert();
