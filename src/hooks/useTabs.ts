import { useState } from 'react';
// Added 'type' here to satisfy TypeScript's strict import rules
import type { Tab, WorkspaceContext } from '../types/browser'; 

export function useTabs() {
  const [globalWorkspace, setGlobalWorkspace] = useState<WorkspaceContext>('home');
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 1, title: 'New Tab', url: 'smartwindow / home', type: 'home', isActive: true }
  ]);

  const activeTab = tabs.find(t => t.isActive)!;

  const addTab = () => {
    const newId = Date.now();
    const isKiki = globalWorkspace === 'kiki';
    const newTab: Tab = {
      id: newId,
      title: isKiki ? 'Kiki Studio - Home' : 'New Tab',
      url: isKiki ? 'smartwindow / kiki-studio / home' : 'smartwindow / home',
      type: isKiki ? 'kiki' : 'home',
      isActive: true
    };
    setTabs(prev => prev.map(t => ({ ...t, isActive: false })).concat(newTab));
  };

  const closeTab = (id: number) => {
    if (tabs.length === 1) return;
    const tabIndex = tabs.findIndex(t => t.id === id);
    const wasActive = tabs[tabIndex].isActive;
    const newTabs = tabs.filter(tab => tab.id !== id);
    if (wasActive) {
      const nextActiveIndex = Math.min(tabIndex, newTabs.length - 1);
      newTabs[nextActiveIndex].isActive = true;
    }
    setTabs(newTabs);
  };

  const setActiveTab = (id: number) => {
    setTabs(tabs.map(tab => ({ ...tab, isActive: tab.id === id })));
  };

  const navigate = (title: string, url: string, type: 'home' | 'kiki') => {
    setTabs(prev => prev.map(t => t.isActive ? { ...t, title, url, type } : t));
  };

  const setUrl = (url: string) => {
    setTabs(prev => prev.map(t => t.isActive ? { ...t, url } : t));
  };

  return { 
    tabs, activeTab, globalWorkspace, setGlobalWorkspace, 
    addTab, closeTab, setActiveTab, navigate, setUrl 
  };
}