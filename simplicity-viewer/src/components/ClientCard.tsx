'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Image as ImageIcon, FileText, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  StatusBadge,
  StatusIcon,
  type ClientStatus,
} from '@/components/ui/status-indicator';

interface Phase {
  name: string;
  folder: string;
  status: 'complete' | 'pending' | 'in_progress';
  fileCount: number;
}

interface Asset {
  name: string;
  type: 'image' | 'video' | 'document';
  status: 'generated' | 'pending';
}

interface Deliverable {
  name: string;
  status: 'complete' | 'pending';
}

interface ClientCardProps {
  slug: string;
  name: string;
  industry: string;
  status: string;
  phases: Phase[];
  assets: Asset[];
  deliverables: Deliverable[];
}

// Phase short names for display
const phaseShortNames: Record<string, string> = {
  '01-research': 'Research',
  '02-strategy': 'Strategy',
  '03-creative': 'Creative',
  '04-assets': 'Assets',
  '05-deliverables': 'Delivery',
};

export function ClientCard({
  slug,
  name,
  industry,
  status,
  phases,
  assets,
  deliverables,
}: ClientCardProps) {
  const completedPhases = phases.filter(p => p.status === 'complete').length;
  const inProgressPhases = phases.filter(p => p.status === 'in_progress').length;
  const totalFiles = phases.reduce((sum, p) => sum + p.fileCount, 0);
  const generatedAssets = assets.filter(a => a.status === 'generated').length;
  const completedDeliverables = deliverables.filter(d => d.status === 'complete').length;

  // Calculate progress percentage (in_progress counts as half)
  const progressPercent = Math.round(
    ((completedPhases + inProgressPhases * 0.5) / phases.length) * 100
  );

  return (
    <Link href={`/client/${slug}`}>
      <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-simplicity-gray-200 hover:border-simplicity-turquoise/30">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg text-simplicity-charcoal">{name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Building2 className="h-3 w-3 text-simplicity-gray-400" />
                <span className="text-xs text-simplicity-gray-500">{industry}</span>
              </div>
            </div>
            <StatusBadge
              type="client"
              status={status as ClientStatus}
              size="sm"
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Progress Bar Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-simplicity-gray-600">Phase Progress</span>
              <span className="text-xs font-semibold text-simplicity-charcoal">{progressPercent}%</span>
            </div>

            {/* Visual Progress Bar */}
            <div className="h-2 w-full bg-simplicity-gray-100 rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-500',
                  progressPercent === 100
                    ? 'bg-green-500'
                    : 'bg-simplicity-turquoise'
                )}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Phase Indicators Grid */}
            <div className="grid grid-cols-3 gap-x-2 gap-y-1 pt-1">
              {phases.map((phase) => (
                <div
                  key={phase.folder}
                  className={cn(
                    'flex items-center gap-1 text-xs',
                    phase.status === 'complete' && 'text-green-600',
                    phase.status === 'in_progress' && 'text-blue-600',
                    phase.status === 'pending' && 'text-simplicity-gray-400'
                  )}
                >
                  <StatusIcon type="phase" status={phase.status} size="xs" />
                  <span className="truncate">{phaseShortNames[phase.folder] || phase.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-simplicity-gray-100">
            <div className="flex items-center gap-1 text-simplicity-gray-500">
              <FileText className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">{totalFiles} docs</span>
            </div>
            <div className="flex items-center gap-1 text-simplicity-gray-500">
              <ImageIcon className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">{generatedAssets} assets</span>
            </div>
            <div className={cn(
              'flex items-center gap-1',
              completedDeliverables > 0 ? 'text-green-600' : 'text-simplicity-gray-400'
            )}>
              <Package className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">{completedDeliverables} ready</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
