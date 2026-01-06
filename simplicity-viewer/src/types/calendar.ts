// Content Calendar Type Definitions for Simplicity Viewer

export type ContentType = 'reel' | 'story' | 'post' | 'carousel' | 'video' | 'blog';
export type Platform = 'instagram' | 'tiktok' | 'youtube' | 'facebook' | 'twitter' | 'linkedin';
export type ContentStatus = 'idea' | 'scripted' | 'production' | 'scheduled' | 'published';

export interface ContentItem {
  id: string;
  clientSlug: string;
  title: string;
  description?: string;
  type: ContentType;
  platform: Platform;
  status: ContentStatus;

  // Dates
  scheduledDate: string; // ISO date string
  publishedDate?: string;

  // Content details
  hook?: string;
  pillar?: string;
  hashtags?: string[];

  // References
  relatedAssets?: string[];
  scriptPath?: string;

  // Metadata
  createdAt: string;
  updatedAt: string;
}

// Display configurations
export const contentTypeConfig: Record<ContentType, { label: string; icon: string; color: string }> = {
  reel: { label: 'Reel', icon: 'Film', color: 'purple' },
  story: { label: 'Story', icon: 'Circle', color: 'pink' },
  post: { label: 'Post', icon: 'Image', color: 'blue' },
  carousel: { label: 'Carousel', icon: 'Layers', color: 'green' },
  video: { label: 'Video', icon: 'Video', color: 'red' },
  blog: { label: 'Blog', icon: 'FileText', color: 'amber' },
};

export const platformConfig: Record<Platform, { label: string; icon: string; color: string }> = {
  instagram: { label: 'Instagram', icon: 'Instagram', color: 'pink' },
  tiktok: { label: 'TikTok', icon: 'Music2', color: 'black' },
  youtube: { label: 'YouTube', icon: 'Youtube', color: 'red' },
  facebook: { label: 'Facebook', icon: 'Facebook', color: 'blue' },
  twitter: { label: 'X/Twitter', icon: 'Twitter', color: 'sky' },
  linkedin: { label: 'LinkedIn', icon: 'Linkedin', color: 'blue' },
};

export const contentStatusConfig: Record<ContentStatus, { label: string; color: string }> = {
  idea: { label: 'Idea', color: 'gray' },
  scripted: { label: 'Scripted', color: 'blue' },
  production: { label: 'In Production', color: 'amber' },
  scheduled: { label: 'Scheduled', color: 'purple' },
  published: { label: 'Published', color: 'green' },
};

// Helper to generate unique IDs
export function generateContentId(): string {
  return `content_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Get week dates
export function getWeekDates(date: Date): Date[] {
  const week: Date[] = [];
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay()); // Start from Sunday

  for (let i = 0; i < 7; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    week.push(day);
  }

  return week;
}

// Format date for display
export function formatCalendarDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

// Check if two dates are the same day
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
