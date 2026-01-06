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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
  Calendar,
  Film,
  Circle,
  Image as ImageIcon,
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
import type { ContentItem, ContentType, Platform } from '@/types/calendar';
import { contentTypeConfig, platformConfig, generateContentId } from '@/types/calendar';

// ============================================================================
// Props
// ============================================================================

export interface ContentCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: ContentItem) => void;
  clientSlug: string;
  initialDate?: Date;
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
// SelectableButton Component
// ============================================================================

interface SelectableButtonProps<T extends string> {
  value: T;
  selected: boolean;
  onClick: (value: T) => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
}

function SelectableButton<T extends string>({
  value,
  selected,
  onClick,
  icon: Icon,
  label,
  color,
}: SelectableButtonProps<T>) {
  const colorClasses: Record<string, string> = {
    purple: 'border-purple-300 bg-purple-50 text-purple-700',
    pink: 'border-pink-300 bg-pink-50 text-pink-700',
    blue: 'border-blue-300 bg-blue-50 text-blue-700',
    green: 'border-green-300 bg-green-50 text-green-700',
    red: 'border-red-300 bg-red-50 text-red-700',
    amber: 'border-amber-300 bg-amber-50 text-amber-700',
    black: 'border-gray-700 bg-gray-100 text-gray-900',
    sky: 'border-sky-300 bg-sky-50 text-sky-700',
  };

  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all',
        selected
          ? colorClasses[color] || colorClasses.blue
          : 'border-simplicity-gray-200 bg-white text-simplicity-gray-600 hover:border-simplicity-gray-300'
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

// ============================================================================
// ContentCreationModal Component
// ============================================================================

export function ContentCreationModal({
  isOpen,
  onClose,
  onSubmit,
  clientSlug,
  initialDate,
}: ContentCreationModalProps) {
  // Form state
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [scheduledDate, setScheduledDate] = React.useState(
    initialDate ? initialDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  );
  const [scheduledTime, setScheduledTime] = React.useState('10:00');
  const [contentType, setContentType] = React.useState<ContentType>('reel');
  const [platform, setPlatform] = React.useState<Platform>('instagram');
  const [hook, setHook] = React.useState('');

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDescription('');
      setScheduledDate(
        initialDate ? initialDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      );
      setScheduledTime('10:00');
      setContentType('reel');
      setPlatform('instagram');
      setHook('');
    }
  }, [isOpen, initialDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const now = new Date().toISOString();
    const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}:00`).toISOString();

    const newContent: ContentItem = {
      id: generateContentId(),
      clientSlug,
      title: title.trim(),
      description: description.trim() || undefined,
      type: contentType,
      platform,
      status: 'idea',
      scheduledDate: scheduledDateTime,
      hook: hook.trim() || undefined,
      createdAt: now,
      updatedAt: now,
    };

    onSubmit(newContent);
    onClose();
  };

  const contentTypes: ContentType[] = ['reel', 'story', 'post', 'carousel', 'video', 'blog'];
  const platforms: Platform[] = ['instagram', 'tiktok', 'youtube', 'facebook', 'twitter', 'linkedin'];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg text-simplicity-charcoal">
            Create New Content
          </DialogTitle>
          <DialogDescription className="text-sm text-simplicity-gray-500">
            Add a new piece of content to your calendar.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-simplicity-charcoal">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter content title..."
              className="w-full"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-simplicity-charcoal">
              Description
            </Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the content..."
              rows={2}
              className="w-full px-3 py-2 text-sm border border-simplicity-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-simplicity-turquoise/20 focus:border-simplicity-turquoise resize-none"
            />
          </div>

          {/* Content Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-simplicity-charcoal">
              Content Type <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {contentTypes.map((type) => (
                <SelectableButton
                  key={type}
                  value={type}
                  selected={contentType === type}
                  onClick={setContentType}
                  icon={contentTypeIcons[type]}
                  label={contentTypeConfig[type].label}
                  color={contentTypeConfig[type].color}
                />
              ))}
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-simplicity-charcoal">
              Platform <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {platforms.map((p) => (
                <SelectableButton
                  key={p}
                  value={p}
                  selected={platform === p}
                  onClick={setPlatform}
                  icon={platformIcons[p]}
                  label={platformConfig[p].label}
                  color={platformConfig[p].color}
                />
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-simplicity-charcoal flex items-center gap-2">
              <Calendar className="h-4 w-4 text-simplicity-gray-400" />
              Schedule <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-3">
              <Input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="flex-1"
                required
              />
              <Input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-32"
                required
              />
            </div>
          </div>

          {/* Hook (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="hook" className="text-sm font-medium text-simplicity-charcoal">
              Hook / Opening Line
            </Label>
            <Input
              id="hook"
              value={hook}
              onChange={(e) => setHook(e.target.value)}
              placeholder="The attention-grabbing opening..."
              className="w-full"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-simplicity-gray-100">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-simplicity-gray-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!title.trim()}
              className="bg-simplicity-turquoise hover:bg-simplicity-turquoise/90 text-white"
            >
              Create Content
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ContentCreationModal;
