import { useState } from 'react';

interface SchedulePageProps {
  onBack: () => void;
}

const thinRegularClass = "font-normal opacity-[0.85] tracking-tight";

export default function SchedulePage({ onBack }: SchedulePageProps) {
  
  // --- STATE ---
  const [isConfirmed, setIsConfirmed] = useState(false);

  // --- CALENDAR DATA ---
  const days = [
    { name: 'Mon', date: '9', isToday: true },
    { name: 'Tue', date: '10', isToday: false },
    { name: 'Wed', date: '11', isToday: false },
    { name: 'Thu', date: '12', isToday: false },
    { name: 'Fri', date: '13', isToday: false },
  ];

  const times = ['9 am', '10 am', '11 am', '1 pm', '3 pm'];
  const rowHeight = 110; 

  const [events, setEvents] = useState([
    { id: '1', day: 0, row: 0, span: 2, title: "Maison Noir - logo concepts", agent: "Design agent", color: "purple" },
    { id: '2', day: 0, row: 2, span: 1, title: "Brand brief review", agent: "Secretary agent", color: "pink" },
    { id: '3', day: 1, row: 0, span: 1, title: "Send 3 client invoices", agent: "Secretary agent", color: "blue" },
    { id: '4', day: 1, row: 1, span: 2, title: "Maison Noir - colour palette", agent: "Design agent", color: "purple" },
    { id: '5', day: 1, row: 3, span: 1, title: "Update portfolio site", agent: "Dev agent", color: "tan" },
    { id: '6', day: 2, row: 0, span: 2, title: "Maison Noir - typography", agent: "Design agent", color: "purple" },
    { id: '7', day: 2, row: 2, span: 1, title: "Client check-in email", agent: "Secretary agent", color: "green" },
    { id: '8', day: 2, row: 3, span: 1, title: "Fix contact form bug", agent: "Dev agent", color: "tan" },
    { id: '9', day: 3, row: 0, span: 1, title: "Maison Noir - review & iterate", agent: "Design agent", color: "purple" },
    { id: '10', day: 3, row: 1, span: 1, title: "Write design statement", agent: "Secretary agent", color: "green" },
    { id: '11', day: 3, row: 2, span: 1, title: "Archive last month files", agent: "Secretary agent", color: "pink" },
    { id: '12', day: 4, row: 0, span: 2, title: "Presentation prep-slides & talking points", agent: "Secretary + Design agents", color: "blue" },
    { id: '13', day: 4, row: 4, span: 1, title: "Client presentation", agent: "Kiki", color: "grey" },
  ]);

  const getColorStyles = (color: string) => {
    switch (color) {
      case 'purple': return { bg: 'bg-[#F7F5FC]', border: 'border-[#E9E4F5]', text: 'text-[#9A81E8]' };
      case 'blue': return { bg: 'bg-[#F2F9FD]', border: 'border-[#DDF1FA]', text: 'text-[#86ADCA]' };
      case 'pink': return { bg: 'bg-[#FFF6F8]', border: 'border-[#FAE4EB]', text: 'text-[#C98B9F]' };
      case 'green': return { bg: 'bg-[#F4FCF6]', border: 'border-[#E1F5E8]', text: 'text-[#8CBF9B]' };
      case 'tan': return { bg: 'bg-[#FDF6ED]', border: 'border-[#F2DFBA]', text: 'text-[#D4AD6B]' };
      case 'grey': return { bg: 'bg-[#EAEAEA]', border: 'border-[#CFCFCF]', text: 'text-[#82828C]' };
      default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-500' };
    }
  };

  const handleDragStart = (e: React.DragEvent, eventId: string) => {
    e.dataTransfer.setData('eventId', eventId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetDay: number, targetRow: number) => {
    e.preventDefault();
    const draggedEventId = e.dataTransfer.getData('eventId');
    setEvents(prevEvents => prevEvents.map(ev => ev.id === draggedEventId ? { ...ev, day: targetDay, row: targetRow } : ev));
    
    // Automatically switch back to unconfirmed if an item is moved
    if (isConfirmed) setIsConfirmed(false);
  };

  return (
    <div className="flex-1 flex flex-col w-full h-full min-h-0 bg-transparent p-6 md:p-10 items-center overflow-y-auto relative custom-scrollbar">
      
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-30 blur-[120px] pointer-events-none -z-10" style={{ background: 'radial-gradient(circle at 100% 160%, #FF980E 0%, #FFB347 30%, transparent 65%)' }} />

      <div className="w-full max-w-[1200px] flex flex-col flex-1">
        {/* --- HEADER --- */}
        <div className="flex flex-col w-full gap-10 shrink-0 mb-8">
          
          <button onClick={onBack} className="flex items-center gap-2 bg-[#DCDCE0] hover:bg-[#D1D1D6] transition-colors w-fit px-3 py-1.5 rounded-[8px] text-[13px] font-medium text-[#2b2b2b]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="flex items-start gap-4 select-none">
              <div className="w-1.5 h-11 bg-[#FFC270] rounded-full shrink-0 shadow-[0_0_15px_rgba(255,194,112,0.4)]" style={{ marginTop: '4px' }} />
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <img src="/schedule_icon.webp" className="w-8 h-8 object-contain opacity-80" alt="" />
                  <h1 className="text-[32px] lg:text-[42px] font-medium text-[#2b2b2b] tracking-tighter leading-none">Schedule</h1>
                </div>
                <div className="flex items-center gap-1.5 mt-2 ml-1">
                  <div className="w-3.5 h-3.5 rounded-full border border-[#82828C] flex items-center justify-center text-[10px] text-[#82828C] font-bold">i</div>
                  <span className={`text-[12px] text-[#82828C] italic ${thinRegularClass}`}>Drag blocks to manually reschedule.</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsConfirmed(false)}
                className="px-5 py-2 bg-[#DCDCE0] hover:bg-[#D1D1D6] text-[#2b2b2b] transition-colors rounded-[8px] text-[13px] font-medium"
              >
                Edit
              </button>
              
              {/* --- TOGGLEABLE CONFIRMATION BUTTON/TAG --- */}
              {isConfirmed ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-[#F4FCF6] border border-[#E1F5E8] rounded-[8px] shadow-sm animate-in fade-in zoom-in duration-200">
                  <div className="w-4 h-4 rounded-full bg-[#8CBF9B] flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="text-[13px] font-medium text-[#4A4A52]">Confirmed</span>
                </div>
              ) : (
                <button 
                  onClick={() => setIsConfirmed(true)}
                  className="px-6 py-2 bg-[#FFD29D] hover:bg-[#FFC270] transition-colors rounded-[8px] text-[13px] font-medium text-[#2b2b2b] shadow-sm"
                >
                  Confirm
                </button>
              )}
            </div>
          </div>
        </div>

        {/* --- CALENDAR GRID --- */}
        <div className="w-full overflow-x-auto rounded-[12px] border border-[#E9E9EB] bg-[#FDFDFE] shadow-sm shrink-0 mb-4 custom-scrollbar">
          <div className="min-w-[800px] flex flex-col">
              
              {/* Days Header Row */}
              <div className="flex border-b border-[#E9E9EB]">
                <div className="w-[70px] shrink-0 border-r border-[#E9E9EB]" />
                {days.map((day, i) => (
                  <div key={day.name} className={`flex-1 flex flex-col items-center justify-center py-4 ${i !== 4 ? 'border-r border-[#E9E9EB]' : ''}`}>
                    <span className={`text-[14px] font-medium ${day.isToday ? 'text-[#FF980E]' : 'text-[#82828C]'}`}>{day.name}</span>
                    <span className={`text-[20px] font-medium ${day.isToday ? 'text-[#FF980E]' : 'text-[#2b2b2b]'}`}>{day.date}</span>
                  </div>
                ))}
              </div>

              {/* Calendar Body */}
              <div className="flex relative bg-white">
                
                {/* Time Column */}
                <div className="w-[70px] shrink-0 border-r border-[#E9E9EB] flex flex-col bg-[#FDFDFE]">
                    {times.map(time => (
                      <div key={time} className="border-b border-[#E9E9EB] flex justify-center pt-3" style={{ height: `${rowHeight}px` }}>
                        <span className={`text-[12px] text-[#82828C] ${thinRegularClass}`}>{time}</span>
                      </div>
                    ))}
                </div>

                {/* Grid Lines & Draggable Events per Column */}
                <div className="flex-1 flex relative">
                    {days.map((_, dayIndex) => (
                      <div key={dayIndex} className={`flex-1 flex flex-col relative ${dayIndex !== 4 ? 'border-r border-[#E9E9EB]' : ''}`}>
                        
                        {/* Grid Drop Zones */}
                        {times.map((_, rowIndex) => (
                            <div 
                              key={rowIndex} 
                              className="border-b border-[#E9E9EB] w-full" 
                              style={{ height: `${rowHeight}px` }} 
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, dayIndex, rowIndex)}
                            />
                        ))}

                        {/* Events mapping */}
                        {events.filter(e => e.day === dayIndex).map((e) => {
                            const top = e.row * rowHeight;
                            const height = e.span * rowHeight;
                            const styles = getColorStyles(e.color);
                            
                            return (
                              <div
                                key={e.id}
                                draggable
                                onDragStart={(evt) => handleDragStart(evt, e.id)}
                                className={`absolute left-0 right-0 mx-1.5 p-3 rounded-[8px] border flex flex-col transition-transform hover:scale-[1.02] cursor-grab active:cursor-grabbing shadow-sm ${styles.bg} ${styles.border}`}
                                style={{ top: `${top + 6}px`, height: `${height - 12}px` }}
                              >
                                <span className="text-[14.5px] font-medium text-[#4A4A52] leading-snug mb-auto pr-2">{e.title}</span>
                                <span className={`text-[12px] font-medium ${styles.text}`}>{e.agent}</span>
                              </div>
                            );
                        })}
                      </div>
                    ))}
                </div>
              </div>
          </div>
        </div>

        {/* --- LEGEND BAR AT BOTTOM --- */}
        <div className="w-full bg-white border border-[#E9E9EB] shadow-sm rounded-[10px] py-3 px-6 flex items-center justify-between shrink-0 mt-2 mb-10 overflow-x-auto">
          <div className="flex items-center gap-8 min-w-max">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#9A81E8]" /><span className={`text-[14px] text-[#82828C] ${thinRegularClass}`}>Design agent</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#86ADCA]" /><span className={`text-[14px] text-[#82828C] ${thinRegularClass}`}>Secretary agent</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#D4AD6B]" /><span className={`text-[14px] text-[#82828C] ${thinRegularClass}`}>Dev agent</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#8CBF9B]" /><span className={`text-[14px] text-[#82828C] ${thinRegularClass}`}>Secretary agent (comms)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#C98B9F]" /><span className={`text-[14px] text-[#82828C] ${thinRegularClass}`}>Admin</span></div>
          </div>
        </div>

      </div>
    </div>
  );
}