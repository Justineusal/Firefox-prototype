import { useState } from 'react';

interface BriefPageProps {
  onBack: () => void;
  isIntroInserted?: boolean;
}

const thinRegularClass = "font-normal opacity-[0.85] tracking-tight";

export default function BriefPage({ onBack, isIntroInserted = false }: BriefPageProps) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isDeliverablesInserted, setIsDeliverablesInserted] = useState(false);

  // Logic to handle the "Draft list" button click
  const handleDraftList = () => {
    setIsDeliverablesInserted(true);
    setIsCommentOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col w-full h-full min-h-0 bg-transparent p-6 md:p-10 items-center overflow-y-auto relative custom-scrollbar overflow-x-hidden">
      
      {/* Background Glow */}
      <div 
        className="absolute inset-0 opacity-30 blur-[120px] pointer-events-none -z-10" 
        style={{ background: 'radial-gradient(circle at 100% 160%, #FF980E 0%, #FFB347 30%, transparent 65%)' }} 
      />

      {/* Main Container */}
      <div className="w-full max-w-[950px] flex flex-col shrink-0 mb-10">
        
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
              <div 
                className="w-1.5 h-11 bg-[#FFC270] rounded-full shrink-0 shadow-[0_0_15px_rgba(255,194,112,0.4)]" 
                style={{ marginTop: '4px' }} 
              />
              
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="text-[#2b2b2b] opacity-80">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="12" y1="18" x2="12" y2="12"/>
                      <line x1="9" y1="15" x2="15" y2="15"/>
                    </svg>
                  </div>
                  <h1 className="text-[32px] lg:text-[42px] font-medium text-[#2b2b2b] tracking-tighter leading-none">Smart Doc</h1>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h2 className="text-[22px] font-medium text-[#2b2b2b] tracking-tight">Maison Noir: Brand Brief</h2>
                  <span className={`text-[16px] text-[#4A4A52] ${thinRegularClass}`}>Client · Restaurant · Active Project</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <button className="px-5 py-2 bg-[#DCDCE0] hover:bg-[#D1D1D6] text-[#2b2b2b] transition-colors rounded-[8px] text-[13px] font-medium">
                  Share
              </button>
              <button className="px-6 py-2 bg-[#FFD29D] hover:bg-[#FFC270] transition-colors rounded-[8px] text-[13px] font-medium text-[#2b2b2b] shadow-sm">
                  Export
              </button>
            </div>
          </div>
        </div>

        {/* --- MAIN DOCUMENT CARD --- */}
        <div className="w-full bg-[#FDFDFE] border border-[#E9E9EB] border-t-[3px] border-t-[#FFC270] shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[12px] p-8 md:p-12 flex flex-col shrink-0">
          
          {/* Doc Header & Contributions Byline */}
          <div className="flex flex-col gap-4 mb-10 pb-6 border-b border-[#E9E9EB]/60">
            <div className="flex flex-col gap-2">
              <h1 className="text-[26px] font-medium text-[#2b2b2b] tracking-tight">Brand identity brief</h1>
              <p className={`text-[17px] text-[#4A4A52] ${thinRegularClass}`}>Maison Noir · Modern Brutalist Dining · June 2026</p>
            </div>
            
            <div className="flex items-center gap-2.5 mt-1">
              <div className="flex -space-x-1.5">
                <div className="w-[22px] h-[22px] rounded-full bg-[#8A63D2] border-[1.5px] border-white flex items-center justify-center text-[9px] font-bold text-white z-10 shadow-sm"> Ki </div>
                <div className="w-[22px] h-[22px] rounded-full bg-[#FF980E] border-[1.5px] border-white flex items-center justify-center text-[9px] font-bold text-white z-0 shadow-sm"> Wr </div>
              </div>
              <span className={`text-[14px] text-[#82828C] ${thinRegularClass}`}>
                Written by Kiki · Assisted by Writing agent
              </span>
            </div>
          </div>

          {/* SECTION: About the Client */}
          <div className="flex flex-col gap-3 mb-10">
            <h3 className="text-[15px] font-medium text-[#82828C] tracking-wide uppercase">About the client</h3>
            <p className={`text-[16px] text-[#2b2b2b] leading-relaxed ${thinRegularClass}`}>
              Maison Noir is a new culinary destination in Montreal's industrial sector. 
              The space is defined by raw concrete, stark lighting, and a commitment to 
              "graphic brutalism." They seek a visual identity that matches this architectural 
              honesty—unapologetically bold, high-contrast, and strictly gridded.
            </p>
          </div>

          {/* SECTION: Design Direction */}
          <div className="flex flex-col gap-3 mb-10">
            <h3 className="text-[15px] font-medium text-[#82828C] tracking-wide uppercase">Design direction</h3>
            <div className="flex flex-col gap-2 mt-1">
              <div className="h-3.5 bg-[#EAEAEA] rounded-full w-full" />
              <div className="h-3.5 bg-[#EAEAEA] rounded-full w-[85%]" />
              <div className="h-3.5 bg-[#EAEAEA] rounded-full w-[80%]" />
            </div>
          </div>

          {/* SECTION: Introduction (Interactive) */}
          <div className="flex flex-col gap-3 mb-10">
            <div className="flex items-center gap-4">
              <h3 className="text-[15px] font-medium text-[#82828C] tracking-wide uppercase">Introduction</h3>
              
              {isIntroInserted && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-[#F5F5F5] border border-[#E9E9EB] rounded-[6px] transition-all">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#82828C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                   </svg>
                   <span className="text-[13px] font-medium text-[#82828C]">Generated by Writing agent</span>
                </div>
              )}
            </div>
            
            <p className={`text-[16px] leading-relaxed ${isIntroInserted ? `text-[#2b2b2b] ${thinRegularClass}` : `text-[#82828C] italic ${thinRegularClass}`}`}>
              {isIntroInserted 
                ? "Maison Noir is more than a restaurant; it is an interrogation of the dining experience. Stripped of ornament and excess, the brand must reflect the raw materiality of the space. Every touchpoint, from typography to texture, should feel structurally sound."
                : "Introduction section draft available via assistant."
              }
            </p>
          </div>

          {/* SECTION: Deliverables (Interactive AI Generation) */}
          <div className="flex flex-col gap-3 relative mt-4">
            <div className="flex items-center gap-4">
              <h3 className="text-[15px] font-medium text-[#82828C] tracking-wide uppercase">Deliverables</h3>
              
              {/* Agent Tag: Appears only after user clicks "Draft list" */}
              {isDeliverablesInserted && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-[#F5F5F5] border border-[#E9E9EB] rounded-[6px] animate-in fade-in zoom-in duration-300">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#82828C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                   </svg>
                   <span className="text-[13px] font-medium text-[#82828C]">Generated by Writing agent</span>
                </div>
              )}
            </div>
            
            {/* CONTENT: Conditional rendering of placeholders vs. real agent output */}
            {!isDeliverablesInserted ? (
              <div className="flex flex-col gap-2 mt-1 w-[85%]">
                <div className="h-3.5 bg-[#EAEAEA] rounded-full w-[70%]" />
                <div className="h-3.5 bg-[#EAEAEA] rounded-full w-[90%]" />
              </div>
            ) : (
              <ul className={`flex flex-col gap-3 mt-2 list-disc pl-5 text-[16px] text-[#2b2b2b] animate-in fade-in slide-in-from-top-2 duration-500 ${thinRegularClass}`}>
                <li>Primary Identity (Brutalist Wordmark & Monogram)</li>
                <li>Grid-based Menu System (Dinner, Drinks, & Tasting)</li>
                <li>Industrial Signage, Wayfinding & Material Specs</li>
                <li>Digital Presence & Social Media Launch Strategy</li>
              </ul>
            )}

            {/* --- AI COMMENT INTERACTION --- */}
            {!isDeliverablesInserted && (
              <div className="absolute right-0 top-0">
                {!isCommentOpen ? (
                  /* Trigger Bubble */
                  <button 
                    onClick={() => setIsCommentOpen(true)}
                    className="w-11 h-11 bg-[#FF980E] hover:bg-[#E6890C] rounded-full shadow-[0_4px_15px_rgba(255,152,14,0.4)] flex items-center justify-center transition-all hover:scale-105 active:scale-95 z-10"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    <div className="absolute top-0 right-0 w-3 h-3 bg-[#FF4D4D] border-2 border-white rounded-full" />
                  </button>
                ) : (
                  /* Floating Action Card */
                  <div className="absolute top-[-44px] right-0 w-[320px] bg-white rounded-[12px] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.15)] border border-[#FFD29D]/60 p-5 flex flex-col gap-3 z-20 animate-in fade-in zoom-in-95">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src="/shiny_icon.webp" className="w-4 h-4 object-contain" alt="Agent" />
                        <span className="text-[14px] text-[#2b2b2b] font-medium">Writing agent</span>
                      </div>
                      <span className="text-[12px] text-[#82828C]">just now</span>
                    </div>
                    
                    <p className={`text-[14.5px] text-[#5B5B66] leading-relaxed ${thinRegularClass}`}>
                      I noticed you haven't filled in the deliverables section yet — I can draft a standard list based on your previous Maison Noir notes.
                    </p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={handleDraftList}
                        className="px-4 py-1.5 bg-[#FFD29D] hover:bg-[#FFC270] transition-colors rounded-[8px] text-[13px] font-medium text-[#2b2b2b] shadow-sm"
                      >
                        Draft list
                      </button>
                      <button 
                        onClick={() => setIsCommentOpen(false)}
                        className="px-4 py-1.5 bg-[#F5F5F5] hover:bg-[#EAEAEA] transition-colors rounded-[8px] text-[13px] font-medium text-[#5B5B66]"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}