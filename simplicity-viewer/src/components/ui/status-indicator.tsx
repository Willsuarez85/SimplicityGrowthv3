'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import {
  Check,
  Circle,
  Loader2,
  Pause,
  Play,
  Clock,
  Sparkles,
  Package,
  CheckCircle2,
  Timer,
} from 'lucide-react';

// ============================================================================
// Status Types
// ============================================================================

export type ClientStatus = 'active' | 'onboarding' | 'paused';
export type PhaseStatus = 'complete' | 'pending' | 'in_progress';
export type AssetStatus = 'generated' | 'pending';
export type DeliverableStatus = 'complete' | 'pending';

export type StatusType = 'client' | 'phase' | 'asset' | 'deliverable';
export type StatusValue = ClientStatus | PhaseStatus | AssetStatus | DeliverableStatus;

// ============================================================================
// Status Configuration
// ============================================================================

interface StatusConfig {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  colors: {
    bg: string;
    text: string;
    border: string;
    iconBg?: string;
  };
  animate?: boolean;
}

const clientStatusConfig: Record<ClientStatus, StatusConfig> = {
  active: {
    label: 'Active',
    icon: Play,
    colors: {
      bg: 'bg-green-500/10',
      text: 'text-green-600',
      border: 'border-green-500/20',
      iconBg: 'bg-green-500',
    },
  },
  onboarding: {
    label: 'Onboarding',
    icon: Sparkles,
    colors: {
      bg: 'bg-simplicity-turquoise/10',
      text: 'text-simplicity-turquoise',
      border: 'border-simplicity-turquoise/20',
      iconBg: 'bg-simplicity-turquoise',
    },
    animate: true,
  },
  paused: {
    label: 'Paused',
    icon: Pause,
    colors: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-600',
      border: 'border-amber-500/20',
      iconBg: 'bg-amber-500',
    },
  },
};

const phaseStatusConfig: Record<PhaseStatus, StatusConfig> = {
  complete: {
    label: 'Complete',
    icon: CheckCircle2,
    colors: {
      bg: 'bg-green-500/10',
      text: 'text-green-600',
      border: 'border-green-500/20',
    },
  },
  pending: {
    label: 'Pending',
    icon: Circle,
    colors: {
      bg: 'bg-simplicity-gray-100',
      text: 'text-simplicity-gray-400',
      border: 'border-simplicity-gray-200',
    },
  },
  in_progress: {
    label: 'In Progress',
    icon: Loader2,
    colors: {
      bg: 'bg-blue-500/10',
      text: 'text-blue-600',
      border: 'border-blue-500/20',
    },
    animate: true,
  },
};

const assetStatusConfig: Record<AssetStatus, StatusConfig> = {
  generated: {
    label: 'Generated',
    icon: Check,
    colors: {
      bg: 'bg-green-500/10',
      text: 'text-green-600',
      border: 'border-green-500/20',
    },
  },
  pending: {
    label: 'Pending',
    icon: Timer,
    colors: {
      bg: 'bg-simplicity-gray-100',
      text: 'text-simplicity-gray-400',
      border: 'border-simplicity-gray-200',
    },
  },
};

const deliverableStatusConfig: Record<DeliverableStatus, StatusConfig> = {
  complete: {
    label: 'Ready',
    icon: Package,
    colors: {
      bg: 'bg-green-500/10',
      text: 'text-green-600',
      border: 'border-green-500/20',
    },
  },
  pending: {
    label: 'In Queue',
    icon: Clock,
    colors: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-600',
      border: 'border-amber-500/20',
    },
  },
};

function getStatusConfig(type: StatusType, status: StatusValue): StatusConfig {
  switch (type) {
    case 'client':
      return clientStatusConfig[status as ClientStatus];
    case 'phase':
      return phaseStatusConfig[status as PhaseStatus];
    case 'asset':
      return assetStatusConfig[status as AssetStatus];
    case 'deliverable':
      return deliverableStatusConfig[status as DeliverableStatus];
    default:
      return {
        label: status,
        icon: Circle,
        colors: {
          bg: 'bg-simplicity-gray-100',
          text: 'text-simplicity-gray-500',
          border: 'border-simplicity-gray-200',
        },
      };
  }
}

// ============================================================================
// Status Badge Variants
// ============================================================================

const statusBadgeVariants = cva(
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
// StatusBadge Component
// ============================================================================

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  type: StatusType;
  status: StatusValue;
  showIcon?: boolean;
  showLabel?: boolean;
  pulse?: boolean;
}

export function StatusBadge({
  type,
  status,
  size,
  variant,
  showIcon = true,
  showLabel = true,
  pulse = false,
  className,
  ...props
}: StatusBadgeProps) {
  const config = getStatusConfig(type, status);
  const Icon = config.icon;
  const shouldAnimate = config.animate || pulse;

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
        statusBadgeVariants({ size, variant }),
        config.colors.bg,
        config.colors.text,
        config.colors.border,
        className
      )}
      {...props}
    >
      {showIcon && (
        <Icon
          className={cn(
            iconSize,
            shouldAnimate && config.icon === Loader2 && 'animate-spin',
            shouldAnimate && config.icon !== Loader2 && 'animate-pulse'
          )}
        />
      )}
      {showLabel && <span>{config.label}</span>}
    </div>
  );
}

// ============================================================================
// StatusDot Component (Minimal indicator)
// ============================================================================

export interface StatusDotProps extends React.HTMLAttributes<HTMLDivElement> {
  type: StatusType;
  status: StatusValue;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  pulse?: boolean;
}

export function StatusDot({
  type,
  status,
  size = 'sm',
  pulse = false,
  className,
  ...props
}: StatusDotProps) {
  const config = getStatusConfig(type, status);
  const shouldPulse = config.animate || pulse;

  const dotSizes = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
  };

  // Extract the main color for the dot
  const dotColor = config.colors.text.replace('text-', 'bg-');

  return (
    <div
      className={cn(
        'rounded-full',
        dotSizes[size],
        dotColor,
        shouldPulse && 'animate-pulse',
        className
      )}
      title={config.label}
      {...props}
    />
  );
}

// ============================================================================
// StatusIcon Component (Icon only)
// ============================================================================

export interface StatusIconProps extends React.HTMLAttributes<HTMLDivElement> {
  type: StatusType;
  status: StatusValue;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  withBackground?: boolean;
}

export function StatusIcon({
  type,
  status,
  size = 'sm',
  withBackground = false,
  className,
  ...props
}: StatusIconProps) {
  const config = getStatusConfig(type, status);
  const Icon = config.icon;
  const shouldAnimate = config.animate;

  const iconSizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const containerSizes = {
    xs: 'h-5 w-5',
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };

  if (withBackground) {
    return (
      <div
        className={cn(
          'rounded-full flex items-center justify-center',
          containerSizes[size],
          config.colors.bg,
          className
        )}
        title={config.label}
        {...props}
      >
        <Icon
          className={cn(
            iconSizes[size],
            config.colors.text,
            shouldAnimate && config.icon === Loader2 && 'animate-spin'
          )}
        />
      </div>
    );
  }

  return (
    <Icon
      className={cn(
        iconSizes[size],
        config.colors.text,
        shouldAnimate && config.icon === Loader2 && 'animate-spin',
        className
      )}
      title={config.label}
      {...props}
    />
  );
}

// ============================================================================
// PhaseProgress Component
// ============================================================================

export interface PhaseProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  phases: Array<{ name: string; status: PhaseStatus }>;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function PhaseProgress({
  phases,
  showLabels = false,
  size = 'sm',
  className,
  ...props
}: PhaseProgressProps) {
  const completed = phases.filter(p => p.status === 'complete').length;
  const inProgress = phases.filter(p => p.status === 'in_progress').length;
  const progressPercent = Math.round(
    ((completed + inProgress * 0.5) / phases.length) * 100
  );

  const barHeights = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={cn('space-y-2', className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-simplicity-gray-600">
          Phase Progress
        </span>
        <span className="text-xs font-semibold text-simplicity-charcoal">
          {progressPercent}%
        </span>
      </div>

      <div
        className={cn(
          'w-full bg-simplicity-gray-100 rounded-full overflow-hidden',
          barHeights[size]
        )}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            progressPercent === 100 ? 'bg-green-500' : 'bg-simplicity-turquoise'
          )}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {showLabels && (
        <div className="flex flex-wrap gap-2">
          {phases.map((phase) => (
            <StatusBadge
              key={phase.name}
              type="phase"
              status={phase.status}
              size="xs"
              variant="ghost"
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Utility Exports
// ============================================================================

export { getStatusConfig };
export type { StatusConfig };
