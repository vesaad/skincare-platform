"""
Save the trained Random Forest bundle to model.pkl.

In Jupyter (after training rf, enc_dt, le_target_dt, feature_cols_dt):

    import joblib
    model_data = {
        'model':          rf,
        'encoders':       enc_dt,
        'target_encoder': le_target_dt,
        'feature_cols':   feature_cols_dt,
    }
    joblib.dump(model_data, 'ml-service/model.pkl')
    print("Model saved to ml-service/model.pkl")

Or run this script if the notebook variables are in scope (interactive only).
"""

from pathlib import Path

import joblib

OUTPUT = Path(__file__).resolve().parent / "model.pkl"


def save_bundle(model, encoders, target_encoder, feature_cols) -> None:
    bundle = {
        "model": model,
        "encoders": encoders,
        "target_encoder": target_encoder,
        "feature_cols": feature_cols,
    }
    joblib.dump(bundle, OUTPUT)
    print(f"Model saved to {OUTPUT}")


if __name__ == "__main__":
    print(
        "Run the Jupyter cell above to export model.pkl, "
        "or call save_bundle(model, encoders, target_encoder, feature_cols) from a notebook."
    )
