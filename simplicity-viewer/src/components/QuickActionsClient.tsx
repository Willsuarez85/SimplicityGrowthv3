'use client';

import * as React from 'react';
import {
  Plus,
  MessageSquare,
  Calendar,
  Download,
} from 'lucide-react';
import { QuickMessageModal } from '@/components/modals/QuickMessageModal';
import { PDFExportModal } from '@/components/modals/PDFExportModal';

// ============================================================================
// Props
// ============================================================================

interface QuickActionsClientProps {
  clientSlug: string;
  clientName?: string;
  brandDNASummary?: string;
  metrics?: {
    totalContent?: number;
    completedTasks?: number;
    pendingTasks?: number;
    platforms?: string[];
  };
  recentTasks?: Array<{
    title: string;
    status: string;
    dueDate?: string;
  }>;
}

// ============================================================================
// ActionButton Component
// ============================================================================

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick?: () => void;
}

function ActionButton({ icon, label, description, onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg border border-simplicity-gray-200 hover:border-simplicity-turquoise/30 hover:bg-simplicity-turquoise/5 transition-all text-left group"
    >
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-simplicity-gray-100 group-hover:bg-simplicity-turquoise/10 flex items-center justify-center flex-shrink-0 transition-colors">
        <span className="text-simplicity-gray-500 group-hover:text-simplicity-turquoise transition-colors">
          {icon}
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-simplicity-charcoal truncate">{label}</p>
        <p className="text-xs text-simplicity-gray-400 truncate">{description}</p>
      </div>
    </button>
  );
}

// ============================================================================
// QuickActionsClient Component
// ============================================================================

export function QuickActionsClient({
  clientSlug,
  clientName,
  brandDNASummary,
  metrics,
  recentTasks,
}: QuickActionsClientProps) {
  // Modal states
  const [isMessageModalOpen, setIsMessageModalOpen] = React.useState(false);
  const [isPDFModalOpen, setIsPDFModalOpen] = React.useState(false);

  // Scroll to section helper
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Quick Action handlers
  const handleRequestTask = () => {
    scrollToSection('task-section');
  };

  const handleSendMessage = () => {
    setIsMessageModalOpen(true);
  };

  const handleViewCalendar = () => {
    scrollToSection('calendar-section');
  };

  const handleExportAll = () => {
    setIsPDFModalOpen(true);
  };

  return (
    <>
      {/* Quick Actions Grid */}
      <div className="space-y-2">
        <ActionButton
          icon={<Plus className="h-4 w-4" />}
          label="Request New Task"
          description="Submit a content or asset request"
          onClick={handleRequestTask}
        />
        <ActionButton
          icon={<MessageSquare className="h-4 w-4" />}
          label="Send Message"
          description="Chat with the team"
          onClick={handleSendMessage}
        />
        <ActionButton
          icon={<Calendar className="h-4 w-4" />}
          label="View Calendar"
          description="See content schedule"
          onClick={handleViewCalendar}
        />
        <ActionButton
          icon={<Download className="h-4 w-4" />}
          label="Export All"
          description="Download all deliverables"
          onClick={handleExportAll}
        />
      </div>

      {/* Modals */}
      <QuickMessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        clientSlug={clientSlug}
        clientName={clientName}
      />

      <PDFExportModal
        isOpen={isPDFModalOpen}
        onClose={() => setIsPDFModalOpen(false)}
        clientSlug={clientSlug}
        clientName={clientName}
        brandDNASummary={brandDNASummary}
        metrics={metrics}
        recentTasks={recentTasks}
      />
    </>
  );
}

export default QuickActionsClient;
