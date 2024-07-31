"use client";

import { useState } from 'react';

export default function Criteria() {
    const [keyword, setKeyword] = useState<string>('');
    const [uploadUrl, setUploadUrl] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [debugInfo, setDebugInfo] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setDebugInfo('');
        setUploadUrl('');

        try {
            const response = await fetch('/api/keywords', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ keyword: keyword }),
            });

            const data = await response.json();
            setDebugInfo(JSON.stringify(data, null, 2));

            if (!response.ok) {
                throw new Error(data.error || 'Network response was not ok');
            }

            if (data.upload_url) {
                setUploadUrl(data.upload_url);
            } else {
                setError('Upload URL not found in the response');
            }
        } catch (error) {
            console.error('Error submitting keyword:', error);
            setError('Error submitting keyword. Please try again.');
        }
    };

    return (
        <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-center">User adds criteria</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    placeholder="Enter keyword"
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    Submit
                </button>
            </form>
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {uploadUrl && (
                <div className="mt-4 text-center">
                    <a href={uploadUrl} className="text-blue-500 hover:text-blue-700 underline">
                        Upload your file here
                    </a>
                </div>
            )}
            {debugInfo && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Debug Info:</h2>
                    <pre className="bg-gray-100 p-2 rounded mt-2 overflow-x-auto">
                        {debugInfo}
                    </pre>
                </div>
            )}
        </div>
    );
}
