'use client';

import * as React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import {
  Calendar,
  Clock,
  User,
  FolderOpen,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  MessageSquare,
} from 'lucide-react';
import type {
  TaskRequest,
  TaskStatus,
  TaskPriority,
  TaskCategory,
} from '@/types/task';
import {
  taskStatusConfig,
  taskPriorityConfig,
  taskCategoryConfig,
} from '@/types/task';

// ============================================================================
// Props
// ============================================================================

export interface TaskDetailPanelProps {
  task: TaskRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange?: (taskId: string, status: TaskStatus) => void;
  onDelete?: (taskId: string) => void;
}

// ============================================================================
// Status Dropdown Component
// ============================================================================

interface StatusDropdownProps {
  currentStatus: TaskStatus;
  onStatusChange: (status: TaskStatus) => void;
}

function StatusDropdown({ currentStatus, onStatusChange }: StatusDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const statuses: TaskStatus[] = ['pending', 'in_progress', 'review', 'completed', 'cancelled'];
  const config = taskStatusConfig[currentStatus];

  const getStatusColor = (status: TaskStatus) => {
    const colors: Record<string, string> = {
      gray: 'bg-gray-100 text-gray-700 border-gray-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      green: 'bg-green-100 text-green-700 border-green-200',
      red: 'bg-red-100 text-red-700 border-red-200',
    };
    return colors[taskStatusConfig[status].color] || colors.gray;
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium',
          'transition-all hover:opacity-80',
          getStatusColor(currentStatus)
        )}
      >
        {config.label}
        <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-simplicity-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {statuses.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => {
                onStatusChange(status);
                setIsOpen(false);
              }}
              className={cn(
                'w-full px-3 py-2 text-left text-sm',
                'hover:bg-simplicity-gray-50 transition-colors',
                status === currentStatus && 'bg-simplicity-gray-100 font-medium'
              )}
            >
              {taskStatusConfig[status].label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Priority Badge
// ============================================================================

function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const config = taskPriorityConfig[priority];

  const colorClasses: Record<string, string> = {
    gray: 'bg-gray-100 text-gray-700',
    blue: 'bg-blue-100 text-blue-700',
    amber: 'bg-amber-100 text-amber-700',
    red: 'bg-red-100 text-red-700',
  };

  const iconClasses: Record<string, string> = {
    gray: 'text-gray-400',
    blue: 'text-blue-400',
    amber: 'text-amber-400',
    red: 'text-red-400',
  };

  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium', colorClasses[config.color])}>
      <AlertCircle className={cn('h-3 w-3', iconClasses[config.color])} />
      {config.label} Priority
    </span>
  );
}

// ============================================================================
// Category Badge
// ============================================================================

function CategoryBadge({ category }: { category: TaskCategory }) {
  const config = taskCategoryConfig[category];

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-simplicity-gray-100 text-simplicity-gray-700">
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

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return formatDate(dateString);
}

// ============================================================================
// TaskDetailPanel Component
// ============================================================================

export function TaskDetailPanel({
  task,
  isOpen,
  onClose,
  onStatusChange,
  onDelete,
}: TaskDetailPanelProps) {
  if (!task) return null;

  const handleStatusChange = (newStatus: TaskStatus) => {
    if (onStatusChange) {
      onStatusChange(task.id, newStatus);
    }
  };

  const handleDelete = () => {
    if (onDelete && confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
      onClose();
    }
  };

  const isDueSoon = task.dueDate && new Date(task.dueDate) < new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader className="space-y-1 pb-4 border-b border-simplicity-gray-100">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 flex-1">
              <SheetTitle className="text-lg text-simplicity-charcoal leading-tight">
                {task.title}
              </SheetTitle>
              <SheetDescription className="text-sm text-simplicity-gray-500">
                Created {formatRelativeTime(task.createdAt)}
              </SheetDescription>
            </div>
          </div>

          {/* Status and Priority Row */}
          <div className="flex items-center gap-2 pt-2">
            <StatusDropdown
              currentStatus={task.status}
              onStatusChange={handleStatusChange}
            />
            <PriorityBadge priority={task.priority} />
          </div>
        </SheetHeader>

        {/* Content */}
        <div className="py-6 space-y-6">
          {/* Description */}
          <div>
            <h4 className="text-sm font-medium text-simplicity-charcoal mb-2">Description</h4>
            <p className="text-sm text-simplicity-gray-600 leading-relaxed">
              {task.description || 'No description provided.'}
            </p>
          </div>

          {/* Category */}
          <div>
            <h4 className="text-sm font-medium text-simplicity-charcoal mb-2">Category</h4>
            <CategoryBadge category={task.category} />
          </div>

          {/* Dates */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-simplicity-charcoal">Timeline</h4>

            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-simplicity-gray-400" />
              <span className="text-simplicity-gray-600">
                Created: {formatDate(task.createdAt)}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-simplicity-gray-400" />
              <span className="text-simplicity-gray-600">
                Updated: {formatRelativeTime(task.updatedAt)}
              </span>
            </div>

            {task.dueDate && (
              <div className={cn(
                'flex items-center gap-3 text-sm',
                isOverdue && 'text-red-600',
                isDueSoon && !isOverdue && 'text-amber-600'
              )}>
                <Calendar className={cn(
                  'h-4 w-4',
                  isOverdue ? 'text-red-400' : isDueSoon ? 'text-amber-400' : 'text-simplicity-gray-400'
                )} />
                <span>
                  Due: {formatDate(task.dueDate)}
                  {isOverdue && ' (Overdue)'}
                  {isDueSoon && !isOverdue && ' (Due soon)'}
                </span>
              </div>
            )}
          </div>

          {/* Assignment */}
          {task.assignedAgent && (
            <div>
              <h4 className="text-sm font-medium text-simplicity-charcoal mb-2">Assigned To</h4>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-simplicity-turquoise/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-simplicity-turquoise" />
                </div>
                <span className="text-sm text-simplicity-gray-600 capitalize">
                  {task.assignedAgent.replace(/-/g, ' ')}
                </span>
              </div>
            </div>
          )}

          {/* Related Phase */}
          {task.relatedPhase && (
            <div>
              <h4 className="text-sm font-medium text-simplicity-charcoal mb-2">Related Phase</h4>
              <div className="flex items-center gap-2">
                <FolderOpen className="h-4 w-4 text-simplicity-gray-400" />
                <span className="text-sm text-simplicity-gray-600">
                  {task.relatedPhase}
                </span>
              </div>
            </div>
          )}

          {/* Notes */}
          {task.notes && task.notes.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-simplicity-charcoal mb-3">
                Notes ({task.notes.length})
              </h4>
              <div className="space-y-3">
                {task.notes.map((note) => (
                  <div
                    key={note.id}
                    className={cn(
                      'p-3 rounded-lg border',
                      note.author === 'user'
                        ? 'bg-simplicity-turquoise/5 border-simplicity-turquoise/20'
                        : note.author === 'agent'
                        ? 'bg-purple-50 border-purple-100'
                        : 'bg-simplicity-gray-50 border-simplicity-gray-100'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="h-3 w-3 text-simplicity-gray-400" />
                      <span className="text-xs font-medium text-simplicity-gray-500 capitalize">
                        {note.author}
                      </span>
                      <span className="text-xs text-simplicity-gray-400">
                        {formatRelativeTime(note.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-simplicity-gray-700">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-simplicity-gray-100 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete Task
          </Button>

          <div className="flex items-center gap-2">
            {task.status !== 'completed' && task.status !== 'cancelled' && (
              <Button
                size="sm"
                onClick={() => handleStatusChange('completed')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Mark Complete
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default TaskDetailPanel;
