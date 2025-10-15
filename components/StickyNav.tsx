interface StickyNavProps {
  onBack?: () => void;
  onNext: () => void;
  showBack: boolean;
  nextLabel: string;
  nextDisabled?: boolean;
}

export default function StickyNav({
  onBack,
  onNext,
  showBack,
  nextLabel,
  nextDisabled = false,
}: StickyNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-stone-200 z-50"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex gap-2 sm:gap-3">
        {showBack && (
          <button
            onClick={onBack}
            className="
              px-4 sm:px-6 py-3 rounded-xl min-h-[48px]
              text-sm font-medium text-stone-700
              bg-stone-100 hover:bg-stone-200
              active:scale-95 touch-manipulation
              transition-all duration-150
              focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2
            "
            aria-label="Go back to previous question"
          >
            Back
          </button>
        )}

        <button
          onClick={onNext}
          disabled={nextDisabled}
          className={`
            flex-1 px-4 sm:px-6 py-3 rounded-xl min-h-[48px]
            text-sm font-medium text-white touch-manipulation
            transition-all duration-150
            focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2
            ${
              nextDisabled
                ? "bg-stone-300 cursor-not-allowed"
                : "bg-stone-900 hover:bg-stone-800 active:scale-95"
            }
          `}
          aria-label={nextLabel}
        >
          {nextLabel}
        </button>
      </div>
    </nav>
  );
}
