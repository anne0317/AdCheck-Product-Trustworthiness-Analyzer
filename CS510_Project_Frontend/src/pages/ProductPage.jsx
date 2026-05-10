import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MessageSquareText, PackageSearch } from "lucide-react";
import ClaimComparison from "../components/ClaimComparison.jsx";
import { DetailSkeleton } from "../components/LoadingSkeleton.jsx";
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
        <p className="mt-3 text-zinc-400">This product may not exist in the mock dataset yet.</p>
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
              {product.description || "Product description coming soon from scraped official sources."}
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
                <p className="mt-2 font-black text-white">{product.reviews?.length || "Pending"}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="metric-label">Data state</p>
                <p className="mt-2 font-black text-white">{product.trust_score == null ? "Coming Soon" : "Mock Ready"}</p>
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
          <p className="metric-label">NLP placeholder</p>
          <h2 className="mt-2 text-2xl font-black text-white">Sentiment Breakdown</h2>
          <div className="mt-5">
            <SentimentChart sentiment={product.sentiment} />
          </div>
        </article>
      </div>

      <article className="glass-panel mt-8 rounded-lg p-6">
        <p className="metric-label">Evidence view</p>
        <h2 className="mt-2 text-2xl font-black text-white">Claim vs Reality</h2>
        <div className="mt-5">
          <ClaimComparison rows={product.claim_vs_reality} />
        </div>
      </article>

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
          {product.summary || "Review summary unavailable. Once backend summarization is connected, this section will explain what users like and what they complain about."}
        </p>
      </article>
    </section>
  );
}
