'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { PRODUCT_SPECS } from '@/lib/kunaki/product-mapping';
import type { ProductType } from '@/lib/validators';
import FileUploader from '@/components/FileUploader';
import { v4 as uuidv4 } from 'uuid';

// Dynamically import 3D component to avoid SSR issues
const VinylPreview3D = dynamic(() => import('@/components/VinylPreview3D'), {
    ssr: false,
    loading: () => <div className="glass rounded-xl flex items-center justify-center h-[400px]">
        <div className="spinner w-12 h-12"></div>
    </div>
});

export default function StudioPage() {
    const router = useRouter();
    const [step, setStep] = useState<'select' | 'upload' | 'preview'>('select');
    const [productType, setProductType] = useState<ProductType | null>(null);
    const [projectToken, setProjectToken] = useState<string>('');
    const [uploading, setUploading] = useState(false);

    // File states
    const [files, setFiles] = useState<{
        sideA?: File;
        sideB?: File;
        frontArt?: File;
        backArt?: File;
        labelArt?: File;
    }>({});

    // Preview URLs for 3D render
    const [previewUrls, setPreviewUrls] = useState<{
        frontArt?: string;
        labelArt?: string;
    }>({});

    useEffect(() => {
        // Generate project token on mount
        setProjectToken(uuidv4());
    }, []);

    const handleFileSelect = (fieldName: string, file: File) => {
        setFiles(prev => ({ ...prev, [fieldName]: file }));

        // Create preview URL for images
        if (['frontArt', 'labelArt'].includes(fieldName)) {
            const url = URL.createObjectURL(file);
            setPreviewUrls(prev => ({ ...prev, [fieldName]: url }));
        }
    };

    const handleProductSelect = (type: ProductType) => {
        setProductType(type);
        setStep('upload');
    };

    const handleSubmit = async () => {
        if (!productType) return;

        setUploading(true);

        try {
            // Create project in Airtable first
            const createResponse = await fetch('/api/airtable/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: projectToken,
                    productType,
                    customerEmail: 'customer@example.com', // TODO: Get from auth
                }),
            });

            if (!createResponse.ok) {
                throw new Error('Failed to create project');
            }

            // Upload all files
            const uploadPromises = Object.entries(files).map(async ([fieldName, file]) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('token', projectToken);
                formData.append('fieldName', fieldName);

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`Failed to upload ${fieldName}`);
                }

                return response.json();
            });

            await Promise.all(uploadPromises);

            // Mark project as ready to publish
            await fetch('/api/airtable/update-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: projectToken,
                    status: 'ready_to_publish',
                }),
            });

            setStep('preview');
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload files. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const specs = productType ? PRODUCT_SPECS[productType] : null;

    return (
        <div className="min-h-screen py-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 text-vinyl-gold">
                        Customizer Studio
                    </h1>
                    <p className="text-lg text-vinyl-cream/70">
                        {step === 'select' && 'Choose your product format'}
                        {step === 'upload' && `Upload assets for ${specs?.name}`}
                        {step === 'preview' && 'Your project is being processed'}
                    </p>
                </div>

                {/* Step 1: Product Selection */}
                {step === 'select' && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(PRODUCT_SPECS).map(([type, spec]) => (
                            <button
                                key={type}
                                onClick={() => handleProductSelect(type as ProductType)}
                                className="card text-left hover:scale-105 transition-transform"
                            >
                                <h3 className="text-2xl font-serif font-bold mb-3 text-vinyl-gold-light">
                                    {spec.name}
                                </h3>
                                <ul className="text-sm text-vinyl-cream/70 space-y-2">
                                    <li>• Max duration: {spec.maxAudioDuration} minutes</li>
                                    <li>• {spec.requiresSideB ? 'Requires Side A & B' : 'Single-sided'}</li>
                                    <li>• {spec.requiredAssets.length} required assets</li>
                                </ul>
                            </button>
                        ))}
                    </div>
                )}

                {/* Step 2: File Upload */}
                {step === 'upload' && specs && (
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left: Upload Forms */}
                        <div className="space-y-6">
                            <FileUploader
                                fieldName="sideA"
                                label="Side A Audio"
                                accept="audio/wav,audio/mpeg"
                                fileType="audio"
                                onFileSelect={(file) => handleFileSelect('sideA', file)}
                                maxSizeMB={500}
                            />

                            {specs.requiresSideB && (
                                <FileUploader
                                    fieldName="sideB"
                                    label="Side B Audio"
                                    accept="audio/wav,audio/mpeg"
                                    fileType="audio"
                                    onFileSelect={(file) => handleFileSelect('sideB', file)}
                                    maxSizeMB={500}
                                />
                            )}

                            <FileUploader
                                fieldName="frontArt"
                                label="Front Artwork"
                                accept="image/png,image/jpeg"
                                fileType="image"
                                onFileSelect={(file) => handleFileSelect('frontArt', file)}
                            />

                            <FileUploader
                                fieldName="backArt"
                                label="Back Artwork"
                                accept="image/png,image/jpeg"
                                fileType="image"
                                onFileSelect={(file) => handleFileSelect('backArt', file)}
                            />

                            {(productType?.includes('vinyl') || productType === 'cassette') && (
                                <FileUploader
                                    fieldName="labelArt"
                                    label="Label Artwork"
                                    accept="image/png,image/jpeg"
                                    fileType="image"
                                    onFileSelect={(file) => handleFileSelect('labelArt', file)}
                                />
                            )}

                            <div className="flex gap-4 pt-6">
                                <button
                                    onClick={() => setStep('select')}
                                    className="btn-secondary flex-1"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={uploading || !files.sideA || !files.frontArt}
                                    className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {uploading ? 'Uploading...' : 'Submit Project'}
                                </button>
                            </div>
                        </div>

                        {/* Right: 3D Preview */}
                        <div className="sticky top-6 h-fit">
                            <VinylPreview3D
                                frontArtUrl={previewUrls.frontArt}
                                labelArtUrl={previewUrls.labelArt}
                            />
                            <p className="text-center text-sm text-vinyl-cream/50 mt-4">
                                Live 3D Preview
                            </p>
                        </div>
                    </div>
                )}

                {/* Step 3: Success */}
                {step === 'preview' && (
                    <div className="card max-w-2xl mx-auto text-center">
                        <div className="mb-6">
                            <svg className="mx-auto w-16 h-16 text-vinyl-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="font-serif text-3xl font-bold mb-4 text-vinyl-gold">
                            Project Submitted!
                        </h2>
                        <p className="text-vinyl-cream/70 mb-6">
                            Your custom media is being processed. We'll send you an email with tracking information once
                            manufacturing begins.
                        </p>
                        <p className="text-sm text-vinyl-cream/50 mb-8">
                            Project Token: <code className="bg-vinyl-black-light px-2 py-1 rounded">{projectToken}</code>
                        </p>
                        <button
                            onClick={() => router.push('/')}
                            className="btn-primary"
                        >
                            Return Home
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
