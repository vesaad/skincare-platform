import pandas as pd
import numpy as np
import os

RANDOM_SEED  = 42
N_PER_CAT    = 20
CATEGORIES   = ['Moisturizer', 'Serum', 'Cleanser', 'Toner', 'Sunscreen']

INPUT_CSV    = os.path.join(os.path.dirname(__file__), '..', 'data', 'products.csv')
OUTPUT_CSV   = os.path.join(os.path.dirname(__file__), '..', 'data', 'skincare_100.csv')


def assign_category(row):
    ing = str(row['Ingredients']).lower()
    if 'salicylic' in ing:
        return 'Cleanser'
    elif 'retinol' in ing and 'ceramide' in ing:
        return 'Moisturizer'
    elif 'hyaluronic' in ing and 'vitamin_c' in ing:
        return 'Serum'
    elif 'niacinamide' in ing:
        return 'Toner'
    elif 'spf' in ing or 'zinc' in ing or 'titanium' in ing:
        return 'Sunscreen'
    else:
        return CATEGORIES[int(row['Product_ID']) % 5]


def main():
    print(f"Reading {INPUT_CSV} ...")
    df = pd.read_csv(INPUT_CSV)
    print(f"  Raw rows: {len(df)}  |  Columns: {df.columns.tolist()}")

    # Assign category
    cats = [assign_category(row) for _, row in df.iterrows()]
    df = df.copy()
    df['category'] = cats
    print("\nCategory distribution (raw):")
    print(df['category'].value_counts().to_string())

    # Sample exactly N_PER_CAT per category
    frames = []
    for cat in CATEGORIES:
        sub = df[df['category'] == cat]
        n = min(N_PER_CAT, len(sub))
        if n < N_PER_CAT:
            print(f"  WARNING: {cat} has only {len(sub)} rows, taking all {n}")
        frames.append(sub.sample(n=n, random_state=RANDOM_SEED))

    sampled = pd.concat(frames).reset_index(drop=True)
    sampled['id']          = range(len(sampled))
    sampled['name']        = sampled['Brand'].str.strip() + ' ' + sampled['category'].str.strip()
    sampled['Ingredients'] = sampled['Ingredients'].str.replace('_', ' ').str.strip()

    final = sampled[['id', 'Product_ID', 'name', 'Brand', 'category', 'Price', 'Ingredients']]

    os.makedirs(os.path.dirname(OUTPUT_CSV), exist_ok=True)
    final.to_csv(OUTPUT_CSV, index=False)

    print(f"\nFinal dataset: {len(final)} rows")
    print(final['category'].value_counts().sort_index().to_string())
    print(f"\nSample names:")
    print(final[['id', 'name', 'category', 'Price']].head(10).to_string(index=False))
    print(f"\nSaved → {OUTPUT_CSV}")


if __name__ == '__main__':
    main()
