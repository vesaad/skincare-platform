"""Load model, predict routine, and map to products from skincare_100.csv."""

from __future__ import annotations

import re
from functools import lru_cache
from pathlib import Path
from typing import Any

import joblib
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "model.pkl"
CSV_PATH = BASE_DIR / "skincare_100.csv"

ROUTINE_STEPS: dict[str, list[tuple[str, str]]] = {
    "Acne Routine": [
        ("Cleanser", "Salicylic Acid"),
        ("Toner", "Ceramides"),
        ("Serum", "Hyaluronic Acid"),
        ("Moisturizer", "Ceramides"),
    ],
    "Hydration Routine": [
        ("Cleanser", "Hyaluronic Acid"),
        ("Toner", "Hyaluronic Acid"),
        ("Serum", "Hyaluronic Acid"),
        ("Moisturizer", "Ceramides"),
    ],
    "Brightening Routine": [
        ("Cleanser", "Vitamin C"),
        ("Serum", "Vitamin C"),
        ("Moisturizer", "Vitamin C"),
        ("Sunscreen", "Vitamin C"),
    ],
    "Anti-Aging Routine": [
        ("Cleanser", "Retinol"),
        ("Serum", "Retinol"),
        ("Moisturizer", "Retinol"),
        ("Sunscreen", "Retinol"),
    ],
    "Sensitive Skin Routine": [
        ("Cleanser", "Ceramides"),
        ("Toner", "Ceramides"),
        ("Moisturizer", "Ceramides"),
        ("Sunscreen", "Hyaluronic Acid"),
    ],
}

CATEGORICAL_FEATURES = {
    "Skin_Type",
    "Skin_Tone",
    "Climate",
    "Diet",
    "Hormonal_Status",
    "Budget_Level",
}


def _normalize_ingredient(text: str) -> str:
    return re.sub(r"\s+", " ", text.strip().lower().replace("_", " "))


def _ingredient_matches(ingredients_str: str, target: str) -> bool:
    if not ingredients_str or pd.isna(ingredients_str):
        return False
    target_n = _normalize_ingredient(target)
    parts = [_normalize_ingredient(p) for p in str(ingredients_str).split("|") if p.strip()]
    return any(target_n in p or p in target_n for p in parts)


@lru_cache(maxsize=1)
def load_model_bundle() -> dict[str, Any]:
    if not MODEL_PATH.exists():
        raise FileNotFoundError(f"Model not found: {MODEL_PATH}")
    return joblib.load(MODEL_PATH)


@lru_cache(maxsize=1)
def load_products_df() -> pd.DataFrame:
    if not CSV_PATH.exists():
        raise FileNotFoundError(f"Product catalog not found: {CSV_PATH}")
    return pd.read_csv(CSV_PATH)


def _encode_value(encoders: dict[str, Any], column: str, value: Any) -> Any:
    encoder = encoders.get(column)
    if encoder is None:
        return value
    try:
        return encoder.transform([str(value)])[0]
    except ValueError:
        # unseen label — use first known class if available
        if hasattr(encoder, "classes_") and len(encoder.classes_):
            return encoder.transform([encoder.classes_[0]])[0]
        raise


def _build_feature_vector(payload: dict[str, Any], bundle: dict[str, Any]) -> list[Any]:
    feature_cols = bundle["feature_cols"]
    encoders = bundle.get("encoders", {})
    row: list[Any] = []

    for col in feature_cols:
        raw = payload.get(col)
        if raw is None:
            raise ValueError(f"Missing required field: {col}")
        if col in CATEGORICAL_FEATURES or col in encoders:
            row.append(_encode_value(encoders, col, raw))
        else:
            row.append(float(raw))
    return row


def predict_routine(payload: dict[str, Any]) -> tuple[str, float]:
    bundle = load_model_bundle()
    model = bundle["model"]
    target_encoder = bundle["target_encoder"]

    features = _build_feature_vector(payload, bundle)
    proba = model.predict_proba([features])[0]
    idx = int(proba.argmax())
    routine = target_encoder.inverse_transform([idx])[0]
    confidence = round(float(proba[idx]) * 100, 1)
    return str(routine), confidence


def select_product(category: str, target_ingredient: str) -> dict[str, Any] | None:
    df = load_products_df()
    cat_df = df[df["category"].str.lower() == category.lower()].copy()
    if cat_df.empty:
        return None

    with_ingredient = cat_df[
        cat_df["Ingredients"].apply(lambda x: _ingredient_matches(x, target_ingredient))
    ]
    pool = with_ingredient if not with_ingredient.empty else cat_df
    chosen = pool.sort_values("Price", ascending=True).iloc[0]

    ingredients_list = [
        p.strip()
        for p in str(chosen["Ingredients"]).split("|")
        if p.strip()
    ]

    product_id = int(chosen["id"]) if "id" in chosen else int(chosen["Product_ID"])

    return {
        "product_id": product_id,
        "name": str(chosen["name"]),
        "brand": str(chosen["Brand"]),
        "category": str(chosen["category"]),
        "price": float(chosen["Price"]),
        "ingredients": ingredients_list,
    }


def build_routine_products(routine: str) -> list[dict[str, Any]]:
    steps = ROUTINE_STEPS.get(routine)
    if not steps:
        raise ValueError(f"Unknown routine: {routine}")

    products: list[dict[str, Any]] = []
    for category, ingredient in steps:
        product = select_product(category, ingredient)
        if product is None:
            continue
        product["step"] = category
        products.append(product)
    return products


def run_prediction(payload: dict[str, Any]) -> dict[str, Any]:
    routine, confidence = predict_routine(payload)
    products = build_routine_products(routine)
    return {
        "routine": routine,
        "confidence": confidence,
        "products": products,
    }
