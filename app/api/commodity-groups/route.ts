import { NextResponse } from 'next/server';

interface Category {
    id: number;
    name: string;
}

interface CommodityGroup {
    id: string;
    name: string;
    category: Category;
}

export async function GET() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/commodity-groups/');
        if (!response.ok) {
            throw new Error('Failed to fetch commodity groups');
        }
        const data: CommodityGroup[] = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching commodity groups:', error);
        return NextResponse.json({ error: 'Failed to fetch commodity groups' }, { status: 500 });
    }
}
