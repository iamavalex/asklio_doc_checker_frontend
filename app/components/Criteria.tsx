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
        <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-center">User adds criteria</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    placeholder="Enter keyword"
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    Submit
                </button>
            </form>
            {uploadLink && (
                <div className="mt-4 text-center">
                    <a href={uploadLink} className="text-blue-500 hover:text-blue-700 underline">
                        Upload your file here
                    </a>
                </div>
            )}
        </div>
    );
}
