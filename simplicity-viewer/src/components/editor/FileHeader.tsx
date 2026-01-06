'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Breadcrumb, buildBreadcrumbsFromPath } from '@/components/navigation/Breadcrumb';
import { Edit3, Clock, FileText, ChevronDown, Download } from 'lucide-react';

interface FileHeaderProps {
  fileName: string;
  filePath: string;
  clientSlug: string;
  clientName: string;
  lastModified?: string;
  onEditClick?: () => void;
  onDownloadClick?: () => void;
  isEditMode?: boolean;
  className?: string;
}

export function FileHeader({
  fileName,
  filePath,
  clientSlug,
  clientName,
  lastModified,
  onEditClick,
  onDownloadClick,
  isEditMode = false,
  className,
}: FileHeaderProps) {
  // Build breadcrumb items from file path
  const breadcrumbItems = buildBreadcrumbsFromPath(clientSlug, clientName, filePath);

  // Clean up file name for display (remove .md extension, replace hyphens)
  const displayName = fileName
    .replace(/\.md$/, '')
    .replace(/^[\d]+-/, '')
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Format last modified date
  const formattedDate = lastModified
    ? new Date(lastModified).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <header className={cn('border-b border-simplicity-gray-200 bg-white', className)}>
      {/* Breadcrumb Row */}
      <div className="px-6 py-3 border-b border-simplicity-gray-100">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Title Row */}
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        {/* Left: Title and metadata */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-simplicity-gray-400 flex-shrink-0" />
            <h1 className="text-xl font-semibold text-simplicity-charcoal truncate">
              {displayName}
            </h1>
          </div>

          {/* Metadata */}
          {formattedDate && (
            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-simplicity-gray-400">
              <Clock className="h-3 w-3" />
              <span>Last modified {formattedDate}</span>
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Download Button */}
          {onDownloadClick && (
            <button
              onClick={onDownloadClick}
              className={cn(
                'inline-flex items-center gap-2',
                'px-4 py-2 rounded-full',
                'text-sm font-medium',
                'bg-white border border-simplicity-gray-200 text-simplicity-charcoal',
                'hover:bg-simplicity-gray-50 hover:border-simplicity-gray-300',
                'transition-all duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-simplicity-turquoise focus-visible:ring-offset-2'
              )}
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>
          )}
          {/* Edit Button - Primary turquoise accent */}
          {onEditClick && (
            <button
              onClick={onEditClick}
              className={cn(
                'inline-flex items-center gap-2',
                'px-4 py-2 rounded-full',
                'text-sm font-medium',
                'transition-all duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-simplicity-turquoise focus-visible:ring-offset-2',
                isEditMode
                  ? 'bg-simplicity-turquoise text-white shadow-md'
                  : 'bg-simplicity-charcoal text-white hover:bg-simplicity-gray-800'
              )}
            >
              <Edit3 className="h-4 w-4" />
              <span>{isEditMode ? 'Editing...' : 'Edit with AI'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

// Compact header for split view
interface CompactFileHeaderProps {
  fileName: string;
  lastModified?: string;
  onEditClick?: () => void;
  onDownloadClick?: () => void;
  isEditMode?: boolean;
  className?: string;
}

export function CompactFileHeader({
  fileName,
  lastModified: _lastModified,
  onEditClick,
  onDownloadClick,
  isEditMode = false,
  className,
}: CompactFileHeaderProps) {
  const displayName = fileName
    .replace(/\.md$/, '')
    .replace(/^[\d]+-/, '')
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <header
      className={cn(
        'flex items-center justify-between gap-4',
        'px-4 py-2.5',
        'border-b border-simplicity-gray-200 bg-white',
        className
      )}
    >
      <div className="flex items-center gap-2 min-w-0">
        <FileText className="h-4 w-4 text-simplicity-gray-400 flex-shrink-0" />
        <span className="font-medium text-sm text-simplicity-charcoal truncate">
          {displayName}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {onDownloadClick && (
          <button
            onClick={onDownloadClick}
            className={cn(
              'inline-flex items-center gap-1.5',
              'px-2 py-1.5 rounded-md',
              'text-xs font-medium',
              'text-simplicity-gray-500 hover:text-simplicity-charcoal hover:bg-simplicity-gray-100',
              'transition-all duration-200'
            )}
            title="Download file"
          >
            <Download className="h-3 w-3" />
          </button>
        )}
        {onEditClick && (
          <button
            onClick={onEditClick}
            className={cn(
              'inline-flex items-center gap-1.5',
              'px-3 py-1.5 rounded-full',
              'text-xs font-medium',
              'transition-all duration-200',
              isEditMode
                ? 'bg-simplicity-turquoise text-white'
                : 'text-simplicity-gray-500 hover:text-simplicity-charcoal hover:bg-simplicity-gray-100'
            )}
          >
            <Edit3 className="h-3 w-3" />
            <span>{isEditMode ? 'Editing' : 'Edit'}</span>
          </button>
        )}
      </div>
    </header>
  );
}

// File info dropdown for mobile
interface FileInfoDropdownProps {
  fileName: string;
  filePath: string;
  lastModified?: string;
  wordCount?: number;
  className?: string;
}

export function FileInfoDropdown({
  fileName,
  filePath,
  lastModified,
  wordCount,
  className,
}: FileInfoDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formattedDate = lastModified
    ? new Date(lastModified).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'inline-flex items-center gap-1.5',
          'px-2 py-1 rounded-md',
          'text-xs text-simplicity-gray-500',
          'hover:bg-simplicity-gray-100 hover:text-simplicity-charcoal',
          'transition-colors',
          className
        )}
      >
        <span>File Info</span>
        <ChevronDown className={cn('h-3 w-3 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-simplicity-gray-200 p-3 z-50">
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-simplicity-gray-400">Name:</span>
              <p className="font-medium text-simplicity-charcoal truncate">{fileName}</p>
            </div>
            <div>
              <span className="text-simplicity-gray-400">Path:</span>
              <p className="font-mono text-simplicity-gray-600 truncate">{filePath}</p>
            </div>
            {formattedDate && (
              <div>
                <span className="text-simplicity-gray-400">Modified:</span>
                <p className="text-simplicity-charcoal">{formattedDate}</p>
              </div>
            )}
            {wordCount !== undefined && (
              <div>
                <span className="text-simplicity-gray-400">Word count:</span>
                <p className="text-simplicity-charcoal">{wordCount.toLocaleString()} words</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Loading skeleton for file header
export function FileHeaderSkeleton() {
  return (
    <header className="border-b border-simplicity-gray-200 bg-white animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="px-6 py-3 border-b border-simplicity-gray-100">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-simplicity-gray-100 rounded" />
          <div className="h-4 w-24 bg-simplicity-gray-100 rounded" />
          <div className="h-4 w-4 bg-simplicity-gray-100 rounded" />
          <div className="h-4 w-32 bg-simplicity-gray-100 rounded" />
        </div>
      </div>

      {/* Title skeleton */}
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 bg-simplicity-gray-100 rounded" />
            <div className="h-6 w-48 bg-simplicity-gray-100 rounded" />
          </div>
          <div className="mt-2 h-3 w-32 bg-simplicity-gray-100 rounded" />
        </div>
        <div className="h-9 w-32 bg-simplicity-gray-100 rounded-full" />
      </div>
    </header>
  );
}
