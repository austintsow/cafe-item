// Axes for personality scoring
export type Axis = "energy" | "trendy" | "bitter" | "social" | "chaos";

export type AxisVector = Record<Axis, number>; // clamp 0–10

export type ChoiceDelta = Partial<AxisVector>;

export type Option = {
  id: string;
  label: string;          // editable text
  delta: ChoiceDelta;     // editable axis deltas (±0–3 typical)
  imageUrl?: string;
};

export type Question = {
  id: string;
  prompt: string;         // editable text
  options: Option[];      // 2–3 options ONLY
  imageUrl?: string;
};

export type CafeKey =
  | "matcha_latte" | "iced_milk_coffee" | "hot_black"
  | "americano" | "cappuccino" | "espresso"
  | "iced_water" | "breakfast_sandwich" | "chai"
  | "avocado_toast" | "croissant" | "secret_chair";

export type Result = {
  key: CafeKey;
  title: string;          // no emoji in title
  blurb: string;
  explanation: string;    // 2-3 sentence explanation of why they're this item
  traits: string[];
  colorClass: string;     // Tailwind accent gradient for ResultCard
  imageUrl?: string;      // optional illustration later
  bestPairings: CafeKey[]; // food/drink items that pair well (actual items)
  worstPairings: CafeKey[]; // food/drinks that kill your flow (actual items)
  cafePersona: string;    // archetype (e.g., "Locked In", "The Chatter")
  vibeLevel: number;      // 0-100 percentage
  vibeLabel: string;      // label for vibe (e.g., "Locked In Energy")
  luckyCharm: string;     // quirky charm (e.g., "Charger Plug", "Tote Bag")
  tablemates: CafeKey[];  // café personas you'd want sitting across from you
  neighboringTables: CafeKey[]; // personas you tolerate nearby but don't join
};

// Used on /quiz and /result
export type AnswerMap = Record<string /*questionId*/, string /*optionId*/>;

// Vector "targets" for items (logic-only)
export type ItemProfile = {
  key: CafeKey;
  target: AxisVector;
};
