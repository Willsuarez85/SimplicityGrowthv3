import { getClient, getFolderTree } from '@/lib/clients';
import { notFound } from 'next/navigation';
import { PhaseProgress } from '@/components/PhaseProgress';
import { FolderTree } from '@/components/FolderTree';
import { AssetGallery } from '@/components/AssetGallery';
import { StatusBadge } from '@/components/StatusBadge';
import {
  ArrowLeft,
  Building2,
  Calendar,
  FileText,
  Package
} from 'lucide-react';
import Link from 'next/link';

interface ClientPageProps {
  params: Promise<{ slug: string }>;
}

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

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Overview
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              {client.name}
              <StatusBadge status={client.status === 'active' ? 'in_progress' : 'pending'} />
            </h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {client.industry}
              </span>
              <span className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                {totalFiles} files
              </span>
              <span className="flex items-center gap-1">
                <Package className="h-4 w-4" />
                {client.assets.length} assets
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Progress */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-sm font-medium text-gray-700 mb-4">Project Progress</h2>
        <PhaseProgress phases={client.phases} compact={false} />
        <div className="mt-4 text-sm text-gray-500">
          {completedPhases} of 5 phases complete
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Folder Structure */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-400" />
            Project Files
          </h2>
          <div className="border rounded-lg p-4 bg-white">
            {folderTree.length > 0 ? (
              <FolderTree nodes={folderTree} />
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">
                No files found
              </p>
            )}
          </div>
        </div>

        {/* Deliverables */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-gray-400" />
            Deliverables
          </h2>
          <div className="border rounded-lg p-4 bg-white">
            {client.deliverables.length > 0 ? (
              <div className="space-y-3">
                {client.deliverables.map((deliverable) => (
                  <div
                    key={deliverable.name}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Package className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">{deliverable.name}</p>
                        <p className="text-xs text-gray-500">{deliverable.type}</p>
                      </div>
                    </div>
                    <StatusBadge
                      status={deliverable.status === 'complete' ? 'complete' : 'pending'}
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">
                No deliverables yet
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Assets Gallery */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gray-400" />
          Generated Assets
        </h2>
        <div className="border rounded-lg p-4 bg-white">
          <AssetGallery
            assets={client.assets}
            clientSlug={slug}
          />
        </div>
      </div>
    </div>
  );
}
