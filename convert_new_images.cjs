const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

const filesToConvert = [
    'tcm_acupuncture_rusheng_v2.png',
    'tcm_cupping_rusheng.png',
    'tcm_men_vitality_rusheng_v2.png',
    'tcm_women_health_rusheng_v2.png'
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
