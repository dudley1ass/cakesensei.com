import { useState, useEffect } from 'react';
import { CakeMetrics } from '../types/cake';
import { getScoreLabel, getScoreColor } from '../utils/cakeCalculations';

interface MetricsDisplayProps {
  metrics: CakeMetrics;
  icingMetrics?: CakeMetrics | null;
  combinedMetrics?: CakeMetrics | null;
}

function ScoreBar({ label, score, emoji }: { label: string; score: number; emoji: string }) {
  const color = getScoreColor(score);
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{emoji} {label}</span>
        <span className="text-sm font-bold text-gray-900">
          {score}/100 <span className="text-gray-400 font-normal text-xs">({getScoreLabel(score)})</span>
        </span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function PredictionRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
      <span className="text-lg">{icon}</span>
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-sm font-semibold text-gray-800">{value}</div>
      </div>
    </div>
  );
}

export function MetricsDisplay({ metrics, icingMetrics, combinedMetrics }: MetricsDisplayProps) {
  const hasIcing = !!icingMetrics;
  const [view, setView] = useState<'cake' | 'icing' | 'combined'>(hasIcing ? 'combined' : 'cake');

  useEffect(() => {
    if (hasIcing) setView('combined');
    else setView('cake');
  }, [hasIcing]);

  // When icing is added/removed, update view automatically
  const effectiveView = !hasIcing ? 'cake' : view;
  const activeMetrics =
    effectiveView === 'icing'    && icingMetrics    ? icingMetrics :
    effectiveView === 'combined' && combinedMetrics ? combinedMetrics :
    metrics;

  const ratioData = [
    { label: 'Flour',  value: activeMetrics.flourRatio,  color: '#a78bfa' },
    { label: 'Fat',    value: activeMetrics.fatRatio,    color: '#fbbf24' },
    { label: 'Sugar',  value: activeMetrics.sugarRatio,  color: '#f472b6' },
    { label: 'Liquid', value: activeMetrics.liquidRatio, color: '#60a5fa' },
  ];

  const tasteScores = [
    { label: 'Chocolate',  score: activeMetrics.chocolateScore,  emoji: '🍫' },
    { label: 'Fruitiness', score: activeMetrics.fruitinessScore, emoji: '🍓' },
    { label: 'Spice',      score: activeMetrics.spiceScore,      emoji: '🌶️' },
    { label: 'Nuttiness',  score: activeMetrics.nuttinessScore,  emoji: '🥜' },
    { label: 'Tartness',   score: activeMetrics.tartScore,       emoji: '🍋' },
    { label: 'Bitterness', score: activeMetrics.bitternessScore, emoji: '😬' },
  ].filter(t => t.score > 0);

  return (
    <div className="space-y-6">

      {/* ── View toggle (only shown when icing is present) ── */}
      {hasIcing && (
        <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
          {(['cake', 'icing', 'combined'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${effectiveView === v ? 'bg-white text-red-600 shadow' : 'text-gray-500 hover:text-gray-800'}`}
            >
              {v === 'cake' ? '🎂 Cake' : v === 'icing' ? '🧁 Icing' : '✨ Combined'}
            </button>
          ))}
        </div>
      )}
      {/* ── Taste Prediction Card ── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
          <span>👅</span> Taste Prediction
        </h3>

        {/* Dominant flavor headline */}
        <div className="mb-3 px-4 py-3 rounded-xl text-center"
          style={{ background: 'linear-gradient(135deg, #fff7ed, #fce7f3)' }}>
          <div className="text-xs text-gray-500 mb-1">Dominant Flavour</div>
          <div className="text-xl font-black text-gray-900">{activeMetrics.dominantFlavor}</div>
        </div>

        {/* Taste notes */}
        <p className="text-sm text-gray-600 italic mb-4 px-1">"{activeMetrics.tasteNotes}"</p>

        {/* Flavor profile tags */}
        {activeMetrics.flavorProfile.length > 0 && (
          <div className="mb-4">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Flavour Profile</div>
            <div className="flex flex-wrap gap-2">
              {activeMetrics.flavorProfile.map((f) => (
                <span key={f} className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #c0392b, #e67e22)' }}>
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Taste score bars — only show flavors that are present */}
        {tasteScores.length > 0 && (
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Flavour Intensity</div>
            {tasteScores.map(t => (
              <ScoreBar key={t.label} label={t.label} score={t.score} emoji={t.emoji} />
            ))}
          </div>
        )}

        {/* Witty comments */}
        {activeMetrics.tasteWarnings.length > 0 && (
          <div className="mt-3 space-y-2">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">👨‍🍳 Chef's Notes</div>
            {activeMetrics.tasteWarnings.map((w, i) => (
              <div key={i} className="text-xs text-gray-700 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg px-3 py-2 italic">
                {w}
              </div>
            ))}
          </div>
        )}

        {activeMetrics.flavorProfile.length === 0 && tasteScores.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-2">
            Add fruit, chocolate, spices, or nuts to see flavour predictions.
          </p>
        )}
      </div>

      {/* ── Science Scores ── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>🔬</span> {effectiveView === 'icing' ? 'Icing' : effectiveView === 'combined' ? 'Combined' : 'Cake'} Science Scores
        </h3>
        <ScoreBar label="Moisture"   score={activeMetrics.moistureScore}   emoji="💧" />
        <ScoreBar label="Tenderness" score={activeMetrics.tendernessScore} emoji="🧈" />
        <ScoreBar label="Sweetness"  score={activeMetrics.sweetnessScore}  emoji="🍬" />
        <ScoreBar label="Richness"   score={activeMetrics.richnessScore}   emoji="✨" />
        <ScoreBar label="Lightness"  score={activeMetrics.lightnessScore}  emoji="☁️" />
      </div>

      {/* ── Ratio Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ratioData.map((r) => (
          <div key={r.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
            <div className="text-2xl font-black" style={{ color: r.color }}>{r.value.toFixed(1)}%</div>
            <div className="text-xs text-gray-500 mt-1">{r.label}</div>
            <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${Math.min(100, r.value * 2)}%`, backgroundColor: r.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Qualitative Predictions ── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>📊</span> Baking Predictions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PredictionRow icon="🌾" label="Gluten Development" value={activeMetrics.glutenDevelopment} />
          <PredictionRow icon="⬆️" label="Leavening Type"     value={activeMetrics.leavenType} />
          <PredictionRow icon="🧁" label="Predicted Crumb"    value={activeMetrics.predictedCrumb} />
          <PredictionRow icon="📅" label="Shelf Life"         value={metrics.shelfLife} />
          <PredictionRow icon="🌡️" label="Baking Temp"        value={activeMetrics.bakingTemp} />
          <PredictionRow icon="⚖️" label="Total Weight"       value={`${activeMetrics.totalWeight.toFixed(0)}g`} />
        </div>
      </div>

    </div>
  );
}
