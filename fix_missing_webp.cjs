const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const files = [
    'tcm-artistic.png',
    'tcm-cupping.png',
    'tcm-herbs.png',
    'tcm-pulse.png',
    'tcm.png',
    'xinjian-brand.png',
    'xj-chart.png',
    'xj-map.png',
    'xj-tea.png'
];

const publicDir = path.join(__dirname, 'public');

async function convert() {
    for (const file of files) {
        const inputPath = path.join(publicDir, file);
        const outputPath = path.join(publicDir, file.replace('.png', '.webp'));

        if (fs.existsSync(inputPath)) {
            try {
                console.log(`Converting ${file}...`);
                await sharp(inputPath)
                    .webp({ quality: 80 })
                    .toFile(outputPath);
                console.log(`✓ Created ${outputPath}`);
            } catch (err) {
                console.error(`✗ Error converting ${file}:`, err);
            }
        } else {
            console.warn(`! File not found: ${inputPath}`);
        }
    }
}

convert();
