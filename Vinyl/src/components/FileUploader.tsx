'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { validateAudioFile, validateImageFile } from '@/lib/validators';

export interface FileUploaderProps {
    fieldName: string;
    label: string;
    accept: string; // e.g., 'audio/*' or 'image/png,image/jpeg'
    fileType: 'audio' | 'image';
    onFileSelect: (file: File) => void;
    maxSizeMB?: number;
    required?: boolean;
}

export default function FileUploader({
    fieldName,
    label,
    accept,
    fileType,
    onFileSelect,
    maxSizeMB = 50,
    required = true,
}: FileUploaderProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [validating, setValidating] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (selectedFile: File) => {
        setError('');
        setValidating(true);

        // Check file size
        const sizeMB = selectedFile.size / (1024 * 1024);
        if (sizeMB > maxSizeMB) {
            setError(`File size (${sizeMB.toFixed(1)}MB) exceeds ${maxSizeMB}MB limit`);
            setValidating(false);
            return;
        }

        // Validate based on type
        if (fileType === 'audio') {
            const validation = await validateAudioFile(selectedFile);
            if (!validation.valid) {
                setError(validation.error || 'Invalid audio file');
                setValidating(false);
                return;
            }
        } else if (fileType === 'image') {
            const validation = await validateImageFile(selectedFile);
            if (!validation.valid) {
                setError(validation.error || 'Invalid image file');
                setValidating(false);
                return;
            }

            // Generate preview for images
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target?.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }

        setFile(selectedFile);
        onFileSelect(selectedFile);
        setValidating(false);
    };

    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            await handleFileChange(e.target.files[0]);
        }
    };

    const onDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const onDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            await handleFileChange(e.dataTransfer.files[0]);
        }
    };

    const onButtonClick = () => {
        inputRef.current?.click();
    };

    const clearFile = () => {
        setFile(null);
        setPreview('');
        setError('');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-vinyl-gold">
                {label}
                {required && <span className="text-red-400 ml-1">*</span>}
            </label>

            <div
                className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 ${dragActive
                        ? 'border-vinyl-gold bg-vinyl-gold/10'
                        : 'border-vinyl-gray-700 hover:border-vinyl-gold/50'
                    } ${error ? 'border-red-500' : ''}`}
                onDragEnter={onDrag}
                onDragLeave={onDrag}
                onDragOver={onDrag}
                onDrop={onDrop}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    onChange={onChange}
                    className="hidden"
                    id={fieldName}
                />

                {!file ? (
                    <div className="text-center">
                        <div className="mb-4">
                            <svg
                                className="mx-auto h-12 w-12 text-vinyl-gray-500"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <p className="text-sm text-vinyl-cream/70 mb-2">
                            Drag and drop your {fileType === 'audio' ? 'audio' : 'image'} file here, or
                        </p>
                        <button
                            type="button"
                            onClick={onButtonClick}
                            className="btn-primary text-sm"
                        >
                            Browse Files
                        </button>
                        <p className="text-xs text-vinyl-cream/50 mt-2">
                            Max size: {maxSizeMB}MB
                            {fileType === 'image' && ' • Min resolution: 3000x3000px'}
                            {fileType === 'audio' && ' • Max duration: 20 minutes'}
                        </p>
                    </div>
                ) : (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-16 h-16 object-cover rounded"
                                />
                            )}
                            <div>
                                <p className="text-sm font-medium text-vinyl-cream truncate max-w-xs">
                                    {file.name}
                                </p>
                                <p className="text-xs text-vinyl-cream/50">
                                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={clearFile}
                            className="text-red-400 hover:text-red-300 transition"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                {validating && (
                    <div className="absolute inset-0 flex items-center justify-center bg-vinyl-black/80 rounded-xl">
                        <div className="spinner w-8 h-8"></div>
                    </div>
                )}
            </div>

            {error && (
                <p className="text-sm text-red-400 mt-2">
                    {error}
                </p>
            )}
        </div>
    );
}
