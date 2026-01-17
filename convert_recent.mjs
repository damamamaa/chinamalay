import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = ['tcm_pulse_new.png', 'rusheng_compass_v2.png'];
const publicDir = path.join(process.cwd(), 'public');

async function convert() {
    console.log("Starting conversion...");
    for (const file of files) {
        const inputPath = path.join(publicDir, file);
        if (fs.existsSync(inputPath)) {
            const outputPath = inputPath.replace('.png', '.webp');
            try {
                await sharp(inputPath)
                    .webp({ quality: 80 })
                    .toFile(outputPath);
                console.log(`✅ Converted ${file} to WebP`);
                // Optional: Remove original png if needed, but safe to keep for now
            } catch (err) {
                console.error(`❌ Error converting ${file}:`, err);
            }
        } else {
            console.log(`⚠️ File not found: ${file}`);
        }
    }
}

convert();
