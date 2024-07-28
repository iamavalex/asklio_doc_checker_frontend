import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const response = await fetch('http://127.0.0.1:8000/api/keywords/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error saving keywords:', error);
        return NextResponse.json({ error: 'Failed to save keywords' }, { status: 500 });
    }
}
