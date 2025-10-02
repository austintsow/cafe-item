interface OptionButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  id: string;
}

export default function OptionButton({
  label,
  selected,
  onClick,
  id,
}: OptionButtonProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      role="radio"
      aria-checked={selected}
      className={`
        w-full min-h-[56px] py-3 px-5 rounded-2xl
        text-left text-sm font-medium
        transition-all duration-150
        border-2
        ${
          selected
            ? "bg-stone-900 text-white border-stone-900 scale-[0.98]"
            : "bg-white text-stone-700 border-stone-200 hover:border-stone-400 active:scale-[0.98]"
        }
        focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2
      `}
    >
      {label}
    </button>
  );
}
