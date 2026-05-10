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

  return (
    <div className="rounded-lg border border-white/10 bg-black p-5">
      <div className="flex min-h-[230px] flex-wrap items-center justify-center gap-3">
        {items.map((word) => {
          const size = Math.min(34, Math.max(14, word.weight));
          return (
            <span
              key={word.text}
              className={`rounded-full border px-4 py-2 font-black transition hover:-translate-y-0.5 ${
                isFallback
                  ? "border-zinc-500/25 bg-zinc-400/10 text-zinc-400"
                  : "border-white/15 bg-white/[0.04] text-zinc-100 hover:border-white/40 hover:text-white"
              }`}
              style={{ fontSize: `${size}px` }}
            >
              {word.text}
            </span>
          );
        })}
      </div>
      {isFallback && <p className="mt-4 text-center text-sm text-zinc-400">Word cloud data coming soon.</p>}
    </div>
  );
}
