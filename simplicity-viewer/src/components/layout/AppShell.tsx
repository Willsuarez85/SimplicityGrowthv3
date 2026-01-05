'use client';

import { useState, createContext, useContext, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AppShellContextType {
  isChatOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  selectedFile: string | null;
  setSelectedFile: (path: string | null) => void;
}

const AppShellContext = createContext<AppShellContextType | null>(null);

export function useAppShell() {
  const context = useContext(AppShellContext);
  if (!context) {
    throw new Error('useAppShell must be used within AppShellProvider');
  }
  return context;
}

interface AppShellProps {
  children: ReactNode;
  sidebar: ReactNode;
  chatPanel?: ReactNode;
}

export function AppShell({ children, sidebar, chatPanel }: AppShellProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);
  const toggleChat = () => setIsChatOpen((prev) => !prev);

  return (
    <AppShellContext.Provider
      value={{
        isChatOpen,
        openChat,
        closeChat,
        toggleChat,
        selectedFile,
        setSelectedFile,
      }}
    >
      <div className="flex h-screen overflow-hidden bg-simplicity-white">
        {/* Sidebar - Fixed width */}
        <aside className="w-64 flex-shrink-0 border-r border-simplicity-gray-200 bg-simplicity-offwhite">
          {sidebar}
        </aside>

        {/* Main Content - Flexible */}
        <main
          className={cn(
            'flex-1 overflow-hidden transition-all duration-300 ease-out',
            isChatOpen && 'mr-[400px]'
          )}
        >
          {children}
        </main>

        {/* Chat Panel - Slide from right */}
        {chatPanel && (
          <div
            className={cn(
              'fixed top-0 right-0 h-full w-[400px] border-l border-simplicity-gray-200 bg-simplicity-white shadow-2xl',
              'transform transition-transform duration-300 ease-out',
              isChatOpen ? 'translate-x-0' : 'translate-x-full'
            )}
          >
            {chatPanel}
          </div>
        )}
      </div>
    </AppShellContext.Provider>
  );
}

// Export for barrel imports
export { AppShellContext };
