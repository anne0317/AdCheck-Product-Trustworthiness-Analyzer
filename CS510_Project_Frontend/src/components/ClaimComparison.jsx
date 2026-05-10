export default function ClaimComparison({ rows }) {
  if (!rows?.length) {
    return (
      <div className="rounded-lg border border-dashed border-white/15 bg-white/[0.04] p-8 text-center">
        <p className="text-lg font-bold text-white">Comparison data not available yet</p>
        <p className="mt-2 text-sm text-zinc-400">Advertised claims can be mapped here after backend extraction is complete.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-white/10">
      <div className="hidden grid-cols-[0.8fr_1fr_1.4fr] gap-4 bg-white/[0.06] px-5 py-4 text-xs font-bold uppercase tracking-[0.18em] text-zinc-400 md:grid">
        <span>Feature</span>
        <span>Advertised</span>
        <span>Actual User Experience</span>
      </div>
      <div className="divide-y divide-white/10">
        {rows.map((row) => (
          <div key={row.feature} className="grid gap-4 px-5 py-5 text-sm md:grid-cols-[0.8fr_1fr_1.4fr]">
            <div>
              <p className="metric-label mb-1 md:hidden">Feature</p>
              <p className="font-bold text-white">{row.feature}</p>
            </div>
            <div>
              <p className="metric-label mb-1 md:hidden">Advertised</p>
              <p className="text-zinc-300">{row.advertised || "Data coming soon"}</p>
            </div>
            <div>
              <p className="metric-label mb-1 md:hidden">Actual User Experience</p>
              <p className="text-zinc-300">{row.actual || "Data coming soon"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
