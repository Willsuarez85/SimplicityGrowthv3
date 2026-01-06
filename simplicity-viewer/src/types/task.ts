// Task Request Type Definitions for Simplicity Viewer

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'pending' | 'in_progress' | 'review' | 'completed' | 'cancelled';
export type TaskCategory =
  | 'content_creation'
  | 'brand_update'
  | 'asset_generation'
  | 'strategy_revision'
  | 'deliverable_request'
  | 'other';

export interface TaskRequest {
  id: string;
  clientSlug: string;
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;

  // Metadata
  createdAt: string;
  updatedAt: string;
  dueDate?: string;

  // Assignment
  assignedAgent?: string;

  // References
  relatedFiles?: string[];
  relatedPhase?: string;

  // Notes and updates
  notes?: TaskNote[];
}

export interface TaskNote {
  id: string;
  content: string;
  author: 'user' | 'system' | 'agent';
  createdAt: string;
}

// Category display configuration
export const taskCategoryConfig: Record<TaskCategory, { label: string; icon: string }> = {
  content_creation: { label: 'Content Creation', icon: 'PenTool' },
  brand_update: { label: 'Brand Update', icon: 'Palette' },
  asset_generation: { label: 'Asset Generation', icon: 'Image' },
  strategy_revision: { label: 'Strategy Revision', icon: 'Target' },
  deliverable_request: { label: 'Deliverable Request', icon: 'Package' },
  other: { label: 'Other', icon: 'MoreHorizontal' },
};

// Priority display configuration
export const taskPriorityConfig: Record<TaskPriority, { label: string; color: string }> = {
  low: { label: 'Low', color: 'gray' },
  medium: { label: 'Medium', color: 'blue' },
  high: { label: 'High', color: 'amber' },
  urgent: { label: 'Urgent', color: 'red' },
};

// Status display configuration
export const taskStatusConfig: Record<TaskStatus, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'gray' },
  in_progress: { label: 'In Progress', color: 'blue' },
  review: { label: 'In Review', color: 'purple' },
  completed: { label: 'Completed', color: 'green' },
  cancelled: { label: 'Cancelled', color: 'red' },
};

// Helper to generate unique IDs
export function generateTaskId(): string {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Helper to create a new task request
export function createTaskRequest(
  clientSlug: string,
  data: Omit<TaskRequest, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'clientSlug'>
): TaskRequest {
  const now = new Date().toISOString();
  return {
    ...data,
    id: generateTaskId(),
    clientSlug,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };
}
