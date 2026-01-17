const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sourcePath = path.join(__dirname, 'public', 'new.png');
const destPath = path.join(__dirname, 'public', 'qimen_rusheng_3d.webp');

async function processImage() {
    try {
        if (fs.existsSync(sourcePath)) {
            await sharp(sourcePath)
                .webp({ quality: 90 })
                .toFile(destPath);
            console.log(`Successfully converted new.png to qimen_rusheng_3d.webp`);
        } else {
            console.error('Source file new.png not found!');
        }
    } catch (err) {
        console.error('Error converting image:', err);
    }
}

processImage();
