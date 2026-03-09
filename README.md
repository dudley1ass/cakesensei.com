# 🎂 CakeSensei

A professional cake recipe builder with real baking science.

## Features

- **10 cake type formulas** — Butter, Foam, Chiffon, Oil, Cheesecake, Mousse, Brownie, Tart, Mochi, and Genoise
- **Ingredient editor** — add, remove, swap, and adjust amounts with metric/imperial/volumetric unit support
- **Cake science metrics** — moisture, tenderness, sweetness, richness, and lightness scores
- **Nutrition facts** — full macro breakdown per serving, FDA-style label
- **Baking instructions** — auto-generated based on cake type, weight, and servings

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Project Structure

```
src/
├── types/
│   ├── cake.ts          # Core types: Ingredient, RecipeIngredient, CakeMetrics
│   └── cakeTypes.ts     # CakeType definitions and the 10 base formulas
├── data/
│   └── ingredients.ts   # Full ingredients database (~100 ingredients)
├── utils/
│   └── cakeCalculations.ts  # Science scoring and metric calculations
├── components/
│   ├── CakeTypeSelector.tsx  # Landing page / cake type picker
│   ├── MetricsDisplay.tsx    # Science scores + ratio charts
│   ├── NutritionFacts.tsx    # FDA-style nutrition label
│   └── BakingInstructions.tsx # Step-by-step baking guide
└── App.tsx              # Main app with ingredient editor
```

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Lucide React icons
"# cakesensei.com" 
