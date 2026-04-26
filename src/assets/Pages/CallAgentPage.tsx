interface CallAgentPageProps {
  onExit: () => void;
}

const thinRegularClass = "font-normal opacity-[0.85] tracking-tight";

export default function CallAgentPage({ onExit }: CallAgentPageProps) {
  return (
    <div className="w-full h-full bg-[#FCD7A8] flex flex-col p-4 md:p-5 relative overflow-hidden font-inter select-none">
      
      {/* --- TOP BAR: Streamlined --- */}
      <div className="flex justify-between items-center w-full z-10 px-2 mb-4">
        
        <div className="flex items-center gap-4">
          {/* Exit Button */}
          <button 
            onClick={onExit}
            className="bg-white hover:bg-[#F9F9FB] text-[#202124] text-[13px] font-bold px-4 py-2 rounded-[8px] shadow-sm border border-orange-200/50 transition-all active:scale-95"
          >
            Exit Call
          </button>
          
          {/* Project Title Badge */}
          <div className="hidden md:flex items-center gap-2 bg-black/5 px-3 py-1.5 rounded-full border border-black/5">
             <div className="w-1.5 h-1.5 rounded-full bg-[#FF980E] animate-pulse" />
             <span className="text-[12px] font-medium text-[#202124]/70 tracking-tight">Maison Noir · Live Collaboration</span>
          </div>
        </div>

        {/* Participant Avatars: Shorter and more elegant */}
        <div className="flex items-center gap-2">
          
          {/* Designer Agent Card */}
          <div className="h-[64px] px-4 bg-white rounded-[12px] border-[2px] border-[#FF980E] shadow-lg shadow-orange-900/10 flex items-center gap-3 relative overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-[#FF980E] text-white flex items-center justify-center text-[14px] font-bold shrink-0">
              De
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-[#2b2b2b] leading-none mb-1">Designer agent</span>
              {/* Audio Wave */}
              <div className="flex items-end gap-[2px] h-2.5">
                <div className="w-[3px] h-[60%] bg-[#FF980E] rounded-full animate-pulse" />
                <div className="w-[3px] h-[100%] bg-[#FF980E] rounded-full animate-pulse delay-75" />
                <div className="w-[3px] h-[40%] bg-[#FF980E] rounded-full animate-pulse delay-150" />
                <div className="w-[3px] h-[80%] bg-[#FF980E] rounded-full animate-pulse delay-100" />
              </div>
            </div>
          </div>

          {/* User Card */}
          <div className="h-[64px] px-4 bg-white/80 backdrop-blur-sm rounded-[12px] border border-white flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-full bg-[#8A63D2] text-white flex items-center justify-center text-[14px] font-bold shrink-0">
              Ki
            </div>
            <span className={`text-[13px] font-medium text-[#5B5B66] ${thinRegularClass}`}>You</span>
          </div>

        </div>
      </div>

      {/* --- MAIN CANVAS AREA: Maximum visibility --- */}
      <div className="flex-1 bg-black rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] relative overflow-hidden flex items-center justify-center border border-white/20">
        
        {/* Collaboration Image - Set to contain to see full design if needed, or cover for immersion */}
        <img 
          src="/Call.webp" 
          alt="Collaboration Canvas" 
          className="w-full h-full object-contain md:object-cover opacity-90" 
        />

        {/* --- MULTIPLAYER CURSORS --- */}

        {/* 1. Design Agent Cursor */}
        <div className="absolute top-[28%] left-[62%] flex items-start z-10 transition-all duration-700 ease-in-out">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF980E" stroke="white" strokeWidth="2" className="-rotate-12 drop-shadow-md"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>
          <div className="bg-[#FF980E] text-white text-[11px] font-bold px-2 py-0.5 rounded-[4px] rounded-tl-none -ml-1 mt-3 shadow-lg">
            De
          </div>
        </div>

        {/* 2. User Cursor (Ki) */}
        <div className="absolute bottom-[35%] left-[28%] flex items-start z-10">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#8A63D2" stroke="white" strokeWidth="2" className="-rotate-12 drop-shadow-md"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>
          <div className="bg-[#8A63D2] text-white text-[11px] font-bold px-2 py-0.5 rounded-[4px] rounded-tl-none -ml-1 mt-3 shadow-lg">
            You
          </div>
        </div>

        {/* Zoom/Pan Controls Fake */}
        <div className="absolute bottom-6 left-6 flex flex-col gap-1">
           <div className="bg-black/40 backdrop-blur-md p-1 rounded-[8px] border border-white/10 flex flex-col gap-1">
              <button className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors">+</button>
              <div className="h-px bg-white/10 mx-1" />
              <button className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors">-</button>
           </div>
        </div>

      </div>

      {/* --- FLOATING BOTTOM CONTROLS --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#1A1A1E]/90 backdrop-blur-xl rounded-2xl p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-2 z-20 border border-white/10">
        
        {/* Mic */}
        <button className="w-12 h-12 rounded-xl hover:bg-white/10 flex items-center justify-center transition-all text-white/90 group">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>
        </button>

        {/* Screen Share */}
        <button className="w-12 h-12 rounded-xl hover:bg-white/10 flex items-center justify-center transition-all text-white/90 group">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line></svg>
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-white/10 mx-1" />

        {/* Attachments/Agent Tools (Active State) */}
        <button className="w-12 h-12 rounded-xl bg-[#FF980E] hover:bg-[#E8890C] flex items-center justify-center transition-all shadow-lg shadow-orange-600/20 text-white">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
        </button>

      </div>

    </div>
  );
}