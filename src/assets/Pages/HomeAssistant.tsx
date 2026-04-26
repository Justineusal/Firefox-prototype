interface HomeAssistantProps {
  onViewDesignDoc: () => void;
}

const thinRegularClass = "font-normal opacity-[0.85] tracking-tight";

export default function HomeAssistant({ onViewDesignDoc }: HomeAssistantProps) {
  return (
    <div className="flex flex-col gap-4 pb-6">
      
      {/* --- DESIGN AGENT --- */}
      <div className="bg-[#F5F5F5] border border-[#FF980E] rounded-[8px] p-5 flex flex-col gap-3 shadow-sm shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/shiny_icon.webp" className="w-4 h-4 object-contain" alt="Shiny" />
            <span className="text-[14px] text-[#82828C] font-medium">Design agent</span>
          </div>
          <span className="text-[12px] text-[#82828C]">just now</span>
        </div>
        
        <p className={`text-[15px] text-[#5B5B66] leading-relaxed ${thinRegularClass}`}>
          This week’s branding work for Maison Noir focused on the core visual identity. Three logo concepts were developed, along with a refined colour palette and typography direction that align with the brand’s minimalist/brutalist positioning. Everything is ready to be reviewed so you can start iterating.
        </p>

        <button 
          onClick={onViewDesignDoc}
          className="self-end mt-1 flex items-center gap-1.5 px-4 py-1.5 bg-[#E9E9EB] hover:bg-[#DCDCE0] rounded-full text-[13px] font-medium text-[#5B5B66] transition-all active:scale-95"
        >
          View design document →
        </button>
      </div>

    </div>
  );
}