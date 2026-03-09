export type IngredientCategory =
  | 'flour' | 'sugar' | 'fat' | 'liquid' | 'egg' | 'leavening'
  | 'dairy' | 'flavoring' | 'chocolate' | 'fruit' | 'nuts' | 'spice'
  | 'filling' | 'other';

export type MeasurementMode = 'metric' | 'imperial' | 'volumetric';

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  // Nutritional data per 100g
  calories: number;
  protein: number;
  fat: number;
  saturatedFat?: number;
  transFat?: number;
  polyunsaturatedFat?: number;
  monounsaturatedFat?: number;
  cholesterol?: number;    // mg per 100g
  carbs: number;
  sugar: number;
  fiber: number;
  sodium: number;
  // Cake science properties
  moisture: number;        // % water/moisture content
  waterActivity?: number;  // aw value (0-1)
  defaultAmount: number;   // suggested starting amount in grams
}

export interface RecipeIngredient extends Ingredient {
  recipeId: string;
  amount: number; // in grams
}

export interface CakeMetrics {
  totalWeight: number;
  // Nutrition per 100g
  calories: number;
  protein: number;
  fat: number;
  saturatedFat: number;
  transFat: number;
  polyunsaturatedFat: number;
  monounsaturatedFat: number;
  cholesterol: number;
  carbs: number;
  sugar: number;
  fiber: number;
  sodium: number;
  // Cake science scores (0-100)
  moistureScore: number;
  tendernessScore: number;
  sweetnessScore: number;
  richnessScore: number;
  lightnessScore: number;
  // Ratios (%)
  flourRatio: number;
  fatRatio: number;
  sugarRatio: number;
  liquidRatio: number;
  // Qualitative predictions
  glutenDevelopment: string;
  leavenType: string;
  predictedCrumb: string;
  shelfLife: string;
  bakingTemp: string;
  // Taste predictions
  flavorProfile: string[];
  dominantFlavor: string;
  tasteNotes: string;
  bitternessScore: number;
  tartScore: number;
  nuttinessScore: number;
  spiceScore: number;
  fruitinessScore: number;
  chocolateScore: number;
  tasteWarnings: string[];
}
