const thinRegularClass = "font-normal opacity-[0.85] tracking-tight";

interface Props {
  onGetStarted?: () => void;
}

export default function RegularHomePage({ onGetStarted }: Props) {
  return (
    <div className="w-full h-full bg-[#F0F0F2] flex flex-col items-center justify-center gap-8 select-none overflow-hidden">
      
      {/* Firefox Logo + Text */}
      <div className="w-[220px] shrink-0">
        <img 
          src="/firefox_icon_text.webp" 
          className="w-full h-auto object-contain" 
          alt="Firefox" 
        />
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-[600px] shrink-0">
        <img 
          src="/search_bar.webp" 
          className="w-full h-auto object-contain" 
          alt="Search" 
        />
      </div>

      {/* --- BALANCED Smart Window Promo Card --- */}
      <div className="w-full max-w-[740px] bg-white rounded-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex overflow-hidden shrink-0 border border-gray-200/60">
        
        {/* Left Side (Image) */}
        <div className="w-[300px] shrink-0 bg-[#1B1B1D]">
          <img 
            src="/addfirefox_icon.webp" 
            className="w-full h-full object-cover" 
            alt="Smart Window Fox" 
          />
        </div>

        {/* Right Side (Content) */}
        <div className="flex-1 p-7 flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <img src="/shiny_icon.webp" className="w-7 h-7 object-contain" alt="" />
              <h2 className="text-[22px] font-bold text-[#202124] tracking-tight">Smart Window</h2>
            </div>
            <span className="border border-[#DCDCE0] text-[#5B5B66] text-[12px] font-medium px-3 py-1 rounded-[6px]">
              New Feature
            </span>
          </div>

          {/* Description */}
          <p className={`text-[15px] text-[#3A3A40] mb-5 leading-relaxed ${thinRegularClass}`}>
            Your AI-powered browsing companion is ready to help.
          </p>

          {/* List Items */}
          <div className="flex flex-col gap-3.5 mb-6">
            <div className="flex items-center gap-3">
              <img src="/firefox_icon.webp" className="w-5 h-5 object-contain" alt="" />
              <span className={`text-[15px] text-[#202124] ${thinRegularClass}`}>Helps while you browse</span>
            </div>
            <div className="flex items-center gap-3">
              <img src="/firefox_icon.webp" className="w-5 h-5 object-contain" alt="" />
              <span className={`text-[15px] text-[#202124] ${thinRegularClass}`}>Only sees what you allow</span>
            </div>
            <div className="flex items-center gap-3">
              <img src="/firefox_icon.webp" className="w-5 h-5 object-contain" alt="" />
              <span className={`text-[15px] text-[#202124] ${thinRegularClass}`}>You control what it remembers</span>
            </div>
          </div>

          {/* Terms Image */}
          <div className="mb-6 w-full">
            <img 
              src="/termsofuse_icon.webp" 
              className="w-full h-auto object-contain" 
              alt="Terms of Use" 
            />
          </div>

          {/* Action Button */}
          <button 
            onClick={onGetStarted}
            className="w-full mt-auto bg-[#FFD29D] hover:bg-[#F4C48A] text-[#202124] font-medium text-[15px] py-2.5 rounded-[8px] transition-colors"
          >
            Get Started
          </button>
          
        </div>
      </div>

    </div>
  );
}