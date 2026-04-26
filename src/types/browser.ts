export type TabType = 'home' | 'workspace' | 'kiki';

export interface Tab {
  id: number;
  title: string;
  url: string;
  type: TabType;
  isActive: boolean;
}

export type WorkspaceContext = 'home' | 'kiki';