"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ItemPosition {
  x: number;
  y: number;
}

interface DragState {
  isDragging: boolean;
  itemId: string | null;
  startX: number;
  startY: number;
  initialItemX: number;
  initialItemY: number;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    itemId: null,
    startX: 0,
    startY: 0,
    initialItemX: 0,
    initialItemY: 0,
  });

  const [itemPositions, setItemPositions] = useState<Record<string, ItemPosition>>({
    coffeeCup: { x: 8, y: 15 },
    matchaLatte: { x: 12, y: 8 },
    croissant: { x: 35, y: 12 },
    coffeeBeans: { x: 28, y: 65 },
    flowers: { x: 18, y: 20 },
    avocadoToast: { x: 55, y: 25 },
    bagel: { x: 70, y: 55 },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, itemId: string) => {
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setDragState({
      isDragging: true,
      itemId,
      startX: clientX,
      startY: clientY,
      initialItemX: itemPositions[itemId].x,
      initialItemY: itemPositions[itemId].y,
    });
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragState.isDragging || !dragState.itemId) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    // Calculate total offset from drag start point
    const deltaX = ((clientX - dragState.startX) / window.innerWidth) * 100;
    const deltaY = ((clientY - dragState.startY) / window.innerHeight) * 100;
    
    // Items that are positioned from the right (matchaLatte, flowers, avocadoToast, coffeeBeans)
    // need inverted X delta since their left position is calculated as (100 - x)
    const invertedXItems = ['matchaLatte', 'flowers', 'avocadoToast', 'coffeeBeans'];
    // Items that are positioned from the bottom (coffeeBeans) need inverted Y delta
    const invertedYItems = ['coffeeBeans'];
    
    const xMultiplier = invertedXItems.includes(dragState.itemId!) ? -1 : 1;
    const yMultiplier = invertedYItems.includes(dragState.itemId!) ? -1 : 1;
    
    setItemPositions(prev => ({
      ...prev,
      [dragState.itemId!]: {
        x: Math.max(0, Math.min(90, dragState.initialItemX + (deltaX * xMultiplier))),
        y: Math.max(0, Math.min(90, dragState.initialItemY + (deltaY * yMultiplier))),
      },
    }));
  };

  const handleDragEnd = () => {
    setDragState({
      isDragging: false,
      itemId: null,
      startX: 0,
      startY: 0,
      initialItemX: 0,
      initialItemY: 0,
    });
  };

  useEffect(() => {
    if (dragState.isDragging) {
      const handleMouseMove = (e: MouseEvent) => handleDragMove(e as any);
      const handleTouchMove = (e: TouchEvent) => handleDragMove(e as any);
      const handleEnd = () => handleDragEnd();
      
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchend', handleEnd);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('mouseup', handleEnd);
        window.removeEventListener('touchend', handleEnd);
      };
    }
  }, [dragState]);
  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Cafe-themed Brush Strokes Background */}
      <div 
        className="absolute inset-0 overflow-hidden"
        onMouseMove={handleDragMove}
        onTouchMove={handleDragMove}
      >
        <style jsx>{`
          @keyframes drawIn {
            from { stroke-dashoffset: 1000; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes fillIn {
            from { fill-opacity: 0; }
            to { fill-opacity: 1; }
          }
          @keyframes steamRise {
            0% { transform: translateY(0) scale(1); opacity: 0.6; }
            100% { transform: translateY(-20px) scale(1.2); opacity: 0; }
          }
        `}</style>
        {/* Coffee Cup - Top Left - Pastel Brown */}
        <div 
          className="absolute w-24 h-28 rotate-12 opacity-50 cursor-grab active:cursor-grabbing transition-transform hover:scale-105"
          style={{ 
            top: `${itemPositions.coffeeCup.y}%`, 
            left: `${itemPositions.coffeeCup.x}%`,
            transform: `translate(0, 0)`
          }}
          onMouseDown={(e) => handleDragStart(e, 'coffeeCup')}
          onTouchStart={(e) => handleDragStart(e, 'coffeeCup')}
        >
          <svg viewBox="0 0 100 120" className="w-full h-full">
            <path d="M20,40 L25,90 Q25,100 35,100 L65,100 Q75,100 75,90 L80,40 Q80,35 75,35 L25,35 Q20,35 20,40 Z" 
                  fill="#c9894e" stroke="#b87a3e" strokeWidth="3"/>
            <ellipse cx="50" cy="35" rx="25" ry="8" fill="#b87a3e" stroke="#a8683e" strokeWidth="2"/>
            <path d="M80,50 Q95,50 95,65 Q95,80 80,80" fill="none" stroke="#b87a3e" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Matcha Latte - Top Right - Pastel Green */}
        <div 
          className="absolute w-20 h-32 -rotate-6 opacity-45 cursor-grab active:cursor-grabbing transition-transform hover:scale-105"
          style={{ 
            top: `${itemPositions.matchaLatte.y}%`, 
            left: `${100 - itemPositions.matchaLatte.x}%`,
            transform: `translate(-100%, 0)`
          }}
          onMouseDown={(e) => handleDragStart(e, 'matchaLatte')}
          onTouchStart={(e) => handleDragStart(e, 'matchaLatte')}
        >
          <svg viewBox="0 0 80 120" className="w-full h-full">
            <path d="M15,35 L20,100 Q20,110 30,110 L50,110 Q60,110 60,100 L65,35 Z" 
                  fill="#a0c4a0" stroke="#88b088" strokeWidth="3"/>
            <ellipse cx="40" cy="35" rx="25" ry="6" fill="#88b088" stroke="#709870" strokeWidth="2"/>
            <ellipse cx="40" cy="45" rx="22" ry="5" fill="#c8d8c8"/>
          </svg>
        </div>

        {/* Croissant - Left Side - Pastel Yellow/Brown */}
        <div 
          className="absolute w-32 h-20 rotate-45 opacity-42 cursor-grab active:cursor-grabbing transition-transform hover:scale-105"
          style={{ 
            top: `${itemPositions.croissant.y}%`, 
            left: `${itemPositions.croissant.x}%`,
            transform: `translate(0, 0)`
          }}
          onMouseDown={(e) => handleDragStart(e, 'croissant')}
          onTouchStart={(e) => handleDragStart(e, 'croissant')}
        >
          <svg viewBox="0 0 140 80" className="w-full h-full">
            <path d="M10,40 Q20,20 40,25 Q60,30 80,25 Q100,20 120,30 Q130,35 125,45 Q115,55 95,52 Q75,49 55,52 Q35,55 20,48 Q8,42 10,40 Z" 
                  fill="#e8c888" stroke="#d0b070" strokeWidth="3"/>
            <path d="M30,35 Q50,32 70,35 Q90,38 105,35" fill="none" stroke="#d0b070" strokeWidth="3" strokeLinecap="round"/>
            <path d="M35,42 Q55,40 75,42 Q95,44 108,42" fill="none" stroke="#d0b070" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Coffee Bean Cluster - Brown */}
        <div 
          className="absolute w-20 h-20 rotate-[-15deg] opacity-32 cursor-grab active:cursor-grabbing transition-transform hover:scale-105"
          style={{ 
            top: `${100 - itemPositions.coffeeBeans.y}%`, 
            left: `${100 - itemPositions.coffeeBeans.x}%`,
            transform: `translate(-100%, -100%)`
          }}
          onMouseDown={(e) => handleDragStart(e, 'coffeeBeans')}
          onTouchStart={(e) => handleDragStart(e, 'coffeeBeans')}
        >
          <svg viewBox="0 0 80 80" className="w-full h-full">
            <ellipse cx="30" cy="35" rx="12" ry="18" fill="#c8a68a" transform="rotate(-20 30 35)"/>
            <ellipse cx="50" cy="40" rx="12" ry="18" fill="#b89678" transform="rotate(15 50 40)"/>
            <ellipse cx="40" cy="55" rx="12" ry="18" fill="#d4b49a" transform="rotate(-10 40 55)"/>
            <line x1="30" y1="30" x2="30" y2="45" stroke="#a8866a" strokeWidth="1.5"/>
            <line x1="50" y1="35" x2="50" y2="50" stroke="#a8866a" strokeWidth="1.5"/>
          </svg>
        </div>

        {/* Flower Bouquet in Vase - Pink Flowers */}
        <div 
          className="absolute w-24 h-36 -rotate-3 opacity-45 cursor-grab active:cursor-grabbing transition-transform hover:scale-105"
          style={{ 
            top: `${itemPositions.flowers.y}%`, 
            left: `${100 - itemPositions.flowers.x}%`,
            transform: `translate(-100%, 0)`
          }}
          onMouseDown={(e) => handleDragStart(e, 'flowers')}
          onTouchStart={(e) => handleDragStart(e, 'flowers')}
        >
          <svg viewBox="0 0 100 150" className="w-full h-full">
            {/* Vase */}
            <path d="M40,100 L35,130 Q35,140 45,140 L55,140 Q65,140 65,130 L60,100 Z" 
                  fill="#e8e4f0" className="opacity-70"/>
            <ellipse cx="50" cy="100" rx="10" ry="4" fill="#d8d4e0"/>
            
            {/* Stems */}
            <line x1="45" y1="100" x2="35" y2="40" stroke="#78b078" strokeWidth="3" strokeLinecap="round"/>
            <line x1="50" y1="100" x2="50" y2="35" stroke="#78b078" strokeWidth="3" strokeLinecap="round"/>
            <line x1="55" y1="100" x2="60" y2="45" stroke="#78b078" strokeWidth="3" strokeLinecap="round"/>
            <line x1="48" y1="100" x2="42" y2="50" stroke="#78b078" strokeWidth="2.8" strokeLinecap="round"/>
            
            {/* Pink Flowers */}
            <circle cx="35" cy="40" r="6" fill="#f890b0" stroke="#e87898" strokeWidth="2"/>
            <circle cx="32" cy="37" r="4" fill="#fca8c8"/>
            <circle cx="38" cy="37" r="4" fill="#fca8c8"/>
            <circle cx="35" cy="34" r="4" fill="#fca8c8"/>
            <circle cx="35" cy="43" r="4" fill="#fca8c8"/>
            
            <circle cx="50" cy="35" r="7" fill="#f8c8d8"/>
            <circle cx="47" cy="31" r="4.5" fill="#fcd8e8" className="opacity-80"/>
            <circle cx="53" cy="31" r="4.5" fill="#fcd8e8" className="opacity-80"/>
            <circle cx="50" cy="28" r="4.5" fill="#fcd8e8" className="opacity-80"/>
            <circle cx="50" cy="41" r="4.5" fill="#fcd8e8" className="opacity-80"/>
            
            <circle cx="60" cy="45" r="5" fill="#f8c8d8"/>
            <circle cx="57" cy="42" r="3.5" fill="#fcd8e8" className="opacity-80"/>
            <circle cx="63" cy="42" r="3.5" fill="#fcd8e8" className="opacity-80"/>
            <circle cx="60" cy="39" r="3.5" fill="#fcd8e8" className="opacity-80"/>
            
            <circle cx="42" cy="50" r="5.5" fill="#f8c8d8"/>
            <circle cx="39" cy="47" r="3.8" fill="#fcd8e8" className="opacity-80"/>
            <circle cx="45" cy="47" r="3.8" fill="#fcd8e8" className="opacity-80"/>
          </svg>
        </div>

        {/* Avocado Toast - Green/Brown */}
        <div 
          className="absolute w-26 h-24 -rotate-12 opacity-42 cursor-grab active:cursor-grabbing transition-transform hover:scale-105"
          style={{ 
            top: `${itemPositions.avocadoToast.y}%`, 
            left: `${100 - itemPositions.avocadoToast.x}%`,
            transform: `translate(-100%, 0)`
          }}
          onMouseDown={(e) => handleDragStart(e, 'avocadoToast')}
          onTouchStart={(e) => handleDragStart(e, 'avocadoToast')}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Toast */}
            <rect x="25" y="35" width="50" height="45" rx="4" fill="#d8b888" stroke="#c8a878" strokeWidth="3"/>
            <rect x="27" y="37" width="46" height="41" rx="3" fill="#e8d498"/>
            
            {/* Avocado spread */}
            <path d="M30,45 Q35,42 40,43 Q50,42 60,44 Q68,43 72,47 Q74,52 70,58 Q65,65 55,67 Q45,68 38,65 Q30,62 28,55 Q27,50 30,45 Z" 
                  fill="#a8c888" stroke="#90b070" strokeWidth="3"/>
            <ellipse cx="50" cy="55" rx="12" ry="8" fill="#c8d8a8"/>
            
            {/* Seeds */}
            <circle cx="45" cy="52" r="2" fill="#708858"/>
            <circle cx="52" cy="55" r="2" fill="#708858"/>
            <circle cx="48" cy="58" r="2" fill="#708858"/>
          </svg>
        </div>

        {/* Bagel with Cream Cheese */}
        <div 
          className="absolute w-24 h-20 rotate-8 opacity-42 cursor-grab active:cursor-grabbing transition-transform hover:scale-105"
          style={{ 
            top: `${itemPositions.bagel.y}%`, 
            left: `${itemPositions.bagel.x}%`,
            transform: `translate(0, 0)`
          }}
          onMouseDown={(e) => handleDragStart(e, 'bagel')}
          onTouchStart={(e) => handleDragStart(e, 'bagel')}
        >
          <svg viewBox="0 0 100 80" className="w-full h-full">
            {/* Bagel */}
            <ellipse cx="50" cy="40" rx="35" ry="28" fill="#c8a878" stroke="#b09868" strokeWidth="3"/>
            <ellipse cx="50" cy="40" rx="15" ry="12" fill="#fdfcfb" stroke="#e8d8c8" strokeWidth="2"/>
            {/* Texture dots */}
            <circle cx="35" cy="30" r="2.5" fill="#a08858"/>
            <circle cx="42" cy="25" r="2.5" fill="#a08858"/>
            <circle cx="58" cy="27" r="2.5" fill="#a08858"/>
            <circle cx="65" cy="32" r="2.5" fill="#a08858"/>
            <circle cx="38" cy="48" r="2.5" fill="#a08858"/>
            <circle cx="62" cy="50" r="2.5" fill="#a08858"/>
            {/* Cream cheese */}
            <ellipse cx="50" cy="40" rx="13" ry="10" fill="#fffcf0"/>
          </svg>
        </div>

      </div>
      
      <div className="w-full max-w-sm mx-auto space-y-12 relative z-10 pointer-events-none">
        
        {/* White Coffee Mug - Hand Drawn Style */}
        <div className="flex justify-center">
          <svg width="120" height="140" viewBox="0 0 120 140" className="w-32 h-36">
            {/* Plate - Hand drawn */}
            <ellipse cx="60" cy="115" rx="45" ry="8" 
                     fill="white" 
                     stroke="#b8b8b8" 
                     strokeWidth="4"
                     strokeLinecap="round"
                     style={{
                       strokeDasharray: 300,
                       strokeDashoffset: mounted ? 0 : 300,
                       transition: 'stroke-dashoffset 1.5s ease-out',
                       fillOpacity: mounted ? 1 : 0,
                       transitionDelay: '0.3s'
                     }}/>
            
            {/* Mug Body - Thicker, hand drawn */}
            <path d="M36,96 L41,52 Q41,46 46,46 L74,46 Q79,46 79,52 L84,96 Q84,106 74,106 L46,106 Q36,106 36,96 Z" 
                  fill="white" 
                  stroke="#a8a8a8" 
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 400,
                    strokeDashoffset: mounted ? 0 : 400,
                    transition: 'stroke-dashoffset 2s ease-out',
                    fillOpacity: mounted ? 1 : 0,
                    transitionDelay: '0.5s'
                  }}/>
            
            {/* Handle - Thicker, wobbly */}
            <path d="M84,61 Q99,60 101,75 Q99,91 84,90" 
                  fill="none" 
                  stroke="#a8a8a8" 
                  strokeWidth="5"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 100,
                    strokeDashoffset: mounted ? 0 : 100,
                    transition: 'stroke-dashoffset 1.5s ease-out 0.8s'
                  }}/>
            
            {/* Coffee Inside - More vibrant */}
            <ellipse cx="60" cy="52" rx="17" ry="5" 
                     fill="#8b6239" 
                     style={{
                       fillOpacity: mounted ? 1 : 0,
                       transition: 'fill-opacity 1s ease-out 1.2s'
                     }}/>
            
            {/* Swirly Steam Wisps */}
            <path d="M48,45 Q46,38 48,32 Q50,26 48,20 Q47,15 50,12" 
                  fill="none" 
                  stroke="#c8c8c8" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.7"
                  style={{
                    strokeDasharray: 50,
                    strokeDashoffset: mounted ? 0 : 50,
                    transition: 'stroke-dashoffset 1.2s ease-out 1.5s',
                    animation: mounted ? 'steamRise 3s ease-in-out infinite' : 'none',
                    animationDelay: '2s'
                  }}/>
            <path d="M60,42 Q63,36 60,29 Q57,23 60,17 Q62,11 59,8" 
                  fill="none" 
                  stroke="#c8c8c8" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.7"
                  style={{
                    strokeDasharray: 50,
                    strokeDashoffset: mounted ? 0 : 50,
                    transition: 'stroke-dashoffset 1.2s ease-out 1.6s',
                    animation: mounted ? 'steamRise 3s ease-in-out infinite' : 'none',
                    animationDelay: '2.3s'
                  }}/>
            <path d="M72,45 Q75,39 72,33 Q69,27 72,21 Q74,15 71,11" 
                  fill="none" 
                  stroke="#c8c8c8" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.7"
                  style={{
                    strokeDasharray: 50,
                    strokeDashoffset: mounted ? 0 : 50,
                    transition: 'stroke-dashoffset 1.2s ease-out 1.7s',
                    animation: mounted ? 'steamRise 3s ease-in-out infinite' : 'none',
                    animationDelay: '2.6s'
                  }}/>
          </svg>
        </div>

        {/* Main Text */}
        <div className="space-y-6 text-center">
          <h1 className="text-2xl leading-relaxed text-stone-900 font-light tracking-wide">
            what cafe item<br />are you?
          </h1>
          <p className="text-sm text-stone-500 leading-relaxed max-w-[260px] mx-auto">
            answer some questions and we'll tell you which cozy cafe treat matches your vibe
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center pointer-events-auto">
          <Link href="/quiz" className="w-full">
            <button className="w-full px-8 py-4 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 active:scale-95 transition-all duration-150 border-2 border-stone-900">
              start quiz
            </button>
          </Link>
        </div>

        {/* Minimal Stats */}
        <div className="flex justify-center gap-8 text-xs text-stone-400">
          <div className="text-center">
            <div className="font-medium text-stone-700">~1 min</div>
          </div>
          <div className="text-stone-300">•</div>
          <div className="text-center">
            <div className="font-medium text-stone-700">10 q's</div>
          </div>
        </div>

      </div>
    </main>
  );
}
