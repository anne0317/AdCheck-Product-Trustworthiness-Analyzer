import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = {
  Positive: "#38d9a9",
  Neutral: "#ffc857",
  Negative: "#ff6b6b",
};

export default function SentimentChart({ sentiment }) {
  const values = sentiment
    ? [
        { name: "Positive", value: sentiment.positive },
        { name: "Neutral", value: sentiment.neutral },
        { name: "Negative", value: sentiment.negative },
      ]
    : [];
  const hasData = values.every((item) => typeof item.value === "number");

  if (!hasData) {
    return (
      <div className="grid min-h-[280px] place-items-center rounded-lg border border-dashed border-white/15 bg-white/[0.04] p-6 text-center">
        <div>
          <p className="text-lg font-bold text-white">Sentiment analysis in progress...</p>
          <p className="mt-2 text-sm text-zinc-400">The chart will populate when the Python NLP service returns scores.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={values} dataKey="value" nameKey="name" innerRadius={64} outerRadius={100} paddingAngle={5}>
            {values.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#0b0b0b",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "12px",
              color: "#fff",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs font-bold text-zinc-300">
        {values.map((entry) => (
          <div key={entry.name} className="rounded-xl bg-white/[0.06] px-2 py-3">
            <span className="mx-auto mb-2 block h-2 w-8 rounded-full" style={{ backgroundColor: COLORS[entry.name] }} />
            {entry.name} {entry.value}%
          </div>
        ))}
      </div>
    </div>
  );
}
