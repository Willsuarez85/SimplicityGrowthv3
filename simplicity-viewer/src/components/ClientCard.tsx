'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PhaseProgress } from './PhaseProgress';
import { Building2, Image as ImageIcon, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const totalFiles = phases.reduce((sum, p) => sum + p.fileCount, 0);
  const generatedAssets = assets.filter(a => a.status === 'generated').length;
  const completedDeliverables = deliverables.filter(d => d.status === 'complete').length;

  return (
    <Link href={`/client/${slug}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Building2 className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">{industry}</span>
              </div>
            </div>
            <Badge
              variant="outline"
              className={cn(
                status === 'active' && 'bg-green-500/10 text-green-600 border-green-500/20',
                status === 'onboarding' && 'bg-blue-500/10 text-blue-600 border-blue-500/20',
                status === 'paused' && 'bg-amber-500/10 text-amber-600 border-amber-500/20'
              )}
            >
              {status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Phase progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 font-medium">Progress</span>
              <span className="text-xs text-gray-400">
                {completedPhases}/{phases.length} phases
              </span>
            </div>
            <PhaseProgress phases={phases} compact />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t">
            <div className="text-center">
              <FileText className="h-4 w-4 mx-auto text-gray-400 mb-1" />
              <div className="text-sm font-medium">{totalFiles}</div>
              <div className="text-xs text-gray-500">Files</div>
            </div>
            <div className="text-center">
              <ImageIcon className="h-4 w-4 mx-auto text-gray-400 mb-1" />
              <div className="text-sm font-medium">{generatedAssets}</div>
              <div className="text-xs text-gray-500">Assets</div>
            </div>
            <div className="text-center">
              <Badge
                variant="outline"
                className={cn(
                  'text-xs',
                  completedDeliverables > 0
                    ? 'bg-green-500/10 text-green-600 border-green-500/20'
                    : 'bg-gray-100 text-gray-500'
                )}
              >
                {completedDeliverables} Ready
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
