// ============================================================
// ICING TYPES — families, base formulas, and recipe presets
// pairsWell: cake type IDs this icing is recommended for
// ============================================================

export interface IcingRecipe {
  name: string;
  emoji: string;
  description: string;
  group?: string;
  pairsWell: string[];   // cake type ids: 'butter','foam','chiffon','oil','flourless','cheesecake','icecream','layer','specialty','small'
  ingredients: { name: string; amount: number }[];
}

export interface IcingType {
  id: string;
  name: string;
  emoji: string;
  description: string;
  baseFormula: { name: string; amount: number }[];
  recipes: IcingRecipe[];
}

export const icingTypes: IcingType[] = [

  // ══════════════════════════════════════════════════════════
  // 1. AMERICAN BUTTERCREAM
  // ══════════════════════════════════════════════════════════
  {
    id: 'american-bc',
    name: 'American Buttercream',
    emoji: '🧈',
    description: 'The classic quick-mix frosting — powdered sugar beaten into butter. Sweet, stable, pipes beautifully.',
    baseFormula: [
      { name: 'Unsalted Butter', amount: 230 },
      { name: 'Powdered Sugar', amount: 480 },
      { name: 'Heavy Cream', amount: 30 },
      { name: 'Vanilla Extract', amount: 5 },
      { name: 'Salt', amount: 2 },
    ],
    recipes: [
      // ── Classic American Buttercreams ──
      { group: 'Classic American Buttercreams', name: 'Vanilla American Buttercream', emoji: '🍦', description: 'The all-purpose frosting — sweet, smooth and endlessly versatile.', pairsWell: ['butter','layer','small','specialty'],
        ingredients: [ { name: 'Unsalted Butter', amount: 230 }, { name: 'Powdered Sugar', amount: 480 }, { name: 'Heavy Cream', amount: 30 }, { name: 'Vanilla Extract', amount: 7 }, { name: 'Salt', amount: 2 } ] },
      { group: 'Classic American Buttercreams', name: 'Chocolate American Buttercream', emoji: '🍫', description: 'Deep cocoa whipped into classic buttercream — rich and chocolatey.', pairsWell: ['butter','layer','small','oil'],
        ingredients: [ { name: 'Unsalted Butter', amount: 230 }, { name: 'Powdered Sugar', amount: 420 }, { name: 'Dutch Cocoa Powder', amount: 60 }, { name: 'Heavy Cream', amount: 45 }, { name: 'Vanilla Extract', amount: 5 }, { name: 'Salt', amount: 2 } ] },
      { group: 'Classic American Buttercreams', name: 'Strawberry American Buttercream', emoji: '🍓', description: 'Fresh strawberry reduction folded into sweet buttercream — naturally pink.', pairsWell: ['butter','small','layer','foam'],
        ingredients: [ { name: 'Unsalted Butter', amount: 230 }, { name: 'Powdered Sugar', amount: 460 }, { name: 'Strawberry Jam', amount: 60 }, { name: 'Heavy Cream', amount: 20 }, { name: 'Vanilla Extract', amount: 4 }, { name: 'Salt', amount: 2 } ] },
      { group: 'Classic American Buttercreams', name: 'Lemon American Buttercream', emoji: '🍋', description: 'Bright lemon zest cuts through the sweetness — fresh and zingy.', pairsWell: ['chiffon','foam','oil','small'],
        ingredients: [ { name: 'Unsalted Butter', amount: 230 }, { name: 'Powdered Sugar', amount: 460 }, { name: 'Heavy Cream', amount: 25 }, { name: 'Lemon Extract', amount: 6 }, { name: 'Salt', amount: 2 } ] },
      { group: 'Classic American Buttercreams', name: 'Salted Caramel Buttercream', emoji: '🍮', description: 'Homemade caramel swirled into buttercream with a generous pinch of salt.', pairsWell: ['butter','layer','oil','specialty'],
        ingredients: [ { name: 'Unsalted Butter', amount: 230 }, { name: 'Powdered Sugar', amount: 400 }, { name: 'Caramel Sauce', amount: 80 }, { name: 'Heavy Cream', amount: 25 }, { name: 'Salt', amount: 5 } ] },
      // ── Flavored American Buttercreams ──
      { group: 'Flavored American Buttercreams', name: 'Peanut Butter Buttercream', emoji: '🥜', description: 'Creamy peanut butter folded into sweet buttercream — nutty and irresistible.', pairsWell: ['oil','layer','small','specialty'],
        ingredients: [ { name: 'Unsalted Butter', amount: 170 }, { name: 'Peanut Butter', amount: 130 }, { name: 'Powdered Sugar', amount: 420 }, { name: 'Heavy Cream', amount: 35 }, { name: 'Vanilla Extract', amount: 4 }, { name: 'Salt', amount: 2 } ] },
      { group: 'Flavored American Buttercreams', name: 'Raspberry Buttercream', emoji: '🫐', description: 'Tart raspberry jam swirled into smooth buttercream — jewel-pink and vivid.', pairsWell: ['foam','chiffon','layer','small'],
        ingredients: [ { name: 'Unsalted Butter', amount: 230 }, { name: 'Powdered Sugar', amount: 450 }, { name: 'Raspberry Jam', amount: 60 }, { name: 'Heavy Cream', amount: 15 }, { name: 'Salt', amount: 2 } ] },
      { group: 'Flavored American Buttercreams', name: 'Maple Buttercream', emoji: '🍁', description: 'Real maple syrup replaces some sugar — warmly sweet with autumn depth.', pairsWell: ['oil','butter','specialty','small'],
        ingredients: [ { name: 'Unsalted Butter', amount: 230 }, { name: 'Powdered Sugar', amount: 380 }, { name: 'Maple Syrup', amount: 60 }, { name: 'Heavy Cream', amount: 20 }, { name: 'Salt', amount: 2 } ] },
      { group: 'Flavored American Buttercreams', name: 'Brown Butter Buttercream', emoji: '🟤', description: 'Browned butter deepens the flavour with a nutty, caramel quality.', pairsWell: ['butter','layer','specialty','oil'],
        ingredients: [ { name: 'Brown Butter', amount: 230 }, { name: 'Powdered Sugar', amount: 480 }, { name: 'Heavy Cream', amount: 30 }, { name: 'Vanilla Extract', amount: 5 }, { name: 'Salt', amount: 3 } ] },
      { group: 'Flavored American Buttercreams', name: 'Espresso Buttercream', emoji: '☕', description: 'Bold espresso powder turns classic buttercream into a mocha dream.', pairsWell: ['layer','specialty','butter','oil'],
        ingredients: [ { name: 'Unsalted Butter', amount: 230 }, { name: 'Powdered Sugar', amount: 460 }, { name: 'Espresso Powder', amount: 8 }, { name: 'Heavy Cream', amount: 30 }, { name: 'Vanilla Extract', amount: 4 }, { name: 'Salt', amount: 2 } ] },
      { group: 'Flavored American Buttercreams', name: 'Coconut Buttercream', emoji: '🥥', description: 'Coconut cream and shredded coconut give a tropical lushness.', pairsWell: ['oil','chiffon','specialty','small'],
        ingredients: [ { name: 'Unsalted Butter', amount: 230 }, { name: 'Powdered Sugar', amount: 450 }, { name: 'Coconut Milk (canned)', amount: 40 }, { name: 'Vanilla Extract', amount: 5 }, { name: 'Salt', amount: 2 } ] },
      { group: 'Flavored American Buttercreams', name: 'Matcha Buttercream', emoji: '🍵', description: 'Earthy ceremonial matcha turns buttercream a gorgeous pale green.', pairsWell: ['chiffon','foam','small','specialty'],
        ingredients: [ { name: 'Unsalted Butter', amount: 230 }, { name: 'Powdered Sugar', amount: 460 }, { name: 'Matcha Powder', amount: 10 }, { name: 'Heavy Cream', amount: 30 }, { name: 'Salt', amount: 2 } ] },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 2. SWISS MERINGUE BUTTERCREAM
  // ══════════════════════════════════════════════════════════
  {
    id: 'swiss-meringue-bc',
    name: 'Swiss Meringue Buttercream',
    emoji: '🥚',
    description: 'Egg whites and sugar cooked over a bain-marie, then whipped with butter. Silky, less sweet, and incredibly smooth.',
    baseFormula: [
      { name: 'Egg White', amount: 180 },
      { name: 'Granulated Sugar', amount: 270 },
      { name: 'Unsalted Butter', amount: 360 },
      { name: 'Vanilla Extract', amount: 6 },
      { name: 'Salt', amount: 1 },
    ],
    recipes: [
      { group: 'Classic Swiss Meringue', name: 'Vanilla Swiss Meringue Buttercream', emoji: '🍦', description: 'The gold standard — silky, buttery and not overly sweet. The professional\'s choice.', pairsWell: ['layer','butter','foam','chiffon'],
        ingredients: [ { name: 'Egg White', amount: 180 }, { name: 'Granulated Sugar', amount: 270 }, { name: 'Unsalted Butter', amount: 360 }, { name: 'Vanilla Bean Paste', amount: 8 }, { name: 'Salt', amount: 1 } ] },
      { group: 'Classic Swiss Meringue', name: 'Chocolate Swiss Meringue Buttercream', emoji: '🍫', description: 'Melted dark chocolate folded into silky SMBC — rich but not heavy.', pairsWell: ['layer','butter','oil','flourless'],
        ingredients: [ { name: 'Egg White', amount: 180 }, { name: 'Granulated Sugar', amount: 270 }, { name: 'Unsalted Butter', amount: 360 }, { name: 'Dark Chocolate Bar', amount: 120 }, { name: 'Vanilla Extract', amount: 5 }, { name: 'Salt', amount: 1 } ] },
      { group: 'Classic Swiss Meringue', name: 'Strawberry Swiss Meringue Buttercream', emoji: '🍓', description: 'Fresh strawberry purée folded into silky SMBC — delicate and elegant.', pairsWell: ['foam','chiffon','layer','small'],
        ingredients: [ { name: 'Egg White', amount: 180 }, { name: 'Granulated Sugar', amount: 270 }, { name: 'Unsalted Butter', amount: 360 }, { name: 'Strawberry Jam', amount: 80 }, { name: 'Vanilla Extract', amount: 4 }, { name: 'Salt', amount: 1 } ] },
      { group: 'Classic Swiss Meringue', name: 'Lemon Swiss Meringue Buttercream', emoji: '🍋', description: 'Bright lemon curd folded into buttery SMBC — tart and silky.', pairsWell: ['chiffon','foam','layer','small'],
        ingredients: [ { name: 'Egg White', amount: 180 }, { name: 'Granulated Sugar', amount: 270 }, { name: 'Unsalted Butter', amount: 360 }, { name: 'Lemon Curd', amount: 80 }, { name: 'Lemon Extract', amount: 4 }, { name: 'Salt', amount: 1 } ] },
      { group: 'Classic Swiss Meringue', name: 'Salted Caramel Swiss Meringue Buttercream', emoji: '🍮', description: 'Caramel sauce streaked through silky SMBC — complex and not too sweet.', pairsWell: ['butter','layer','specialty','oil'],
        ingredients: [ { name: 'Egg White', amount: 180 }, { name: 'Granulated Sugar', amount: 250 }, { name: 'Unsalted Butter', amount: 360 }, { name: 'Caramel Sauce', amount: 80 }, { name: 'Salt', amount: 4 } ] },
      { group: 'Flavored Swiss Meringue', name: 'Raspberry Swiss Meringue Buttercream', emoji: '🍇', description: 'Tart raspberry folded into cloud-like SMBC — naturally vibrant and flavourful.', pairsWell: ['foam','chiffon','layer','flourless'],
        ingredients: [ { name: 'Egg White', amount: 180 }, { name: 'Granulated Sugar', amount: 270 }, { name: 'Unsalted Butter', amount: 360 }, { name: 'Raspberry Jam', amount: 80 }, { name: 'Salt', amount: 1 } ] },
      { group: 'Flavored Swiss Meringue', name: 'Espresso Swiss Meringue Buttercream', emoji: '☕', description: 'Coffee-forward SMBC with a silky texture — the perfect mocha frosting.', pairsWell: ['layer','butter','specialty','oil'],
        ingredients: [ { name: 'Egg White', amount: 180 }, { name: 'Granulated Sugar', amount: 270 }, { name: 'Unsalted Butter', amount: 360 }, { name: 'Espresso Powder', amount: 10 }, { name: 'Vanilla Extract', amount: 4 }, { name: 'Salt', amount: 1 } ] },
      { group: 'Flavored Swiss Meringue', name: 'Matcha Swiss Meringue Buttercream', emoji: '🍵', description: 'Earthy ceremonial matcha gives SMBC a sophisticated green hue.', pairsWell: ['chiffon','foam','small','specialty'],
        ingredients: [ { name: 'Egg White', amount: 180 }, { name: 'Granulated Sugar', amount: 270 }, { name: 'Unsalted Butter', amount: 360 }, { name: 'Matcha Powder', amount: 12 }, { name: 'Salt', amount: 1 } ] },
      { group: 'Flavored Swiss Meringue', name: 'Brown Butter Swiss Meringue Buttercream', emoji: '🟤', description: 'Browned butter adds toasty, caramel depth to the silky SMBC base.', pairsWell: ['butter','layer','specialty','flourless'],
        ingredients: [ { name: 'Egg White', amount: 180 }, { name: 'Granulated Sugar', amount: 270 }, { name: 'Brown Butter', amount: 360 }, { name: 'Vanilla Bean Paste', amount: 6 }, { name: 'Salt', amount: 2 } ] },
      { group: 'Flavored Swiss Meringue', name: 'Coconut Swiss Meringue Buttercream', emoji: '🥥', description: 'Coconut cream replaces some cream in silky SMBC — tropical and luxurious.', pairsWell: ['oil','chiffon','specialty','small'],
        ingredients: [ { name: 'Egg White', amount: 180 }, { name: 'Granulated Sugar', amount: 270 }, { name: 'Unsalted Butter', amount: 320 }, { name: 'Coconut Milk (canned)', amount: 60 }, { name: 'Vanilla Extract', amount: 4 }, { name: 'Salt', amount: 1 } ] },
      { group: 'Flavored Swiss Meringue', name: 'Passionfruit Swiss Meringue Buttercream', emoji: '🌺', description: 'Tropical passionfruit curd gives SMBC an exotic fragrant punch.', pairsWell: ['chiffon','foam','layer','specialty'],
        ingredients: [ { name: 'Egg White', amount: 180 }, { name: 'Granulated Sugar', amount: 270 }, { name: 'Unsalted Butter', amount: 360 }, { name: 'Lemon Curd', amount: 60 }, { name: 'Vanilla Extract', amount: 3 }, { name: 'Salt', amount: 1 } ] },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 3. ITALIAN MERINGUE BUTTERCREAM
  // ══════════════════════════════════════════════════════════
  {
    id: 'italian-meringue-bc',
    name: 'Italian Meringue Buttercream',
    emoji: '🇮🇹',
    description: 'Hot sugar syrup poured into whipping egg whites, then finished with butter. The most stable and luxurious buttercream.',
    baseFormula: [
      { name: 'Egg White', amount: 150 },
      { name: 'Granulated Sugar', amount: 300 },
      { name: 'Water', amount: 75 },
      { name: 'Unsalted Butter', amount: 400 },
      { name: 'Vanilla Extract', amount: 6 },
    ],
    recipes: [
      { group: 'Classic Italian Meringue', name: 'Vanilla Italian Meringue Buttercream', emoji: '🍦', description: 'The most stable buttercream — airy meringue + butter = pure luxury.', pairsWell: ['layer','butter','specialty','foam'],
        ingredients: [ { name: 'Egg White', amount: 150 }, { name: 'Granulated Sugar', amount: 300 }, { name: 'Water', amount: 75 }, { name: 'Unsalted Butter', amount: 400 }, { name: 'Vanilla Bean Paste', amount: 8 } ] },
      { group: 'Classic Italian Meringue', name: 'Chocolate Italian Meringue Buttercream', emoji: '🍫', description: 'Dark chocolate melted into the silkiest, lightest chocolate frosting.', pairsWell: ['layer','butter','flourless','oil'],
        ingredients: [ { name: 'Egg White', amount: 150 }, { name: 'Granulated Sugar', amount: 300 }, { name: 'Water', amount: 75 }, { name: 'Unsalted Butter', amount: 400 }, { name: 'Dark Chocolate Bar', amount: 120 }, { name: 'Vanilla Extract', amount: 4 } ] },
      { group: 'Classic Italian Meringue', name: 'Lemon Italian Meringue Buttercream', emoji: '🍋', description: 'Lemon curd swirled into featherlight IMBC — bright and incredibly silky.', pairsWell: ['chiffon','foam','layer','small'],
        ingredients: [ { name: 'Egg White', amount: 150 }, { name: 'Granulated Sugar', amount: 300 }, { name: 'Water', amount: 75 }, { name: 'Unsalted Butter', amount: 400 }, { name: 'Lemon Curd', amount: 80 } ] },
      { group: 'Classic Italian Meringue', name: 'Raspberry Italian Meringue Buttercream', emoji: '🍇', description: 'Raspberry purée folded into stable IMBC — vibrant, fruity and professional.', pairsWell: ['foam','layer','chiffon','specialty'],
        ingredients: [ { name: 'Egg White', amount: 150 }, { name: 'Granulated Sugar', amount: 300 }, { name: 'Water', amount: 75 }, { name: 'Unsalted Butter', amount: 400 }, { name: 'Raspberry Jam', amount: 80 } ] },
      { group: 'Classic Italian Meringue', name: 'Caramel Italian Meringue Buttercream', emoji: '🍮', description: 'Caramel sauce folded into IMBC — silky, lightly sweet and deeply complex.', pairsWell: ['butter','layer','specialty','oil'],
        ingredients: [ { name: 'Egg White', amount: 150 }, { name: 'Granulated Sugar', amount: 280 }, { name: 'Water', amount: 70 }, { name: 'Unsalted Butter', amount: 400 }, { name: 'Caramel Sauce', amount: 80 }, { name: 'Salt', amount: 3 } ] },
      { group: 'Specialty Italian Meringue', name: 'Praline Italian Meringue Buttercream', emoji: '🌰', description: 'Hazelnut praline paste folded into feathery IMBC — a French patisserie staple.', pairsWell: ['layer','butter','specialty','flourless'],
        ingredients: [ { name: 'Egg White', amount: 150 }, { name: 'Granulated Sugar', amount: 300 }, { name: 'Water', amount: 75 }, { name: 'Unsalted Butter', amount: 380 }, { name: 'Almond Extract', amount: 5 }, { name: 'Vanilla Extract', amount: 3 } ] },
      { group: 'Specialty Italian Meringue', name: 'Espresso Italian Meringue Buttercream', emoji: '☕', description: 'Bold coffee in the most stable buttercream — perfect for mille-feuille or opera.', pairsWell: ['layer','specialty','butter','flourless'],
        ingredients: [ { name: 'Egg White', amount: 150 }, { name: 'Granulated Sugar', amount: 300 }, { name: 'Water', amount: 75 }, { name: 'Unsalted Butter', amount: 400 }, { name: 'Espresso Powder', amount: 10 }, { name: 'Vanilla Extract', amount: 3 } ] },
      { group: 'Specialty Italian Meringue', name: 'Passionfruit Italian Meringue Buttercream', emoji: '🌺', description: 'Exotic passionfruit in the lightest, most stable frosting possible.', pairsWell: ['chiffon','foam','layer','specialty'],
        ingredients: [ { name: 'Egg White', amount: 150 }, { name: 'Granulated Sugar', amount: 300 }, { name: 'Water', amount: 75 }, { name: 'Unsalted Butter', amount: 380 }, { name: 'Mango Juice', amount: 60 } ] },
      { group: 'Specialty Italian Meringue', name: 'Matcha Italian Meringue Buttercream', emoji: '🍵', description: 'Ceremonial matcha in featherlight IMBC — Japanese elegance on a cake.', pairsWell: ['chiffon','foam','small','specialty'],
        ingredients: [ { name: 'Egg White', amount: 150 }, { name: 'Granulated Sugar', amount: 300 }, { name: 'Water', amount: 75 }, { name: 'Unsalted Butter', amount: 400 }, { name: 'Matcha Powder', amount: 12 } ] },
      { group: 'Specialty Italian Meringue', name: 'Rose Italian Meringue Buttercream', emoji: '🌹', description: 'Delicate rose water in IMBC — floral, elegant and unmistakably romantic.', pairsWell: ['foam','chiffon','specialty','small'],
        ingredients: [ { name: 'Egg White', amount: 150 }, { name: 'Granulated Sugar', amount: 300 }, { name: 'Water', amount: 75 }, { name: 'Unsalted Butter', amount: 400 }, { name: 'Rose Water', amount: 15 }, { name: 'Vanilla Extract', amount: 3 } ] },
      { group: 'Specialty Italian Meringue', name: 'Brown Butter Italian Meringue Buttercream', emoji: '🟤', description: 'Browned butter adds toasty caramel depth to the world\'s silkiest frosting.', pairsWell: ['butter','layer','specialty','flourless'],
        ingredients: [ { name: 'Egg White', amount: 150 }, { name: 'Granulated Sugar', amount: 300 }, { name: 'Water', amount: 75 }, { name: 'Brown Butter', amount: 400 }, { name: 'Vanilla Bean Paste', amount: 6 } ] },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 4. CREAM CHEESE FROSTING
  // ══════════════════════════════════════════════════════════
  {
    id: 'cream-cheese-frosting',
    name: 'Cream Cheese Frosting',
    emoji: '🧀',
    description: 'Tangy cream cheese beaten with butter and powdered sugar. The classic pairing for carrot cake and red velvet.',
    baseFormula: [
      { name: 'Cream Cheese', amount: 340 },
      { name: 'Unsalted Butter', amount: 115 },
      { name: 'Powdered Sugar', amount: 360 },
      { name: 'Vanilla Extract', amount: 5 },
      { name: 'Salt', amount: 1 },
    ],
    recipes: [
      { group: 'Classic Cream Cheese', name: 'Classic Cream Cheese Frosting', emoji: '🧀', description: 'Tangy, smooth and the perfect companion for carrot cake and red velvet.', pairsWell: ['oil','small','layer','butter'],
        ingredients: [ { name: 'Cream Cheese', amount: 340 }, { name: 'Unsalted Butter', amount: 115 }, { name: 'Powdered Sugar', amount: 360 }, { name: 'Vanilla Extract', amount: 5 }, { name: 'Salt', amount: 1 } ] },
      { group: 'Classic Cream Cheese', name: 'Vanilla Bean Cream Cheese Frosting', emoji: '🍦', description: 'Real vanilla bean specks throughout the tangy cream cheese frosting.', pairsWell: ['oil','layer','butter','small'],
        ingredients: [ { name: 'Cream Cheese', amount: 340 }, { name: 'Unsalted Butter', amount: 115 }, { name: 'Powdered Sugar', amount: 360 }, { name: 'Vanilla Bean Paste', amount: 8 }, { name: 'Salt', amount: 1 } ] },
      { group: 'Classic Cream Cheese', name: 'Lemon Cream Cheese Frosting', emoji: '🍋', description: 'Lemon zest and juice brighten the tangy cream cheese base — fresh and vibrant.', pairsWell: ['oil','chiffon','small','layer'],
        ingredients: [ { name: 'Cream Cheese', amount: 340 }, { name: 'Unsalted Butter', amount: 115 }, { name: 'Powdered Sugar', amount: 340 }, { name: 'Lemon Extract', amount: 6 }, { name: 'Salt', amount: 1 } ] },
      { group: 'Classic Cream Cheese', name: 'Strawberry Cream Cheese Frosting', emoji: '🍓', description: 'Fresh strawberry swirled into tangy cream cheese — naturally rosy and fruity.', pairsWell: ['oil','small','layer','butter'],
        ingredients: [ { name: 'Cream Cheese', amount: 340 }, { name: 'Unsalted Butter', amount: 115 }, { name: 'Powdered Sugar', amount: 320 }, { name: 'Strawberry Jam', amount: 60 }, { name: 'Vanilla Extract', amount: 3 }, { name: 'Salt', amount: 1 } ] },
      { group: 'Classic Cream Cheese', name: 'Chocolate Cream Cheese Frosting', emoji: '🍫', description: 'Cocoa in the cream cheese frosting — tangy chocolate that works with everything.', pairsWell: ['oil','layer','small','butter'],
        ingredients: [ { name: 'Cream Cheese', amount: 340 }, { name: 'Unsalted Butter', amount: 115 }, { name: 'Powdered Sugar', amount: 300 }, { name: 'Dutch Cocoa Powder', amount: 40 }, { name: 'Vanilla Extract', amount: 4 }, { name: 'Salt', amount: 1 } ] },
      { group: 'Flavored Cream Cheese', name: 'Brown Butter Cream Cheese Frosting', emoji: '🟤', description: 'Browned butter adds a toasty, nutty dimension to the cream cheese base.', pairsWell: ['oil','butter','specialty','layer'],
        ingredients: [ { name: 'Cream Cheese', amount: 340 }, { name: 'Brown Butter', amount: 115 }, { name: 'Powdered Sugar', amount: 360 }, { name: 'Vanilla Extract', amount: 5 }, { name: 'Salt', amount: 2 } ] },
      { group: 'Flavored Cream Cheese', name: 'Cinnamon Cream Cheese Frosting', emoji: '🌶️', description: 'Warm cinnamon in cream cheese frosting — perfect for carrot and spice cakes.', pairsWell: ['oil','specialty','butter','small'],
        ingredients: [ { name: 'Cream Cheese', amount: 340 }, { name: 'Unsalted Butter', amount: 115 }, { name: 'Powdered Sugar', amount: 360 }, { name: 'Cinnamon', amount: 5 }, { name: 'Vanilla Extract', amount: 4 }, { name: 'Salt', amount: 1 } ] },
      { group: 'Flavored Cream Cheese', name: 'Honey Cream Cheese Frosting', emoji: '🍯', description: 'Honey replaces some sugar in the cream cheese frosting — floral and golden.', pairsWell: ['oil','butter','small','flourless'],
        ingredients: [ { name: 'Cream Cheese', amount: 340 }, { name: 'Unsalted Butter', amount: 115 }, { name: 'Powdered Sugar', amount: 280 }, { name: 'Honey', amount: 60 }, { name: 'Vanilla Extract', amount: 4 }, { name: 'Salt', amount: 1 } ] },
      { group: 'Flavored Cream Cheese', name: 'Maple Cream Cheese Frosting', emoji: '🍁', description: 'Real maple syrup in cream cheese frosting — autumn warmth and tang together.', pairsWell: ['oil','specialty','butter','small'],
        ingredients: [ { name: 'Cream Cheese', amount: 340 }, { name: 'Unsalted Butter', amount: 115 }, { name: 'Powdered Sugar', amount: 280 }, { name: 'Maple Syrup', amount: 60 }, { name: 'Vanilla Extract', amount: 3 }, { name: 'Salt', amount: 1 } ] },
      { group: 'Flavored Cream Cheese', name: 'Orange Cream Cheese Frosting', emoji: '🍊', description: 'Orange zest brightens the tangy cream cheese base with a citrus lift.', pairsWell: ['oil','chiffon','small','specialty'],
        ingredients: [ { name: 'Cream Cheese', amount: 340 }, { name: 'Unsalted Butter', amount: 115 }, { name: 'Powdered Sugar', amount: 340 }, { name: 'Lemon Extract', amount: 4 }, { name: 'Vanilla Extract', amount: 3 }, { name: 'Salt', amount: 1 } ] },
      { group: 'Flavored Cream Cheese', name: 'Espresso Cream Cheese Frosting', emoji: '☕', description: 'Bold espresso in cream cheese frosting — bold, bittersweet and surprisingly good.', pairsWell: ['oil','layer','specialty','butter'],
        ingredients: [ { name: 'Cream Cheese', amount: 340 }, { name: 'Unsalted Butter', amount: 115 }, { name: 'Powdered Sugar', amount: 340 }, { name: 'Espresso Powder', amount: 6 }, { name: 'Vanilla Extract', amount: 4 }, { name: 'Salt', amount: 1 } ] },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 5. GANACHE & CHOCOLATE FROSTING
  // ══════════════════════════════════════════════════════════
  {
    id: 'ganache',
    name: 'Ganache & Chocolate Frosting',
    emoji: '🍫',
    description: 'Chocolate melted into cream. Can be poured as a glaze, whipped as a frosting, or set firm for truffles.',
    baseFormula: [
      { name: 'Dark Chocolate Bar', amount: 300 },
      { name: 'Heavy Cream', amount: 300 },
      { name: 'Unsalted Butter', amount: 30 },
      { name: 'Vanilla Extract', amount: 4 },
    ],
    recipes: [
      { group: 'Classic Ganache', name: 'Dark Chocolate Ganache Glaze', emoji: '🌊', description: 'A 1:1 ganache poured over a cake for a glossy, dramatic chocolate mirror.', pairsWell: ['layer','flourless','butter','specialty'],
        ingredients: [ { name: 'Dark Chocolate Bar', amount: 300 }, { name: 'Heavy Cream', amount: 300 }, { name: 'Unsalted Butter', amount: 30 }, { name: 'Vanilla Extract', amount: 3 } ] },
      { group: 'Classic Ganache', name: 'Whipped Dark Chocolate Ganache', emoji: '🍫', description: 'Chilled ganache whipped to a light, airy frosting — intense yet spreadable.', pairsWell: ['layer','flourless','butter','oil'],
        ingredients: [ { name: 'Dark Chocolate Bar', amount: 360 }, { name: 'Heavy Cream', amount: 300 }, { name: 'Unsalted Butter', amount: 20 }, { name: 'Vanilla Extract', amount: 4 } ] },
      { group: 'Classic Ganache', name: 'Milk Chocolate Ganache', emoji: '🍬', description: 'Milder, sweeter milk chocolate ganache — approachable and universally loved.', pairsWell: ['layer','small','butter','specialty'],
        ingredients: [ { name: 'Ganache', amount: 400 }, { name: 'Heavy Cream', amount: 200 }, { name: 'Unsalted Butter', amount: 25 }, { name: 'Vanilla Extract', amount: 3 } ] },
      { group: 'Classic Ganache', name: 'White Chocolate Ganache', emoji: '🤍', description: 'Creamy white chocolate ganache — sweet, vanilla-scented and silky.', pairsWell: ['chiffon','foam','small','layer'],
        ingredients: [ { name: 'Heavy Cream', amount: 200 }, { name: 'Unsalted Butter', amount: 25 }, { name: 'Vanilla Bean Paste', amount: 6 } ] },
      { group: 'Classic Ganache', name: 'Salted Caramel Ganache', emoji: '🍮', description: 'Caramel sauce swirled into ganache with flaky salt — deeply complex and addictive.', pairsWell: ['butter','layer','oil','specialty'],
        ingredients: [ { name: 'Dark Chocolate Bar', amount: 250 }, { name: 'Heavy Cream', amount: 220 }, { name: 'Caramel Sauce', amount: 80 }, { name: 'Unsalted Butter', amount: 25 }, { name: 'Salt', amount: 4 } ] },
      { group: 'Flavored Ganache', name: 'Espresso Ganache', emoji: '☕', description: 'Espresso infused into dark chocolate ganache — a mocha lover\'s dream glaze.', pairsWell: ['layer','flourless','specialty','butter'],
        ingredients: [ { name: 'Dark Chocolate Bar', amount: 300 }, { name: 'Heavy Cream', amount: 280 }, { name: 'Espresso Powder', amount: 10 }, { name: 'Unsalted Butter', amount: 25 }, { name: 'Vanilla Extract', amount: 3 } ] },
      { group: 'Flavored Ganache', name: 'Orange Chocolate Ganache', emoji: '🍊', description: 'Orange zest infused into dark chocolate ganache — a timeless European pairing.', pairsWell: ['flourless','layer','specialty','butter'],
        ingredients: [ { name: 'Dark Chocolate Bar', amount: 300 }, { name: 'Heavy Cream', amount: 300 }, { name: 'Unsalted Butter', amount: 25 }, { name: 'Vanilla Extract', amount: 3 } ] },
      { group: 'Flavored Ganache', name: 'Raspberry Ganache', emoji: '🍇', description: 'Tart raspberry jam folded into dark ganache — fruity, sharp and stunning.', pairsWell: ['flourless','layer','foam','chiffon'],
        ingredients: [ { name: 'Dark Chocolate Bar', amount: 250 }, { name: 'Heavy Cream', amount: 220 }, { name: 'Raspberry Jam', amount: 80 }, { name: 'Unsalted Butter', amount: 20 } ] },
      { group: 'Chocolate Frostings', name: 'Classic Chocolate Fudge Frosting', emoji: '🟫', description: 'Cooked chocolate and butter frosting — fudgy, dense and richly spreadable.', pairsWell: ['layer','oil','butter','small'],
        ingredients: [ { name: 'Dutch Cocoa Powder', amount: 60 }, { name: 'Unsalted Butter', amount: 115 }, { name: 'Powdered Sugar', amount: 360 }, { name: 'Heavy Cream', amount: 60 }, { name: 'Vanilla Extract', amount: 5 }, { name: 'Salt', amount: 2 } ] },
      { group: 'Chocolate Frostings', name: 'Chocolate Cream Cheese Ganache', emoji: '🍫', description: 'Cream cheese folded into ganache — tangy chocolate richness that sets firm.', pairsWell: ['layer','flourless','oil','butter'],
        ingredients: [ { name: 'Dark Chocolate Bar', amount: 200 }, { name: 'Cream Cheese', amount: 170 }, { name: 'Heavy Cream', amount: 100 }, { name: 'Powdered Sugar', amount: 80 }, { name: 'Vanilla Extract', amount: 4 } ] },
      { group: 'Chocolate Frostings', name: 'Vegan Chocolate Ganache', emoji: '🌱', description: 'Coconut cream replaces dairy cream — rich, dark and completely plant-based.', pairsWell: ['oil','flourless','layer','specialty'],
        ingredients: [ { name: 'Dark Chocolate Bar', amount: 300 }, { name: 'Coconut Milk (canned)', amount: 300 }, { name: 'Maple Syrup', amount: 30 }, { name: 'Vanilla Extract', amount: 4 } ] },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 6. WHIPPED CREAM FROSTING
  // ══════════════════════════════════════════════════════════
  {
    id: 'whipped-cream',
    name: 'Whipped Cream Frosting',
    emoji: '☁️',
    description: 'Whipped heavy cream, lightly sweetened and stabilised. Light, delicate and not too sweet.',
    baseFormula: [
      { name: 'Heavy Cream', amount: 480 },
      { name: 'Powdered Sugar', amount: 40 },
      { name: 'Vanilla Extract', amount: 4 },
    ],
    recipes: [
      { group: 'Classic Whipped Cream', name: 'Classic Chantilly Cream', emoji: '☁️', description: 'Lightly sweetened, vanilla-scented whipped cream — pure and delicate.', pairsWell: ['foam','chiffon','small','specialty'],
        ingredients: [ { name: 'Heavy Cream', amount: 480 }, { name: 'Powdered Sugar', amount: 40 }, { name: 'Vanilla Extract', amount: 5 } ] },
      { group: 'Classic Whipped Cream', name: 'Stabilised Whipped Cream', emoji: '🏗️', description: 'Cream cheese added for stability — holds its shape for hours without weeping.', pairsWell: ['foam','chiffon','layer','small'],
        ingredients: [ { name: 'Heavy Cream', amount: 480 }, { name: 'Cream Cheese', amount: 60 }, { name: 'Powdered Sugar', amount: 50 }, { name: 'Vanilla Extract', amount: 4 } ] },
      { group: 'Classic Whipped Cream', name: 'Mascarpone Whipped Cream', emoji: '🇮🇹', description: 'Mascarpone folded into whipped cream — richer, creamier and more stable.', pairsWell: ['foam','specialty','chiffon','layer'],
        ingredients: [ { name: 'Heavy Cream', amount: 360 }, { name: 'Cream Cheese', amount: 120 }, { name: 'Powdered Sugar', amount: 50 }, { name: 'Vanilla Bean Paste', amount: 5 } ] },
      { group: 'Classic Whipped Cream', name: 'Brown Sugar Whipped Cream', emoji: '🟫', description: 'Dark brown sugar gives a subtle molasses depth to whipped cream.', pairsWell: ['oil','butter','specialty','chiffon'],
        ingredients: [ { name: 'Heavy Cream', amount: 480 }, { name: 'Brown Sugar (Dark)', amount: 40 }, { name: 'Vanilla Extract', amount: 4 } ] },
      { group: 'Classic Whipped Cream', name: 'Honey Whipped Cream', emoji: '🍯', description: 'Honey in place of sugar — floral, golden and beautifully fragrant.', pairsWell: ['foam','chiffon','flourless','small'],
        ingredients: [ { name: 'Heavy Cream', amount: 480 }, { name: 'Honey', amount: 35 }, { name: 'Vanilla Extract', amount: 4 } ] },
      { group: 'Flavored Whipped Cream', name: 'Chocolate Whipped Cream', emoji: '🍫', description: 'Cocoa folded into whipped cream — light, chocolatey and meltingly tender.', pairsWell: ['foam','layer','small','specialty'],
        ingredients: [ { name: 'Heavy Cream', amount: 480 }, { name: 'Dutch Cocoa Powder', amount: 25 }, { name: 'Powdered Sugar', amount: 50 }, { name: 'Vanilla Extract', amount: 4 } ] },
      { group: 'Flavored Whipped Cream', name: 'Lemon Whipped Cream', emoji: '🍋', description: 'Lemon zest and juice in whipped cream — bright, fresh and impossibly light.', pairsWell: ['foam','chiffon','small','specialty'],
        ingredients: [ { name: 'Heavy Cream', amount: 480 }, { name: 'Powdered Sugar', amount: 40 }, { name: 'Lemon Extract', amount: 5 } ] },
      { group: 'Flavored Whipped Cream', name: 'Strawberry Whipped Cream', emoji: '🍓', description: 'Fresh strawberry purée folded into whipped cream — fruity and cloud-light.', pairsWell: ['foam','small','chiffon','layer'],
        ingredients: [ { name: 'Heavy Cream', amount: 480 }, { name: 'Powdered Sugar', amount: 35 }, { name: 'Strawberry Jam', amount: 50 }, { name: 'Vanilla Extract', amount: 3 } ] },
      { group: 'Flavored Whipped Cream', name: 'Espresso Whipped Cream', emoji: '☕', description: 'Espresso powder in whipped cream — coffee-forward, light and elegant.', pairsWell: ['specialty','layer','foam','chiffon'],
        ingredients: [ { name: 'Heavy Cream', amount: 480 }, { name: 'Powdered Sugar', amount: 40 }, { name: 'Espresso Powder', amount: 8 }, { name: 'Vanilla Extract', amount: 3 } ] },
      { group: 'Flavored Whipped Cream', name: 'Matcha Whipped Cream', emoji: '🍵', description: 'Earthy matcha in lightly sweetened whipped cream — Japanese elegance.', pairsWell: ['foam','chiffon','small','specialty'],
        ingredients: [ { name: 'Heavy Cream', amount: 480 }, { name: 'Powdered Sugar', amount: 40 }, { name: 'Matcha Powder', amount: 8 }, { name: 'Vanilla Extract', amount: 3 } ] },
      { group: 'Flavored Whipped Cream', name: 'Coconut Whipped Cream', emoji: '🥥', description: 'Chilled coconut cream whipped to peaks — dairy-free, tropical and delicate.', pairsWell: ['oil','chiffon','specialty','small'],
        ingredients: [ { name: 'Coconut Milk (canned)', amount: 400 }, { name: 'Powdered Sugar', amount: 35 }, { name: 'Vanilla Extract', amount: 4 } ] },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 7. FONDANT & ROYAL ICING
  // ══════════════════════════════════════════════════════════
  {
    id: 'fondant-royal',
    name: 'Fondant & Royal Icing',
    emoji: '🎨',
    description: 'Rolled fondant for smooth sculpted finishes; royal icing for detail piping and cookies. Both set firm.',
    baseFormula: [
      { name: 'Powdered Sugar', amount: 500 },
      { name: 'Shortening', amount: 30 },
      { name: 'Water', amount: 45 },
      { name: 'Vanilla Extract', amount: 4 },
    ],
    recipes: [
      { group: 'Rolled Fondant', name: 'Classic White Rolled Fondant', emoji: '⬜', description: 'Smooth, pliable fondant for covering cakes with a flawless finish.', pairsWell: ['specialty','layer','butter','small'],
        ingredients: [ { name: 'Powdered Sugar', amount: 500 }, { name: 'Shortening', amount: 30 }, { name: 'Water', amount: 45 }, { name: 'Vanilla Extract', amount: 4 } ] },
      { group: 'Rolled Fondant', name: 'Chocolate Fondant', emoji: '🍫', description: 'Cocoa-tinted fondant with a chocolate flavour — smooth and workable.', pairsWell: ['specialty','layer','butter','flourless'],
        ingredients: [ { name: 'Powdered Sugar', amount: 450 }, { name: 'Dutch Cocoa Powder', amount: 50 }, { name: 'Shortening', amount: 30 }, { name: 'Water', amount: 45 }, { name: 'Vanilla Extract', amount: 3 } ] },
      { group: 'Rolled Fondant', name: 'Marshmallow Fondant', emoji: '🤍', description: 'Microwave marshmallow fondant — softer, sweeter and easier to work with than regular fondant.', pairsWell: ['specialty','layer','small','butter'],
        ingredients: [ { name: 'Powdered Sugar', amount: 480 }, { name: 'Shortening', amount: 20 }, { name: 'Water', amount: 25 }, { name: 'Vanilla Extract', amount: 5 } ] },
      { group: 'Rolled Fondant', name: 'Almond Marzipan', emoji: '🌰', description: 'Traditional almond paste rolled smooth — a firm, fragrant undercoat for fondant cakes.', pairsWell: ['specialty','butter','layer','flourless'],
        ingredients: [ { name: 'Almond Flour', amount: 200 }, { name: 'Powdered Sugar', amount: 200 }, { name: 'Honey', amount: 30 }, { name: 'Almond Extract', amount: 5 }, { name: 'Water', amount: 20 } ] },
      { group: 'Rolled Fondant', name: 'Vanilla Bean Fondant', emoji: '🍦', description: 'Vanilla bean paste stirred through classic rolled fondant — beautifully speckled.', pairsWell: ['specialty','layer','butter','small'],
        ingredients: [ { name: 'Powdered Sugar', amount: 500 }, { name: 'Shortening', amount: 30 }, { name: 'Water', amount: 40 }, { name: 'Vanilla Bean Paste', amount: 8 } ] },
      { group: 'Royal Icing', name: 'Classic Royal Icing', emoji: '✍️', description: 'Meringue powder royal icing — sets firm for decorating and flooding cookies.', pairsWell: ['specialty','small','layer','butter'],
        ingredients: [ { name: 'Powdered Sugar', amount: 480 }, { name: 'Egg White', amount: 60 }, { name: 'Lemon Juice', amount: 10 }, { name: 'Vanilla Extract', amount: 3 } ] },
      { group: 'Royal Icing', name: 'Flood Royal Icing', emoji: '🌊', description: 'Thinned royal icing for flooding cookie surfaces — smooth and glossy when dry.', pairsWell: ['specialty','small','layer','butter'],
        ingredients: [ { name: 'Powdered Sugar', amount: 480 }, { name: 'Egg White', amount: 80 }, { name: 'Lemon Juice', amount: 15 }, { name: 'Water', amount: 20 } ] },
      { group: 'Royal Icing', name: 'Chocolate Royal Icing', emoji: '🍫', description: 'Cocoa-infused royal icing for dark, dramatic detail piping.', pairsWell: ['specialty','small','layer','butter'],
        ingredients: [ { name: 'Powdered Sugar', amount: 440 }, { name: 'Dutch Cocoa Powder', amount: 40 }, { name: 'Egg White', amount: 60 }, { name: 'Water', amount: 15 } ] },
      { group: 'Poured Fondant', name: 'Classic Poured Fondant Glaze', emoji: '💧', description: 'Liquid poured fondant for glazing petit fours and fancy cakes — sets to a satin finish.', pairsWell: ['specialty','butter','layer','small'],
        ingredients: [ { name: 'Powdered Sugar', amount: 480 }, { name: 'Water', amount: 60 }, { name: 'Corn Syrup', amount: 30 }, { name: 'Vanilla Extract', amount: 3 } ] },
      { group: 'Poured Fondant', name: 'Chocolate Poured Fondant', emoji: '🍫', description: 'Chocolate poured fondant — sets to a glossy, firm chocolate coating.', pairsWell: ['specialty','layer','flourless','butter'],
        ingredients: [ { name: 'Powdered Sugar', amount: 440 }, { name: 'Dutch Cocoa Powder', amount: 40 }, { name: 'Water', amount: 60 }, { name: 'Vanilla Extract', amount: 3 } ] },
      { group: 'Poured Fondant', name: 'Lemon Poured Fondant', emoji: '🍋', description: 'Bright lemon glaze poured over cakes and madeleines — sharp and glossy.', pairsWell: ['butter','small','chiffon','foam'],
        ingredients: [ { name: 'Powdered Sugar', amount: 480 }, { name: 'Lemon Juice', amount: 50 }, { name: 'Water', amount: 20 }, { name: 'Lemon Extract', amount: 3 } ] },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 8. SPECIALTY ICINGS
  // ══════════════════════════════════════════════════════════
  {
    id: 'specialty',
    name: 'Specialty Icings',
    emoji: '✨',
    description: 'Mirror glazes, drips, ermine, boiled icings and other advanced finishes for showstopper cakes.',
    baseFormula: [
      { name: 'Granulated Sugar', amount: 200 },
      { name: 'Heavy Cream', amount: 200 },
      { name: 'Dark Chocolate Bar', amount: 200 },
      { name: 'Unsalted Butter', amount: 30 },
    ],
    recipes: [
      { group: 'Mirror Glazes', name: 'Dark Chocolate Mirror Glaze', emoji: '🪞', description: 'Gelatine-set chocolate mirror glaze — the showstopping reflective cake finish.', pairsWell: ['specialty','layer','flourless','butter'],
        ingredients: [ { name: 'Dark Chocolate Bar', amount: 300 }, { name: 'Heavy Cream', amount: 200 }, { name: 'Granulated Sugar', amount: 150 }, { name: 'Water', amount: 75 }, { name: 'Vanilla Extract', amount: 3 } ] },
      { group: 'Mirror Glazes', name: 'White Chocolate Mirror Glaze', emoji: '🤍', description: 'Ivory white chocolate mirror glaze — can be tinted any colour for dramatic effects.', pairsWell: ['specialty','layer','foam','chiffon'],
        ingredients: [ { name: 'Heavy Cream', amount: 200 }, { name: 'Granulated Sugar', amount: 150 }, { name: 'Water', amount: 75 }, { name: 'Vanilla Bean Paste', amount: 5 } ] },
      { group: 'Mirror Glazes', name: 'Caramel Mirror Glaze', emoji: '🍮', description: 'Amber caramel mirror glaze — stunning golden pour with deep flavour.', pairsWell: ['specialty','butter','layer','oil'],
        ingredients: [ { name: 'Granulated Sugar', amount: 200 }, { name: 'Heavy Cream', amount: 200 }, { name: 'Unsalted Butter', amount: 30 }, { name: 'Water', amount: 60 }, { name: 'Salt', amount: 3 } ] },
      { group: 'Drip Glazes', name: 'Chocolate Drip Glaze', emoji: '🍫', description: 'Thick ganache drip for dramatic pours over frosted cakes — sets to a fudgy drip.', pairsWell: ['layer','specialty','butter','flourless'],
        ingredients: [ { name: 'Dark Chocolate Bar', amount: 200 }, { name: 'Heavy Cream', amount: 150 }, { name: 'Unsalted Butter', amount: 20 }, { name: 'Vanilla Extract', amount: 3 } ] },
      { group: 'Drip Glazes', name: 'White Chocolate Drip', emoji: '🤍', description: 'Creamy white chocolate drip that can be coloured for vibrant effect.', pairsWell: ['layer','specialty','small','foam'],
        ingredients: [ { name: 'Heavy Cream', amount: 120 }, { name: 'Unsalted Butter', amount: 15 }, { name: 'Vanilla Bean Paste', amount: 4 } ] },
      { group: 'Drip Glazes', name: 'Caramel Drip', emoji: '🍮', description: 'Salted caramel drip glaze — golden, gooey and spectacular on naked cakes.', pairsWell: ['layer','butter','oil','specialty'],
        ingredients: [ { name: 'Brown Sugar (Dark)', amount: 150 }, { name: 'Heavy Cream', amount: 150 }, { name: 'Unsalted Butter', amount: 40 }, { name: 'Salt', amount: 4 }, { name: 'Vanilla Extract', amount: 3 } ] },
      { group: 'Cooked Icings', name: 'Ermine (Flour) Buttercream', emoji: '🍚', description: 'Old-fashioned cooked flour and milk base whipped with butter — light, not too sweet and silky.', pairsWell: ['butter','layer','oil','small'],
        ingredients: [ { name: 'All-Purpose Flour', amount: 40 }, { name: 'Whole Milk', amount: 240 }, { name: 'Granulated Sugar', amount: 200 }, { name: 'Unsalted Butter', amount: 230 }, { name: 'Vanilla Extract', amount: 6 } ] },
      { group: 'Cooked Icings', name: 'Seven-Minute Frosting', emoji: '⏱️', description: 'Egg whites and sugar whipped over heat — marshmallowy, glossy and dramatic.', pairsWell: ['layer','specialty','butter','foam'],
        ingredients: [ { name: 'Egg White', amount: 120 }, { name: 'Granulated Sugar', amount: 300 }, { name: 'Water', amount: 60 }, { name: 'Cream of Tartar', amount: 2 }, { name: 'Vanilla Extract', amount: 5 } ] },
      { group: 'Cooked Icings', name: 'Boiled Chocolate Frosting', emoji: '🟫', description: 'Old-fashioned poured chocolate frosting that sets to a fudge-like finish.', pairsWell: ['layer','oil','butter','specialty'],
        ingredients: [ { name: 'Granulated Sugar', amount: 200 }, { name: 'Dutch Cocoa Powder', amount: 40 }, { name: 'Whole Milk', amount: 120 }, { name: 'Unsalted Butter', amount: 60 }, { name: 'Vanilla Extract', amount: 4 } ] },
      { group: 'Simple Glazes', name: 'Vanilla Glaze', emoji: '💧', description: 'Simple powdered sugar glaze with vanilla — quick, thin and easy to drizzle.', pairsWell: ['small','butter','oil','chiffon'],
        ingredients: [ { name: 'Powdered Sugar', amount: 240 }, { name: 'Whole Milk', amount: 30 }, { name: 'Vanilla Extract', amount: 4 } ] },
      { group: 'Simple Glazes', name: 'Lemon Glaze', emoji: '🍋', description: 'Sharp lemon juice and powdered sugar — the simplest, brightest cake finish.', pairsWell: ['small','chiffon','foam','oil'],
        ingredients: [ { name: 'Powdered Sugar', amount: 240 }, { name: 'Lemon Juice', amount: 30 }, { name: 'Lemon Extract', amount: 3 } ] },
      { group: 'Simple Glazes', name: 'Honey Glaze', emoji: '🍯', description: 'Honey-thinned glaze — golden, fragrant and naturally sweet.', pairsWell: ['small','butter','oil','flourless'],
        ingredients: [ { name: 'Powdered Sugar', amount: 200 }, { name: 'Honey', amount: 40 }, { name: 'Whole Milk', amount: 15 }, { name: 'Vanilla Extract', amount: 3 } ] },
    ],
  },
];
