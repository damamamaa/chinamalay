import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Define source absolute paths (from generation output)
const sourceFemale = "C:/Users/wcast/.gemini/antigravity/brain/a00914d1-7639-42f0-84bf-90c12775f1c5/tcm_pulse_patient_smile_1768647419737.png";
const sourceMale = "C:/Users/wcast/.gemini/antigravity/brain/a00914d1-7639-42f0-84bf-90c12775f1c5/tcm_pulse_male_smile_revamp_1768647619642.png";

// Define target paths in public
const publicDir = path.join(process.cwd(), 'public');
const targetFemaleDiff = path.join(publicDir, 'tcm_pulse_new.webp'); // For Root Cause
const targetMaleDiff = path.join(publicDir, 'tcm_men_vitality_rusheng_v2.webp'); // For Men's Vitality/Root Cause alt

async function processImage(source, target) {
    if (fs.existsSync(source)) {
        try {
            await sharp(source)
                .webp({ quality: 90 })
                .toFile(target);
            console.log(`✅ Converted & Moved: ${target}`);
        } catch (err) {
            console.error(`❌ Error processing ${source}:`, err);
        }
    } else {
        console.error(`⚠️ Source not found: ${source}`);
    }
}

async function run() {
    await processImage(sourceFemale, targetFemaleDiff);
    await processImage(sourceMale, targetMaleDiff);
}

run();
