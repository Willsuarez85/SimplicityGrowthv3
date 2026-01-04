import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CLIENTS_PATH = path.join(process.cwd(), '..', 'clients');

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await params;
    const filePath = path.join(CLIENTS_PATH, ...pathSegments);

    // Security check: ensure we're within the clients folder
    const resolvedPath = path.resolve(filePath);
    const resolvedClientsPath = path.resolve(CLIENTS_PATH);

    if (!resolvedPath.startsWith(resolvedClientsPath)) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      const entries = fs.readdirSync(filePath, { withFileTypes: true });
      return NextResponse.json({
        type: 'directory',
        entries: entries
          .filter(e => !e.name.startsWith('.'))
          .map(e => ({
            name: e.name,
            type: e.isDirectory() ? 'folder' : 'file',
          })),
      });
    }

    // Handle different file types
    const ext = path.extname(filePath).toLowerCase();

    // Images - return base64 for thumbnails
    if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
      const buffer = fs.readFileSync(filePath);
      const base64 = buffer.toString('base64');
      const mimeType = ext === '.png' ? 'image/png'
        : ext === '.gif' ? 'image/gif'
        : ext === '.webp' ? 'image/webp'
        : 'image/jpeg';

      return NextResponse.json({
        type: 'image',
        mimeType,
        data: `data:${mimeType};base64,${base64}`,
        size: stats.size,
      });
    }

    // Text files (markdown, yaml, etc)
    if (['.md', '.yaml', '.yml', '.txt', '.json'].includes(ext)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return NextResponse.json({
        type: 'text',
        content,
        size: stats.size,
      });
    }

    // Other files - just return metadata
    return NextResponse.json({
      type: 'binary',
      size: stats.size,
      extension: ext,
    });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json(
      { error: 'Failed to read file' },
      { status: 500 }
    );
  }
}
