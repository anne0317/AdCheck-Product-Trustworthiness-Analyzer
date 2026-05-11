const fallbackWords = [
  { text: "reviews", weight: 26 },
  { text: "analysis", weight: 22 },
  { text: "pending", weight: 18 },
  { text: "claims", weight: 15 },
  { text: "trust", weight: 13 },
];

export default function WordCloud({ words }) {
  const items = words?.length ? words : fallbackWords;
  const isFallback = !words?.length;
  const weights = items.map((word) => word.weight);
  const minWeight = Math.min(...weights);
  const maxWeight = Math.max(...weights);
  const spread = Math.max(1, maxWeight - minWeight);

  return (
    <div className="rounded-lg border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(56,217,169,0.13),transparent_32%),#000] p-5">
      <div className="flex min-h-[300px] flex-wrap items-center justify-center gap-x-4 gap-y-3">
        {items.map((word, index) => {
          const normalized = (word.weight - minWeight) / spread;
          const size = isFallback ? Math.min(30, Math.max(15, word.weight)) : Math.round(15 + normalized * 27);
          const opacity = isFallback ? 0.65 : 0.72 + normalized * 0.28;
          const toneClass =
            index % 3 === 0 ? "text-emerald-100" : index % 3 === 1 ? "text-zinc-100" : "text-amber-100";

          return (
            <span
              key={word.text}
              className={`rounded-full border px-4 py-2 font-black leading-none transition hover:-translate-y-0.5 ${
                isFallback
                  ? "border-zinc-500/25 bg-zinc-400/10 text-zinc-400"
                  : `border-white/15 bg-white/[0.04] ${toneClass} hover:border-white/40 hover:text-white`
              }`}
              style={{ fontSize: `${size}px`, opacity }}
              title={`${word.weight} mentions`}
            >
              {word.text}
            </span>
          );
        })}
      </div>
      {isFallback && <p className="mt-4 text-center text-sm text-zinc-400">No keyword frequencies were generated.</p>}
    </div>
  );
}
