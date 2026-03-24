import { NextRequest, NextResponse } from 'next/server';
import { uploadDocument, validateFile, DocumentType, ALLOWED_FILE_TYPES } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const file = formData.get('file') as File | null;
        const applicationId = formData.get('applicationId') as string | null;
        const documentType = formData.get('documentType') as DocumentType | null;

        // Validate required fields
        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        if (!applicationId) {
            return NextResponse.json(
                { error: 'Application ID is required' },
                { status: 400 }
            );
        }

        if (!documentType) {
            return NextResponse.json(
                { error: 'Document type is required' },
                { status: 400 }
            );
        }

        // Validate document type
        const validDocumentTypes: DocumentType[] = [
            'photo',
            'aadhaar_front',
            'aadhaar_back',
            'highest_qualification',
            'additional_document',
        ];

        if (!validDocumentTypes.includes(documentType)) {
            return NextResponse.json(
                { error: `Invalid document type. Must be one of: ${validDocumentTypes.join(', ')}` },
                { status: 400 }
            );
        }

        // Validate file
        const validation = validateFile(file.type, file.size, documentType);
        if (!validation.valid) {
            return NextResponse.json(
                { error: validation.error },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const fileBuffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary
        const result = await uploadDocument({
            applicationId,
            documentType,
            fileBuffer,
            fileName: file.name,
            mimeType: file.type,
        });

        if (!result.success) {
            return NextResponse.json(
                { error: result.error || 'Upload failed' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            url: result.url,
            publicId: result.publicId,
            documentType,
            fileName: file.name,
        });
    } catch (error) {
        console.error('Error in upload API:', error);
        return NextResponse.json(
            { error: 'File upload failed' },
            { status: 500 }
        );
    }
}

// GET endpoint to retrieve documents for an application
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const applicationId = searchParams.get('applicationId');

    if (!applicationId) {
        return NextResponse.json(
            { error: 'Application ID is required' },
            { status: 400 }
        );
    }

    try {
        // Import dynamically to avoid circular dependency
        const { getApplicationDocuments } = await import('@/lib/cloudinary');
        const result = await getApplicationDocuments(applicationId);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            documents: result.documents,
        });
    } catch (error) {
        console.error('Error fetching documents:', error);
        return NextResponse.json(
            { error: 'Failed to fetch documents' },
            { status: 500 }
        );
    }
}
