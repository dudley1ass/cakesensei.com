import { useState, useEffect } from 'react';
import { CakeMetrics } from '../types/cake';

interface NutritionFactsProps {
  metrics: CakeMetrics;
  icingMetrics?: CakeMetrics | null;
  combinedMetrics?: CakeMetrics | null;
  servingSize: number;
  servingsPerRecipe: number;
}

export function NutritionFacts({
  metrics, icingMetrics, combinedMetrics, servingSize, servingsPerRecipe,
}: NutritionFactsProps) {
  const hasIcing = !!icingMetrics;
  const [view, setView] = useState<'cake' | 'icing' | 'combined'>(hasIcing ? 'combined' : 'cake');

  // Auto-switch to combined when icing is added, back to cake when removed
  useEffect(() => {
    if (hasIcing) setView('combined');
    else setView('cake');
  }, [hasIcing]);

  const effectiveView = !hasIcing ? 'cake' : view;

  const active =
    effectiveView === 'icing'    && icingMetrics    ? icingMetrics :
    effectiveView === 'combined' && combinedMetrics ? combinedMetrics :
    metrics;

  const activeServingSize =
    effectiveView === 'icing'    && icingMetrics    ? Math.round(icingMetrics.totalWeight    / servingsPerRecipe) :
    effectiveView === 'combined' && combinedMetrics ? Math.round(combinedMetrics.totalWeight / servingsPerRecipe) :
    servingSize;

  const f           = activeServingSize / 100;
  const calories    = (active.calories          || 0) * f;
  const fat         = (active.fat               || 0) * f;
  const saturated   = (active.saturatedFat      || 0) * f;
  const trans       = (active.transFat          || 0) * f;
  const poly        = (active.polyunsaturatedFat|| 0) * f;
  const mono        = (active.monounsaturatedFat|| 0) * f;
  const cholesterol = (active.cholesterol       || 0) * f;
  const carbs       = (active.carbs             || 0) * f;
  const protein     = (active.protein           || 0) * f;
  const fiber       = (active.fiber             || 0) * f;
  const sugar       = (active.sugar             || 0) * f;
  const sodium      = (active.sodium            || 0) * f;
  const starch      = Math.max(0, carbs - fiber - sugar);

  const fatDV         = (fat         / 78)   * 100;
  const saturatedDV   = (saturated   / 20)   * 100;
  const cholesterolDV = (cholesterol / 300)  * 100;
  const sodiumDV      = (sodium      / 2300) * 100;
  const carbsDV       = (carbs       / 275)  * 100;
  const fiberDV       = (fiber       / 28)   * 100;
  const proteinDV     = (protein     / 50)   * 100;

  const viewLabel =
    effectiveView === 'icing'    ? '🧁 Icing only' :
    effectiveView === 'combined' ? '✨ Cake + Icing (per slice)' :
    '🎂 Cake only';

  return (
    <div className="space-y-4">

      {hasIcing && (
        <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
          {(['cake', 'icing', 'combined'] as const).map((v) => (
            <button key={v} onClick={() => setView(v)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${effectiveView === v ? 'bg-white text-red-600 shadow' : 'text-gray-500 hover:text-gray-800'}`}>
              {v === 'cake' ? '🎂 Cake' : v === 'icing' ? '🧁 Icing' : '✨ Combined'}
            </button>
          ))}
        </div>
      )}

      <div className="bg-white border-2 border-black p-4 max-w-sm font-sans">
        <div className="border-b-8 border-black pb-1">
          <h2 className="text-3xl font-black">Nutrition Facts</h2>
          <p className="text-xs text-gray-500 mt-0.5">{viewLabel}</p>
        </div>

        <div className="border-b-4 border-black py-1 text-sm">
          <div>Servings per recipe: <span className="font-bold">{servingsPerRecipe}</span></div>
          <div className="font-bold text-lg">
            Serving size: {activeServingSize}g ({(activeServingSize * 0.035274).toFixed(2)} oz)
          </div>
        </div>

        <div className="border-b-8 border-black py-2">
          <div className="flex justify-between items-end">
            <span className="font-bold text-lg">Calories</span>
            <span className="text-4xl font-black">{calories.toFixed(0)}</span>
          </div>
        </div>

        <div className="border-b-4 border-black py-1 text-right">
          <div className="text-sm font-bold">% Daily Value*</div>
        </div>

        <div className="space-y-0.5 text-sm">
          <NutrRow label="Total Fat"           amount={`${fat.toFixed(1)}g`}         dv={fatDV} />
          <NutrSub label="Saturated Fat"       amount={`${saturated.toFixed(1)}g`}   dv={saturatedDV} />
          <NutrSub label="Trans Fat"           amount={`${trans.toFixed(2)}g`} />
          {poly > 0.05 && <NutrSub label="Polyunsaturated Fat" amount={`${poly.toFixed(1)}g`} />}
          {mono > 0.05 && <NutrSub label="Monounsaturated Fat" amount={`${mono.toFixed(1)}g`} />}
          <NutrRow label="Cholesterol"         amount={`${cholesterol.toFixed(0)}mg`} dv={cholesterolDV} />
          <NutrRow label="Sodium"              amount={`${sodium.toFixed(0)}mg`}      dv={sodiumDV} />
          <NutrRow label="Total Carbohydrate"  amount={`${carbs.toFixed(1)}g`}        dv={carbsDV} />
          <NutrSub label="Dietary Fiber"       amount={`${fiber.toFixed(1)}g`}        dv={fiberDV} />
          <NutrSub label="Total Sugars"        amount={`${sugar.toFixed(1)}g`} />
          {starch > 0.5 && <NutrSub label="Starch" amount={`${starch.toFixed(1)}g`} />}
          <NutrRow label="Protein"             amount={`${protein.toFixed(1)}g`}      dv={proteinDV} />
        </div>

        <div className="border-t-8 border-black mt-2 pt-2 text-xs">
          * % Daily Values based on a 2,000 calorie diet.
        </div>

        <div className="mt-3 text-xs text-gray-600 border-t border-gray-300 pt-2 space-y-0.5">
          <div className="font-semibold mb-1">Per 100g breakdown:</div>
          <div>Calories: {active.calories.toFixed(0)} kcal &nbsp;|&nbsp; Protein: {active.protein.toFixed(1)}g</div>
          <div>Total Fat: {active.fat.toFixed(1)}g
            {(active.saturatedFat || 0) > 0.1 && ` · Sat: ${(active.saturatedFat||0).toFixed(1)}g`}
            {(active.transFat || 0) > 0.05 && ` · Trans: ${(active.transFat||0).toFixed(2)}g`}
            {(active.polyunsaturatedFat || 0) > 0.1 && ` · Poly: ${(active.polyunsaturatedFat||0).toFixed(1)}g`}
            {(active.monounsaturatedFat || 0) > 0.1 && ` · Mono: ${(active.monounsaturatedFat||0).toFixed(1)}g`}
          </div>
          {(active.cholesterol || 0) > 0.5 && <div>Cholesterol: {(active.cholesterol||0).toFixed(0)}mg</div>}
          <div>Carbs: {active.carbs.toFixed(1)}g &nbsp;|&nbsp; Fiber: {active.fiber.toFixed(1)}g &nbsp;|&nbsp; Sugar: {active.sugar.toFixed(1)}g</div>
          <div>Sodium: {active.sodium.toFixed(0)}mg</div>
        </div>
      </div>

      {effectiveView === 'combined' && combinedMetrics && icingMetrics && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-sm">
          <div className="font-semibold text-gray-700 mb-3">⚖️ Weight per slice breakdown</div>
          <div className="space-y-2">
            <WeightBar label="🎂 Cake"  grams={Math.round(metrics.totalWeight     / servingsPerRecipe)} total={activeServingSize} color="#e67e22" />
            <WeightBar label="🧁 Icing" grams={Math.round(icingMetrics.totalWeight / servingsPerRecipe)} total={activeServingSize} color="#e91e8c" />
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-500">
            <span>Total slice weight</span>
            <span className="font-bold text-gray-800">{activeServingSize}g</span>
          </div>
        </div>
      )}

    </div>
  );
}

function WeightBar({ label, grams, total, color }: { label: string; grams: number; total: number; color: string }) {
  const pct = total > 0 ? Math.round((grams / total) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between items-center mb-1 text-xs">
        <span className="text-gray-600">{label}</span>
        <span className="font-semibold text-gray-800">{grams}g &nbsp;<span className="text-gray-400 font-normal">({pct}%)</span></span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function NutrRow({ label, amount, dv }: { label: string; amount: string; dv?: number }) {
  return (
    <div className="flex justify-between border-b border-gray-400 py-1 font-bold">
      <span>{label} <span className="font-normal">{amount}</span></span>
      {dv !== undefined && <span>{dv.toFixed(0)}%</span>}
    </div>
  );
}

function NutrSub({ label, amount, dv }: { label: string; amount: string; dv?: number }) {
  return (
    <div className="flex justify-between border-b border-gray-300 py-0.5 pl-4">
      <span>{label} <span className="text-gray-600">{amount}</span></span>
      {dv !== undefined && <span className="font-bold">{dv.toFixed(0)}%</span>}
    </div>
  );
}
