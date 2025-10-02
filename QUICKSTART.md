# 🚀 Quick Start Guide

## Run the App

```bash
# Start development server
npm run dev
```

Then open: **http://localhost:3000**

## Test Flow

1. **Homepage** → Click "start quiz"
2. **Quiz** → Answer all 10 questions
3. **Result** → See your café personality
4. **Share** → Test share/copy buttons
5. **Retake** → Start over

## Key Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production  
npm run start    # Run production build
npm run lint     # Check for issues
```

## What to Test

### ✅ Navigation
- Landing page → Quiz page link works
- Quiz progress bar updates (1/10 → 10/10)
- Back button navigates correctly
- Next button only enabled when answer selected

### ✅ Quiz Functionality  
- All 10 questions load
- Option selection works
- Selected state highlights correctly
- "See Result" appears on Q10

### ✅ Result Page
- Correct café item displays
- Traits show properly
- Share button works (native on mobile)
- Copy link button works
- Retake returns to quiz

### ✅ Responsive Design
- Mobile view (375px+)
- Tablet view (768px+)
- Desktop view (1024px+)

### ✅ Accessibility
- Tab navigation works
- Enter key selects options
- Focus states visible
- Screen reader friendly

## File Structure

```
📁 app/
  ├── page.tsx              # Landing page
  ├── quiz/page.tsx         # Quiz flow
  └── result/page.tsx       # Result display

📁 components/
  ├── QuizProgress.tsx      # Progress bar
  ├── QuestionCard.tsx      # Question UI
  ├── OptionButton.tsx      # Answer buttons
  ├── StickyNav.tsx         # Bottom nav
  ├── ResultCard.tsx        # Result display
  └── ShareButtons.tsx      # Share functionality

📁 lib/
  ├── types.ts              # TypeScript types
  ├── quizData.ts           # Questions + results
  └── scoring.ts            # Quiz logic
```

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript** (Strict mode)
- **Tailwind CSS** (Mobile-first)
- **React 18** (Client components)

## Expected Results (10 Café Items)

1. 🍵 Matcha Latte - Zen & balanced
2. ☕ Americano - Reliable & efficient  
3. ☕ Cappuccino - Social & warm
4. ☕ Espresso - Intense & focused
5. 🧋 Cold Brew - Cool & adaptable
6. 🫖 Chai Latte - Warm & complex
7. 🥐 Croissant - Refined & elegant
8. 🍩 Donut - Fun & joyful
9. 🧁 Muffin - Comforting & wholesome
10. 🥯 Bagel - Solid & versatile

---

**Ready to test!** Open your browser and try it out! ☕✨
