import React, { useState, useRef } from 'react';

interface UploadOfferProps {
    onFileProcessed: (extractedData: any) => void;
}

export default function UploadOffer({ onFileProcessed }: UploadOfferProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setError(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file first.');
            return;
        }

        setIsProcessing(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('/api/upload-file', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Failed to process document: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            onFileProcessed(data.extracted_info);

            // Clear the selected file after successful upload
            setSelectedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            console.error('Error processing document:', error);
            setError('An error occurred while processing the document. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="w-full max-w-4xl">
            <div className="flex items-center space-x-4">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                    accept=".pdf"
                    ref={fileInputRef}
                />
                <button
                    onClick={handleUpload}
                    className="btn btn-primary"
                    disabled={!selectedFile || isProcessing}
                >
                    {isProcessing ? 'Processing...' : 'Upload and Process'}
                </button>
            </div>
            {selectedFile && (
                <p className="mt-2">Selected file: {selectedFile.name}</p>
            )}
            {isProcessing && (
                <div className="mt-4 flex items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mr-2"></div>
                    <p>Processing document...</p>
                </div>
            )}
            {error && (
                <p className="mt-2 text-red-500">{error}</p>
            )}
        </div>
    );
}
