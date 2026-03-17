export type UserRole = 'parent' | 'child';

export interface Task {
  id: string;
  title: string;
  description: string;
  stars: number;
  icon: string;
  color: string;
  deadline?: string;
  status: 'pending' | 'completed' | 'reviewed';
  childId: string;
  evidenceUrl?: string;
  checkList?: string[];
}

export interface Child {
  id: string;
  name: string;
  avatar: string;
  stars: number;
  totalStars: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  color: string;
  unlocked: boolean;
}

export interface Activity {
  id: string;
  type: 'task_completed' | 'reward_redeemed' | 'task_approved';
  user: string;
  detail: string;
  timestamp: string;
  color: string;
}
