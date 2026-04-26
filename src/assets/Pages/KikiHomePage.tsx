import { useState, useRef, useEffect } from 'react';

interface KikiHomeProps {
  onNavigateToSchedule: () => void;
  onWorkspaceSelect: () => void;
  onHomeWorkspaceSelect: () => void;
  onNavigateToTasks: () => void; 
  onNavigateToBrief: () => void; 
  // --- NEW: Add the call navigation prop ---
  onNavigateToCall: () => void;
}

const thinRegularClass = "font-normal opacity-[0.85] tracking-tight";

export default function KikiHomePage({ 
  onNavigateToSchedule, 
  onWorkspaceSelect, 
  onHomeWorkspaceSelect,
  onNavigateToTasks,
  onNavigateToBrief,
  onNavigateToCall
}: KikiHomeProps) {
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const workspaceRef = useRef<HTMLDivElement>(null);

  const assets = {
    logo: "/shiny_icon.webp",
    plus: "/plus_icon.webp",
    image: "/image_icon.webp",
    mic: "/microphone_icon.webp",
    send: "/send_button.webp",
    x: "/X_icon.webp",
  };

  const workspaceItems = [
    { name: 'Default Browser', icon: '/Pill_SW.webp', isHome: true },
    { name: 'Kiki Studio', icon: '/profile_1.webp', isKiki: true },
    { name: 'Travel Planning', icon: '/profile_2.webp' },
    { name: 'UX Course', icon: '/profile_3.webp' },
    { name: 'Home renovation', icon: '/profile_4.webp' },
  ];

  const pills = [
    { icon: "/schedule_icon.webp", text: "Schedule" },
    { icon: "/task_icon.webp", text: "Task Queue" },
    { icon: "/call_icon.webp", text: "Call Agent" },
    { icon: "/brief_icon.webp", text: "New Brief" },
    { icon: "/invoice_icon.webp", text: "Send Invoice" }
  ];

  const apps = [
    { name: "Notion", src: "/notion_icon.webp" },
    { name: "Figma", src: "/figma_icon.webp" },
    { name: "Gmail", src: "/email_icon.webp" },
    { name: "Calendar", src: "/calendar_icon.webp" }
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

  return (
    <div className="flex-1 flex flex-col items-center pt-[25vh] p-10 relative z-10">
      
      <div 
        className="absolute inset-0 opacity-30 blur-[120px] pointer-events-none -z-10" 
        style={{ background: 'radial-gradient(circle at 100% 160%, #FF980E 0%, #FFB347 30%, transparent 65%)' }} 
      />

      {/* --- WORKSPACE POP-UP --- */}
      <div className="absolute top-6 left-6 z-50"> 
        <div 
          ref={workspaceRef}
          className="bg-white rounded-[8px] shadow-[0_10px_40px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out overflow-hidden border border-[#FFC270]/60"
          style={{ 
            width: isWorkspaceOpen ? '260px' : '139px', 
            height: isWorkspaceOpen ? 'auto' : '33px',
          }}
        >
          <div className="flex items-center justify-between px-3 h-[31px]">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
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
                      if (item.isHome) onHomeWorkspaceSelect();
                      else if (item.isKiki) onWorkspaceSelect();
                      setIsWorkspaceOpen(false);
                    }}
                    className={`flex items-center gap-3 p-1.5 rounded-[8px] cursor-pointer transition-all ${
                      item.isKiki ? 'bg-[#F0F0F4]' : 'hover:bg-gray-50'
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
      </div>

      <div className="flex items-center gap-4 mb-10 select-none">
        <img src={assets.logo} className="w-12 h-12 object-contain" alt="" />
        <h1 className="text-[42px] font-medium text-[#2b2b2b] tracking-tighter">Smart Window</h1>
      </div>

      <div 
        className="shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] rounded-[8px] bg-white border flex flex-col justify-between pt-3 pb-2 px-5 mb-8" 
        style={{ width: '579px', height: '92px', borderColor: '#FFC270' }}
      >
        <input 
          type="text" 
          placeholder="Ask, search, or type a URL" 
          className={`w-full outline-none text-[16px] text-[#5B5B66] placeholder:text-[#5B5B66]/50 bg-transparent ${thinRegularClass}`} 
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

      {/* --- ACTION PILLS --- */}
      <div className="flex gap-3 mb-8">
        {pills.map((pill) => (
          <div 
            key={pill.text} 
            onClick={() => {
              if (pill.text === 'Schedule') onNavigateToSchedule();
              if (pill.text === 'Task Queue') onNavigateToTasks();
              if (pill.text === 'New Brief') onNavigateToBrief(); 
              // --- NEW: Add the click handler here ---
              if (pill.text === 'Call Agent') onNavigateToCall();
            }}
            className="rounded-full transition-all hover:brightness-95 cursor-pointer border bg-[#F9F9FB] flex items-center justify-center px-5 gap-2.5 whitespace-nowrap shadow-sm" 
            style={{ height: '38px', borderColor: '#FFC270' }}
          >
             <img src={pill.icon} className="w-4 h-4 object-contain" alt="" />
             <span className={`text-[14px] text-[#82828C] leading-none ${thinRegularClass}`}>
                {pill.text}
             </span>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        {apps.map((app) => (
          <div 
            key={app.name}
            className="rounded-[8px] transition-all hover:brightness-95 cursor-pointer border bg-white flex items-center justify-center shadow-sm"
            style={{ width: '48px', height: '48px', borderColor: '#FFC270' }}
          >
            <img src={app.src} alt={app.name} className="w-7 h-7 object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}