"use client";
import React, { useState } from 'react';
import RequestForm from "@/app/components/RequestForm";
import UploadOffer from "@/app/components/UploadOffer";

export default function New() {
    const [extractedData, setExtractedData] = useState(null);

    const handleFileProcessed = (data: any) => {
        setExtractedData(data);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col items-center space-y-8">
                <UploadOffer onFileProcessed={handleFileProcessed} />
                <div className="flex items-center w-full max-w-4xl">
                    <div className="flex-grow h-px bg-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-500 font-semibold">OR</span>
                    <div className="flex-grow h-px bg-gray-300"></div>
                </div>
                <RequestForm extractedData={extractedData} />
            </div>
        </div>
    );
}
