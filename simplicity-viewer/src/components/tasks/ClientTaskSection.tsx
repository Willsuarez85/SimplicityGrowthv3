'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Plus,
  X,
  ListTodo,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { TaskRequest } from '@/types/task';
import { TaskRequestForm } from './TaskRequestForm';
import { TaskList } from './TaskList';

// ============================================================================
// Mock Data (will be replaced with real data source later)
// ============================================================================

const mockTasks: TaskRequest[] = [
  {
    id: 'task_001',
    clientSlug: 'example-client',
    title: 'Create Instagram Reels for January Campaign',
    description: 'Produce 4 short-form videos showcasing new product line with trending audio and engaging hooks.',
    category: 'content_creation',
    priority: 'high',
    status: 'in_progress',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    assignedAgent: 'creative-director',
    relatedPhase: '03-creative',
  },
  {
    id: 'task_002',
    clientSlug: 'example-client',
    title: 'Update Brand Colors for Spring',
    description: 'Refresh the brand color palette to include spring seasonal accents while maintaining core identity.',
    category: 'brand_update',
    priority: 'medium',
    status: 'pending',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    relatedPhase: '02-strategy',
  },
  {
    id: 'task_003',
    clientSlug: 'example-client',
    title: 'Generate Product Photography Assets',
    description: 'Create AI-generated product images for the new menu items using brand visual guidelines.',
    category: 'asset_generation',
    priority: 'urgent',
    status: 'review',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    assignedAgent: 'prompt-asset-engineer',
    relatedPhase: '04-assets',
    notes: [
      {
        id: 'note_001',
        content: 'Initial batch of 6 images ready for review',
        author: 'agent',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    id: 'task_004',
    clientSlug: 'example-client',
    title: 'Weekly Content Calendar Review',
    description: 'Review and approve the content calendar for the upcoming week including all platform posts.',
    category: 'strategy_revision',
    priority: 'low',
    status: 'completed',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    relatedPhase: '02-strategy',
  },
];

// ============================================================================
// Props
// ============================================================================

export interface ClientTaskSectionProps {
  clientSlug: string;
  phases?: string[];
  className?: string;
}

// ============================================================================
// ClientTaskSection Component
// ============================================================================

export function ClientTaskSection({
  clientSlug,
  phases = [],
  className,
}: ClientTaskSectionProps) {
  // State
  const [tasks, setTasks] = React.useState<TaskRequest[]>(() =>
    mockTasks.map(t => ({ ...t, clientSlug }))
  );
  const [showForm, setShowForm] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(true);

  // Handle new task submission
  const handleSubmit = (task: TaskRequest) => {
    setTasks((prev) => [task, ...prev]);
    setShowForm(false);
  };

  // Handle task selection
  const handleTaskSelect = (task: TaskRequest) => {
    // TODO: Open detail modal or side panel
    console.log('Selected task:', task);
  };

  // Filter active tasks (not completed/cancelled)
  const activeTasks = tasks.filter(
    (t) => t.status !== 'completed' && t.status !== 'cancelled'
  );
  const completedTasks = tasks.filter(
    (t) => t.status === 'completed' || t.status === 'cancelled'
  );

  return (
    <div className={cn('space-y-4', className)}>
      {/* Task Section Header */}
      <Card className="border-simplicity-gray-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 group"
            >
              <div className="p-2 rounded-lg bg-simplicity-turquoise/10">
                <ListTodo className="h-5 w-5 text-simplicity-turquoise" />
              </div>
              <div className="text-left">
                <CardTitle className="text-base text-simplicity-charcoal group-hover:text-simplicity-turquoise transition-colors">
                  Task Requests
                </CardTitle>
                <p className="text-xs text-simplicity-gray-500">
                  {activeTasks.length} active • {completedTasks.length} completed
                </p>
              </div>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-simplicity-gray-400 ml-2" />
              ) : (
                <ChevronDown className="h-4 w-4 text-simplicity-gray-400 ml-2" />
              )}
            </button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowForm(!showForm)}
              className={cn(
                'text-simplicity-gray-600 border-simplicity-gray-200',
                showForm && 'bg-simplicity-turquoise/5 border-simplicity-turquoise/30'
              )}
            >
              {showForm ? (
                <>
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-1" />
                  New Task
                </>
              )}
            </Button>
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent className="space-y-4">
            {/* Task Request Form (collapsible) */}
            {showForm && (
              <div className="p-4 bg-simplicity-gray-50 rounded-xl border border-simplicity-gray-100">
                <TaskRequestForm
                  clientSlug={clientSlug}
                  phases={phases}
                  onSubmit={handleSubmit}
                  onCancel={() => setShowForm(false)}
                  className="border-0 shadow-none bg-transparent"
                />
              </div>
            )}

            {/* Active Tasks List */}
            {activeTasks.length > 0 ? (
              <TaskList
                tasks={activeTasks}
                variant="compact"
                showFilters={false}
                showSort={false}
                onTaskSelect={handleTaskSelect}
                emptyMessage="No active tasks"
                emptyDescription="Create a new task request to get started"
              />
            ) : !showForm ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-xl bg-simplicity-gray-100 flex items-center justify-center mx-auto mb-3">
                  <ListTodo className="h-6 w-6 text-simplicity-gray-400" />
                </div>
                <h3 className="text-sm font-medium text-simplicity-charcoal mb-1">
                  No active tasks
                </h3>
                <p className="text-xs text-simplicity-gray-400 mb-4">
                  Request a new task to get started
                </p>
                <Button
                  size="sm"
                  onClick={() => setShowForm(true)}
                  className="bg-simplicity-turquoise hover:bg-simplicity-turquoise/90 text-white"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Request Task
                </Button>
              </div>
            ) : null}

            {/* Completed Tasks (collapsed by default) */}
            {completedTasks.length > 0 && (
              <CompletedTasksSection
                tasks={completedTasks}
                onTaskSelect={handleTaskSelect}
              />
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
}

// ============================================================================
// Completed Tasks Section (collapsible)
// ============================================================================

interface CompletedTasksSectionProps {
  tasks: TaskRequest[];
  onTaskSelect?: (task: TaskRequest) => void;
}

function CompletedTasksSection({ tasks, onTaskSelect }: CompletedTasksSectionProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="pt-3 border-t border-simplicity-gray-100">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xs text-simplicity-gray-500 hover:text-simplicity-gray-700 transition-colors w-full"
      >
        {isOpen ? (
          <ChevronUp className="h-3 w-3" />
        ) : (
          <ChevronDown className="h-3 w-3" />
        )}
        <span>
          {tasks.length} completed task{tasks.length !== 1 ? 's' : ''}
        </span>
      </button>

      {isOpen && (
        <div className="mt-3 space-y-2 opacity-60">
          <TaskList
            tasks={tasks}
            variant="compact"
            showFilters={false}
            showSort={false}
            onTaskSelect={onTaskSelect}
          />
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Compact Task Button (for header integration)
// ============================================================================

export interface TaskRequestButtonProps {
  onClick: () => void;
  className?: string;
}

export function TaskRequestButton({ onClick, className }: TaskRequestButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2.5',
        'border border-simplicity-gray-200 text-simplicity-charcoal',
        'text-sm font-medium rounded-lg',
        'hover:bg-simplicity-turquoise/5 hover:border-simplicity-turquoise/30',
        'transition-colors',
        className
      )}
    >
      <Plus className="h-4 w-4" />
      Request Task
    </button>
  );
}

// ============================================================================
// Export index helper
// ============================================================================

export { mockTasks };
