import { useState, useRef, useEffect } from 'react';

interface HomePageProps {
  onWorkspaceSelect: () => void;
  isTourActive?: boolean;
  tourStep?: number;
  setTourStep?: (step: number) => void;
  setIsTourActive?: (active: boolean) => void;
}

const thinRegularClass = "font-normal opacity-[0.85] tracking-tight";

export default function HomePage({ 
  onWorkspaceSelect, 
  isTourActive, 
  tourStep, 
  setTourStep, 
  setIsTourActive 
}: HomePageProps) {
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const workspaceRef = useRef<HTMLDivElement>(null);

  const assets = {
    shiny: "/shiny_icon.webp",
    plus: "/plus_icon.webp",
    image: "/image_icon.webp",
    mic: "/microphone_icon.webp",
    send: "/send_button.webp",
    x: "/X_icon.webp",
  };

  const strokeColor = "#FFC270";

  const workspaceItems = [
    { name: 'Default Browser', icon: '/Pill_SW.webp', isHome: true },
    { name: 'Kiki Studio', icon: '/profile_1.webp', isKiki: true },
    { name: 'Travel Planning', icon: '/profile_2.webp' },
    { name: 'UX Course', icon: '/profile_3.webp' },
    { name: 'Home renovation', icon: '/profile_4.webp' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (workspaceRef.current && !workspaceRef.current.contains(event.target as Node)) {
        setIsWorkspaceOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- TOUR LOGIC (Updated to 4 steps) ---
  const nextStep = () => {
    if (tourStep && tourStep < 4) {
      setTourStep?.(tourStep + 1);
    } else {
      setIsTourActive?.(false);
      setTourStep?.(0);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center pt-[25vh] p-10 relative z-10 w-full h-full overflow-hidden">
      
      {/* --- TOUR OVERLAY BACKDROP --- */}
      {isTourActive && (
        <div className="absolute inset-0 bg-[#202124]/30 z-[300] backdrop-blur-[1px]" onClick={nextStep} />
      )}

      {/* Background Glow */}
      <div 
        className="absolute inset-0 opacity-30 blur-[120px] pointer-events-none -z-10" 
        style={{ background: 'radial-gradient(circle at 100% 160%, #FF980E 0%, #FFB347 30%, transparent 65%)' }} 
      />

      {/* --- STEP 1: WORKSPACES POP-UP --- */}
      <div className={`absolute top-6 left-6 ${isTourActive && tourStep === 1 ? 'z-[301]' : 'z-50'}`}> 
        <div 
          ref={workspaceRef}
          className="bg-white rounded-[8px] shadow-[0_10px_40px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out overflow-hidden border relative"
          style={{ 
            width: isWorkspaceOpen ? '260px' : '139px', 
            height: isWorkspaceOpen ? 'auto' : '33px',
            borderColor: strokeColor 
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3 h-[31px]">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => !isTourActive && setIsWorkspaceOpen(!isWorkspaceOpen)}
            >
                <img src="/workspace_icon.webp" className="w-5 h-5 object-contain opacity-70 shrink-0" alt="" />
                <span className={`text-[13px] text-gray-500 font-medium ${thinRegularClass}`}>Workspaces</span>
            </div>
            {isWorkspaceOpen && (
              <button onClick={() => setIsWorkspaceOpen(false)} className="opacity-40 hover:opacity-100 p-1">
                <img src={assets.x} className="w-3 h-3" alt="Close" />
              </button>
            )}
          </div>

          {isWorkspaceOpen && (
            <div className="px-3 pb-4 flex flex-col gap-3 animate-in fade-in duration-200">
              <div className="relative mt-1">
                <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <input 
                  type="text" 
                  placeholder="Search Workspaces" 
                  className="w-full h-8 bg-[#F9F9FB] border border-[#F0F0F2] rounded-[6px] pl-8 pr-2 text-[12px] outline-none placeholder:text-gray-400 font-medium"
                />
              </div>

              <div className="flex flex-col gap-0.5 mt-1">
                {workspaceItems.map((item) => (
                  <div 
                    key={item.name}
                    onClick={() => {
                      if (item.isKiki) onWorkspaceSelect();
                      setIsWorkspaceOpen(false);
                    }}
                    className={`flex items-center gap-3 p-1.5 rounded-[8px] cursor-pointer transition-all ${
                      item.isHome ? 'bg-[#F0F0F4]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shrink-0">
                      <img src={item.icon} className="w-full h-full object-cover" alt={item.name} />
                    </div>
                    <span className="text-[15px] font-medium text-[#5B5B66] flex-1 truncate tracking-tight">{item.name}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 mt-1 border-t border-gray-100">
                <button className="flex items-center gap-3 w-full p-1.5 rounded-[8px] hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#F0F0F2] flex items-center justify-center shrink-0">
                    <span className="text-xl text-gray-400 font-light">+</span>
                  </div>
                  <span className="text-[15px] font-medium text-[#82828C] tracking-tight">Edit workspaces</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* --- Tooltip 1 --- */}
        {isTourActive && tourStep === 1 && (
          <div className="absolute top-full left-0 mt-4 w-[280px] bg-white rounded-xl shadow-2xl p-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-4 h-4 bg-white absolute -top-2 left-6 rotate-45"></div>
            <div className="relative z-10 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-bold text-[#202124]">Workspaces</h3>
                <span className="text-[12px] text-gray-400 font-medium">1 of 4</span>
              </div>
              <p className="text-[13px] text-[#5B5B66] leading-relaxed">
                Here is where you create your workspace to organize your research, tabs, and context for specific tasks.
              </p>
              <button onClick={nextStep} className="mt-3 self-end bg-[#FFD29D] hover:bg-[#F4C48A] text-[#202124] text-[13px] font-medium px-5 py-1.5 rounded-[6px] transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Search Interface Header */}
      <div className="flex items-center gap-4 mb-10 select-none">
        <img src={assets.shiny} className="w-12 h-12 object-contain" alt="" />
        <h1 className="text-[42px] font-medium text-[#2b2b2b] tracking-tighter">Smart Window</h1>
      </div>

      {/* --- STEP 2: PROMPT BAR --- */}
      <div className={`relative mb-8 ${isTourActive && tourStep === 2 ? 'z-[301]' : ''}`}>
        <div 
          className="shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] rounded-[8px] bg-white border flex flex-col justify-between pt-3 pb-2 px-5 relative z-10" 
          style={{ width: '579px', height: '92px', borderColor: strokeColor }}
        >
          <input 
            type="text" 
            placeholder="Ask, search, or type a URL" 
            className={`w-full outline-none text-[16px] text-[#5B5B66] placeholder:text-[#5B5B66]/50 bg-transparent ${thinRegularClass}`} 
            readOnly={isTourActive}
          />
          <div className="flex items-center justify-between mt-1.5">
            <div className="flex items-center gap-3">
              <button className="opacity-70 hover:opacity-100 transition-opacity"><img src={assets.plus} className="w-5 h-5 object-contain" alt="" /></button>
              <button className="opacity-70 hover:opacity-100 transition-opacity"><img src={assets.image} className="w-5 h-5 object-contain" alt="" /></button>
            </div>
            <div className="flex items-center gap-3">
              <button className="opacity-70 hover:opacity-100 transition-opacity"><img src={assets.mic} className="w-5 h-5 object-contain" alt="" /></button>
              <button className="transition-all hover:brightness-105"><img src={assets.send} className="w-16 object-contain" alt="" /></button>
            </div>
          </div>
        </div>

        {/* --- Tooltip 2 --- */}
        {isTourActive && tourStep === 2 && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[320px] bg-white rounded-xl shadow-2xl p-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-4 h-4 bg-white absolute -top-2 left-1/2 -translate-x-1/2 rotate-45"></div>
            <div className="relative z-10 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-bold text-[#202124]">Prompt Bar</h3>
                <span className="text-[12px] text-gray-400 font-medium">2 of 4</span>
              </div>
              <p className="text-[13px] text-[#5B5B66] leading-relaxed">
                Here's your prompt bar, write anything! Search the web, type a URL, upload files, or ask a complex question.
              </p>
              <button onClick={nextStep} className="mt-3 self-end bg-[#FFD29D] hover:bg-[#F4C48A] text-[#202124] text-[13px] font-medium px-5 py-1.5 rounded-[6px] transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- STEP 3: SHORTCUTS --- */}
      <div className={`relative flex gap-3 ${isTourActive && tourStep === 3 ? 'z-[301]' : ''}`}>
        {['Proofread a message', 'How to make a plan', 'Compare tabs'].map((text) => (
          <div 
            key={text} 
            className="rounded-full transition-all hover:brightness-95 cursor-pointer shrink-0 flex items-center justify-center border bg-[#F9F9FB] px-6 whitespace-nowrap relative z-10" 
            style={{ height: '38px', borderColor: strokeColor }}
          >
             <span className={`text-[14px] text-[#82828C] leading-none text-center ${thinRegularClass}`}>
                {text}
             </span>
          </div>
        ))}

        {/* --- Tooltip 3 --- */}
        {isTourActive && tourStep === 3 && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[300px] bg-white rounded-xl shadow-2xl p-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-4 h-4 bg-white absolute -top-2 left-1/2 -translate-x-1/2 rotate-45"></div>
            <div className="relative z-10 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-bold text-[#202124]">Quick Actions</h3>
                <span className="text-[12px] text-gray-400 font-medium">3 of 4</span>
              </div>
              <p className="text-[13px] text-[#5B5B66] leading-relaxed">
                Some shortcuts you might need to jumpstart your workflow and get the most out of Smart Window.
              </p>
              <button onClick={nextStep} className="mt-3 self-end bg-[#FFD29D] hover:bg-[#F4C48A] text-[#202124] text-[13px] font-medium px-5 py-1.5 rounded-[6px] transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}