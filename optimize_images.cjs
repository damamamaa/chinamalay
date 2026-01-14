
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const MAX_WIDTH = 1500; // Limit max width to 1500px for lighter load suitable for most laptops
const QUALITY = 60; // Aggressive compression

async function optimizeImages() {
    const files = fs.readdirSync(publicDir);

    for (const file of files) {
        if (file.match(/\.(png|jpg|jpeg)$/i)) {
            const inputPath = path.join(publicDir, file);
            const webpFilename = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
            const outputPath = path.join(publicDir, webpFilename);

            try {
                const metadata = await sharp(inputPath).metadata();

                // Only resize if width is greater than MAX_WIDTH
                let pipeline = sharp(inputPath);
                if (metadata.width > MAX_WIDTH) {
                    pipeline = pipeline.resize({ width: MAX_WIDTH });
                }

                await pipeline
                    .webp({
                        quality: QUALITY,
                        effort: 6, // Max compression effort
                        smartSubsample: true
                    })
                    .toFile(outputPath);

                const newStats = fs.statSync(outputPath);
                console.log(`Optimized ${webpFilename}: ${Math.round(newStats.size / 1024)}KB`);

            } catch (err) {
                console.error(`Error processing ${file}:`, err);
            }
        }
    }
}

optimizeImages();
