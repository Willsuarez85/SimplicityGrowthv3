'use client';

import { cn } from '@/lib/utils';
import { Breadcrumb, buildBreadcrumbsFromPath } from '@/components/navigation/Breadcrumb';
import { Edit3, Clock, FileText, ChevronDown } from 'lucide-react';

interface FileHeaderProps {
  fileName: string;
  filePath: string;
  clientSlug: string;
  clientName: string;
  lastModified?: string;
  onEditClick?: () => void;
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
          {/* Edit Button - Primary turquoise accent */}
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
  isEditMode?: boolean;
  className?: string;
}

export function CompactFileHeader({
  fileName,
  lastModified,
  onEditClick,
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
  return (
    <button
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
      <ChevronDown className="h-3 w-3" />
    </button>
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
