const thinRegularClass = "font-normal opacity-[0.85] tracking-tight";

export default function ScheduleAssistant() {
  return (
    <div className="relative h-full w-full flex flex-col">
      
      {/* --- SCROLLING CONTENT AREA --- */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-4 pb-[120px] pr-1 z-10">
        
        {/* SECRETARY AGENT */}
        <div className="bg-[#F5F5F5] border border-[#FF980E] rounded-[8px] p-5 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/shiny_icon.webp" className="w-4 h-4 object-contain" alt="" />
              <span className="text-[14px] text-[#82828C] font-medium">Secretary agent</span>
            </div>
            <span className="text-[12px] text-[#82828C]">just now</span>
          </div>
          <p className="text-[15px] text-[#5B5B66] leading-relaxed">
            Here's your week. I've assigned tasks to your agents based on priority and deadlines. Maison Noir assets are front-loaded early in the week so your design agent has time to iterate. Invoices go out Tuesday via your secretary agent. Friday morning is kept clear for client presentation prep. You can drag to reschedule anything.
          </p>
        </div>

        {/* YOUR VOICE */}
        <div className="bg-[#F5F5F5] border border-[#CFCFCF] rounded-[8px] p-5 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/microphone_icon.webp" className="w-4 h-4 object-contain opacity-60" alt="" />
              <span className="text-[14px] text-[#82828C] font-medium">Your voice</span>
            </div>
            <span className="text-[12px] text-[#82828C]">1 minute ago</span>
          </div>
          <p className={`text-[15px] text-[#5B5B66] leading-relaxed italic ${thinRegularClass}`}>
            "Plan my week. I have a client presentation Friday, invoices to send, and need to prep the Maison Noir brand assets"
          </p>
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