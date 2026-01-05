'use client';

import { useState, useEffect, useCallback } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import { ChatInterface, ChatInterfaceSkeleton } from '@/components/editor/ChatInterface';
import { X, FileText, Sparkles } from 'lucide-react';

interface ChatPanelProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  filePath: string;
  fileName: string;
  fileContent: string;
  onContentChange?: (newContent: string) => void;
}

export function ChatPanel({
  isOpen,
  onOpenChange,
  filePath,
  fileName,
  fileContent,
  onContentChange,
}: ChatPanelProps) {
  // Handle escape key to close panel
  const handleEscapeKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onOpenChange(false);
      }
    },
    [isOpen, onOpenChange]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [handleEscapeKey]);

  // Clean file name for display
  const displayName = fileName
    .replace(/\.md$/, '')
    .replace(/^[\d]+-/, '')
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay - subtle darkening */}
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 z-40',
            'bg-simplicity-charcoal/20',
            'backdrop-blur-sm',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
          )}
        />

        {/* Panel - slides from right */}
        <Dialog.Content
          className={cn(
            'fixed right-0 top-0 z-50',
            'h-full w-[400px] max-w-[90vw]',
            'bg-white shadow-2xl',
            'flex flex-col',
            'border-l border-simplicity-gray-200',
            'focus:outline-none',
            // Slide animation
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
            'data-[state=closed]:duration-200 data-[state=open]:duration-300'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-simplicity-gray-200 bg-simplicity-offwhite">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-simplicity-turquoise/10 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-simplicity-turquoise" />
              </div>
              <div className="min-w-0">
                <Dialog.Title className="text-sm font-semibold text-simplicity-charcoal truncate">
                  Edit with AI
                </Dialog.Title>
                <Dialog.Description className="text-xs text-simplicity-gray-400 truncate">
                  {displayName}
                </Dialog.Description>
              </div>
            </div>

            <Dialog.Close asChild>
              <button
                className={cn(
                  'flex-shrink-0',
                  'p-2 rounded-full',
                  'text-simplicity-gray-400 hover:text-simplicity-charcoal',
                  'hover:bg-simplicity-gray-100',
                  'transition-colors',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-simplicity-turquoise'
                )}
                aria-label="Close panel"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* File Context Badge */}
          <div className="px-4 py-2 border-b border-simplicity-gray-100 bg-white">
            <div className="flex items-center gap-2 text-xs text-simplicity-gray-500">
              <FileText className="h-3.5 w-3.5" />
              <span className="truncate">{filePath}</span>
            </div>
          </div>

          {/* Chat Interface - takes remaining space */}
          <div className="flex-1 overflow-hidden">
            <ChatInterface
              filePath={filePath}
              fileContent={fileContent}
              onContentChange={onContentChange}
              className="h-full"
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// Trigger button component for consistency
interface ChatPanelTriggerProps {
  onClick: () => void;
  isActive?: boolean;
  className?: string;
}

export function ChatPanelTrigger({
  onClick,
  isActive = false,
  className,
}: ChatPanelTriggerProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2',
        'px-4 py-2 rounded-full',
        'text-sm font-medium',
        'transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-simplicity-turquoise focus-visible:ring-offset-2',
        isActive
          ? 'bg-simplicity-turquoise text-white shadow-md'
          : 'bg-simplicity-charcoal text-white hover:bg-simplicity-gray-800',
        className
      )}
    >
      <Sparkles className="h-4 w-4" />
      <span>{isActive ? 'Editing...' : 'Edit with AI'}</span>
    </button>
  );
}

// Loading state for panel
export function ChatPanelSkeleton() {
  return (
    <div className="fixed right-0 top-0 z-50 h-full w-[400px] bg-white shadow-2xl border-l border-simplicity-gray-200 flex flex-col">
      {/* Header skeleton */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-simplicity-gray-200 bg-simplicity-offwhite animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-simplicity-gray-100" />
          <div className="space-y-1">
            <div className="h-4 w-24 bg-simplicity-gray-100 rounded" />
            <div className="h-3 w-32 bg-simplicity-gray-100 rounded" />
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-simplicity-gray-100" />
      </div>

      {/* File path skeleton */}
      <div className="px-4 py-2 border-b border-simplicity-gray-100 bg-white animate-pulse">
        <div className="h-4 w-48 bg-simplicity-gray-100 rounded" />
      </div>

      {/* Chat interface skeleton */}
      <div className="flex-1 overflow-hidden">
        <ChatInterfaceSkeleton />
      </div>
    </div>
  );
}

// Hook for managing panel state
export function useChatPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    setIsOpen,
    open,
    close,
    toggle,
  };
}

