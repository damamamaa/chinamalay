const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'public', 'tcm_acupuncture_rusheng_v2.png');
const outputFile = path.join(__dirname, 'public', 'tcm_acupuncture_rusheng_v2.webp');

async function convert() {
    try {
        if (fs.existsSync(inputFile)) {
            console.log(`Converting ${inputFile} to WebP...`);
            await sharp(inputFile)
                .webp({ quality: 80 })
                .toFile(outputFile);
            console.log(`Successfully created ${outputFile}`);
        } else {
            console.error(`Input file not found: ${inputFile}`);
        }
    } catch (err) {
        console.error('Error converting image:', err);
    }
}

convert();
