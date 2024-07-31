import { NextResponse } from 'next/server';

export interface ManualRequest {
    requestor_name: string;
    title: string;
    vendor_name: string;
    vat_id: string;
    commodity_group: string;
    department: string;
    description: string;
    unit_price: number;
    amount: number;
    unit: string;
    total_cost: number;
}

export async function POST(request: Request) {
    try {
        const manualRequest: ManualRequest = await request.json();

        const response = await fetch('http://127.0.0.1:8000/api/manual-requests/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(manualRequest),
        });

        if (!response.ok) {
            throw new Error('Failed to submit manual request');
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('Error submitting manual request:', error);
        return NextResponse.json({ error: 'Failed to submit manual request' }, { status: 500 });
    }
}
