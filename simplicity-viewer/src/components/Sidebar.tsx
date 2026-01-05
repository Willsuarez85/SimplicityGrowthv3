'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ViewerLogo } from '@/components/brand/Logo';
import { Building2, LayoutDashboard, CircleDot } from 'lucide-react';

interface Client {
  slug: string;
  name: string;
  status: string;
}

interface SidebarProps {
  clients: Client[];
}

const statusConfig = {
  active: {
    color: 'bg-emerald-500',
    label: 'Active',
  },
  onboarding: {
    color: 'bg-simplicity-turquoise',
    label: 'Onboarding',
  },
  paused: {
    color: 'bg-amber-400',
    label: 'Paused',
  },
} as const;

export function Sidebar({ clients }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      {/* Header with Logo */}
      <div className="p-5 border-b border-simplicity-gray-200">
        <ViewerLogo />
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="px-3 space-y-1">
          {/* Overview Link */}
          <Link
            href="/"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200',
              pathname === '/'
                ? 'bg-simplicity-charcoal text-simplicity-white font-medium'
                : 'text-simplicity-gray-500 hover:bg-simplicity-gray-100 hover:text-simplicity-charcoal'
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </Link>

          {/* Clients Section */}
          <div className="pt-6">
            <div className="px-3 mb-3">
              <span className="text-[11px] font-semibold text-simplicity-gray-400 uppercase tracking-wider">
                Clients
              </span>
            </div>

            <div className="space-y-0.5">
              {clients.map((client) => {
                const status = statusConfig[client.status as keyof typeof statusConfig] || statusConfig.active;
                const isActive = pathname === `/client/${client.slug}`;

                return (
                  <Link
                    key={client.slug}
                    href={`/client/${client.slug}`}
                    className={cn(
                      'group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200',
                      isActive
                        ? 'bg-simplicity-charcoal text-simplicity-white font-medium'
                        : 'text-simplicity-gray-500 hover:bg-simplicity-gray-100 hover:text-simplicity-charcoal'
                    )}
                  >
                    {/* Status Indicator */}
                    <span
                      className={cn(
                        'w-2 h-2 rounded-full flex-shrink-0 transition-transform',
                        status.color,
                        isActive && 'ring-2 ring-white ring-opacity-50'
                      )}
                      title={status.label}
                    />

                    {/* Client Icon */}
                    <Building2
                      className={cn(
                        'h-4 w-4 flex-shrink-0',
                        isActive ? 'text-simplicity-gray-300' : 'text-simplicity-gray-400'
                      )}
                    />

                    {/* Client Name */}
                    <span className="truncate">{client.name}</span>
                  </Link>
                );
              })}

              {clients.length === 0 && (
                <div className="px-3 py-8 text-center">
                  <CircleDot className="h-8 w-8 mx-auto text-simplicity-gray-300 mb-2" />
                  <p className="text-sm text-simplicity-gray-400">
                    No clients found
                  </p>
                  <p className="text-xs text-simplicity-gray-300 mt-1">
                    Add client folders to get started
                  </p>
                </div>
              )}
            </div>
          </div>
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-simplicity-gray-200">
        <div className="flex items-center justify-between text-xs text-simplicity-gray-400">
          <span>Simplicity Viewer</span>
          <span className="px-2 py-0.5 rounded-full bg-simplicity-gray-100 text-simplicity-gray-500 text-[10px] font-medium">
            v1.0
          </span>
        </div>
      </div>
    </div>
  );
}
