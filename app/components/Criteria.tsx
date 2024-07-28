"use client";

import { useState } from 'react';

export default function Criteria() {
    const [keywords, setKeywords] = useState<string>('');
    const [uploadLink, setUploadLink] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/keywords', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ keyword: keywords }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setUploadLink(data.upload_link);
        } catch (error) {
            console.error('Error submitting keywords:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4">User adds criteria</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <textarea
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-4"
            placeholder="Enter keywords"
        />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    Submit
                </button>
            </form>
            {uploadLink && (
                <div className="mt-4">
                    <a href={uploadLink} className="text-blue-500 underline">
                        Upload your file here
                    </a>
                </div>
            )}
        </div>
    );
}
