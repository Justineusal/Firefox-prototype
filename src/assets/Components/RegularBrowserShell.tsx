import { useState, useRef, useEffect, type ReactNode } from 'react';
import type { Tab } from './BrowserShell'; 
import { thinRegularClass } from './BrowserShell'; 

interface RegularShellProps {
  tabs: Tab[];
  activeTab: Tab;
  setActiveTab: (id: number) => void;
  addTab: () => void;
  closeTab: (e: React.MouseEvent, id: number) => void;
  handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUrlSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSwitchMode?: (mode: 'smart' | 'regular') => void;
  children: ReactNode;
}

export const RegularBrowserShell = ({ 
  tabs, activeTab, setActiveTab, addTab, closeTab, 
  handleUrlChange, handleUrlSubmit, onSwitchMode, children 
}: RegularShellProps) => {
  
  const [isModeOpen, setIsModeOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsModeOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#5A2D82] to-[#3B1D5F] p-3 flex items-center justify-center overflow-hidden font-inter text-[#202124] antialiased">
      <div className="flex flex-col h-full w-full bg-[#dee1e6] rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] overflow-hidden border border-white/10">
        
        {/* --- HEADER --- */}
        <header className="h-10 flex items-center px-3 bg-[#dee1e6] gap-2 select-none shrink-0">
          <div className="flex gap-2 px-2 items-center mr-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>

          <div className="flex items-center h-full gap-1 py-1">
            {tabs.map((tab) => (
              <div 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)} 
                className={`group px-3 h-8 rounded-t-[4px] text-[11px] flex items-center gap-2 min-w-[160px] max-w-[220px] cursor-pointer border transition-all ${
                  tab.isActive ? 'bg-[#F9F9FB] shadow-sm border-gray-300/10' : 'bg-white/10 border-transparent opacity-60 hover:bg-white/20'
                }`}
              >
                 <img src="/firefox_icon.webp" className="w-4 h-4 object-contain" alt="" />
                 <span className={`flex-1 truncate ${tab.isActive ? 'font-medium' : 'font-normal'}`}>{tab.title}</span>
                 <button onClick={(e) => closeTab(e, tab.id)} className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-black/10 transition-opacity">
                   <img src="/X_icon.webp" className="w-2.5 h-2.5 object-contain" alt="" />
                 </button>
              </div>
            ))}
            <button onClick={addTab} className="w-7 h-7 flex items-center justify-center text-gray-600 text-xl hover:bg-gray-300/60 rounded-md transition-colors ml-1">+</button>
          </div>

          <div className="flex-1 flex justify-end items-center gap-4 pr-3 relative" ref={dropdownRef}>
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setIsModeOpen(!isModeOpen)}>
              <img src="/down_icon.webp" className={`w-2.5 object-contain opacity-60 transition-transform duration-200 ${isModeOpen ? 'rotate-180' : ''}`} alt="" />
              <div className="flex items-center gap-2">
                 <img src="/firefox_icon.webp" className="w-5 h-5 object-contain" alt="" />
                 <span className={`text-[12px] text-gray-600 ${thinRegularClass}`}>Classic Window</span>
              </div>
            </div>

            {isModeOpen && (
              <div className="absolute top-9 right-0 w-[240px] bg-white rounded-[8px] shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100 p-1.5 z-[100] animate-in fade-in zoom-in-95 duration-150">
                <div className="flex flex-col">
                  {/* Active Regular Mode */}
                  <div className="flex items-center gap-3 p-2.5 bg-[#F0F0F4] rounded-[6px] cursor-default">
                    <img src="/firefox_icon.webp" className="w-7 h-7 object-contain" alt="" />
                    <span className="text-[15px] text-[#5B5B66] font-medium tracking-tight">Classic Window</span>
                  </div>

                  {/* Switch to Smart Mode */}
                  <div onClick={() => { onSwitchMode?.('smart'); setIsModeOpen(false); }} className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-[6px] transition-colors group cursor-pointer">
                    <img src="/Pill_SW.webp" className="w-7 h-7 object-contain" alt="" />
                    <span className="text-[15px] text-[#5B5B66] font-medium tracking-tight">Smart Window</span>
                  </div>

                  {/* Private Mode (Non-clickable visual) */}
                  <div className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-[6px] transition-colors group cursor-default">
                    <img src="/private_icon.webp" className="w-7 h-7 object-contain" alt="" />
                    <span className="text-[15px] text-[#5B5B66] font-medium tracking-tight">Private Window</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* --- NAV BAR --- */}
        <nav className="h-10 flex items-center pr-4 bg-[#F9F9FB] justify-between gap-4 border-b border-gray-200/30 shrink-0">
          <div className="flex gap-1 text-gray-600 items-center">
            <div className="w-[40px] flex justify-center shrink-0">
              <button className="p-1.5 hover:bg-gray-200 rounded flex items-center justify-center">
                <img src="/tab_icon.webp" className="w-[18px] object-contain opacity-70" alt="" />
              </button>
            </div>
            <button className="p-1.5 hover:bg-gray-200 rounded"><img src="/back_icon.webp" className="w-[18px] object-contain opacity-70" alt="" /></button>
            <button className="p-1.5 hover:bg-gray-200 rounded"><img src="/forward_icon.webp" className="w-[18px] object-contain opacity-70" alt="" /></button>
            <button className="p-1.5 hover:bg-gray-200 rounded"><img src="/refresh_icon.webp" className="w-[18px] object-contain opacity-70" alt="" /></button>
          </div>

          <div className="flex-1 max-w-5xl h-7 bg-[#E9E9EB] border border-transparent rounded-[4px] flex items-center px-3 shadow-sm focus-within:bg-white focus-within:border-gray-300 transition-all duration-200">
            <input 
              className={`flex-1 text-[12px] outline-none text-gray-600 bg-transparent ${thinRegularClass}`} 
              value={activeTab.url} 
              onChange={handleUrlChange} 
              onKeyDown={handleUrlSubmit} 
            />
          </div>

          <div className="flex items-center gap-1">
             <button className="p-1.5 hover:bg-gray-200 rounded transition-colors"><img src="/burgermenu_icon.webp" className="w-[18px] object-contain opacity-70" alt="" /></button>
          </div>
        </nav>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex flex-1 overflow-hidden bg-[#F9F9FB]">
          <aside className="w-[40px] flex flex-col items-center pt-2 gap-5 bg-[#F9F9FB] shrink-0">
             {[1, 2, 3].map(i => (
              <img key={i} src="/star_icon.webp" className="w-[18px] h-[18px] object-contain opacity-80 hover:opacity-100 transition-opacity" alt="" />
            ))}
          </aside>
          
          <main className="flex-1 bg-[#F0F0F2] rounded-tl-[10px] rounded-tr-[10px] relative flex flex-col overflow-hidden transition-all duration-300">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};