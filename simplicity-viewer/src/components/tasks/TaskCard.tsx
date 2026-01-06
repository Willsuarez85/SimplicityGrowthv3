'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Calendar,
  Clock,
  FileText,
  FolderOpen,
  User,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';
import type { TaskRequest } from '@/types/task';
import {
  TaskStatusBadge,
  TaskPriorityBadge,
  TaskCategoryBadge,
} from './TaskStatusBadge';

// ============================================================================
// TaskCard Component
// ============================================================================

export interface TaskCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  task: TaskRequest;
  variant?: 'default' | 'compact' | 'detailed';
  showCategory?: boolean;
  showRelatedFiles?: boolean;
  onSelect?: (task: TaskRequest) => void;
}

export function TaskCard({
  task,
  variant = 'default',
  showCategory = true,
  showRelatedFiles = false,
  onSelect,
  className,
  ...props
}: TaskCardProps) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(task);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  // Calculate days until due (or overdue)
  const getDueDateInfo = () => {
    if (!task.dueDate) return null;

    const now = new Date();
    const due = new Date(task.dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { text: `${Math.abs(diffDays)}d overdue`, isOverdue: true };
    } else if (diffDays === 0) {
      return { text: 'Due today', isOverdue: false };
    } else if (diffDays === 1) {
      return { text: 'Due tomorrow', isOverdue: false };
    } else {
      return { text: `${diffDays}d left`, isOverdue: false };
    }
  };

  const dueDateInfo = getDueDateInfo();
  const noteCount = task.notes?.length || 0;

  if (variant === 'compact') {
    return (
      <div
        onClick={handleClick}
        className={cn(
          'flex items-center gap-3 p-3 rounded-lg border border-simplicity-gray-200 bg-white',
          'hover:border-simplicity-turquoise/30 hover:shadow-sm transition-all cursor-pointer',
          className
        )}
        {...props}
      >
        <TaskStatusBadge status={task.status} size="xs" showLabel={false} />

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-simplicity-charcoal truncate">
            {task.title}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <TaskPriorityBadge priority={task.priority} size="xs" variant="ghost" />
            {dueDateInfo && (
              <span className={cn(
                'text-xs',
                dueDateInfo.isOverdue ? 'text-red-500' : 'text-simplicity-gray-400'
              )}>
                {dueDateInfo.text}
              </span>
            )}
          </div>
        </div>

        <ChevronRight className="h-4 w-4 text-simplicity-gray-300 flex-shrink-0" />
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <Card
        onClick={handleClick}
        className={cn(
          'cursor-pointer hover:shadow-lg transition-all duration-200',
          'border-simplicity-gray-200 hover:border-simplicity-turquoise/30',
          className
        )}
        {...props}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-simplicity-charcoal line-clamp-2">
                {task.title}
              </h3>
              <p className="text-sm text-simplicity-gray-500 mt-1 line-clamp-2">
                {task.description}
              </p>
            </div>
            <TaskStatusBadge status={task.status} size="sm" />
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-2">
            <TaskPriorityBadge priority={task.priority} size="sm" />
            {showCategory && (
              <TaskCategoryBadge category={task.category} size="sm" />
            )}
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-simplicity-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Created {formatDate(task.createdAt)}</span>
            </div>

            {task.dueDate && (
              <div className={cn(
                'flex items-center gap-1',
                dueDateInfo?.isOverdue && 'text-red-500'
              )}>
                <Clock className="h-3 w-3" />
                <span>{dueDateInfo?.text}</span>
              </div>
            )}

            {task.assignedAgent && (
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{task.assignedAgent}</span>
              </div>
            )}

            {noteCount > 0 && (
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                <span>{noteCount} note{noteCount !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>

          {/* Related Files */}
          {showRelatedFiles && task.relatedFiles && task.relatedFiles.length > 0 && (
            <div className="pt-2 border-t border-simplicity-gray-100">
              <div className="flex items-center gap-1 text-xs text-simplicity-gray-400 mb-1">
                <FileText className="h-3 w-3" />
                <span>Related files</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {task.relatedFiles.slice(0, 3).map((file, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-xs bg-simplicity-gray-50 text-simplicity-gray-600 rounded"
                  >
                    {file.split('/').pop()}
                  </span>
                ))}
                {task.relatedFiles.length > 3 && (
                  <span className="px-2 py-0.5 text-xs text-simplicity-gray-400">
                    +{task.relatedFiles.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Related Phase */}
          {task.relatedPhase && (
            <div className="flex items-center gap-1 text-xs text-simplicity-gray-400">
              <FolderOpen className="h-3 w-3" />
              <span>{task.relatedPhase}</span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card
      onClick={handleClick}
      className={cn(
        'cursor-pointer hover:shadow-md transition-all duration-200',
        'border-simplicity-gray-200 hover:border-simplicity-turquoise/30',
        className
      )}
      {...props}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Status indicator */}
          <TaskStatusBadge
            status={task.status}
            size="sm"
            showLabel={false}
            className="mt-0.5"
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-medium text-simplicity-charcoal line-clamp-1">
                {task.title}
              </h3>
              <TaskPriorityBadge
                priority={task.priority}
                size="xs"
                variant="ghost"
                showLabel={false}
              />
            </div>

            <p className="text-xs text-simplicity-gray-500 mt-1 line-clamp-2">
              {task.description}
            </p>

            <div className="flex items-center gap-3 mt-2">
              {showCategory && (
                <TaskCategoryBadge
                  category={task.category}
                  size="xs"
                  variant="ghost"
                />
              )}

              <div className="flex items-center gap-2 text-xs text-simplicity-gray-400">
                {dueDateInfo && (
                  <span className={cn(
                    dueDateInfo.isOverdue && 'text-red-500'
                  )}>
                    {dueDateInfo.text}
                  </span>
                )}

                {noteCount > 0 && (
                  <span className="flex items-center gap-0.5">
                    <MessageSquare className="h-3 w-3" />
                    {noteCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// TaskCardSkeleton Component
// ============================================================================

export function TaskCardSkeleton({
  variant = 'default'
}: {
  variant?: 'default' | 'compact' | 'detailed'
}) {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3 p-3 rounded-lg border border-simplicity-gray-200 bg-white animate-pulse">
        <div className="h-5 w-5 rounded-full bg-simplicity-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 bg-simplicity-gray-200 rounded" />
          <div className="h-3 w-1/2 bg-simplicity-gray-100 rounded" />
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <Card className="border-simplicity-gray-200 animate-pulse">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 space-y-2">
              <div className="h-5 w-3/4 bg-simplicity-gray-200 rounded" />
              <div className="h-4 w-full bg-simplicity-gray-100 rounded" />
            </div>
            <div className="h-6 w-20 bg-simplicity-gray-200 rounded-md" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <div className="h-5 w-16 bg-simplicity-gray-200 rounded-md" />
            <div className="h-5 w-24 bg-simplicity-gray-200 rounded-md" />
          </div>
          <div className="flex gap-4">
            <div className="h-3 w-20 bg-simplicity-gray-100 rounded" />
            <div className="h-3 w-16 bg-simplicity-gray-100 rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default skeleton
  return (
    <Card className="border-simplicity-gray-200 animate-pulse">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="h-6 w-6 rounded-full bg-simplicity-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 bg-simplicity-gray-200 rounded" />
            <div className="h-3 w-full bg-simplicity-gray-100 rounded" />
            <div className="flex gap-2 mt-2">
              <div className="h-4 w-20 bg-simplicity-gray-200 rounded" />
              <div className="h-4 w-12 bg-simplicity-gray-100 rounded" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// TaskCardEmpty State
// ============================================================================

export function TaskCardEmptyState({
  message = 'No tasks yet',
  description = 'Create a new task to get started'
}: {
  message?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-12 h-12 rounded-xl bg-simplicity-gray-100 flex items-center justify-center mb-3">
        <FileText className="h-6 w-6 text-simplicity-gray-400" />
      </div>
      <h3 className="text-sm font-medium text-simplicity-charcoal mb-1">
        {message}
      </h3>
      <p className="text-xs text-simplicity-gray-400 max-w-[200px]">
        {description}
      </p>
    </div>
  );
}
