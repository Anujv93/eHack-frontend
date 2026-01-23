/**
 * Cloudinary Document Upload Integration
 * 
 * Handles secure file uploads for student documents including
 * photos, Aadhaar cards, and educational certificates.
 */

import { v2 as cloudinary } from 'cloudinary';

// Initialize Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
    api_key: process.env.CLOUDINARY_API_KEY || '',
    api_secret: process.env.CLOUDINARY_API_SECRET || '',
    secure: true,
});

// Allowed file types for document uploads
export const ALLOWED_FILE_TYPES = {
    image: ['image/jpeg', 'image/jpg', 'image/png'],
    document: ['application/pdf'],
    all: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'],
};

// Maximum file sizes in bytes
export const MAX_FILE_SIZES = {
    photo: 2 * 1024 * 1024, // 2MB for photos
    document: 5 * 1024 * 1024, // 5MB for documents
};

// Document types for student registration
export type DocumentType =
    | 'photo'
    | 'aadhaar_front'
    | 'aadhaar_back'
    | 'highest_qualification'
    | 'additional_document';

export interface UploadResult {
    success: boolean;
    url?: string;
    publicId?: string;
    error?: string;
}

export interface DocumentUploadOptions {
    applicationId: string;
    documentType: DocumentType;
    fileBuffer: Buffer;
    fileName: string;
    mimeType: string;
}

/**
 * Validate file before upload
 */
export function validateFile(
    mimeType: string,
    fileSize: number,
    documentType: DocumentType
): { valid: boolean; error?: string } {
    // Check file type
    const allowedTypes = documentType === 'photo'
        ? ALLOWED_FILE_TYPES.image
        : ALLOWED_FILE_TYPES.all;

    if (!allowedTypes.includes(mimeType)) {
        return {
            valid: false,
            error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}`,
        };
    }

    // Check file size
    const maxSize = documentType === 'photo'
        ? MAX_FILE_SIZES.photo
        : MAX_FILE_SIZES.document;

    if (fileSize > maxSize) {
        const maxSizeMB = maxSize / (1024 * 1024);
        return {
            valid: false,
            error: `File too large. Maximum size: ${maxSizeMB}MB`,
        };
    }

    return { valid: true };
}

/**
 * Upload document to Cloudinary
 */
export async function uploadDocument(options: DocumentUploadOptions): Promise<UploadResult> {
    const { applicationId, documentType, fileBuffer, fileName, mimeType } = options;

    // Validate file first
    const validation = validateFile(mimeType, fileBuffer.length, documentType);
    if (!validation.valid) {
        return { success: false, error: validation.error };
    }

    // Determine resource type
    const resourceType = mimeType === 'application/pdf' ? 'raw' : 'image';

    // Build folder path: students/{applicationId}/{documentType}
    const folder = `ehack/students/${applicationId}`;
    const publicId = `${folder}/${documentType}_${Date.now()}`;

    try {
        // Convert buffer to base64 data URL
        const base64Data = `data:${mimeType};base64,${fileBuffer.toString('base64')}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(base64Data, {
            public_id: publicId,
            resource_type: resourceType,
            folder: '', // Already included in public_id
            // For images, add transformations
            ...(resourceType === 'image' && {
                transformation: [
                    { quality: 'auto:good' },
                    { fetch_format: 'auto' },
                ],
            }),
            // Add tags for easy search
            tags: ['student-document', applicationId, documentType],
        });

        console.log(`Document uploaded: ${result.public_id}`);

        return {
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Upload failed',
        };
    }
}

/**
 * Delete a document from Cloudinary
 */
export async function deleteDocument(publicId: string): Promise<boolean> {
    try {
        await cloudinary.uploader.destroy(publicId);
        console.log(`Document deleted: ${publicId}`);
        return true;
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        return false;
    }
}

/**
 * Get all documents for an application
 */
export async function getApplicationDocuments(applicationId: string): Promise<{
    success: boolean;
    documents?: Array<{
        publicId: string;
        url: string;
        documentType: string;
        createdAt: string;
    }>;
    error?: string;
}> {
    try {
        const result = await cloudinary.api.resources({
            type: 'upload',
            prefix: `ehack/students/${applicationId}/`,
            max_results: 20,
        });

        const documents = result.resources.map((resource: any) => {
            // Extract document type from public_id
            const parts = resource.public_id.split('/');
            const fileName = parts[parts.length - 1];
            const documentType = fileName.split('_')[0];

            return {
                publicId: resource.public_id,
                url: resource.secure_url,
                documentType,
                createdAt: resource.created_at,
            };
        });

        return { success: true, documents };
    } catch (error) {
        console.error('Error fetching documents:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch documents',
        };
    }
}

/**
 * Generate a signed URL for temporary access
 */
export function getSignedUrl(publicId: string, expirationSeconds: number = 3600): string {
    return cloudinary.url(publicId, {
        sign_url: true,
        type: 'authenticated',
        expires_at: Math.floor(Date.now() / 1000) + expirationSeconds,
    });
}
