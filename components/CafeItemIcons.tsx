import { CafeKey } from "@/lib/types";

interface CafeItemIconProps {
  itemKey: CafeKey;
  className?: string;
}

export default function CafeItemIcon({ itemKey, className = "w-32 h-32" }: CafeItemIconProps) {
  const icons: Record<CafeKey, JSX.Element> = {
    matcha_latte: (
      <svg viewBox="0 0 80 120" className={className}>
        <path d="M15,35 L20,100 Q20,110 30,110 L50,110 Q60,110 60,100 L65,35 Z" 
              fill="#a0c4a0" stroke="#88b088" strokeWidth="3"/>
        <ellipse cx="40" cy="35" rx="25" ry="6" fill="#88b088" stroke="#709870" strokeWidth="2"/>
        <ellipse cx="40" cy="45" rx="22" ry="5" fill="#c8d8c8"/>
      </svg>
    ),
    
    iced_milk_coffee: (
      <svg viewBox="0 0 100 130" className={className}>
        {/* Glass */}
        <path d="M25,35 L30,110 Q30,115 35,115 L65,115 Q70,115 70,110 L75,35 Z" 
              fill="#e8d8c8" fillOpacity="0.3" stroke="#c8a888" strokeWidth="3"/>
        <ellipse cx="50" cy="35" rx="25" ry="6" fill="none" stroke="#c8a888" strokeWidth="3"/>
        
        {/* Coffee liquid */}
        <path d="M27,50 L31,108 Q31,113 36,113 L64,113 Q69,113 69,108 L73,50 Z" 
              fill="#b8906c" fillOpacity="0.7"/>
        
        {/* Ice cubes */}
        <rect x="35" y="55" width="12" height="12" fill="#e8f4f8" stroke="#b8d8e8" strokeWidth="2" opacity="0.8"/>
        <rect x="52" y="70" width="12" height="12" fill="#e8f4f8" stroke="#b8d8e8" strokeWidth="2" opacity="0.8"/>
        <rect x="38" y="85" width="12" height="12" fill="#e8f4f8" stroke="#b8d8e8" strokeWidth="2" opacity="0.8"/>
        
        {/* Straw */}
        <rect x="58" y="20" width="4" height="70" fill="#f8a8a8" stroke="#e88888" strokeWidth="2"/>
      </svg>
    ),
    
    hot_black: (
      <svg viewBox="0 0 100 120" className={className}>
        {/* Mug body */}
        <path d="M20,40 L25,90 Q25,100 35,100 L65,100 Q75,100 75,90 L80,40 Q80,35 75,35 L25,35 Q20,35 20,40 Z" 
              fill="#4a3428" stroke="#2a1818" strokeWidth="3"/>
        <ellipse cx="50" cy="35" rx="25" ry="8" fill="#2a1818" stroke="#1a0808" strokeWidth="2"/>
        
        {/* Handle */}
        <path d="M80,50 Q95,50 95,65 Q95,80 80,80" fill="none" stroke="#2a1818" strokeWidth="4" strokeLinecap="round"/>
        
        {/* Steam */}
        <path d="M35,30 Q33,24 35,18 Q37,12 35,8" fill="none" stroke="#a8a8a8" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
        <path d="M50,28 Q52,22 50,16 Q48,10 50,6" fill="none" stroke="#a8a8a8" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
        <path d="M65,30 Q67,24 65,18 Q63,12 65,8" fill="none" stroke="#a8a8a8" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
    
    americano: (
      <svg viewBox="0 0 100 120" className={className}>
        {/* Mug body */}
        <path d="M20,40 L25,90 Q25,100 35,100 L65,100 Q75,100 75,90 L80,40 Q80,35 75,35 L25,35 Q20,35 20,40 Z" 
              fill="#6a5444" stroke="#4a3428" strokeWidth="3"/>
        <ellipse cx="50" cy="35" rx="25" ry="8" fill="#4a3428" stroke="#2a1818" strokeWidth="2"/>
        
        {/* Handle */}
        <path d="M80,50 Q95,50 95,65 Q95,80 80,80" fill="none" stroke="#4a3428" strokeWidth="4" strokeLinecap="round"/>
        
        {/* Water texture */}
        <ellipse cx="50" cy="45" rx="20" ry="4" fill="#8a7464" opacity="0.3"/>
      </svg>
    ),
    
    cappuccino: (
      <svg viewBox="0 0 100 120" className={className}>
        {/* Cup body */}
        <path d="M20,40 L25,90 Q25,100 35,100 L65,100 Q75,100 75,90 L80,40 Q80,35 75,35 L25,35 Q20,35 20,40 Z" 
              fill="#d8c8b8" stroke="#b8a898" strokeWidth="3"/>
        <ellipse cx="50" cy="35" rx="25" ry="8" fill="#b8a898" stroke="#988878" strokeWidth="2"/>
        
        {/* Foam/milk */}
        <ellipse cx="50" cy="40" rx="22" ry="6" fill="#f8f0e8"/>
        <ellipse cx="45" cy="38" rx="8" ry="4" fill="white" opacity="0.6"/>
        <ellipse cx="55" cy="41" rx="6" ry="3" fill="white" opacity="0.6"/>
        
        {/* Handle */}
        <path d="M80,50 Q95,50 95,65 Q95,80 80,80" fill="none" stroke="#b8a898" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
    
    espresso: (
      <svg viewBox="0 0 80 100" className={className}>
        {/* Small white cup */}
        <path d="M20,45 L23,75 Q23,80 30,80 L50,80 Q57,80 57,75 L60,45 Q60,42 55,42 L25,42 Q20,42 20,45 Z" 
              fill="white" stroke="#b8b8b8" strokeWidth="3"/>
        <ellipse cx="40" cy="42" rx="18" ry="5" fill="#e8e8e8" stroke="#c8c8c8" strokeWidth="2"/>
        
        {/* Dark espresso inside */}
        <path d="M22,50 L24,73 Q24,77 31,77 L49,77 Q56,77 56,73 L58,50 Z" 
              fill="#4a3428" opacity="0.9"/>
        
        {/* Crema layer */}
        <ellipse cx="40" cy="50" rx="16" ry="3" fill="#c89868" opacity="0.8"/>
        
        {/* Saucer */}
        <ellipse cx="40" cy="82" rx="28" ry="6" fill="white" stroke="#d8d8d8" strokeWidth="2"/>
      </svg>
    ),
    
    iced_water: (
      <svg viewBox="0 0 100 130" className={className}>
        {/* Glass */}
        <path d="M25,35 L30,110 Q30,115 35,115 L65,115 Q70,115 70,110 L75,35 Z" 
              fill="#d8f4f8" fillOpacity="0.2" stroke="#88c8d8" strokeWidth="3"/>
        <ellipse cx="50" cy="35" rx="25" ry="6" fill="none" stroke="#88c8d8" strokeWidth="3"/>
        
        {/* Water */}
        <path d="M27,50 L31,108 Q31,113 36,113 L64,113 Q69,113 69,108 L73,50 Z" 
              fill="#c8e8f8" fillOpacity="0.4"/>
        
        {/* Ice cubes */}
        <rect x="35" y="55" width="15" height="15" fill="#e8f8fc" stroke="#b8d8e8" strokeWidth="2" opacity="0.9"/>
        <rect x="50" y="70" width="15" height="15" fill="#e8f8fc" stroke="#b8d8e8" strokeWidth="2" opacity="0.9"/>
        <rect x="35" y="88" width="15" height="15" fill="#e8f8fc" stroke="#b8d8e8" strokeWidth="2" opacity="0.9"/>
        
        {/* Lemon slice */}
        <circle cx="50" cy="40" r="8" fill="#f8e888" stroke="#d8c868" strokeWidth="2"/>
        <line x1="50" y1="32" x2="50" y2="48" stroke="#d8c868" strokeWidth="1"/>
        <line x1="42" y1="40" x2="58" y2="40" stroke="#d8c868" strokeWidth="1"/>
      </svg>
    ),
    
    breakfast_sandwich: (
      <svg viewBox="0 0 120 100" className={className}>
        {/* Bottom bun */}
        <ellipse cx="60" cy="75" rx="40" ry="12" fill="#d8b888" stroke="#c8a878" strokeWidth="3"/>
        <ellipse cx="60" cy="73" rx="40" ry="10" fill="#e8c898"/>
        
        {/* Egg */}
        <ellipse cx="60" cy="60" rx="35" ry="8" fill="#f8e888"/>
        <ellipse cx="55" cy="60" rx="10" ry="6" fill="#f8c828"/>
        
        {/* Cheese */}
        <rect x="25" y="52" width="70" height="6" fill="#f8d868" stroke="#e8c858" strokeWidth="2"/>
        
        {/* Bacon/sausage */}
        <path d="M30,48 Q45,46 60,47 Q75,46 90,48" fill="none" stroke="#c87850" strokeWidth="5" strokeLinecap="round"/>
        <path d="M32,44 Q47,43 62,44 Q77,43 88,44" fill="none" stroke="#c87850" strokeWidth="4" strokeLinecap="round"/>
        
        {/* Top bun */}
        <ellipse cx="60" cy="35" rx="38" ry="15" fill="#d8b888" stroke="#c8a878" strokeWidth="3"/>
        <ellipse cx="60" cy="32" rx="38" ry="12" fill="#e8c898"/>
        
        {/* Sesame seeds */}
        <circle cx="45" cy="28" r="2" fill="#f8f0d8"/>
        <circle cx="55" cy="30" r="2" fill="#f8f0d8"/>
        <circle cx="65" cy="29" r="2" fill="#f8f0d8"/>
        <circle cx="75" cy="31" r="2" fill="#f8f0d8"/>
      </svg>
    ),
    
    chai: (
      <svg viewBox="0 0 100 120" className={className}>
        {/* Mug body */}
        <path d="M20,40 L25,90 Q25,100 35,100 L65,100 Q75,100 75,90 L80,40 Q80,35 75,35 L25,35 Q20,35 20,40 Z" 
              fill="#c89878" stroke="#b88868" strokeWidth="3"/>
        <ellipse cx="50" cy="35" rx="25" ry="8" fill="#b88868" stroke="#a87858" strokeWidth="2"/>
        
        {/* Milk foam */}
        <ellipse cx="50" cy="40" rx="22" ry="6" fill="#f8e8d8"/>
        
        {/* Spices/cinnamon */}
        <circle cx="45" cy="38" r="1.5" fill="#886838"/>
        <circle cx="52" cy="40" r="1.5" fill="#886838"/>
        <circle cx="48" cy="42" r="1.5" fill="#886838"/>
        <line x1="54" y1="37" x2="56" y2="39" stroke="#886838" strokeWidth="2" strokeLinecap="round"/>
        
        {/* Handle */}
        <path d="M80,50 Q95,50 95,65 Q95,80 80,80" fill="none" stroke="#b88868" strokeWidth="4" strokeLinecap="round"/>
        
        {/* Steam */}
        <path d="M40,30 Q38,24 40,18 Q42,12 40,8" fill="none" stroke="#a8a8a8" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
        <path d="M60,30 Q62,24 60,18 Q58,12 60,8" fill="none" stroke="#a8a8a8" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    
    avocado_toast: (
      <svg viewBox="0 0 100 100" className={className}>
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
    ),
    
    croissant: (
      <svg viewBox="0 0 140 80" className={className}>
        <path d="M10,40 Q20,20 40,25 Q60,30 80,25 Q100,20 120,30 Q130,35 125,45 Q115,55 95,52 Q75,49 55,52 Q35,55 20,48 Q8,42 10,40 Z" 
              fill="#e8c888" stroke="#d0b070" strokeWidth="3"/>
        <path d="M30,35 Q50,32 70,35 Q90,38 105,35" fill="none" stroke="#d0b070" strokeWidth="3" strokeLinecap="round"/>
        <path d="M35,42 Q55,40 75,42 Q95,44 108,42" fill="none" stroke="#d0b070" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    
    secret_chair: (
      <svg viewBox="0 0 100 120" className={className}>
        {/* Chair seat */}
        <rect x="20" y="60" width="60" height="8" rx="2" fill="#8888d8" stroke="#6868b8" strokeWidth="3"/>
        
        {/* Chair back */}
        <rect x="25" y="25" width="50" height="38" rx="3" fill="#a8a8e8" stroke="#8888c8" strokeWidth="3"/>
        
        {/* Vertical slats */}
        <line x1="35" y1="30" x2="35" y2="58" stroke="#8888c8" strokeWidth="2"/>
        <line x1="50" y1="30" x2="50" y2="58" stroke="#8888c8" strokeWidth="2"/>
        <line x1="65" y1="30" x2="65" y2="58" stroke="#8888c8" strokeWidth="2"/>
        
        {/* Legs */}
        <line x1="25" y1="68" x2="22" y2="95" stroke="#6868b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="75" y1="68" x2="78" y2="95" stroke="#6868b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="25" y1="68" x2="28" y2="95" stroke="#6868b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="75" y1="68" x2="72" y2="95" stroke="#6868b8" strokeWidth="4" strokeLinecap="round"/>
        
        {/* Sparkles for magic */}
        <circle cx="15" cy="20" r="3" fill="#f8d888" opacity="0.8"/>
        <circle cx="85" cy="25" r="4" fill="#f8d888" opacity="0.8"/>
        <circle cx="90" cy="50" r="3" fill="#f8d888" opacity="0.8"/>
        <line x1="12" y1="15" x2="18" y2="15" stroke="#f8d888" strokeWidth="2" strokeLinecap="round"/>
        <line x1="15" y1="12" x2="15" y2="18" stroke="#f8d888" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  };

  return icons[itemKey] || null;
}
