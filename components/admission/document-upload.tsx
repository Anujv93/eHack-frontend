'use client';

import { useState, useRef } from 'react';
import './document-upload.css';

interface DocumentUploadProps {
    applicationId: string;
    onUploadComplete: (documents: UploadedDocument[]) => void;
}

export interface UploadedDocument {
    documentType: string;
    url: string;
    publicId: string;
    fileName: string;
}

interface DocumentField {
    type: string;
    label: string;
    description: string;
    required: boolean;
    accept: string;
    maxSizeMB: number;
}

const DOCUMENT_FIELDS: DocumentField[] = [
    {
        type: 'photo',
        label: 'Passport Size Photo',
        description: 'Recent colored photograph with white background',
        required: true,
        accept: 'image/jpeg,image/jpg,image/png',
        maxSizeMB: 2,
    },
    {
        type: 'aadhaar_front',
        label: 'Aadhaar Card (Front)',
        description: 'Front side of your Aadhaar card',
        required: true,
        accept: 'image/jpeg,image/jpg,image/png,application/pdf',
        maxSizeMB: 5,
    },
    {
        type: 'aadhaar_back',
        label: 'Aadhaar Card (Back)',
        description: 'Back side of your Aadhaar card',
        required: true,
        accept: 'image/jpeg,image/jpg,image/png,application/pdf',
        maxSizeMB: 5,
    },
    {
        type: 'highest_qualification',
        label: 'Highest Qualification Certificate',
        description: 'Degree certificate or marksheet',
        required: true,
        accept: 'image/jpeg,image/jpg,image/png,application/pdf',
        maxSizeMB: 5,
    },
    {
        type: 'additional_document',
        label: 'Additional Document (Optional)',
        description: 'Any additional certificates or documents',
        required: false,
        accept: 'image/jpeg,image/jpg,image/png,application/pdf',
        maxSizeMB: 5,
    },
];

export default function DocumentUpload({ applicationId, onUploadComplete }: DocumentUploadProps) {
    const [uploads, setUploads] = useState<Record<string, UploadedDocument | null>>({});
    const [uploading, setUploading] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [previews, setPreviews] = useState<Record<string, string>>({});
    const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

    const handleFileSelect = async (documentType: string, file: File) => {
        const field = DOCUMENT_FIELDS.find(f => f.type === documentType);
        if (!field) return;

        // Clear previous error
        setErrors(prev => ({ ...prev, [documentType]: '' }));

        // Validate file type
        const allowedTypes = field.accept.split(',');
        if (!allowedTypes.includes(file.type)) {
            setErrors(prev => ({
                ...prev,
                [documentType]: `Invalid file type. Allowed: ${field.accept}`,
            }));
            return;
        }

        // Validate file size
        const maxBytes = field.maxSizeMB * 1024 * 1024;
        if (file.size > maxBytes) {
            setErrors(prev => ({
                ...prev,
                [documentType]: `File too large. Maximum: ${field.maxSizeMB}MB`,
            }));
            return;
        }

        // Create preview for images
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviews(prev => ({ ...prev, [documentType]: e.target?.result as string }));
            };
            reader.readAsDataURL(file);
        } else {
            // PDF preview placeholder
            setPreviews(prev => ({ ...prev, [documentType]: 'pdf' }));
        }

        // Upload file
        setUploading(prev => ({ ...prev, [documentType]: true }));

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('applicationId', applicationId);
            formData.append('documentType', documentType);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Upload failed');
            }

            const uploadedDoc: UploadedDocument = {
                documentType: result.documentType,
                url: result.url,
                publicId: result.publicId,
                fileName: result.fileName,
            };

            setUploads(prev => ({ ...prev, [documentType]: uploadedDoc }));

            // Notify parent of all uploaded documents
            const allUploads = { ...uploads, [documentType]: uploadedDoc };
            const uploadedDocs = Object.values(allUploads).filter(Boolean) as UploadedDocument[];
            onUploadComplete(uploadedDocs);
        } catch (error) {
            console.error('Upload error:', error);
            setErrors(prev => ({
                ...prev,
                [documentType]: error instanceof Error ? error.message : 'Upload failed',
            }));
            setPreviews(prev => ({ ...prev, [documentType]: '' }));
        } finally {
            setUploading(prev => ({ ...prev, [documentType]: false }));
        }
    };

    const handleDrop = (documentType: string, e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelect(documentType, file);
        }
    };

    const handleInputChange = (documentType: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(documentType, file);
        }
    };

    const removeDocument = (documentType: string) => {
        setUploads(prev => ({ ...prev, [documentType]: null }));
        setPreviews(prev => ({ ...prev, [documentType]: '' }));
        setErrors(prev => ({ ...prev, [documentType]: '' }));

        // Reset file input
        if (fileInputRefs.current[documentType]) {
            fileInputRefs.current[documentType]!.value = '';
        }

        // Notify parent
        const allUploads = { ...uploads, [documentType]: null };
        const uploadedDocs = Object.values(allUploads).filter(Boolean) as UploadedDocument[];
        onUploadComplete(uploadedDocs);
    };

    const isAllRequiredUploaded = () => {
        return DOCUMENT_FIELDS
            .filter(f => f.required)
            .every(f => uploads[f.type]);
    };

    return (
        <div className="document-upload-container">
            <div className="upload-header">
                <h3>📄 Document Upload</h3>
                <p className="upload-subtitle">
                    Please upload the following documents in JPG, PNG, or PDF format
                </p>
            </div>

            <div className="upload-grid">
                {DOCUMENT_FIELDS.map((field) => (
                    <div
                        key={field.type}
                        className={`upload-card ${uploads[field.type] ? 'uploaded' : ''} ${uploading[field.type] ? 'uploading' : ''}`}
                    >
                        <div className="upload-card-header">
                            <span className={`required-badge ${field.required ? 'required' : 'optional'}`}>
                                {field.required ? 'Required' : 'Optional'}
                            </span>
                            {uploads[field.type] && (
                                <button
                                    type="button"
                                    className="remove-btn"
                                    onClick={() => removeDocument(field.type)}
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        <div
                            className={`upload-zone ${previews[field.type] ? 'has-preview' : ''}`}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(field.type, e)}
                            onClick={() => fileInputRefs.current[field.type]?.click()}
                        >
                            {uploading[field.type] ? (
                                <div className="uploading-state">
                                    <div className="upload-spinner"></div>
                                    <span>Uploading...</span>
                                </div>
                            ) : previews[field.type] ? (
                                <div className="preview-container">
                                    {previews[field.type] === 'pdf' ? (
                                        <div className="pdf-preview">
                                            <span className="pdf-icon">📄</span>
                                            <span className="pdf-text">PDF</span>
                                        </div>
                                    ) : (
                                        <img
                                            src={previews[field.type]}
                                            alt={field.label}
                                            className="image-preview"
                                        />
                                    )}
                                    <div className="upload-success-overlay">
                                        <span className="success-icon">✓</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="upload-placeholder">
                                    <span className="upload-icon">📤</span>
                                    <span className="upload-text">Drop file here or click to upload</span>
                                    <span className="upload-limit">Max: {field.maxSizeMB}MB</span>
                                </div>
                            )}

                            <input
                                ref={(el) => { fileInputRefs.current[field.type] = el; }}
                                type="file"
                                accept={field.accept}
                                onChange={(e) => handleInputChange(field.type, e)}
                                className="file-input-hidden"
                            />
                        </div>

                        <div className="upload-card-info">
                            <h4>{field.label}</h4>
                            <p>{field.description}</p>
                        </div>

                        {errors[field.type] && (
                            <div className="upload-error">
                                <span>⚠️</span> {errors[field.type]}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="upload-status">
                {isAllRequiredUploaded() ? (
                    <div className="status-success">
                        <span>✓</span> All required documents uploaded
                    </div>
                ) : (
                    <div className="status-pending">
                        <span>ℹ️</span> Please upload all required documents to proceed
                    </div>
                )}
            </div>
        </div>
    );
}
