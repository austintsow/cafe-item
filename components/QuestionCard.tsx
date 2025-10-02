import { Question } from "@/lib/types";
import OptionButton from "./OptionButton";

interface QuestionCardProps {
  question: Question;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
}

export default function QuestionCard({
  question,
  selectedOptionId,
  onSelectOption,
}: QuestionCardProps) {
  return (
    <div className="space-y-6" role="radiogroup" aria-labelledby={`question-${question.id}`}>
      {/* Question prompt */}
      <h2
        id={`question-${question.id}`}
        className="text-xl font-medium text-stone-900 leading-relaxed"
      >
        {question.prompt}
      </h2>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option) => (
          <OptionButton
            key={option.id}
            id={option.id}
            label={option.label}
            selected={selectedOptionId === option.id}
            onClick={() => onSelectOption(option.id)}
          />
        ))}
      </div>
    </div>
  );
}
