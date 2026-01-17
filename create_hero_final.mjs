import sharp from 'sharp';
import path from 'path';

// EXACT source file - Male Patient Smiling with Rusheng
const source = "C:/Users/wcast/.gemini/antigravity/brain/a00914d1-7639-42f0-84bf-90c12775f1c5/tcm_pulse_male_smile_revamp_1768647619642.png";

// NEW UNIQUE filename that has NEVER been used
const target = path.join(process.cwd(), 'public', 'hero_home_final_2026.webp');

async function convert() {
    try {
        await sharp(source)
            .webp({ quality: 92 })
            .toFile(target);
        console.log(`✅ SUCCESS: Created ${target}`);
        console.log(`File size: ${(await sharp(source).metadata()).size} bytes`);
    } catch (err) {
        console.error(`❌ ERROR:`, err);
    }
}

convert();
