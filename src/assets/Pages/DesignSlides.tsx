import { useState } from 'react';

interface DesignSlidesProps {
  onBack: () => void;
}

const thinRegularClass = "font-normal opacity-[0.85] tracking-tight";

export default function DesignSlides({ onBack }: DesignSlidesProps) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  // Mixed content slides to show AI assembling different types of data
  // coAuthored flags show human + AI collaboration on the design slides
  const slides = [
    { 
      id: 1, 
      type: 'mood', 
      agent: 'Design agent', 
      color: '#9A81E8',
      coAuthored: true 
    },
    { 
      id: 2, 
      type: 'image', 
      title: 'Logo Concepts', 
      image: '/Concept1.webp', 
      agent: 'Design agent', 
      color: '#9A81E8',
      coAuthored: true 
    },
    { 
      id: 3, 
      type: 'image', 
      title: 'Colour Palette', 
      image: '/Concept2.webp', 
      agent: 'Design agent', 
      color: '#9A81E8',
      coAuthored: true 
    },
    { 
      id: 4, 
      type: 'image', 
      title: 'Typography', 
      image: '/Concept3.webp', 
      agent: 'Design agent', 
      color: '#9A81E8',
      coAuthored: true 
    },
    { 
      id: 5, 
      type: 'text', 
      agent: 'Writing agent', 
      color: '#FF980E',
      coAuthored: false 
    }
  ];

  return (
    <div className="flex-1 flex flex-col w-full h-full min-h-0 bg-transparent p-6 md:p-10 items-center overflow-y-auto relative custom-scrollbar overflow-x-hidden font-inter">
      
      {/* Background Glow */}
      <div 
        className="absolute inset-0 opacity-30 blur-[120px] pointer-events-none -z-10" 
        style={{ background: 'radial-gradient(circle at 100% 160%, #FF980E 0%, #FFB347 30%, transparent 65%)' }} 
      />

      <div className="w-full max-w-[950px] flex flex-col shrink-0 mb-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col w-full gap-10 shrink-0 mb-8">
          
          <button 
            onClick={onBack}
            className="flex items-center gap-2 bg-[#DCDCE0] hover:bg-[#D1D1D6] transition-colors w-fit px-3 py-1.5 rounded-[8px] text-[13px] font-medium text-[#2b2b2b]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 19l-7-7 7-7"/></svg>
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
                    <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <path d="M8 12h8m-4-4v8"/>
                    </svg>
                  </div>
                  <h1 className="text-[32px] lg:text-[42px] font-medium text-[#2b2b2b] tracking-tighter leading-none">Smart Deck</h1>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h2 className="text-[22px] font-medium text-[#2b2b2b] tracking-tight">Maison Noir: Core Identity</h2>
                  <span className={`text-[16px] text-[#4A4A52] ${thinRegularClass}`}>
                    Client · Design presentation · Ready for review
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <button className="px-5 py-2 bg-[#DCDCE0] hover:bg-[#D1D1D6] text-[#2b2b2b] transition-colors rounded-[8px] text-[13px] font-medium">
                  Share link
              </button>
            </div>
          </div>
        </div>

        {/* --- MAIN DOCUMENT CARD --- */}
        <div className="w-full bg-[#FDFDFE] border border-[#E9E9EB] border-t-[3px] border-t-[#FFC270] shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[12px] flex flex-col shrink-0 overflow-hidden">
          
          {/* Deck Metadata Header */}
          <div className="p-8 md:p-12 pb-8 flex flex-col gap-4 border-b border-[#E9E9EB]/60">
            <div className="flex flex-col gap-2">
              <h1 className="text-[26px] font-medium text-[#2b2b2b] tracking-tight">Maison Noir — Brand Identity Exploration</h1>
              <p className={`text-[17px] text-[#4A4A52] ${thinRegularClass}`}>June 2026</p>
            </div>
            
            <div className="flex items-center gap-3 mt-1">
              <div className="flex -space-x-1.5">
                <div className="w-[24px] h-[24px] rounded-full bg-[#9A81E8] border-[1.5px] border-white flex items-center justify-center text-[9px] font-bold text-white z-20 shadow-sm">
                  De
                </div>
                <div className="w-[24px] h-[24px] rounded-full bg-[#FF980E] border-[1.5px] border-white flex items-center justify-center text-[9px] font-bold text-white z-10 shadow-sm">
                  Wr
                </div>
              </div>
              <span className={`text-[14px] text-[#82828C] ${thinRegularClass}`}>
                <span className="font-medium text-[#2b2b2b]">Assembled by Smart Window</span> · Design agent + Writing agent · Based on this week's work
              </span>
            </div>
          </div>

          {/* --- VERTICAL SLIDES VIEWER --- */}
          <div className="p-8 md:p-12 flex flex-col items-center gap-12 bg-[#FAFAFA]">
            
            {slides.map((slide) => (
              <div 
                key={slide.id}
                className="w-full max-w-[800px] aspect-video bg-white rounded-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#E9E9EB] overflow-hidden relative flex items-center justify-center"
              >
                
                {/* SLIDE TYPE: MOODBOARD */}
                {slide.type === 'mood' && (
                  <div className="flex flex-col items-center justify-center w-full h-full p-10 relative">
                    <h3 className="text-[22px] font-semibold text-[#2b2b2b] tracking-tight mb-8">Mood & Inspiration</h3>
                    
                    {/* Visual references with your brutalist assets */}
                    <div className="flex gap-4 mb-8 w-full max-w-[640px] h-[220px]">
                       <div className="flex-1 bg-[#F5F5F5] border border-[#E9E9EB] rounded-[6px] overflow-hidden shadow-inner">
                         <img src="/Inspo.webp" className="w-full h-full object-cover" alt="Brutalist Inspo 1" />
                       </div>
                       <div className="flex-1 bg-[#F5F5F5] border border-[#E9E9EB] rounded-[6px] overflow-hidden shadow-inner">
                         <img src="/Inspo2.webp" className="w-full h-full object-cover" alt="Brutalist Inspo 2" />
                       </div>
                       <div className="flex-1 bg-[#F5F5F5] border border-[#E9E9EB] rounded-[6px] overflow-hidden shadow-inner">
                         <img src="/Inspo3.webp" className="w-full h-full object-cover" alt="Brutalist Inspo 3" />
                       </div>
                    </div>

                    {/* --- TOGGLEABLE AI COMMENT --- */}
                    {!isCommentOpen ? (
                      <button 
                        onClick={() => setIsCommentOpen(true)}
                        className="absolute bottom-16 right-16 w-11 h-11 bg-[#FF980E] hover:bg-[#E6890C] rounded-full shadow-[0_4px_15px_rgba(255,152,14,0.4)] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 z-10"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        <div className="absolute top-0 right-0 w-3 h-3 bg-[#FF4D4D] border-2 border-white rounded-full" />
                      </button>
                    ) : (
                      <div className="absolute bottom-10 right-16 w-[320px] bg-white rounded-[12px] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.15)] border border-[#FFD29D]/60 p-5 flex flex-col gap-3 z-20 animate-in fade-in zoom-in-95">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img src="/shiny_icon.webp" className="w-4 h-4 object-contain" alt="Agent" />
                            <span className="text-[14px] text-[#2b2b2b] font-medium">Secretary agent</span>
                          </div>
                          <span className="text-[12px] text-[#82828C]">just now</span>
                        </div>
                        
                        <p className={`text-[14.5px] text-[#5B5B66] leading-relaxed ${thinRegularClass}`}>
                          Pulled 3 reference thumbnails from your saved Cosmos bookmarks to use as inspiration for this deck.
                        </p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <button className="px-4 py-1.5 bg-[#FFD29D] hover:bg-[#FFC270] transition-colors rounded-[8px] text-[13px] font-medium text-[#2b2b2b] shadow-sm">
                            View original
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

                {/* SLIDE TYPE: IMAGES (LOGO, PALETTE, TYPO) */}
                {slide.type === 'image' && (
                  <div className="w-full h-full bg-[#F0F0F2]">
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      className="w-full h-full object-contain" 
                      loading="lazy"
                    />
                  </div>
                )}

                {/* SLIDE TYPE: NEXT STEPS */}
                {slide.type === 'text' && (
                  <div className="flex flex-col justify-center items-center w-full h-full px-20">
                    <div className="w-full max-w-[500px]">
                      <h3 className="text-[24px] font-semibold text-[#2b2b2b] tracking-tight mb-6">Next Steps</h3>
                      <ul className={`text-[16px] text-[#5B5B66] leading-relaxed flex flex-col gap-4 list-disc pl-5 ${thinRegularClass}`}>
                        <li>Review this deck and add any final notes before the 3:00 PM meeting.</li>
                        <li>Present concepts to the Maison Noir team via video link.</li>
                        <li>Design agent will package final assets following approval.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Attribution Tag (Left) */}
                <div className="absolute bottom-4 left-6 px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-[#E9E9EB] rounded-[6px] shadow-sm flex items-center gap-3">
                  {slide.coAuthored && (
                    <>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#8A63D2]" />
                        <span className={`text-[12px] font-medium text-[#5B5B66] ${thinRegularClass}`}>You</span>
                      </div>
                      <div className="w-px h-3 bg-[#D1D1D6]" />
                    </>
                  )}
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: slide.color}} />
                    <span className={`text-[12px] font-medium text-[#5B5B66] ${thinRegularClass}`}>
                      {slide.agent}
                    </span>
                  </div>
                </div>

                {/* Slide Number (Right) */}
                <div className="absolute bottom-4 right-6 px-2.5 py-1.5 bg-white/90 backdrop-blur-sm border border-[#E9E9EB] rounded-[6px] shadow-sm">
                  <span className={`text-[12px] font-medium text-[#82828C] ${thinRegularClass}`}>
                    Slide {slide.id}
                  </span>
                </div>
                
              </div>
            ))}

          </div>
        </div>

        {/* --- BOTTOM ACTION BAR --- */}
        <div className="w-full flex items-center justify-end gap-3 mt-8">
          <button className="px-6 py-2.5 bg-white border border-[#E9E9EB] hover:bg-[#F9F9FB] transition-colors rounded-[8px] text-[14px] font-medium text-[#5B5B66] shadow-sm">
            Review deck
          </button>
          <button className="px-6 py-2.5 bg-[#DCDCE0] hover:bg-[#D1D1D6] transition-colors rounded-[8px] text-[14px] font-medium text-[#2b2b2b] shadow-sm">
            Export PDF
          </button>
          <button className="px-6 py-2.5 bg-[#FFD29D] hover:bg-[#FFC270] transition-colors rounded-[8px] text-[14px] font-medium text-[#2b2b2b] shadow-sm">
            Send to client
          </button>
        </div>

      </div>
    </div>
  );
}