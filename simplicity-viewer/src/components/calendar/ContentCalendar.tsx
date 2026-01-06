'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Plus,
  Filter,
  LayoutGrid,
  List,
} from 'lucide-react';
import type { ContentItem, Platform, ContentStatus, ContentType } from '@/types/calendar';
import { getWeekDates, isSameDay } from '@/types/calendar';
import { ContentCard } from './ContentCard';

// ============================================================================
// Types
// ============================================================================

export type CalendarViewMode = 'week' | 'list';

export interface ContentCalendarProps {
  items: ContentItem[];
  clientSlug: string;
  isLoading?: boolean;
  onItemClick?: (item: ContentItem) => void;
  onAddClick?: (date: Date) => void;
  className?: string;
}

// ============================================================================
// Filter Types
// ============================================================================

interface CalendarFilters {
  platforms: Platform[];
  statuses: ContentStatus[];
  types: ContentType[];
}

// ============================================================================
// ContentCalendar Component
// ============================================================================

export function ContentCalendar({
  items,
  clientSlug: _clientSlug,
  isLoading = false,
  onItemClick,
  onAddClick,
  className,
}: ContentCalendarProps) {
  // State
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [viewMode, setViewMode] = React.useState<CalendarViewMode>('week');
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, _setFilters] = React.useState<CalendarFilters>({
    platforms: [],
    statuses: [],
    types: [],
  });

  // Get week dates
  const weekDates = React.useMemo(() => getWeekDates(currentDate), [currentDate]);

  // Filter items
  const filteredItems = React.useMemo(() => {
    return items.filter((item) => {
      if (filters.platforms.length > 0 && !filters.platforms.includes(item.platform)) {
        return false;
      }
      if (filters.statuses.length > 0 && !filters.statuses.includes(item.status)) {
        return false;
      }
      if (filters.types.length > 0 && !filters.types.includes(item.type)) {
        return false;
      }
      return true;
    });
  }, [items, filters]);

  // Group items by date
  const itemsByDate = React.useMemo(() => {
    const grouped = new Map<string, ContentItem[]>();

    filteredItems.forEach((item) => {
      const dateKey = item.scheduledDate.split('T')[0];
      const existing = grouped.get(dateKey) || [];
      grouped.set(dateKey, [...existing, item]);
    });

    return grouped;
  }, [filteredItems]);

  // Navigation
  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get items for a specific date
  const getItemsForDate = (date: Date): ContentItem[] => {
    const dateKey = date.toISOString().split('T')[0];
    return itemsByDate.get(dateKey) || [];
  };

  // Check if date is today
  const isToday = (date: Date) => isSameDay(date, new Date());

  // Format month/year for header
  const formatMonthYear = () => {
    const start = weekDates[0];
    const end = weekDates[6];

    if (start.getMonth() === end.getMonth()) {
      return start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }

    return `${start.toLocaleDateString('en-US', { month: 'short' })} - ${end.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
  };

  if (isLoading) {
    return <ContentCalendarSkeleton />;
  }

  return (
    <Card className={cn('border-simplicity-gray-200', className)}>
      <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6">
        {/* Header Row */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <CardTitle className="text-base sm:text-lg text-simplicity-charcoal flex items-center gap-1.5 sm:gap-2">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-simplicity-turquoise" />
            <span className="hidden xs:inline">Content </span>Calendar
          </CardTitle>

          {/* View Toggle */}
          <div className="flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 bg-simplicity-gray-50 rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('week')}
              className={cn(
                'h-7 px-2',
                viewMode === 'week'
                  ? 'bg-white shadow-sm text-simplicity-charcoal'
                  : 'text-simplicity-gray-500 hover:text-simplicity-charcoal'
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('list')}
              className={cn(
                'h-6 sm:h-7 px-1.5 sm:px-2',
                viewMode === 'list'
                  ? 'bg-white shadow-sm text-simplicity-charcoal'
                  : 'text-simplicity-gray-500 hover:text-simplicity-charcoal'
              )}
            >
              <List className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation Row */}
        <div className="flex items-center justify-between pt-2 gap-2">
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousWeek}
              className="h-7 w-7 sm:h-8 sm:w-8 p-0 border-simplicity-gray-200"
            >
              <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
              className="h-7 sm:h-8 px-2 sm:px-3 text-xs border-simplicity-gray-200"
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextWeek}
              className="h-7 w-7 sm:h-8 sm:w-8 p-0 border-simplicity-gray-200"
            >
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
            <span className="text-xs sm:text-sm font-medium text-simplicity-charcoal ml-1 sm:ml-2 truncate">
              {formatMonthYear()}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'h-7 sm:h-8 px-2 sm:px-3 text-xs flex-shrink-0',
              showFilters && 'bg-simplicity-turquoise/10 text-simplicity-turquoise'
            )}
          >
            <Filter className="h-3 w-3 mr-0.5 sm:mr-1" />
            <span className="hidden sm:inline">Filters</span>
          </Button>
        </div>

        {/* Filter Panel (when visible) */}
        {showFilters && (
          <div className="pt-3 border-t border-simplicity-gray-100 mt-3">
            <p className="text-xs text-simplicity-gray-500 mb-2">
              Filter by platform, status, or content type
            </p>
            {/* Filter chips would go here - simplified for now */}
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs text-simplicity-gray-400">
                Filters coming soon...
              </span>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0 px-2 sm:px-6">
        {viewMode === 'week' ? (
          <WeekView
            weekDates={weekDates}
            getItemsForDate={getItemsForDate}
            isToday={isToday}
            onItemClick={onItemClick}
            onAddClick={onAddClick}
          />
        ) : (
          <ListView
            items={filteredItems}
            onItemClick={onItemClick}
          />
        )}
      </CardContent>
    </Card>
  );
}

// ============================================================================
// WeekView Component
// ============================================================================

interface WeekViewProps {
  weekDates: Date[];
  getItemsForDate: (date: Date) => ContentItem[];
  isToday: (date: Date) => boolean;
  onItemClick?: (item: ContentItem) => void;
  onAddClick?: (date: Date) => void;
}

function WeekView({
  weekDates,
  getItemsForDate,
  isToday,
  onItemClick,
  onAddClick,
}: WeekViewProps) {
  return (
    <div className="overflow-x-auto -mx-2 px-2 sm:mx-0 sm:px-0">
      <div className="grid grid-cols-7 gap-1 min-w-[560px] sm:min-w-0">
        {weekDates.map((date, idx) => {
          const dayItems = getItemsForDate(date);
          const isCurrentDay = isToday(date);

          return (
            <div
              key={idx}
              className={cn(
                'min-h-[100px] sm:min-h-[140px] p-1.5 sm:p-2 rounded-lg border transition-colors',
                isCurrentDay
                  ? 'bg-simplicity-turquoise/5 border-simplicity-turquoise/30'
                  : 'bg-simplicity-gray-50 border-simplicity-gray-100 hover:border-simplicity-gray-200'
              )}
            >
              {/* Day Header */}
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <div className="text-center">
                  <p className={cn(
                    'text-[9px] sm:text-[10px] uppercase tracking-wide',
                    isCurrentDay ? 'text-simplicity-turquoise' : 'text-simplicity-gray-400'
                  )}>
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <p className={cn(
                    'text-base sm:text-lg font-semibold',
                    isCurrentDay ? 'text-simplicity-turquoise' : 'text-simplicity-charcoal'
                  )}>
                    {date.getDate()}
                  </p>
                </div>
                {onAddClick && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onAddClick(date)}
                    className="h-5 w-5 sm:h-6 sm:w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  </Button>
                )}
              </div>

              {/* Day Items */}
              <div className="space-y-0.5 sm:space-y-1">
                {dayItems.slice(0, 3).map((item) => (
                  <ContentCard
                    key={item.id}
                    item={item}
                    variant="mini"
                    onClick={onItemClick}
                  />
                ))}
                {dayItems.length > 3 && (
                  <p className="text-[9px] sm:text-[10px] text-simplicity-gray-400 text-center">
                    +{dayItems.length - 3} more
                  </p>
                )}
                {dayItems.length === 0 && (
                  <p className="text-[9px] sm:text-[10px] text-simplicity-gray-300 text-center italic">
                    No content
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// ListView Component
// ============================================================================

interface ListViewProps {
  items: ContentItem[];
  onItemClick?: (item: ContentItem) => void;
}

function ListView({ items, onItemClick }: ListViewProps) {
  // Sort by scheduled date
  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) =>
      new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()
    );
  }, [items]);

  if (sortedItems.length === 0) {
    return (
      <div className="text-center py-8">
        <Calendar className="h-8 w-8 text-simplicity-gray-300 mx-auto mb-2" />
        <p className="text-sm text-simplicity-gray-500">No scheduled content</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sortedItems.map((item) => (
        <ContentCard
          key={item.id}
          item={item}
          variant="compact"
          onClick={onItemClick}
        />
      ))}
    </div>
  );
}

// ============================================================================
// ContentCalendarSkeleton
// ============================================================================

export function ContentCalendarSkeleton() {
  return (
    <Card className="border-simplicity-gray-200 animate-pulse">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="h-6 w-40 bg-simplicity-gray-200 rounded" />
          <div className="h-8 w-20 bg-simplicity-gray-200 rounded" />
        </div>
        <div className="flex items-center gap-2 pt-2">
          <div className="h-8 w-8 bg-simplicity-gray-200 rounded" />
          <div className="h-8 w-16 bg-simplicity-gray-200 rounded" />
          <div className="h-8 w-8 bg-simplicity-gray-200 rounded" />
          <div className="h-4 w-32 bg-simplicity-gray-100 rounded ml-2" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="min-h-[140px] p-2 rounded-lg bg-simplicity-gray-50"
            >
              <div className="h-4 w-8 bg-simplicity-gray-200 rounded mx-auto mb-1" />
              <div className="h-6 w-6 bg-simplicity-gray-200 rounded mx-auto mb-3" />
              <div className="space-y-1">
                <div className="h-5 w-full bg-simplicity-gray-200 rounded" />
                <div className="h-5 w-3/4 bg-simplicity-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// ClientCalendarSection - Ready-to-use section with mock data
// ============================================================================

export interface ClientCalendarSectionProps {
  clientSlug: string;
  className?: string;
}

export function ClientCalendarSection({
  clientSlug,
  className,
}: ClientCalendarSectionProps) {
  // Mock data for demonstration
  const mockItems: ContentItem[] = React.useMemo(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(today.getDate() + 2);
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 5);

    return [
      {
        id: '1',
        clientSlug,
        title: 'Behind the Scenes Reel',
        description: 'Show kitchen prep process',
        type: 'reel',
        platform: 'instagram',
        status: 'scheduled',
        scheduledDate: today.toISOString(),
        hook: 'Ever wondered how we make our famous tacos?',
        pillar: 'Behind the Scenes',
        createdAt: today.toISOString(),
        updatedAt: today.toISOString(),
      },
      {
        id: '2',
        clientSlug,
        title: 'Customer Testimonial',
        description: 'Interview with regular customer',
        type: 'video',
        platform: 'youtube',
        status: 'production',
        scheduledDate: tomorrow.toISOString(),
        pillar: 'Social Proof',
        createdAt: today.toISOString(),
        updatedAt: today.toISOString(),
      },
      {
        id: '3',
        clientSlug,
        title: 'Weekly Special Announcement',
        description: 'Promote carnitas special',
        type: 'post',
        platform: 'instagram',
        status: 'scripted',
        scheduledDate: tomorrow.toISOString(),
        pillar: 'Promotions',
        createdAt: today.toISOString(),
        updatedAt: today.toISOString(),
      },
      {
        id: '4',
        clientSlug,
        title: 'TikTok Dance Challenge',
        description: 'Staff dance with tacos',
        type: 'reel',
        platform: 'tiktok',
        status: 'idea',
        scheduledDate: dayAfter.toISOString(),
        pillar: 'Entertainment',
        createdAt: today.toISOString(),
        updatedAt: today.toISOString(),
      },
      {
        id: '5',
        clientSlug,
        title: 'Recipe Story Series',
        description: 'Quick salsa verde tutorial',
        type: 'story',
        platform: 'instagram',
        status: 'published',
        scheduledDate: new Date(today.getTime() - 86400000).toISOString(), // Yesterday
        publishedDate: new Date(today.getTime() - 86400000).toISOString(),
        pillar: 'Education',
        createdAt: today.toISOString(),
        updatedAt: today.toISOString(),
      },
      {
        id: '6',
        clientSlug,
        title: 'Weekend Brunch Carousel',
        description: 'Showcase brunch menu items',
        type: 'carousel',
        platform: 'instagram',
        status: 'scheduled',
        scheduledDate: nextWeek.toISOString(),
        pillar: 'Menu Highlights',
        createdAt: today.toISOString(),
        updatedAt: today.toISOString(),
      },
    ];
  }, [clientSlug]);

  const handleItemClick = (item: ContentItem) => {
    console.log('Content item clicked:', item);
    // TODO: Open content detail modal
  };

  const handleAddClick = (date: Date) => {
    console.log('Add content for date:', date);
    // TODO: Open content creation form
  };

  return (
    <ContentCalendar
      items={mockItems}
      clientSlug={clientSlug}
      onItemClick={handleItemClick}
      onAddClick={handleAddClick}
      className={className}
    />
  );
}
