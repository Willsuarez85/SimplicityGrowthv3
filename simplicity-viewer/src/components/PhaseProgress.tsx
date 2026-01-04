'use client';

import { cn } from '@/lib/utils';
import { CheckCircle, Clock, Loader2, FileText, Palette, Megaphone, Package, Send } from 'lucide-react';

interface Phase {
  name: string;
  folder: string;
  status: 'complete' | 'pending' | 'in_progress';
  fileCount: number;
}

interface PhaseProgressProps {
  phases: Phase[];
  compact?: boolean;
}

const phaseIcons: Record<string, React.ElementType> = {
  '01-research': FileText,
  '02-strategy': Megaphone,
  '03-creative': Palette,
  '04-assets': Package,
  '05-deliverables': Send,
};

const statusColors = {
  complete: 'bg-green-500',
  in_progress: 'bg-blue-500',
  pending: 'bg-gray-300',
};

const statusIcons = {
  complete: CheckCircle,
  in_progress: Loader2,
  pending: Clock,
};

export function PhaseProgress({ phases, compact = false }: PhaseProgressProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-1">
        {phases.map((phase) => (
          <div
            key={phase.folder}
            className={cn(
              'w-2 h-2 rounded-full',
              statusColors[phase.status]
            )}
            title={`${phase.name}: ${phase.status}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {phases.map((phase, index) => {
        const Icon = phaseIcons[phase.folder] || FileText;
        const StatusIcon = statusIcons[phase.status];

        return (
          <div key={phase.folder} className="flex items-center gap-3">
            {/* Phase indicator */}
            <div
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full',
                phase.status === 'complete' && 'bg-green-500/10 text-green-600',
                phase.status === 'in_progress' && 'bg-blue-500/10 text-blue-600',
                phase.status === 'pending' && 'bg-gray-100 text-gray-400'
              )}
            >
              <Icon className="h-4 w-4" />
            </div>

            {/* Phase info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'text-sm font-medium',
                    phase.status === 'pending' && 'text-gray-500'
                  )}
                >
                  {phase.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {phase.fileCount} files
                  </span>
                  <StatusIcon
                    className={cn(
                      'h-4 w-4',
                      phase.status === 'complete' && 'text-green-500',
                      phase.status === 'in_progress' && 'text-blue-500 animate-spin',
                      phase.status === 'pending' && 'text-gray-400'
                    )}
                  />
                </div>
              </div>

              {/* Progress bar */}
              {index < phases.length - 1 && (
                <div className="mt-2 ml-4 h-4 border-l-2 border-dashed border-gray-200" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
