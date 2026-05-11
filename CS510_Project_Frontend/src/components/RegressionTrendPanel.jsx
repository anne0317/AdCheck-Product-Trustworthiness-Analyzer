import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function featureLabel(feature) {
  return feature
    .replace(/_pct\b/gi, " percentage")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function RegressionTrendPanel({ product }) {
  const platformTrends = product.regression?.platform_trends ?? [];
  const featureImportance = product.regression?.feature_importance ?? [];
  const confidence = product.regression?.confidence == null ? null : Math.round(product.regression.confidence * 100);
  const maxAbsWeight = Math.max(...featureImportance.map((item) => Math.abs(item.weight)), 1);

  const trustData = platformTrends.map((item) => ({
    source: item.source,
    "Predicted Trust": item.predicted_trust,
    "Positive Reviews": item.positive_pct,
    "Negative Reviews": item.negative_pct,
  }));

  return (
    <article className="glass-panel mt-8 rounded-lg p-6">
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="metric-label">Regression output</p>
              <h2 className="mt-2 text-2xl font-black text-white">Cross-platform trust trend</h2>
            </div>
            <div className="grid gap-2 text-right sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-black px-4 py-3">
                <p className="metric-label">Model</p>
                <p className="mt-1 font-black text-white">{product.regression?.model}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black px-4 py-3">
                <p className="metric-label">Confidence</p>
                <p className="mt-1 font-black text-white">{confidence}%</p>
              </div>
            </div>
          </div>

          <div className="mt-6 h-80 rounded-lg border border-white/10 bg-black p-4">
              <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trustData} margin={{ left: -18, right: 8, top: 10, bottom: 42 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis
                  dataKey="source"
                  angle={-24}
                  interval={0}
                  textAnchor="end"
                  tick={{ fill: "#a1a1aa", fontSize: 11 }}
                  height={62}
                />
                <YAxis domain={[0, 100]} tick={{ fill: "#a1a1aa", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    background: "#0b0b0b",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="Predicted Trust" fill="#a7f3d0" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Positive Reviews" fill="#38d9a9" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Negative Reviews" fill="#ff6b6b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-black p-5">
          <p className="metric-label">Feature importance</p>
          <h3 className="mt-2 text-lg font-black text-white">Regression drivers</h3>
          <div className="mt-5 space-y-4">
            {featureImportance.map((item) => {
              const width = `${Math.max(8, (Math.abs(item.weight) / maxAbsWeight) * 100)}%`;
              const isPositive = item.weight >= 0;

              return (
                <div key={item.feature}>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="font-bold text-zinc-200">{featureLabel(item.feature)}</span>
                    <span className={isPositive ? "font-black text-emerald-300" : "font-black text-red-300"}>
                      {item.weight.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full ${isPositive ? "bg-emerald-400" : "bg-red-400"}`}
                      style={{ width }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {platformTrends.map((item) => (
              <div key={item.source} className="rounded-lg border border-white/10 bg-white/[0.04] p-3 text-center">
                <p className="truncate text-xs font-bold text-zinc-400">{item.source}</p>
                <p className="mt-1 text-lg font-black text-white">{item.predicted_trust}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
