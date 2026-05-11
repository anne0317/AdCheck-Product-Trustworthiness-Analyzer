import axios from "axios";
import ratingUI from "../../../data/json_outputs/rating_UI.json";
import claimVsReality from "../../../data/json_outputs/claim_vs_reality_final.json";
import sentimentByProduct from "../../../data/json_outputs/sentiment_by_product.json";
import sentimentReviews from "../../../data/json_outputs/sentiment_reviews.json";
import knowledgeBase from "../../../data/json_outputs/knowledge_base.json";
import regressionScores from "../../../data/json_outputs/regression_scores.json";
import seedProducts from "../../../data/json_outputs/product_seed_data.json";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 10000,
});

const shouldUseMockData = import.meta.env.VITE_USE_MOCK_DATA !== "false";

const wait = (ms = 450) => new Promise((resolve) => setTimeout(resolve, ms));

const IMAGE_BY_PRODUCT = {
  "Amazon Echo Dot (5th Gen)": "https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_SL1000_.jpg",
  "CeraVe Moisturizing Cream":
    "https://www.cerave.com/-/media/project/loreal/brand-sites/cerave/americas/us/skincare/moisturizers/moisturizing-cream/cerave_moisturizing_cream_16oz_front-700x875-v2.jpg",
  "Neutrogena Hydro Boost Water Gel": "https://m.media-amazon.com/images/I/71v8I5T1uLL._SL1500_.jpg",
  "Nespresso Vertuo Next Coffee Machine":
    "https://www.nespresso.com/ecom/medias/sys_master/public/14413124747294/vertuo-next-classic-c-black-d-1000x1000.png",
  "Apple Watch Series 11":
    "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-card-40-s11-202509?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1756248069560",
  "Mini Mic Pro": "https://minimicpro.com/cdn/shop/files/MiniMicPro2Pack.png?v=1710190640",
  "COSRX Snail Mucin 96% Power Repairing Essence":
    "https://www.cosrx.com/cdn/shop/products/Advanced_Snail_96_Mucin_Power_Essence_100ml_1.png?v=1677649824",
  "Bedsure Satin Pillowcase Set": "https://bedsurehome.com/cdn/shop/files/SatinPillowcaseSet.jpg?v=1713170185",
  "Byoma Balancing Face Mist": "https://www.byoma.com/cdn/shop/files/BalancingFaceMist.png?v=1707408028",
  "Milk Makeup Cooling Water Jelly Tint":
    "https://www.milkmakeup.com/cdn/shop/files/CoolingWaterJellyTint_Burst_PDP_1.jpg?v=1705416957",
  "Aquaphor Healing Ointment": "https://m.media-amazon.com/images/I/71DvmzJB3KL._SL1500_.jpg",
  "Theragun Mini Percussive Massager": "https://media.therabody.com/i/theragun/mini-3g-black-pdp-1",
  "Fairlife Core Power High Protein (26g) Shake, Chocolate, 14 fl oz":
    "https://m.media-amazon.com/images/I/71wA5p7KYmL._SL1500_.jpg",
  "bella 2-Slice Slim Toaster": "https://m.media-amazon.com/images/I/61TSStjUDTL._AC_SL1500_.jpg",
  "eos Shea Better Body Lotion": "https://m.media-amazon.com/images/I/71x6gLaKXlL._SL1500_.jpg",
  "Drift Car Air Freshener": "https://drift.co/cdn/shop/files/WoodStarterKit_Grove_1.jpg?v=1714677585",
  "HP 14 Laptop": "https://m.media-amazon.com/images/I/71XqR4n79xL._AC_SL1500_.jpg",
  "Frigidaire Ice Maker": "https://m.media-amazon.com/images/I/71DX5sF7zRL._AC_SL1500_.jpg",
  "Celsius Peach-Mango Green Tea": "https://m.media-amazon.com/images/I/81gz8laCFNL._SL1500_.jpg",
  "Inaba Churu Cat Treats": "https://m.media-amazon.com/images/I/81wKfmbfBXL._AC_SL1500_.jpg",
  Kindle: "https://m.media-amazon.com/images/I/61vPYVQudHL._AC_SL1000_.jpg",
  "Stanley Quencher H2.0 40oz Tumbler":
    "https://www.stanley1913.com/cdn/shop/files/B2B_Web_PNG-TheQuencherH2.0FlowStateTumbler40OZ-30_oz-CherryBlossom-Front.png?v=1739218616",
  "Instant Pot Duo 7-in-1": "https://m.media-amazon.com/images/I/71WtwEvYDOS._AC_SL1500_.jpg",
  "Bose QuietComfort 45 Headphones": "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/qc45/product_silo_images/QC45_PDP_Ecom-Gallery-B03.png",
  "Anker 735 USB-C Charger (GaNPrime 65W)": "https://m.media-amazon.com/images/I/61K0hSx0HLL._AC_SL1500_.jpg",
  "Fire TV Stick 4K Max": "https://m.media-amazon.com/images/I/51TjJOTfslL._AC_SL1000_.jpg",
  "Amara Organic Smoothie Melts, Mighty Sweet Greens, Baby & Toddler Snacks":
    "https://m.media-amazon.com/images/I/81iXpE0mAOL._SL1500_.jpg",
  "Essie Nail Polish, Mademoisselle": "https://m.media-amazon.com/images/I/61hlT-d5sGL._SL1500_.jpg",
  "uni® POSCA® PC-5M, Water-Based Paint Markers (16 Pack)": "https://m.media-amazon.com/images/I/81p53fVr3DL._AC_SL1500_.jpg",
  "Liquid IV Lemon lime hydration multiplier sugar free": "https://m.media-amazon.com/images/I/81N6jVE4DRL._SL1500_.jpg",
  "Optimum Nutrition Gold Standard 100% Whey Protein Powder": "https://m.media-amazon.com/images/I/71QNl7alHPL._AC_SL1500_.jpg",
  "Fitbit Inspire 3 Activity Tracker": "https://m.media-amazon.com/images/I/61j8Dke1gHL._AC_SL1500_.jpg",
};

const seedByProduct = Object.fromEntries(seedProducts.map((product) => [product.product_name, product]));
const claimsByProduct = Object.fromEntries(claimVsReality.map((entry) => [entry.product_name, entry.claim_vs_reality ?? []]));

const reviewsByProduct = sentimentReviews.reduce((groups, review) => {
  if (!review?.product_name) return groups;
  groups[review.product_name] = groups[review.product_name] ?? [];
  groups[review.product_name].push(review);
  return groups;
}, {});

const stopWords = new Set([
  "about",
  "after",
  "again",
  "also",
  "because",
  "before",
  "being",
  "bought",
  "could",
  "from",
  "good",
  "great",
  "have",
  "just",
  "like",
  "more",
  "much",
  "other",
  "ordered",
  "order",
  "product",
  "purchase",
  "purchased",
  "really",
  "review",
  "some",
  "than",
  "that",
  "their",
  "them",
  "then",
  "there",
  "these",
  "they",
  "this",
  "very",
  "were",
  "what",
  "with",
  "would",
  "your",
  "when",
  "will",
  "first",
  "january",
  "february",
  "march",
  "april",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
]);

function sentimentPercentages(productName) {
  const reviews = reviewsByProduct[productName] ?? [];
  const fallback = sentimentByProduct[productName];
  const counts = reviews.reduce(
    (acc, review) => {
      const key = String(review.sentiment ?? "").toLowerCase();
      if (key in acc) acc[key] += 1;
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 },
  );

  if (!reviews.length && fallback?.rated_reviews > 0) {
    counts.positive = fallback.positive_count ?? 0;
    counts.neutral = fallback.neutral_count ?? 0;
    counts.negative = fallback.negative_count ?? 0;
  }

  const total = counts.positive + counts.neutral + counts.negative;
  if (!total) return { counts, percentages: { positive: null, neutral: null, negative: null }, ratedTotal: 0 };

  const positive = Math.round((counts.positive / total) * 100);
  const neutral = Math.round((counts.neutral / total) * 100);
  const negative = Math.max(0, 100 - positive - neutral);
  return { counts, percentages: { positive, neutral, negative }, ratedTotal: total };
}

function summarizeReviews(productName, sentiment, reviewCount, platformSummary) {
  if (!reviewCount) return "No generated reviews were found for this product.";

  const leadingTone =
    sentiment.positive >= sentiment.negative && sentiment.positive >= sentiment.neutral
      ? "positive"
      : sentiment.negative >= sentiment.neutral
        ? "negative"
        : "mixed";
  const platforms = platformSummary.map((item) => item.source).join(", ");
  return `Based on ${reviewCount.toLocaleString()} generated review records from ${platforms || "available sources"}, shopper sentiment is ${leadingTone}: ${sentiment.positive}% positive, ${sentiment.neutral}% neutral, and ${sentiment.negative}% negative.`;
}

function extractKeywords(reviews) {
  const counts = {};
  reviews.forEach((review) => {
    `${review.title ?? ""} ${review.body ?? ""}`
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 3 && !/^\d+$/.test(word) && !stopWords.has(word))
      .forEach((word) => {
        counts[word] = (counts[word] ?? 0) + 1;
      });
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 24)
    .map(([text, count]) => ({ text, weight: count }));
}

function sentimentPlatformSummary(reviews) {
  const grouped = reviews.reduce((acc, review) => {
    const source = review.source || "unknown";
    acc[source] = acc[source] ?? { source, reviews: 0, positive: 0, neutral: 0, negative: 0, ratings: [] };
    acc[source].reviews += 1;
    if (review.sentiment in acc[source]) acc[source][review.sentiment] += 1;
    if (typeof review.rating === "number") acc[source].ratings.push(review.rating);
    return acc;
  }, {});

  return Object.values(grouped)
    .map((item) => ({
      source: formatSourceName(item.source),
      source_key: item.source,
      reviews: item.reviews,
      positive_pct: Math.round((item.positive / item.reviews) * 100),
      neutral_pct: Math.round((item.neutral / item.reviews) * 100),
      negative_pct: Math.round((item.negative / item.reviews) * 100),
      avg_rating: item.ratings.length
        ? Number((item.ratings.reduce((sum, rating) => sum + rating, 0) / item.ratings.length).toFixed(2))
        : null,
    }))
    .sort((a, b) => b.reviews - a.reviews);
}

function regressionPlatformSummary(regression) {
  return (regression?.platform_trends ?? []).map((trend) => ({
    ...trend,
    source: formatSourceName(trend.source),
    source_key: trend.source,
  }));
}

function formatSourceName(source = "") {
  const cleaned = source
    .replace(/_txt$/i, "")
    .replace(/\.com$/i, "")
    .replace(/_/g, " ")
    .trim();

  return cleaned
    .split(/\s+/)
    .map((word) => {
      const lower = word.toLowerCase();
      if (lower === "amazon") return "Amazon";
      if (lower === "walmart") return "Walmart";
      if (lower === "target") return "Target";
      if (lower === "reddit") return "Reddit";
      if (lower === "ulta") return "Ulta";
      if (lower === "cvs") return "CVS";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function getImage(productName) {
  return IMAGE_BY_PRODUCT[productName] ?? seedByProduct[productName]?.image ?? "";
}

function productSources(productName) {
  const sources = knowledgeBase[productName]?.sources ?? {};
  return Object.values(sources)
    .filter((source) => source?.url)
    .map((source) => ({
      label: source.label,
      url: source.url,
      review_count: source.review_count ?? 0,
      error: source.error ?? null,
    }));
}

const combineData = () =>
  regressionScores.map((regression) => {
    const productName = regression.product_name;
    const ratingProduct = ratingUI.find((product) => product.product_name === productName);
    const reviews = reviewsByProduct[productName] ?? [];
    const { counts, percentages, ratedTotal } = sentimentPercentages(productName);
    const sentimentPlatforms = sentimentPlatformSummary(reviews);
    const regressionPlatforms = regressionPlatformSummary(regression);
    const description = knowledgeBase[productName]?.combined_description || seedByProduct[productName]?.description || "";

    return {
      id: ratingProduct?.id ?? regression.product_id,
      product_name: productName,
      image: getImage(productName),
      description,
      trust_score: regression.trust_score,
      sentiment: percentages,
      sentiment_counts: counts,
      claim_vs_reality: claimsByProduct[productName] ?? [],
      summary: summarizeReviews(productName, percentages, ratedTotal, sentimentPlatforms),
      reviews: (() => {
        const sources = [...new Set(reviews.map((r) => r.source))];
        const picked = sources.flatMap((src) => {
          const srcReviews = reviews.filter((r) => r.source === src);
          const sentiments = ["negative", "neutral", "positive"];
          return sentiments
            .map((s) => srcReviews.find((r) => r.sentiment === s))
            .filter(Boolean)
            .slice(0, 2);
        });
        return picked.map((review) => ({
          ...review,
          display_source: formatSourceName(review.source),
        }));
      })(),
      review_count: reviews.length || knowledgeBase[productName]?.total_reviews || 0,
      keywords: extractKeywords(reviews),
      platform_summary: sentimentPlatforms,
      product_sources: productSources(productName),
      regression: {
        model: regression.model,
        confidence: regression.confidence,
        platform_trends: regressionPlatforms,
        feature_importance: regression.feature_importance ?? [],
      },
    };
  });

const actualProducts = combineData();

export async function getProducts() {
  if (shouldUseMockData) {
    await wait();
    return actualProducts;
  }

  const response = await api.get("/products");
  return response.data ?? [];
}

export async function getProductById(id) {
  if (shouldUseMockData) {
    await wait();
    return actualProducts.find((product) => product.id === id) ?? null;
  }

  const response = await api.get(`/products/${id}`);
  return response.data ?? null;
}

export default api;
