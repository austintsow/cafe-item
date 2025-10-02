"use client";

import { Result, CafeKey } from "@/lib/types";
import { RESULTS } from "@/lib/quizData";
import CafeItemIcon from "./CafeItemIcons";
import { useState } from "react";

interface ResultCardProps {
  result: Result;
  theme?: {
    background: string;
    accent: string;
  };
}

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

function Tooltip({ text, children }: TooltipProps) {
  const [show, setShow] = useState(false);
  
  return (
    <div className="relative inline-block">
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="cursor-help"
      >
        {children}
      </span>
      {show && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-stone-900 text-white text-[8px] rounded whitespace-nowrap z-50">
          {text}
        </div>
      )}
    </div>
  );
}

const CAFE_ITEM_NAMES: Record<CafeKey, string> = {
  matcha_latte: "Matcha Latte",
  iced_milk_coffee: "Iced Coffee",
  hot_black: "Black Coffee",
  americano: "Americano",
  cappuccino: "Cappuccino",
  espresso: "Espresso",
  iced_water: "Iced Water",
  breakfast_sandwich: "Breakfast Sandwich",
  chai: "Chai Latte",
  avocado_toast: "Avocado Toast",
  croissant: "Croissant",
  secret_chair: "Secret Chair",
};

export default function ResultCard({ result, theme }: ResultCardProps) {
  // Use theme background if provided, otherwise use result's colorClass
  const backgroundClass = theme ? theme.background : result.colorClass;
  
  return (
    <div className="w-full aspect-[3/4] bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col relative">
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${backgroundClass} transition-colors duration-500`} />
      
      {/* Content overlay */}
      <div className="relative z-10 flex flex-col h-full p-4 sm:p-5">
        {/* Header with branding */}
        <div className="flex justify-start items-start mb-1.5">
          <div className="text-emerald-700 text-xs sm:text-sm font-bold">
            matchame.cafe
          </div>
        </div>

        {/* Title and Icon */}
        <div className="mb-2 flex items-center gap-2">
          <div style={{ width: '60%' }}>
            {(() => {
              // Remove "You're " and any leading article (a/an/the)
              const itemName = result.title
                .replace("You're ", "")
                .replace("You're… The ", "")
                .replace(/^(a |an |the )/i, "");
              
              // Determine correct article based on sound
              const startsWithVowelSound = /^[aeiouAEIOU]/.test(itemName) || itemName.startsWith("Espresso");
              const article = startsWithVowelSound ? 'an' : 'a';
              
              return (
                <>
                  <p className="text-stone-900 text-[10px] sm:text-xs font-medium mb-0.5">You are {article}</p>
                  <h1 className="text-lg sm:text-2xl font-bold text-stone-900 leading-tight">
                    {itemName}
                  </h1>
                </>
              );
            })()}
          </div>
          <div className="bg-white/95 rounded-2xl p-2 sm:p-3 shadow-lg flex items-center justify-center" style={{ width: '40%' }}>
            <CafeItemIcon itemKey={result.key} className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>
        </div>

        {/* Traits as tags */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-1.5 justify-center">
          {result.traits.map((trait, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-white/90 text-stone-800 text-[9px] sm:text-[10px] font-medium rounded-full"
            >
              #{trait.replace(/\s+/g, "")}
            </span>
          ))}
        </div>

        {/* Two column layout for main content */}
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-2">
          {/* Left column */}
          <div className="space-y-1.5 sm:space-y-2">
            {/* Café Persona */}
            <div className="bg-white/95 rounded-xl p-2 border-2 border-emerald-500">
              <h3 className="text-[8px] sm:text-[10px] font-bold text-stone-900 mb-0.5">CAFÉ PERSONA</h3>
              <p className="text-[10px] sm:text-xs font-bold text-emerald-600">{result.cafePersona}</p>
            </div>

            {/* Vibe Level */}
            <div className="bg-white/95 rounded-xl p-2 border-2 border-blue-500">
              <h3 className="text-[8px] sm:text-[10px] font-bold text-stone-900 mb-0.5">VIBE LEVEL</h3>
              <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-0.5">{result.vibeLevel}%</div>
              <p className="text-[8px] sm:text-[9px] text-stone-600">{result.vibeLabel}</p>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-1.5 sm:space-y-2">
            {/* Lucky Charm */}
            <div className="bg-white/95 rounded-xl p-2 border-2 border-amber-500">
              <h3 className="text-[8px] sm:text-[10px] font-bold text-stone-900 mb-0.5">CAFÉ LUCKY CHARM</h3>
              <p className="text-[10px] sm:text-xs font-bold text-amber-600">{result.luckyCharm}</p>
            </div>

            {/* Explanation */}
            <div className="bg-white/95 rounded-xl p-2">
              <h3 className="text-[8px] sm:text-[10px] font-bold text-stone-900 mb-0.5">WHY</h3>
              <p className="text-[8px] sm:text-[9px] text-stone-700 leading-snug">
                {(() => {
                  // Remove "You're " and any leading article (a/an/the)
                  const itemName = result.title
                    .replace("You're ", "")
                    .replace("You're… The ", "")
                    .replace(/^(a |an |the )/i, "");
                  
                  // Determine correct article
                  const startsWithVowelSound = /^[aeiouAEIOU]/.test(itemName) || itemName.startsWith("Espresso");
                  const article = startsWithVowelSound ? 'an' : 'a';
                  
                  // Extract the reason part after "because"
                  const reasonPart = result.explanation.split('because ')[1];
                  if (reasonPart) {
                    return `You're ${article} ${itemName} because ${reasonPart.charAt(0).toLowerCase()}${reasonPart.slice(1)}`;
                  }
                  return result.explanation;
                })()}
              </p>
            </div>
          </div>
        </div>

        {/* Tablemates and Neighboring Tables */}
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-2">
          {/* Tablemates */}
          <div className="bg-white/95 rounded-xl p-1.5 sm:p-2">
            <h3 className="text-[8px] sm:text-[10px] font-bold text-emerald-600 mb-1">
              TABLEMATES{" "}
              <Tooltip text="Who you'd want sitting across from you">
                <span className="text-stone-400">(i)</span>
              </Tooltip>
            </h3>
            <div className="flex gap-1.5">
              {result.tablemates.map((tablemateKey) => (
                <div key={tablemateKey} className="flex flex-col items-center gap-0.5">
                  <div className="bg-stone-50 rounded-lg p-1">
                    <CafeItemIcon itemKey={tablemateKey} className="w-6 h-6" />
                  </div>
                  <span className="text-[8px] text-stone-600 font-medium text-center leading-tight">
                    {CAFE_ITEM_NAMES[tablemateKey]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Neighboring Tables */}
          <div className="bg-white/95 rounded-xl p-1.5 sm:p-2">
            <h3 className="text-[8px] sm:text-[10px] font-bold text-rose-600 mb-1">
              NEIGHBORING TABLES{" "}
              <Tooltip text="Who you tolerate nearby but don't join">
                <span className="text-stone-400">(i)</span>
              </Tooltip>
            </h3>
            <div className="flex gap-1.5">
              {result.neighboringTables.map((neighborKey) => (
                <div key={neighborKey} className="flex flex-col items-center gap-0.5 opacity-60">
                  <div className="bg-stone-50 rounded-lg p-1">
                    <CafeItemIcon itemKey={neighborKey} className="w-6 h-6" />
                  </div>
                  <span className="text-[8px] text-stone-600 font-medium text-center leading-tight">
                    {CAFE_ITEM_NAMES[neighborKey]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Best Pairings and Bad Combos */}
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          {/* Best Pairings */}
          <div className="bg-white/95 rounded-xl p-1.5 sm:p-2">
            <h3 className="text-[8px] sm:text-[10px] font-bold text-emerald-600 mb-1">
              BEST PAIRINGS{" "}
              <Tooltip text="Food/drinks that enhance your vibe">
                <span className="text-stone-400">(i)</span>
              </Tooltip>
            </h3>
            <div className="flex gap-1.5">
              {result.bestPairings.map((pairingKey) => (
                <div key={pairingKey} className="flex flex-col items-center gap-0.5">
                  <div className="bg-stone-50 rounded-lg p-1">
                    <CafeItemIcon itemKey={pairingKey} className="w-6 h-6" />
                  </div>
                  <span className="text-[8px] text-stone-600 font-medium text-center leading-tight">
                    {CAFE_ITEM_NAMES[pairingKey]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bad Combos */}
          <div className="bg-white/95 rounded-xl p-1.5 sm:p-2">
            <h3 className="text-[8px] sm:text-[10px] font-bold text-rose-600 mb-1">
              BAD COMBOS{" "}
              <Tooltip text="Food/drinks that kill your flow">
                <span className="text-stone-400">(i)</span>
              </Tooltip>
            </h3>
            <div className="flex gap-1.5">
              {result.worstPairings.map((pairingKey) => (
                <div key={pairingKey} className="flex flex-col items-center gap-0.5 opacity-60">
                  <div className="bg-stone-50 rounded-lg p-1">
                    <CafeItemIcon itemKey={pairingKey} className="w-6 h-6" />
                  </div>
                  <span className="text-[8px] text-stone-600 font-medium text-center leading-tight">
                    {CAFE_ITEM_NAMES[pairingKey]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
