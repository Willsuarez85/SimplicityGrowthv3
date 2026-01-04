import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// Path to clients folder (relative to project root, going up to parent)
const CLIENTS_PATH = path.join(process.cwd(), '..', 'clients');

export interface PhaseStatus {
  name: string;
  folder: string;
  status: 'complete' | 'pending' | 'in_progress';
  fileCount: number;
}

export interface Asset {
  name: string;
  path: string;
  type: 'image' | 'video' | 'document';
  status: 'generated' | 'pending';
  size?: number;
}

export interface Deliverable {
  name: string;
  path: string;
  type: string;
  status: 'complete' | 'pending';
  date?: string;
}

export interface ClientConfig {
  slug: string;
  name: string;
  industry: string;
  status: string;
  extensions?: {
    agents?: string[];
    templates?: string[];
    knowledge?: string[];
  };
  overrides?: {
    content?: {
      default_length?: string;
      primary_format?: string;
    };
    platforms?: {
      priority?: string[];
    };
  };
}

export interface Client {
  slug: string;
  name: string;
  industry: string;
  status: string;
  phases: PhaseStatus[];
  assets: Asset[];
  deliverables: Deliverable[];
  config: ClientConfig;
}

// Get all client slugs (excluding _template)
export function getClientSlugs(): string[] {
  try {
    const entries = fs.readdirSync(CLIENTS_PATH, { withFileTypes: true });
    return entries
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('_'))
      .map(entry => entry.name);
  } catch (error) {
    console.error('Error reading clients directory:', error);
    return [];
  }
}

// Parse client_config.yaml
export function getClientConfig(slug: string): ClientConfig | null {
  const configPath = path.join(CLIENTS_PATH, slug, 'client_config.yaml');

  try {
    if (!fs.existsSync(configPath)) return null;
    const content = fs.readFileSync(configPath, 'utf-8');
    const parsed = yaml.load(content) as { client: ClientConfig };
    return parsed?.client || null;
  } catch (error) {
    console.error(`Error parsing config for ${slug}:`, error);
    return null;
  }
}

// Determine phase status from client_index.md
export function getPhaseStatuses(slug: string): PhaseStatus[] {
  const phases = [
    { name: 'Research', folder: '01-research' },
    { name: 'Strategy', folder: '02-strategy' },
    { name: 'Creative', folder: '03-creative' },
    { name: 'Assets', folder: '04-assets' },
    { name: 'Deliverables', folder: '05-deliverables' },
  ];

  const indexPath = path.join(CLIENTS_PATH, slug, 'client_index.md');
  let indexContent = '';

  try {
    if (fs.existsSync(indexPath)) {
      indexContent = fs.readFileSync(indexPath, 'utf-8');
    }
  } catch (error) {
    console.error(`Error reading client_index for ${slug}:`, error);
  }

  return phases.map(phase => {
    const phasePath = path.join(CLIENTS_PATH, slug, phase.folder);
    let fileCount = 0;

    try {
      if (fs.existsSync(phasePath)) {
        fileCount = countFilesRecursive(phasePath);
      }
    } catch (error) {
      console.error(`Error counting files in ${phasePath}:`, error);
    }

    // Determine status from client_index.md content
    let status: 'complete' | 'pending' | 'in_progress' = 'pending';

    // Look for phase section with status on next line
    // Format: ### 01-research/\n**Status:** ✅ Complete
    const sectionMatch = indexContent.match(
      new RegExp(`###\\s*${phase.folder}[\\s\\S]*?\\*\\*Status:\\*\\*\\s*(✅|⏳)\\s*(Complete|Pending)`, 'i')
    );

    if (sectionMatch) {
      status = sectionMatch[1] === '✅' ? 'complete' : 'pending';
    } else if (fileCount > 0) {
      // If no explicit status but files exist, mark as in_progress
      status = 'in_progress';
    }

    return {
      name: phase.name,
      folder: phase.folder,
      status,
      fileCount,
    };
  });
}

// Count files recursively in a directory
function countFilesRecursive(dirPath: string): number {
  let count = 0;
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && !entry.name.startsWith('.')) {
        count++;
      } else if (entry.isDirectory()) {
        count += countFilesRecursive(path.join(dirPath, entry.name));
      }
    }
  } catch {
    // Ignore errors
  }
  return count;
}

// Get assets from 04-assets folder
export function getAssets(slug: string): Asset[] {
  const assetsPath = path.join(CLIENTS_PATH, slug, '04-assets');
  const assets: Asset[] = [];

  const scanDir = (dir: string, relativePath: string = '') => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue;

      const fullPath = path.join(dir, entry.name);
      const relPath = path.join(relativePath, entry.name);

      if (entry.isDirectory()) {
        scanDir(fullPath, relPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        const stats = fs.statSync(fullPath);

        let type: 'image' | 'video' | 'document' = 'document';
        if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
          type = 'image';
        } else if (['.mp4', '.mov', '.avi', '.webm'].includes(ext)) {
          type = 'video';
        }

        assets.push({
          name: entry.name,
          path: relPath,
          type,
          status: 'generated', // If file exists, it's generated
          size: stats.size,
        });
      }
    }
  };

  try {
    if (!fs.existsSync(assetsPath)) return assets;
    scanDir(assetsPath);
  } catch (error) {
    console.error(`Error scanning assets for ${slug}:`, error);
  }

  return assets;
}

// Get deliverables from 05-deliverables folder
export function getDeliverables(slug: string): Deliverable[] {
  const delivPath = path.join(CLIENTS_PATH, slug, '05-deliverables');
  const deliverables: Deliverable[] = [];

  const scanDir = (dir: string, relativePath: string = '') => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue;

      const fullPath = path.join(dir, entry.name);
      const relPath = path.join(relativePath, entry.name);

      if (entry.isDirectory()) {
        scanDir(fullPath, relPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const isComplete = content.includes('Status: COMPLETE') ||
                          content.includes('## Delivery Status: COMPLETE');

        // Derive type from parent folder name
        const parentFolder = path.dirname(relPath);
        const deliverableType = parentFolder && parentFolder !== '.'
          ? parentFolder.replace(/-/g, ' ')
          : 'document';

        deliverables.push({
          name: entry.name.replace('.md', ''),
          path: relPath,
          type: deliverableType,
          status: isComplete ? 'complete' : 'pending',
        });
      }
    }
  };

  try {
    if (!fs.existsSync(delivPath)) return deliverables;
    scanDir(delivPath);
  } catch (error) {
    console.error(`Error scanning deliverables for ${slug}:`, error);
  }

  return deliverables;
}

// Get full client data
export function getClient(slug: string): Client | null {
  const config = getClientConfig(slug);
  if (!config) return null;

  return {
    slug: config.slug || slug,
    name: config.name || slug,
    industry: config.industry || 'Unknown',
    status: config.status || 'unknown',
    phases: getPhaseStatuses(slug),
    assets: getAssets(slug),
    deliverables: getDeliverables(slug),
    config,
  };
}

// Get all clients summary
export function getAllClients(): Client[] {
  const slugs = getClientSlugs();
  return slugs
    .map(slug => getClient(slug))
    .filter((client): client is Client => client !== null);
}

// Read a file from client folder
export function readClientFile(slug: string, filePath: string): string | null {
  const fullPath = path.join(CLIENTS_PATH, slug, filePath);

  try {
    if (!fs.existsSync(fullPath)) return null;
    return fs.readFileSync(fullPath, 'utf-8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

// Get folder tree for a client
export interface FolderNode {
  name: string;
  type: 'folder' | 'file';
  path: string;
  children?: FolderNode[];
  size?: number;
}

export function getFolderTree(slug: string, subPath: string = ''): FolderNode[] {
  const basePath = path.join(CLIENTS_PATH, slug, subPath);
  const nodes: FolderNode[] = [];

  try {
    if (!fs.existsSync(basePath)) return nodes;

    const entries = fs.readdirSync(basePath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue;

      const fullPath = path.join(basePath, entry.name);
      const relPath = path.join(subPath, entry.name);

      if (entry.isDirectory()) {
        nodes.push({
          name: entry.name,
          type: 'folder',
          path: relPath,
          children: getFolderTree(slug, relPath),
        });
      } else {
        const stats = fs.statSync(fullPath);
        nodes.push({
          name: entry.name,
          type: 'file',
          path: relPath,
          size: stats.size,
        });
      }
    }
  } catch (error) {
    console.error(`Error getting folder tree:`, error);
  }

  // Sort: folders first, then files
  return nodes.sort((a, b) => {
    if (a.type === 'folder' && b.type === 'file') return -1;
    if (a.type === 'file' && b.type === 'folder') return 1;
    return a.name.localeCompare(b.name);
  });
}
