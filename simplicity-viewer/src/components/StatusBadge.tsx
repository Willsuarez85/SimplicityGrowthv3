'use client';

import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Status = 'complete' | 'pending' | 'in_progress' | 'generated';

interface StatusBadgeProps {
  status: Status;
  size?: 'sm' | 'md';
  showIcon?: boolean;
}

const statusConfig = {
  complete: {
    label: 'Complete',
    icon: CheckCircle,
    className: 'bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20',
  },
  generated: {
    label: 'Generated',
    icon: CheckCircle,
    className: 'bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20',
  },
  in_progress: {
    label: 'In Progress',
    icon: Loader2,
    className: 'bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20',
  },
  pending: {
    label: 'Pending',
    icon: Clock,
    className: 'bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20',
  },
};

export function StatusBadge({ status, size = 'sm', showIcon = true }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn(
        'font-medium',
        config.className,
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'
      )}
    >
      {showIcon && (
        <Icon
          className={cn(
            'mr-1',
            size === 'sm' ? 'h-3 w-3' : 'h-4 w-4',
            status === 'in_progress' && 'animate-spin'
          )}
        />
      )}
      {config.label}
    </Badge>
  );
}
