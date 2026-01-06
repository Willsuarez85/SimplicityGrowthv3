'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { CheckCircle2, Send } from 'lucide-react';
import { TaskRequestForm } from './TaskRequestForm';
import type { TaskRequest } from '@/types/task';

// ============================================================================
// Props
// ============================================================================

export interface TaskRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientSlug: string;
  clientName?: string;
  phases?: string[];
  onSubmit?: (task: TaskRequest) => void;
}

// ============================================================================
// TaskRequestModal Component
// ============================================================================

export function TaskRequestModal({
  isOpen,
  onClose,
  clientSlug,
  clientName,
  phases = [],
  onSubmit,
}: TaskRequestModalProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [submittedTask, setSubmittedTask] = React.useState<TaskRequest | null>(null);

  // Reset state when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setIsSubmitting(false);
      setShowSuccess(false);
      setSubmittedTask(null);
    }
  }, [isOpen]);

  const displayName = clientName || clientSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const handleSubmit = async (task: TaskRequest) => {
    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Store the submitted task for display
    setSubmittedTask(task);

    // Call parent callback if provided
    if (onSubmit) {
      onSubmit(task);
    }

    setIsSubmitting(false);
    setShowSuccess(true);

    // Auto-close after success
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2500);
  };

  const handleCancel = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isSubmitting && onClose()}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-simplicity-gray-100">
          <DialogTitle className="text-lg text-simplicity-charcoal flex items-center gap-2">
            <Send className="h-5 w-5 text-simplicity-turquoise" />
            New Task Request
          </DialogTitle>
          <DialogDescription className="text-sm text-simplicity-gray-500">
            Submit a new task request for {displayName}. Our team will review and process it promptly.
          </DialogDescription>
        </DialogHeader>

        {/* Success State */}
        {showSuccess && submittedTask ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-simplicity-charcoal mb-2">
              Task Submitted!
            </h3>
            <p className="text-sm text-simplicity-gray-600 mb-4">
              Your request has been received and will be processed soon.
            </p>
            <div className="bg-simplicity-gray-50 rounded-lg p-4 text-left">
              <p className="text-sm font-medium text-simplicity-charcoal mb-1">
                {submittedTask.title}
              </p>
              <p className="text-xs text-simplicity-gray-500">
                Priority: <span className="capitalize">{submittedTask.priority}</span>
                {submittedTask.dueDate && (
                  <> • Due: {new Date(submittedTask.dueDate).toLocaleDateString()}</>
                )}
              </p>
            </div>
          </div>
        ) : (
          /* Form Content */
          <div className="p-0">
            <TaskRequestForm
              clientSlug={clientSlug}
              phases={phases}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={isSubmitting}
              className="border-0 shadow-none rounded-none"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default TaskRequestModal;
