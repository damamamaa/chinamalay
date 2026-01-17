import fs from 'fs';
import path from 'path';

// Source file (Male Patient Smile - CORRECT ONE)
const source = "C:/Users/wcast/.gemini/antigravity/brain/a00914d1-7639-42f0-84bf-90c12775f1c5/tcm_pulse_male_smile_revamp_1768647619642.png";
const target = path.join(process.cwd(), 'public', 'hero_final_fix.png');

if (fs.existsSync(source)) {
    fs.copyFileSync(source, target);
    console.log(`✅ Copied CORRECT PNG to: ${target}`);
} else {
    console.error(`❌ Source missing: ${source}`);
}
