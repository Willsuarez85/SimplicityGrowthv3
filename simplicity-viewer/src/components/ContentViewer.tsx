'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, FileText, AlertCircle } from 'lucide-react';

interface ContentViewerProps {
  clientSlug: string;
  filePath: string;
}

export function ContentViewer({ clientSlug, filePath }: ContentViewerProps) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // New API structure: /api/files/[clientSlug]/[...path]
    fetch(`/api/files/${clientSlug}/${filePath}`)
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.error || 'Failed to load file');
          });
        }
        return res.json();
      })
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else if (data.type === 'text' && data.content) {
          setContent(data.content);
        } else if (data.type === 'image') {
          setError('Use ImageViewer component for images');
        } else {
          setError(`Unable to display this file type: ${data.type || 'unknown'}`);
        }
      })
      .catch(err => {
        setError(err.message || 'Failed to load file');
        console.error('Error loading file:', err);
      })
      .finally(() => setLoading(false));
  }, [clientSlug, filePath]);

  const fileName = filePath.split('/').pop() || 'File';

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <AlertCircle className="h-8 w-8 text-red-400 mb-2" />
          <p className="text-sm text-gray-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-400" />
          {fileName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px]">
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-50 p-4 rounded-lg overflow-x-auto">
              {content}
            </pre>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
