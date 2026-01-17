const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sourcePath = 'C:/Users/wcast/.gemini/antigravity/brain/a00914d1-7639-42f0-84bf-90c12775f1c5/xj_compass_very_smooth_1768658705941.png';
const destPath = path.join(__dirname, 'public', 'xj_compass_rusheng_smooth.webp');

async function processImage() {
    try {
        if (fs.existsSync(sourcePath)) {
            await sharp(sourcePath)
                .webp({ quality: 85 })
                .toFile(destPath);
            console.log(`Saved VERY smooth compass image to ${destPath}`);
        } else {
            console.error('Source file not found!');
        }
    } catch (err) {
        console.error(err);
    }
}

processImage();
