import { getClient, getFolderTree } from '@/lib/clients';
import { notFound } from 'next/navigation';
import { ClientFolderTree } from '@/components/ClientFolderTree';
import { AssetGallery } from '@/components/AssetGallery';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  Building2,
  FileText,
  Package,
  FolderOpen,
  ExternalLink,
  Image as ImageIcon,
  Clock,
  Plus,
  MessageSquare,
  Download,
  Calendar,
  Activity,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { ClientTaskSection } from '@/components/tasks/ClientTaskSection';
import { ClientCalendarSection } from '@/components/calendar';
import { StatusBadge, StatusIcon, type ClientStatus, type PhaseStatus } from '@/components/ui/status-indicator';

interface ClientPageProps {
  params: Promise<{ slug: string }>;
}

// Phase names for display
const phaseNames: Record<string, { short: string; full: string }> = {
  '01-research': { short: 'Research', full: 'Research & Discovery' },
  '02-strategy': { short: 'Strategy', full: 'Brand Strategy' },
  '03-creative': { short: 'Creative', full: 'Creative Direction' },
  '04-assets': { short: 'Assets', full: 'Asset Production' },
  '05-deliverables': { short: 'Delivery', full: 'Final Deliverables' },
};

export default async function ClientPage({ params }: ClientPageProps) {
  const { slug } = await params;
  const client = getClient(slug);

  if (!client) {
    notFound();
  }

  const folderTree = getFolderTree(slug);

  // Calculate stats
  const totalFiles = client.phases.reduce((sum, p) => sum + p.fileCount, 0);
  const completedPhases = client.phases.filter(p => p.status === 'complete').length;
  const inProgressPhases = client.phases.filter(p => p.status === 'in_progress').length;
  const generatedAssets = client.assets.filter(a => a.status === 'generated').length;
  const completedDeliverables = client.deliverables.filter(d => d.status === 'complete').length;

  // Calculate progress percentage
  const progressPercent = Math.round(
    ((completedPhases + inProgressPhases * 0.5) / client.phases.length) * 100
  );

  // Get current phase
  const currentPhase = client.phases.find(p => p.status === 'in_progress') ||
                       client.phases.find(p => p.status === 'pending');

  return (
    <div className="min-h-screen bg-simplicity-offwhite">
      {/* Hero Header */}
      <div className="bg-white border-b border-simplicity-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-simplicity-gray-500 hover:text-simplicity-charcoal transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            All Clients
          </Link>

          {/* Header Content */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-3">
              {/* Name & Status */}
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-simplicity-charcoal">
                  {client.name}
                </h1>
                <StatusBadge type="client" status={client.status as ClientStatus} size="sm" />
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-simplicity-gray-500">
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" />
                  {client.industry}
                </span>
                <span className="flex items-center gap-1.5">
                  <Activity className="h-4 w-4" />
                  {progressPercent}% complete
                </span>
                {currentPhase && (
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4 text-simplicity-turquoise" />
                    <span className="text-simplicity-charcoal font-medium">
                      {phaseNames[currentPhase.folder]?.full || currentPhase.name}
                    </span>
                  </span>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <Link
                href={`/client/${slug}/files`}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-simplicity-charcoal text-white text-sm font-medium rounded-lg hover:bg-simplicity-charcoal/90 transition-colors"
              >
                <FolderOpen className="h-4 w-4" />
                <span className="hidden xs:inline">Browse</span> Files
              </Link>
              <button className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-simplicity-gray-200 text-simplicity-charcoal text-sm font-medium rounded-lg hover:bg-simplicity-gray-50 transition-colors">
                <Plus className="h-4 w-4" />
                <span className="hidden xs:inline">Request</span> Task
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            icon={<FileText className="h-5 w-5" />}
            label="Total Files"
            value={totalFiles}
            color="blue"
          />
          <StatCard
            icon={<ImageIcon className="h-5 w-5" />}
            label="Generated Assets"
            value={generatedAssets}
            total={client.assets.length}
            color="purple"
          />
          <StatCard
            icon={<Package className="h-5 w-5" />}
            label="Deliverables Ready"
            value={completedDeliverables}
            total={client.deliverables.length}
            color="green"
          />
          <StatCard
            icon={<Clock className="h-5 w-5" />}
            label="Days Active"
            value={Math.floor(Math.random() * 30) + 5}
            color="amber"
          />
        </div>

        {/* Phase Timeline */}
        <div className="bg-white rounded-xl border border-simplicity-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <h2 className="text-lg font-semibold text-simplicity-charcoal">
              Project Timeline
            </h2>
            <div className="flex items-center gap-3 sm:gap-4 text-xs text-simplicity-gray-500">
              <span className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                Complete
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-simplicity-turquoise" />
                In Progress
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-simplicity-gray-300" />
                Pending
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative overflow-x-auto pb-2">
            <div className="min-w-[500px]">
              {/* Progress Line */}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-simplicity-gray-200">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-simplicity-turquoise transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Phase Nodes */}
              <div className="relative flex justify-between">
                {client.phases.map((phase) => (
                  <div key={phase.folder} className="flex flex-col items-center flex-1">
                    {/* Node */}
                    <div className={cn(
                      'relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center bg-white shadow-sm',
                      phase.status === 'complete' && 'border-green-500',
                      phase.status === 'in_progress' && 'border-simplicity-turquoise',
                      phase.status === 'pending' && 'border-simplicity-gray-300'
                    )}>
                      <StatusIcon type="phase" status={phase.status as PhaseStatus} size="md" />
                    </div>

                    {/* Label */}
                    <div className="mt-3 text-center px-1">
                      <p className={cn(
                        'text-xs sm:text-sm font-medium',
                        phase.status === 'complete' && 'text-green-600',
                        phase.status === 'in_progress' && 'text-simplicity-turquoise',
                        phase.status === 'pending' && 'text-simplicity-gray-400'
                      )}>
                        {phaseNames[phase.folder]?.short || phase.name}
                      </p>
                      <p className="text-[10px] sm:text-xs text-simplicity-gray-400 mt-0.5">
                        {phase.fileCount} files
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Task Requests Section */}
        <ClientTaskSection
          clientSlug={slug}
          phases={client.phases.map(p => p.folder)}
        />

        {/* Content Calendar Section */}
        <ClientCalendarSection clientSlug={slug} />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Files & Deliverables */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Files */}
            <div className="bg-white rounded-xl border border-simplicity-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base sm:text-lg font-semibold text-simplicity-charcoal flex items-center gap-2">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-simplicity-gray-400" />
                  Project Files
                </h2>
                <Link
                  href={`/client/${slug}/files`}
                  className="inline-flex items-center gap-1 text-xs sm:text-sm text-simplicity-turquoise hover:text-simplicity-turquoise/80 transition-colors"
                >
                  View All
                  <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </Link>
              </div>
              <div className="border border-simplicity-gray-200 rounded-lg p-3 sm:p-4 bg-simplicity-offwhite/50 max-h-60 sm:max-h-80 overflow-y-auto">
                {folderTree.length > 0 ? (
                  <ClientFolderTree 
                    nodes={folderTree} 
                    clientSlug={slug}
                  />
                ) : (
                  <p className="text-sm text-simplicity-gray-400 text-center py-4">
                    No files found
                  </p>
                )}
              </div>
            </div>

            {/* Assets Gallery */}
            <div className="bg-white rounded-xl border border-simplicity-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base sm:text-lg font-semibold text-simplicity-charcoal flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5 text-simplicity-gray-400" />
                  Generated Assets
                </h2>
                <span className="text-xs sm:text-sm text-simplicity-gray-500">
                  {generatedAssets} of {client.assets.length} ready
                </span>
              </div>
              <AssetGallery assets={client.assets} clientSlug={slug} />
            </div>
          </div>

          {/* Right Column - Deliverables & Actions */}
          <div className="space-y-6">
            {/* Deliverables */}
            <div className="bg-white rounded-xl border border-simplicity-gray-200 p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold text-simplicity-charcoal flex items-center gap-2 mb-4">
                <Package className="h-4 w-4 sm:h-5 sm:w-5 text-simplicity-gray-400" />
                Deliverables
              </h2>
              {client.deliverables.length > 0 ? (
                <div className="space-y-3">
                  {client.deliverables.map((deliverable) => (
                    <div
                      key={deliverable.name}
                      className={cn(
                        'flex items-center justify-between p-3 rounded-lg border',
                        deliverable.status === 'complete'
                          ? 'bg-green-50/50 border-green-200'
                          : 'bg-simplicity-gray-50 border-simplicity-gray-200'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center',
                          deliverable.status === 'complete'
                            ? 'bg-green-100'
                            : 'bg-simplicity-gray-100'
                        )}>
                          <Package className={cn(
                            'h-4 w-4',
                            deliverable.status === 'complete'
                              ? 'text-green-600'
                              : 'text-simplicity-gray-400'
                          )} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-simplicity-charcoal">
                            {deliverable.name}
                          </p>
                          <p className="text-xs text-simplicity-gray-400">
                            {deliverable.type}
                          </p>
                        </div>
                      </div>
                      {deliverable.status === 'complete' ? (
                        <button className="p-1.5 text-green-600 hover:bg-green-100 rounded transition-colors">
                          <Download className="h-4 w-4" />
                        </button>
                      ) : (
                        <span className="text-xs text-simplicity-gray-400 px-2 py-1 bg-simplicity-gray-100 rounded-full">
                          Pending
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-xl bg-simplicity-gray-100 flex items-center justify-center mx-auto mb-3">
                    <Package className="h-6 w-6 text-simplicity-gray-400" />
                  </div>
                  <p className="text-sm text-simplicity-gray-400">
                    No deliverables yet
                  </p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-simplicity-gray-200 p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold text-simplicity-charcoal mb-4">
                Quick Actions
              </h2>
              <div className="space-y-2">
                <ActionButton
                  icon={<Plus className="h-4 w-4" />}
                  label="Request New Task"
                  description="Submit a content or asset request"
                />
                <ActionButton
                  icon={<MessageSquare className="h-4 w-4" />}
                  label="Send Message"
                  description="Chat with the team"
                />
                <ActionButton
                  icon={<Calendar className="h-4 w-4" />}
                  label="View Calendar"
                  description="See content schedule"
                />
                <ActionButton
                  icon={<Download className="h-4 w-4" />}
                  label="Export All"
                  description="Download all deliverables"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({
  icon,
  label,
  value,
  total,
  color
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  total?: number;
  color: 'blue' | 'purple' | 'green' | 'amber';
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  return (
    <div className="bg-white rounded-xl border border-simplicity-gray-200 p-3 sm:p-4">
      <div className={cn('w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-2 sm:mb-3', colorClasses[color])}>
        {icon}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-xl sm:text-2xl font-bold text-simplicity-charcoal">{value}</span>
        {total !== undefined && (
          <span className="text-xs sm:text-sm text-simplicity-gray-400">/ {total}</span>
        )}
      </div>
      <p className="text-xs sm:text-sm text-simplicity-gray-500 mt-0.5">{label}</p>
    </div>
  );
}

// Action Button Component
function ActionButton({
  icon,
  label,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <button className="w-full flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg border border-simplicity-gray-200 hover:border-simplicity-turquoise/30 hover:bg-simplicity-turquoise/5 transition-all text-left group">
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
