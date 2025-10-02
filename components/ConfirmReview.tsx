// components/ConfirmReview.tsx
"use client";
import { AnswerMap, Question } from "@/lib/types";

type Props = {
  questions: Question[];
  answers: AnswerMap;
  onJump: (index: number) => void;
  onConfirm: () => void;
  onBack: () => void;
};

// Short labels for compact display
const SHORT_LABELS: Record<string, string> = {
  "q1": "First move",
  "q2": "Where sit?",
  "q3": "Your name",
  "q4": "Slow WiFi",
  "q5": "Playlist vibe",
  "q6": "Pastry pick",
  "q7": "Share table?",
  "q8": "Wrong drink",
  "q9": "Closing time",
  "q10": "What lingers?",
};

export default function ConfirmReview({ questions, answers, onJump, onConfirm, onBack }: Props) {
  // Split questions into two columns
  const leftColumn = questions.slice(0, 5);
  const rightColumn = questions.slice(5, 10);

  const renderQuestion = (q: Question, i: number) => {
    const opt = q.options.find(o => o.id === answers[q.id]);
    const shortLabel = SHORT_LABELS[q.id] || "Question";
    
    return (
      <button
        key={q.id}
        onClick={() => onJump(i)}
        className="w-full text-left p-2 rounded-lg hover:bg-stone-50 transition-colors"
      >
        <div className="flex items-start gap-1.5">
          <span className="text-[10px] font-bold text-emerald-600 flex-shrink-0 mt-0.5">Q{i + 1}</span>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] text-stone-500 mb-0.5">{shortLabel}</div>
            <div className="text-xs font-bold text-stone-900 leading-tight line-clamp-2">{opt?.label ?? "—"}</div>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#fdfcfb] py-6">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 text-center mb-0.5">Review Your Answers</h2>
          <p className="text-xs sm:text-sm text-stone-500 text-center">Tap any answer to change it</p>
        </div>

        {/* Mobile: Single column, Desktop: Two columns */}
        <div className="mb-4">
          {/* Mobile single column (shows all questions in one list) */}
          <div className="block sm:hidden">
            <div className="space-y-1.5 bg-white rounded-xl border border-stone-200 p-2.5">
              {questions.map((q, i) => renderQuestion(q, i))}
            </div>
          </div>

          {/* Desktop two-column grid */}
          <div className="hidden sm:grid grid-cols-2 gap-3">
            {/* Left column: Q1-Q5 */}
            <div className="space-y-1.5 bg-white rounded-xl border border-stone-200 p-2.5">
              {leftColumn.map((q, i) => renderQuestion(q, i))}
            </div>
            
            {/* Right column: Q6-Q10 */}
            <div className="space-y-1.5 bg-white rounded-xl border border-stone-200 p-2.5">
              {rightColumn.map((q, i) => renderQuestion(q, i + 5))}
            </div>
          </div>
        </div>

        {/* Buttons below content (not fixed) */}
        <div className="max-w-md mx-auto flex gap-2.5">
          <button 
            onClick={onBack} 
            className="flex-1 h-11 rounded-xl border-2 border-stone-300 font-medium text-stone-700 text-sm hover:bg-stone-50 active:scale-95 transition-all"
          >
            Go Back
          </button>
          <button 
            onClick={onConfirm} 
            className="flex-1 h-11 rounded-xl bg-stone-900 text-white font-medium text-sm hover:bg-stone-800 active:scale-95 transition-all"
          >
            Looks Good
          </button>
        </div>
      </div>
    </div>
  );
}
