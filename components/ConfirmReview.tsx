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

export default function ConfirmReview({ questions, answers, onJump, onConfirm, onBack }: Props) {
  return (
    <div className="mx-auto max-w-md px-4 pb-24">
      <h2 className="text-xl font-semibold mb-3">Review your answers</h2>
      <ul className="divide-y divide-stone-200 rounded-2xl border border-stone-200 overflow-hidden mb-4">
        {questions.map((q, i) => {
          const opt = q.options.find(o => o.id === answers[q.id]);
          return (
            <li key={q.id}>
              <button
                className="w-full text-left px-4 py-3 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-300"
                onClick={() => onJump(i)}
              >
                <div className="text-sm text-stone-500">Q{i + 1}</div>
                <div className="font-medium">{q.prompt}</div>
                <div className="text-sm text-stone-700 mt-1">{opt?.label ?? "—"}</div>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 h-12 rounded-xl border border-stone-300">Go back</button>
        <button onClick={onConfirm} className="flex-1 h-12 rounded-xl bg-stone-900 text-white">Looks good</button>
      </div>
    </div>
  );
}
