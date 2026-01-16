import imageCompression from 'browser-image-compression';

/**
 * Converts an image to WebP format
 * @param {File} file - The image file to convert
 * @returns {Promise<File>} - WebP file
 */
export async function convertToWebP(file) {
    try {
        // Compression options
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            fileType: 'image/webp'
        };

        // Compress and convert
        const compressedFile = await imageCompression(file, options);

        // Create new File object with .webp extension
        const webpFileName = file.name.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
        const webpFile = new File([compressedFile], webpFileName, { type: 'image/webp' });

        return webpFile;
    } catch (error) {
        console.error('Error converting to WebP:', error);
        throw error;
    }
}

/**
 * Upload image to Supabase Storage
 * @param {File} file - The file to upload
 * @param {Object} supabase - Supabase client
 * @returns {Promise<string>} - Public URL of uploaded image
 */
export async function uploadImage(file, supabase) {
    try {
        // Convert to WebP first
        const webpFile = await convertToWebP(file);

        // Generate unique filename
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(7);
        const fileName = `${timestamp}-${randomString}.webp`;

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from('articles')
            .upload(fileName, webpFile, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('articles')
            .getPublicUrl(fileName);

        return publicUrl;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}
