import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CLIENTS_PATH = path.join(process.cwd(), '..', 'clients');

// Helper to get MIME type
function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.md': 'text/markdown',
    '.yaml': 'text/yaml',
    '.yml': 'text/yaml',
    '.json': 'application/json',
    '.txt': 'text/plain',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.pdf': 'application/pdf',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ clientSlug: string; path: string[] }> }
) {
  try {
    const { clientSlug, path: pathSegments } = await params;
    const { searchParams } = new URL(request.url);
    
    // Build full file path
    const filePath = path.join(CLIENTS_PATH, clientSlug, ...pathSegments);

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

    // Handle download request
    if (searchParams.get('download') === 'true') {
      const fileBuffer = fs.readFileSync(filePath);
      const fileName = path.basename(filePath);
      
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Disposition': `attachment; filename="${fileName}"`,
          'Content-Type': getMimeType(filePath),
          'Content-Length': stats.size.toString(),
        },
      });
    }

    // Handle directory listing
    if (stats.isDirectory()) {
      const entries = fs.readdirSync(filePath, { withFileTypes: true });
      return NextResponse.json({
        type: 'directory',
        entries: entries
          .filter(e => !e.name.startsWith('.') && !e.name.startsWith('_'))
          .map(e => ({
            name: e.name,
            type: e.isDirectory() ? 'folder' : 'file',
            path: pathSegments.length > 0 
              ? [...pathSegments, e.name].join('/')
              : e.name,
          })),
      });
    }

    // Handle different file types
    const ext = path.extname(filePath).toLowerCase();

    // Images - return base64 for display
    if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
      const buffer = fs.readFileSync(filePath);
      const base64 = buffer.toString('base64');
      const mimeType = getMimeType(filePath);

      return NextResponse.json({
        type: 'image',
        mimeType,
        data: `data:${mimeType};base64,${base64}`,
        size: stats.size,
        name: path.basename(filePath),
        path: pathSegments.join('/'),
      });
    }

    // Text files (markdown, yaml, etc)
    if (['.md', '.yaml', '.yml', '.txt', '.json', '.html', '.css', '.js', '.ts', '.tsx', '.jsx'].includes(ext)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return NextResponse.json({
        type: 'text',
        content,
        size: stats.size,
        name: path.basename(filePath),
        path: pathSegments.join('/'),
        extension: ext,
        mimeType: getMimeType(filePath),
      });
    }

    // PDF files
    if (ext === '.pdf') {
      const buffer = fs.readFileSync(filePath);
      const base64 = buffer.toString('base64');
      return NextResponse.json({
        type: 'pdf',
        data: `data:application/pdf;base64,${base64}`,
        size: stats.size,
        name: path.basename(filePath),
        path: pathSegments.join('/'),
      });
    }

    // Other binary files - return metadata
    return NextResponse.json({
      type: 'binary',
      size: stats.size,
      extension: ext,
      name: path.basename(filePath),
      path: pathSegments.join('/'),
      mimeType: getMimeType(filePath),
    });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json(
      { error: 'Failed to read file', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PUT endpoint for editing files
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ clientSlug: string; path: string[] }> }
) {
  try {
    const { clientSlug, path: pathSegments } = await params;
    const { content } = await request.json();

    if (typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content must be a string' },
        { status: 400 }
      );
    }

    // Build full file path
    const filePath = path.join(CLIENTS_PATH, clientSlug, ...pathSegments);

    // Security check
    const resolvedPath = path.resolve(filePath);
    const resolvedClientsPath = path.resolve(CLIENTS_PATH);

    if (!resolvedPath.startsWith(resolvedClientsPath)) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Only allow editing text files
    const ext = path.extname(filePath).toLowerCase();
    if (!['.md', '.yaml', '.yml', '.txt', '.json', '.html', '.css', '.js', '.ts', '.tsx', '.jsx'].includes(ext)) {
      return NextResponse.json(
        { error: 'File type not editable' },
        { status: 400 }
      );
    }

    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write file
    fs.writeFileSync(filePath, content, 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'File saved successfully',
      path: pathSegments.join('/'),
    });
  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json(
      { error: 'Failed to save file', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// DELETE endpoint for deleting files
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ clientSlug: string; path: string[] }> }
) {
  try {
    const { clientSlug, path: pathSegments } = await params;

    // Build full file path
    const filePath = path.join(CLIENTS_PATH, clientSlug, ...pathSegments);

    // Security check
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

    // Delete file
    fs.unlinkSync(filePath);

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { error: 'Failed to delete file', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

