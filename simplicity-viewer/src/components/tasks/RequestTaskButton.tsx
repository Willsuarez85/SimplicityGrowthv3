'use client';

import * as React from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TaskRequestModal } from './TaskRequestModal';
import type { TaskRequest } from '@/types/task';

// ============================================================================
// Props
// ============================================================================

export interface RequestTaskButtonProps {
  clientSlug: string;
  clientName?: string;
  phases?: string[];
  onSubmit?: (task: TaskRequest) => void;
  variant?: 'header' | 'action';
  className?: string;
}

// ============================================================================
// RequestTaskButton Component
// ============================================================================

export function RequestTaskButton({
  clientSlug,
  clientName,
  phases = [],
  onSubmit,
  variant = 'header',
  className,
}: RequestTaskButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = (task: TaskRequest) => {
    if (onSubmit) {
      onSubmit(task);
    }
    // Modal handles its own close after success
  };

  // Header variant - compact button style
  if (variant === 'header') {
    return (
      <>
        <button
          onClick={handleOpen}
          className={cn(
            'inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5',
            'border border-simplicity-gray-200 text-simplicity-charcoal',
            'text-sm font-medium rounded-lg',
            'hover:bg-simplicity-gray-50 transition-colors',
            className
          )}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden xs:inline">Request</span> Task
        </button>

        <TaskRequestModal
          isOpen={isOpen}
          onClose={handleClose}
          clientSlug={clientSlug}
          clientName={clientName}
          phases={phases}
          onSubmit={handleSubmit}
        />
      </>
    );
  }

  // Action variant - full-width card style for Quick Actions section
  return (
    <>
      <button
        onClick={handleOpen}
        className={cn(
          'w-full flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3',
          'rounded-lg border border-simplicity-gray-200',
          'hover:border-simplicity-turquoise/30 hover:bg-simplicity-turquoise/5',
          'transition-all text-left group',
          className
        )}
      >
        <div className="p-1.5 sm:p-2 rounded-lg bg-simplicity-gray-100 group-hover:bg-simplicity-turquoise/10 transition-colors">
          <Plus className="h-4 w-4 text-simplicity-gray-500 group-hover:text-simplicity-turquoise transition-colors" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-simplicity-charcoal">
            Request New Task
          </p>
          <p className="text-xs text-simplicity-gray-400 truncate">
            Submit a content or asset request
          </p>
        </div>
      </button>

      <TaskRequestModal
        isOpen={isOpen}
        onClose={handleClose}
        clientSlug={clientSlug}
        clientName={clientName}
        phases={phases}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default RequestTaskButton;
