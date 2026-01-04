import { NextResponse } from 'next/server';
import { getClient, getFolderTree } from '@/lib/clients';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const client = getClient(slug);

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    const folderTree = getFolderTree(slug);

    return NextResponse.json({
      ...client,
      folderTree,
    });
  } catch (error) {
    console.error('Error fetching client:', error);
    return NextResponse.json(
      { error: 'Failed to fetch client' },
      { status: 500 }
    );
  }
}
