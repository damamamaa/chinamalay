import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Source of the CORRECT Male Smile Pulse image
const sourceFile = "C:/Users/wcast/.gemini/antigravity/brain/a00914d1-7639-42f0-84bf-90c12775f1c5/tcm_pulse_male_smile_revamp_1768647619642.png";
const targetFile = path.join(process.cwd(), 'public', 'hero_pulse_male.webp');

async function convert() {
    if (fs.existsSync(sourceFile)) {
        try {
            await sharp(sourceFile)
                .webp({ quality: 90 })
                .toFile(targetFile);
            console.log(`✅ Success! Created ${targetFile}`);
        } catch (err) {
            console.error(`❌ Error:`, err);
        }
    } else {
        console.error(`⚠️ Source file NOT FOUND: ${sourceFile}`);
    }
}

convert();
