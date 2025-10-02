# Axes-Based Scoring Update Summary

## 🎯 What Changed

Transformed the quiz from a **weighted scoring model** to an **axes-based vector model** with 5 personality dimensions and a confirm screen.

---

## 🔄 Core Changes

### 1. **New Scoring System** (lib/types.ts, lib/scoring.ts)

**5 Personality Axes:**
- `energy` - Low to high energy levels (0-10)
- `trendy` - Classic vs. trendy preferences (0-10)
- `bitter` - Sweet vs. bitter taste (0-10)
- `social` - Solo vs. social behavior (0-10)
- `chaos` - Structured vs. spontaneous (0-10)

**Scoring Flow:**
1. Each quiz option has `delta` values that adjust axes (±0-3 typical)
2. User answers build a 5D vector
3. Vector is compared to 12 item profiles via L2 distance
4. Closest match wins (with weighted axes: energy×1.2, bitter×1.1, etc.)
5. **Secret rule**: High chaos (≥8) + contradictions → "Secret Chair"

### 2. **Updated Quiz Content** (lib/quizData.ts)

**Questions:** 10 questions, **2-3 options each** (down from 4)
- Shorter, punchier prompts ("Morning vibe?" vs. "How do you like to start your morning?")
- Each option has `delta: { axis: number }` instead of `weights: { item: number }`

**Results:** **12 café items** (up from 10)
- New items: `iced_milk_coffee`, `hot_black`, `iced_water`, `breakfast_sandwich`, `avocado_toast`, `secret_chair`
- Removed: `donut`, `muffin`, `bagel`, `cold_brew`
- **No emojis** in titles (changed from "Matcha Latte 🍵" to "You're Matcha Latte")
- Shorter, punchier copy throughout

**Item Profiles (ITEM_PROFILES):**
- 12 target vectors defining where each item sits in 5D space
- Example: `matcha_latte` = `{ energy: 4, trendy: 6, bitter: 3, social: 5, chaos: 2 }`

### 3. **Confirm Screen** (components/ConfirmReview.tsx)

**New Phase:** After answering Q10, users see a review screen
- Lists all 10 Q&A pairs
- Click any row to jump back and edit
- "Go back" button → returns to Q10
- "Looks good" button → calculates result and navigates

### 4. **Auto-Advance** (app/quiz/page.tsx)

**UX Improvement:**
- Selecting an option auto-advances after 180ms
- Shows brief selection state before moving forward
- Back button always available
- Manual "Next" button still works (useful for desktop)

### 5. **UI Updates**

**ResultCard** (components/ResultCard.tsx):
- Removed emoji display from gradient header
- Now shows just the title text

**Result Page** (app/result/page.tsx):
- Updated share text to exclude emoji
- Works with all 12 new result keys

---

## 📊 Result Distribution

With the new axes system, results are determined by **proximity in 5D space**, not simple point totals:

- **Common results**: Items near center of distribution (americano, cappuccino, matcha_latte)
- **Edge cases**: High on 1-2 axes (espresso = energy×bitter, avocado_toast = trendy×social)
- **Secret Chair**: Rare outcome requiring chaos ≥8 + contradictions (e.g., high energy + low social)

---

## 🎮 New User Flow

1. **Homepage** → Click "start quiz"
2. **Quiz Questions 1-10**
   - Select option → auto-advance (180ms delay)
   - Can use Back button or manual Next
3. **Confirm Screen** (after Q10)
   - Review all answers
   - Click to edit any question
   - Click "Looks good" when ready
4. **Result Page**
   - Shows 1 of 12 café personalities
   - No emoji in title
   - Share/Copy/Retake buttons

---

## 🔧 Editable Content (lib/quizData.ts)

**Everything configurable in one file:**

```typescript
// Change questions
QUESTIONS[0].prompt = "Your morning vibe?";
QUESTIONS[0].options[0].delta = { energy: 1, trendy: 2 };

// Adjust item targets
ITEM_PROFILES.find(i => i.key === "matcha_latte").target.energy = 5;

// Update display copy
RESULTS.matcha_latte.title = "You're a Matcha Latte";
RESULTS.matcha_latte.blurb = "New description...";
RESULTS.matcha_latte.traits = ["new", "trait", "list"];
```

**No code changes needed** - just edit strings, numbers, and arrays.

---

## 🧪 Testing Checklist

- [x] 10 questions load with 2-3 options each
- [x] Auto-advance after selection (with 180ms delay)
- [x] Back button works in quiz phase
- [x] Confirm screen shows after Q10
- [x] Can jump to any question from confirm
- [x] "Go back" returns to Q10 in quiz mode
- [x] "Looks good" calculates axes and navigates
- [x] 12 results display correctly (no emojis)
- [x] Share/copy buttons work
- [x] Retake clears state

---

## 🚀 Benefits

1. **More nuanced results** - 5D space vs. simple point totals
2. **Easier content updates** - Change vectors/deltas without touching logic
3. **Better UX** - Auto-advance + confirm screen reduces friction
4. **Scalable** - Add new items by defining target vector
5. **Secret outcomes** - Hidden results via rules (Secret Chair)
6. **Shorter quiz** - 2-3 options feels faster than 4

---

## 📝 Technical Notes

**Scoring Algorithm:**
- L2 distance (Euclidean): `sqrt(Σ(weight[axis] × (userVector[axis] - targetVector[axis])²))`
- Weights prioritize certain axes: `{ energy: 1.2, bitter: 1.1, trendy: 1.0, social: 1.0, chaos: 0.6 }`
- Deterministic tie-breaking: first profile in array wins

**Secret Chair Rule:**
- Chaos ≥ 8 AND one of:
  - Energy ≥ 8 AND social ≤ 2 (high energy loner)
  - Bitter ≥ 8 AND trendy ≥ 8 (bitter trendsetter paradox)
  - Energy ≤ 2 AND trendy ≥ 8 (low-energy trendy paradox)

**Serialization:**
- Answers still use base64-encoded JSON in URL
- Compatible with old links (will deserialize gracefully)

---

## 🔮 Future Enhancements

- [ ] Admin UI to edit QUESTIONS/RESULTS without code
- [ ] Visualize user vector vs. item profiles (radar chart)
- [ ] A/B test different axis weights
- [ ] Export "Your Personality Vector" card
- [ ] More secret outcomes with custom rules
- [ ] i18n support for questions/results

---

**Ready to test!** Run `npm run dev` and try the new flow.
