
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
