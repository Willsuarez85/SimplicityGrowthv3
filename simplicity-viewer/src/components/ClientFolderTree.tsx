'use client';

import { FolderTree } from './FolderTree';
import { useRouter } from 'next/navigation';

interface FolderNode {
  name: string;
  type: 'folder' | 'file';
  path: string;
  children?: FolderNode[];
  size?: number;
}

interface ClientFolderTreeProps {
  nodes: FolderNode[];
  clientSlug: string;
  selectedPath?: string;
}

export function ClientFolderTree({ nodes, clientSlug, selectedPath }: ClientFolderTreeProps) {
  const router = useRouter();
  
  const handleFileSelect = (filePath: string) => {
    router.push(`/client/${clientSlug}/files?file=${encodeURIComponent(filePath)}`);
  };

  return (
    <FolderTree 
      nodes={nodes} 
      onFileSelect={handleFileSelect}
      selectedPath={selectedPath}
    />
  );
}

