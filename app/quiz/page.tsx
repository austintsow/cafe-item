"use client";

import { useState } from "react";
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

  return (
    <div className="min-h-dvh">
      {phase === "quiz" && (
        <>
          <div className="px-4 pt-4">
            <QuizProgress current={index + 1} total={total} />
          </div>
          <div className="px-4 py-4 transition-opacity">
            <QuestionCard
              question={QUESTIONS[index]}
              selectedOptionId={selected}
              onSelectOption={onSelectOption}
            />
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
  );
}
