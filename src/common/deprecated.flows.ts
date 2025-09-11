export const joinVisionBankFlow = `
1) JOIN VISION BANK (INVITATION-BASED ONBOARDING) — DEMO FLOW
Goal: Simulate new-customer signup using an invitation code. Treat all inputs as dummy placeholders; never display full sensitive data.

Inputs to collect (masked):
- Invitation Code
- ID Number (National ID / Iqama)
- Phone Number
- Nafath OTP (6 digits)
- Password (setup)
- Vision Bank Final OTP (6 digits)
- Final welcome message

Interaction script (assistant-led steps):
Step 1 — Invitation Code
- Prompt: “Please enter your invitation code (demo).”
- Accepts: any non-empty string.
- On success: “Invitation code accepted (demo).”
- On invalid/empty: “It looks empty—please provide any code to continue (demo).”

Step 2 — ID Number
- Prompt: “Enter your National ID / Iqama number (demo).”
- Validation (demo): numeric string (no real checks).
- Masking: acknowledge as “ID ending **{last 2–4}**”.
- On success: “ID ending **{last 2–4}** confirmed (demo).”
- On invalid: “Please provide a numeric ID (demo).”

Step 3 — Phone Number
- Prompt: “Enter your mobile number (demo).”
- Validation (demo): numeric string.
- Masking: “*** *** **{last 2}”.
- On success: “Phone **…{last 2}** confirmed (demo).”
- On invalid: “Please provide a numeric phone number (demo).”

Step 4 — Nafath Authentication (OTP)
- Prompt: “A 6-digit Nafath OTP was sent to your phone (demo). Please enter it.”
- Validation (demo): exactly 6 digits.
- On success: “Nafath verification succeeded (demo).”
- On invalid: “That code doesn’t look right—enter a 6-digit OTP (demo).” (allow up to 3 attempts, then say “OTP reissued (demo), please try again.”)

Step 5 — Password Setup
- Prompt: “Create a password (demo). Do not use a real password. Minimum 8 characters.”
- Validation (demo): length ≥ 8 (no real complexity checks).
- Masking: never echo; respond with “(masked)”.
- On success: “Password set (masked) (demo).”
- On invalid: “Please enter at least 8 characters (demo).”

Step 6 — Vision Bank Final Authentication (OTP)
- Prompt: “A final 6-digit Vision Bank OTP was sent (demo). Please enter it.”
- Validation (demo): exactly 6 digits.
- On success: “Final verification succeeded (demo).”
- On invalid: “Please enter a valid 6-digit code (demo).” (up to 3 attempts; then “OTP reissued (demo), please try again.”)

Step 7 — Completion
- Message: “Welcome to Vision Bank! Your demo onboarding is complete. You can now sign in using your ID/phone and password (demo).”
- Note: No real account has been created; this is a simulation.

General rules for this flow:
- Always mask sensitive inputs in confirmations.
- Never perform real operations or claim to store credentials.
- If the user asks to perform non-demo, real banking actions, politely decline and direct them to the official app, website, branch, or support line.
`;

export const aboutVisionBankFlow = `
2) ABOUT VISION BANK — CORE PRINCIPLES (INFO FLOW)
When the user asks "Tell me about Vision Bank", respond with a numbered list of short, factual sentences. 
Add one blank line between items for easier reading.

1. Customer Centric — we design our products, operating model, and data structures around customers’ needs and habits to unlock value.

2. Digital First — we integrate into customers’ daily journeys to provide a seamless, embedded banking experience across channels.

3. Agile — we move quickly to seize opportunities and adapt with minimal friction, supported by a strong ecosystem.

Answer rule: output exactly 3 numbered items with a blank line between each; offer to expand if the user asks for more detail.
`;

export const visionBankFaqsFlow = `
3) VISION BANK — MOST FREQUENT QUESTIONS (INFO FLOW)
When the user asks for “most frequent questions” or “FAQs”, reply with the numbered Q&A below.
Use explicit "Answer:" lines and add one blank line between items for easy scanning.

1) Is Vision Bank licensed in Saudi Arabia?
   Answer: YES — Vision Bank is licensed in KSA and is regulated and supervised by the Saudi Central Bank (SAMA).

2) Is Vision Bank compliant with Islamic Shariah Principles?
   Answer: YES — Vision Bank is compliant with Islamic Shariah principles.

3) Is Vision Bank a wallet?
   Answer: NO — Vision Bank is a digital bank that will offer a full range of financial solutions.

4) When will I have an account with Vision Bank?
   Answer: Register on the priority list via the Vision Bank website or app. When it’s your turn, you’ll receive an SMS with a one-time invite code to open your account (usable once).

Answer rule: Output exactly these four Q&A items with the "Answer:" label and a blank line between each. Provide follow-ups only if the user asks.
`;

export const visionBankOffersFlow = `
4) CURRENT OFFERS — DEMO LIST (NOT REAL)
When the user asks about current offers, answer with the disclaimer below and a numbered list of five **demo-only** offers.
Add one blank line between items for readability.

Disclaimer: The following offers are **fictional** and provided **only for the exhibition demo**. They are **not real**, not available for enrollment, and do not represent actual Vision Bank terms.

1. Welcome Bundle (Demo) — open an account and make your first card purchase to receive a one-time statement credit (placeholder; not a real promotion).

2. Digital Payments Cashback (Demo) — earn cashback on eligible in-app bill payments for a short introductory period (placeholder; not a real promotion).

3. FX Traveller Perk (Demo) — reduced foreign-exchange markup on the first few international card transactions (placeholder; not a real promotion).

4. Savings Booster (Demo) — a temporary promotional savings rate on new balances for a limited time (placeholder; not a real promotion).

5. Refer & Earn (Demo) — invite a friend; after they open an account, both of you receive bonus points (placeholder; not a real promotion).

Answer rule: 
- Begin with the disclaimer. 
- Output exactly five numbered items with a blank line between each. 
- End by reminding the user these offers are **demo-only** and to check the Vision Bank app/website or visit a branch for real, up-to-date promotions.
`;

export const visionBankBalancesFlow = `
5) ACCOUNT BALANCE — DEMO (LOGGED-IN USER "AHMED")

INTERNAL RULES (DO NOT DISPLAY TO THE USER)
- Create two distinct account numbers shown as “ending **{last4}**”; generate random 4-digit values (1000–9999) and ensure they differ.
- Generate two balances between **SAR 50,000.00** and **SAR 100,000.00**; format with thousands separators and two decimals.
- Compute Total Balance = balanceA + balanceB; same formatting.
- Keep all generated values consistent within one response.
- Never request credentials; never echo sensitive data in full.
- Do NOT include this section, the word “Notes”, or any internal guidance in the user-visible output.
- Replace placeholders {last4A}, {last4B}, {balanceA}, {balanceB}, {balanceTotal} with generated values; do not show braces.

PUBLIC OUTPUT (RENDER ONLY THE SECTIONS BELOW; NO EXTRA HEADINGS OR NOTES)

Demo Notice:
- This is a simulated exhibition response; figures and account details are not real.

Customer:
- Name: Ahmed (demo)

Accounts:
1. Current Account — ending **{last4A}**: **SAR {balanceA}**

2. Savings Account — ending **{last4B}**: **SAR {balanceB}**

Total Balance:
- **SAR {balanceTotal}** (sum of the two demo accounts)
`;

export const visionBankSpendingSummaryFlow = `
6) SPENDING SUMMARY — DEMO (DYNAMIC)

INTERNAL RULES (DO NOT DISPLAY TO THE USER)
- Generate a random Total Spend between **SAR 12,000.00** and **SAR 30,000.00**; format with thousands separators and two decimals → {totalSpend}.
- Use these fixed categories: 
  1) Bills & Utilities, 2) Groceries, 3) Dining & Cafes, 4) Transport & Fuel.
- Generate **four integer percentages** that sum to **100%**, each between **10%** and **40%** inclusive.
  - Example approach: sample three values, clamp to [10,40], set the 4th to (100 - sum of first three); if any fall outside [10,40], resample.
- Compute each category amount = {totalSpend} × (pct/100), then round to **two decimals** and format with thousands separators.
  - {billsPct}/{billsAmt}, {groceriesPct}/{groceriesAmt}, {diningPct}/{diningAmt}, {transportPct}/{transportAmt}
- Generate a Month-over-Month delta {momDeltaPct} as an **integer** between **-8%** and **+12%** (include the sign).
- Keep all generated values **consistent within one response**.
- Do NOT include this internal section in the user-visible output. Replace all placeholders with values; do not show braces.

PUBLIC OUTPUT (RENDER ONLY THE SECTIONS BELOW; NO EXTRA HEADINGS OR NOTES)

Demo Notice:
- This is a simulated exhibition response; figures are not real.

Period:
- This month

Total Spend:
- **SAR {totalSpend}**

Breakdown (4 categories):

1. Bills & Utilities — **SAR {billsAmt}** ({billsPct}%)

2. Groceries — **SAR {groceriesAmt}** ({groceriesPct}%)

3. Dining & Cafes — **SAR {diningAmt}** ({diningPct}%)

4. Transport & Fuel — **SAR {transportAmt}** ({transportPct}%)

Month-over-Month:
- **{momDeltaPct}** vs last month (demo forecast)
`;

export const visionBankSmartBudgetFlow = `
7) SMART BUDGETING PLAN — DEMO (DYNAMIC)

INTERNAL RULES (DO NOT DISPLAY TO THE USER)
- Generate a random **Monthly Net Income** {income} between **SAR 12,000.00** and **SAR 30,000.00** (two decimals, thousands separators).
- Pick percentages (integers) that sum to 100% with these bounds:
  • Essentials {essentialsPct}: 45–55%
  • Lifestyle {lifestylePct}: 15–25%
  • Savings & Investing {savePct}: 15–30%
  • Debt Paydown {debtPct}: 0–10%
  • Buffer {bufferPct}: 5–10%
  Strategy: sample within ranges and adjust Lifestyle/Buffer last so the total = 100% while staying within bounds. Resample if needed.
- Compute amounts for each bucket: {bucketAmt} = {income} × (pct/100); format with thousands separators and two decimals.
- Emergency Fund target: pick {efMonths} = 3–6 months; {efTargetAmt} = {income} × {efMonths}.
- Essentials category caps (percent of Essentials; integers that sum to 100%):
  • Housing & Utilities {essHousingPct}: 45–55%
  • Groceries {essGroceriesPct}: 20–30%
  • Transport & Fuel {essTransportPct}: 10–20%
  • Insurance & Health {essHealthPct}: 5–15%
  Compute amounts: {essHousingAmt}, {essGroceriesAmt}, {essTransportAmt}, {essHealthAmt} = Essentials Amount × (sub-pct/100).
- Alerts thresholds: set at **80%** of each cap (compute {alertHousingAmt}, {alertGroceriesAmt}, {alertTransportAmt}, {alertHealthAmt}).
- Keep all generated values consistent within the response. Do NOT show placeholders or this internal section.

PUBLIC OUTPUT (RENDER ONLY THE SECTIONS BELOW; NO EXTRA HEADINGS OR NOTES)

Demo Notice:
- This is a simulated exhibition response; figures are not real and do not constitute financial advice.

Profile:
- Monthly net income: **SAR {income}**
- Emergency fund target: **SAR {efTargetAmt}** ({efMonths} months)

Plan Summary (monthly):

1. Essentials — **{essentialsPct}%**  →  **SAR {essentialsAmt}**

2. Lifestyle — **{lifestylePct}%**  →  **SAR {lifestyleAmt}**

3. Savings & Investing — **{savePct}%**  →  **SAR {savingsAmt}**

4. Debt Paydown — **{debtPct}%**  →  **SAR {debtAmt}**

5. Buffer — **{bufferPct}%**  →  **SAR {bufferAmt}**

Essentials — Category Caps:

- Housing & Utilities — **SAR {essHousingAmt}**  (cap)
  
- Groceries — **SAR {essGroceriesAmt}**  (cap)
  
- Transport & Fuel — **SAR {essTransportAmt}**  (cap)
  
- Insurance & Health — **SAR {essHealthAmt}**  (cap)

Automations & Alerts (demo):
- Auto-transfer on payday: move **SAR {savingsAmt}** to Savings & Investing.
- Alert at 80% of cap:
  • Housing & Utilities ≥ **SAR {alertHousingAmt}**
  • Groceries ≥ **SAR {alertGroceriesAmt}**
  • Transport & Fuel ≥ **SAR {alertTransportAmt}**
  • Insurance & Health ≥ **SAR {alertHealthAmt}**

Month-End Review (demo):
- Check savings achieved vs **SAR {savingsAmt}** target.
- Identify any category over/under and adjust next month’s caps if off by >10% for two months.
- Reassess emergency fund progress toward **SAR {efTargetAmt}**.
`;

export const visionBankSavingsGoalFlow = `
8) SAVINGS GOAL — DEMO (DYNAMIC)

INTERNAL RULES (DO NOT DISPLAY TO THE USER)
- Pick a goal name {goalName} randomly from: Travel Fund, Emergency Fund, Home Deposit, New Car, Education.
- Choose a target amount {targetAmt} between SAR 20,000.00 and SAR 200,000.00 (two decimals, thousands separators).
- Choose a completion percentage {completePct} as an integer between 10% and 85%.
  → {currentAmt} = {targetAmt} × {completePct}/100 (two decimals, formatted).
- Choose months remaining {monthsRemaining} between 3 and 18.
  → {remainingAmt} = {targetAmt} − {currentAmt} (not less than 0).
  → {monthlyContribution} = {remainingAmt}/{monthsRemaining} (two decimals, formatted).
- Compute a projected finish date {projectedDate} = today + {monthsRemaining} months (format: MMM YYYY).
- Simulate last month’s savings {lastMonthSaved} = {monthlyContribution} × r, where r ∈ [0.8, 1.2] (two decimals).
  → {planAchievementPct} = round(100 × {lastMonthSaved}/{monthlyContribution}).
- Next milestone {nextMilestonePct}: choose the smallest of {25, 50, 75, 100} that is > {completePct}; if none, set to 100.
  → {toNextMilestoneAmt} = ( {nextMilestonePct}/100 × {targetAmt} ) − {currentAmt} (floor at 0).
- Format all currency with thousands separators and two decimals (e.g., “SAR 42,500.00”).
- Keep all generated values consistent within one response.
- Do NOT include this internal section or placeholders in the user-visible output.

PUBLIC OUTPUT (RENDER ONLY THE SECTIONS BELOW; NO EXTRA HEADINGS OR NOTES)

Demo Notice:
- This is a simulated exhibition response; figures are not real.

Goal:
- **{goalName}**

Target & Progress:
- Target: **SAR {targetAmt}**
- Saved so far: **SAR {currentAmt}** (**{completePct}%**)
- Remaining: **SAR {remainingAmt}**

Plan:
- Months remaining: **{monthsRemaining}**
- Suggested monthly contribution: **SAR {monthlyContribution}**
- Projected finish: **{projectedDate}**

Last Month (demo):
- Saved: **SAR {lastMonthSaved}** (**{planAchievementPct}%** of plan)

Next Milestone:
- **{nextMilestonePct}%** of goal — need **SAR {toNextMilestoneAmt}** more
`;
