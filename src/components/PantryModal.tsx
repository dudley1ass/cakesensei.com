import { useState, useMemo, useCallback } from 'react';
import { Search, X, ChefHat, ShoppingCart, CheckCircle, ChevronRight } from 'lucide-react';
import { ingredientsDatabase } from '../data/ingredients';
import { cakeTypes, CakeType, CakeRecipe } from '../types/cakeTypes';

// ─── Category config (mirrors App.tsx) ───────────────────────
const CAT_CONFIG: Record<string, { emoji: string; label: string }> = {
  flour:     { emoji: '🌾', label: 'Flours' },
  sugar:     { emoji: '🍬', label: 'Sugars' },
  fat:       { emoji: '🧈', label: 'Fats' },
  liquid:    { emoji: '💧', label: 'Liquids' },
  egg:       { emoji: '🥚', label: 'Eggs' },
  leavening: { emoji: '⬆️', label: 'Leavening' },
  dairy:     { emoji: '🥛', label: 'Dairy' },
  flavoring: { emoji: '🌿', label: 'Flavorings' },
  chocolate: { emoji: '🍫', label: 'Chocolate' },
  fruit:     { emoji: '🍓', label: 'Fruits' },
  nuts:      { emoji: '🥜', label: 'Nuts & Seeds' },
  spice:     { emoji: '✨', label: 'Spices' },
  filling:   { emoji: '🍯', label: 'Fillings' },
  other:     { emoji: '➕', label: 'Other' },
};
const CAT_ORDER = Object.keys(CAT_CONFIG);

// ─── Quick-select pantry presets ─────────────────────────────
const PANTRY_PRESETS: { label: string; emoji: string; ingredients: string[] }[] = [
  {
    label: 'Basic Pantry',
    emoji: '🏠',
    ingredients: [
      'All-Purpose Flour', 'Granulated Sugar', 'Unsalted Butter',
      'Whole Egg (large)', 'Whole Milk', 'Vanilla Extract',
      'Salt', 'Baking Powder', 'Baking Soda',
    ],
  },
  {
    label: 'Chocolate Lover',
    emoji: '🍫',
    ingredients: [
      'All-Purpose Flour', 'Granulated Sugar', 'Unsalted Butter',
      'Whole Egg (large)', 'Whole Milk', 'Vanilla Extract',
      'Salt', 'Baking Powder', 'Baking Soda',
      'Cocoa Powder (Natural)', 'Dutch Cocoa Powder', 'Dark Chocolate Bar',
    ],
  },
  {
    label: 'Vegan Kitchen',
    emoji: '🌱',
    ingredients: [
      'All-Purpose Flour', 'Granulated Sugar', 'Vegan Butter',
      'Oat Milk', 'Coconut Oil', 'Vanilla Extract',
      'Salt', 'Baking Powder', 'Baking Soda', 'Apple Cider Vinegar',
    ],
  },
  {
    label: 'Gluten-Free Basics',
    emoji: '🌾',
    ingredients: [
      'Almond Flour', 'Rice Flour', 'Granulated Sugar',
      'Unsalted Butter', 'Whole Egg (large)', 'Whole Milk',
      'Vanilla Extract', 'Salt', 'Baking Powder', 'Xanthan Gum',
    ],
  },
];

// ─── Creative substitution map ────────────────────────────────
// Maps an ingredient name → list of names that can substitute for it
// If ANY of the substitutes are in the pantry, the ingredient is "covered"
const SUBSTITUTES: Record<string, string[]> = {
  // Butter family
  'Unsalted Butter':        ['Salted Butter', 'Vegan Butter', 'Brown Butter', 'Shortening'],
  'Salted Butter':          ['Unsalted Butter', 'Vegan Butter'],
  'Brown Butter':           ['Unsalted Butter', 'Salted Butter'],
  'Vegan Butter':           ['Unsalted Butter', 'Salted Butter', 'Coconut Oil'],
  'Shortening':             ['Unsalted Butter', 'Vegan Butter', 'Coconut Oil'],
  'Coconut Oil':            ['Vegetable Oil', 'Unsalted Butter'],
  'Vegetable Oil':          ['Coconut Oil', 'Canola Oil', 'Avocado Oil'],
  'Olive Oil':              ['Vegetable Oil', 'Avocado Oil'],
  'Avocado Oil':            ['Vegetable Oil', 'Olive Oil'],

  // Flour family
  'All-Purpose Flour':      ['Cake Flour', 'Bread Flour'],
  'Cake Flour':             ['All-Purpose Flour'],
  'Bread Flour':            ['All-Purpose Flour'],
  'Whole Wheat Flour':      ['All-Purpose Flour'],
  'Oat Flour':              ['All-Purpose Flour'],

  // Eggs
  'Whole Egg (large)':      ['Egg Yolk', 'Egg White'],
  'Egg Yolk':               ['Whole Egg (large)'],
  'Egg White':              ['Whole Egg (large)'],

  // Milks — dairy
  'Whole Milk':             ['2% Milk', 'Skim Milk', 'Half and Half', 'Oat Milk', 'Soy Milk', 'Almond Milk'],
  '2% Milk':                ['Whole Milk', 'Skim Milk', 'Oat Milk'],
  'Skim Milk':              ['Whole Milk', '2% Milk', 'Oat Milk'],
  'Half and Half':          ['Whole Milk', 'Heavy Cream'],
  'Heavy Cream':            ['Whipping Cream', 'Half and Half'],
  'Whipping Cream':         ['Heavy Cream'],

  // Buttermilk — the classic creative sub
  'Buttermilk':             ['Whole Milk', '2% Milk', 'Oat Milk', 'Soy Milk'],
  // Note: milk + lemon juice = buttermilk, handled in logic below

  // Plant milks
  'Oat Milk':               ['Whole Milk', 'Soy Milk', 'Almond Milk', 'Cashew Milk'],
  'Soy Milk':               ['Oat Milk', 'Whole Milk', 'Almond Milk'],
  'Almond Milk':            ['Oat Milk', 'Soy Milk', 'Cashew Milk'],
  'Cashew Milk':            ['Almond Milk', 'Oat Milk'],
  'Coconut Milk (canned)':  ['Heavy Cream', 'Coconut Milk (carton)'],
  'Coconut Milk (carton)':  ['Oat Milk', 'Almond Milk', 'Coconut Milk (canned)'],

  // Cream cheese
  'Cream Cheese':           ['Mascarpone', 'Ricotta'],

  // Sugars
  'Granulated Sugar':       ['Caster Sugar', 'Raw Turbinado Sugar', 'Coconut Sugar'],
  'Brown Sugar (Light)':    ['Brown Sugar (Dark)', 'Granulated Sugar', 'Coconut Sugar'],
  'Brown Sugar (Dark)':     ['Brown Sugar (Light)', 'Granulated Sugar'],
  'Powdered Sugar':         ['Granulated Sugar'],  // can blitz in blender
  'Raw Turbinado Sugar':    ['Granulated Sugar', 'Brown Sugar (Light)'],
  'Coconut Sugar':          ['Brown Sugar (Light)', 'Granulated Sugar'],

  // Leavening
  'Baking Powder':          ['Baking Soda'],  // rough sub — partial
  'Baking Soda':            ['Baking Powder'],
  'Cream of Tartar':        ['Lemon Juice', 'White Wine Vinegar'],

  // Vanilla
  'Vanilla Extract':        ['Vanilla Bean Paste'],
  'Vanilla Bean Paste':     ['Vanilla Extract'],

  // Extracts
  'Lemon Extract':          ['Vanilla Extract'],
  'Almond Extract':         ['Vanilla Extract'],

  // Acids / buttermilk helpers
  'Lemon Juice':            ['Lime Juice', 'Apple Cider Vinegar', 'White Wine Vinegar'],
  'Lime Juice':             ['Lemon Juice'],

  // Chocolate
  'Dark Chocolate Bar':     ['Semi-Sweet Chocolate Chips', 'Cocoa Powder (Natural)', 'Dutch Cocoa Powder'],
  'Semi-Sweet Chocolate Chips': ['Dark Chocolate Bar', 'Milk Chocolate Chips'],
  'Milk Chocolate Chips':   ['Semi-Sweet Chocolate Chips'],
  'Cocoa Powder (Natural)': ['Dutch Cocoa Powder'],
  'Dutch Cocoa Powder':     ['Cocoa Powder (Natural)'],

  // Cream cheese frosting
  'Mascarpone':             ['Cream Cheese'],

  // Sour cream / yogurt
  'Sour Cream':             ['Full-Fat Greek Yogurt', 'Buttermilk'],
  'Full-Fat Greek Yogurt':  ['Sour Cream', 'Buttermilk'],
};

// Creative combos: if user has BOTH of these, the target ingredient is covered
const COMBO_SUBS: { needs: string[]; covers: string }[] = [
  { needs: ['Whole Milk', 'Lemon Juice'],        covers: 'Buttermilk' },
  { needs: ['Whole Milk', 'Lime Juice'],         covers: 'Buttermilk' },
  { needs: ['Oat Milk',   'Lemon Juice'],        covers: 'Buttermilk' },
  { needs: ['Soy Milk',   'Lemon Juice'],        covers: 'Buttermilk' },
  { needs: ['Unsalted Butter', 'Salt'],          covers: 'Salted Butter' },
  { needs: ['Granulated Sugar', 'Whole Milk'],   covers: 'Sweetened Condensed Milk' },
  { needs: ['Brown Sugar (Light)', 'Molasses'],  covers: 'Brown Sugar (Dark)' },
  { needs: ['Granulated Sugar', 'Molasses'],     covers: 'Brown Sugar (Light)' },
  { needs: ['Granulated Sugar', 'Molasses'],     covers: 'Brown Sugar (Dark)' },
  { needs: ['Heavy Cream', 'Granulated Sugar'],  covers: 'Whipping Cream' },
  { needs: ['Whole Milk', 'Whole Egg (large)'],  covers: 'Custard' },
];

// ─── Core matching function ───────────────────────────────────
export interface RecipeMatch {
  cakeType: CakeType;
  recipe: CakeRecipe;
  missingCount: number;
  missingIngredients: string[];
  matchPercent: number;
}

function isCovered(ingredientName: string, pantrySet: Set<string>): boolean {
  // Direct match
  if (pantrySet.has(ingredientName)) return true;
  // Substitute match
  const subs = SUBSTITUTES[ingredientName] ?? [];
  if (subs.some(s => pantrySet.has(s))) return true;
  return false;
}

export function findMatchingRecipes(pantryNames: string[]): RecipeMatch[] {
  const pantrySet = new Set(pantryNames);

  // Pre-compute combo coverage
  const comboCovers = new Set<string>();
  COMBO_SUBS.forEach(({ needs, covers }) => {
    if (needs.every(n => pantrySet.has(n))) comboCovers.add(covers);
  });

  const results: RecipeMatch[] = [];

  cakeTypes.forEach((cakeType) => {
    cakeType.recipes.forEach((recipe) => {
      const missing: string[] = [];
      recipe.ingredients.forEach(({ name }) => {
        const covered = isCovered(name, pantrySet) || comboCovers.has(name);
        if (!covered) missing.push(name);
      });

      const total = recipe.ingredients.length;
      const matchPercent = Math.round(((total - missing.length) / total) * 100);

      if (missing.length <= 2) {
        results.push({
          cakeType,
          recipe,
          missingCount: missing.length,
          missingIngredients: missing,
          matchPercent,
        });
      }
    });
  });

  // Sort: can-make-now first, then by match%, then alphabetically
  results.sort((a, b) => {
    if (a.missingCount !== b.missingCount) return a.missingCount - b.missingCount;
    if (b.matchPercent !== a.matchPercent) return b.matchPercent - a.matchPercent;
    return a.recipe.name.localeCompare(b.recipe.name);
  });

  return results;
}

// ─── Props ────────────────────────────────────────────────────
interface PantryModalProps {
  onClose: () => void;
  onSelectRecipe: (cakeType: CakeType, recipe: CakeRecipe) => void;
}

// ─── Component ───────────────────────────────────────────────
export function PantryModal({ onClose, onSelectRecipe }: PantryModalProps) {
  const [screen, setScreen] = useState<'pantry' | 'results'>('pantry');
  const [pantry, setPantry] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState<string>('all');
  const [results, setResults] = useState<RecipeMatch[]>([]);

  // Toggle a single ingredient
  const toggle = useCallback((name: string) => {
    setPantry(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });
  }, []);

  // Apply a preset (union — don't clear existing)
  const applyPreset = useCallback((preset: typeof PANTRY_PRESETS[0]) => {
    setPantry(prev => {
      const next = new Set(prev);
      preset.ingredients.forEach(n => {
        // find actual DB name (case-insensitive startsWith match)
        const match = ingredientsDatabase.find(i =>
          i.name.toLowerCase() === n.toLowerCase()
        );
        if (match) next.add(match.name);
      });
      return next;
    });
  }, []);

  // Filter ingredient list
  const filtered = useMemo(() => {
    return ingredientsDatabase.filter(ing => {
      const matchCat = activeCat === 'all' || ing.category === activeCat;
      const matchSearch = search === '' || ing.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCat]);

  const grouped = useMemo(() => {
    return CAT_ORDER.reduce<Record<string, typeof filtered>>((acc, cat) => {
      const items = filtered.filter(i => i.category === cat);
      if (items.length) acc[cat] = items;
      return acc;
    }, {});
  }, [filtered]);

  const pantryList = useMemo(() =>
    [...pantry].sort(), [pantry]);

  const handleFindRecipes = () => {
    const matches = findMatchingRecipes([...pantry]);
    setResults(matches);
    setScreen('results');
  };

  const canMakeNow  = results.filter(r => r.missingCount === 0);
  const missingOne  = results.filter(r => r.missingCount === 1);
  const missingTwo  = results.filter(r => r.missingCount === 2);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col"
        style={{ maxHeight: '90vh' }}>

        {/* ── Header ── */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            {screen === 'results' && (
              <button onClick={() => setScreen('pantry')}
                className="text-gray-400 hover:text-gray-600 transition-colors">
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
            )}
            <ChefHat className="w-6 h-6 text-red-500" />
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {screen === 'pantry' ? 'What\'s in your pantry?' : 'Recipes you can make'}
              </h2>
              <p className="text-xs text-gray-400">
                {screen === 'pantry'
                  ? `${pantry.size} ingredient${pantry.size !== 1 ? 's' : ''} selected`
                  : `${results.length} recipes found · ${canMakeNow.length} ready now`}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ══════════════════════════════════════════════════ */}
        {/* SCREEN 1 — PANTRY INPUT                          */}
        {/* ══════════════════════════════════════════════════ */}
        {screen === 'pantry' && (
          <>
            {/* Quick presets */}
            <div className="px-5 pt-4 pb-3 border-b border-gray-100 flex-shrink-0">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Quick-select a pantry</p>
              <div className="flex gap-2 flex-wrap">
                {PANTRY_PRESETS.map(preset => (
                  <button key={preset.label} onClick={() => applyPreset(preset)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-gray-700 hover:border-red-300 hover:bg-red-50 transition-all">
                    <span>{preset.emoji}</span> {preset.label}
                  </button>
                ))}
                {pantry.size > 0 && (
                  <button onClick={() => setPantry(new Set())}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-red-200 text-xs font-medium text-red-600 hover:bg-red-50 transition-all">
                    <X className="w-3 h-3" /> Clear all
                  </button>
                )}
              </div>
            </div>

            {/* Selected chips */}
            {pantry.size > 0 && (
              <div className="px-5 py-3 border-b border-gray-100 flex-shrink-0">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Your pantry</p>
                <div className="flex flex-wrap gap-1.5" style={{ maxHeight: '80px', overflowY: 'auto' }}>
                  {pantryList.map(name => (
                    <button key={name} onClick={() => toggle(name)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-white transition-all"
                      style={{ background: 'linear-gradient(135deg, #c0392b, #e67e22)' }}>
                      {name}
                      <X className="w-3 h-3 opacity-70" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search */}
            <div className="px-5 pt-3 flex-shrink-0">
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
                <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  autoFocus
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search ingredients..."
                  className="flex-1 bg-transparent text-sm outline-none text-gray-700"
                />
                {search && (
                  <button onClick={() => setSearch('')}>
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex gap-1 px-5 pt-2 pb-1 overflow-x-auto flex-shrink-0">
              <button onClick={() => setActiveCat('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeCat === 'all' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                All
              </button>
              {CAT_ORDER.map(cat => {
                const count = ingredientsDatabase.filter(i => i.category === cat).length;
                if (!count) return null;
                return (
                  <button key={cat} onClick={() => setActiveCat(cat)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeCat === cat ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    {CAT_CONFIG[cat]?.emoji} {CAT_CONFIG[cat]?.label.split(' ')[0]}
                  </button>
                );
              })}
            </div>

            {/* Ingredient checklist */}
            <div className="flex-1 overflow-y-auto px-5 py-2">
              {Object.entries(grouped).map(([cat, items]) => (
                <div key={cat} className="mb-3">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wide px-1 py-1.5 sticky top-0 bg-white">
                    {CAT_CONFIG[cat]?.emoji} {CAT_CONFIG[cat]?.label}
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {(items as typeof filtered).map(ing => {
                      const checked = pantry.has(ing.name);
                      return (
                        <button key={ing.id} onClick={() => toggle(ing.name)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-all border ${
                            checked
                              ? 'border-red-300 bg-red-50 text-red-700 font-medium'
                              : 'border-gray-100 bg-gray-50 text-gray-700 hover:border-gray-300'
                          }`}>
                          <div className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border transition-all ${
                            checked ? 'bg-red-500 border-red-500' : 'border-gray-300'
                          }`}>
                            {checked && <span className="text-white text-xs font-bold">✓</span>}
                          </div>
                          <span className="truncate">{ing.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-8 text-gray-400 text-sm">No ingredients found</div>
              )}
            </div>

            {/* Footer CTA */}
            <div className="p-5 border-t border-gray-200 flex-shrink-0">
              <button
                onClick={handleFindRecipes}
                disabled={pantry.size === 0}
                className="w-full py-3 rounded-xl text-white font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: pantry.size > 0 ? 'linear-gradient(135deg, #c0392b, #e67e22)' : '#d1d5db' }}>
                🔍 Find Recipes ({pantry.size} ingredient{pantry.size !== 1 ? 's' : ''} selected)
              </button>
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════════════ */}
        {/* SCREEN 2 — RESULTS                               */}
        {/* ══════════════════════════════════════════════════ */}
        {screen === 'results' && (
          <>
            <div className="flex-1 overflow-y-auto">

              {results.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
                  <span className="text-5xl mb-4">🛒</span>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">No matches found</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Try adding more pantry staples — flour, sugar, butter, eggs, and milk cover most recipes.
                  </p>
                  <button onClick={() => setScreen('pantry')}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-xl transition-colors">
                    ← Back to pantry
                  </button>
                </div>
              )}

              {/* Can Make Now */}
              {canMakeNow.length > 0 && (
                <ResultSection
                  title="✅ Can Make Right Now"
                  subtitle={`${canMakeNow.length} recipe${canMakeNow.length !== 1 ? 's' : ''} — no shopping needed`}
                  color="green"
                  results={canMakeNow}
                  onSelect={(cakeType, recipe) => { onSelectRecipe(cakeType, recipe); onClose(); }}
                />
              )}

              {/* Missing 1 */}
              {missingOne.length > 0 && (
                <ResultSection
                  title="🛒 Missing 1 Ingredient"
                  subtitle={`${missingOne.length} recipe${missingOne.length !== 1 ? 's' : ''} — one quick shop stop`}
                  color="amber"
                  results={missingOne}
                  onSelect={(cakeType, recipe) => { onSelectRecipe(cakeType, recipe); onClose(); }}
                />
              )}

              {/* Missing 2 */}
              {missingTwo.length > 0 && (
                <ResultSection
                  title="🛒 Missing 2 Ingredients"
                  subtitle={`${missingTwo.length} recipe${missingTwo.length !== 1 ? 's' : ''} — almost there`}
                  color="blue"
                  results={missingTwo}
                  onSelect={(cakeType, recipe) => { onSelectRecipe(cakeType, recipe); onClose(); }}
                />
              )}

            </div>

            {/* Footer */}
            <div className="p-5 border-t border-gray-200 flex-shrink-0 flex items-center justify-between">
              <button onClick={() => setScreen('pantry')}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
                <ChevronRight className="w-4 h-4 rotate-180" />
                Edit pantry
              </button>
              <div className="text-xs text-gray-400">
                {pantry.size} ingredients · {results.length} recipes
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Result section ───────────────────────────────────────────
function ResultSection({
  title, subtitle, color, results, onSelect,
}: {
  title: string;
  subtitle: string;
  color: 'green' | 'amber' | 'blue';
  results: RecipeMatch[];
  onSelect: (cakeType: CakeType, recipe: CakeRecipe) => void;
}) {
  const [expanded, setExpanded] = useState(true);

  const colorMap = {
    green: { bg: 'bg-green-50',  border: 'border-green-200', badge: 'bg-green-100 text-green-700', title: 'text-green-800' },
    amber: { bg: 'bg-amber-50',  border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700', title: 'text-amber-800' },
    blue:  { bg: 'bg-blue-50',   border: 'border-blue-200',  badge: 'bg-blue-100  text-blue-700',  title: 'text-blue-800'  },
  }[color];

  return (
    <div className={`mx-5 my-4 rounded-xl border ${colorMap.border} ${colorMap.bg} overflow-hidden`}>
      {/* Section header */}
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-left">
        <div>
          <div className={`text-sm font-bold ${colorMap.title}`}>{title}</div>
          <div className="text-xs text-gray-500">{subtitle}</div>
        </div>
        <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`} />
      </button>

      {/* Cards */}
      {expanded && (
        <div className="px-4 pb-4 space-y-2">
          {results.map((r, i) => (
            <button
              key={`${r.cakeType.id}-${r.recipe.name}-${i}`}
              onClick={() => onSelect(r.cakeType, r.recipe)}
              className="w-full text-left bg-white rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-md transition-all p-3 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2 min-w-0">
                  <span className="text-xl flex-shrink-0">{r.recipe.emoji}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate group-hover:text-red-600 transition-colors">
                      {r.recipe.name}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <span>{r.cakeType.emoji}</span>
                      <span>{r.cakeType.name}</span>
                      {r.recipe.group && <><span>·</span><span className="truncate">{r.recipe.group}</span></>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${colorMap.badge}`}>
                    {r.matchPercent}%
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-red-400 transition-colors" />
                </div>
              </div>

              {/* Missing ingredients */}
              {r.missingIngredients.length > 0 && (
                <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                  <ShoppingCart className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <span className="text-xs text-gray-500">Need:</span>
                  {r.missingIngredients.map(m => (
                    <span key={m} className="text-xs bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded-full">
                      {m}
                    </span>
                  ))}
                </div>
              )}

              {r.missingIngredients.length === 0 && (
                <div className="mt-2 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">You have everything!</span>
                </div>
              )}

              <p className="mt-1.5 text-xs text-gray-400 italic line-clamp-1">{r.recipe.description}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
