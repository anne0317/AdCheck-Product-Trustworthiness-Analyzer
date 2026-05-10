import { useEffect, useState } from "react";
import { ArrowRight, FileSearch, ScanLine, ScanSearch, Search, ShieldCheck } from "lucide-react";
import ProductCard from "../components/ProductCard.jsx";
import { ProductGridSkeleton } from "../components/LoadingSkeleton.jsx";
import { getProducts } from "../services/api.js";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let isMounted = true;
    getProducts()
      .then((data) => {
        if (isMounted) setProducts(data ?? []);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredProducts = normalizedQuery
    ? products.filter((product) =>
        [product.product_name, product.description, product.id].some((field) => field?.toLowerCase().includes(normalizedQuery)),
      )
    : [];

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-14 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:pb-20 lg:pt-20">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-bold text-zinc-300">
            <ScanSearch size={16} />
            claim checks for everyday purchases
          </div>
          <h1 className="max-w-3xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Know Before You Buy
          </h1>
          <p className="mt-5 text-xl font-semibold text-zinc-200">A sharper way to read the gap between marketing and reality.</p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
            AdCheck turns scraped product descriptions and real reviews into a compact evidence page: what was promised, what people
            experienced, and whether the product deserves your confidence.
          </p>
          <div className="mt-8">
            <a
              href="#products"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-black transition hover:-translate-y-0.5 hover:bg-zinc-200"
            >
              Search a Product
              <ArrowRight size={18} />
            </a>
          </div>
        </div>

        <div className="glass-panel evidence-board relative overflow-hidden rounded-lg p-6">
          <div className="absolute inset-x-0 top-0 h-px bg-white/70" />
          <div className="absolute inset-y-0 left-8 w-px bg-white/10" />
          <div className="absolute inset-y-0 right-10 w-px bg-white/10" />
          <div className="relative">
            <div className="flex items-center justify-between gap-5">
              <div>
                <p className="metric-label">Evidence board</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-white">From promise to proof</h2>
              </div>
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-white text-black">
                <ShieldCheck size={28} />
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              <div className="relative rounded-lg border border-white/10 bg-black p-5">
                <div className="absolute right-4 top-4 flex gap-1">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <span key={index} className="h-8 w-px bg-white/25" style={{ opacity: index % 3 === 0 ? 0.9 : 0.35 }} />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <FileSearch size={20} className="text-white" />
                  <p className="font-black text-white">Official claim</p>
                </div>
                <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">
                  Product pages, ads, and descriptions become the baseline.
                </p>
              </div>

              <div className="ml-8 rounded-lg border border-white/10 bg-white/[0.045] p-5">
                <div className="flex items-center gap-3">
                  <ScanLine size={20} className="text-white" />
                  <p className="font-black text-white">Review signal</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  Cleaned reviews supply repeated praise, complaints, and suspicious patterns.
                </p>
              </div>

              <div className="relative rounded-lg border border-white/10 bg-[#111] p-5">
                <div className="scan-sweep" />
                <p className="metric-label">Output</p>
                <p className="mt-2 text-2xl font-black text-white">Trust score with receipts</p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {["claims", "sentiment", "summary"].map((item) => (
                    <span key={item} className="rounded border border-white/10 bg-black px-3 py-2 text-center text-xs font-bold text-zinc-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="mb-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="metric-label">Product docket</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-white">Find the product you want checked</h2>
          </div>
          <label className="relative block">
            <Search className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search AirPods, Crocs, vacuum, coffee maker..."
              className="h-16 w-full rounded-lg border border-white/10 bg-black pl-14 pr-5 text-base font-semibold text-white outline-none transition placeholder:text-zinc-600 focus:border-white/40 focus:bg-[#090909]"
            />
          </label>
        </div>

        {loading ? (
          <ProductGridSkeleton />
        ) : !normalizedQuery ? (
          <div className="rounded-lg border border-dashed border-white/15 bg-white/[0.03] px-6 py-12 text-center">
            <Search className="mx-auto text-zinc-500" size={36} />
            <p className="mt-4 text-xl font-black text-white">Start with a product name</p>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-zinc-400">
              The dashboard stays quiet until you search, so the shopper sees the product they care about instead of a crowded catalog.
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/15 bg-white/[0.03] px-6 py-12 text-center">
            <p className="text-xl font-black text-white">No matching product yet</p>
            <p className="mt-2 text-sm text-zinc-400">Try a broader term, or add the product to the backend dataset later.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
