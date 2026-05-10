import { ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";

export function getTrustStatus(score) {
  if (score == null) return { label: "Analysis Pending", tone: "neutral" };
  if (score >= 85) return { label: "Exceeds Expectations", tone: "good" };
  if (score >= 70) return { label: "Meets Expectations", tone: "warn" };
  return { label: "Disappoints", tone: "bad" };
}

const toneStyles = {
  good: {
    ring: "from-emerald-500 to-emerald-200",
    text: "text-emerald-300",
    badge: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    Icon: ShieldCheck,
  },
  warn: {
    ring: "from-amber-500 to-amber-200",
    text: "text-amber-300",
    badge: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    Icon: ShieldAlert,
  },
  bad: {
    ring: "from-red-500 to-red-200",
    text: "text-red-300",
    badge: "border-red-500/40 bg-red-500/10 text-red-300",
    Icon: ShieldAlert,
  },
  neutral: {
    ring: "from-zinc-500 to-zinc-300",
    text: "text-zinc-300",
    badge: "border-zinc-500/40 bg-zinc-400/10 text-zinc-300",
    Icon: ShieldQuestion,
  },
};

export default function TrustScore({ score, size = "large" }) {
  const status = getTrustStatus(score);
  const style = toneStyles[status.tone];
  const Icon = style.Icon;
  const isCompact = size === "compact";

  return (
    <div className={`flex items-center gap-5 ${isCompact ? "" : "sm:gap-7"}`}>
      <div
        className={`relative grid shrink-0 place-items-center rounded-full bg-gradient-to-br ${style.ring} p-1 ${
          isCompact ? "h-20 w-20" : "h-36 w-36"
        }`}
      >
        <div className="grid h-full w-full place-items-center rounded-full bg-black">
          <span className={`font-black tracking-tight ${style.text} ${isCompact ? "text-xl" : "text-4xl"}`}>
            {score == null ? "--" : score}
          </span>
          {!isCompact && <span className="-mt-6 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">score</span>}
        </div>
      </div>
      <div>
        <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold ${style.badge}`}>
          <Icon size={15} />
          {status.label}
        </span>
        {!isCompact && (
          <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-400">
            This placeholder score can be replaced by your regression model once backend scoring is ready.
          </p>
        )}
      </div>
    </div>
  );
}
