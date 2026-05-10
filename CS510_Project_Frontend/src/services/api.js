import axios from "axios";
import ratingUI from "../../../rating_UI.json";
import claimVsReality from "../../../claim_vs_reality_final.json";
import sentimentByProduct from "../../../sentiment_by_product.json";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 10000,
});

const shouldUseMockData = import.meta.env.VITE_USE_MOCK_DATA !== "false";

const wait = (ms = 450) => new Promise((resolve) => setTimeout(resolve, ms));

// Combine data from JSON files
const combineData = () => {
  return ratingUI.map(product => {
    const claim = claimVsReality.find(c => c.product_name === product.product_name);
    const sentimentData = sentimentByProduct[product.product_name];
    return {
      id: product.id,
      product_name: product.product_name,
      image: `https://via.placeholder.com/300?text=${encodeURIComponent(product.product_name)}`,
      description: `Analysis for ${product.product_name}`,
      trust_score: product.sentiment.positive || 0,
      sentiment: {
        positive: product.sentiment.positive || 0,
        neutral: product.sentiment.neutral || 0,
        negative: product.sentiment.negative || 0,
      },
      claim_vs_reality: claim ? claim.claim_vs_reality : [],
      summary: sentimentData && sentimentData.reviews.length > 0 
        ? `Based on ${sentimentData.total_reviews} reviews, ${product.sentiment.positive}% positive sentiment.`
        : "No review data available.",
      reviews: sentimentData ? sentimentData.reviews.slice(0, 10) : [], // Limit to 10 reviews
      keywords: [], // Placeholder for keywords
    };
  });
};

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
