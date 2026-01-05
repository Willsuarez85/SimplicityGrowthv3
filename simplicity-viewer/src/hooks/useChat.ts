'use client';

import { useState, useCallback, useRef } from 'react';
import type { ChatMessage, ChatRequest, ChatResponse } from '@/app/api/chat/route';

export type { ChatMessage };

export interface UseChatOptions {
  filePath: string;
  fileContent: string;
  onContentChange?: (newContent: string) => void;
}

export interface UseChatReturn {
  // State
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  suggestedContent: string | null;
  diff: ChatResponse['diff'] | null;

  // Actions
  sendMessage: (content: string) => Promise<void>;
  applyChanges: () => void;
  discardChanges: () => void;
  clearChat: () => void;

  // Refs
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

export function useChat({
  filePath,
  fileContent,
  onContentChange,
}: UseChatOptions): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestedContent, setSuggestedContent] = useState<string | null>(null);
  const [diff, setDiff] = useState<ChatResponse['diff'] | null>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Send a message to the chat API
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Create user message
    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_user`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };

    // Add user message to history
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const request: ChatRequest = {
        message: content.trim(),
        fileContent,
        filePath,
        history: [...messages, userMessage],
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`Chat request failed: ${response.statusText}`);
      }

      const data: ChatResponse = await response.json();

      // Add assistant message to history
      setMessages(prev => [...prev, data.message]);

      // Store suggested content and diff if present
      if (data.suggestedContent) {
        setSuggestedContent(data.suggestedContent);
      }
      if (data.diff) {
        setDiff(data.diff);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);

      // Add error message to chat
      const errorChatMessage: ChatMessage = {
        id: `msg_${Date.now()}_error`,
        role: 'system',
        content: `Error: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorChatMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [filePath, fileContent, messages, isLoading]);

  // Apply suggested changes to the file
  const applyChanges = useCallback(() => {
    if (suggestedContent && onContentChange) {
      onContentChange(suggestedContent);

      // Add confirmation message
      const confirmMessage: ChatMessage = {
        id: `msg_${Date.now()}_confirm`,
        role: 'system',
        content: 'Changes applied successfully.',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, confirmMessage]);
    }

    // Clear suggested content and diff
    setSuggestedContent(null);
    setDiff(null);
  }, [suggestedContent, onContentChange]);

  // Discard suggested changes
  const discardChanges = useCallback(() => {
    // Add discard message
    const discardMessage: ChatMessage = {
      id: `msg_${Date.now()}_discard`,
      role: 'system',
      content: 'Changes discarded.',
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, discardMessage]);

    // Clear suggested content and diff
    setSuggestedContent(null);
    setDiff(null);
  }, []);

  // Clear all chat history
  const clearChat = useCallback(() => {
    setMessages([]);
    setSuggestedContent(null);
    setDiff(null);
    setError(null);
  }, []);

  return {
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
  };
}

// Helper to format message timestamp
export function formatMessageTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

// Helper to get role display name
export function getRoleDisplayName(role: ChatMessage['role']): string {
  switch (role) {
    case 'user':
      return 'You';
    case 'assistant':
      return 'AI Assistant';
    case 'system':
      return 'System';
    default:
      return role;
  }
}
