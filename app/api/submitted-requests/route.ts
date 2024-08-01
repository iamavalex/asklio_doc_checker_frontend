import { NextResponse } from 'next/server';
import {OrderLine} from "@/app/api/new-requests/route";

export interface SubmittedRequest {
    id: number;
    order_lines: OrderLine[];
    requestor_name: string;
    title: string;
    vendor_name: string;
    vat_id: string;
    department: string;
    total_cost: string;
    created_at: string;
    status: string;
    uploaded_file: string | null;
    commodity_group: string;
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
