import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = 'ダウンロード.png';
const outputFile = 'telescope_final.webp';
const publicDir = path.join(process.cwd(), 'public');

async function convert() {
    const inputPath = path.join(publicDir, inputFile);
    const outputPath = path.join(publicDir, outputFile);

    if (fs.existsSync(inputPath)) {
        try {
            await sharp(inputPath)
                .webp({ quality: 90 })
                .toFile(outputPath);
            console.log(`✅ Converted ${inputFile} to ${outputFile}`);
        } catch (err) {
            console.error(`❌ Error converting ${inputFile}:`, err);
        }
    } else {
        console.log(`⚠️ File not found: ${inputFile}`);
    }
}

convert();
