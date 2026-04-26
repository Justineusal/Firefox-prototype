import { useState } from 'react';
import { BrowserShell } from './assets/Components/BrowserShell';
import { RegularBrowserShell } from './assets/Components/RegularBrowserShell';
import { useTabs } from './hooks/useTabs';

import HomePage from './assets/Pages/HomePage';
import KikiHomePage from './assets/Pages/KikiHomePage';
import SchedulePage from './assets/Pages/SchedulePage';
import ScheduleAssistant from './assets/Pages/ScheduleAssistant';
import TaskPreview from './assets/Pages/TaskPreview';
import TaskAssistant from './assets/Pages/TaskAssistant';
import BriefAssistant from './assets/Pages/BriefAssistant';
import BriefPage from './assets/Pages/BriefPage';
import RegularHomePage from './assets/Pages/RegularHomePage';
import CallAgentPage from './assets/Pages/CallAgentPage';
import DesignAssistant from './assets/Pages/DesignAssistant';
import HomeAssistant from './assets/Pages/HomeAssistant'; 

// --- NEW IMPORTS ---
import DesignSlides from './assets/Pages/DesignSlides';
import DesignSlidesAssistant from './assets/Pages/DesignSlidesAssistant';

export default function App() {
  const { 
    tabs, 
    activeTab, 
    setGlobalWorkspace, 
    addTab, 
    closeTab, 
    setActiveTab, 
    navigate, 
    setUrl 
  } = useTabs();

  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [isIntroInserted, setIsIntroInserted] = useState(false);
  
  const [browserMode, setBrowserMode] = useState<'smart' | 'regular'>('regular');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  
  const [isOvernightSummaryOpen, setIsOvernightSummaryOpen] = useState(false);
  
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  const goToHome = () => {
    setGlobalWorkspace('home');
    navigate('New Tab', 'smartwindow / home', 'home');
    setIsRightPanelOpen(false);
  };

  const goToKikiHome = () => {
    setGlobalWorkspace('kiki');
    navigate('Kiki Studio - Home', 'smartwindow / kiki-studio / home', 'kiki');
    setIsRightPanelOpen(false);
  };

  const goToSchedule = () => {
    navigate('Kiki Studio - Schedule', 'smartwindow / kiki-studio / schedule', 'kiki');
    setIsRightPanelOpen(true);
  };

  const goToTaskQueue = () => {
    navigate('Kiki Studio - Task Queue', 'smartwindow / kiki-studio / tasks', 'kiki');
    setIsRightPanelOpen(true);
  };

  const goToBrief = () => {
    navigate('Kiki Studio - Brief', 'smartwindow / kiki-studio / brief', 'kiki');
    setIsRightPanelOpen(true);
  };

  const goToCallAgent = () => {
    navigate('Kiki Studio - Call', 'smartwindow / kiki-studio / call', 'kiki');
    setIsRightPanelOpen(true);
  };

  // --- Routing for Design Slides ---
  const goToDesignSlides = () => {
    navigate('Maison Noir - Design', 'smartwindow / kiki-studio / design', 'kiki');
    // Keeping the panel open so they can continue to see the assistant message while looking at the doc
    setIsRightPanelOpen(true); 
  };

  const renderAssistant = () => {
    if (activeTab.url.includes('schedule')) return <ScheduleAssistant />;
    if (activeTab.url.includes('tasks')) return <TaskAssistant />;
    if (activeTab.url.includes('call')) return <DesignAssistant />;
    
    // --- NEW: Render Design Slides Assistant ---
    if (activeTab.url.includes('design')) return <DesignSlidesAssistant />;
    
    if (activeTab.url.includes('brief')) return (
      <BriefAssistant 
        isIntroInserted={isIntroInserted} 
        onToggleIntro={() => setIsIntroInserted(!isIntroInserted)} 
      />
    ); 
    
    // --- Pass the routing prop to HomeAssistant ---
    return <HomeAssistant onViewDesignDoc={goToDesignSlides} />;
  };

  const commonShellProps = {
    tabs,
    activeTab,
    setActiveTab: (id: number) => {
      setActiveTab(id);
      const targetTab = tabs.find(t => t.id === id);
      if (targetTab && targetTab.url.includes('home')) {
        setIsRightPanelOpen(false);
      }
    },
    addTab,
    closeTab: (e: React.MouseEvent, id: number) => { e.stopPropagation(); closeTab(id); },
    handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value),
    handleUrlSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const isKiki = activeTab.url.includes('kiki');
        navigate(activeTab.url, activeTab.url, isKiki ? 'kiki' : 'home');
        if (activeTab.url.includes('home')) {
          setIsRightPanelOpen(false);
        }
      }
    },
    onSwitchMode: (mode: 'smart' | 'regular') => {
      setBrowserMode(mode);
      if (mode === 'smart') {
        setIsOvernightSummaryOpen(true);
      }
    }
  };

  const renderContent = () => {
    if (activeTab.url.includes('schedule')) return <SchedulePage onBack={goToKikiHome} />;
    if (activeTab.url.includes('tasks')) return <TaskPreview onBack={goToKikiHome} />;
    if (activeTab.url.includes('brief')) return <BriefPage onBack={goToKikiHome} isIntroInserted={isIntroInserted} />;
    if (activeTab.url.includes('call')) return <CallAgentPage onExit={goToKikiHome} />;
    
    // --- Render Design Slides ---
    if (activeTab.url.includes('design')) return <DesignSlides onBack={goToKikiHome} />;
    
    if (activeTab.type === 'kiki') {
      return (
        <KikiHomePage 
          onNavigateToSchedule={goToSchedule} 
          onWorkspaceSelect={goToKikiHome} 
          onHomeWorkspaceSelect={goToHome}
          onNavigateToTasks={goToTaskQueue} 
          onNavigateToBrief={goToBrief}
          onNavigateToCall={goToCallAgent}
        />
      );
    }
    return (
      <HomePage 
        onWorkspaceSelect={goToKikiHome} 
        isTourActive={isTourActive}
        setIsTourActive={setIsTourActive}
        tourStep={tourStep}
        setTourStep={setTourStep}
      />
    );
  };

  return browserMode === 'smart' ? (
    <BrowserShell 
      {...commonShellProps}
      isRightPanelOpen={isRightPanelOpen}
      setIsRightPanelOpen={setIsRightPanelOpen}
      rightPanelContent={renderAssistant()}
      isOnboardingOpen={isOnboardingOpen}
      setIsOnboardingOpen={setIsOnboardingOpen}
      onboardingStep={onboardingStep}
      setOnboardingStep={setOnboardingStep}
      onFinishOnboarding={() => {
        setIsOnboardingOpen(false);
        setIsTourActive(true);
        setTourStep(1);
      }}
      isTourActive={isTourActive}
      setIsTourActive={setIsTourActive}
      tourStep={tourStep}
      setTourStep={setTourStep}
      isOvernightSummaryOpen={isOvernightSummaryOpen}
      setIsOvernightSummaryOpen={setIsOvernightSummaryOpen}
    >
      {renderContent()}
    </BrowserShell>
  ) : (
    <RegularBrowserShell {...commonShellProps}>
      <RegularHomePage 
        onGetStarted={() => {
          setBrowserMode('smart');
          setIsOnboardingOpen(true);
          setOnboardingStep(1);
        }} 
      />
    </RegularBrowserShell>
  );
}