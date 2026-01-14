
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const files = [
    'xj_hero_strategic.png',
    'xj_philosophy_compass.png',
    'xj_services_struct.png'
];

const publicDir = path.resolve('public');

async function convert() {
    for (const file of files) {
        const inputPath = path.join(publicDir, file);
        const outputPath = path.join(publicDir, file.replace('.png', '.webp'));

        if (fs.existsSync(inputPath)) {
            try {
                await sharp(inputPath)
                    .webp({ quality: 80 })
                    .toFile(outputPath);
                console.log(`Converted ${file} to WebP`);
            } catch (err) {
                console.error(`Error converting ${file}:`, err);
            }
        } else {
            console.warn(`File not found: ${file}`);
        }
    }
}

convert();
