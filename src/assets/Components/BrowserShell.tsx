import { useState, useRef, useEffect, type ReactNode } from 'react';

export type TabType = 'home' | 'workspace' | 'kiki';

export interface Tab {
  id: number;
  title: string;
  url: string;
  type: TabType;
  isActive: boolean;
}

export const thinRegularClass = "font-normal opacity-[0.85] tracking-tight";

interface ShellProps {
  tabs: Tab[];
  activeTab: Tab;
  setActiveTab: (id: number) => void;
  addTab: () => void;
  closeTab: (e: React.MouseEvent, id: number) => void;
  handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUrlSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isRightPanelOpen: boolean;
  setIsRightPanelOpen: (isOpen: boolean) => void;
  rightPanelContent?: ReactNode; 
  onSwitchMode?: (mode: 'smart' | 'regular') => void; 
  
  isOnboardingOpen?: boolean;
  setIsOnboardingOpen?: (isOpen: boolean) => void;
  onboardingStep?: number;
  setOnboardingStep?: (step: number) => void;
  onFinishOnboarding?: () => void;

  isOvernightSummaryOpen?: boolean;
  setIsOvernightSummaryOpen?: (isOpen: boolean) => void;

  isTourActive?: boolean;
  setIsTourActive?: (active: boolean) => void;
  tourStep?: number;
  setTourStep?: (step: number) => void;

  children: ReactNode;
}

export const BrowserShell = ({ 
  tabs, activeTab, setActiveTab, addTab, closeTab, 
  handleUrlChange, handleUrlSubmit, isRightPanelOpen, setIsRightPanelOpen, 
  rightPanelContent, onSwitchMode, 
  isOnboardingOpen, setIsOnboardingOpen, onboardingStep, setOnboardingStep,
  onFinishOnboarding,
  isOvernightSummaryOpen, setIsOvernightSummaryOpen,
  isTourActive, setIsTourActive, tourStep, setTourStep,
  children 
}: ShellProps) => {
  
  const [isModeOpen, setIsModeOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [eraseCache, setEraseCache] = useState(false);
  const [alwaysEraseCache, setAlwaysEraseCache] = useState(false);
  const [allowHistory, setAllowHistory] = useState(false);
  const [turnOnMemory, setTurnOnMemory] = useState(false);
  
  // --- NEW STATE: CONFLICT RESOLUTION ---
  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsModeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const assets = {
    logo: activeTab.type === 'kiki' ? "/profile_1.webp" : "/Pill_SW.webp",
    pill: "/Pill_SW.webp",
    workspace: "/workspace_icon.webp",
    star: "/star_icon.webp",
    back: "/back_icon.webp",
    forward: "/forward_icon.webp",
    refresh: "/refresh_icon.webp",
    down: "/down_icon.webp",
    shield: "/shield_icon.webp",
    lock: "/lock_icon.webp",
    meter: "/meter_icon.webp",
    save: "/save_icon.webp",
    check: "/check_icon.webp", 
    profile: "/profile_icon.webp",
    puzzle: "/puzzle_icon.webp",
    burger: "/burgermenu_icon.webp",
    tab: "/tab_icon.webp",
    x: "/X_icon.webp",
    import: "/import_icon.webp",
    universal: "/universal_icon.webp",
    firefox: "/firefox_icon.webp",
    private: "/private_icon.webp"
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-orange-400 to-orange-600 p-3 flex items-center justify-center overflow-hidden font-inter text-[#202124] antialiased relative">
      <div className="flex flex-col h-full w-full bg-[#dee1e6] rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] overflow-hidden border border-white/20">
        
        {/* --- HEADER --- */}
        <header className="h-10 flex items-center px-3 bg-[#dee1e6] gap-2 select-none shrink-0">
          <div className="flex gap-2 px-2 items-center mr-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" /><div className="w-3 h-3 rounded-full bg-[#febc2e]" /><div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex items-center h-full gap-1 py-1">
            {tabs.map((tab) => (
              <div key={tab.id} onClick={() => setActiveTab(tab.id)} className={`group px-3 h-8 rounded-[4px] text-[11px] flex items-center gap-2 min-w-[160px] max-w-[220px] cursor-pointer border transition-all ${tab.isActive ? 'bg-[#F9F9FB] shadow-sm border-gray-300/10' : 'bg-white/10 border-transparent opacity-60 hover:bg-white/20'}`}>
                 <img src={tab.type === 'kiki' ? '/profile_1.webp' : '/Pill_SW.webp'} className="w-4 h-4 object-contain" alt="" />
                 <span className={`flex-1 truncate ${tab.isActive ? 'font-medium' : thinRegularClass}`}>{tab.title}</span>
                 <button onClick={(e) => closeTab(e, tab.id)} className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-black/10 transition-opacity">
                   <img src={assets.x} className="w-2.5 h-2.5 object-contain" alt="" />
                 </button>
              </div>
            ))}
            <button onClick={addTab} className="w-7 h-7 flex items-center justify-center text-gray-600 text-xl hover:bg-gray-300/60 rounded-md transition-colors ml-1">+</button>
          </div>

          <div className="flex-1 flex justify-end items-center gap-4 pr-3 relative" ref={dropdownRef}>
            <button onClick={() => setIsExitModalOpen(true)} className="bg-[#FF980E] hover:bg-[#E8890C] transition-colors text-white text-[11px] font-bold rounded-[8px] flex items-center justify-center h-6 w-[98px]">
              Smart Exit
            </button>
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setIsModeOpen(!isModeOpen)}>
              <img src={assets.down} className={`w-2.5 object-contain opacity-60 transition-transform duration-200 ${isModeOpen ? 'rotate-180' : ''}`} alt="" />
              <div className="flex items-center gap-2">
                 <img src={assets.logo} className="w-5 h-5 object-contain" alt="" />
                 <span className={`text-[12px] text-gray-600 ${thinRegularClass}`}>Smart Window</span>
              </div>
            </div>
            {isModeOpen && (
              <div className="absolute top-9 right-0 w-[240px] bg-white rounded-[8px] shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100 p-1.5 z-[100] animate-in fade-in zoom-in-95 duration-150">
                <div className="flex flex-col">
                  <div onClick={() => { onSwitchMode?.('regular'); setIsModeOpen(false); }} className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-[6px] transition-colors group cursor-pointer">
                    <img src={assets.firefox} className="w-7 h-7 object-contain" alt="" /><span className="text-[15px] text-[#5B5B66] font-medium tracking-tight">Regular Window</span>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 bg-[#F0F0F4] rounded-[6px] cursor-default">
                    <img src="/Pill_SW.webp" className="w-7 h-7 object-contain" alt="" /><span className="text-[15px] text-[#5B5B66] font-medium tracking-tight">Smart Window</span>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-[6px] transition-colors group cursor-pointer">
                    <img src={assets.private} className="w-7 h-7 object-contain" alt="" /><span className="text-[15px] text-[#5B5B66] font-medium tracking-tight">Private Window</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* --- NAV / ADDRESS BAR --- */}
        <nav className="h-10 flex items-center pr-4 bg-[#F9F9FB] justify-between gap-4 border-b border-gray-200/30 shrink-0">
          <div className="flex gap-1 text-gray-600 items-center">
            <div className="w-[40px] flex justify-center shrink-0">
              <button className="p-1.5 hover:bg-gray-200 rounded flex items-center justify-center"><img src={assets.tab} className="w-[18px] object-contain opacity-70" alt="" /></button>
            </div>
            <button className="p-1.5 hover:bg-gray-200 rounded"><img src={assets.back} className="w-[18px] object-contain opacity-70" alt="" /></button>
            <button className="p-1.5 hover:bg-gray-200 rounded"><img src={assets.forward} className="w-[18px] object-contain opacity-70" alt="" /></button>
            <button className="p-1.5 hover:bg-gray-200 rounded"><img src={assets.refresh} className="w-[18px] object-contain opacity-70" alt="" /></button>
          </div>
          <div className="flex-1 max-w-5xl h-7 bg-[#E9E9EB] border border-transparent rounded-[4px] flex items-center px-3 shadow-sm focus-within:bg-white focus-within:border-gray-300 transition-all duration-200">
            <div className="flex gap-2.5 items-center mr-3 shrink-0"><img src={assets.shield} className="w-3.5 h-3.5 object-contain opacity-80" alt="" /><img src={assets.lock} className="w-3.5 h-3.5 object-contain opacity-80" alt="" /><img src={assets.meter} className="w-3.5 h-3.5 object-contain opacity-80" alt="" /></div>
            <input className={`flex-1 text-[12px] outline-none text-gray-600 bg-transparent ${thinRegularClass}`} value={activeTab.url} onChange={handleUrlChange} onKeyDown={handleUrlSubmit} />
          </div>
          <div className="flex items-center gap-1">
             <button className="p-1.5 hover:bg-gray-200 rounded transition-colors"><img src={assets.save} className="w-[18px] object-contain opacity-70" alt="" /></button>
             <button className="p-1.5 hover:bg-gray-200 rounded transition-colors"><img src={assets.profile} className="w-[18px] object-contain opacity-70" alt="" /></button>
             <div className="w-[1px] h-4 bg-gray-300 mx-1" />
             <button className="p-1.5 hover:bg-gray-200 rounded transition-colors"><img src={assets.burger} className="w-[18px] object-contain opacity-70" alt="" /></button>
          </div>
        </nav>

        {/* --- BOOKMARKS BAR --- */}
        <div className="h-8 flex items-center px-4 gap-4 text-[11px] text-gray-600 font-medium bg-[#F9F9FB] shrink-0">
          <button className="opacity-70 hover:opacity-100 transition-opacity flex items-center gap-1.5"><img src={assets.import} className="w-3.5 h-3.5 object-contain" alt="" />Import bookmarks...</button>
          <button className="opacity-70 hover:opacity-100 transition-opacity flex items-center gap-1.5"><img src={assets.universal} className="w-3.5 h-3.5 object-contain" alt="" />Getting started</button>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex flex-1 overflow-hidden bg-[#F9F9FB]">
          <aside className="w-[40px] flex flex-col items-center pt-2 gap-5 bg-[#F9F9FB] shrink-0">
            <button className="opacity-80 hover:opacity-100 transition-opacity"><img src={assets.workspace} className="w-[18px] h-[18px] object-contain" alt="" /></button>
            <button className="opacity-80 hover:opacity-100 transition-opacity"><img src={assets.star} className="w-[18px] h-[18px] object-contain" alt="" /></button>
          </aside>
          
          <main className="flex-1 bg-[#F0F0F2] rounded-tl-[10px] rounded-tr-[10px] relative flex flex-col border-t border-l border-r border-gray-200/50 overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)] transition-all duration-300">
            {children}
          </main>

          {/* --- RIGHT SIDEBAR --- */}
          <aside className={`bg-[#F9F9FB] flex flex-col shrink-0 transition-all duration-300 overflow-visible ${isRightPanelOpen ? 'w-[360px]' : 'w-[40px]'} ${isTourActive && tourStep === 4 ? 'z-[301] relative' : ''}`}>
            {isRightPanelOpen ? (
              <div className="w-[360px] h-full flex flex-col overflow-hidden relative">
                
                {/* Fixed Top Header */}
                <div className="flex items-center justify-between mb-3 mt-5 px-5 shrink-0 z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#FF980E]"></div>
                    <span className={`text-[13px] text-[#82828C] font-medium ${thinRegularClass}`}>Smart Window</span>
                  </div>
                  <button onClick={() => setIsRightPanelOpen(false)} className="opacity-50 hover:opacity-100 p-1.5 rounded hover:bg-gray-200 transition-all">
                    <img src={assets.x} className="w-3.5 h-3.5 object-contain" alt="" />
                  </button>
                </div>
                
                <div className="flex-1 flex flex-col px-5 overflow-hidden">
                  {rightPanelContent}
                </div>

              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center pt-5 relative">
                <button onClick={() => setIsRightPanelOpen(true)} className="relative">
                  <img src={assets.pill} className="w-7 h-7 object-contain" alt="" />
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#E96A51] rounded-full border-2 border-[#F9F9FB]"></div>
                </button>

                {/* --- STEP 4: ASSISTANT TOOLTIP --- */}
                {isTourActive && tourStep === 4 && (
                  <div className="absolute top-4 right-12 w-[280px] bg-white rounded-xl shadow-2xl p-5 animate-in fade-in slide-in-from-right-4 duration-200 z-[400]">
                    <div className="w-4 h-4 bg-white absolute top-3 -right-2 rotate-45"></div>
                    <div className="relative z-10 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[15px] font-bold text-[#202124]">Assistant</h3>
                        <span className="text-[12px] text-gray-400 font-medium">4 of 4</span>
                      </div>
                      <p className="text-[13px] text-[#5B5B66] leading-relaxed text-left">
                        This is where AI speaks and notifies you. Open it anytime to get contextual help, manage tasks, or chat with your assistant.
                      </p>
                      <button 
                        onClick={() => {
                          setIsTourActive?.(false);
                          if (setTourStep) setTourStep(0);
                        }} 
                        className="mt-3 self-end bg-[#FFD29D] hover:bg-[#F4C48A] text-[#202124] text-[13px] font-medium px-5 py-1.5 rounded-[6px] transition-colors"
                      >
                        Got it!
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* --- OVERNIGHT SUMMARY MODAL --- */}
      {isOvernightSummaryOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div className="bg-white w-[540px] rounded-[16px] shadow-2xl flex flex-col p-8 pb-7 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <img src="/shiny_icon.webp" className="w-[22px] h-[22px] object-contain" alt="" />
                <h2 className="text-[20px] font-bold text-[#202124] tracking-tight">Overnight Summary</h2>
              </div>
              <button onClick={() => setIsOvernightSummaryOpen?.(false)} className="text-gray-500 hover:text-black transition-colors p-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <p className={`text-[14px] text-[#5B5B66] mb-6 ${thinRegularClass}`}>
              Catch up on what’s completed while you were away.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {/* Item 1 */}
              <div className="bg-[#F5F5F5] rounded-[8px] p-4 flex items-start gap-4">
                <div className="w-8 h-8 rounded-[6px] bg-[#9EC0E6] text-white flex items-center justify-center shrink-0">
                   <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 16.5A2.5 2.5 0 0118.5 19H7l-4 4V5.5A2.5 2.5 0 015.5 3h13A2.5 2.5 0 0121 5.5v11z" /></svg>
                </div>
                <div className="flex flex-col">
                  <p className={`text-[14px] text-[#3A3A40] leading-snug ${thinRegularClass}`}>Secretary agent wants to confirm client’s contact info.</p>
                  <span className="text-[12px] text-[#82828C] mt-0.5">2:11 AM</span>
                </div>
              </div>

              {/* Item 2 - UPDATED: SMART DECK READY */}
              <div className="bg-[#F5F5F5] rounded-[8px] p-4 flex items-start gap-4">
                <div className="w-8 h-8 rounded-[6px] bg-[#FFC270] text-white flex items-center justify-center shrink-0">
                   <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                </div>
                <div className="flex flex-col">
                  <p className={`text-[14px] text-[#3A3A40] leading-snug ${thinRegularClass}`}>Agents prepared the deck for Maison Noir’s presentation. Ready to review.</p>
                  <span className="text-[12px] text-[#82828C] mt-0.5">5:42 AM</span>
                </div>
              </div>

              {/* Item 3 (Conflict) */}
              <div className="bg-white border border-[#A23629] rounded-[8px] p-4 flex items-start gap-4 transition-all">
                <div className="w-8 h-8 rounded-[6px] bg-[#A23629] text-white flex items-center justify-center shrink-0">
                   <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <div className="flex flex-col flex-1">
                  <p className="text-[14px] text-[#A23629] font-medium">Conflict detected</p>
                  <p className={`text-[14px] text-[#3A3A40] mt-1 mb-3 leading-relaxed ${thinRegularClass}`}>
                    Secretary agent tried to send a design proposal with conflicting client contact info. Review conflict before proceeding?
                  </p>
                  <div className="flex justify-end gap-3 mt-1">
                    <button className="px-4 py-1.5 bg-[#E3E3E5] hover:bg-[#D4D4D8] rounded-[6px] text-[12px] font-bold text-[#202124] transition-colors">
                      Dismiss
                    </button>
                    <button 
                      onClick={() => setIsConflictModalOpen(true)}
                      className="px-4 py-1.5 bg-[#A23629] hover:bg-[#8C2A2A] rounded-[6px] text-[12px] font-bold text-white transition-colors shadow-sm"
                    >
                      Review conflict
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center pt-2">
              <button 
                onClick={() => setIsOvernightSummaryOpen?.(false)} 
                className="px-8 py-2.5 bg-[#FFD29D] hover:bg-[#F4C48A] rounded-[8px] text-[14px] font-medium text-[#202124] transition-colors"
              >
                Start Smart Window
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- EXIT MODAL --- */}
      {isExitModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
          <div className="bg-white w-[540px] rounded-xl shadow-2xl overflow-hidden flex flex-col p-7 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3"><img src="/shiny_icon.webp" className="w-6 h-6 object-contain" alt="" /><h2 className="text-[20px] font-medium text-[#202124] tracking-tight">Exit Smart Window?</h2></div>
              <button onClick={() => setIsExitModalOpen(false)} className="text-gray-500 hover:text-black transition-colors p-1"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
            </div>
            <p className={`text-[#3A3A40] text-[15px] mb-6 ${thinRegularClass}`}>This will close Smart Window and stop all active AI assistance.</p>
            <div className="h-[1px] w-full bg-gray-200 mb-6" />
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input type="checkbox" checked={eraseCache} onChange={(e) => { setEraseCache(e.target.checked); if (!e.target.checked) setAlwaysEraseCache(false); }} className="w-[18px] h-[18px] rounded-[4px] border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                  <span className={`text-[15px] text-[#3A3A40] ${thinRegularClass}`}>Erase AI cache and session memory for this time only</span>
                </label>
                <button className="text-[#0060DF] hover:underline text-[13px] text-left ml-[30px] w-max">What's AI cache?</button>
              </div>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" checked={alwaysEraseCache} onChange={(e) => { setAlwaysEraseCache(e.target.checked); if (e.target.checked) setEraseCache(true); }} className="w-[18px] h-[18px] rounded-[4px] border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                <span className={`text-[15px] text-[#3A3A40] ${thinRegularClass}`}>Always erase cache when ending session</span>
              </label>
            </div>
            <div className="h-[1px] w-full bg-gray-200 mb-6" />
            <div className="flex justify-end gap-3 mt-1">
              <button onClick={() => setIsExitModalOpen(false)} className="px-6 py-2.5 bg-[#E3E3E5] hover:bg-[#D4D4D8] rounded-[8px] text-[14px] font-medium text-[#202124] transition-colors">Cancel Exit</button>
              <button onClick={() => { setIsExitModalOpen(false); onSwitchMode?.('regular'); }} className="px-6 py-2.5 bg-[#FFD29D] hover:bg-[#F4C48A] rounded-[8px] text-[14px] font-medium text-[#202124] transition-colors">Exit Smart Window</button>
            </div>
          </div>
        </div>
      )}

      {/* --- ONBOARDING MODAL OVERLAY --- */}
      {isOnboardingOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div className="bg-white w-[640px] rounded-[16px] shadow-2xl flex flex-col p-8 pb-7 animate-in fade-in zoom-in-95 duration-200">
            
            {/* --- STEP 1 --- */}
            {onboardingStep === 1 && (
              <div className="flex flex-col w-full animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="relative flex flex-col items-center text-center w-full">
                  <div className="flex items-center gap-2.5 mb-1.5"><img src="/shiny_icon.webp" className="w-[22px] h-[22px] object-contain" alt="" /><h2 className="text-[22px] font-bold text-[#202124] tracking-tight">Meet Smart Window</h2></div>
                  <p className={`text-[14px] text-[#5B5B66] max-w-[420px] leading-relaxed ${thinRegularClass}`}>A thinking partner integrated directly into Firefox to help you browse, read, research, and create faster.</p>
                  <button onClick={() => setIsOnboardingOpen?.(false)} className="absolute top-0 right-0 text-gray-500 hover:text-black transition-colors p-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="border border-[#E5E5EA] rounded-[8px] p-5 flex flex-col gap-3">
                    <div className="w-8 h-8 rounded-[6px] bg-[#FFEDD5] flex items-center justify-center text-[#F97316]"><svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div>
                    <h3 className="text-[14px] font-semibold text-[#202124]">Summarize Content</h3>
                    <p className={`text-[13px] text-[#5B5B66] leading-relaxed ${thinRegularClass}`}>Get the key points of any webpage(s) instantly without reading every word.</p>
                  </div>
                  <div className="border border-[#E5E5EA] rounded-[8px] p-5 flex flex-col gap-3">
                    <div className="w-8 h-8 rounded-[6px] bg-[#FFEDD5] flex items-center justify-center text-[#F97316]"><svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg></div>
                    <h3 className="text-[14px] font-semibold text-[#202124]">Compare Tabs</h3>
                    <p className={`text-[13px] text-[#5B5B66] leading-relaxed ${thinRegularClass}`}>Extract and synthesize data across multiple tabs into a single summary.</p>
                  </div>
                  <div className="border border-[#E5E5EA] rounded-[8px] p-5 flex flex-col gap-3">
                    <div className="w-8 h-8 rounded-[6px] bg-[#FFEDD5] flex items-center justify-center text-[#F97316]"><svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></div>
                    <h3 className="text-[14px] font-semibold text-[#202124]">Draft Messages</h3>
                    <p className={`text-[13px] text-[#5B5B66] leading-relaxed ${thinRegularClass}`}>Write emails, messages, or briefs using the context of your page with your voice.</p>
                  </div>
                  <div className="border border-[#E5E5EA] rounded-[8px] p-5 flex flex-col gap-3">
                    <div className="w-8 h-8 rounded-[6px] bg-[#FFEDD5] flex items-center justify-center text-[#F97316]"><svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></div>
                    <h3 className="text-[14px] font-semibold text-[#202124]">Research Partner</h3>
                    <p className={`text-[13px] text-[#5B5B66] leading-relaxed ${thinRegularClass}`}>Help organize your research plan and findings into actionable tasks.</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-8 relative">
                  <button onClick={() => setIsOnboardingOpen?.(false)} className={`text-[13px] text-[#5B5B66] hover:text-black ${thinRegularClass}`}>Skip for now</button>
                  <div className="flex gap-1.5 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"><div className="w-5 h-1.5 bg-[#FF980E] rounded-full"></div><div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div><div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div></div>
                  <button onClick={() => setOnboardingStep?.(2)} className="px-8 py-2.5 bg-[#FFD29D] hover:bg-[#F4C48A] rounded-[8px] text-[14px] font-medium text-[#202124] transition-colors">Continue</button>
                </div>
              </div>
            )}

            {/* --- STEP 2 --- */}
            {onboardingStep === 2 && (
              <div className="flex flex-col w-full animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="relative flex flex-col items-center text-center w-full mb-6">
                  <button onClick={() => setOnboardingStep?.(1)} className="absolute top-0 left-0 text-gray-500 hover:text-black transition-colors p-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg></button>
                  <button onClick={() => setIsOnboardingOpen?.(false)} className="absolute top-0 right-0 text-gray-500 hover:text-black transition-colors p-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                  <div className="flex items-center gap-2.5 mb-1.5"><img src="/shiny_icon.webp" className="w-[22px] h-[22px] object-contain" alt="" /><h2 className="text-[22px] font-bold text-[#202124] tracking-tight">Your Privacy and Data</h2></div>
                  <p className={`text-[14px] text-[#5B5B66] max-w-[480px] leading-relaxed ${thinRegularClass}`}>Smart Window learns from your browsing to provide better assistance. <br/> You decide how long that knowledge lasts.</p>
                </div>
                
                {/* Browsing History Block */}
                <div className="mb-4 border border-[#FFD29D] bg-[#FFFAEF]/40 rounded-[8px] p-5 flex items-start gap-4">
                  <div className="mt-0.5 text-[#E8890C]"><svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="flex items-center gap-2"><h3 className="text-[14px] font-bold text-[#202124]">Allow access to browsing history?</h3><span className="border border-[#DCDCE0] text-[#5B5B66] text-[10px] font-medium px-1.5 py-0.5 rounded-[4px]">Recommended</span></div>
                    <p className={`text-[12px] text-[#5B5B66] leading-relaxed ${thinRegularClass} max-w-[400px]`}>You can enable Smart Window to access your browsing history to start customizing your workspace.</p>
                    <button className="text-[#0060DF] text-[12px] hover:underline text-left mt-1 w-max">Learn more about our AI Privacy</button>
                  </div>
                  <button onClick={() => setAllowHistory(!allowHistory)} className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors mt-1 ${allowHistory ? 'bg-[#0060DF]' : 'bg-gray-300'}`}><div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${allowHistory ? 'translate-x-4' : ''}`}></div></button>
                </div>

                <div className="border border-[#FFD29D] bg-white rounded-[8px] p-5 flex items-start gap-4">
                  <div className="mt-0.5 text-[#E8890C]"><svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="flex items-center gap-2"><h3 className="text-[14px] font-bold text-[#202124]">Turn on memory now?</h3><span className="border border-[#DCDCE0] text-[#5B5B66] text-[10px] font-medium px-1.5 py-0.5 rounded-[4px]">Recommended</span></div>
                    <p className={`text-[13px] text-[#5B5B66] leading-relaxed ${thinRegularClass} max-w-[440px]`}>Allows Smart Window to store browsing preferences, drafting voice, and working styles across browser tabs.</p>
                  </div>
                  <button onClick={() => setTurnOnMemory(!turnOnMemory)} className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors mt-1 shrink-0 ${turnOnMemory ? 'bg-[#0060DF]' : 'bg-gray-300'}`}><div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${turnOnMemory ? 'translate-x-4' : ''}`}></div></button>
                </div>

                <div className="flex items-center justify-between mt-8 relative">
                  <button onClick={() => setIsOnboardingOpen?.(false)} className={`text-[13px] text-[#5B5B66] hover:text-black ${thinRegularClass}`}>Skip for now</button>
                  <div className="flex gap-1.5 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"><div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div><div className="w-5 h-1.5 bg-[#FF980E] rounded-full"></div><div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div></div>
                  <button onClick={() => setOnboardingStep?.(3)} className="px-8 py-2.5 bg-[#FFD29D] hover:bg-[#F4C48A] rounded-[8px] text-[14px] font-medium text-[#202124] transition-colors">Continue</button>
                </div>
              </div>
            )}

            {/* --- STEP 3 --- */}
            {onboardingStep === 3 && (
              <div className="flex flex-col w-full animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="relative flex flex-col items-center text-center w-full mb-6">
                  <button onClick={() => setOnboardingStep?.(2)} className="absolute top-0 left-0 text-gray-500 hover:text-black transition-colors p-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg></button>
                  <button onClick={() => setIsOnboardingOpen?.(false)} className="absolute top-0 right-0 text-gray-500 hover:text-black transition-colors p-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                  <div className="flex items-center gap-2.5 mb-1.5"><img src="/shiny_icon.webp" className="w-[22px] h-[22px] object-contain" alt="" /><h2 className="text-[22px] font-bold text-[#202124] tracking-tight">You’re All Set</h2></div>
                  <p className={`text-[14px] text-[#5B5B66] max-w-[480px] leading-relaxed ${thinRegularClass}`}>Smart Window is now active and ready to help.</p>
                </div>
                <div className="border border-[#FFD29D] bg-[#FFFAEF]/40 rounded-[8px] p-6 mb-6">
                  <p className={`text-[14px] text-[#5B5B66] leading-relaxed ${thinRegularClass}`}>Use Smart Window to help you search and find information faster. Smart Window can also set workspaces up for you based on your browsing history enabled in your privacy settings.</p>
                </div>
                <div className="h-[1px] w-full bg-[#E5E5EA] mb-6" />
                <div className="flex items-center justify-end relative mt-2">
                  <div className="flex gap-1.5 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"><div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div><div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div><div className="w-5 h-1.5 bg-[#FF980E] rounded-full"></div></div>
                  <button onClick={() => { if (onFinishOnboarding) onFinishOnboarding(); else setIsOnboardingOpen?.(false); }} className="px-10 py-2.5 bg-[#FFD29D] hover:bg-[#F4C48A] rounded-[8px] text-[14px] font-medium text-[#202124] transition-colors">Finish</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- CONFLICT RESOLUTION MODAL --- */}
      {isConflictModalOpen && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div className="bg-white w-[480px] rounded-[16px] shadow-2xl flex flex-col p-8 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-6 h-6 rounded-full bg-[#A23629] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <h2 className="text-[18px] font-bold text-[#202124] tracking-tight">Resolve Contact Conflict</h2>
            </div>

            <p className={`text-[14.5px] text-[#5B5B66] mb-6 leading-relaxed ${thinRegularClass}`}>
              Secretary agent found two different emails for Maison Noir. Which one should we use for the proposal?
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {/* Option 1: From Contacts */}
              <button 
                onClick={() => { setIsConflictModalOpen(false); setIsOvernightSummaryOpen?.(false); }}
                className="group flex flex-col p-4 border border-[#E9E9EB] hover:border-[#FF980E] hover:bg-[#FFFAEF]/40 rounded-[10px] text-left transition-all active:scale-[0.98]"
              >
                <span className="text-[11px] font-bold text-[#82828C] uppercase tracking-wider mb-1 group-hover:text-[#E8890C]">From your Contacts</span>
                <span className="text-[15px] font-medium text-[#202124]">contact@maisonnoir.ca</span>
              </button>

              {/* Option 2: From the Brief */}
              <button 
                onClick={() => { setIsConflictModalOpen(false); setIsOvernightSummaryOpen?.(false); }}
                className="group flex flex-col p-4 border border-[#E9E9EB] hover:border-[#FF980E] hover:bg-[#FFFAEF]/40 rounded-[10px] text-left transition-all active:scale-[0.98]"
              >
                <span className="text-[11px] font-bold text-[#82828C] uppercase tracking-wider mb-1 group-hover:text-[#E8890C]">Found in Project Brief</span>
                <span className="text-[15px] font-medium text-[#202124]">hello@maisonnoir.studio</span>
              </button>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button 
                onClick={() => setIsConflictModalOpen(false)}
                className={`text-[13px] text-[#82828C] hover:text-[#202124] ${thinRegularClass}`}
              >
                Decide later
              </button>
              <div className="flex gap-3">
                 <span className={`text-[12px] text-[#82828C] italic mr-2 ${thinRegularClass}`}>Resolving this will update all pending tasks</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};