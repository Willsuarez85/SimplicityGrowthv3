import { getAllClients } from '@/lib/clients';
import { ClientCard } from '@/components/ClientCard';
import { LayoutDashboard, Users, FileText, Image as ImageIcon } from 'lucide-react';

export default function HomePage() {
  const clients = getAllClients();

  // Calculate totals
  const totalFiles = clients.reduce(
    (sum, c) => sum + c.phases.reduce((pSum, p) => pSum + p.fileCount, 0),
    0
  );
  const totalAssets = clients.reduce((sum, c) => sum + c.assets.length, 0);
  const totalDeliverables = clients.reduce(
    (sum, c) => sum + c.deliverables.filter(d => d.status === 'complete').length,
    0
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-blue-500" />
          Client Overview
        </h1>
        <p className="text-gray-500 mt-1">
          View all clients and their project status
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-blue-700 font-medium">Clients</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 mt-2">{clients.length}</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-500" />
            <span className="text-sm text-purple-700 font-medium">Total Files</span>
          </div>
          <p className="text-2xl font-bold text-purple-900 mt-2">{totalFiles}</p>
        </div>

        <div className="bg-amber-50 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-amber-500" />
            <span className="text-sm text-amber-700 font-medium">Assets</span>
          </div>
          <p className="text-2xl font-bold text-amber-900 mt-2">{totalAssets}</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="text-green-500 text-lg">✓</span>
            <span className="text-sm text-green-700 font-medium">Deliverables Ready</span>
          </div>
          <p className="text-2xl font-bold text-green-900 mt-2">{totalDeliverables}</p>
        </div>
      </div>

      {/* Client Grid */}
      {clients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <ClientCard
              key={client.slug}
              slug={client.slug}
              name={client.name}
              industry={client.industry}
              status={client.status}
              phases={client.phases}
              assets={client.assets}
              deliverables={client.deliverables}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-600">No clients found</h3>
          <p className="text-gray-400 mt-1">
            Create a client folder in /clients/ to get started
          </p>
        </div>
      )}
    </div>
  );
}
