"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RESULTS } from "@/lib/quizData";
import { CafeKey } from "@/lib/types";
import ResultCard from "@/components/ResultCard";
import ShareButtons from "@/components/ShareButtons";
import html2canvas from "html2canvas";

type Theme = 'default' | 'cafe' | 'lofi' | 'greenery';

const THEMES = {
  default: {
    background: 'from-white to-gray-50',
    accent: 'from-gray-400 to-gray-600',
  },
  cafe: {
    background: 'from-amber-50 to-orange-100',
    accent: 'from-amber-500 to-orange-600',
  },
  lofi: {
    background: 'from-purple-50 to-pink-100',
    accent: 'from-purple-500 to-pink-600',
  },
  greenery: {
    background: 'from-emerald-50 to-teal-100',
    accent: 'from-emerald-500 to-teal-600',
  },
};

function ResultPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>('default');
  const cardRef = useRef<HTMLDivElement>(null);

  // Get result key from query params
  const resultKey = (searchParams.get("k") as CafeKey) || "matcha_latte";
  const result = RESULTS[resultKey] || RESULTS.matcha_latte;

  useEffect(() => {
    setMounted(true);
    // Update page title dynamically (client-side only)
    document.title = `your café persona | matchame.cafe`;
  }, [result.title]);

  const handleRetake = () => {
    router.push("/quiz");
    // Analytics placeholder
    // trackEvent('retake_quiz');
  };

  // Generate share URL
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = result.title;
  const shareText = `I took the café personality quiz and ${result.title}! What café item are you?`;

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    
    try {
      // Wait for fonts to be fully loaded
      await document.fonts.ready;
      
      // Small delay to ensure rendering is complete
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#fdfcfb',
        scale: 3, // Higher resolution
        logging: false,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: false,
        imageTimeout: 0,
        removeContainer: true,
      });
      
      // Create a new canvas with rounded corners
      const roundedCanvas = document.createElement('canvas');
      const ctx = roundedCanvas.getContext('2d');
      if (!ctx) return;
      
      roundedCanvas.width = canvas.width;
      roundedCanvas.height = canvas.height;
      
      const borderRadius = 24 * 3; // 1.5rem * scale factor (matches rounded-3xl)
      
      // Draw rounded rectangle
      ctx.beginPath();
      ctx.moveTo(borderRadius, 0);
      ctx.lineTo(canvas.width - borderRadius, 0);
      ctx.quadraticCurveTo(canvas.width, 0, canvas.width, borderRadius);
      ctx.lineTo(canvas.width, canvas.height - borderRadius);
      ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - borderRadius, canvas.height);
      ctx.lineTo(borderRadius, canvas.height);
      ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - borderRadius);
      ctx.lineTo(0, borderRadius);
      ctx.quadraticCurveTo(0, 0, borderRadius, 0);
      ctx.closePath();
      ctx.clip();
      
      // Draw the original canvas onto the rounded canvas
      ctx.drawImage(canvas, 0, 0);
      
      const image = roundedCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${result.key}-cafe-card.png`;
      link.href = image;
      link.click();
    } catch (err) {
      console.error('Failed to download card:', err);
    }
  };

  return (
    <main className="min-h-screen bg-[#fdfcfb] py-4 sm:py-6 px-4 sm:px-6">
      <div className="max-w-md mx-auto space-y-4 sm:space-y-6">
        {/* Result Card with fade-in animation */}
        <div ref={cardRef} className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <ResultCard result={result} theme={THEMES[theme]} />
        </div>

        {/* Theme Switcher */}
        <div className="flex justify-center gap-3 py-2">
          <button
            onClick={() => setTheme('default')}
            className={`w-4 h-4 rounded-full transition-all ${
              theme === 'default' 
                ? 'bg-gradient-to-br from-gray-400 to-gray-600 scale-110' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            aria-label="Default theme"
          />
          <button
            onClick={() => setTheme('cafe')}
            className={`w-4 h-4 rounded-full transition-all ${
              theme === 'cafe' 
                ? 'bg-gradient-to-br from-amber-500 to-orange-600 scale-110' 
                : 'bg-amber-200 hover:bg-amber-300'
            }`}
            aria-label="Cafe theme"
          />
          <button
            onClick={() => setTheme('lofi')}
            className={`w-4 h-4 rounded-full transition-all ${
              theme === 'lofi' 
                ? 'bg-gradient-to-br from-purple-500 to-pink-600 scale-110' 
                : 'bg-purple-200 hover:bg-purple-300'
            }`}
            aria-label="Lofi theme"
          />
          <button
            onClick={() => setTheme('greenery')}
            className={`w-4 h-4 rounded-full transition-all ${
              theme === 'greenery' 
                ? 'bg-gradient-to-br from-emerald-500 to-teal-600 scale-110' 
                : 'bg-emerald-200 hover:bg-emerald-300'
            }`}
            aria-label="Greenery theme"
          />
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <ShareButtons 
            title={shareTitle} 
            text={shareText} 
            url={shareUrl} 
            onDownloadCard={handleDownloadCard}
          />

          <button
            onClick={handleRetake}
            className="
              w-full px-6 py-3 rounded-xl min-h-[48px]
              text-sm font-medium text-stone-700
              bg-stone-100 hover:bg-stone-200
              active:scale-95 touch-manipulation
              transition-all duration-150
              focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2
            "
          >
            Retake Quiz
          </button>
        </div>

        {/* Footer note */}
        <p className="text-xs text-stone-400 text-center leading-relaxed">
          Results are based on your personality preferences.<br />
          Curated by{" "}
          <a 
            href="https://www.linkedin.com/in/tsow/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-stone-600 transition-colors"
          >
            Austin
          </a>
          {" "}and{" "}
          <a 
            href="https://www.linkedin.com/in/davidaoyama/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-stone-600 transition-colors"
          >
            David
          </a>
          {" "}(chai latte and americano) ☕
        </p>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#fdfcfb] flex items-center justify-center">
        <div className="text-stone-500">Loading your result...</div>
      </main>
    }>
      <ResultPageContent />
    </Suspense>
  );
}
