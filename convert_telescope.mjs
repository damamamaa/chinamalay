import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = 'gold_telescope.png';
const publicDir = path.join(process.cwd(), 'public');

async function convert() {
    const inputPath = path.join(publicDir, file);
    if (fs.existsSync(inputPath)) {
        const outputPath = inputPath.replace('.png', '.webp');
        try {
            await sharp(inputPath)
                .webp({ quality: 90 }) // Higher quality for hero icon
                .toFile(outputPath);
            console.log(`✅ Converted ${file} to WebP`);
        } catch (err) {
            console.error(`❌ Error converting ${file}:`, err);
        }
    } else {
        console.log(`⚠️ File not found: ${file}`);
    }
}

convert();
