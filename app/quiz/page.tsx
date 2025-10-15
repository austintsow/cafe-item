"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS, ITEM_PROFILES } from "@/lib/quizData";
import { AnswerMap, AxisVector } from "@/lib/types";
import { buildVector, pickResult, serializeAnswers } from "@/lib/scoring";
import QuizProgress from "@/components/QuizProgress";
import QuestionCard from "@/components/QuestionCard";
import StickyNav from "@/components/StickyNav";
import ConfirmReview from "@/components/ConfirmReview";

export default function QuizPage() {
  const router = useRouter();
  const total = QUESTIONS.length;
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"quiz" | "confirm">("quiz");
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const canGoBack = phase === "quiz" ? index > 0 : true;
  const selected = answers[QUESTIONS[index]?.id];

  function onSelectOption(optionId: string) {
    const q = QUESTIONS[index];
    setAnswers(prev => ({ ...prev, [q.id]: optionId }));

    // small delay to show selection state
    setTimeout(() => {
      if (index < total - 1) {
        setIndex(i => i + 1);
      } else {
        setPhase("confirm");
      }
    }, 180);
  }

  function onBack() {
    if (phase === "confirm") {
      setPhase("quiz");
      setIndex(total - 1);
      return;
    }
    if (index > 0) setIndex(i => i - 1);
  }

  function onJump(i: number) {
    setPhase("quiz");
    setIndex(i);
  }

  function onConfirm() {
    const vector: AxisVector = buildVector(answers, QUESTIONS);
    const k = pickResult(vector, ITEM_PROFILES);
    const data = serializeAnswers(answers);
    router.push(`/result?data=${encodeURIComponent(data)}&k=${encodeURIComponent(k)}` );
  }

  // Determine which decorative items to show based on question index
  // Each pattern has items for [top-left, top-right, bottom-left, bottom-right]
  const getDecorativeItems = () => {
    const patterns = [
      { topLeft: 'matchaLatte', topRight: 'coffeeCup', bottomLeft: 'croissant', bottomRight: 'coffeeBeans' },
      { topLeft: 'bagel', topRight: 'flowers', bottomLeft: 'avocadoToast', bottomRight: 'matchaLatte' },
      { topLeft: 'coffeeCup', topRight: 'flowers', bottomLeft: 'croissant', bottomRight: 'coffeeBeans' },
      { topLeft: 'matchaLatte', topRight: 'bagel', bottomLeft: 'avocadoToast', bottomRight: 'coffeeCup' },
      { topLeft: 'bagel', topRight: 'coffeeCup', bottomLeft: 'flowers', bottomRight: 'croissant' },
    ];
    return patterns[index % patterns.length];
  };

  const visibleItems = phase === "quiz" ? getDecorativeItems() : null;

  return (
    <div className="min-h-dvh relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(var(--rotate-start)); }
            50% { transform: translateY(-15px) rotate(var(--rotate-end)); }
          }
          @keyframes fadeInStay {
            from { opacity: 0; }
            to { opacity: var(--target-opacity); }
          }
        `}</style>

        {/* Coffee Cup */}
        {visibleItems && Object.values(visibleItems).includes('coffeeCup') && (
          <div
            key={`coffeeCup-${index}`}
            className="absolute w-16 h-20 sm:w-24 sm:h-28"
            style={{
              ...(visibleItems.topLeft === 'coffeeCup' && { top: '6%', left: '3%' }),
              ...(visibleItems.topRight === 'coffeeCup' && { top: '6%', right: '3%' }),
              ...(visibleItems.bottomLeft === 'coffeeCup' && { bottom: '20%', left: '3%' }),
              ...(visibleItems.bottomRight === 'coffeeCup' && { bottom: '20%', right: '3%' }),
              opacity: 0.5,
              animation: mounted ? 'float 6s ease-in-out infinite, fadeInStay 0.5s ease-out forwards' : 'none',
              '--rotate-start': '12deg',
              '--rotate-end': '8deg',
              '--target-opacity': 0.5,
            } as React.CSSProperties}
          >
            <svg viewBox="0 0 100 120" className="w-full h-full">
              <path d="M20,40 L25,90 Q25,100 35,100 L65,100 Q75,100 75,90 L80,40 Q80,35 75,35 L25,35 Q20,35 20,40 Z"
                    fill="#c9894e" stroke="#b87a3e" strokeWidth="3"/>
              <ellipse cx="50" cy="35" rx="25" ry="8" fill="#b87a3e"/>
              <path d="M80,50 Q95,50 95,65 Q95,80 80,80" fill="none" stroke="#b87a3e" strokeWidth="4" strokeLinecap="round"/>
            </svg>
          </div>
        )}

        {/* Croissant */}
        {visibleItems && Object.values(visibleItems).includes('croissant') && (
          <div
            key={`croissant-${index}`}
            className="absolute w-20 h-12 sm:w-32 sm:h-20"
            style={{
              ...(visibleItems.topLeft === 'croissant' && { top: '8%', left: '3%' }),
              ...(visibleItems.topRight === 'croissant' && { top: '8%', right: '3%' }),
              ...(visibleItems.bottomLeft === 'croissant' && { bottom: '20%', left: '3%' }),
              ...(visibleItems.bottomRight === 'croissant' && { bottom: '20%', right: '3%' }),
              opacity: 0.42,
              animation: mounted ? 'float 7s ease-in-out infinite, fadeInStay 0.5s ease-out forwards' : 'none',
              animationDelay: '0.1s',
              '--rotate-start': '45deg',
              '--rotate-end': '40deg',
              '--target-opacity': 0.42,
            } as React.CSSProperties}
          >
            <svg viewBox="0 0 140 80" className="w-full h-full">
              <path d="M10,40 Q20,20 40,25 Q60,30 80,25 Q100,20 120,30 Q130,35 125,45 Q115,55 95,52 Q75,49 55,52 Q35,55 20,48 Q8,42 10,40 Z"
                    fill="#e8c888" stroke="#d0b070" strokeWidth="3"/>
              <path d="M30,35 Q50,32 70,35 Q90,38 105,35" fill="none" stroke="#d0b070" strokeWidth="3" strokeLinecap="round"/>
              <path d="M35,42 Q55,40 75,42 Q95,44 108,42" fill="none" stroke="#d0b070" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
        )}

        {/* Matcha Latte */}
        {visibleItems && Object.values(visibleItems).includes('matchaLatte') && (
          <div
            key={`matchaLatte-${index}`}
            className="absolute w-14 h-24 sm:w-20 sm:h-32"
            style={{
              ...(visibleItems.topLeft === 'matchaLatte' && { top: '6%', left: '3%' }),
              ...(visibleItems.topRight === 'matchaLatte' && { top: '6%', right: '3%' }),
              ...(visibleItems.bottomLeft === 'matchaLatte' && { bottom: '20%', left: '3%' }),
              ...(visibleItems.bottomRight === 'matchaLatte' && { bottom: '20%', right: '3%' }),
              opacity: 0.45,
              animation: mounted ? 'float 5.5s ease-in-out infinite, fadeInStay 0.5s ease-out forwards' : 'none',
              animationDelay: '0.2s',
              '--rotate-start': '-6deg',
              '--rotate-end': '-3deg',
              '--target-opacity': 0.45,
            } as React.CSSProperties}
          >
            <svg viewBox="0 0 80 120" className="w-full h-full">
              <path d="M15,35 L20,100 Q20,110 30,110 L50,110 Q60,110 60,100 L65,35 Z"
                    fill="#a0c4a0" stroke="#88b088" strokeWidth="3"/>
              <ellipse cx="40" cy="35" rx="25" ry="6" fill="#88b088"/>
              <ellipse cx="40" cy="45" rx="22" ry="5" fill="#c8d8c8"/>
            </svg>
          </div>
        )}

        {/* Coffee Beans */}
        {visibleItems && Object.values(visibleItems).includes('coffeeBeans') && (
          <div
            key={`coffeeBeans-${index}`}
            className="absolute w-14 h-14 sm:w-20 sm:h-20"
            style={{
              ...(visibleItems.topLeft === 'coffeeBeans' && { top: '6%', left: '3%' }),
              ...(visibleItems.topRight === 'coffeeBeans' && { top: '6%', right: '3%' }),
              ...(visibleItems.bottomLeft === 'coffeeBeans' && { bottom: '20%', left: '3%' }),
              ...(visibleItems.bottomRight === 'coffeeBeans' && { bottom: '20%', right: '3%' }),
              opacity: 0.32,
              animation: mounted ? 'float 6.5s ease-in-out infinite, fadeInStay 0.5s ease-out forwards' : 'none',
              animationDelay: '0.3s',
              '--rotate-start': '-15deg',
              '--rotate-end': '-10deg',
              '--target-opacity': 0.32,
            } as React.CSSProperties}
          >
            <svg viewBox="0 0 80 80" className="w-full h-full">
              <ellipse cx="30" cy="35" rx="12" ry="18" fill="#c8a68a" transform="rotate(-20 30 35)"/>
              <ellipse cx="50" cy="40" rx="12" ry="18" fill="#b89678" transform="rotate(15 50 40)"/>
              <ellipse cx="40" cy="55" rx="12" ry="18" fill="#d4b49a" transform="rotate(-10 40 55)"/>
              <line x1="30" y1="30" x2="30" y2="45" stroke="#a8866a" strokeWidth="1.5"/>
              <line x1="50" y1="35" x2="50" y2="50" stroke="#a8866a" strokeWidth="1.5"/>
            </svg>
          </div>
        )}

        {/* Flowers */}
        {visibleItems && Object.values(visibleItems).includes('flowers') && (
          <div
            key={`flowers-${index}`}
            className="absolute w-16 h-24 sm:w-24 sm:h-36"
            style={{
              ...(visibleItems.topLeft === 'flowers' && { top: '6%', left: '3%' }),
              ...(visibleItems.topRight === 'flowers' && { top: '6%', right: '3%' }),
              ...(visibleItems.bottomLeft === 'flowers' && { bottom: '20%', left: '3%' }),
              ...(visibleItems.bottomRight === 'flowers' && { bottom: '20%', right: '3%' }),
              opacity: 0.45,
              animation: mounted ? 'float 6.2s ease-in-out infinite, fadeInStay 0.5s ease-out forwards' : 'none',
              animationDelay: '0.1s',
              '--rotate-start': '-3deg',
              '--rotate-end': '0deg',
              '--target-opacity': 0.45,
            } as React.CSSProperties}
          >
            <svg viewBox="0 0 100 150" className="w-full h-full">
              <path d="M40,100 L35,130 Q35,140 45,140 L55,140 Q65,140 65,130 L60,100 Z"
                    fill="#e8e4f0" className="opacity-70"/>
              <ellipse cx="50" cy="100" rx="10" ry="4" fill="#d8d4e0"/>
              <line x1="45" y1="100" x2="35" y2="40" stroke="#78b078" strokeWidth="3" strokeLinecap="round"/>
              <line x1="50" y1="100" x2="50" y2="35" stroke="#78b078" strokeWidth="3" strokeLinecap="round"/>
              <line x1="55" y1="100" x2="60" y2="45" stroke="#78b078" strokeWidth="3" strokeLinecap="round"/>
              <line x1="48" y1="100" x2="42" y2="50" stroke="#78b078" strokeWidth="2.8" strokeLinecap="round"/>
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
        )}

        {/* Avocado Toast */}
        {visibleItems && Object.values(visibleItems).includes('avocadoToast') && (
          <div
            key={`avocadoToast-${index}`}
            className="absolute w-18 h-18 sm:w-26 sm:h-24"
            style={{
              ...(visibleItems.topLeft === 'avocadoToast' && { top: '6%', left: '3%' }),
              ...(visibleItems.topRight === 'avocadoToast' && { top: '6%', right: '3%' }),
              ...(visibleItems.bottomLeft === 'avocadoToast' && { bottom: '20%', left: '3%' }),
              ...(visibleItems.bottomRight === 'avocadoToast' && { bottom: '20%', right: '3%' }),
              opacity: 0.42,
              animation: mounted ? 'float 6.8s ease-in-out infinite, fadeInStay 0.5s ease-out forwards' : 'none',
              animationDelay: '0.2s',
              '--rotate-start': '-12deg',
              '--rotate-end': '-8deg',
              '--target-opacity': 0.42,
            } as React.CSSProperties}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect x="25" y="35" width="50" height="45" rx="4" fill="#d8b888" stroke="#c8a878" strokeWidth="3"/>
              <rect x="27" y="37" width="46" height="41" rx="3" fill="#e8d498"/>
              <path d="M30,45 Q35,42 40,43 Q50,42 60,44 Q68,43 72,47 Q74,52 70,58 Q65,65 55,67 Q45,68 38,65 Q30,62 28,55 Q27,50 30,45 Z"
                    fill="#a8c888" stroke="#90b070" strokeWidth="3"/>
              <ellipse cx="50" cy="55" rx="12" ry="8" fill="#c8d8a8"/>
              <circle cx="45" cy="52" r="2" fill="#708858"/>
              <circle cx="52" cy="55" r="2" fill="#708858"/>
              <circle cx="48" cy="58" r="2" fill="#708858"/>
            </svg>
          </div>
        )}

        {/* Bagel */}
        {visibleItems && Object.values(visibleItems).includes('bagel') && (
          <div
            key={`bagel-${index}`}
            className="absolute w-16 h-14 sm:w-24 sm:h-20"
            style={{
              ...(visibleItems.topLeft === 'bagel' && { top: '6%', left: '3%' }),
              ...(visibleItems.topRight === 'bagel' && { top: '6%', right: '3%' }),
              ...(visibleItems.bottomLeft === 'bagel' && { bottom: '20%', left: '3%' }),
              ...(visibleItems.bottomRight === 'bagel' && { bottom: '20%', right: '3%' }),
              opacity: 0.42,
              animation: mounted ? 'float 5.8s ease-in-out infinite, fadeInStay 0.5s ease-out forwards' : 'none',
              animationDelay: '0.15s',
              '--rotate-start': '8deg',
              '--rotate-end': '12deg',
              '--target-opacity': 0.42,
            } as React.CSSProperties}
          >
            <svg viewBox="0 0 100 80" className="w-full h-full">
              <ellipse cx="50" cy="40" rx="35" ry="28" fill="#c8a878" stroke="#b09868" strokeWidth="3"/>
              <ellipse cx="50" cy="40" rx="15" ry="12" fill="#fdfcfb" stroke="#e8d8c8" strokeWidth="2"/>
              <circle cx="35" cy="30" r="2.5" fill="#a08858"/>
              <circle cx="42" cy="25" r="2.5" fill="#a08858"/>
              <circle cx="58" cy="27" r="2.5" fill="#a08858"/>
              <circle cx="65" cy="32" r="2.5" fill="#a08858"/>
              <circle cx="38" cy="48" r="2.5" fill="#a08858"/>
              <circle cx="62" cy="50" r="2.5" fill="#a08858"/>
              <ellipse cx="50" cy="40" rx="13" ry="10" fill="#fffcf0"/>
            </svg>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {phase === "quiz" && (
          <>
            <div className="px-4 pt-6 pb-28 sm:pb-32">
              <div className="mb-6">
                <QuizProgress current={index + 1} total={total} />
              </div>
              <div
                key={index}
                className="transition-all duration-500"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                <div className="max-w-xl mx-auto">
                  <QuestionCard
                    question={QUESTIONS[index]}
                    selectedOptionId={selected}
                    onSelectOption={onSelectOption}
                  />
                </div>
              </div>
            </div>
            <StickyNav
              showBack={canGoBack}
              onBack={onBack}
              onNext={() => {
                if (index < total - 1) setIndex(i => i + 1);
                else setPhase("confirm");
              }}
              nextLabel={index < total - 1 ? "Next" : "Review"}
              nextDisabled={!selected}
            />
          </>
        )}

        {phase === "confirm" && (
          <>
            <ConfirmReview
              questions={QUESTIONS}
              answers={answers}
              onJump={onJump}
              onConfirm={onConfirm}
              onBack={onBack}
            />
          </>
        )}
      </div>
    </div>
  );
}
