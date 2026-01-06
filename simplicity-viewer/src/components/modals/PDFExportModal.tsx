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
  Download,
  FileText,
  CheckCircle2,
  Loader2,
  Calendar,
  Target,
  Palette,
  TrendingUp,
  Users,
} from 'lucide-react';

// ============================================================================
// Props
// ============================================================================

export interface PDFExportModalProps {
  isOpen: boolean;
  onClose: () => void;
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
// Section Card Component
// ============================================================================

interface SectionCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
  iconColor?: string;
}

function SectionCard({ icon: Icon, title, children, iconColor = 'text-simplicity-turquoise' }: SectionCardProps) {
  return (
    <div className="border border-simplicity-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-center gap-2 mb-3">
        <div className={cn('p-1.5 rounded-lg bg-simplicity-gray-50', iconColor)}>
          <Icon className="h-4 w-4" />
        </div>
        <h4 className="text-sm font-semibold text-simplicity-charcoal">{title}</h4>
      </div>
      {children}
    </div>
  );
}

// ============================================================================
// Format Date Helper
// ============================================================================

function formatDate(dateString?: string): string {
  if (!dateString) return 'No date';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getCurrentDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ============================================================================
// PDFExportModal Component
// ============================================================================

export function PDFExportModal({
  isOpen,
  onClose,
  clientSlug,
  clientName,
  brandDNASummary,
  metrics,
  recentTasks,
}: PDFExportModalProps) {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const printRef = React.useRef<HTMLDivElement>(null);

  // Reset state when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setIsGenerating(false);
      setShowSuccess(false);
    }
  }, [isOpen]);

  const displayName = clientName || clientSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  // Default values for preview
  const displayMetrics = {
    totalContent: metrics?.totalContent ?? 12,
    completedTasks: metrics?.completedTasks ?? 8,
    pendingTasks: metrics?.pendingTasks ?? 4,
    platforms: metrics?.platforms ?? ['Instagram', 'TikTok', 'YouTube'],
  };

  const displayBrandDNA = brandDNASummary ||
    `${displayName} represents authentic quality and community connection. The brand voice is warm, approachable, and celebrates cultural heritage while embracing modern marketing techniques.`;

  const displayTasks = recentTasks || [
    { title: 'Create Instagram Reels campaign', status: 'completed', dueDate: new Date().toISOString() },
    { title: 'Design brand collateral', status: 'in_progress', dueDate: new Date(Date.now() + 86400000 * 3).toISOString() },
    { title: 'Plan content calendar for Q2', status: 'pending', dueDate: new Date(Date.now() + 86400000 * 7).toISOString() },
  ];

  const handleExport = async () => {
    setIsGenerating(true);

    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create printable content
    if (printRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>${displayName} - Client Report</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; color: #1a1a2e; }
              h1 { color: #1a1a2e; border-bottom: 3px solid #2dd4bf; padding-bottom: 10px; }
              h2 { color: #374151; margin-top: 30px; font-size: 18px; }
              .header { text-align: center; margin-bottom: 40px; }
              .header p { color: #6b7280; }
              .section { margin-bottom: 30px; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; }
              .metric { display: inline-block; margin-right: 40px; margin-bottom: 10px; }
              .metric-value { font-size: 24px; font-weight: bold; color: #2dd4bf; }
              .metric-label { font-size: 12px; color: #6b7280; }
              .task { padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
              .task:last-child { border-bottom: none; }
              .status { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 12px; }
              .status-completed { background: #d1fae5; color: #059669; }
              .status-in_progress { background: #dbeafe; color: #2563eb; }
              .status-pending { background: #f3f4f6; color: #6b7280; }
              .platforms { display: flex; gap: 8px; flex-wrap: wrap; }
              .platform { background: #f3f4f6; padding: 4px 12px; border-radius: 12px; font-size: 12px; }
              .footer { margin-top: 40px; text-align: center; color: #9ca3af; font-size: 12px; }
              @media print { body { padding: 20px; } }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${displayName}</h1>
              <p>Client Summary Report</p>
              <p style="font-size: 12px;">Generated on ${getCurrentDate()}</p>
            </div>

            <div class="section">
              <h2>📊 Performance Metrics</h2>
              <div class="metric">
                <div class="metric-value">${displayMetrics.totalContent}</div>
                <div class="metric-label">Total Content</div>
              </div>
              <div class="metric">
                <div class="metric-value">${displayMetrics.completedTasks}</div>
                <div class="metric-label">Completed Tasks</div>
              </div>
              <div class="metric">
                <div class="metric-value">${displayMetrics.pendingTasks}</div>
                <div class="metric-label">Pending Tasks</div>
              </div>
            </div>

            <div class="section">
              <h2>🎯 Active Platforms</h2>
              <div class="platforms">
                ${displayMetrics.platforms.map(p => `<span class="platform">${p}</span>`).join('')}
              </div>
            </div>

            <div class="section">
              <h2>🎨 Brand DNA Summary</h2>
              <p>${displayBrandDNA}</p>
            </div>

            <div class="section">
              <h2>📋 Recent Tasks</h2>
              ${displayTasks.map(task => `
                <div class="task">
                  <strong>${task.title}</strong>
                  <span class="status status-${task.status}">${task.status.replace('_', ' ')}</span>
                  <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">Due: ${formatDate(task.dueDate)}</div>
                </div>
              `).join('')}
            </div>

            <div class="footer">
              <p>Simplicity Growth Marketing</p>
              <p>This report was auto-generated by Simplicity Viewer</p>
            </div>
          </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }

    setIsGenerating(false);
    setShowSuccess(true);

    // Auto-close after success
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg text-simplicity-charcoal flex items-center gap-2">
            <FileText className="h-5 w-5 text-simplicity-turquoise" />
            Export Client Report
          </DialogTitle>
          <DialogDescription className="text-sm text-simplicity-gray-500">
            Preview and download a PDF summary for {displayName}.
          </DialogDescription>
        </DialogHeader>

        {/* Success Message */}
        {showSuccess && (
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">Export Ready!</p>
              <p className="text-xs text-green-600">Your PDF is ready for printing or saving.</p>
            </div>
          </div>
        )}

        {/* PDF Preview */}
        <div ref={printRef} className="space-y-4 pt-2">
          {/* Client Header */}
          <div className="text-center py-4 border-b border-simplicity-gray-200">
            <h2 className="text-xl font-bold text-simplicity-charcoal">{displayName}</h2>
            <p className="text-sm text-simplicity-gray-500">Client Summary Report</p>
            <p className="text-xs text-simplicity-gray-400 mt-1">{getCurrentDate()}</p>
          </div>

          {/* Metrics Grid */}
          <SectionCard icon={TrendingUp} title="Performance Metrics" iconColor="text-blue-600">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-simplicity-turquoise">
                  {displayMetrics.totalContent}
                </div>
                <div className="text-xs text-simplicity-gray-500">Total Content</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {displayMetrics.completedTasks}
                </div>
                <div className="text-xs text-simplicity-gray-500">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">
                  {displayMetrics.pendingTasks}
                </div>
                <div className="text-xs text-simplicity-gray-500">Pending</div>
              </div>
            </div>
          </SectionCard>

          {/* Platforms */}
          <SectionCard icon={Users} title="Active Platforms" iconColor="text-purple-600">
            <div className="flex flex-wrap gap-2">
              {displayMetrics.platforms.map((platform, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-simplicity-gray-100 text-simplicity-gray-700 rounded-full text-xs font-medium"
                >
                  {platform}
                </span>
              ))}
            </div>
          </SectionCard>

          {/* Brand DNA */}
          <SectionCard icon={Palette} title="Brand DNA Summary" iconColor="text-pink-600">
            <p className="text-sm text-simplicity-gray-600 leading-relaxed">
              {displayBrandDNA}
            </p>
          </SectionCard>

          {/* Recent Tasks */}
          <SectionCard icon={Target} title="Recent Tasks" iconColor="text-amber-600">
            <div className="space-y-2">
              {displayTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-simplicity-gray-100 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-simplicity-charcoal">{task.title}</p>
                    <p className="text-xs text-simplicity-gray-400">
                      <Calendar className="h-3 w-3 inline mr-1" />
                      Due: {formatDate(task.dueDate)}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded-full text-xs font-medium capitalize',
                      task.status === 'completed' && 'bg-green-100 text-green-700',
                      task.status === 'in_progress' && 'bg-blue-100 text-blue-700',
                      task.status === 'pending' && 'bg-gray-100 text-gray-700'
                    )}
                  >
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-simplicity-gray-100 flex items-center justify-between">
          <p className="text-xs text-simplicity-gray-400">
            Simplicity Growth Marketing
          </p>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isGenerating}
              className="text-simplicity-gray-600"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleExport}
              disabled={isGenerating || showSuccess}
              className="bg-simplicity-turquoise hover:bg-simplicity-turquoise/90 text-white"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : showSuccess ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Done!
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PDFExportModal;
