# Skincare Platform

## Canonical dataset (Lab2 + ML)

Both the PostgreSQL seed and the Jupyter notebook read **`data/skincare_100.csv`** only. That file is generated once from the read-only Kaggle source **`data/products.csv`**.

| File | Role |
|------|------|
| `data/products.csv` | Original ~600-row dataset (do not edit) |
| `scripts/preprocessing.py` | Builds `skincare_100.csv` (20 per category, `RANDOM_SEED=42`) |
| `data/skincare_100.csv` | Single source of truth (100 rows, `id` 0–99) |
| `backend/seedProducts.js` | Upserts products into PostgreSQL from the CSV |
| `ml/skincare_ml_clean.ipynb` | ML pipeline (cells 3 & 19 load/merge the same CSV) |

### Execution order

1. **Generate the canonical CSV**
   ```bash
   python scripts/preprocessing.py
   ```
2. **Apply Prisma schema**
   ```bash
   cd backend && npx prisma migrate dev
   ```
3. **Seed the database** (requires `csv-parser`; run `npm install` in `backend` first)
   ```bash
   cd backend && npm install && node seedProducts.js
   ```
4. **Run the notebook** — open `ml/skincare_ml_clean.ipynb` and run all cells.

**Python dependency for step 1:** `pip install pandas` (only needed for `preprocessing.py`; not added to `package.json`).

Place the full Kaggle `products.csv` in `data/` before step 1 if your copy only has Brand/Price/Ingredients (no `Product_Type`). Also add `data/users.csv` and `data/interactions.csv` for the ML notebook.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
