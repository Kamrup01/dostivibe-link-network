
/**
 * Utility functions for handling file uploads
 */

/**
 * Converts a file to a data URL for preview
 * @param file The file to convert
 */
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Validates image file type and size
 * @param file The file to validate
 * @param maxSizeMB Maximum file size in MB
 */
export const validateImageFile = (file: File, maxSizeMB = 5): { valid: boolean; message?: string } => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = maxSizeMB * 1024 * 1024; // Convert to bytes
  
  if (!validTypes.includes(file.type)) {
    return { 
      valid: false, 
      message: `Invalid file type. Please upload JPEG, PNG, GIF, or WebP images.` 
    };
  }
  
  if (file.size > maxSize) {
    return {
      valid: false,
      message: `File size exceeds ${maxSizeMB}MB limit.`
    };
  }
  
  return { valid: true };
};

/**
 * Creates a compressed version of an image file
 * @param file The image file to compress
 * @param maxWidthOrHeight Maximum width or height in pixels
 * @param quality Compression quality (0-1)
 * @returns A promise that resolves to a Blob
 */
export const compressImage = (file: File, maxWidthOrHeight = 1200, quality = 0.8): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        if (width > height && width > maxWidthOrHeight) {
          height = Math.round((height * maxWidthOrHeight) / width);
          width = maxWidthOrHeight;
        } else if (height > maxWidthOrHeight) {
          width = Math.round((width * maxWidthOrHeight) / height);
          height = maxWidthOrHeight;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Canvas to Blob conversion failed'));
            }
          },
          file.type,
          quality
        );
      };
      img.onerror = () => {
        reject(new Error('Error loading image'));
      };
    };
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
  });
};
