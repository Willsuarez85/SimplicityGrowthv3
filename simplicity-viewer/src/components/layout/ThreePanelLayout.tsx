'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { FolderTree } from '@/components/FolderTree';
import { MarkdownViewer, MarkdownViewerSkeleton, MarkdownEmptyState } from '@/components/editor/MarkdownViewer';
import { ChatInterface, ChatEmptyState } from '@/components/editor/ChatInterface';
import { CompactFileHeader } from '@/components/editor/FileHeader';
import {
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  MessageSquare,
  Info,
  FileText,
} from 'lucide-react';

interface FolderNode {
  name: string;
  type: 'folder' | 'file';
  path: string;
  children?: FolderNode[];
  size?: number;
}

interface ThreePanelLayoutProps {
  folderTree: FolderNode[];
  clientSlug: string;
  clientName: string;
}

type RightPanelMode = 'chat' | 'properties';

export function ThreePanelLayout({
  folderTree,
  clientSlug,
  clientName,
}: ThreePanelLayoutProps) {
  const searchParams = useSearchParams();
  
  // Panel visibility state
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [rightPanelMode, setRightPanelMode] = useState<RightPanelMode>('chat');

  // File state
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [fileType, setFileType] = useState<string>('text');
  const [isLoadingFile, setIsLoadingFile] = useState(false);

  // Load file from URL query param on mount
  useEffect(() => {
    const fileParam = searchParams.get('file');
    if (fileParam) {
      setSelectedPath(decodeURIComponent(fileParam));
    }
  }, [searchParams]);

  // Load file content when path changes
  useEffect(() => {
    if (!selectedPath) {
      setFileContent('');
      return;
    }

    const loadFile = async () => {
      setIsLoadingFile(true);
      try {
        // New API structure: /api/files/[clientSlug]/[...path]
        const response = await fetch(`/api/files/${clientSlug}/${selectedPath}`);
        if (response.ok) {
          const data = await response.json();
          setFileType(data.type || 'text');
          if (data.type === 'text' && data.content) {
            setFileContent(data.content);
          } else if (data.type === 'image') {
            // Handle images - store data URL
            setFileContent(data.data);
          } else {
            setFileContent('');
          }
        } else {
          const errorData = await response.json().catch(() => ({ error: 'Failed to load file' }));
          console.error('Error loading file:', errorData.error);
          setFileContent('');
        }
      } catch (error) {
        console.error('Error loading file:', error);
        setFileContent('');
      } finally {
        setIsLoadingFile(false);
      }
    };

    loadFile();
  }, [selectedPath, clientSlug]);

  const handleFileSelect = (path: string) => {
    setSelectedPath(path);
  };

  const handleContentChange = async (newContent: string) => {
    // Update local state
    setFileContent(newContent);
    // Save to server
    await handleSave(newContent);
  };

  const handleDownload = () => {
    if (!selectedPath) return;
    window.open(`/api/files/${clientSlug}/${selectedPath}?download=true`, '_blank');
  };

  const handleSave = async (content: string) => {
    if (!selectedPath) return;
    
    try {
      const response = await fetch(`/api/files/${clientSlug}/${selectedPath}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        setFileContent(content);
        // Could show a success toast here
      } else {
        const error = await response.json();
        console.error('Error saving file:', error);
        alert('Failed to save file: ' + (error.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving file:', error);
      alert('Failed to save file');
    }
  };

  const getFileName = (path: string | null) => {
    if (!path) return '';
    return path.split('/').pop() || '';
  };

  return (
    <div className="flex h-screen bg-simplicity-offwhite">
      {/* Left Panel - File Navigator */}
      <div
        className={cn(
          'border-r border-simplicity-gray-200 bg-white transition-all duration-300 flex flex-col shrink-0',
          leftPanelOpen ? 'w-56 lg:w-64' : 'w-0 overflow-hidden'
        )}
      >
        {leftPanelOpen && (
          <>
            <div className="flex items-center justify-between px-4 py-3 border-b border-simplicity-gray-200">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-simplicity-gray-400" />
                <span className="font-medium text-sm text-simplicity-charcoal">
                  {clientName}
                </span>
              </div>
              <button
                onClick={() => setLeftPanelOpen(false)}
                className="p-1 hover:bg-simplicity-gray-100 rounded transition-colors"
                title="Close sidebar"
              >
                <PanelLeftClose className="h-4 w-4 text-simplicity-gray-400" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <FolderTree
                nodes={folderTree}
                onFileSelect={handleFileSelect}
                selectedPath={selectedPath || undefined}
              />
            </div>
          </>
        )}
      </div>

      {/* Toggle Left Panel (when closed) */}
      {!leftPanelOpen && (
        <button
          onClick={() => setLeftPanelOpen(true)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-simplicity-gray-200 rounded-r-lg p-2 hover:bg-simplicity-gray-50 transition-colors shadow-sm"
          title="Open sidebar"
        >
          <PanelLeftOpen className="h-4 w-4 text-simplicity-gray-500" />
        </button>
      )}

      {/* Center Panel - Content Viewer */}
      <div className="flex-1 flex flex-col min-w-[300px] overflow-hidden bg-white">
        {/* File Header */}
        {selectedPath && (
          <CompactFileHeader
            fileName={getFileName(selectedPath)}
            lastModified={new Date().toISOString()}
            isEditMode={false}
            onDownloadClick={handleDownload}
            className="border-b border-simplicity-gray-200"
          />
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {!selectedPath ? (
            <MarkdownEmptyState />
          ) : isLoadingFile ? (
            <MarkdownViewerSkeleton />
          ) : fileType === 'image' ? (
            <div className="flex items-center justify-center">
              <Image
                src={fileContent}
                alt={getFileName(selectedPath)}
                className="rounded-lg shadow-lg"
                width={800}
                height={600}
                style={{ width: '100%', height: 'auto' }}
                unoptimized
              />
            </div>
          ) : (
            <MarkdownViewer content={fileContent} />
          )}
        </div>
      </div>

      {/* Right Panel - Chat / Properties */}
      <div
        className={cn(
          'border-l border-simplicity-gray-200 bg-white transition-all duration-300 flex flex-col shrink-0',
          rightPanelOpen ? 'w-72 lg:w-80' : 'w-0 overflow-hidden'
        )}
      >
        {rightPanelOpen && (
          <>
            {/* Right Panel Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-simplicity-gray-200">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setRightPanelMode('chat')}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors',
                    rightPanelMode === 'chat'
                      ? 'bg-simplicity-turquoise/10 text-simplicity-turquoise'
                      : 'text-simplicity-gray-500 hover:bg-simplicity-gray-100'
                  )}
                >
                  <MessageSquare className="h-4 w-4" />
                  Chat
                </button>
                <button
                  onClick={() => setRightPanelMode('properties')}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors',
                    rightPanelMode === 'properties'
                      ? 'bg-simplicity-turquoise/10 text-simplicity-turquoise'
                      : 'text-simplicity-gray-500 hover:bg-simplicity-gray-100'
                  )}
                >
                  <Info className="h-4 w-4" />
                  Info
                </button>
              </div>
              <button
                onClick={() => setRightPanelOpen(false)}
                className="p-1 hover:bg-simplicity-gray-100 rounded transition-colors"
                title="Close panel"
              >
                <PanelRightClose className="h-4 w-4 text-simplicity-gray-400" />
              </button>
            </div>

            {/* Right Panel Content */}
            <div className="flex-1 overflow-hidden">
              {rightPanelMode === 'chat' ? (
                selectedPath ? (
                  <ChatInterface
                    filePath={selectedPath}
                    fileContent={fileContent}
                    onContentChange={handleContentChange}
                  />
                ) : (
                  <ChatEmptyState />
                )
              ) : (
                <FilePropertiesPanel
                  filePath={selectedPath}
                  fileContent={fileContent}
                  clientSlug={clientSlug}
                />
              )}
            </div>
          </>
        )}
      </div>

      {/* Toggle Right Panel (when closed) */}
      {!rightPanelOpen && (
        <button
          onClick={() => setRightPanelOpen(true)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-simplicity-gray-200 rounded-l-lg p-2 hover:bg-simplicity-gray-50 transition-colors shadow-sm"
          title="Open panel"
        >
          <PanelRightOpen className="h-4 w-4 text-simplicity-gray-500" />
        </button>
      )}
    </div>
  );
}

// File Properties Panel Component
interface FilePropertiesPanelProps {
  filePath: string | null;
  fileContent: string;
  clientSlug: string;
}

function FilePropertiesPanel({ filePath, fileContent, clientSlug }: FilePropertiesPanelProps) {
  if (!filePath) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <div className="w-12 h-12 rounded-xl bg-simplicity-gray-100 flex items-center justify-center mb-3">
          <Info className="h-6 w-6 text-simplicity-gray-400" />
        </div>
        <h3 className="text-sm font-medium text-simplicity-charcoal mb-1">
          No file selected
        </h3>
        <p className="text-xs text-simplicity-gray-400">
          Select a file to view its properties
        </p>
      </div>
    );
  }

  const fileName = filePath.split('/').pop() || '';
  const fileExtension = fileName.split('.').pop() || '';
  const wordCount = fileContent.split(/\s+/).filter(Boolean).length;
  const charCount = fileContent.length;
  const lineCount = fileContent.split('\n').length;

  // Extract headings from markdown
  const headings = fileContent.match(/^#{1,6}\s+.+$/gm) || [];

  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full">
      {/* Basic Info */}
      <div>
        <h4 className="text-xs font-medium text-simplicity-gray-500 uppercase tracking-wider mb-3">
          File Info
        </h4>
        <div className="space-y-2">
          <PropertyRow label="Name" value={fileName} />
          <PropertyRow label="Type" value={fileExtension.toUpperCase()} />
          <PropertyRow label="Path" value={filePath} truncate />
        </div>
      </div>

      {/* Stats */}
      <div>
        <h4 className="text-xs font-medium text-simplicity-gray-500 uppercase tracking-wider mb-3">
          Statistics
        </h4>
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Words" value={wordCount} />
          <StatCard label="Chars" value={charCount} />
          <StatCard label="Lines" value={lineCount} />
        </div>
      </div>

      {/* Document Outline */}
      {headings.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-simplicity-gray-500 uppercase tracking-wider mb-3">
            Outline
          </h4>
          <div className="space-y-1">
            {headings.slice(0, 10).map((heading, idx) => {
              const level = (heading.match(/^#+/) || [''])[0].length;
              const text = heading.replace(/^#+\s+/, '');
              return (
                <div
                  key={idx}
                  className="text-sm text-simplicity-gray-600 truncate"
                  style={{ paddingLeft: `${(level - 1) * 12}px` }}
                >
                  {text}
                </div>
              );
            })}
            {headings.length > 10 && (
              <p className="text-xs text-simplicity-gray-400 mt-2">
                +{headings.length - 10} more sections
              </p>
            )}
          </div>
        </div>
      )}

      {/* Client Context */}
      <div>
        <h4 className="text-xs font-medium text-simplicity-gray-500 uppercase tracking-wider mb-3">
          Context
        </h4>
        <PropertyRow label="Client" value={clientSlug} />
      </div>
    </div>
  );
}

function PropertyRow({
  label,
  value,
  truncate = false,
}: {
  label: string;
  value: string;
  truncate?: boolean;
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-xs text-simplicity-gray-400 w-16 flex-shrink-0">
        {label}
      </span>
      <span
        className={cn(
          'text-sm text-simplicity-charcoal',
          truncate && 'truncate'
        )}
        title={truncate ? value : undefined}
      >
        {value}
      </span>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-simplicity-gray-50 rounded-lg p-3 text-center">
      <div className="text-lg font-semibold text-simplicity-charcoal">
        {value.toLocaleString()}
      </div>
      <div className="text-xs text-simplicity-gray-400">{label}</div>
    </div>
  );
}
