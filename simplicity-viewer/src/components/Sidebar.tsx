'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Building2, LayoutDashboard } from 'lucide-react';

interface Client {
  slug: string;
  name: string;
  status: string;
}

interface SidebarProps {
  clients: Client[];
}

export function Sidebar({ clients }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full w-64 border-r bg-gray-50/50">
      {/* Header */}
      <div className="p-4 border-b">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <div>
            <h1 className="font-semibold text-sm">Simplicity Viewer</h1>
            <p className="text-xs text-gray-500">Client Dashboard</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-2">
        <div className="px-3 space-y-1">
          {/* Overview Link */}
          <Link
            href="/"
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
              pathname === '/'
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </Link>

          {/* Clients Section */}
          <div className="pt-4">
            <div className="px-3 mb-2">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Clients
              </span>
            </div>

            {clients.map((client) => (
              <Link
                key={client.slug}
                href={`/client/${client.slug}`}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
                  pathname === `/client/${client.slug}`
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                <div
                  className={cn(
                    'w-2 h-2 rounded-full',
                    client.status === 'active' && 'bg-green-500',
                    client.status === 'onboarding' && 'bg-blue-500',
                    client.status === 'paused' && 'bg-amber-500'
                  )}
                />
                <Building2 className="h-4 w-4 text-gray-400" />
                <span className="truncate">{client.name}</span>
              </Link>
            ))}

            {clients.length === 0 && (
              <div className="px-3 py-4 text-sm text-gray-400 text-center">
                No clients found
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t text-xs text-gray-400">
        <p>Read-only viewer</p>
        <p>Use Claude Code to modify</p>
      </div>
    </div>
  );
}
