// File validation utilities for admin system

// Maximum file sizes (in bytes)
export const MAX_FILE_SIZES = {
  image: 10 * 1024 * 1024, // 10MB
  video: 100 * 1024 * 1024 // 100MB
}

// Allowed file types
export const ALLOWED_TYPES = {
  image: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  video: ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/quicktime']
}

/**
 * Validate if file type is allowed
 * @param {File} file - The file to validate
 * @returns {boolean} - True if file type is allowed
 */
export const isAllowedFileType = (file) => {
  const allAllowedTypes = [...ALLOWED_TYPES.image, ...ALLOWED_TYPES.video]
  return allAllowedTypes.includes(file.type)
}

/**
 * Validate if file size is within limits
 * @param {File} file - The file to validate
 * @returns {boolean} - True if file size is within limits
 */
export const isValidFileSize = (file) => {
  const fileType = file.type.startsWith('image/') ? 'image' : 'video'
  return file.size <= MAX_FILE_SIZES[fileType]
}

/**
 * Get file type (image or video) from mime type
 * @param {string} mimeType - The file's mime type
 * @returns {string} - 'image' or 'video'
 */
export const getFileType = (mimeType) => {
  return mimeType.startsWith('image/') ? 'image' : 'video'
}

/**
 * Generate unique filename with timestamp and random suffix
 * @param {string} originalName - Original filename
 * @returns {string} - Unique filename
 */
export const generateUniqueFilename = (originalName) => {
  const extension = originalName.split('.').pop()
  const timestamp = Date.now()
  const randomSuffix = Math.random().toString(36).substring(2, 8)
  return `${timestamp}_${randomSuffix}.${extension}`
}

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Validate file for upload
 * @param {File} file - The file to validate
 * @returns {Object} - Validation result with success boolean and error message
 */
export const validateFile = (file) => {
  if (!file) {
    return { success: false, error: 'No file provided' }
  }

  if (!isAllowedFileType(file)) {
    return { 
      success: false, 
      error: 'File type not allowed. Please upload images (JPEG, PNG, GIF, WebP) or videos (MP4, AVI, MOV, WMV)' 
    }
  }

  if (!isValidFileSize(file)) {
    const fileType = getFileType(file.type)
    const maxSize = formatFileSize(MAX_FILE_SIZES[fileType])
    return { 
      success: false, 
      error: `File size too large. Maximum allowed size for ${fileType}s is ${maxSize}` 
    }
  }

  return { success: true, error: null }
}

/**
 * Validate multiple files for batch upload
 * @param {File[]} files - Array of files to validate
 * @returns {Object} - Validation result with valid files and errors
 */
export const validateFiles = (files) => {
  const validFiles = []
  const errors = []

  files.forEach((file, index) => {
    const validation = validateFile(file)
    if (validation.success) {
      validFiles.push(file)
    } else {
      errors.push(`File ${index + 1} (${file.name}): ${validation.error}`)
    }
  })

  return {
    validFiles,
    errors,
    hasErrors: errors.length > 0
  }
}