'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Send,
  X,
  Calendar,
  PenTool,
  Palette,
  Image,
  Target,
  Package,
  MoreHorizontal,
  AlertTriangle,
  Circle,
} from 'lucide-react';
import type {
  TaskRequest,
  TaskCategory,
  TaskPriority,
} from '@/types/task';
import {
  taskCategoryConfig,
  taskPriorityConfig,
  createTaskRequest,
} from '@/types/task';

// ============================================================================
// Form Input Styles
// ============================================================================

const inputBaseStyles = cn(
  'w-full px-3 py-2 text-sm rounded-lg border transition-colors',
  'bg-white text-simplicity-charcoal placeholder:text-simplicity-gray-400',
  'border-simplicity-gray-200 focus:border-simplicity-turquoise focus:outline-none focus:ring-2 focus:ring-simplicity-turquoise/20',
  'disabled:bg-simplicity-gray-50 disabled:text-simplicity-gray-400 disabled:cursor-not-allowed'
);

const labelStyles = 'block text-xs font-medium text-simplicity-gray-600 mb-1.5';
const errorStyles = 'text-xs text-red-500 mt-1';

// ============================================================================
// Category Icons
// ============================================================================

const categoryIcons: Record<TaskCategory, React.ComponentType<{ className?: string }>> = {
  content_creation: PenTool,
  brand_update: Palette,
  asset_generation: Image,
  strategy_revision: Target,
  deliverable_request: Package,
  other: MoreHorizontal,
};

// ============================================================================
// Priority Icons
// ============================================================================

const priorityIcons: Record<TaskPriority, React.ComponentType<{ className?: string }>> = {
  low: Circle,
  medium: Circle,
  high: AlertTriangle,
  urgent: AlertTriangle,
};

const priorityColors: Record<TaskPriority, string> = {
  low: 'text-gray-500',
  medium: 'text-blue-500',
  high: 'text-amber-500',
  urgent: 'text-red-500',
};

// ============================================================================
// Form Data Interface
// ============================================================================

export interface TaskFormData {
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  dueDate?: string;
  relatedPhase?: string;
}

// ============================================================================
// TaskRequestForm Props
// ============================================================================

export interface TaskRequestFormProps {
  clientSlug: string;
  phases?: string[];
  onSubmit: (task: TaskRequest) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  className?: string;
}

// ============================================================================
// TaskRequestForm Component
// ============================================================================

export function TaskRequestForm({
  clientSlug,
  phases = [],
  onSubmit,
  onCancel,
  isLoading = false,
  className,
}: TaskRequestFormProps) {
  // Form state
  const [formData, setFormData] = React.useState<TaskFormData>({
    title: '',
    description: '',
    category: 'content_creation',
    priority: 'medium',
    dueDate: '',
    relatedPhase: '',
  });

  // Validation errors
  const [errors, setErrors] = React.useState<Partial<Record<keyof TaskFormData, string>>>({});

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof TaskFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TaskFormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const task = createTaskRequest(clientSlug, {
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      priority: formData.priority,
      dueDate: formData.dueDate || undefined,
      relatedPhase: formData.relatedPhase || undefined,
    });

    onSubmit(task);
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      category: 'content_creation',
      priority: 'medium',
      dueDate: '',
      relatedPhase: '',
    });
    setErrors({});
  };

  return (
    <Card className={cn('border-simplicity-gray-200', className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg text-simplicity-charcoal flex items-center gap-2">
          <Send className="h-5 w-5 text-simplicity-turquoise" />
          New Task Request
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className={labelStyles}>
              Task Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Create Instagram Reels for January campaign"
              className={cn(inputBaseStyles, errors.title && 'border-red-300 focus:border-red-400 focus:ring-red-200')}
              disabled={isLoading}
            />
            {errors.title && <p className={errorStyles}>{errors.title}</p>}
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className={labelStyles}>
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what you need in detail. Include any specific requirements, preferences, or references..."
              rows={4}
              className={cn(inputBaseStyles, 'resize-none', errors.description && 'border-red-300 focus:border-red-400 focus:ring-red-200')}
              disabled={isLoading}
            />
            {errors.description && <p className={errorStyles}>{errors.description}</p>}
          </div>

          {/* Category and Priority Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Category Field */}
            <div>
              <label htmlFor="category" className={labelStyles}>
                Category
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={cn(inputBaseStyles, 'appearance-none pr-8')}
                  disabled={isLoading}
                >
                  {(Object.keys(taskCategoryConfig) as TaskCategory[]).map((cat) => (
                    <option key={cat} value={cat}>
                      {taskCategoryConfig[cat].label}
                    </option>
                  ))}
                </select>
                {/* Category Icon */}
                {(() => {
                  const Icon = categoryIcons[formData.category];
                  return (
                    <Icon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-simplicity-gray-400 pointer-events-none" />
                  );
                })()}
              </div>
            </div>

            {/* Priority Field */}
            <div>
              <label htmlFor="priority" className={labelStyles}>
                Priority
              </label>
              <div className="relative">
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className={cn(inputBaseStyles, 'appearance-none pr-8')}
                  disabled={isLoading}
                >
                  {(Object.keys(taskPriorityConfig) as TaskPriority[]).map((pri) => (
                    <option key={pri} value={pri}>
                      {taskPriorityConfig[pri].label}
                    </option>
                  ))}
                </select>
                {/* Priority Icon */}
                {(() => {
                  const Icon = priorityIcons[formData.priority];
                  return (
                    <Icon className={cn(
                      'absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none',
                      priorityColors[formData.priority]
                    )} />
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Due Date and Related Phase Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Due Date Field */}
            <div>
              <label htmlFor="dueDate" className={labelStyles}>
                Due Date <span className="text-simplicity-gray-400">(optional)</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={cn(inputBaseStyles, 'pr-8')}
                  disabled={isLoading}
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-simplicity-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Related Phase Field */}
            <div>
              <label htmlFor="relatedPhase" className={labelStyles}>
                Related Phase <span className="text-simplicity-gray-400">(optional)</span>
              </label>
              <select
                id="relatedPhase"
                name="relatedPhase"
                value={formData.relatedPhase}
                onChange={handleChange}
                className={cn(inputBaseStyles)}
                disabled={isLoading || phases.length === 0}
              >
                <option value="">Select phase...</option>
                {phases.map((phase) => (
                  <option key={phase} value={phase}>
                    {phase}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-simplicity-gray-100">
            {onCancel && (
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
                disabled={isLoading}
                className="text-simplicity-gray-500 hover:text-simplicity-charcoal"
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isLoading}
              className="text-simplicity-gray-500 border-simplicity-gray-200"
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-simplicity-turquoise hover:bg-simplicity-turquoise/90 text-white"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">
                    <Circle className="h-4 w-4" />
                  </span>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-1" />
                  Submit Request
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// Compact Form Variant
// ============================================================================

export interface TaskQuickFormProps {
  clientSlug: string;
  onSubmit: (task: TaskRequest) => void;
  placeholder?: string;
  className?: string;
}

export function TaskQuickForm({
  clientSlug,
  onSubmit,
  placeholder = 'Quickly describe what you need...',
  className,
}: TaskQuickFormProps) {
  const [title, setTitle] = React.useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || title.length < 5) return;

    const task = createTaskRequest(clientSlug, {
      title: title.trim(),
      description: title.trim(),
      category: 'other',
      priority: 'medium',
    });

    onSubmit(task);
    setTitle('');
  };

  return (
    <form
      onSubmit={handleQuickSubmit}
      className={cn(
        'flex items-center gap-2 p-2 rounded-lg border border-simplicity-gray-200 bg-white',
        'hover:border-simplicity-turquoise/30 transition-colors',
        className
      )}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-2 py-1 text-sm bg-transparent outline-none placeholder:text-simplicity-gray-400"
      />
      <Button
        type="submit"
        size="sm"
        disabled={title.length < 5}
        className={cn(
          'transition-all',
          title.length >= 5
            ? 'bg-simplicity-turquoise hover:bg-simplicity-turquoise/90 text-white'
            : 'bg-simplicity-gray-100 text-simplicity-gray-400'
        )}
      >
        <Send className="h-3 w-3" />
      </Button>
    </form>
  );
}
