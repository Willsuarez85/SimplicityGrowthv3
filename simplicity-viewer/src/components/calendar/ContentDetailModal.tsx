'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Calendar,
  Clock,
  Hash,
  FileText,
  Image as ImageIcon,
  Film,
  Layers,
  Video,
  Circle,
  Music2,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Linkedin,
} from 'lucide-react';
import type { ContentItem, ContentType, Platform, ContentStatus } from '@/types/calendar';
import { contentTypeConfig, platformConfig, contentStatusConfig } from '@/types/calendar';

// ============================================================================
// Props
// ============================================================================

export interface ContentDetailModalProps {
  content: ContentItem | null;
  isOpen: boolean;
  onClose: () => void;
  onViewScript?: (scriptPath: string) => void;
}

// ============================================================================
// Icon Mapping
// ============================================================================

const contentTypeIcons: Record<ContentType, React.ComponentType<{ className?: string }>> = {
  reel: Film,
  story: Circle,
  post: ImageIcon,
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
// Helper Components
// ============================================================================

function ContentTypeBadge({ type }: { type: ContentType }) {
  const config = contentTypeConfig[type];
  const Icon = contentTypeIcons[type];

  const colorClasses: Record<string, string> = {
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
    pink: 'bg-pink-100 text-pink-700 border-pink-200',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    green: 'bg-green-100 text-green-700 border-green-200',
    red: 'bg-red-100 text-red-700 border-red-200',
    amber: 'bg-amber-100 text-amber-700 border-amber-200',
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
      colorClasses[config.color] || colorClasses.blue
    )}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}

function PlatformBadge({ platform }: { platform: Platform }) {
  const config = platformConfig[platform];
  const Icon = platformIcons[platform];

  const colorClasses: Record<string, string> = {
    pink: 'bg-pink-100 text-pink-700',
    black: 'bg-gray-900 text-white',
    red: 'bg-red-100 text-red-700',
    blue: 'bg-blue-100 text-blue-700',
    sky: 'bg-sky-100 text-sky-700',
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
      colorClasses[config.color] || colorClasses.blue
    )}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}

function StatusBadge({ status }: { status: ContentStatus }) {
  const config = contentStatusConfig[status];

  const colorClasses: Record<string, string> = {
    gray: 'bg-gray-100 text-gray-700',
    blue: 'bg-blue-100 text-blue-700',
    amber: 'bg-amber-100 text-amber-700',
    purple: 'bg-purple-100 text-purple-700',
    green: 'bg-green-100 text-green-700',
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
      colorClasses[config.color] || colorClasses.gray
    )}>
      {config.label}
    </span>
  );
}

// ============================================================================
// Format Date Helper
// ============================================================================

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

// ============================================================================
// ContentDetailModal Component
// ============================================================================

export function ContentDetailModal({
  content,
  isOpen,
  onClose,
  onViewScript,
}: ContentDetailModalProps) {
  if (!content) return null;

  const handleViewScript = () => {
    if (content.scriptPath && onViewScript) {
      onViewScript(content.scriptPath);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="text-lg text-simplicity-charcoal leading-tight pr-8">
              {content.title}
            </DialogTitle>
          </div>
          <DialogDescription className="sr-only">
            Content details for {content.title}
          </DialogDescription>

          {/* Type, Platform, Status Row */}
          <div className="flex flex-wrap items-center gap-2">
            <ContentTypeBadge type={content.type} />
            <PlatformBadge platform={content.platform} />
            <StatusBadge status={content.status} />
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="py-4 space-y-5">
          {/* Description */}
          {content.description && (
            <div>
              <h4 className="text-sm font-medium text-simplicity-charcoal mb-2">
                Description
              </h4>
              <p className="text-sm text-simplicity-gray-600 leading-relaxed">
                {content.description}
              </p>
            </div>
          )}

          {/* Hook */}
          {content.hook && (
            <div>
              <h4 className="text-sm font-medium text-simplicity-charcoal mb-2">
                Hook
              </h4>
              <p className="text-sm text-simplicity-gray-600 italic bg-simplicity-gray-50 p-3 rounded-lg border border-simplicity-gray-100">
                &ldquo;{content.hook}&rdquo;
              </p>
            </div>
          )}

          {/* Pillar */}
          {content.pillar && (
            <div>
              <h4 className="text-sm font-medium text-simplicity-charcoal mb-2">
                Content Pillar
              </h4>
              <Badge variant="secondary" className="bg-simplicity-turquoise/10 text-simplicity-turquoise border-0">
                {content.pillar}
              </Badge>
            </div>
          )}

          {/* Schedule */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-simplicity-charcoal">
              Schedule
            </h4>

            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-simplicity-gray-400" />
              <span className="text-simplicity-gray-600">
                {formatDate(content.scheduledDate)}
              </span>
              <Clock className="h-4 w-4 text-simplicity-gray-400 ml-2" />
              <span className="text-simplicity-gray-600">
                {formatTime(content.scheduledDate)}
              </span>
            </div>

            {content.publishedDate && (
              <div className="flex items-center gap-3 text-sm text-green-600">
                <Calendar className="h-4 w-4 text-green-400" />
                <span>Published: {formatDate(content.publishedDate)}</span>
              </div>
            )}
          </div>

          {/* Hashtags */}
          {content.hashtags && content.hashtags.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-simplicity-charcoal mb-2 flex items-center gap-2">
                <Hash className="h-4 w-4" />
                Hashtags
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {content.hashtags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs text-simplicity-turquoise bg-simplicity-turquoise/10 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Assets */}
          {content.relatedAssets && content.relatedAssets.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-simplicity-charcoal mb-2 flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Related Assets ({content.relatedAssets.length})
              </h4>
              <div className="space-y-1">
                {content.relatedAssets.map((asset, index) => (
                  <div
                    key={index}
                    className="text-sm text-simplicity-gray-600 bg-simplicity-gray-50 px-3 py-2 rounded flex items-center gap-2"
                  >
                    <FileText className="h-3 w-3 text-simplicity-gray-400" />
                    <span className="truncate flex-1">{asset}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-simplicity-gray-100 flex items-center justify-between">
          <div className="text-xs text-simplicity-gray-400">
            Created: {formatDate(content.createdAt)}
          </div>

          <div className="flex items-center gap-2">
            {content.scriptPath && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewScript}
                className="text-simplicity-turquoise border-simplicity-turquoise/30 hover:bg-simplicity-turquoise/5"
              >
                <FileText className="h-4 w-4 mr-1" />
                View Script
              </Button>
            )}
            <Button
              size="sm"
              onClick={onClose}
              className="bg-simplicity-charcoal hover:bg-simplicity-charcoal/90"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ContentDetailModal;
