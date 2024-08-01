import { NextResponse } from 'next/server';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const djangoFormData = new FormData();
        djangoFormData.append('file', new Blob([buffer]), file.name);

        const response = await fetch('http://127.0.0.1:8000/api/process/', {
            method: 'POST',
            body: djangoFormData,
        });

        if (!response.ok) {
            throw new Error(`Failed to process document: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error processing file:', error);
        return NextResponse.json({ error: 'Error processing file' }, { status: 500 });
    }
}
