'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Filter,
  SortAsc,
  SortDesc,
  X,
  ListFilter,
  Calendar,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { TaskCard, TaskCardSkeleton, TaskCardEmptyState } from './TaskCard';

// ============================================================================
// Types
// ============================================================================

export type SortField = 'createdAt' | 'dueDate' | 'priority' | 'status';
export type SortOrder = 'asc' | 'desc';

export interface TaskFilters {
  status?: TaskStatus[];
  priority?: TaskPriority[];
  category?: TaskCategory[];
  search?: string;
}

export interface TaskListProps {
  tasks: TaskRequest[];
  isLoading?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
  showFilters?: boolean;
  showSort?: boolean;
  onTaskSelect?: (task: TaskRequest) => void;
  emptyMessage?: string;
  emptyDescription?: string;
  className?: string;
}

// ============================================================================
// Filter Chip Component
// ============================================================================

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  color?: string;
}

function FilterChip({ label, isActive, onClick, color }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-2.5 py-1 text-xs font-medium rounded-full transition-all',
        'border focus:outline-none focus:ring-2 focus:ring-simplicity-turquoise/20',
        isActive
          ? 'bg-simplicity-turquoise text-white border-simplicity-turquoise'
          : 'bg-white text-simplicity-gray-600 border-simplicity-gray-200 hover:border-simplicity-turquoise/30',
        color && isActive && color
      )}
    >
      {label}
    </button>
  );
}

// ============================================================================
// Sort Button Component
// ============================================================================

interface SortButtonProps {
  field: SortField;
  label: string;
  currentField: SortField;
  currentOrder: SortOrder;
  onSort: (field: SortField) => void;
  icon?: React.ComponentType<{ className?: string }>;
}

function SortButton({
  field,
  label,
  currentField,
  currentOrder,
  onSort,
  icon: Icon,
}: SortButtonProps) {
  const isActive = currentField === field;

  return (
    <button
      type="button"
      onClick={() => onSort(field)}
      className={cn(
        'flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-all',
        'focus:outline-none focus:ring-2 focus:ring-simplicity-turquoise/20',
        isActive
          ? 'bg-simplicity-turquoise/10 text-simplicity-turquoise'
          : 'text-simplicity-gray-500 hover:bg-simplicity-gray-50'
      )}
    >
      {Icon && <Icon className="h-3 w-3" />}
      <span>{label}</span>
      {isActive && (
        currentOrder === 'asc'
          ? <SortAsc className="h-3 w-3" />
          : <SortDesc className="h-3 w-3" />
      )}
    </button>
  );
}

// ============================================================================
// Priority Weight for Sorting
// ============================================================================

const priorityWeight: Record<TaskPriority, number> = {
  urgent: 4,
  high: 3,
  medium: 2,
  low: 1,
};

const statusWeight: Record<TaskStatus, number> = {
  in_progress: 5,
  review: 4,
  pending: 3,
  completed: 2,
  cancelled: 1,
};

// ============================================================================
// TaskList Component
// ============================================================================

export function TaskList({
  tasks,
  isLoading = false,
  variant = 'default',
  showFilters = true,
  showSort = true,
  onTaskSelect,
  emptyMessage = 'No tasks found',
  emptyDescription = 'Create a new task or adjust your filters',
  className,
}: TaskListProps) {
  // Filter state
  const [filters, setFilters] = React.useState<TaskFilters>({
    status: [],
    priority: [],
    category: [],
    search: '',
  });

  // Sort state
  const [sortField, setSortField] = React.useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('desc');

  // Filter visibility
  const [showFilterPanel, setShowFilterPanel] = React.useState(false);

  // Toggle filter value
  const toggleFilter = <K extends keyof TaskFilters>(
    key: K,
    value: TaskFilters[K] extends (infer T)[] | undefined ? T : never
  ) => {
    setFilters((prev) => {
      const current = (prev[key] as unknown[]) || [];
      const newValues = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: newValues };
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      status: [],
      priority: [],
      category: [],
      search: '',
    });
  };

  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Filter tasks
  const filteredTasks = React.useMemo(() => {
    return tasks.filter((task) => {
      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(task.status)) return false;
      }

      // Priority filter
      if (filters.priority && filters.priority.length > 0) {
        if (!filters.priority.includes(task.priority)) return false;
      }

      // Category filter
      if (filters.category && filters.category.length > 0) {
        if (!filters.category.includes(task.category)) return false;
      }

      // Search filter
      if (filters.search && filters.search.trim()) {
        const search = filters.search.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(search);
        const matchesDescription = task.description.toLowerCase().includes(search);
        if (!matchesTitle && !matchesDescription) return false;
      }

      return true;
    });
  }, [tasks, filters]);

  // Sort tasks
  const sortedTasks = React.useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'dueDate':
          // Tasks without due date go to the end
          if (!a.dueDate && !b.dueDate) comparison = 0;
          else if (!a.dueDate) comparison = 1;
          else if (!b.dueDate) comparison = -1;
          else comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        case 'priority':
          comparison = priorityWeight[a.priority] - priorityWeight[b.priority];
          break;
        case 'status':
          comparison = statusWeight[a.status] - statusWeight[b.status];
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [filteredTasks, sortField, sortOrder]);

  // Count active filters
  const activeFilterCount = [
    filters.status?.length || 0,
    filters.priority?.length || 0,
    filters.category?.length || 0,
    filters.search ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  // Loading state
  if (isLoading) {
    return (
      <div className={cn('space-y-3', className)}>
        {[1, 2, 3].map((i) => (
          <TaskCardSkeleton key={i} variant={variant} />
        ))}
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Filter and Sort Controls */}
      {(showFilters || showSort) && (
        <div className="space-y-3">
          {/* Top Controls Row */}
          <div className="flex items-center justify-between gap-3">
            {/* Filter Toggle */}
            {showFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className={cn(
                  'text-simplicity-gray-600 border-simplicity-gray-200',
                  showFilterPanel && 'bg-simplicity-turquoise/5 border-simplicity-turquoise/30'
                )}
              >
                <ListFilter className="h-4 w-4 mr-1.5" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-simplicity-turquoise text-white">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            )}

            {/* Sort Controls */}
            {showSort && (
              <div className="flex items-center gap-1 bg-simplicity-gray-50 rounded-lg p-1">
                <SortButton
                  field="createdAt"
                  label="Date"
                  currentField={sortField}
                  currentOrder={sortOrder}
                  onSort={handleSort}
                  icon={Calendar}
                />
                <SortButton
                  field="dueDate"
                  label="Due"
                  currentField={sortField}
                  currentOrder={sortOrder}
                  onSort={handleSort}
                  icon={Clock}
                />
                <SortButton
                  field="priority"
                  label="Priority"
                  currentField={sortField}
                  currentOrder={sortOrder}
                  onSort={handleSort}
                  icon={AlertTriangle}
                />
              </div>
            )}
          </div>

          {/* Filter Panel */}
          {showFilters && showFilterPanel && (
            <div className="p-4 bg-simplicity-gray-50 rounded-xl space-y-4">
              {/* Status Filters */}
              <div>
                <label className="block text-xs font-medium text-simplicity-gray-600 mb-2">
                  Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(taskStatusConfig) as TaskStatus[]).map((status) => (
                    <FilterChip
                      key={status}
                      label={taskStatusConfig[status].label}
                      isActive={filters.status?.includes(status) || false}
                      onClick={() => toggleFilter('status', status)}
                    />
                  ))}
                </div>
              </div>

              {/* Priority Filters */}
              <div>
                <label className="block text-xs font-medium text-simplicity-gray-600 mb-2">
                  Priority
                </label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(taskPriorityConfig) as TaskPriority[]).map((priority) => (
                    <FilterChip
                      key={priority}
                      label={taskPriorityConfig[priority].label}
                      isActive={filters.priority?.includes(priority) || false}
                      onClick={() => toggleFilter('priority', priority)}
                    />
                  ))}
                </div>
              </div>

              {/* Category Filters */}
              <div>
                <label className="block text-xs font-medium text-simplicity-gray-600 mb-2">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(taskCategoryConfig) as TaskCategory[]).map((category) => (
                    <FilterChip
                      key={category}
                      label={taskCategoryConfig[category].label}
                      isActive={filters.category?.includes(category) || false}
                      onClick={() => toggleFilter('category', category)}
                    />
                  ))}
                </div>
              </div>

              {/* Search Input */}
              <div>
                <label className="block text-xs font-medium text-simplicity-gray-600 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={filters.search || ''}
                  onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                  placeholder="Search tasks..."
                  className={cn(
                    'w-full px-3 py-2 text-sm rounded-lg border transition-colors',
                    'bg-white text-simplicity-charcoal placeholder:text-simplicity-gray-400',
                    'border-simplicity-gray-200 focus:border-simplicity-turquoise focus:outline-none focus:ring-2 focus:ring-simplicity-turquoise/20'
                  )}
                />
              </div>

              {/* Clear Filters */}
              {activeFilterCount > 0 && (
                <div className="flex justify-end pt-2 border-t border-simplicity-gray-200">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-simplicity-gray-500 hover:text-simplicity-charcoal"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Results Count */}
      {tasks.length > 0 && (
        <div className="flex items-center justify-between text-xs text-simplicity-gray-500">
          <span>
            Showing {sortedTasks.length} of {tasks.length} task{tasks.length !== 1 ? 's' : ''}
          </span>
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-simplicity-turquoise hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Task List */}
      {sortedTasks.length === 0 ? (
        <TaskCardEmptyState
          message={emptyMessage}
          description={emptyDescription}
        />
      ) : (
        <div className={cn(
          'space-y-3',
          variant === 'compact' && 'space-y-2'
        )}>
          {sortedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              variant={variant}
              onSelect={onTaskSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// TaskListHeader Component
// ============================================================================

export interface TaskListHeaderProps {
  title?: string;
  count?: number;
  actions?: React.ReactNode;
  className?: string;
}

export function TaskListHeader({
  title = 'Tasks',
  count,
  actions,
  className,
}: TaskListHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-simplicity-charcoal">{title}</h2>
        {count !== undefined && (
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-simplicity-gray-100 text-simplicity-gray-600">
            {count}
          </span>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

// ============================================================================
// TaskListSection Component (with collapsible header)
// ============================================================================

export interface TaskListSectionProps {
  title: string;
  tasks: TaskRequest[];
  defaultExpanded?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
  onTaskSelect?: (task: TaskRequest) => void;
  className?: string;
}

export function TaskListSection({
  title,
  tasks,
  defaultExpanded = true,
  variant = 'compact',
  onTaskSelect,
  className,
}: TaskListSectionProps) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  if (tasks.length === 0) return null;

  return (
    <div className={cn('space-y-2', className)}>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 w-full text-left group"
      >
        <span
          className={cn(
            'transition-transform duration-200',
            isExpanded ? 'rotate-90' : 'rotate-0'
          )}
        >
          <Filter className="h-3 w-3 text-simplicity-gray-400" />
        </span>
        <span className="text-sm font-medium text-simplicity-gray-600 group-hover:text-simplicity-charcoal">
          {title}
        </span>
        <span className="text-xs text-simplicity-gray-400">({tasks.length})</span>
      </button>

      {isExpanded && (
        <div className="pl-5 space-y-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              variant={variant}
              onSelect={onTaskSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
