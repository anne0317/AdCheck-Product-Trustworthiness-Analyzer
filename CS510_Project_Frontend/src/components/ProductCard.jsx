import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function badgeClass(score) {
  if (score == null) return "border-zinc-600 bg-zinc-900 text-zinc-300";
  if (score >= 85) return "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
  if (score >= 70) return "border-amber-500/50 bg-amber-500/10 text-amber-300";
  return "border-red-500/50 bg-red-500/10 text-red-300";
}

export default function ProductCard({ product }) {
  const score = product?.trust_score;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group glass-panel block overflow-hidden rounded-lg transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-[#111]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950">
        <img
          src={product.image}
          alt={product.product_name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <span className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-xs font-bold ${badgeClass(score)}`}>
          {score == null ? "Coming Soon" : `${score}% Trust`}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-black tracking-tight text-white">{product.product_name}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-400">{product.description}</p>
          </div>
          <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-zinc-200 transition group-hover:bg-white group-hover:text-black">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}
