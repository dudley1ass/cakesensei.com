import { useRef, useState } from 'react';
import { ChefHat, Sparkles, ArrowRight, Refrigerator } from 'lucide-react';
import { CakeType, CakeRecipe } from '../types/cakeTypes';
import { PantryModal } from './PantryModal';

interface CakeTypeSelectorProps {
  cakeTypes: CakeType[];
  onSelectType: (cakeType: CakeType) => void;
  onSelectRecipe: (cakeType: CakeType, recipe: CakeRecipe) => void;
}

const CLASSIC_SYSTEM_IDS = new Set(['butter', 'foam', 'chiffon', 'oil']);

function ToolPreviewMockup() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4 shadow-inner text-left max-w-md mx-auto">
      <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Live in the builder</div>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600">Moisture</span>
            <span className="text-red-600 font-semibold">72%</span>
          </div>
          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-amber-400 to-red-400" />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600">Lightness</span>
            <span className="text-red-600 font-semibold">58%</span>
          </div>
          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full w-[58%] rounded-full bg-gradient-to-r from-sky-400 to-blue-400" />
          </div>
        </div>
        <div className="rounded-lg bg-white border border-gray-100 px-3 py-2 text-xs text-gray-600 italic">
          &ldquo;A clean, sweet base — vanilla and butter come through clearly.&rdquo;
        </div>
        <div className="flex gap-2 text-[10px] text-gray-500">
          <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 font-medium">Science</span>
          <span className="px-2 py-0.5 rounded bg-gray-100 font-medium">Nutrition</span>
          <span className="px-2 py-0.5 rounded bg-gray-100 font-medium">Baker&apos;s %</span>
        </div>
      </div>
    </div>
  );
}

function CakeTypeCard({
  type,
  onStart,
}: {
  type: CakeType;
  onStart: () => void;
}) {
  return (
    <div
      className="bg-white rounded-xl shadow-md border-2 border-transparent hover:border-red-300 hover:shadow-lg transition-all duration-300 p-6 flex flex-col h-full group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-4xl">{type.emoji}</div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-50 text-red-600">
            {type.category}
          </span>
          <Sparkles className="w-4 h-4 text-red-300 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-1">{type.name}</h3>
      <p className="text-sm font-medium text-red-700 mb-2 leading-snug">
        <span className="text-gray-500 font-normal">Best for: </span>
        {type.bestFor}
      </p>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">{type.description}</p>

      <div className="mb-3">
        <div className="text-xs font-semibold text-red-600 mb-1">Examples</div>
        <div className="text-xs text-gray-500 line-clamp-2">{type.examples.join(', ')}</div>
      </div>

      <div className="border-t border-gray-100 pt-3 mb-4">
        <div className="text-xs text-gray-500 line-clamp-2 italic">🔬 {type.scienceNote}</div>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm text-white transition-all shadow-md hover:shadow-lg"
        style={{ background: 'linear-gradient(135deg, #c0392b, #e67e22)' }}
      >
        Start with this cake
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export function CakeTypeSelector({ cakeTypes, onSelectType, onSelectRecipe }: CakeTypeSelectorProps) {
  const [showPantry, setShowPantry] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const classicTypes = cakeTypes.filter((t) => CLASSIC_SYSTEM_IDS.has(t.id));
  const specialtyTypes = cakeTypes.filter((t) => !CLASSIC_SYSTEM_IDS.has(t.id));

  const scrollToFormulas = () => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen print:hidden" style={{ background: 'linear-gradient(135deg, #fdf6e3 0%, #fce4ec 50%, #f3e5f5 100%)' }}>
      <header className="text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c, #e67e22)' }}>
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎂</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>CakeSensei</h1>
              <p className="text-red-100 text-sm">Baking science, formulas, and nutrition — in one workflow</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero — outcome + dominant path */}
          <div className="text-center mb-10">
            <p className="text-red-600 font-semibold text-sm uppercase tracking-wide mb-2">Start solving your cake right now</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Pick a cake system. Tune the formula. See the science.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
              Choose your cake type and instantly adjust ingredients, texture, and moisture — with baker&apos;s %, taste predictions, and nutrition.
            </p>
            <p className="text-base text-gray-700 max-w-2xl mx-auto font-medium mb-8">
              Start with <span className="text-red-700">10 proven cake formulas</span> used by professionals — butter, foam, chiffon, oil, and more — each grounded in how the structure actually works.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-4">
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500 mb-1">Not sure? Start here</span>
                <button
                  type="button"
                  onClick={scrollToFormulas}
                  className="inline-flex items-center justify-center gap-2 text-lg font-bold text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all w-full sm:w-auto min-w-[240px]"
                  style={{ background: 'linear-gradient(135deg, #c0392b, #e67e22)' }}
                >
                  Find My Cake
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="hidden sm:block w-px h-16 bg-gray-300 self-center" aria-hidden />
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500 mb-1">Already have ingredients?</span>
                <button
                  type="button"
                  onClick={() => setShowPantry(true)}
                  className="inline-flex items-center justify-center gap-2 text-base font-bold text-red-700 bg-white border-2 border-red-200 px-6 py-3.5 rounded-2xl shadow-md hover:border-red-400 hover:bg-red-50 transition-all w-full sm:w-auto min-w-[260px]"
                >
                  <Refrigerator className="w-5 h-5" />
                  Start with Ingredients
                </button>
                <span className="text-xs text-gray-500 mt-1.5 max-w-[280px]">We&apos;ll match what you have to a real formula</span>
              </div>
            </div>
          </div>

          {/* How it works — moved up */}
          <div className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {[
              { icon: '1', title: 'Choose a cake type', body: 'Butter, foam, chiffon, oil — each is a different leavening and structure system.' },
              { icon: '2', title: 'Adjust ingredients', body: "Grams, ounces, or cups; swap from 180+ items; see baker's % update live." },
              { icon: '3', title: 'See instant results', body: 'Taste predictions, science scores, FDA-style nutrition, and print-ready sheets.' },
            ].map((step) => (
              <div key={step.title} className="bg-white/90 backdrop-blur rounded-xl border border-gray-200/80 p-4 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 font-black text-sm flex items-center justify-center mb-2">{step.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>

          {/* Science systems + mock */}
          <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <h3 className="text-sm font-bold text-red-600 uppercase tracking-wide mb-2">Why categories matter</h3>
              <p className="text-gray-800 font-semibold mb-2 text-lg">Each type is a <span className="text-red-700">system</span>, not just a flavor.</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li><strong className="text-gray-800">Butter</strong> — fat aeration (creaming).</li>
                <li><strong className="text-gray-800">Foam / sponge</strong> — protein aeration (eggs).</li>
                <li><strong className="text-gray-800">Chiffon</strong> — hybrid: oil + meringue.</li>
                <li><strong className="text-gray-800">Oil</strong> — moisture-dominant, tender crumb for days.</li>
              </ul>
            </div>
            <ToolPreviewMockup />
          </div>

          <div ref={gridRef} id="choose-cake-grid" className="scroll-mt-6">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
              <ChefHat className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">Choose your cake system</h2>
            </div>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 text-sm">
              Classic systems first (how the structure is built); then specialty & celebration styles.
            </p>

            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Classic cake systems</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {classicTypes.map((type) => (
                <CakeTypeCard key={type.id} type={type} onStart={() => onSelectType(type)} />
              ))}
            </div>

            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Specialty & celebration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialtyTypes.map((type) => (
                <CakeTypeCard key={type.id} type={type} onStart={() => onSelectType(type)} />
              ))}
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <h3 className="text-lg font-bold text-gray-800 mb-2">More you can do</h3>
            <ul className="text-sm text-gray-600 space-y-1.5 ml-1">
              <li>• Load named historical and classic recipes inside each type (pound cake, genoise, red velvet, and more).</li>
              <li>• Use <strong>Start with Ingredients</strong> at the top to find a match from your pantry.</li>
              <li>• Print a clean recipe sheet: formula and steps on page 1; nutrition and science on page 2.</li>
            </ul>
          </div>
        </div>
      </main>

      {showPantry && (
        <PantryModal
          onClose={() => setShowPantry(false)}
          onSelectRecipe={(cakeType, recipe) => {
            onSelectRecipe(cakeType, recipe);
            setShowPantry(false);
          }}
        />
      )}
    </div>
  );
}
