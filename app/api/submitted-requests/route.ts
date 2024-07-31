import { NextResponse } from 'next/server';

export interface SubmittedRequest {
    id: number;
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
    status: string;
}

export async function GET() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/submitted-requests/');
        if (!response.ok) {
            throw new Error('Failed to fetch submitted requests');
        }
        const submittedRequests: SubmittedRequest[] = await response.json();
        return NextResponse.json(submittedRequests);
    } catch (error) {
        console.error('Error fetching submitted requests:', error);
        return NextResponse.json({ error: 'Failed to fetch submitted requests' }, { status: 500 });
    }
}
