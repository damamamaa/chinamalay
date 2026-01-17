const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sourcePath = 'C:/Users/wcast/.gemini/antigravity/brain/a00914d1-7639-42f0-84bf-90c12775f1c5/qimen_rusheng_map_exact_1768661332156.png';
const destPath = path.join(__dirname, 'public', 'qimen_rusheng_3d.webp');

async function processImage() {
    try {
        if (fs.existsSync(sourcePath)) {
            await sharp(sourcePath)
                .webp({ quality: 90 })
                .toFile(destPath);
            console.log(`Saved NEW Qimen map image to ${destPath}`);
        } else {
            console.error('Source file not found!');
        }
    } catch (err) {
        console.error(err);
    }
}

processImage();
