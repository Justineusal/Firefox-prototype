import { useState } from 'react';

interface TaskPreviewProps {
  onBack: () => void;
  // This would be passed from App.tsx based on TaskAssistant actions
  approvalCount?: number; 
}

const thinRegularClass = "font-normal opacity-[0.85] tracking-tight";

export default function TaskPreview({ onBack, approvalCount = 2 }: TaskPreviewProps) {
  
  // Dynamic stats array based on props
  const stats = [
    { label: "Need your approval", value: approvalCount.toString(), active: approvalCount > 0 },
    { label: "Running now", value: "1", active: false },
    { label: "Queued this week", value: (6 + approvalCount).toString(), active: false },
    { label: "Completed today", value: (3 + (2 - approvalCount)).toString(), active: false },
  ];

  const queueItems = [
    {
      title: "Maison Noir - logo concepts (Design agent)",
      description: "Generating direction options based on your updated Maison Noir brief",
      reasoning: "Prioritized for tomorrow's kick-off call.",
      status: "Running now",
      isRunning: true
    },
    {
      title: "Maison Noir - industrial signage specs (Design agent)",
      description: "Follows logo concepts - starts after your review",
      reasoning: "Queued sequentially to ensure logo approvals happen before material application.",
      status: "Tue 11:00am",
      isRunning: false
    },
    {
      title: "Client check-in email - Maison Noir (Secretary agent)",
      description: "Scheduled realization",
      reasoning: "Drafted to match the kickoff call sequence.",
      status: "Wed 9:00am",
      isRunning: false
    },
    {
      title: "Maison Noir brief intro draft (Writing agent)",
      description: "Completed and surfaced in your document",
      reasoning: "Written matching the modern brutalist tone of the project.",
      status: "Done · 10:14am",
      isRunning: false,
      isDone: true
    }
  ];

  return (
    <div className="flex-1 flex flex-col w-full h-full min-h-0 bg-transparent p-6 md:p-10 items-center overflow-y-auto relative custom-scrollbar">
      
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-30 blur-[120px] pointer-events-none -z-10" style={{ background: 'radial-gradient(circle at 100% 160%, #FF980E 0%, #FFB347 30%, transparent 65%)' }} />

      <div className="w-full max-w-[1200px] flex flex-col shrink-0">
        {/* --- HEADER --- */}
        <div className="flex flex-col w-full gap-10 shrink-0 mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 bg-[#DCDCE0] hover:bg-[#D1D1D6] transition-colors w-fit px-3 py-1.5 rounded-[8px] text-[13px] font-medium text-[#2b2b2b]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="flex items-start gap-4 select-none">
              <div className="w-1.5 h-11 bg-[#FFC270] rounded-full shrink-0 shadow-[0_0_15px_rgba(255,194,112,0.4)]" style={{ marginTop: '4px' }} />
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <img src="/task_icon.webp" className="w-8 h-8 object-contain opacity-80" alt="" />
                  <h1 className="text-[32px] lg:text-[42px] font-medium text-[#2b2b2b] tracking-tighter leading-none">Task Queue</h1>
                </div>
              </div>
            </div>
            <button className="px-6 py-2 bg-[#FFD29D] hover:bg-[#FFC270] transition-colors rounded-[8px] text-[13px] font-medium text-[#2b2b2b] shadow-sm">
              Snooze all
            </button>
          </div>
        </div>

        {/* --- STAT CARDS --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-10 shrink-0">
          {stats.map((stat) => (
            <div 
              key={stat.label}
              className={`flex flex-col items-center justify-center h-[108px] rounded-[12px] border transition-all bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] ${
                  stat.active ? 'border-[#FF980E] ring-1 ring-[#FF980E]/20' : 'border-[#E9E9EB]'
              }`}
            >
              <span className={`text-[28px] font-bold mb-1 ${stat.active ? 'text-[#FF980E]' : 'text-[#2b2b2b]'}`}>
                {stat.value}
              </span>
              <span className={`text-[15px] text-[#82828C] text-center ${thinRegularClass}`}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* --- QUEUE SECTION --- */}
        <div className="flex flex-col gap-5 shrink-0">
          <h2 className="text-[24px] font-medium text-[#2b2b2b] tracking-tight ml-1">Queue — running & upcoming</h2>
          
          <div className="bg-white/40 rounded-[16px] p-[1px] shadow-[0_10px_30px_-5px_rgba(255,152,14,0.15)] border border-[#FF980E]/20">
            <div className="bg-[#F9F9FB]/60 backdrop-blur-sm rounded-[15px] p-4 flex flex-col gap-2">
              {queueItems.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white/80 hover:bg-white transition-colors border border-[#E9E9EB] rounded-[12px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                >
                  <div className="flex flex-col gap-2.5">
                    <div className="flex flex-col gap-0.5">
                      <h3 className={`text-[16px] font-medium tracking-tight ${item.isDone ? 'text-[#82828C] line-through' : 'text-[#2b2b2b]'}`}>
                        {item.title}
                      </h3>
                      <p className={`text-[14px] text-[#82828C] ${thinRegularClass}`}>
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-1.5 bg-[#FFF8F0] border border-[#FFD29D]/40 rounded-[6px] px-3 py-2 w-fit">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF980E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-[3px] shrink-0">
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                      </svg>
                      <p className={`text-[13px] text-[#A66D26] italic ${thinRegularClass}`}>
                        {item.reasoning}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 shrink-0 min-w-[120px] self-start sm:self-center mt-2 sm:mt-0">
                    <div className="flex items-center gap-1.5">
                      {item.isRunning && <div className="w-2 h-2 rounded-full bg-[#FF4D4D] animate-pulse" />}
                      <span className={`text-[12px] font-medium ${item.isRunning ? 'text-[#FF4D4D]' : 'text-[#82828C]'}`}>
                        {item.status}
                      </span>
                    </div>
                    <button className="px-5 py-1.5 bg-[#E9E9EB] hover:bg-[#DCDCE0] rounded-[8px] text-[13px] font-medium text-[#5B5B66] transition-colors">
                      {item.isDone ? 'View' : 'Edit →'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}