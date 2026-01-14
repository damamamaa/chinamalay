const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'public');

// Helper to get all files recursively
const getAllFiles = function (dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath)
    arrayOfFiles = arrayOfFiles || []

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file))
        }
    })

    return arrayOfFiles
}

const convertImages = async () => {
    try {
        const files = getAllFiles(directoryPath);

        for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            const filename = path.basename(file, ext);
            const dir = path.dirname(file);

            if (['.png', '.jpg', '.jpeg'].includes(ext)) {
                const outputPath = path.join(dir, `${filename}.webp`);

                console.log(`Converting: ${file} -> ${outputPath}`);

                await sharp(file)
                    .webp({ quality: 80, effort: 6 }) // High quality conversion
                    .toFile(outputPath);
            }
        }
        console.log("All images converted to WebP successfully!");
    } catch (error) {
        console.error("Error converting images:", error);
    }
};

convertImages();
