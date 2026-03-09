import { RecipeIngredient, CakeMetrics } from '../types/cake';
import { ingredientsDatabase } from '../data/ingredients';

// ─── Taste fingerprints per ingredient id ────────────────────
// Each entry maps an ingredient id to flavour signal weights (0–1)
const TASTE_SIGNALS: Record<string, {
  chocolate?: number; fruit?: number; tart?: number; bitter?: number;
  nutty?: number; spice?: number; floral?: number; caramel?: number;
  citrus?: number; tropical?: number; earthy?: number; boozy?: number;
  savory?: number; minty?: number; coffee?: number; coconut?: number;
}> = {
  // chocolate family
  'cocoa-natural':    { chocolate:1.0, bitter:0.8 },
  'cocoa-dutch':      { chocolate:1.0, bitter:0.6 },
  'choc-dark-bar':    { chocolate:1.0, bitter:0.7 },
  'choc-milk-bar':    { chocolate:0.8 },
  'choc-white-chips': { chocolate:0.3 },
  'choc-semi-chips':  { chocolate:0.9, bitter:0.4 },
  'cacao-nibs':       { chocolate:0.9, bitter:0.9 },
  'nutella':          { chocolate:0.7, nutty:0.6 },
  'ganache':          { chocolate:0.9, bitter:0.3 },
  'butterscotch':     { caramel:0.9 },
  'caramel-chips':    { caramel:0.9 },
  'caramel-sauce':    { caramel:1.0 },
  'pb-chips':         { nutty:0.9 },
  'cinnamon-chips':   { spice:0.8 },

  // fruits
  'fruit-blueberry':  { fruit:1.0, tart:0.5 },
  'fruit-raspberry':  { fruit:1.0, tart:0.9 },
  'fruit-strawberry': { fruit:1.0, tart:0.4 },
  'fruit-cherry':     { fruit:1.0, tart:0.5 },
  'fruit-banana':     { fruit:0.9, tropical:0.5 },
  'fruit-apple':      { fruit:0.8, tart:0.3 },
  'fruit-pumpkin':    { fruit:0.5, earthy:0.5 },
  'fruit-zucchini':   { earthy:0.4 },
  'fruit-carrot':     { earthy:0.4, fruit:0.3 },
  'zest-lemon':       { citrus:1.0, tart:0.9 },
  'zest-orange':      { citrus:1.0, tart:0.4 },
  'fruit-cranberry-d':{ fruit:0.8, tart:1.0 },
  'fruit-raisin':     { fruit:0.7, caramel:0.3 },
  'fruit-apricot-d':  { fruit:0.9, tart:0.5 },
  'fruit-maraschino': { fruit:0.7 },
  'coconut-flakes':   { coconut:1.0 },
  'coconut-shredded': { coconut:1.0 },
  'fruit-mango':      { fruit:1.0, tropical:0.9 },
  'fruit-pineapple':  { fruit:0.9, tropical:1.0, tart:0.5 },
  'fruit-dates':      { fruit:0.7, caramel:0.5 },
  'fruit-fig':        { fruit:0.8, earthy:0.3 },
  'fruit-peach':      { fruit:1.0, tart:0.3 },

  // nuts
  'nut-walnut':     { nutty:1.0, bitter:0.3 },
  'nut-pecan':      { nutty:1.0, caramel:0.3 },
  'nut-almond':     { nutty:0.9 },
  'nut-hazelnut':   { nutty:1.0 },
  'nut-macadamia':  { nutty:0.8 },
  'nut-pistachio':  { nutty:0.9 },
  'nut-cashew':     { nutty:0.8 },
  'nut-pine':       { nutty:0.7 },
  'nut-peanut':     { nutty:1.0, savory:0.3 },
  'seed-sesame':    { nutty:0.7, savory:0.3 },
  'seed-chia':      { nutty:0.3 },

  // spices
  'spice-cinnamon':    { spice:1.0 },
  'spice-nutmeg':      { spice:0.9 },
  'spice-cardamom':    { spice:0.9, floral:0.4 },
  'spice-ginger':      { spice:1.0 },
  'spice-cloves':      { spice:1.0 },
  'spice-pumpkin-pie': { spice:1.0 },
  'spice-lavender':    { floral:1.0, spice:0.3 },
  'spice-allspice':    { spice:0.9 },

  // flavorings / extracts
  'vanilla-extract': { },
  'vanilla-paste':   { },
  'almond-extract':  { nutty:0.5 },
  'peppermint-ext':  { minty:1.0 },
  'lemon-extract':   { citrus:1.0, tart:0.7 },
  'rose-water':      { floral:1.0 },
  'orange-blossom':  { floral:0.9, citrus:0.5 },
  'espresso-powder': { coffee:1.0, bitter:0.8 },
  'matcha-powder':   { earthy:0.7, bitter:0.6 },

  // fillings
  'peanut-butter':   { nutty:1.0, savory:0.4 },
  'almond-butter':   { nutty:0.9 },
  'tahini':          { nutty:0.8, savory:0.5, bitter:0.3 },
  'jam-strawberry':  { fruit:1.0, tart:0.4 },
  'jam-raspberry':   { fruit:1.0, tart:0.8 },
  'lemon-curd':      { citrus:1.0, tart:0.9 },
  'dulce-de-leche':  { caramel:1.0 },

  // sugars with notable flavour
  'sugar-brown-dk':  { caramel:0.4 },
  'honey':           { caramel:0.3, floral:0.3 },
  'maple-syrup':     { caramel:0.7 },
  'molasses':        { caramel:0.8, bitter:0.4 },

  // fats with flavour
  'butter-brown':    { caramel:0.6 },
  'oil-coconut':     { coconut:0.5 },

  // dairy
  'milk-buttermilk': { tart:0.2 },   // tangy but background note, not dominant
  'cream-cheese':    { tart:0.12 },  // mildly tangy (pH ~4.4) — not lemon-level tart
};

// How much of each ingredient (in g) constitutes a "full" signal contribution
const TASTE_SATURATION: Record<string, number> = {
  chocolate: 80,   // 80g cocoa → full chocolate
  fruit: 200,
  tart: 150,
  bitter: 60,
  nutty: 100,
  spice: 15,
  floral: 8,
  caramel: 100,
  citrus: 20,
  tropical: 150,
  earthy: 150,
  boozy: 60,
  savory: 50,
  minty: 5,
  coffee: 10,
  coconut: 120,
};

type FlavorKey = keyof typeof TASTE_SATURATION;

const FLAVOR_LABELS: Record<FlavorKey, string> = {
  chocolate: 'Chocolate',
  fruit:     'Fruity',
  tart:      'Tart',
  bitter:    'Bitter',
  nutty:     'Nutty',
  spice:     'Spiced',
  floral:    'Floral',
  caramel:   'Caramel',
  citrus:    'Citrus',
  tropical:  'Tropical',
  earthy:    'Earthy',
  boozy:     'Boozy',
  savory:    'Savory',
  minty:     'Minty',
  coffee:    'Coffee',
  coconut:   'Coconut',
};

const FLAVOR_EMOJIS: Record<FlavorKey, string> = {
  chocolate: '🍫',
  fruit:     '🍓',
  tart:      '🍋',
  bitter:    '😬',
  nutty:     '🥜',
  spice:     '🌶️',
  floral:    '🌸',
  caramel:   '🍯',
  citrus:    '🍊',
  tropical:  '🌴',
  earthy:    '🌿',
  boozy:     '🥃',
  savory:    '🧂',
  minty:     '🌱',
  coffee:    '☕',
  coconut:   '🥥',
};

export function calculateCakeMetrics(recipeIngredients: RecipeIngredient[]): CakeMetrics {
  let totalWeight = 0;
  let totalCalories = 0;
  let totalProtein = 0;
  let totalFat = 0;
  let totalSaturatedFat = 0;
  let totalTransFat = 0;
  let totalPolyFat = 0;
  let totalMonoFat = 0;
  let totalCholesterol = 0;
  let totalCarbs = 0;
  let totalSugar = 0;
  let totalFiber = 0;
  let totalSodium = 0;

  let flourWeight = 0;
  let fatWeight = 0;
  let sugarWeight = 0;
  let liquidWeight = 0;
  let eggWeight = 0;
  let leavenChemical = 0;
  let leavenMechanical = 0;
  let leavenEgg = 0;

  // Accumulated raw flavour signals (in gram-weighted units)
  const rawSignals: Record<FlavorKey, number> = {
    chocolate:0, fruit:0, tart:0, bitter:0, nutty:0, spice:0,
    floral:0, caramel:0, citrus:0, tropical:0, earthy:0, boozy:0,
    savory:0, minty:0, coffee:0, coconut:0,
  };

  recipeIngredients.forEach((ri) => {
    const ing = ingredientsDatabase.find((i) => i.id === ri.id);
    if (!ing) return;

    const w = ri.amount;
    totalWeight += w;

    const f = w / 100;
    totalCalories += ing.calories * f;
    totalProtein  += ing.protein  * f;
    totalFat      += ing.fat      * f;
    totalSaturatedFat += (ing.saturatedFat  ?? 0) * f;
    totalTransFat     += (ing.transFat       ?? 0) * f;
    totalPolyFat      += (ing.polyunsaturatedFat ?? 0) * f;
    totalMonoFat      += (ing.monounsaturatedFat ?? 0) * f;
    totalCholesterol  += (ing.cholesterol    ?? 0) * f;
    totalCarbs    += ing.carbs    * f;
    totalSugar    += ing.sugar    * f;
    totalFiber    += ing.fiber    * f;
    totalSodium   += ing.sodium   * f;

    if (ing.category === 'flour') flourWeight += w;
    if (ing.category === 'fat')   fatWeight   += w;
    if (ing.category === 'sugar') sugarWeight += w;
    if (ing.category === 'liquid' || ing.category === 'dairy') liquidWeight += w;
    if (ing.category === 'egg') {
      eggWeight += w;
      if (ing.name.toLowerCase().includes('white')) leavenEgg += w;
    }
    if (ing.category === 'leavening') {
      if (ing.name.toLowerCase().includes('powder') || ing.name.toLowerCase().includes('soda')) {
        leavenChemical += w;
      }
    }
    if (ing.category === 'fat' && ing.name.toLowerCase().includes('butter')) {
      leavenMechanical += w;
    }

    // Accumulate taste signals
    const signals = TASTE_SIGNALS[ri.id];
    if (signals) {
      (Object.keys(signals) as FlavorKey[]).forEach((key) => {
        rawSignals[key] += w * (signals[key] ?? 0);
      });
    }
  });

  const per100 = totalWeight > 0 ? 100 / totalWeight : 0;

  // Ratios
  const flourRatio   = totalWeight > 0 ? (flourWeight  / totalWeight) * 100 : 0;
  const fatRatio     = totalWeight > 0 ? (fatWeight    / totalWeight) * 100 : 0;
  const sugarRatio   = totalWeight > 0 ? (sugarWeight  / totalWeight) * 100 : 0;
  const liquidRatio  = totalWeight > 0 ? (liquidWeight / totalWeight) * 100 : 0;

  // Science scores
  const moistureScore = Math.min(100, Math.max(0, Math.round(
    (liquidRatio * 1.2) + (eggWeight / Math.max(1, totalWeight) * 30) + 10
  )));
  const tendernessScore = Math.min(100, Math.max(0, Math.round(
    (fatRatio * 1.5) + (sugarRatio * 0.5) - (flourRatio * 0.3) + 20
  )));
  const sweetnessScore = Math.min(100, Math.max(0, Math.round(sugarRatio * 1.6)));
  const richnessScore  = Math.min(100, Math.max(0, Math.round(
    (fatRatio * 1.8) + (totalFat * per100 * 0.3)
  )));
  const lightnessScore = Math.min(100, Math.max(0, Math.round(
    (leavenChemical / Math.max(1, flourWeight) * 2000) +
    (leavenEgg / Math.max(1, totalWeight) * 100) +
    (leavenMechanical / Math.max(1, fatWeight) * 30) + 10
  )));

  // Convert raw signals to 0–100 scores
  const flavorScores: Record<FlavorKey, number> = {} as Record<FlavorKey, number>;
  (Object.keys(rawSignals) as FlavorKey[]).forEach((key) => {
    const sat = TASTE_SATURATION[key] ?? 100;
    flavorScores[key] = Math.min(100, Math.round((rawSignals[key] / sat) * 100));
  });

  // Build flavor profile — present flavours above threshold, sorted by strength
  const THRESHOLD = 15;
  const flavorProfile: string[] = (Object.keys(flavorScores) as FlavorKey[])
    .filter(k => flavorScores[k] >= THRESHOLD)
    .sort((a, b) => flavorScores[b] - flavorScores[a])
    .map(k => `${FLAVOR_EMOJIS[k]} ${FLAVOR_LABELS[k]}`);

  // Dominant flavor
  const topFlavors = (Object.keys(flavorScores) as FlavorKey[])
    .filter(k => flavorScores[k] >= THRESHOLD)
    .sort((a, b) => flavorScores[b] - flavorScores[a]);

  let dominantFlavor = 'Classic Vanilla';
  if (topFlavors.length > 0) {
    dominantFlavor = `${FLAVOR_EMOJIS[topFlavors[0]]} ${FLAVOR_LABELS[topFlavors[0]]}`;
  }

  // Taste notes — human-readable sentence
  let tasteNotes = buildTasteNotes(topFlavors, flavorScores, sweetnessScore, flavorProfile.length);

  // ── Taste warnings — with personality ────────────────────────
  const tasteWarnings: string[] = [];

  // ── Per-ingredient witty checks ───────────────────────────────
  // Cup equivalents: 1 cup flour ≈ 120g, sugar ≈ 200g, butter ≈ 227g, liquid ≈ 240g
  recipeIngredients.forEach((ri) => {
    const ing = ingredientsDatabase.find((i) => i.id === ri.id);
    if (!ing) return;
    const w = ri.amount;
    const name = ing.name.toLowerCase();

    // Vanilla — anything over ~3 tsp (15g) is aggressive, over 30g is absurd
    if ((name.includes('vanilla extract') || name.includes('vanilla paste') || name.includes('vanilla bean paste'))) {
      if (w >= 45) tasteWarnings.push('🌿 That\'s essentially vanilla soup with a little cake mixed in. Bold.');
      else if (w >= 25) tasteWarnings.push('🌿 Vanilla overload — your kitchen will smell incredible, but this might taste like perfume.');
      else if (w >= 15) tasteWarnings.push('🌿 Heavy on the vanilla — you clearly know what you want in life.');
    }

    // Sugar — over 60% of total is wild
    // (handled by ratio below, but also check raw grams)
    if (ing.category === 'sugar') {
      if (w >= 800) tasteWarnings.push('🍬 That\'s not a cake, that\'s a sugar delivery vehicle with structural ambitions.');
      else if (w >= 500) tasteWarnings.push('🍬 Dentists in your area have mysteriously started smiling.');
      else if (w >= 400) tasteWarnings.push('🍬 This cake is going to need its own insulin prescription.');
    }

    // Butter — over 400g is a lot
    if (ing.category === 'fat' && name.includes('butter')) {
      if (w >= 500) tasteWarnings.push('🧈 More butter than a French restaurant on a Saturday night.');
      else if (w >= 350) tasteWarnings.push('🧈 Julia Child would nod approvingly. Your cardiologist, less so.');
      else if (w >= 250) tasteWarnings.push('🧈 Generously buttered — this cake will be rich and deeply satisfying.');
    }

    // Salt — over 15g is a lot
    if (name === 'salt' || name.includes('sea salt')) {
      if (w >= 20) tasteWarnings.push('🧂 That\'s more salt than a bag of pretzels. Is this a cake or a brine?');
      else if (w >= 12) tasteWarnings.push('🧂 Heavy on the salt — are you sure you\'re not making focaccia?');
    }

    // Cocoa — over 120g starts getting intense
    if (name.includes('cocoa')) {
      if (w >= 150) tasteWarnings.push('🍫 Cocoa levels approaching weaponized bitterness. Have sugar nearby.');
      else if (w >= 100) tasteWarnings.push('🍫 Deep, dark, and seriously chocolatey — this will wake people up.');
    }

    // Espresso / coffee
    if (name.includes('espresso') || name.includes('instant coffee')) {
      if (w >= 30) tasteWarnings.push('☕ This much espresso might technically count as a stimulant. Proceed with joy.');
      else if (w >= 15) tasteWarnings.push('☕ Bold coffee presence — the adults at the party will thank you.');
    }

    // Alcohol
    if (name.includes('rum') || name.includes('bourbon') || name.includes('whiskey') || name.includes('brandy') || name.includes('kahlua')) {
      if (w >= 120) tasteWarnings.push('🥃 At this point you might as well serve the bottle alongside the cake.');
      else if (w >= 60) tasteWarnings.push('🥃 Boozy and bold — this cake has clearly lived a little.');
      else if (w >= 30) tasteWarnings.push('🥃 A pleasant warmth — suitable for adults and interesting dinner parties.');
    }

    // Lemon / lime juice raw
    if ((name.includes('lemon juice') || name.includes('lime juice')) && !name.includes('extract')) {
      if (w >= 120) tasteWarnings.push('🍋 This is essentially a citrus assault. Pucker up.');
      else if (w >= 60) tasteWarnings.push('🍋 Very tart and bright — make sure your sugar levels can keep up.');
    }

    // Hot sauce / cayenne (spicy)
    if (name.includes('cayenne') || name.includes('hot sauce') || name.includes('chili')) {
      if (w >= 10) tasteWarnings.push('🌶️ Spicy cake? You\'re either a genius or conducting an experiment. Respect either way.');
      else if (w >= 4) tasteWarnings.push('🌶️ A little heat in a cake — adventurous and surprisingly good with chocolate.');
    }

    // Matcha
    if (name.includes('matcha')) {
      if (w >= 40) tasteWarnings.push('🍵 That\'s an extremely intense matcha hit — you\'re basically baking a tea ceremony.');
      else if (w >= 20) tasteWarnings.push('🍵 Bold matcha — earthy, grassy, and not for the faint of heart.');
    }

    // Cream cheese (in a cake batter — not icing)
    if (name.includes('cream cheese') && w >= 500) {
      tasteWarnings.push('🧀 At this point the line between cake and cheesecake is a philosophical question.');
    }

    // Oil — over 300g
    if (ing.category === 'fat' && (name.includes('oil'))) {
      if (w >= 350) tasteWarnings.push('🫙 This cake is going to be incredibly moist. Possibly concerningly moist.');
    }

    // Eggs — unusual quantities
    if (ing.category === 'egg' && !name.includes('white') && !name.includes('yolk')) {
      const eggCount = Math.round(w / 50);
      if (eggCount >= 8) tasteWarnings.push(`🥚 ${eggCount} eggs? This cake is basically a very sweet omelette.`);
      else if (eggCount >= 6) tasteWarnings.push(`🥚 ${eggCount} eggs is a commitment — rich, custardy, and eggy in a good way.`);
    }

    // Almond extract — very potent, over 8g is a lot
    if (name.includes('almond extract')) {
      if (w >= 12) tasteWarnings.push('🌸 That\'s a lot of almond extract — warning: may taste like marzipan furniture polish.');
      else if (w >= 8) tasteWarnings.push('🌸 Strong almond extract presence — reminiscent of amaretto, maraschino cherries, and sunscreen.');
    }

    // Peanut butter
    if (name.includes('peanut butter') && w >= 400) {
      tasteWarnings.push('🥜 This is basically a cake-shaped peanut butter cup. That\'s a compliment.');
    }

    // Sour cream / yogurt — high acidity base
    if ((name.includes('sour cream') || name.includes('greek yogurt')) && w >= 400) {
      tasteWarnings.push('😮 That\'s a lot of cultured dairy — your cake will be tangy, tender, and very opinionated.');
    }
  });

  // ── Ratio-based witty checks (whole recipe) ──────────────────

  // Sugar ratio > 50% — diabetes cake
  if (sugarRatio > 55) {
    tasteWarnings.push('🩺 Sugar is more than half this recipe by weight. Your pancreas would like a word.');
  } else if (sugarRatio > 45) {
    tasteWarnings.push('🍬 Exceptionally sweet — this cake doesn\'t need frosting, it needs a warning label.');
  }

  // Fat ratio > 45% — heart attack cake
  if (fatRatio > 50) {
    tasteWarnings.push('❤️ Fat is over half this recipe. Delicious, but maybe share it with a lot of people.');
  } else if (fatRatio > 40) {
    tasteWarnings.push('🧈 Extremely rich fat content — this cake will be incredibly tender and also very filling.');
  }

  // No flour at all (flourless cake) — informational
  if (flourWeight === 0 && totalWeight > 200) {
    tasteWarnings.push('✨ No flour detected — this is intentional, right? Flourless cakes are amazing but structurally brave.');
  }

  // Almost no liquid
  if (liquidWeight < 20 && flourWeight > 100 && totalWeight > 300) {
    tasteWarnings.push('🏜️ Very little liquid — this batter will be very stiff. Intentional (like shortbread) or worth double-checking?');
  }

  // More sugar than flour — unusual
  if (sugarWeight > flourWeight * 1.5 && flourWeight > 0) {
    tasteWarnings.push('🍰 More sugar than flour — this will be dense, sweet, and fudgy. A candy bar in cake form.');
  }

  // More fat than flour — unusual
  if (fatWeight > flourWeight * 1.2 && flourWeight > 50) {
    tasteWarnings.push('🧈 More fat than flour — incredibly rich. Think financier or kouign-amann territory.');
  }

  // Science-based warnings (kept but given personality)
  if (flavorScores.bitter > 70) tasteWarnings.push('🍫 Intensely bitter — this needs sugar to balance it, or it\'s a very adult chocolate experience.');
  if (flavorScores.tart   > 80) tasteWarnings.push('🍋 Very tart — your mouth will know exactly what hit it. Balance with sweetness.');
  if (flavorScores.spice  > 80) tasteWarnings.push('🌶️ Heavily spiced — subtle this is not. Season\'s greetings from your sinuses.');
  if (flavorScores.savory > 60) tasteWarnings.push('🧅 This cake has a noticeably savory edge. Intentional? If so, you\'re interesting at parties.');
  if (flavorScores.minty  > 50) tasteWarnings.push('🌿 Strong mint — pairs beautifully with chocolate, slightly alarming on its own.');
  if (sweetnessScore < 15 && totalWeight > 100) tasteWarnings.push('😐 Very low sweetness — are you making cake or bread? Both are valid, just checking.');

  // Deduplicate (in case combined mode hits same ingredient twice)
  const uniqueWarnings = [...new Set(tasteWarnings)];

  // Qualitative predictions
  let glutenDevelopment = 'Medium';
  if (flourRatio < 20) glutenDevelopment = 'Low';
  else if (flourRatio > 40) glutenDevelopment = 'High';

  let leavenType = 'Chemical';
  if (leavenEgg > 80 && leavenChemical < 5) leavenType = 'Mechanical (Egg Foam)';
  else if (leavenMechanical > 100 && leavenChemical > 3) leavenType = 'Double (Cream + Chemical)';
  else if (leavenEgg > 50 && leavenChemical > 3) leavenType = 'Double (Foam + Chemical)';
  else if (leavenChemical < 1 && leavenEgg < 20) leavenType = 'None (Custard/Fudge)';

  let predictedCrumb = 'Medium & Tender';
  if (lightnessScore > 65 && fatRatio < 25) predictedCrumb = 'Open & Airy';
  else if (fatRatio > 35 || (flourRatio < 18 && eggWeight > 150)) predictedCrumb = 'Fine & Dense';

  let shelfLife = '2–3 days';
  if (fatRatio > 30) shelfLife = '4–5 days';
  if (liquidRatio > 40) shelfLife = '1–2 days';
  if (flourRatio < 5) shelfLife = '3–5 days (refrigerated)';

  let bakingTemp = '350°F / 175°C';
  if (sugarRatio > 45) bakingTemp = '325°F / 165°C (lower to prevent burning)';
  else if (flourRatio < 10) bakingTemp = '325°F / 165°C (custard)';
  else if (lightnessScore > 70) bakingTemp = '375°F / 190°C (quick rise)';

  return {
    totalWeight,
    calories:           totalCalories      * per100,
    protein:            totalProtein       * per100,
    fat:                totalFat           * per100,
    saturatedFat:       totalSaturatedFat  * per100,
    transFat:           totalTransFat      * per100,
    polyunsaturatedFat: totalPolyFat       * per100,
    monounsaturatedFat: totalMonoFat       * per100,
    cholesterol:        totalCholesterol   * per100,
    carbs:              totalCarbs         * per100,
    sugar:              totalSugar         * per100,
    fiber:              totalFiber         * per100,
    sodium:             totalSodium        * per100,
    moistureScore,
    tendernessScore,
    sweetnessScore,
    richnessScore,
    lightnessScore,
    flourRatio,
    fatRatio,
    sugarRatio,
    liquidRatio,
    glutenDevelopment,
    leavenType,
    predictedCrumb,
    shelfLife,
    bakingTemp,
    flavorProfile,
    dominantFlavor,
    tasteNotes,
    bitternessScore:  flavorScores.bitter,
    tartScore:        flavorScores.tart,
    nuttinessScore:   flavorScores.nutty,
    spiceScore:       flavorScores.spice,
    fruitinessScore:  flavorScores.fruit,
    chocolateScore:   flavorScores.chocolate,
    tasteWarnings: uniqueWarnings,
  };
}

function buildTasteNotes(
  topFlavors: FlavorKey[],
  scores: Record<FlavorKey, number>,
  sweetnessScore: number,
  profileLength: number,
): string {
  if (topFlavors.length === 0) {
    return sweetnessScore > 50
      ? 'A clean, sweet base — vanilla and butter come through clearly.'
      : 'Mild and lightly sweet with a neutral, classic profile.';
  }

  const top = topFlavors[0];
  const second = topFlavors[1];

  const sweetDesc = sweetnessScore > 70 ? 'sweet' : sweetnessScore > 40 ? 'mildly sweet' : 'not very sweet';

  const combos: Record<string, string> = {
    'chocolate+fruit':   'A rich chocolate base brightened by fruity notes — think chocolate-covered strawberries.',
    'chocolate+tart':    'Deep chocolate with a sharp, tangy edge that cuts through the richness.',
    'chocolate+nutty':   'Indulgent chocolate and toasty nuts — a classic pairing with great depth.',
    'chocolate+caramel': 'Luxurious chocolate and buttery caramel — deeply rich and complex.',
    'chocolate+coffee':  'Intense mocha flavour — coffee amplifies the chocolate bitterness beautifully.',
    'chocolate+spice':   'Spiced chocolate with warming notes — reminiscent of Mexican hot chocolate.',
    'fruit+tart':        'Bright and tangy fruit flavours — fresh and vibrant with a lively acidity.',
    'fruit+citrus':      'Zesty citrus-forward fruit flavour — light, fresh and aromatic.',
    'fruit+tropical':    'Tropical and fruity — sunny, exotic flavours with natural sweetness.',
    'fruit+caramel':     'Sweet caramelised fruit — like a warm fruit tart.',
    'spice+caramel':     'Warm spice with rich caramel sweetness — cosy and autumnal.',
    'spice+fruit':       'Fragrant spice wrapped around bright fruit — like a classic spiced fruit cake.',
    'spice+earthy':      'Deeply aromatic spiced notes with earthy undertones — complex and warming.',
    'nutty+caramel':     'Toasted nuts and buttery caramel — rich, indulgent and deeply satisfying.',
    'citrus+floral':     'Delicate floral notes with bright citrus — elegant and aromatic.',
    'coconut+tropical':  'Lush tropical coconut — exotic and creamy.',
    'caramel+coffee':    'Salted caramel and coffee — rich, bittersweet and addictive.',
  };

  if (second) {
    const key1 = `${top}+${second}`;
    const key2 = `${second}+${top}`;
    if (combos[key1]) return combos[key1];
    if (combos[key2]) return combos[key2];
  }

  const singles: Record<FlavorKey, string> = {
    chocolate: `Rich, ${sweetDesc} chocolate dominates — deep and indulgent.`,
    fruit:     `Fresh, ${sweetDesc} fruit flavours lead — light and vibrant.`,
    tart:      `A noticeably tart, tangy flavour that keeps things bright and lively.`,
    bitter:    `Bold bitter notes take centre stage — best balanced with sweetness.`,
    nutty:     `Warm, toasty nuttiness throughout — rich and satisfying.`,
    spice:     `Fragrant warming spices — aromatic and comforting.`,
    floral:    `Delicate floral notes — subtle, perfumed and elegant.`,
    caramel:   `Warm, buttery caramel notes — indulgent and deeply sweet.`,
    citrus:    `Bright citrus zest — fresh, aromatic and tangy.`,
    tropical:  `Sun-drenched tropical flavours — exotic and sweet.`,
    earthy:    `Earthy, wholesome notes — rustic and grounded.`,
    boozy:     `Noticeable boozy warmth — rich and complex.`,
    savory:    `Unexpected savory edge — distinctive and bold.`,
    minty:     `Cool, refreshing mint — clean and aromatic.`,
    coffee:    `Bold coffee notes — rich, roasted and slightly bitter.`,
    coconut:   `Creamy coconut flavour — tropical and lightly sweet.`,
  };

  return singles[top] ?? 'A balanced, classic flavour profile.';
}

export function getScoreLabel(score: number): string {
  if (score < 20) return 'Very Low';
  if (score < 40) return 'Low';
  if (score < 60) return 'Medium';
  if (score < 80) return 'High';
  return 'Very High';
}

export function getScoreColor(score: number): string {
  if (score < 25) return '#60a5fa';
  if (score < 50) return '#34d399';
  if (score < 75) return '#fbbf24';
  return '#f87171';
}
