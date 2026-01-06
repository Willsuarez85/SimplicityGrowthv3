import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getClient, getFolderTree } from '@/lib/clients';
import { ThreePanelLayout } from '@/components/layout/ThreePanelLayout';

interface FilesPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: FilesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const client = getClient(slug);

  if (!client) {
    return { title: 'Client Not Found' };
  }

  return {
    title: `Files - ${client.name} | Simplicity Viewer`,
    description: `Browse and edit files for ${client.name}`,
  };
}

export default async function FilesPage({ params }: FilesPageProps) {
  const { slug } = await params;
  const client = getClient(slug);

  if (!client) {
    notFound();
  }

  const folderTree = getFolderTree(slug);

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <div className="text-simplicity-gray-400">Loading files...</div>
      </div>
    }>
      <ThreePanelLayout
        folderTree={folderTree}
        clientSlug={slug}
        clientName={client.name}
      />
    </Suspense>
  );
}
