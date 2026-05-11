import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MessageSquareText, PackageSearch } from "lucide-react";
import ClaimComparison from "../components/ClaimComparison.jsx";
import { DetailSkeleton } from "../components/LoadingSkeleton.jsx";
import RegressionTrendPanel from "../components/RegressionTrendPanel.jsx";
import SentimentChart from "../components/SentimentChart.jsx";
import TrustScore, { getTrustStatus } from "../components/TrustScore.jsx";
import WordCloud from "../components/WordCloud.jsx";
import { getProductById } from "../services/api.js";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getProductById(id)
      .then((data) => {
        if (isMounted) setProduct(data);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <DetailSkeleton />;

  if (!product) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
        <PackageSearch className="mx-auto text-white" size={52} />
        <h1 className="mt-6 text-3xl font-black text-white">Product not found</h1>
        <p className="mt-3 text-zinc-400">This product is not included in the generated regression output.</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-black text-black">
          Back to dashboard
        </Link>
      </section>
    );
  }

  const status = getTrustStatus(product.trust_score);

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-zinc-300 transition hover:text-white">
        <ArrowLeft size={18} />
        Back to dashboard
      </Link>

      <div className="glass-panel overflow-hidden rounded-lg">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[320px]">
            <img src={product.image} alt={product.product_name} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/85 lg:bg-gradient-to-t" />
          </div>
          <div className="p-6 sm:p-10">
            <p className="metric-label">Product analysis</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">{product.product_name}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">
              {product.description || "No official description was found in the generated knowledge base."}
            </p>
            <div className="mt-8">
              <TrustScore score={product.trust_score} />
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="metric-label">Status</p>
                <p className="mt-2 font-black text-white">{status.label}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="metric-label">Reviews</p>
                <p className="mt-2 font-black text-white">{product.review_count ? product.review_count.toLocaleString() : "0"}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="metric-label">Regression</p>
                <p className="mt-2 font-black text-white">{Math.round(product.regression.confidence * 100)}% confidence</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="glass-panel rounded-lg p-6">
          <p className="metric-label">Review language</p>
          <h2 className="mt-2 text-2xl font-black text-white">Word Cloud</h2>
          <div className="mt-5">
            <WordCloud words={product.keywords} />
          </div>
        </article>

        <article className="glass-panel rounded-lg p-6">
          <p className="metric-label">NLP output</p>
          <h2 className="mt-2 text-2xl font-black text-white">Sentiment Breakdown</h2>
          <div className="mt-5">
            <SentimentChart sentiment={product.sentiment} />
          </div>
        </article>
      </div>

      {!!product.claim_vs_reality?.length && (
        <article className="glass-panel mt-8 rounded-lg p-6">
          <p className="metric-label">Evidence view</p>
          <h2 className="mt-2 text-2xl font-black text-white">Claim vs Reality</h2>
          <div className="mt-5">
            <ClaimComparison rows={product.claim_vs_reality} />
          </div>
        </article>
      )}

      <RegressionTrendPanel product={product} />

      <article className="glass-panel mt-8 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-white text-black">
            <MessageSquareText size={22} />
          </span>
          <div>
            <p className="metric-label">Review summary</p>
            <h2 className="text-2xl font-black text-white">What shoppers are saying</h2>
          </div>
        </div>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-300">
          {product.summary || "No review summary was generated for this product."}
        </p>

        {!!product.platform_summary?.length && (
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {product.platform_summary.slice(0, 6).map((platform) => (
              <div key={platform.source} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="truncate text-sm font-black text-white">{platform.source}</p>
                <p className="mt-2 text-xs text-zinc-400">{platform.reviews.toLocaleString()} reviews</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-emerald-400" style={{ width: `${platform.positive_pct}%` }} />
                </div>
                <p className="mt-2 text-xs font-bold text-zinc-300">
                  {platform.positive_pct}% positive{platform.avg_rating ? ` · ${platform.avg_rating}/5 avg` : ""}
                </p>
              </div>
            ))}
          </div>
        )}

        {!!product.platform_summary?.length && (() => {
        // Determine preferred sentiment based on trust score
        const preferredSentiment = product.trust_score >= 70 ? "positive" : product.trust_score >= 45 ? "neutral" : "negative";
        const fallbackOrder = ["negative", "neutral", "positive"];

        // Source key mapping: normalize source names from JSON to platform_summary labels
        const sourceKeyMap = {
          amazon: ["amazon_txt", "amazon"],
          target: ["target_txt", "target"],
          walmart: ["walmart_txt", "walmart"],
        };

        const pickReview = (platformSource) => {
          const normalizedLabel = platformSource.toLowerCase();
          const matchKeys = Object.entries(sourceKeyMap).find(([key]) =>
            normalizedLabel.includes(key)
          )?.[1] ?? [normalizedLabel];

          const platformReviews = (product.reviews ?? []).filter((r) =>
            matchKeys.includes(r.source?.toLowerCase())
          );

          // Try preferred sentiment first, then fallbacks
          const sentimentPriority =
            preferredSentiment === "negative"
              ? ["negative", "neutral", "positive"]
              : preferredSentiment === "neutral"
              ? ["neutral", "negative", "positive"]
              : ["positive", "neutral", "negative"];

          for (const s of sentimentPriority) {
            const match = platformReviews.find((r) => r.sentiment === s);
            if (match) return match;
          }
          return null;
        };

        const platformsToShow = product.platform_summary.slice(0, 3);

        return (
          <div className="mt-6 grid gap-3 lg:grid-cols-3">
            {platformsToShow.map((platform) => {
              const review = pickReview(platform.source);
              return (
                <blockquote key={platform.source} className="rounded-lg border border-white/10 bg-black p-4">
                  {review ? (
                    <>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">{review.sentiment}</p>
                      <p className="mt-2 line-clamp-4 text-sm leading-6 text-zinc-300">{review.body || review.title}</p>
                      <p className="mt-3 text-xs font-bold text-zinc-500">{platform.source}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">No reviews</p>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">No review available for this platform.</p>
                      <p className="mt-3 text-xs font-bold text-zinc-500">{platform.source}</p>
                    </>
                  )}
                </blockquote>
              );
            })}
          </div>
        );
      })()}
      </article>
    </section>
  );
}
