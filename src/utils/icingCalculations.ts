// ============================================================
// ICING COVERAGE CALCULATOR
// All measurements in cm / grams internally.
// ============================================================

export type CoverageStyle = 'naked' | 'semi-naked' | 'full' | 'heavy';
export type CakeDiameter = 15 | 20 | 23 | 25 | 28 | 30;
export type CakeShape = 'round' | 'square';

export const COVERAGE_LABELS: Record<CoverageStyle, string> = {
  naked:       'Naked (bare sides)',
  'semi-naked':'Semi-Naked (~50% sides)',
  full:        'Fully Frosted',
  heavy:       'Heavily Piped / Decorated',
};

// Fraction of side surface area covered per style
const SIDE_COVERAGE: Record<CoverageStyle, number> = {
  naked:        0.20,
  'semi-naked': 0.55,
  full:         1.00,
  heavy:        1.00,
};

// Extra multiplier on top of standard thickness for piping/decoration
const STYLE_MULTIPLIER: Record<CoverageStyle, number> = {
  naked:        0.6,
  'semi-naked': 0.85,
  full:         1.0,
  heavy:        1.6,
};

// Standard icing thickness in cm
const ICING_THICKNESS_CM = 0.6; // ~6mm

// Icing density g/cm³ (between buttercream ~1.1 and ganache ~1.3)
const ICING_DENSITY = 1.1;

export interface CoverageInputs {
  diameterCm: number;
  layers: number;
  layerHeightCm: number; // height of each layer (default 4cm / ~1.5")
  coverageStyle: CoverageStyle;
  shape: CakeShape;
}

export interface CoverageResult {
  gramsNeeded: number;
  scaleFactor: number;      // multiply all icing recipe amounts by this
  topAreaCm2: number;
  sideAreaCm2: number;
  totalAreaCm2: number;
  totalHeightCm: number;
  description: string;
}

export function calculateCoverage(
  inputs: CoverageInputs,
  recipeBaseGrams: number,
): CoverageResult {
  const { diameterCm, layers, layerHeightCm, coverageStyle, shape } = inputs;
  const totalHeightCm = layers * layerHeightCm;

  // Surface area calculations
  let topAreaCm2: number;
  let sideAreaCm2: number;

  if (shape === 'round') {
    const r = diameterCm / 2;
    topAreaCm2  = Math.PI * r * r;
    sideAreaCm2 = Math.PI * diameterCm * totalHeightCm;
  } else {
    // square: side = diameter (treated as side length)
    topAreaCm2  = diameterCm * diameterCm;
    sideAreaCm2 = 4 * diameterCm * totalHeightCm;
  }

  const effectiveSideArea = sideAreaCm2 * SIDE_COVERAGE[coverageStyle];
  const totalAreaCm2 = topAreaCm2 + effectiveSideArea;

  // Volume of icing needed (cm³) → grams
  const volumeCm3 = totalAreaCm2 * ICING_THICKNESS_CM * STYLE_MULTIPLIER[coverageStyle];
  const gramsNeeded = Math.round(volumeCm3 * ICING_DENSITY);

  // Scale factor vs base recipe
  const scaleFactor = recipeBaseGrams > 0
    ? parseFloat((gramsNeeded / recipeBaseGrams).toFixed(2))
    : 1;

  const descriptions: Record<CoverageStyle, string> = {
    naked:       'Bare sides with minimal scraping — rustic and modern.',
    'semi-naked':'Sides lightly covered, texture shows through.',
    full:        'Completely covered, smooth crumb coat + outer coat.',
    heavy:       'Fully covered plus piped decoration, borders and rosettes.',
  };

  return {
    gramsNeeded,
    scaleFactor,
    topAreaCm2: Math.round(topAreaCm2),
    sideAreaCm2: Math.round(sideAreaCm2),
    totalAreaCm2: Math.round(totalAreaCm2),
    totalHeightCm,
    description: descriptions[coverageStyle],
  };
}

// Diameter options for UI
export const DIAMETER_OPTIONS: { value: number; label: string }[] = [
  { value: 15, label: '6" (15cm)' },
  { value: 20, label: '8" (20cm)' },
  { value: 23, label: '9" (23cm)' },
  { value: 25, label: '10" (25cm)' },
  { value: 28, label: '11" (28cm)' },
  { value: 30, label: '12" (30cm)' },
];
