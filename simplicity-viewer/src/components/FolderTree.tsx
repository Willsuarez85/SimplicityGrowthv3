'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  FileText,
  Image,
  Video,
  File,
} from 'lucide-react';

interface FolderNode {
  name: string;
  type: 'folder' | 'file';
  path: string;
  children?: FolderNode[];
  size?: number;
}

interface FolderTreeProps {
  nodes: FolderNode[];
  onFileSelect?: (path: string) => void;
  selectedPath?: string;
}

function getFileIcon(filename: string) {
  const ext = filename.split('.').pop()?.toLowerCase();

  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) {
    return Image;
  }
  if (['mp4', 'mov', 'avi', 'webm'].includes(ext || '')) {
    return Video;
  }
  if (['md', 'txt', 'yaml', 'yml', 'json'].includes(ext || '')) {
    return FileText;
  }
  return File;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface TreeNodeProps {
  node: FolderNode;
  level: number;
  onFileSelect?: (path: string) => void;
  selectedPath?: string;
}

function TreeNode({ node, level, onFileSelect, selectedPath }: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState(level < 2);
  const isFolder = node.type === 'folder';
  const isSelected = selectedPath === node.path;

  const Icon = isFolder
    ? (isOpen ? FolderOpen : Folder)
    : getFileIcon(node.name);

  const handleClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else if (onFileSelect) {
      onFileSelect(node.path);
    }
  };

  return (
    <div>
      <div
        className={cn(
          'flex items-center gap-1 py-1 px-2 rounded cursor-pointer transition-colors',
          isSelected ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100',
          level > 0 && 'ml-4'
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={handleClick}
      >
        {/* Expand/Collapse indicator */}
        {isFolder ? (
          isOpen ? (
            <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
          )
        ) : (
          <span className="w-4" />
        )}

        {/* Icon */}
        <Icon
          className={cn(
            'h-4 w-4 flex-shrink-0',
            isFolder ? 'text-amber-500' : 'text-gray-400'
          )}
        />

        {/* Name */}
        <span className="text-sm truncate flex-1">{node.name}</span>

        {/* Size (for files) */}
        {!isFolder && node.size && (
          <span className="text-xs text-gray-400">
            {formatSize(node.size)}
          </span>
        )}
      </div>

      {/* Children */}
      {isFolder && isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              level={level + 1}
              onFileSelect={onFileSelect}
              selectedPath={selectedPath}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function FolderTree({ nodes, onFileSelect, selectedPath }: FolderTreeProps) {
  if (nodes.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400 text-sm">
        No files found
      </div>
    );
  }

  return (
    <div className="py-2">
      {nodes.map((node) => (
        <TreeNode
          key={node.path}
          node={node}
          level={0}
          onFileSelect={onFileSelect}
          selectedPath={selectedPath}
        />
      ))}
    </div>
  );
}
