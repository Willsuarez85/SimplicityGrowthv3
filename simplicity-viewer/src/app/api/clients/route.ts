import { NextResponse } from 'next/server';
import { getAllClients } from '@/lib/clients';

export async function GET() {
  try {
    const clients = getAllClients();
    return NextResponse.json({ clients });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}
