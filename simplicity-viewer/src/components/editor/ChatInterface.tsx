'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useChat, formatMessageTime, getRoleDisplayName } from '@/hooks/useChat';
import type { ChatMessage } from '@/hooks/useChat';
import { Send, Loader2, Check, X, User, Bot, AlertCircle, Sparkles } from 'lucide-react';

interface ChatInterfaceProps {
  filePath: string;
  fileContent: string;
  onContentChange?: (newContent: string) => void;
  className?: string;
}

export function ChatInterface({
  filePath,
  fileContent,
  onContentChange,
  className,
}: ChatInterfaceProps) {
  const {
    messages,
    isLoading,
    error,
    suggestedContent,
    diff,
    sendMessage,
    applyChanges,
    discardChanges,
    clearChat,
    inputRef,
  } = useChat({ filePath, fileContent, onContentChange });

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue;
    setInputValue('');
    await sendMessage(message);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Reset height to auto to get the correct scrollHeight
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
  };

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <ChatEmptyState />
        ) : (
          messages.map((message) => (
            <ChatMessageBubble key={message.id} message={message} />
          ))
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 text-simplicity-gray-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">AI is thinking...</span>
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Diff Preview & Actions */}
      {suggestedContent && diff && (
        <DiffPreview
          diff={diff}
          onApply={applyChanges}
          onDiscard={discardChanges}
        />
      )}

      {/* Input Area */}
      <div className="border-t border-simplicity-gray-200 p-4 bg-white">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask AI to edit this file..."
              disabled={isLoading}
              rows={1}
              className={cn(
                'w-full px-4 py-3 pr-12',
                'bg-simplicity-offwhite rounded-xl',
                'border border-simplicity-gray-200',
                'text-simplicity-charcoal placeholder:text-simplicity-gray-400',
                'focus:outline-none focus:ring-2 focus:ring-simplicity-turquoise focus:border-transparent',
                'resize-none overflow-hidden',
                'text-sm leading-relaxed',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className={cn(
                'absolute right-2 bottom-2',
                'p-2 rounded-lg',
                'transition-all duration-200',
                inputValue.trim() && !isLoading
                  ? 'bg-simplicity-turquoise text-white hover:bg-simplicity-turquoise/90'
                  : 'bg-simplicity-gray-100 text-simplicity-gray-400 cursor-not-allowed'
              )}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Quick action hints */}
          <div className="flex flex-wrap gap-2">
            <QuickAction
              label="Add section"
              onClick={() => setInputValue('Add a section about ')}
            />
            <QuickAction
              label="Summarize"
              onClick={() => setInputValue('Summarize this document')}
            />
            <QuickAction
              label="Improve"
              onClick={() => setInputValue('Improve the clarity of this document')}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

// Individual message bubble component
interface ChatMessageBubbleProps {
  message: ChatMessage;
}

function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  const isError = isSystem && message.content.startsWith('Error:');

  const getIcon = () => {
    if (isUser) return <User className="h-4 w-4" />;
    if (isSystem) return isError ? <AlertCircle className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />;
    return <Bot className="h-4 w-4" />;
  };

  return (
    <div
      className={cn(
        'flex gap-3',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          isUser
            ? 'bg-simplicity-charcoal text-white'
            : isError
            ? 'bg-red-100 text-red-600'
            : isSystem
            ? 'bg-simplicity-turquoise/10 text-simplicity-turquoise'
            : 'bg-simplicity-gray-100 text-simplicity-gray-600'
        )}
      >
        {getIcon()}
      </div>

      {/* Message content */}
      <div
        className={cn(
          'flex flex-col max-w-[85%]',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        {/* Role and time */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-simplicity-gray-500">
            {getRoleDisplayName(message.role)}
          </span>
          <span className="text-xs text-simplicity-gray-400">
            {formatMessageTime(message.timestamp)}
          </span>
        </div>

        {/* Message bubble */}
        <div
          className={cn(
            'px-4 py-3 rounded-2xl text-sm leading-relaxed',
            isUser
              ? 'bg-simplicity-charcoal text-white rounded-tr-md'
              : isError
              ? 'bg-red-50 text-red-700 border border-red-200 rounded-tl-md'
              : isSystem
              ? 'bg-simplicity-turquoise/5 text-simplicity-charcoal border border-simplicity-turquoise/20 rounded-tl-md'
              : 'bg-simplicity-offwhite text-simplicity-charcoal rounded-tl-md'
          )}
        >
          {/* Render markdown-like content for assistant messages */}
          {message.role === 'assistant' ? (
            <div className="prose-sm prose-simplicity">
              {message.content.split('\n').map((line, i) => {
                // Bold text
                const formattedLine = line.replace(
                  /\*\*(.+?)\*\*/g,
                  '<strong>$1</strong>'
                );
                // List items
                if (line.startsWith('- ')) {
                  return (
                    <div key={i} className="flex gap-2">
                      <span className="text-simplicity-turquoise">•</span>
                      <span dangerouslySetInnerHTML={{ __html: formattedLine.slice(2) }} />
                    </div>
                  );
                }
                return (
                  <p
                    key={i}
                    className={cn(i > 0 && 'mt-2')}
                    dangerouslySetInnerHTML={{ __html: formattedLine }}
                  />
                );
              })}
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Diff preview component
interface DiffPreviewProps {
  diff: {
    before: string;
    after: string;
    changes: Array<{ type: 'add' | 'remove' | 'unchanged'; value: string }>;
  };
  onApply: () => void;
  onDiscard: () => void;
}

function DiffPreview({ diff, onApply, onDiscard }: DiffPreviewProps) {
  const addedLines = diff.changes.filter(c => c.type === 'add').length;
  const removedLines = diff.changes.filter(c => c.type === 'remove').length;

  return (
    <div className="border-t border-simplicity-gray-200 bg-simplicity-offwhite">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-simplicity-gray-200">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-simplicity-charcoal">
            Suggested Changes
          </span>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-green-600">+{addedLines} added</span>
            <span className="text-red-600">-{removedLines} removed</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onDiscard}
            className={cn(
              'inline-flex items-center gap-1.5',
              'px-3 py-1.5 rounded-full',
              'text-xs font-medium',
              'bg-simplicity-gray-100 text-simplicity-gray-600',
              'hover:bg-simplicity-gray-200',
              'transition-colors'
            )}
          >
            <X className="h-3.5 w-3.5" />
            Discard
          </button>
          <button
            onClick={onApply}
            className={cn(
              'inline-flex items-center gap-1.5',
              'px-3 py-1.5 rounded-full',
              'text-xs font-medium',
              'bg-simplicity-turquoise text-white',
              'hover:bg-simplicity-turquoise/90',
              'transition-colors'
            )}
          >
            <Check className="h-3.5 w-3.5" />
            Apply
          </button>
        </div>
      </div>

      {/* Diff content */}
      <div className="max-h-48 overflow-y-auto p-4">
        <div className="font-mono text-xs space-y-0.5">
          {diff.changes.slice(0, 20).map((change, index) => (
            <div
              key={index}
              className={cn(
                'px-2 py-0.5 rounded',
                change.type === 'add' && 'bg-green-50 text-green-700',
                change.type === 'remove' && 'bg-red-50 text-red-700 line-through',
                change.type === 'unchanged' && 'text-simplicity-gray-500'
              )}
            >
              <span className="mr-2 opacity-50">
                {change.type === 'add' ? '+' : change.type === 'remove' ? '-' : ' '}
              </span>
              {change.value || ' '}
            </div>
          ))}
          {diff.changes.length > 20 && (
            <div className="text-simplicity-gray-400 italic px-2 py-1">
              ... and {diff.changes.length - 20} more lines
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Quick action chip
interface QuickActionProps {
  label: string;
  onClick: () => void;
}

function QuickAction({ label, onClick }: QuickActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-3 py-1 rounded-full',
        'text-xs font-medium',
        'bg-simplicity-gray-100 text-simplicity-gray-600',
        'hover:bg-simplicity-gray-200 hover:text-simplicity-charcoal',
        'transition-colors'
      )}
    >
      {label}
    </button>
  );
}

// Empty state for chat
function ChatEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-12">
      <div className="w-12 h-12 rounded-xl bg-simplicity-turquoise/10 flex items-center justify-center mb-4">
        <Sparkles className="h-6 w-6 text-simplicity-turquoise" />
      </div>
      <h3 className="text-base font-medium text-simplicity-charcoal mb-2">
        Edit with AI
      </h3>
      <p className="text-sm text-simplicity-gray-400 max-w-[250px] mb-4">
        Describe what changes you want to make to this file and AI will help you.
      </p>
      <div className="text-xs text-simplicity-gray-400 space-y-1">
        <p>Try saying:</p>
        <p className="text-simplicity-gray-500">"Add a section about competitors"</p>
        <p className="text-simplicity-gray-500">"Summarize this document"</p>
        <p className="text-simplicity-gray-500">"Fix the formatting"</p>
      </div>
    </div>
  );
}

// Loading skeleton for chat interface
export function ChatInterfaceSkeleton() {
  return (
    <div className="flex flex-col h-full animate-pulse">
      <div className="flex-1 p-4 space-y-4">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-simplicity-gray-100" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-24 bg-simplicity-gray-100 rounded" />
            <div className="h-16 w-3/4 bg-simplicity-gray-100 rounded-xl" />
          </div>
        </div>
        <div className="flex gap-3 flex-row-reverse">
          <div className="w-8 h-8 rounded-full bg-simplicity-gray-100" />
          <div className="flex-1 space-y-2 flex flex-col items-end">
            <div className="h-4 w-16 bg-simplicity-gray-100 rounded" />
            <div className="h-10 w-1/2 bg-simplicity-gray-100 rounded-xl" />
          </div>
        </div>
      </div>
      <div className="border-t border-simplicity-gray-200 p-4">
        <div className="h-12 bg-simplicity-gray-100 rounded-xl" />
      </div>
    </div>
  );
}
