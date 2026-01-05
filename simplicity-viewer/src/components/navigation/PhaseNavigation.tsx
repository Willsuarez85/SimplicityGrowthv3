'use client';

import { cn } from '@/lib/utils';
import {
  Search,
  Lightbulb,
  Palette,
  ImageIcon,
  Package
} from 'lucide-react';

export interface Phase {
  id: string;
  name: string;
  folder: string;
  icon: React.ComponentType<{ className?: string }>;
  fileCount?: number;
}

export const PHASES: Phase[] = [
  { id: 'research', name: 'Research', folder: '01-research', icon: Search },
  { id: 'strategy', name: 'Strategy', folder: '02-strategy', icon: Lightbulb },
  { id: 'creative', name: 'Creative', folder: '03-creative', icon: Palette },
  { id: 'assets', name: 'Assets', folder: '04-assets', icon: ImageIcon },
  { id: 'deliverables', name: 'Deliverables', folder: '05-deliverables', icon: Package },
];

interface PhaseNavigationProps {
  activePhase: string;
  onPhaseChange: (phaseId: string) => void;
  fileCounts?: Record<string, number>;
  className?: string;
}

export function PhaseNavigation({
  activePhase,
  onPhaseChange,
  fileCounts = {},
  className,
}: PhaseNavigationProps) {
  return (
    <nav className={cn('w-full', className)}>
      <div className="flex border-b border-simplicity-gray-200">
        {PHASES.map((phase) => {
          const isActive = activePhase === phase.id;
          const Icon = phase.icon;
          const count = fileCounts[phase.folder] || 0;

          return (
            <button
              key={phase.id}
              onClick={() => onPhaseChange(phase.id)}
              className={cn(
                'flex-1 relative group',
                'flex items-center justify-center gap-2',
                'py-3 px-4',
                'text-sm font-medium',
                'transition-all duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-simplicity-turquoise focus-visible:ring-inset',
                isActive
                  ? 'text-simplicity-charcoal'
                  : 'text-simplicity-gray-400 hover:text-simplicity-gray-600'
              )}
            >
              {/* Icon */}
              <Icon
                className={cn(
                  'h-4 w-4 flex-shrink-0 transition-colors',
                  isActive ? 'text-simplicity-turquoise' : 'text-current'
                )}
              />

              {/* Phase Name */}
              <span className="truncate">{phase.name}</span>

              {/* File Count Badge */}
              {count > 0 && (
                <span
                  className={cn(
                    'ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold',
                    'transition-colors',
                    isActive
                      ? 'bg-simplicity-turquoise/10 text-simplicity-turquoise'
                      : 'bg-simplicity-gray-100 text-simplicity-gray-400 group-hover:bg-simplicity-gray-200'
                  )}
                >
                  {count}
                </span>
              )}

              {/* Active Indicator - Turquoise underline */}
              <span
                className={cn(
                  'absolute bottom-0 left-0 right-0 h-0.5',
                  'transition-all duration-200',
                  isActive
                    ? 'bg-simplicity-turquoise'
                    : 'bg-transparent group-hover:bg-simplicity-gray-200'
                )}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// Compact variant for smaller spaces
interface PhaseTabsProps {
  activePhase: string;
  onPhaseChange: (phaseId: string) => void;
  className?: string;
}

export function PhaseTabs({
  activePhase,
  onPhaseChange,
  className,
}: PhaseTabsProps) {
  return (
    <div className={cn('flex gap-1 p-1 bg-simplicity-gray-100 rounded-lg', className)}>
      {PHASES.map((phase) => {
        const isActive = activePhase === phase.id;

        return (
          <button
            key={phase.id}
            onClick={() => onPhaseChange(phase.id)}
            className={cn(
              'flex-1 py-1.5 px-3 rounded-md text-xs font-medium',
              'transition-all duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-simplicity-turquoise',
              isActive
                ? 'bg-white text-simplicity-charcoal shadow-sm'
                : 'text-simplicity-gray-500 hover:text-simplicity-charcoal'
            )}
          >
            {phase.name}
          </button>
        );
      })}
    </div>
  );
}

// Helper to get phase by folder name
export function getPhaseByFolder(folder: string): Phase | undefined {
  return PHASES.find((p) => p.folder === folder);
}

// Helper to get phase by id
export function getPhaseById(id: string): Phase | undefined {
  return PHASES.find((p) => p.id === id);
}
