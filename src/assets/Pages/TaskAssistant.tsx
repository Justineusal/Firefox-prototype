import { useState } from 'react';

const thinRegularClass = "font-normal opacity-[0.85] tracking-tight";

export default function TaskAssistant() {
  // --- STATE: TRACKING APPROVALS ---
  const [invoiceApproved, setInvoiceApproved] = useState(false);
  const [websiteApproved, setWebsiteApproved] = useState(false);

  // Modal visibility states
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isWebsiteModalOpen, setIsWebsiteModalOpen] = useState(false);
  const [notifyWhenLive, setNotifyWhenLive] = useState(true);

  // Derived state for counters
  const tasksRemaining = [invoiceApproved, websiteApproved].filter(v => !v).length;

  return (
    <div className="relative h-full w-full flex flex-col font-inter">
      
      {/* --- SCROLLING CONTENT AREA --- */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-4 pb-[120px] pr-1 z-10 pt-2">
        
        {/* SECRETARY AGENT HEADER: Only shows if tasks are pending */}
        {tasksRemaining > 0 ? (
          <div className="bg-[#F5F5F5] border border-[#FF980E] rounded-[8px] p-5 flex flex-col gap-3 shadow-sm animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <img src="/shiny_icon.webp" className="w-4 h-4 object-contain" alt="" />
                 <span className="text-[14px] text-[#82828C] font-medium">Secretary agent</span>
              </div>
              <span className="text-[12px] text-[#82828C]">just now</span>
            </div>
            <p className="text-[15px] text-[#5B5B66] leading-relaxed">
              Monday Jun 9 · Your agents are ready. {tasksRemaining} {tasksRemaining === 1 ? 'task needs' : 'tasks need'} your sign-off before they proceed.
            </p>
          </div>
        ) : (
          <div className="bg-[#F4FCF6] border border-[#8CBF9B]/30 rounded-[8px] p-5 flex flex-col items-center gap-2 shadow-sm animate-in zoom-in duration-500">
            <div className="w-8 h-8 rounded-full bg-[#8CBF9B] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <p className="text-[14px] text-[#5B5B66] font-medium">All approval tasks cleared</p>
          </div>
        )}

        {/* APPROVAL CARD: INVOICE */}
        {!invoiceApproved && (
          <div className="bg-[#F5F5F5] border border-[#CFCFCF] rounded-[8px] p-5 flex flex-col gap-3 shadow-sm transition-all animate-in slide-in-from-right-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/approval_icon.webp" className="w-4 h-4 object-contain opacity-60" alt="Approval Needed" />
                <span className="text-[14px] text-[#82828C] font-medium">Approval needed</span>
              </div>
              <span className="text-[12px] text-[#82828C]">for 2:00pm today</span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-[15px] font-semibold text-[#5B5B66] tracking-tight">Send invoice #047 to Galerie Nour - $3,200.</h3>
              <p className={`text-[15px] text-[#5B5B66] leading-relaxed ${thinRegularClass}`}>
                Your agent prepared the invoice for the October branding project. Ready to send to contact@galerienour.com.
              </p>
            </div>
            <button 
              onClick={() => setIsInvoiceModalOpen(true)}
              className="self-end mt-2 flex items-center gap-1.5 px-4 py-1.5 bg-[#E9E9EB] hover:bg-[#DCDCE0] rounded-full text-[13px] font-medium text-[#5B5B66] transition-all active:scale-95"
            >
              View →
            </button>
          </div>
        )}

        {/* APPROVAL CARD: WEBSITE */}
        {!websiteApproved && (
          <div className="bg-[#F5F5F5] border border-[#CFCFCF] rounded-[8px] p-5 flex flex-col gap-3 shadow-sm transition-all animate-in slide-in-from-right-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/approval_icon.webp" className="w-4 h-4 object-contain opacity-60" alt="Approval Needed" />
                <span className="text-[14px] text-[#82828C] font-medium">Approval needed</span>
              </div>
              <span className="text-[12px] text-[#82828C]">for 9:00am tomorrow</span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-[15px] font-semibold text-[#5B5B66] tracking-tight">Post design statement to Maison Noir website</h3>
              <p className={`text-[15px] text-[#5B5B66] leading-relaxed ${thinRegularClass}`}>
                Your writing agent finished the studio statement for Maison Noir. Your dev agent is ready to publish.
              </p>
            </div>
            <button 
              onClick={() => setIsWebsiteModalOpen(true)}
              className="self-end mt-2 flex items-center gap-1.5 px-4 py-1.5 bg-[#E9E9EB] hover:bg-[#DCDCE0] rounded-full text-[13px] font-medium text-[#5B5B66] transition-all active:scale-95"
            >
              View →
            </button>
          </div>
        )}
      </div>

      {/* --- FIXED PROMPT BAR --- */}
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
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 4v16m8-8H4"/></svg>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              </div>
              <button className="bg-[#F0F0F4] hover:bg-[#E5E5EA] text-gray-500 rounded-[8px] w-8 h-8 flex items-center justify-center transition-colors">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- INVOICE PREVIEW MODAL --- */}
      {isInvoiceModalOpen && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
          <div className="bg-white w-[420px] rounded-xl shadow-2xl flex flex-col p-6 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-[18px] font-bold text-[#202124] mb-4 tracking-tight">Invoice Preview</h2>
            <div className="bg-[#F9F9FB] border border-[#E9E9EB] rounded-[8px] p-5 flex flex-col gap-3 mb-8">
              <div className="flex justify-between border-b border-[#E9E9EB] pb-2">
                <span className="text-[13px] text-[#82828C]">Galerie Nour</span>
                <span className="text-[13px] font-bold text-[#2b2b2b]">$3,200.00</span>
              </div>
              <span className="text-[12px] text-[#82828C]">Branding project October realization</span>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsInvoiceModalOpen(false)} className="px-6 py-2 bg-[#E9E9EB] rounded-[8px] text-[13px] font-medium text-[#5B5B66]">Dismiss</button>
              <button 
                onClick={() => { setInvoiceApproved(true); setIsInvoiceModalOpen(false); }} 
                className="px-6 py-2 bg-[#FFD29D] hover:bg-[#FFC270] rounded-[8px] text-[13px] font-medium text-[#2b2b2b] shadow-sm transition-colors"
              >
                Approve & Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- WEBSITE CONTENT PREVIEW MODAL --- */}
      {isWebsiteModalOpen && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
          <div className="bg-white w-[500px] rounded-xl shadow-2xl flex flex-col p-7 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-[18px] font-bold text-[#202124] mb-4 tracking-tight">Website Update Preview</h2>
            <div className="bg-[#F9F9FB] border border-[#E9E9EB] rounded-[8px] p-5 mb-8">
              <p className={`text-[14px] text-[#4A4A52] leading-relaxed italic ${thinRegularClass}`}>
                "Maison Noir is built on the philosophy of restraint. Every touchpoint, from typography to texture, should feel structurally sound..."
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsWebsiteModalOpen(false)} className="px-6 py-2 bg-[#E9E9EB] rounded-[8px] text-[13px] font-medium text-[#5B5B66]">Dismiss</button>
              <button 
                onClick={() => { setWebsiteApproved(true); setIsWebsiteModalOpen(false); }} 
                className="px-6 py-2 bg-[#FFD29D] hover:bg-[#FFC270] rounded-[8px] text-[13px] font-medium text-[#2b2b2b] shadow-sm transition-colors"
              >
                Approve & Post
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}