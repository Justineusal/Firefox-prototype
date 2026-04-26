interface BriefAssistantProps {
  isIntroInserted?: boolean;
  onToggleIntro?: () => void;
}

const thinRegularClass = "font-normal opacity-[0.85] tracking-tight";

export default function BriefAssistant({ isIntroInserted = false, onToggleIntro }: BriefAssistantProps) {
  return (
    <div className="relative h-full w-full flex flex-col font-inter">
      
      {/* --- SCROLLING CONTENT AREA --- */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-4 pb-[120px] pr-1 z-10 pt-2">
        
        {/* WRITING AGENT - MAISON NOIR INTRO */}
        <div className="bg-[#F5F5F5] border border-[#FF980E] rounded-[8px] p-5 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/shiny_icon.webp" className="w-4 h-4 object-contain" alt="Writing Agent" />
              <span className="text-[14px] text-[#82828C] font-medium">Writing agent</span>
            </div>
            <span className="text-[12px] text-[#82828C]">just now</span>
          </div>
          
          <p className={`text-[15px] text-[#5B5B66] leading-relaxed ${thinRegularClass}`}>
            Drafted an intro paragraph for Maison Noir while you were in your schedule. Ready to review.
          </p>

          <div className="bg-[#EBEBEF] border border-[#DCDCE0] rounded-[8px] p-3 mt-1">
            <p className={`text-[14px] text-[#5B5B66] leading-relaxed ${thinRegularClass}`}>
              <span className="font-semibold text-[#4A4A52]">Draft: </span> 
              “Maison Noir is more than a restaurant; it is an interrogation of the dining experience. Stripped of ornament...”
            </p>
          </div>

          <button 
            onClick={onToggleIntro}
            className="self-end mt-2 flex items-center gap-1.5 px-4 py-1.5 bg-[#FFD29D] hover:bg-[#FFC270] rounded-full text-[13px] font-medium text-[#2b2b2b] transition-all active:scale-95 shadow-sm"
          >
            {isIntroInserted ? "Erase from brief" : "Insert intro brief"}
          </button>
        </div>

        {/* BOOKMARKED - BRUTALIST MENU */}
        <div className="bg-[#F5F5F5] border border-[#CFCFCF] rounded-[8px] p-5 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/bookmarkedorange_icon.webp" className="w-4 h-4 object-contain" alt="Bookmarked" />
              <span className="text-[14px] text-[#82828C] font-medium">Bookmarked</span>
            </div>
            <span className="text-[12px] text-[#82828C]">last week</span>
          </div>
          <p className={`text-[15px] text-[#5B5B66] leading-relaxed ${thinRegularClass}`}>
            You saved a Brutalist menu design reference that matches the industrial direction of Maison Noir.
          </p>
          <button className="self-end mt-2 flex items-center gap-1.5 px-4 py-1.5 bg-[#E9E9EB] hover:bg-[#DCDCE0] rounded-full text-[13px] font-medium text-[#5B5B66] transition-all active:scale-95">
            Open reference →
          </button>
        </div>

        {/* NOTION - KICKOFF NOTES */}
        <div className="bg-[#F5F5F5] border border-[#CFCFCF] rounded-[8px] p-5 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/Notion.webp" className="w-4 h-4 object-contain" alt="Notion" />
              <span className="text-[14px] text-[#82828C] font-medium">Notion</span>
            </div>
            <span className="text-[12px] text-[#82828C]">3 days ago</span>
          </div>
          <p className={`text-[15px] text-[#5B5B66] leading-relaxed ${thinRegularClass}`}>
            Found your Maison Noir kickoff call notes. Includes specific mentions of concrete textures and monochromatic palettes.
          </p>
          <button className="self-end mt-2 flex items-center gap-1.5 px-4 py-1.5 bg-[#E9E9EB] hover:bg-[#DCDCE0] rounded-full text-[13px] font-medium text-[#5B5B66] transition-all active:scale-95">
            Pull into brief
          </button>
        </div>

        {/* OPEN TAB - TYPOGRAPHY */}
        <div className="bg-[#F5F5F5] border border-[#CFCFCF] rounded-[8px] p-5 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/Opentab_icon.webp" className="w-4 h-4 object-contain" alt="Open Tab" />
              <span className="text-[14px] text-[#82828C] font-medium">Open tab</span>
            </div>
            <span className="text-[12px] text-[#82828C]">now</span>
          </div>
          <p className={`text-[15px] text-[#5B5B66] leading-relaxed ${thinRegularClass}`}>
            Your active Dribbble tab has 3 shots tagged “Swiss Brutalism” — highly relevant for this brief’s typography.
          </p>
          <button className="self-end mt-2 flex items-center gap-1.5 px-4 py-1.5 bg-[#E9E9EB] hover:bg-[#DCDCE0] rounded-full text-[13px] font-medium text-[#5B5B66] transition-all active:scale-95">
            View shots →
          </button>
        </div>
      </div>

      {/* --- FIXED PROMPT BAR WITH MASK --- */}
      <div className="absolute bottom-0 left-0 w-full flex flex-col pointer-events-none z-20">
        <div className="h-10 w-full bg-gradient-to-t from-[#F9F9FB] to-transparent" />
        <div className="bg-[#F9F9FB] pb-5 pt-1 pointer-events-auto">
          <div className="bg-white rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#FFD29D]/60 flex flex-col justify-between pt-3 pb-2 px-4 mx-1">
            <input 
              type="text" 
              placeholder="Ask away" 
              className={`w-full outline-none text-[14px] text-[#5B5B66] placeholder:text-[#5B5B66]/60 bg-transparent mb-3 ${thinRegularClass}`} 
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 opacity-60">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21"/></svg>
              </div>
              <button className="bg-[#F0F0F4] hover:bg-[#E5E5EA] text-gray-500 rounded-[8px] w-8 h-8 flex items-center justify-center transition-colors">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}