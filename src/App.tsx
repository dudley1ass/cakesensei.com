import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Plus, Trash2, ArrowLeft, Search, X } from 'lucide-react';

import { Ingredient, RecipeIngredient, MeasurementMode } from './types/cake';
import { CakeType, CakeRecipe, cakeTypes } from './types/cakeTypes';
import { IcingType, IcingRecipe, icingTypes } from './types/icingTypes';
import { ingredientsDatabase } from './data/ingredients';
import { calculateCakeMetrics } from './utils/cakeCalculations';
import { calculateCoverage, CoverageStyle, COVERAGE_LABELS, DIAMETER_OPTIONS } from './utils/icingCalculations';
import { CakeTypeSelector } from './components/CakeTypeSelector';
import { MetricsDisplay } from './components/MetricsDisplay';
import { NutritionFacts } from './components/NutritionFacts';
import { BakingInstructions } from './components/BakingInstructions';
import { PantryModal } from './components/PantryModal';


// ─── Unit system ─────────────────────────────────────────────
const DENSITY: Record<string, number> = {
  flour:     0.507,  // ~120g/cup (all-purpose, spooned & leveled)
  sugar:     0.845,  // ~200g/cup (granulated); brown sugar packed ~220g handled as sugar
  fat:       0.960,  // ~227g/cup (butter/solid fat)
  liquid:    1.000,  // water-based liquids
  egg:       1.030,  // slightly denser than water
  leavening: 0.934,  // baking powder/soda ~4.6g/tsp
  dairy:     1.030,  // milk, cream, buttermilk
  chocolate: 0.640,  // chopped chocolate / cocoa
  default:   0.845,
};

// Egg sizes
const EGG_SIZES: Record<string, { label: string; grams: number }> = {
  small:  { label: 'Small',       grams: 38 },
  medium: { label: 'Medium',      grams: 44 },
  large:  { label: 'Large',       grams: 50 },
  xlarge: { label: 'Extra Large', grams: 56 },
};

// ── Metric units ──
type MetricUnit = 'mg' | 'g' | 'kg';
const METRIC_UNITS: { value: MetricUnit; label: string; toGrams: number }[] = [
  { value: 'mg', label: 'mg',  toGrams: 0.001   },
  { value: 'g',  label: 'g',   toGrams: 1        },
  { value: 'kg', label: 'kg',  toGrams: 1000     },
];

// ── Imperial weight units ──
type ImperialUnit = 'oz' | 'lb';
const IMPERIAL_UNITS: { value: ImperialUnit; label: string; toGrams: number }[] = [
  { value: 'oz', label: 'oz', toGrams: 28.3495 },
  { value: 'lb', label: 'lb', toGrams: 453.592 },
];

// ── Volumetric units ──
type VolUnit = 'tsp' | 'tbsp' | 'floz' | 'cups' | 'pints' | 'quarts';
const VOL_UNITS: { value: VolUnit; label: string; toCups: number }[] = [
  { value: 'tsp',    label: 'tsp',    toCups: 1 / 48     },
  { value: 'tbsp',   label: 'tbsp',   toCups: 1 / 16     },
  { value: 'floz',   label: 'fl oz',  toCups: 1 / 8      },
  { value: 'cups',   label: 'cups',   toCups: 1           },
  { value: 'pints',  label: 'pints',  toCups: 2           },
  { value: 'quarts', label: 'quarts', toCups: 4           },
];

function volToGrams(val: number, cat: string, unit: VolUnit): number {
  const d = DENSITY[cat] ?? DENSITY.default;
  const u = VOL_UNITS.find(u => u.value === unit)!;
  return val * u.toCups * d * 236.588;
}
function gramsToVol(grams: number, cat: string, unit: VolUnit): number {
  const d = DENSITY[cat] ?? DENSITY.default;
  const u = VOL_UNITS.find(u => u.value === unit)!;
  return grams / (u.toCups * d * 236.588);
}

// Pick a sensible default unit for a given mode + ingredient
function bestMetricUnit(grams: number): MetricUnit {
  if (grams < 1) return 'mg';
  if (grams >= 1000) return 'kg';
  return 'g';
}
function bestImperialUnit(grams: number): ImperialUnit {
  return grams >= 450 ? 'lb' : 'oz';
}
function bestVolUnit(grams: number, cat: string): VolUnit {
  const d = DENSITY[cat] ?? DENSITY.default;
  const cups = grams / (d * 236.588);
  // Flour and similar dry goods: always cups (never go to pints/quarts in normal recipe amounts)
  if (cat === 'flour' || cat === 'sugar' || cat === 'leavening' || cat === 'spice') {
    if (cups >= 0.25) return 'cups';
    if (cups * 16 >= 1) return 'tbsp';
    return 'tsp';
  }
  if (cups >= 4)   return 'quarts';
  if (cups >= 1)   return 'cups';
  if (cups >= 0.25) return 'cups';
  if (cups * 8 >= 1) return 'floz';
  if (cups * 16 >= 1) return 'tbsp';
  return 'tsp';
}

// ─── Kitchen fraction rounding ────────────────────────────────
// Snap a raw decimal to the nearest standard kitchen fraction.
// Fractions supported: 0, 1/8, 1/4, 1/3, 3/8, 1/2, 5/8, 2/3, 3/4, 7/8, 1
const FRACS: { val: number; str: string }[] = [
  { val: 0,       str: ''    },
  { val: 1/8,     str: '⅛'   },
  { val: 1/4,     str: '¼'   },
  { val: 1/3,     str: '⅓'   },
  { val: 3/8,     str: '⅜'   },
  { val: 1/2,     str: '½'   },
  { val: 5/8,     str: '⅝'   },
  { val: 2/3,     str: '⅔'   },
  { val: 3/4,     str: '¾'   },
  { val: 7/8,     str: '⅞'   },
  { val: 1,       str: ''    },   // whole number — handled by carry
];

function snapFrac(decimal: number): { whole: number; fracStr: string } {
  // find nearest fraction
  let best = FRACS[0];
  let bestDist = Math.abs(decimal - FRACS[0].val);
  for (const f of FRACS) {
    const d = Math.abs(decimal - f.val);
    if (d < bestDist) { bestDist = d; best = f; }
  }
  if (best.val === 1) return { whole: 1, fracStr: '' };
  return { whole: 0, fracStr: best.str };
}

// Format a cups value as a human kitchen string e.g. "2 cups + 3 tbsp"
// or "1½ cups" or "2 tbsp + 1 tsp"
function formatCups(cups: number): string {
  if (cups <= 0) return '0 tsp';

  // ── Large: quarts (only for liquids ≥ 4 cups, handled at call site) ──

  // ── cups + tbsp remainder ──
  if (cups >= 0.25) {
    const wholeCups = Math.floor(cups);
    const remainder = cups - wholeCups;   // 0..1
    const { whole: fracWhole, fracStr } = snapFrac(remainder);
    const totalWhole = wholeCups + fracWhole;

    const cupStr = totalWhole > 0
      ? `${totalWhole}${fracStr} cup${totalWhole + (fracStr ? 0 : 0) > 1 || totalWhole > 1 ? 's' : ''}`
      : fracStr
        ? `${fracStr} cup`
        : '';

    // If the fraction snapped to 0 but there IS remainder, show tbsp for it
    if (!fracStr && remainder > 0.01) {
      const tbspRaw = remainder * 16;
      const wholeTbsp = Math.floor(tbspRaw);
      const tbspRem = tbspRaw - wholeTbsp;
      const { whole: tw, fracStr: tf } = snapFrac(tbspRem);
      const totalTbsp = wholeTbsp + tw;
      const tbspStr = totalTbsp > 0 ? `${totalTbsp}${tf} tbsp` : tf ? `${tf} tbsp` : '';
      if (cupStr && tbspStr) return `${cupStr} + ${tbspStr}`;
      return cupStr || tbspStr || '0 tsp';
    }

    // fraction snapped cleanly
    if (!cupStr) {
      // somehow zero — fall through to tbsp
    } else {
      return cupStr;
    }
  }

  // ── tbsp + tsp remainder ──
  const tbsp = cups * 16;
  if (tbsp >= 1) {
    const wholeTbsp = Math.floor(tbsp);
    const remainder = tbsp - wholeTbsp;
    const { whole: fw, fracStr } = snapFrac(remainder);
    const totalTbsp = wholeTbsp + fw;
    const tbspStr = totalTbsp > 0
      ? `${totalTbsp}${fracStr} tbsp`
      : fracStr ? `${fracStr} tbsp` : '';

    if (!fracStr && remainder > 0.05) {
      const tspRaw = remainder * 3;
      const wholeTsp = Math.floor(tspRaw);
      const tspRem = tspRaw - wholeTsp;
      const { whole: tw, fracStr: tf } = snapFrac(tspRem);
      const totalTsp = wholeTsp + tw;
      const tspStr = totalTsp > 0 ? `${totalTsp}${tf} tsp` : tf ? `${tf} tsp` : '';
      if (tbspStr && tspStr) return `${tbspStr} + ${tspStr}`;
      return tbspStr || tspStr || '0 tsp';
    }
    return tbspStr || '0 tsp';
  }

  // ── tsp ──
  const tsp = cups * 48;
  const wholeTsp = Math.floor(tsp);
  const remainder = tsp - wholeTsp;
  const { whole: fw, fracStr } = snapFrac(remainder);
  const totalTsp = wholeTsp + fw;
  if (totalTsp > 0) return `${totalTsp}${fracStr} tsp`;
  if (fracStr)      return `${fracStr} tsp`;
  return '¼ tsp';  // minimum displayable
}

// Summary display (used for total weight row)
function gramsTo(grams: number, mode: MeasurementMode, cat: string): string {
  if (mode === 'metric') {
    if (grams >= 1000) return `${(grams / 1000).toFixed(2)} kg`;
    if (grams < 1) return `${(grams * 1000).toFixed(0)} mg`;
    return `${grams.toFixed(0)} g`;
  }
  if (mode === 'imperial') {
    if (grams >= 450) return `${(grams / 453.592).toFixed(2)} lb`;
    return `${(grams / 28.3495).toFixed(2)} oz`;
  }
  const d = DENSITY[cat] ?? DENSITY.default;
  const cups = grams / (d * 236.588);
  // Dry goods stay in cups, not quarts
  if (cat === 'flour' || cat === 'sugar' || cat === 'leavening' || cat === 'spice') {
    return formatCups(cups);
  }
  if (cups >= 4) return `${(cups / 4).toFixed(1)} qt`;
  return formatCups(cups);
}

// ─── Category display config ─────────────────────────────────
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

// ─── Inline swap dropdown ─────────────────────────────────────
function IngredientDropdown({
  current,
  onSelect,
  onClose,
}: {
  current: RecipeIngredient;
  onSelect: (ing: Ingredient) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState<string>('all');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const filtered = ingredientsDatabase.filter((ing) => {
    const matchCat = activeCat === 'all' || ing.category === activeCat;
    const matchSearch = ing.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const grouped = CAT_ORDER.reduce<Record<string, Ingredient[]>>((acc, cat) => {
    const items = filtered.filter((i) => i.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  const usedCats = Array.from(new Set(ingredientsDatabase.map((i) => i.category)));

  return (
    <div
      ref={ref}
      className="absolute left-0 top-full mt-1 z-50 bg-white border border-gray-200 rounded-xl shadow-2xl w-80"
      style={{ maxHeight: '380px', display: 'flex', flexDirection: 'column' }}
    >
      {/* Search */}
      <div className="p-2 border-b border-gray-100">
        <div className="flex items-center gap-1 bg-gray-50 rounded-lg px-2 py-1">
          <Search className="w-3.5 h-3.5 text-gray-400" />
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ingredients..."
            className="flex-1 bg-transparent text-sm outline-none text-gray-700"
          />
          {search && (
            <button onClick={() => setSearch('')}>
              <X className="w-3 h-3 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1 p-2 border-b border-gray-100 overflow-x-auto" style={{ flexShrink: 0 }}>
        <button
          onClick={() => setActiveCat('all')}
          className={`px-2 py-1 rounded text-xs whitespace-nowrap font-medium ${activeCat === 'all' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          All
        </button>
        {usedCats.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-2 py-1 rounded text-xs whitespace-nowrap font-medium ${activeCat === cat ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {CAT_CONFIG[cat]?.emoji} {CAT_CONFIG[cat]?.label.split(' ')[0] ?? cat}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="overflow-y-auto flex-1">
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat}>
            <div className="px-3 py-1 text-xs font-bold text-gray-400 uppercase tracking-wide bg-gray-50 sticky top-0">
              {CAT_CONFIG[cat]?.emoji} {CAT_CONFIG[cat]?.label ?? cat}
            </div>
            {items.map((ing) => (
              <button
                key={ing.id}
                onClick={() => { onSelect(ing); onClose(); }}
                className={`w-full text-left px-3 py-2 hover:bg-red-50 flex justify-between items-center text-sm transition-colors ${ing.id === current.id ? 'bg-red-50 font-semibold' : ''}`}
              >
                <span className="text-gray-800">{ing.name}</span>
                <span className="text-gray-400 text-xs">{ing.calories} kcal</span>
              </button>
            ))}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="px-3 py-6 text-center text-sm text-gray-400">No ingredients found</div>
        )}
      </div>
    </div>
  );
}

// ─── Shared unit dropdown style ──────────────────────────────
const unitSelectCls = "text-xs border border-gray-200 rounded-lg px-1.5 py-1 focus:outline-none focus:ring-2 focus:ring-red-300 text-gray-600 bg-white cursor-pointer";
const numInputCls   = "w-16 text-right text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-300";

// ─── Single ingredient row ─────────────────────────────────────
function IngredientRow({
  ing,
  mode,
  onAmountChange,
  onSwap,
  onRemove,
}: {
  ing: RecipeIngredient;
  mode: MeasurementMode;
  onAmountChange: (id: string, grams: number) => void;
  onSwap: (id: string, newIng: Ingredient) => void;
  onRemove: (id: string) => void;
}) {
  const [open, setOpen]           = useState(false);
  const [metricUnit, setMetricUnit]   = useState<MetricUnit>(() => bestMetricUnit(ing.amount));
  const [imperialUnit, setImperialUnit] = useState<ImperialUnit>(() => bestImperialUnit(ing.amount));
  const [volUnit, setVolUnit]     = useState<VolUnit>(() => bestVolUnit(ing.amount, ing.category));
  const [eggSize, setEggSize]     = useState<string>('large');

  const cfg   = CAT_CONFIG[ing.category] ?? { emoji: '•', label: ing.category };
  const isEgg = ing.category === 'egg';

  // Resync units when ingredient identity or amount changes (e.g. recipe preset loaded)
  useEffect(() => { setMetricUnit(bestMetricUnit(ing.amount)); }, [ing.id, ing.amount]);
  useEffect(() => { setImperialUnit(bestImperialUnit(ing.amount)); }, [ing.id, ing.amount]);
  useEffect(() => { setVolUnit(bestVolUnit(ing.amount, ing.category)); }, [ing.id, ing.amount, ing.category]);

  // ── Egg helpers ──
  const eggCount = Math.max(1, Math.round(ing.amount / EGG_SIZES[eggSize].grams));
  const handleEggSizeChange = (newSize: string) => {
    setEggSize(newSize);
    onAmountChange(ing.recipeId, eggCount * EGG_SIZES[newSize].grams);
  };
  const handleEggCountChange = (count: number) => {
    onAmountChange(ing.recipeId, Math.max(1, count) * EGG_SIZES[eggSize].grams);
  };

  // ── Metric display ──
  const mDef    = METRIC_UNITS.find(u => u.value === metricUnit)!;
  const mValue  = parseFloat((ing.amount / mDef.toGrams).toFixed(metricUnit === 'mg' ? 0 : metricUnit === 'kg' ? 4 : 2));
  const handleMetricChange = (val: number) => onAmountChange(ing.recipeId, val * mDef.toGrams);
  const handleMetricUnit   = (u: MetricUnit) => setMetricUnit(u);

  // ── Imperial display ──
  const iDef    = IMPERIAL_UNITS.find(u => u.value === imperialUnit)!;
  const iValue  = parseFloat((ing.amount / iDef.toGrams).toFixed(imperialUnit === 'lb' ? 4 : 2));
  const handleImperialChange = (val: number) => onAmountChange(ing.recipeId, val * iDef.toGrams);
  const handleImperialUnit   = (u: ImperialUnit) => setImperialUnit(u);

  // ── Volumetric display ──
  const VOL_UNIT_GRAMS = (unit: VolUnit, cat: string) => {
    const d = DENSITY[cat] ?? DENSITY.default;
    const u = VOL_UNITS.find(u => u.value === unit)!;
    return u.toCups * d * 236.588;
  };
  const SECONDARY_UNIT: Partial<Record<VolUnit, VolUnit>> = {
    quarts: 'cups', cups: 'tbsp', tbsp: 'tsp',
  };
  const FRAC_VALS = [
    { val: 1/8, str: '⅛' }, { val: 1/4, str: '¼' }, { val: 1/3, str: '⅓' },
    { val: 3/8, str: '⅜' }, { val: 1/2, str: '½' }, { val: 5/8, str: '⅝' },
    { val: 2/3, str: '⅔' }, { val: 3/4, str: '¾' }, { val: 7/8, str: '⅞' },
  ];

  // Decompose grams into:
  //   primaryWhole  — integer for the <input type="number"> (always a plain number)
  //   primaryFrac   — unicode fraction string shown as a label beside the input ('' if none)
  //   showSec       — whether to show the secondary unit field
  //   secValue      — decimal value for secondary input
  //   secUnit       — unit string for secondary label
  const volDecompose = (() => {
    const pg       = VOL_UNIT_GRAMS(volUnit, ing.category);
    const secUnit  = SECONDARY_UNIT[volUnit] ?? null;
    const sg       = secUnit ? VOL_UNIT_GRAMS(secUnit, ing.category) : null;

    const exact    = ing.amount / pg;
    const whole    = Math.floor(exact);
    const fracPart = exact - whole;

    // Snap fracPart to nearest kitchen fraction
    let bestFrac = { val: 0, str: '' };
    let bestDist = fracPart;
    for (const f of FRAC_VALS) {
      const dist = Math.abs(fracPart - f.val);
      if (dist < bestDist) { bestDist = dist; bestFrac = f; }
    }

    // Near-whole: round up (e.g. 0.997 cups → 1 cup, no fraction)
    if (fracPart > 0.94) {
      return { primaryWhole: whole + 1, primaryFrac: '', primaryGrams: pg, unit: volUnit, secValue: 0, secUnit, showSec: false };
    }

    // Clean fraction snap (within 6%): show whole + fraction label, no secondary
    if (bestDist < 0.06) {
      const carry    = bestFrac.val >= 1 ? 1 : 0;
      const fracStr  = bestFrac.val >= 1 ? '' : bestFrac.str;
      return {
        primaryWhole: whole + carry,  // integer for the input
        primaryFrac:  fracStr,        // e.g. '⅛' shown as a label, '' if none
        primaryGrams: pg,
        unit: volUnit,
        secValue: 0,
        secUnit,
        showSec: false,
      };
    }

    // No clean snap — show whole primary + secondary remainder
    const remainder = ing.amount - whole * pg;
    const secVal    = sg ? Math.round((remainder / sg) * 4) / 4 : 0;
    return {
      primaryWhole: whole,
      primaryFrac:  '',
      primaryGrams: pg,
      unit: volUnit,
      secValue: secVal,
      secUnit,
      showSec: sg !== null && secVal > 0,
    };
  })();

  const handlePrimaryVolChange = (val: number) => {
    // Preserve the existing secondary when user edits primary whole number
    const secG = volDecompose.showSec && volDecompose.secUnit
      ? volDecompose.secValue * VOL_UNIT_GRAMS(volDecompose.secUnit, ing.category) : 0;
    // If there's a fraction label, convert it back to grams and add
    const fracG = volDecompose.primaryFrac
      ? (FRAC_VALS.find(f => f.str === volDecompose.primaryFrac)?.val ?? 0) * volDecompose.primaryGrams : 0;
    onAmountChange(ing.recipeId, Math.max(0, val) * volDecompose.primaryGrams + fracG + secG);
  };
  const handleSecVolChange = (val: number) => {
    const fracG = volDecompose.primaryFrac
      ? (FRAC_VALS.find(f => f.str === volDecompose.primaryFrac)?.val ?? 0) * volDecompose.primaryGrams : 0;
    onAmountChange(ing.recipeId, volDecompose.primaryWhole * volDecompose.primaryGrams + fracG + Math.max(0, val) * VOL_UNIT_GRAMS(volDecompose.secUnit!, ing.category));
  };
  const handleVolUnit = (u: VolUnit) => setVolUnit(u);

  return (
    <div className="py-2 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-2 relative">

        {/* Name / swap button */}
        <div className="relative flex-1 min-w-0">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1 text-left w-full group"
          >
            <span className="text-base">{cfg.emoji}</span>
            <span className="text-sm font-medium text-gray-800 truncate group-hover:text-red-600 transition-colors">
              {ing.name}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          {open && (
            <IngredientDropdown
              current={ing}
              onSelect={(newIng) => onSwap(ing.recipeId, newIng)}
              onClose={() => setOpen(false)}
            />
          )}
        </div>

        {/* ── Eggs: always qty + size dropdowns ── */}
        {isEgg ? (
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={eggCount}
              min={1} step={1}
              onChange={(e) => handleEggCountChange(parseInt(e.target.value) || 1)}
              className={numInputCls}
            />
            <select
              value={eggSize}
              onChange={(e) => handleEggSizeChange(e.target.value)}
              className={unitSelectCls}
            >
              {Object.entries(EGG_SIZES).map(([key, v]) => (
                <option key={key} value={key}>{v.label}</option>
              ))}
            </select>
          </div>

        ) : mode === 'metric' ? (
          /* ── Metric: number + mg/g/kg dropdown ── */
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={mValue}
              min={0}
              step={metricUnit === 'kg' ? 0.001 : 1}
              onChange={(e) => handleMetricChange(parseFloat(e.target.value) || 0)}
              className={numInputCls}
            />
            <select value={metricUnit} onChange={(e) => handleMetricUnit(e.target.value as MetricUnit)} className={unitSelectCls}>
              {METRIC_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
            </select>
          </div>

        ) : mode === 'imperial' ? (
          /* ── Imperial: number + oz/lb dropdown ── */
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={iValue}
              min={0}
              step={imperialUnit === 'lb' ? 0.01 : 0.1}
              onChange={(e) => handleImperialChange(parseFloat(e.target.value) || 0)}
              className={numInputCls}
            />
            <select value={imperialUnit} onChange={(e) => handleImperialUnit(e.target.value as ImperialUnit)} className={unitSelectCls}>
              {IMPERIAL_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
            </select>
          </div>

        ) : (
          /* ── Volumetric: [whole] [frac label] unit + [secondary] unit ── */
          <div className="flex items-center gap-1 flex-wrap">
            {/* Primary whole number input */}
            <input
              type="number"
              value={volDecompose.primaryWhole}
              min={0}
              step={1}
              onChange={(e) => handlePrimaryVolChange(parseFloat(e.target.value) || 0)}
              className={numInputCls}
            />
            {/* Fraction label (e.g. ⅛) — shown beside input when amount has a clean fractional part */}
            {volDecompose.primaryFrac && (
              <span className="text-sm font-bold text-gray-700">{volDecompose.primaryFrac}</span>
            )}
            {/* Unit selector */}
            <select value={volUnit} onChange={(e) => handleVolUnit(e.target.value as VolUnit)} className={unitSelectCls}>
              {VOL_UNITS.filter(u => u.value !== 'floz').map(u => (
                <option key={u.value} value={u.value}>{u.label}</option>
              ))}
            </select>
            {/* Secondary field — only when there's a remainder that doesn't snap to a clean fraction */}
            {volDecompose.showSec && volDecompose.secUnit && (
              <>
                <span className="text-gray-400 text-xs">+</span>
                <input
                  type="number"
                  value={volDecompose.secValue}
                  min={0}
                  step={0.25}
                  onChange={(e) => handleSecVolChange(parseFloat(e.target.value) || 0)}
                  className={numInputCls}
                />
                <span className="text-xs text-gray-500 font-medium">{volDecompose.secUnit}</span>
              </>
            )}
          </div>
        )}

        {/* Remove */}
        <button onClick={() => onRemove(ing.recipeId)} className="text-gray-300 hover:text-red-500 transition-colors ml-1">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Add ingredient modal ────────────────────────────────────
function AddModal({
  existing,
  onAdd,
  onClose,
}: {
  existing: RecipeIngredient[];
  onAdd: (ing: Ingredient) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState<string>('all');

  const existingIds = new Set(existing.map((e) => e.id));
  const filtered = ingredientsDatabase.filter((ing) => {
    if (existingIds.has(ing.id)) return false;
    const matchCat = activeCat === 'all' || ing.category === activeCat;
    const matchSearch = ing.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Add Ingredient</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search all ingredients..."
              className="flex-1 bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        {/* Cat tabs */}
        <div className="flex gap-1 p-3 border-b border-gray-100 overflow-x-auto flex-shrink-0">
          <button
            onClick={() => setActiveCat('all')}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${activeCat === 'all' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            All ({ingredientsDatabase.filter((i) => !existingIds.has(i.id)).length})
          </button>
          {CAT_ORDER.map((cat) => {
            const count = ingredientsDatabase.filter((i) => i.category === cat && !existingIds.has(i.id)).length;
            if (!count) return null;
            return (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${activeCat === cat ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {CAT_CONFIG[cat]?.emoji} {CAT_CONFIG[cat]?.label.split(' ')[0]} ({count})
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="overflow-y-auto flex-1 p-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filtered.map((ing) => (
              <button
                key={ing.id}
                onClick={() => { onAdd(ing); }}
                className="text-left p-3 rounded-xl border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span>{CAT_CONFIG[ing.category]?.emoji}</span>
                  <span className="text-sm font-medium text-gray-800">{ing.name}</span>
                </div>
                <div className="text-xs text-gray-400">
                  {ing.calories} kcal · {ing.fat.toFixed(1)}g fat · {ing.sugar.toFixed(1)}g sugar
                </div>
              </button>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">No ingredients found</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────
export default function App() {
  const [selectedType, setSelectedType] = useState<CakeType | null>(null);
  const [selectedRecipeName, setSelectedRecipeName] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<RecipeIngredient[]>([]);
  const [mode, setMode] = useState<MeasurementMode>('metric');
  const [servings, setServings] = useState(8);
  const [showAdd, setShowAdd] = useState(false);
  const [activeTab, setActiveTab] = useState<'metrics' | 'nutrition' | 'baking'>('metrics');
  const [showPantry, setShowPantry] = useState(false);

  // ── Icing state ──
  const [icingRecipe, setIcingRecipe] = useState<RecipeIngredient[]>([]);
  const [selectedIcingType, setSelectedIcingType] = useState<IcingType | null>(null);
  const [selectedIcingName, setSelectedIcingName] = useState<string | null>(null);
  const [showAddIcing, setShowAddIcing] = useState(false);
  const [icingExpanded, setIcingExpanded] = useState(true);

  // ── Coverage calculator state ──
  const [coverageDiameter, setCoverageDiameter] = useState(20);
  const [coverageLayers, setCoverageLayers] = useState(2);
  const [coverageStyle, setCoverageStyle] = useState<CoverageStyle>('full');
  const [coverageShape] = useState<'round' | 'square'>('round');

  const selectType = (type: CakeType) => {
    setSelectedType(type);
    setSelectedRecipeName(null);
    const newRecipe: RecipeIngredient[] = type.baseFormula
      .map((f) => {
        const ing = ingredientsDatabase.find((i) => i.name === f.name);
        if (!ing) return null;
        return { ...ing, recipeId: `${ing.id}-${Date.now()}-${Math.random()}`, amount: f.amount };
      })
      .filter(Boolean) as RecipeIngredient[];
    setRecipe(newRecipe);
    // Reset icing when switching cake type
    setIcingRecipe([]);
    setSelectedIcingType(null);
    setSelectedIcingName(null);
  };

  const selectRecipe = (type: CakeType, preset: CakeRecipe) => {
    setSelectedType(type);
    setSelectedRecipeName(preset.name);
    const newRecipe: RecipeIngredient[] = preset.ingredients
      .map((f) => {
        const ing = ingredientsDatabase.find((i) => i.name === f.name);
        if (!ing) return null;
        return { ...ing, recipeId: `${ing.id}-${Date.now()}-${Math.random()}`, amount: f.amount };
      })
      .filter(Boolean) as RecipeIngredient[];
    setRecipe(newRecipe);
    // Reset icing when switching cake recipe
    setIcingRecipe([]);
    setSelectedIcingType(null);
    setSelectedIcingName(null);
  };

  const updateAmount = useCallback((recipeId: string, grams: number) => {
    setRecipe((prev) => prev.map((r) => r.recipeId === recipeId ? { ...r, amount: grams } : r));
  }, []);

  const swapIngredient = useCallback((recipeId: string, newIng: Ingredient) => {
    setRecipe((prev) => prev.map((r) =>
      r.recipeId === recipeId ? { ...newIng, recipeId, amount: r.amount } : r
    ));
  }, []);

  const removeIngredient = useCallback((recipeId: string) => {
    setRecipe((prev) => prev.filter((r) => r.recipeId !== recipeId));
  }, []);

  const addIngredient = (ing: Ingredient) => {
    setRecipe((prev) => [
      ...prev,
      { ...ing, recipeId: `${ing.id}-${Date.now()}`, amount: ing.defaultAmount },
    ]);
  };

  // ── Icing helpers ──
  const selectIcing = useCallback((type: IcingType, preset: IcingRecipe) => {
    setSelectedIcingType(type);
    setSelectedIcingName(preset.name);
    const newRecipe: RecipeIngredient[] = preset.ingredients
      .map((f) => {
        const ing = ingredientsDatabase.find((i) => i.name === f.name);
        if (!ing) return null;
        return { ...ing, recipeId: `icing-${ing.id}-${Date.now()}-${Math.random()}`, amount: f.amount };
      })
      .filter(Boolean) as RecipeIngredient[];
    setIcingRecipe(newRecipe);
  }, []);

  const selectIcingType = useCallback((type: IcingType) => {
    setSelectedIcingType(type);
    setSelectedIcingName(null);
    const newRecipe: RecipeIngredient[] = type.baseFormula
      .map((f) => {
        const ing = ingredientsDatabase.find((i) => i.name === f.name);
        if (!ing) return null;
        return { ...ing, recipeId: `icing-${ing.id}-${Date.now()}-${Math.random()}`, amount: f.amount };
      })
      .filter(Boolean) as RecipeIngredient[];
    setIcingRecipe(newRecipe);
  }, []);

  const updateIcingAmount = useCallback((recipeId: string, grams: number) => {
    setIcingRecipe((prev) => prev.map((r) => r.recipeId === recipeId ? { ...r, amount: grams } : r));
  }, []);

  const swapIcingIngredient = useCallback((recipeId: string, newIng: Ingredient) => {
    setIcingRecipe((prev) => prev.map((r) =>
      r.recipeId === recipeId ? { ...newIng, recipeId, amount: r.amount } : r
    ));
  }, []);

  const removeIcingIngredient = useCallback((recipeId: string) => {
    setIcingRecipe((prev) => prev.filter((r) => r.recipeId !== recipeId));
  }, []);

  const addIcingIngredient = (ing: Ingredient) => {
    setIcingRecipe((prev) => [
      ...prev,
      { ...ing, recipeId: `icing-${ing.id}-${Date.now()}`, amount: ing.defaultAmount },
    ]);
  };

  if (!selectedType) {
    return <CakeTypeSelector cakeTypes={cakeTypes} onSelectType={selectType} onSelectRecipe={selectRecipe} />;
  }

  const metrics = calculateCakeMetrics(recipe);
  const icingMetrics = icingRecipe.length > 0 ? calculateCakeMetrics(icingRecipe) : null;
  // Combined: run the full calculation on the merged ingredient list so taste
  // prediction, flavor scores and nutrition are all computed correctly together
  const combinedMetrics = icingRecipe.length > 0
    ? calculateCakeMetrics([...recipe, ...icingRecipe])
    : null;

  // Coverage calculator — auto-scales icing amounts
  const icingBaseGrams = icingRecipe.reduce((s, r) => s + r.amount, 0);
  const coverage = calculateCoverage(
    { diameterCm: coverageDiameter, layers: coverageLayers, layerHeightCm: 4, coverageStyle, shape: coverageShape },
    icingBaseGrams,
  );

  const groupedRecipe = CAT_ORDER.reduce<Record<string, RecipeIngredient[]>>((acc, cat) => {
    const items = recipe.filter((r) => r.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  const groupedIcing = CAT_ORDER.reduce<Record<string, RecipeIngredient[]>>((acc, cat) => {
    const items = icingRecipe.filter((r) => r.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fdf6e3 0%, #fce4ec 50%, #f3e5f5 100%)' }}>
      {/* Header */}
      <header className="text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c, #e67e22)' }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <button onClick={() => { setSelectedType(null); setSelectedRecipeName(null); }} className="text-white/80 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="text-2xl">{selectedType.emoji}</span>
              <div>
                <h1 className="text-xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                  {selectedType.name}
                </h1>
                <p className="text-red-100 text-xs">{selectedType.category} · {selectedRecipeName ?? selectedType.examples[0]}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Pantry finder */}
              <button
                onClick={() => setShowPantry(true)}
                className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-all border border-white/30"
              >
                🍳 What can I make?
              </button>
              {/* Measurement mode */}
              <div className="flex bg-white/20 rounded-lg p-0.5">
                {(['metric', 'imperial', 'volumetric'] as MeasurementMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-2 py-1 rounded-md text-xs font-medium transition-all ${mode === m ? 'bg-white text-red-600' : 'text-white hover:bg-white/20'}`}
                  >
                    {m === 'metric' ? 'g' : m === 'imperial' ? 'oz' : 'cups'}
                  </button>
                ))}
              </div>

              {/* Servings */}
              <div className="flex items-center gap-1 bg-white/20 rounded-lg px-2 py-1">
                <span className="text-xs text-white/80">Servings:</span>
                <input
                  type="number"
                  value={servings}
                  min={1}
                  max={48}
                  onChange={(e) => setServings(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-10 bg-white/20 rounded text-white text-xs text-center outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT — Cake + Icing editors stacked */}
          <div className="space-y-6">

          {/* ── Cake Ingredient Editor ── */}
          <div className="bg-white rounded-2xl shadow-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">🧪 Cake Ingredients</h2>
              <button
                onClick={() => setShowAdd(true)}
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-3 py-1.5 rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            {/* Recipe presets */}
            {selectedType.recipes.length > 0 && (
              <div className="mb-4 pb-4 border-b border-gray-100">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">📖 Load a Recipe</div>
                <select
                  value={selectedRecipeName ?? ''}
                  onChange={(e) => {
                    const preset = selectedType.recipes.find(r => r.name === e.target.value);
                    if (preset) selectRecipe(selectedType, preset);
                  }}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 bg-white text-gray-700 cursor-pointer"
                >
                  <option value="">— Select a recipe —</option>
                  {(() => {
                    const hasGroups = selectedType.recipes.some(r => r.group);
                    if (!hasGroups) return selectedType.recipes.map(r => <option key={r.name} value={r.name}>{r.emoji} {r.name}</option>);
                    const groups: Record<string, typeof selectedType.recipes> = {};
                    selectedType.recipes.forEach(r => { const g = r.group ?? 'Other'; if (!groups[g]) groups[g] = []; groups[g].push(r); });
                    return Object.entries(groups).map(([group, recipes]) => (
                      <optgroup key={group} label={group}>
                        {recipes.map(r => <option key={r.name} value={r.name}>{r.emoji} {r.name}</option>)}
                      </optgroup>
                    ));
                  })()}
                </select>
                {selectedRecipeName && (() => {
                  const preset = selectedType.recipes.find(r => r.name === selectedRecipeName);
                  if (!preset) return null;
                  return (
                    <div className="mt-2 space-y-2">
                      {/* Description */}
                      <p className="text-xs text-gray-400 italic px-1">{preset.description}</p>

                      {/* Source badge */}
                      {preset.source && (
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 border border-amber-200 rounded-lg">
                          <span className="text-xs">📜</span>
                          <span className="text-xs text-amber-800 font-medium">{preset.source}</span>
                        </div>
                      )}

                      {/* Leavening note */}
                      {preset.leaveningNote && (
                        <div className="px-2 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="text-xs font-semibold text-blue-700 mb-0.5">⚗️ Leavening</div>
                          <div className="text-xs text-blue-800">{preset.leaveningNote}</div>
                        </div>
                      )}

                      {/* Optional additions */}
                      {preset.optionalAdditions && preset.optionalAdditions.length > 0 && (
                        <div className="px-2 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                          <div className="text-xs font-semibold text-green-700 mb-1">✨ Optional Modern Additions</div>
                          <div className="space-y-0.5">
                            {preset.optionalAdditions.map((opt, i) => (
                              <div key={i} className="flex items-start gap-1.5 text-xs text-green-800">
                                <span className="text-green-400 flex-shrink-0 mt-0.5">+</span>
                                <span><strong>{opt.name}</strong> ({opt.amount}g) — {opt.note}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Ingredients grouped by category */}
            {Object.entries(groupedRecipe).map(([cat, items]) => (
              <div key={cat} className="mb-4">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1 px-1">
                  {CAT_CONFIG[cat]?.emoji} {CAT_CONFIG[cat]?.label ?? cat}
                </div>
                {items.map((ing) => (
                  <IngredientRow key={ing.recipeId} ing={ing} mode={mode}
                    onAmountChange={updateAmount} onSwap={swapIngredient} onRemove={removeIngredient} />
                ))}
              </div>
            ))}

            {recipe.length === 0 && (
              <div className="text-center py-8 text-gray-400 text-sm">No ingredients yet. Click Add to start.</div>
            )}

            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">Total Weight</span>
              <span className="text-sm font-bold text-gray-900">{gramsTo(metrics.totalWeight, mode === 'volumetric' ? 'metric' : mode, 'default')}</span>
            </div>
          </div>

          {/* ── Icing Panel ── */}
          <div className="bg-white rounded-2xl shadow-md p-5">
            {/* Header row with expand toggle */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setIcingExpanded(v => !v)}
                className="flex items-center gap-2 text-left group"
              >
                <span className="text-lg font-bold text-gray-900">🧁 Icing & Frosting</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${icingExpanded ? 'rotate-180' : ''}`} />
              </button>
              {icingExpanded && icingRecipe.length > 0 && (
                <button
                  onClick={() => { setIcingRecipe([]); setSelectedIcingType(null); setSelectedIcingName(null); }}
                  className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-600 text-sm font-medium px-3 py-1.5 rounded-xl transition-colors"
                >
                  🗑️ Delete Frosting
                </button>
              )}
            </div>

            {icingExpanded && (
              <>
                {/* ── Icing Type + Recipe dropdown ── */}
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">🎨 Choose Icing Style</div>

                  {/* Icing type selector */}
                  <select
                    value={selectedIcingType?.id ?? ''}
                    onChange={(e) => {
                      const type = icingTypes.find(t => t.id === e.target.value);
                      if (type) selectIcingType(type);
                    }}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-gray-700 cursor-pointer"
                  >
                    <option value="">— Choose an icing family —</option>
                    {icingTypes.map(t => <option key={t.id} value={t.id}>{t.emoji} {t.name}</option>)}
                  </select>

                  {/* Recipe preset — recommended first, then all */}
                  {selectedIcingType && selectedIcingType.recipes.length > 0 && (
                    <>
                      <select
                        value={selectedIcingName ?? ''}
                        onChange={(e) => {
                          const preset = selectedIcingType.recipes.find(r => r.name === e.target.value);
                          if (preset) selectIcing(selectedIcingType, preset);
                        }}
                        className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-gray-700 cursor-pointer"
                      >
                        <option value="">— Select a recipe —</option>
                        {/* Recommended for this cake type first */}
                        {(() => {
                          const recommended = selectedIcingType.recipes.filter(r => r.pairsWell.includes(selectedType.id));
                          const others = selectedIcingType.recipes.filter(r => !r.pairsWell.includes(selectedType.id));
                          const hasGroups = selectedIcingType.recipes.some(r => r.group);

                          if (!hasGroups) {
                            return [
                              recommended.length > 0 && (
                                <optgroup key="recommended" label={`⭐ Recommended for ${selectedType.name}`}>
                                  {recommended.map(r => <option key={r.name} value={r.name}>{r.emoji} {r.name}</option>)}
                                </optgroup>
                              ),
                              others.length > 0 && (
                                <optgroup key="others" label="All Recipes">
                                  {others.map(r => <option key={r.name} value={r.name}>{r.emoji} {r.name}</option>)}
                                </optgroup>
                              ),
                            ];
                          }

                          // Group mode — show recommended group first then normal groups
                          const groups: Record<string, typeof selectedIcingType.recipes> = {};
                          selectedIcingType.recipes.forEach(r => {
                            const g = r.group ?? 'Other';
                            if (!groups[g]) groups[g] = [];
                            groups[g].push(r);
                          });

                          return [
                            recommended.length > 0 && (
                              <optgroup key="recommended" label={`⭐ Best for ${selectedType.name}`}>
                                {recommended.map(r => <option key={r.name} value={r.name}>{r.emoji} {r.name}</option>)}
                              </optgroup>
                            ),
                            ...Object.entries(groups).map(([group, recipes]) => (
                              <optgroup key={group} label={group}>
                                {recipes.map(r => <option key={r.name} value={r.name}>{r.emoji} {r.name}</option>)}
                              </optgroup>
                            )),
                          ];
                        })()}
                      </select>
                      {selectedIcingName && (
                        <p className="mt-1.5 text-xs text-gray-400 italic px-1">
                          {selectedIcingType.recipes.find(r => r.name === selectedIcingName)?.description}
                        </p>
                      )}
                    </>
                  )}
                </div>

                {/* ── Coverage Calculator ── */}
                {icingRecipe.length > 0 && (
                  <div className="mb-4 pb-4 border-b border-gray-100 bg-pink-50 rounded-xl p-4">
                    <div className="text-xs font-bold text-pink-600 uppercase tracking-wide mb-3">📐 Coverage Calculator</div>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Diameter</label>
                        <select value={coverageDiameter} onChange={e => setCoverageDiameter(Number(e.target.value))}
                          className="w-full text-xs border border-pink-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 cursor-pointer">
                          {DIAMETER_OPTIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Layers</label>
                        <input type="number" min={1} max={10} value={coverageLayers}
                          onChange={e => setCoverageLayers(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full text-xs border border-pink-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 text-center" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Style</label>
                        <select value={coverageStyle} onChange={e => setCoverageStyle(e.target.value as CoverageStyle)}
                          className="w-full text-xs border border-pink-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 cursor-pointer">
                          {Object.entries(COVERAGE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Result row */}
                    <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-pink-200">
                      <div>
                        <div className="text-xs text-gray-500">Icing needed</div>
                        <div className="text-sm font-bold text-gray-900">
                          {coverage.gramsNeeded}g &nbsp;·&nbsp;
                          {(coverage.gramsNeeded / 453.592).toFixed(2)} lb
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Scale factor</div>
                        <div className={`text-sm font-bold ${coverage.scaleFactor > 1.2 ? 'text-red-600' : coverage.scaleFactor < 0.8 ? 'text-blue-600' : 'text-green-600'}`}>
                          ×{coverage.scaleFactor.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    {coverage.scaleFactor !== 1 && icingBaseGrams > 0 && (
                      <p className="mt-2 text-xs text-pink-600 italic">
                        {coverage.scaleFactor > 1
                          ? `Recipe makes ${icingBaseGrams}g — multiply all amounts by ×${coverage.scaleFactor.toFixed(2)} to cover your cake.`
                          : `Recipe makes ${icingBaseGrams}g — you'll have leftover icing (scale to ×${coverage.scaleFactor.toFixed(2)} to use exactly).`}
                      </p>
                    )}
                  </div>
                )}

                {/* ── Icing ingredient list ── */}
                {Object.entries(groupedIcing).map(([cat, items]) => (
                  <div key={cat} className="mb-4">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1 px-1">
                      {CAT_CONFIG[cat]?.emoji} {CAT_CONFIG[cat]?.label ?? cat}
                    </div>
                    {items.map((ing) => (
                      <IngredientRow key={ing.recipeId} ing={ing} mode={mode}
                        onAmountChange={updateIcingAmount} onSwap={swapIcingIngredient} onRemove={removeIcingIngredient} />
                    ))}
                  </div>
                ))}

                {icingRecipe.length === 0 && (
                  <div className="text-center py-6 text-gray-400 text-sm">
                    Select an icing style above or click Add to start from scratch.
                  </div>
                )}

                {icingRecipe.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">Icing Weight</span>
                    <span className="text-sm font-bold text-gray-900">
                      {/* Always show weight in metric or imperial — volumetric doesn't apply to total weight */}
                      {mode === 'imperial'
                        ? (icingMetrics?.totalWeight ?? 0) >= 450
                          ? `${((icingMetrics?.totalWeight ?? 0) / 453.592).toFixed(2)} lb`
                          : `${((icingMetrics?.totalWeight ?? 0) / 28.3495).toFixed(1)} oz`
                        : `${Math.round(icingMetrics?.totalWeight ?? 0)} g`}
                    </span>
                  </div>
                )}

                {/* Add ingredient button — always at the bottom */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => setShowAddIcing(true)}
                    className="flex items-center justify-center gap-1.5 w-full bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium px-3 py-2 rounded-xl transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Ingredient
                  </button>
                </div>
              </>
            )}
          </div>
          </div>{/* end LEFT column */}

          {/* RIGHT — Tabs */}
          <div>
            {/* Tab nav */}
            <div className="flex bg-white rounded-2xl shadow-sm p-1 mb-4">
              {(['metrics', 'nutrition', 'baking'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === tab ? 'text-white shadow' : 'text-gray-500 hover:text-gray-800'}`}
                  style={activeTab === tab ? { background: 'linear-gradient(135deg, #c0392b, #e67e22)' } : {}}
                >
                  {tab === 'metrics' ? '🔬 Science' : tab === 'nutrition' ? '📋 Nutrition' : '🔥 Baking'}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === 'metrics' && <MetricsDisplay metrics={metrics} icingMetrics={icingMetrics} combinedMetrics={combinedMetrics} />}
            {activeTab === 'nutrition' && (
              <NutritionFacts
                metrics={metrics}
                icingMetrics={icingMetrics}
                combinedMetrics={combinedMetrics}
                servingSize={Math.round(metrics.totalWeight / servings)}
                servingsPerRecipe={servings}
              />
            )}
            {activeTab === 'baking' && (
              <BakingInstructions
                cakeTypeId={selectedType.id}
                totalWeight={metrics.totalWeight}
                servings={servings}
                measurementMode={mode}
                icingTypeId={selectedIcingType?.id ?? null}
                icingName={selectedIcingName}
                hasIcing={icingRecipe.length > 0}
              />
            )}
          </div>
        </div>
      </main>

      {showAdd && (
        <AddModal existing={recipe} onAdd={(ing) => { addIngredient(ing); }} onClose={() => setShowAdd(false)} />
      )}
      {showAddIcing && (
        <AddModal existing={icingRecipe} onAdd={(ing) => { addIcingIngredient(ing); }} onClose={() => setShowAddIcing(false)} />
      )}
      {showPantry && (
        <PantryModal
          onClose={() => setShowPantry(false)}
          onSelectRecipe={(cakeType, recipe) => {
            selectRecipe(cakeType, recipe);
            setShowPantry(false);
          }}
        />
      )}
    </div>
  );
}
