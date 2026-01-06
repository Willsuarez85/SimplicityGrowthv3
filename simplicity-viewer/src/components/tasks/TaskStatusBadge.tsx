'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import {
  Clock,
  Loader2,
  Eye,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Circle,
  PenTool,
  Palette,
  Image,
  Target,
  Package,
  MoreHorizontal,
} from 'lucide-react';
import type {
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
// Icon Mapping
// ============================================================================

const statusIcons: Record<TaskStatus, React.ComponentType<{ className?: string }>> = {
  pending: Clock,
  in_progress: Loader2,
  review: Eye,
  completed: CheckCircle2,
  cancelled: XCircle,
};

const priorityIcons: Record<TaskPriority, React.ComponentType<{ className?: string }>> = {
  low: Circle,
  medium: Circle,
  high: AlertTriangle,
  urgent: AlertTriangle,
};

const categoryIcons: Record<TaskCategory, React.ComponentType<{ className?: string }>> = {
  content_creation: PenTool,
  brand_update: Palette,
  asset_generation: Image,
  strategy_revision: Target,
  deliverable_request: Package,
  other: MoreHorizontal,
};

// ============================================================================
// Color Mapping
// ============================================================================

const statusColors: Record<TaskStatus, { bg: string; text: string; border: string }> = {
  pending: {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    border: 'border-gray-200',
  },
  in_progress: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
  },
  review: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    border: 'border-purple-200',
  },
  completed: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    border: 'border-green-200',
  },
  cancelled: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    border: 'border-red-200',
  },
};

const priorityColors: Record<TaskPriority, { bg: string; text: string; border: string }> = {
  low: {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    border: 'border-gray-200',
  },
  medium: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
  },
  high: {
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    border: 'border-amber-200',
  },
  urgent: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    border: 'border-red-200',
  },
};

const categoryColors: Record<TaskCategory, { bg: string; text: string; border: string }> = {
  content_creation: {
    bg: 'bg-simplicity-turquoise/10',
    text: 'text-simplicity-turquoise',
    border: 'border-simplicity-turquoise/20',
  },
  brand_update: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    border: 'border-purple-200',
  },
  asset_generation: {
    bg: 'bg-pink-50',
    text: 'text-pink-600',
    border: 'border-pink-200',
  },
  strategy_revision: {
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    border: 'border-orange-200',
  },
  deliverable_request: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    border: 'border-green-200',
  },
  other: {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    border: 'border-gray-200',
  },
};

// ============================================================================
// Badge Variants
// ============================================================================

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-medium transition-colors',
  {
    variants: {
      size: {
        xs: 'px-1.5 py-0.5 text-[10px] rounded',
        sm: 'px-2 py-0.5 text-xs rounded-md',
        md: 'px-2.5 py-1 text-xs rounded-lg',
        lg: 'px-3 py-1.5 text-sm rounded-lg',
      },
      variant: {
        filled: 'border',
        outline: 'border bg-transparent',
        ghost: 'border-transparent',
        dot: 'bg-transparent border-transparent',
      },
    },
    defaultVariants: {
      size: 'sm',
      variant: 'filled',
    },
  }
);

// ============================================================================
// TaskStatusBadge Component
// ============================================================================

export interface TaskStatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  status: TaskStatus;
  showIcon?: boolean;
  showLabel?: boolean;
  pulse?: boolean;
}

export function TaskStatusBadge({
  status,
  size,
  variant,
  showIcon = true,
  showLabel = true,
  pulse = false,
  className,
  ...props
}: TaskStatusBadgeProps) {
  const config = taskStatusConfig[status];
  const colors = statusColors[status];
  const Icon = statusIcons[status];
  const shouldAnimate = status === 'in_progress' || pulse;

  const iconSizes = {
    xs: 'h-2.5 w-2.5',
    sm: 'h-3 w-3',
    md: 'h-3.5 w-3.5',
    lg: 'h-4 w-4',
  };

  const iconSize = iconSizes[size || 'sm'];

  return (
    <div
      className={cn(
        badgeVariants({ size, variant }),
        colors.bg,
        colors.text,
        colors.border,
        className
      )}
      {...props}
    >
      {showIcon && (
        <Icon
          className={cn(
            iconSize,
            shouldAnimate && status === 'in_progress' && 'animate-spin',
            shouldAnimate && status !== 'in_progress' && 'animate-pulse'
          )}
        />
      )}
      {showLabel && <span>{config.label}</span>}
    </div>
  );
}

// ============================================================================
// TaskPriorityBadge Component
// ============================================================================

export interface TaskPriorityBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  priority: TaskPriority;
  showIcon?: boolean;
  showLabel?: boolean;
}

export function TaskPriorityBadge({
  priority,
  size,
  variant,
  showIcon = true,
  showLabel = true,
  className,
  ...props
}: TaskPriorityBadgeProps) {
  const config = taskPriorityConfig[priority];
  const colors = priorityColors[priority];
  const Icon = priorityIcons[priority];

  const iconSizes = {
    xs: 'h-2.5 w-2.5',
    sm: 'h-3 w-3',
    md: 'h-3.5 w-3.5',
    lg: 'h-4 w-4',
  };

  const iconSize = iconSizes[size || 'sm'];

  return (
    <div
      className={cn(
        badgeVariants({ size, variant }),
        colors.bg,
        colors.text,
        colors.border,
        className
      )}
      {...props}
    >
      {showIcon && (
        <Icon
          className={cn(
            iconSize,
            priority === 'urgent' && 'animate-pulse'
          )}
        />
      )}
      {showLabel && <span>{config.label}</span>}
    </div>
  );
}

// ============================================================================
// TaskCategoryBadge Component
// ============================================================================

export interface TaskCategoryBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  category: TaskCategory;
  showIcon?: boolean;
  showLabel?: boolean;
}

export function TaskCategoryBadge({
  category,
  size,
  variant,
  showIcon = true,
  showLabel = true,
  className,
  ...props
}: TaskCategoryBadgeProps) {
  const config = taskCategoryConfig[category];
  const colors = categoryColors[category];
  const Icon = categoryIcons[category];

  const iconSizes = {
    xs: 'h-2.5 w-2.5',
    sm: 'h-3 w-3',
    md: 'h-3.5 w-3.5',
    lg: 'h-4 w-4',
  };

  const iconSize = iconSizes[size || 'sm'];

  return (
    <div
      className={cn(
        badgeVariants({ size, variant }),
        colors.bg,
        colors.text,
        colors.border,
        className
      )}
      {...props}
    >
      {showIcon && <Icon className={iconSize} />}
      {showLabel && <span>{config.label}</span>}
    </div>
  );
}

// ============================================================================
// Utility Exports
// ============================================================================

export { statusColors, priorityColors, categoryColors };
export { statusIcons, priorityIcons, categoryIcons };
