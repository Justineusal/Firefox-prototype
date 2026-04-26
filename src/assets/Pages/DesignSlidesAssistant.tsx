const thinRegularClass = "font-normal opacity-[0.85] tracking-tight";

type TimelineItem = {
  agent: string;
  time: string;
  text: string;
};

export default function DesignSlidesAssistant() {
  
  const timeline: TimelineItem[] = [
    { 
      agent: 'Writing agent', 
      time: 'Today 8:15am', 
      text: 'Wrote slide rationale based on your brief and the brainstorm call transcript.', 
    },
    { 
      agent: 'Design agent', 
      time: 'Today 7:42am', 
      text: 'Exported final logo directions from Thursday\'s iteration session.', 
    },
    { 
      agent: 'Design agent', 
      time: 'Wednesday', 
      text: 'Colour palette finalized — pulled from Maison Noir\'s reference to aged copper and raw linen.', 
    },
    { 
      agent: 'Writing agent', 
      time: 'Tuesday', 
      text: 'Design statement drafted and approved — adapted for the Next Steps slide.', 
    },
    { 
      agent: 'Secretary agent', 
      time: 'Monday', 
      text: '3 Cosmos bookmarks you saved are included in the Mood & Inspiration slide.', 
    },
  ];

  return (
    <div className="relative h-full w-full flex flex-col font-inter">
      
      {/* --- SCROLLING CONTENT AREA --- */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-4 pb-[120px] pr-1 z-10 pt-2">
        
        {/* --- 1. SECRETARY AGENT RECEIPT (Main Active Card) --- */}
        <div className="bg-[#F5F5F5] border border-[#FF980E] rounded-[8px] p-5 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
               <img src="/shiny_icon.webp" className="w-4 h-4 object-contain" alt="Secretary agent" />
               <span className="text-[14px] text-[#82828C] font-medium">Secretary agent</span>
            </div>
            <span className="text-[12px] text-[#82828C]">just now</span>
          </div>
          <p className="text-[15px] text-[#5B5B66] leading-relaxed">
            I pulled together 6 sources from your week to build this deck.
          </p>
          
          {/* Ingredients Tags - Clean Text Only */}
          <div className="flex flex-wrap gap-2 mt-1">
            <div className="px-2.5 py-1.5 bg-white border border-[#E9E9EB] rounded-[6px] shadow-sm">
              <span className={`text-[12px] text-[#5B5B66] font-medium ${thinRegularClass}`}>Brief</span>
            </div>
            <div className="px-2.5 py-1.5 bg-white border border-[#E9E9EB] rounded-[6px] shadow-sm">
              <span className={`text-[12px] text-[#5B5B66] font-medium ${thinRegularClass}`}>Call transcript</span>
            </div>
            <div className="px-2.5 py-1.5 bg-white border border-[#E9E9EB] rounded-[6px] shadow-sm">
              <span className={`text-[12px] text-[#5B5B66] font-medium ${thinRegularClass}`}>Cosmos saves</span>
            </div>
            <div className="px-2.5 py-1.5 bg-white border border-[#E9E9EB] rounded-[6px] shadow-sm">
              <span className={`text-[12px] text-[#5B5B66] font-medium ${thinRegularClass}`}>Agent outputs</span>
            </div>
          </div>
        </div>

        {/* --- 2. TIMELINE CARDS --- */}
        {timeline.map((item, idx) => (
          <div key={idx} className="bg-[#F5F5F5] border border-[#CFCFCF] rounded-[8px] p-5 flex flex-col gap-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/shiny_icon.webp" className="w-4 h-4 object-contain" alt="" />
                <span className="text-[14px] text-[#82828C] font-medium">{item.agent}</span>
              </div>
              <span className="text-[12px] text-[#82828C]">{item.time}</span>
            </div>
            <p className={`text-[15px] text-[#5B5B66] leading-relaxed ${thinRegularClass}`}>
              {item.text}
            </p>
          </div>
        ))}

        {/* --- 3. PENDING ACTION CARD --- */}
        <div className="bg-[#F5F5F5] border border-[#CFCFCF] rounded-[8px] p-5 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/approval_icon.webp" className="w-4 h-4 object-contain opacity-60" alt="Pending Action" />
              <span className="text-[14px] text-[#82828C] font-medium">Pending action</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-[15px] font-semibold text-[#5B5B66] tracking-tight">Client email draft ready</h3>
            <p className={`text-[15px] text-[#5B5B66] leading-relaxed ${thinRegularClass}`}>
              Sends automatically after you approve the deck.
            </p>
          </div>
          
          <div className="self-end mt-2 flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-4 py-1.5 bg-white border border-[#E9E9EB] hover:bg-[#F9F9FB] rounded-full text-[13px] font-medium text-[#5B5B66] transition-all active:scale-95 shadow-sm">
              Edit
            </button>
            <button className="flex items-center gap-1.5 px-4 py-1.5 bg-[#FFD29D] hover:bg-[#FFC270] rounded-full text-[13px] font-medium text-[#2b2b2b] transition-all active:scale-95 shadow-sm">
              Approve
            </button>
          </div>
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