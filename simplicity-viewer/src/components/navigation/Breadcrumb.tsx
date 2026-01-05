'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronRight, Home, Folder, FileText } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
  type?: 'home' | 'folder' | 'file';
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const getIcon = (type: BreadcrumbItem['type']) => {
    switch (type) {
      case 'home':
        return <Home className="h-3.5 w-3.5" />;
      case 'folder':
        return <Folder className="h-3.5 w-3.5" />;
      case 'file':
        return <FileText className="h-3.5 w-3.5" />;
      default:
        return null;
    }
  };

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center', className)}>
      <ol className="flex items-center gap-1 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const icon = getIcon(item.type);

          return (
            <li key={index} className="flex items-center">
              {/* Separator */}
              {index > 0 && (
                <ChevronRight className="h-3.5 w-3.5 mx-1.5 text-simplicity-gray-300 flex-shrink-0" />
              )}

              {/* Link or Text */}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1.5',
                    'text-simplicity-gray-500 hover:text-simplicity-charcoal',
                    'transition-colors duration-150',
                    'rounded px-1.5 py-0.5 -mx-1.5',
                    'hover:bg-simplicity-gray-100'
                  )}
                >
                  {icon}
                  <span className="truncate max-w-[150px]">{item.label}</span>
                </Link>
              ) : (
                <span
                  className={cn(
                    'flex items-center gap-1.5 px-1.5 py-0.5',
                    isLast
                      ? 'text-simplicity-charcoal font-medium'
                      : 'text-simplicity-gray-500'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {icon}
                  <span className="truncate max-w-[200px]">{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Helper to build breadcrumb items from a file path
export function buildBreadcrumbsFromPath(
  clientSlug: string,
  clientName: string,
  filePath: string
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    {
      label: clientName,
      href: `/client/${clientSlug}`,
      type: 'home',
    },
  ];

  // Split path and filter empty segments
  const segments = filePath.split('/').filter(Boolean);

  // Build cumulative path for each segment
  let cumulativePath = '';

  segments.forEach((segment, index) => {
    cumulativePath += `/${segment}`;
    const isLast = index === segments.length - 1;

    // Clean up folder names (remove numeric prefixes like "01-")
    const cleanLabel = segment.replace(/^\d+-/, '').replace(/-/g, ' ');
    const capitalizedLabel = cleanLabel.charAt(0).toUpperCase() + cleanLabel.slice(1);

    items.push({
      label: capitalizedLabel,
      href: isLast ? undefined : `/client/${clientSlug}?path=${encodeURIComponent(cumulativePath)}`,
      type: isLast ? 'file' : 'folder',
      isCurrentPage: isLast,
    });
  });

  return items;
}

// Compact breadcrumb for tight spaces
interface CompactBreadcrumbProps {
  currentPath: string;
  className?: string;
}

export function CompactBreadcrumb({ currentPath, className }: CompactBreadcrumbProps) {
  // Show only the last 2 segments
  const segments = currentPath.split('/').filter(Boolean);
  const displaySegments = segments.slice(-2);

  return (
    <div className={cn('flex items-center gap-1 text-xs text-simplicity-gray-400', className)}>
      {segments.length > 2 && (
        <>
          <span>...</span>
          <ChevronRight className="h-3 w-3" />
        </>
      )}
      {displaySegments.map((segment, index) => {
        const cleanLabel = segment.replace(/^\d+-/, '').replace(/-/g, ' ');
        const isLast = index === displaySegments.length - 1;

        return (
          <span key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="h-3 w-3 mx-1" />}
            <span className={cn(isLast && 'text-simplicity-gray-600 font-medium')}>
              {cleanLabel}
            </span>
          </span>
        );
      })}
    </div>
  );
}
