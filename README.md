# AdCheck: Product Trustworthiness Analyzer

AdCheck is a full-stack project that compares advertised product claims with real shopper experience. The app aggregates generated backend JSON outputs from scraping, sentiment analysis, claim comparison, and regression notebooks, then renders a searchable product trust dashboard in React.

## Project Structure

```text
CS_510/
├── CS510_Project_Frontend/       # React + Vite frontend
├── data/
│   └── json_outputs/             # Generated backend JSON artifacts
├── notebooks/                    # Backend notebooks
├── product_list.xlsx             # Product input list
└── README.md
```

## Data Flow

1. `notebooks/scrape_knowledge_base.ipynb` and `notebooks/kb_colab.ipynb` collect product descriptions and reviews into `data/json_outputs/knowledge_base.json`.
2. `notebooks/sentiment_analysis.ipynb` produces review sentiment files, including `sentiment_reviews.json`, `sentiment_by_product.json`, and `rating_UI.json`.
3. `notebooks/regression.ipynb` consumes the sentiment outputs and writes `data/json_outputs/regression_scores.json`, including final trust scores, platform trends, confidence, and feature importance.
4. `notebooks/claims_model.ipynb` independently produces claim comparison outputs such as `claim_vs_reality_final.json`.
5. The React frontend imports the generated JSON files from `data/json_outputs/` and renders the dashboard, product details, sentiment chart, regression trend chart, word cloud, claim comparison, and review summaries.

## Running The Frontend

```bash
cd CS510_Project_Frontend
npm install
npm run dev
```

Open the local Vite URL shown in the terminal, usually `http://127.0.0.1:5173/`.

## Building

```bash
cd CS510_Project_Frontend
npm run build
```

## Key Outputs Used By The UI

- `data/json_outputs/regression_scores.json`: final trust score, regression confidence, platform trends, and feature importance.
- `data/json_outputs/sentiment_reviews.json`: individual reviews with sentiment labels used for sentiment charts, summaries, source breakdowns, and word cloud terms.
- `data/json_outputs/rating_UI.json`: product IDs and aggregate sentiment percentages.
- `data/json_outputs/knowledge_base.json`: official product descriptions and scraped source metadata.
- `data/json_outputs/claim_vs_reality_final.json`: advertised claim versus user experience rows.
- `data/json_outputs/product_seed_data.json`: product image and display metadata used to support the UI.

## Notes

- The frontend currently displays the ten products present in `regression_scores.json`.
- Generated JSON files should stay under `data/json_outputs/`.
- Notebook files should stay under `notebooks/`.
- `node_modules/` and `dist/` are generated artifacts and should normally be excluded from commits.
