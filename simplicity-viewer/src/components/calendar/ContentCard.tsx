'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Film,
  Circle,
  Image,
  Layers,
  Video,
  FileText,
  Instagram,
  Music2,
  Youtube,
  Facebook,
  Twitter,
  Linkedin,
} from 'lucide-react';
import type { ContentItem, ContentType, Platform, ContentStatus } from '@/types/calendar';
import { contentTypeConfig, platformConfig, contentStatusConfig } from '@/types/calendar';

// ============================================================================
// Icon Maps
// ============================================================================

const contentTypeIcons: Record<ContentType, React.ComponentType<{ className?: string }>> = {
  reel: Film,
  story: Circle,
  post: Image,
  carousel: Layers,
  video: Video,
  blog: FileText,
};

const platformIcons: Record<Platform, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  tiktok: Music2,
  youtube: Youtube,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
};

// ============================================================================
// Color Maps
// ============================================================================

const statusColors: Record<ContentStatus, string> = {
  idea: 'bg-gray-100 border-gray-300 text-gray-600',
  scripted: 'bg-blue-50 border-blue-300 text-blue-700',
  production: 'bg-amber-50 border-amber-300 text-amber-700',
  scheduled: 'bg-purple-50 border-purple-300 text-purple-700',
  published: 'bg-green-50 border-green-300 text-green-700',
};

const platformColors: Record<Platform, string> = {
  instagram: 'text-pink-500',
  tiktok: 'text-gray-900',
  youtube: 'text-red-500',
  facebook: 'text-blue-600',
  twitter: 'text-sky-500',
  linkedin: 'text-blue-700',
};

const typeColors: Record<ContentType, string> = {
  reel: 'text-purple-500',
  story: 'text-pink-500',
  post: 'text-blue-500',
  carousel: 'text-green-500',
  video: 'text-red-500',
  blog: 'text-amber-500',
};

// ============================================================================
// ContentCard Component
// ============================================================================

export interface ContentCardProps {
  item: ContentItem;
  variant?: 'default' | 'compact' | 'mini';
  onClick?: (item: ContentItem) => void;
  className?: string;
}

export function ContentCard({
  item,
  variant = 'default',
  onClick,
  className,
}: ContentCardProps) {
  const TypeIcon = contentTypeIcons[item.type];
  const PlatformIcon = platformIcons[item.platform];

  const handleClick = () => {
    if (onClick) {
      onClick(item);
    }
  };

  // Mini variant - just icon and platform
  if (variant === 'mini') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          'flex items-center gap-1 px-1.5 py-0.5 rounded text-xs',
          'border transition-all hover:shadow-sm cursor-pointer',
          statusColors[item.status],
          className
        )}
        title={item.title}
      >
        <PlatformIcon className={cn('h-3 w-3', platformColors[item.platform])} />
        <TypeIcon className={cn('h-3 w-3', typeColors[item.type])} />
      </button>
    );
  }

  // Compact variant - single line
  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          'flex items-center gap-2 px-2 py-1.5 rounded-md w-full text-left',
          'border transition-all hover:shadow-sm cursor-pointer',
          statusColors[item.status],
          className
        )}
      >
        <PlatformIcon className={cn('h-3.5 w-3.5 flex-shrink-0', platformColors[item.platform])} />
        <span className="text-xs font-medium truncate flex-1">{item.title}</span>
        <TypeIcon className={cn('h-3.5 w-3.5 flex-shrink-0', typeColors[item.type])} />
      </button>
    );
  }

  // Default variant - full card
  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'flex flex-col gap-2 p-3 rounded-lg w-full text-left',
        'border-2 transition-all hover:shadow-md cursor-pointer',
        statusColors[item.status],
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <PlatformIcon className={cn('h-4 w-4', platformColors[item.platform])} />
          <span className="text-xs font-medium text-gray-500">
            {platformConfig[item.platform].label}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <TypeIcon className={cn('h-4 w-4', typeColors[item.type])} />
          <span className="text-xs text-gray-500">
            {contentTypeConfig[item.type].label}
          </span>
        </div>
      </div>

      {/* Title */}
      <h4 className="text-sm font-semibold line-clamp-2">
        {item.title}
      </h4>

      {/* Hook Preview */}
      {item.hook && (
        <p className="text-xs text-gray-600 line-clamp-1 italic">
          &ldquo;{item.hook}&rdquo;
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-current/10">
        <span className="text-xs font-medium">
          {contentStatusConfig[item.status].label}
        </span>
        {item.pillar && (
          <span className="text-xs text-gray-500 truncate max-w-[100px]">
            {item.pillar}
          </span>
        )}
      </div>
    </button>
  );
}

// ============================================================================
// ContentCardSkeleton
// ============================================================================

export function ContentCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'compact' | 'mini' }) {
  if (variant === 'mini') {
    return (
      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-gray-100 animate-pulse">
        <div className="h-3 w-3 rounded bg-gray-200" />
        <div className="h-3 w-3 rounded bg-gray-200" />
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 px-2 py-1.5 rounded-md border border-gray-200 animate-pulse">
        <div className="h-3.5 w-3.5 rounded bg-gray-200" />
        <div className="h-3 w-24 rounded bg-gray-200 flex-1" />
        <div className="h-3.5 w-3.5 rounded bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-3 rounded-lg border-2 border-gray-200 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 rounded bg-gray-200" />
          <div className="h-3 w-16 rounded bg-gray-200" />
        </div>
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 rounded bg-gray-200" />
          <div className="h-3 w-12 rounded bg-gray-200" />
        </div>
      </div>
      <div className="h-4 w-3/4 rounded bg-gray-200" />
      <div className="h-3 w-full rounded bg-gray-200" />
      <div className="flex items-center justify-between pt-1 border-t border-gray-100">
        <div className="h-3 w-16 rounded bg-gray-200" />
        <div className="h-3 w-20 rounded bg-gray-200" />
      </div>
    </div>
  );
}
