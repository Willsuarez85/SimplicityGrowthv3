'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Send,
  MessageSquare,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

// ============================================================================
// Props
// ============================================================================

export interface QuickMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend?: (message: string) => void;
  clientSlug: string;
  clientName?: string;
}

// ============================================================================
// QuickMessageModal Component
// ============================================================================

export function QuickMessageModal({
  isOpen,
  onClose,
  onSend,
  clientSlug,
  clientName,
}: QuickMessageModalProps) {
  const [message, setMessage] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setMessage('');
      setIsSending(false);
      setShowSuccess(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    setIsSending(true);

    // Simulate sending (would be API call in production)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Call onSend callback if provided
    if (onSend) {
      onSend(message.trim());
    }

    setIsSending(false);
    setShowSuccess(true);

    // Auto-close after showing success
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const displayName = clientName || clientSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg text-simplicity-charcoal flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-simplicity-turquoise" />
            Quick Message
          </DialogTitle>
          <DialogDescription className="text-sm text-simplicity-gray-500">
            Send a quick message to the {displayName} project.
          </DialogDescription>
        </DialogHeader>

        {showSuccess ? (
          // Success State
          <div className="py-8 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-lg font-medium text-simplicity-charcoal">
              Message Sent!
            </p>
            <p className="text-sm text-simplicity-gray-500">
              Your message has been recorded.
            </p>
          </div>
        ) : (
          // Form State
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {/* Message Textarea */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-simplicity-charcoal"
              >
                Your Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={4}
                className={cn(
                  'w-full px-3 py-2 text-sm border rounded-lg resize-none',
                  'border-simplicity-gray-200 bg-white text-simplicity-charcoal',
                  'placeholder:text-simplicity-gray-400',
                  'focus:outline-none focus:ring-2 focus:ring-simplicity-turquoise/20',
                  'focus:border-simplicity-turquoise',
                  'transition-colors'
                )}
                disabled={isSending}
                autoFocus
              />
              <p className="text-xs text-simplicity-gray-400">
                {message.length} characters
              </p>
            </div>

            {/* Quick Templates */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-simplicity-gray-500">
                Quick templates:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Need status update',
                  'Schedule a call',
                  'Review assets',
                  'Approve content',
                ].map((template) => (
                  <button
                    key={template}
                    type="button"
                    onClick={() => setMessage(template)}
                    disabled={isSending}
                    className={cn(
                      'px-2.5 py-1 text-xs rounded-full border transition-colors',
                      'border-simplicity-gray-200 text-simplicity-gray-600',
                      'hover:border-simplicity-turquoise hover:text-simplicity-turquoise',
                      'disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-simplicity-gray-100">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                disabled={isSending}
                className="text-simplicity-gray-600"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!message.trim() || isSending}
                className="bg-simplicity-turquoise hover:bg-simplicity-turquoise/90 text-white"
              >
                {isSending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default QuickMessageModal;
