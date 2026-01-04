'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { StatusBadge } from './StatusBadge';
import { Image as ImageIcon, Video, FileText, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Module-level cache - persists across component lifecycle, prevents duplicate fetches
const imageCache = new Map<string, string>();
const fetchingSet = new Set<string>(); // Track in-progress fetches

interface Asset {
  name: string;
  path: string;
  type: 'image' | 'video' | 'document';
  status: 'generated' | 'pending';
  size?: number;
}

interface AssetGalleryProps {
  assets: Asset[];
  clientSlug: string;
  maxItems?: number;
}

function formatSize(bytes?: number): string {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface AssetCardProps {
  assetPath: string;
  assetName: string;
  assetType: 'image' | 'video' | 'document';
  assetStatus: 'generated' | 'pending';
  assetSize?: number;
  clientSlug: string;
}

function AssetCard({
  assetPath,
  assetName,
  assetType,
  assetStatus,
  assetSize,
  clientSlug
}: AssetCardProps) {
  const cacheKey = `${clientSlug}/${assetPath}`;

  // Check cache first for initial state
  const [imageData, setImageData] = useState<string | null>(() => {
    return imageCache.get(cacheKey) || null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Skip if not an image
    if (assetType !== 'image') return;

    // Already have data from cache
    if (imageCache.has(cacheKey)) {
      setImageData(imageCache.get(cacheKey)!);
      return;
    }

    // Already fetching this image
    if (fetchingSet.has(cacheKey)) return;

    // Start fetch
    fetchingSet.add(cacheKey);
    setLoading(true);

    fetch(`/api/files/${clientSlug}/04-assets/${assetPath}`)
      .then(res => res.json())
      .then(data => {
        if (data.type === 'image' && data.data) {
          imageCache.set(cacheKey, data.data);
          setImageData(data.data);
        }
      })
      .catch(console.error)
      .finally(() => {
        fetchingSet.delete(cacheKey);
        setLoading(false);
      });
  }, [cacheKey, assetPath, assetType, clientSlug]);

  const Icon = assetType === 'image' ? ImageIcon
    : assetType === 'video' ? Video
    : FileText;

  return (
    <Card className="overflow-hidden group hover:shadow-md transition-shadow">
      {/* Thumbnail */}
      <div className="aspect-square bg-gray-100 relative flex items-center justify-center">
        {assetType === 'image' && imageData ? (
          <Image
            src={imageData}
            alt={assetName}
            fill
            className="object-cover"
            unoptimized
          />
        ) : loading ? (
          <Loader2 className="h-8 w-8 text-gray-300 animate-spin" />
        ) : (
          <Icon className="h-12 w-12 text-gray-300" />
        )}

        {/* Status overlay */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <StatusBadge status={assetStatus} size="sm" />
        </div>
      </div>

      {/* Info */}
      <div className="p-2">
        <p className="text-xs font-medium truncate" title={assetName}>
          {assetName}
        </p>
        <div className="flex items-center justify-between mt-1">
          <span className={cn(
            'text-xs capitalize',
            assetType === 'image' && 'text-purple-500',
            assetType === 'video' && 'text-blue-500',
            assetType === 'document' && 'text-gray-500'
          )}>
            {assetType}
          </span>
          <span className="text-xs text-gray-400">
            {formatSize(assetSize)}
          </span>
        </div>
      </div>
    </Card>
  );
}

export function AssetGallery({ assets, clientSlug, maxItems }: AssetGalleryProps) {
  const displayAssets = maxItems ? assets.slice(0, maxItems) : assets;
  const imageAssets = displayAssets.filter(a => a.type === 'image');
  const otherAssets = displayAssets.filter(a => a.type !== 'image');

  if (assets.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400">
        <ImageIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
        <p className="text-sm">No assets generated yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>{assets.length} total assets</span>
        <span>{assets.filter(a => a.status === 'generated').length} generated</span>
      </div>

      {/* Image grid */}
      {imageAssets.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {imageAssets.map((asset) => (
            <AssetCard
              key={asset.path}
              assetPath={asset.path}
              assetName={asset.name}
              assetType={asset.type}
              assetStatus={asset.status}
              assetSize={asset.size}
              clientSlug={clientSlug}
            />
          ))}
        </div>
      )}

      {/* Other files */}
      {otherAssets.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {otherAssets.map((asset) => (
            <AssetCard
              key={asset.path}
              assetPath={asset.path}
              assetName={asset.name}
              assetType={asset.type}
              assetStatus={asset.status}
              assetSize={asset.size}
              clientSlug={clientSlug}
            />
          ))}
        </div>
      )}

      {/* Show more indicator */}
      {maxItems && assets.length > maxItems && (
        <p className="text-sm text-center text-gray-400">
          +{assets.length - maxItems} more assets
        </p>
      )}
    </div>
  );
}
