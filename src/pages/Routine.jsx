import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import api from "../services/api";
import { setSavedRoutineId } from "../store/slices/routineSlice";

const shopUrls = {
  // MOISTURIZER
  0:  'https://conaturalintl.com/products/moisturizing-cream',
  1:  'https://www.sephora.com/product/so-soft-daily-moisturizer-P519102',
  2:  'https://www.amazon.com/Roche-Posay-Super-Activated-Anti-Wrinkle-Moisturizer-Strengthens/dp/B0F226HQVW?th=1',
  3:  'https://www.amazon.com/Ponds-Face-Cream-Dry-Skin/dp/B011BHYYXY?th=1',
  4:  'https://www.amazon.com/M-61-Hydraboost-Cream/dp/B00XVZWOCS',
  5:  'https://olivida.nl/en/products/cosrx-advanced-snail-92-all-in-one-cream-tube',
  6:  'https://www.amazon.com/dp/B07NMFBQG5?tag=skinsort00-20&th=1',
  7:  'https://www.shopmissa.com/products/dr-g-r-e-d-blemish-clear-soothing-cream',
  8:  'https://www.iherb.com/pr/tiam-vita-a-anti-wrinkle-moisturizer-2-7-fl-oz-80-ml/125051',
  9:  'https://www.amazon.com/ETUDE-Moistfull-Moisturizer-Macadamia-Moisturizing/dp/B09JC4VFTX?th=1',
  10: 'https://koreacosmeticsbn.com/products/cos-de-baha-pc-m-a-peptide-cream',
  11: 'https://www.sephora.com/product/ultra-repair-cream-intense-hydration-P248407',
  12: 'https://koreacosmeticsbn.com/products/some-by-mi-snail-truecica-miracle-repair-cream',
  13: 'https://olivida.nl/en/products/anua-heartleaf-70-intense-calming-cream',
  14: 'https://www.amazon.com/ETUDE-Moisturizing-Ingredients-Madecassoside-Non-comedogenic/dp/B096RZVTMC?th=1',
  15: 'https://holiholic.com/products/illiyoon-ultra-repair-cream-200ml',
  16: 'https://us.amazon.com/MISSHA-Super-Renew-Korea-Cosmetic/dp/B072PRBB4S',
  17: 'https://www.bbcreamshop.eu/missha-time-revolution-immortal-youth-cream-2x-50-ml',
  18: 'https://us.amazon.com/IOPE-Hyaluronic-Hydrating-Cream-Acid/dp/B099JD3LH1',
  19: 'https://koreacosmeticsbn.com/products/purito-wonder-releaf-centella-cream-unscented',

  // SERUM
  20: 'https://www.sephora.com/product/the-ordinary-deciem-niacinamide-10-zinc-1-P427417',
  21: 'https://www.sephora.com/product/the-ordinary-hyaluronic-acid-2-b5-hydrating-serum-P427419',
  22: 'https://www.sephora.com/product/glow-deep-serum-30ml-P517704',
  23: 'https://www.sephora.com/product/clarins-double-serum-anti-aging-to-firm-boost-radiance-refine-pores-P513530',
  24: 'https://www.sephora.com/brand/torriden',
  25: 'https://en.zalando.de/the-ordinary-soothing-and-barrier-support-serum-serum-thr34g01a-s11.html',
  26: 'https://www.amazon.com/Advanced-Estee-Lauder-Synchronized-Multi-Recovery/dp/B08DH979F7?th=1',
  27: 'https://amazon.in/Radiance-Boosting-Collagen-Peptides-Skincare-15Ml/dp/B0FF4Q872M',
  28: 'https://www.sephora.com/product/atobarrier365-hydro-cera-ha-ceramide-hyaluronic-acid-face-serum-for-skin-moisture-barrier-repair-P515491',
  29: 'https://www.sephora.com/product/sulwhasoo-mini-first-care-activating-serum-P476729',
  30: 'https://www.sephora.com/product/estee-lauder-mini-advanced-night-repair-synchronized-multi-recovery-complex-P461160',
  31: 'https://www.sephora.com/product/tatcha-the-dewy-serum-resurfacing-plumping-treatment-P466155',
  32: 'https://www.sephora.com/product/super-saturated-hydrating-barrier-serum-P518192',
  33: 'https://www.sephora.com/product/dive-in-5d-hyaluronic-acid-intensive-serum-P520792',
  34: 'https://www.sephora.com/product/multi-active-brightening-glow-serum-with-vitamin-c-aha-P517659',
  35: 'https://www.sephora.com/product/laneige-water-bank-blue-hyaluronic-serum-P482692',
  36: 'https://www.charlottetilbury.com/us/product/charlottes-magic-serum-crystal-elixir',
  37: 'https://amazon.com/BIODANCE-Perfecting-Collagen-Radiance-Valentines/dp/B0FKSM8L9H',
  38: 'https://www.sephora.com/product/mini-red-rice-hydrating-serum-with-ceramide-P517698',
  39: 'https://www.sephora.com/product/glossier-super-bounce-hyaluronic-acid-vitamin-b5-hydrating-face-serum-P504795',

  // CLEANSER
  40: 'https://www.sephora.com/product/gentle-cleansing-foam-P507894',
  41: 'https://www.sephora.com/product/mini-water-bank-gentle-gel-cleanser-with-hyaluronic-acid-P515501',
  42: 'https://www.sephora.com/product/face-cleanser-P248404',
  43: 'https://www.sephora.com/product/atobarrier365-gentle-ph-balancing-foaming-cleanser-for-skin-moisture-barrier-repair-P515487',
  44: 'https://www.sephora.com/product/dieux-baptism-gentle-foaming-facial-gel-cleanser-with-glycerin-P513539',
  45: 'https://www.sephora.com/product/paula-s-choice-resist-perfectly-balanced-foaming-cleanser-P469520',
  46: 'https://www.sephora.com/product/glycolipid-cream-cleanser-P506135',
  47: 'https://www.sephora.com/product/hanyul-yuja-brightening-2-in-1-mask-to-foam-cleanser-with-vitamin-c-niacinamide-P521640',
  48: 'https://www.sephora.com/product/the-ordinary-squalane-cleanser-P444718',
  49: 'https://www.sephora.com/product/la-mer-the-essence-foaming-cleanser-P510096',
  50: 'https://www.sephora.com/product/milky-jelly-gentle-gel-face-cleanser-P519350',
  51: 'https://www.sephora.com/product/dermalogica-daily-glycolic-cleanser-P474822',
  52: 'https://www.sephora.com/product/erborian-centella-cleansing-gel-gentle-daily-cleanser-with-centella-asiatica-squalane-P521607',
  53: 'https://www.sephora.com/product/plasma-wash-moisture-depositing-gel-cream-cleanser-P518189',
  54: 'https://www.sephora.com/product/ultra-facial-cleanser-P422007',
  55: 'https://www.sephora.com/product/rinse-off-foaming-cleanser-P122762',
  56: 'https://www.sephora.com/product/special-cleansing-gel-P423136',
  57: 'https://www.amazon.com/BIODANCE-Collagen-Hydrating-Sensitive-Skincare/dp/B0F1TSCGWN',
  58: 'https://www.sephora.com/product/elemis-dynamic-gentle-resurfacing-enzyme-cleanser-P510313',
  59: 'https://www.sephora.com/product/liquid-facial-soap-P139000',

  // TONER
  60: 'https://www.charlottetilbury.com/us/product/glow-toner',
  61: 'https://www.amazon.com/Ordinary-Exfoliating-Brightening-Smoothing-Even-Looking/dp/B0DMTDN158?th=1',
  62: 'https://www.amazon.com/Paulas-Choice-SKIN-PERFECTING-Exfoliant-Facial-Lines-1-1oz/dp/B07C5SS6YD?th=1',
  63: 'https://www.sephora.com/product/green-plum-refreshing-toner-P517632',
  64: 'https://www.amazon.com/Biodance-Perfecting-Improving-Elasticity-Sensitive/dp/B0DDXV5KV4?th=1',
  65: 'https://paulaschoice.it/en/resist-advanced-replenishing-toner/m7670.html',
  66: 'https://www.sephora.com/product/dive-in-multi-toner-pad-P517697',
  67: 'https://www.sephora.com/product/balanceful-peeling-toner-P517699',
  68: 'https://www.sephora.com/product/ultra-facial-toner-P422011',
  69: 'https://www.amazon.com/Artemisia-Soothing-Panthenol-Hydrating-Sensitized/dp/B0F89RN7PJ',
  70: 'https://www.sephora.com/product/stem-clinical-recovery-essence-toner-P521635',
  71: 'https://www.amazon.com/belif-Hydrating-Hyaluronic-Combination-Oily-Skin/dp/B085JQXW12?th=1',
  72: 'https://www.sephora.com/product/ole-henriksen-detox-drops-2-salicylic-acid-toner-P517000',
  73: 'https://www.sephora.com/product/dr-jart-ceramidin-tm-skin-barrier-serum-toner-P504001',
  74: 'https://www.amazon.co.jp/-/en/REJURAN-Official-Rebalancing-Korean-Cosmetics/dp/B0DVC15CK2',
  75: 'https://www.amazon.com/-/es/Biodance-Skin-Refining-exfoliante-hidratante/dp/B0CV4RHDTJ',
  76: 'https://www.sephora.com/product/clarifying-lotion-2-P122882',
  77: 'https://www.sephora.com/product/facial-treatment-clear-lotion-P375853',
  78: 'https://www.amazon.com/Kiehls-Calendula-Extract-Alcohol-Free-8-4/dp/B004P5DEK4',
  79: 'https://www.sephora.com/product/cherry-dub-bha-toner-with-salicylic-acid-aloe-juice-P515885',

  // SUNSCREEN
  80: 'https://www.sephora.com/product/beauty-of-joseon-day-dew-deluxe-P521880',
  81: 'https://www.sephora.com/product/sunsuede-spf-50-lightweight-sunscreen-blurring-primer-stick-P522181',
  82: 'https://www.sephora.com/product/future-screen-spf-50-mineral-fragrance-free-facial-sunscreen-serum-P516255',
  83: 'https://www.sephora.com/product/supergoop-play-everyday-lotion-spf-50-with-sunflower-extract-mini-P454384',
  84: 'https://www.amazon.com/Ultra-Violette-Skinscreen-Sunscreen-Moisturizer/dp/B0FR714CH1',
  85: 'https://www.sephora.com/product/ultra-violette-supreme-screen-spf-50-facial-20ml-mini-P520835',
  86: 'https://www.sephora.com/product/sulwhasoo-uv-daily-cream-broad-spectrum-spf-40-sunscreen-P511710',
  87: 'https://www.sephora.com/product/uv-filters-spf-45-serum-sunscreen-pa-P516573',
  88: 'https://www.amazon.com/Shiseido-Ultimate-Protector-Clear-Stick/dp/B0G8LN26Q3',
  89: 'https://www.amazon.com/Supergoop-PLAY-Antioxidant-Infused-Body-Vitamin/dp/B087HBVDYT',
  90: 'https://www.amazon.com/Supergoop-Unseen-Sunscreen-Invisible-Protection/dp/B0DMWVG4G6',
  91: 'https://www.amazon.in/LANEIGE-Sunscreen-Spectrum-Non-Greasy-Hydration/dp/B0DFYC2CZW',
  92: 'https://www.sephora.com/product/glow-gloss-lip-balm-spf-40-vanilla-soft-serve-P516839',
  93: 'https://www.amazon.com/Kiehls-Sunscreen-Lightweight-Non-comedogenic-Paraben-free/dp/B00VDN4AMW?th=1',
  94: 'https://www.amazon.com/Shiseido-Urban-Environment-Fresh-Moisture-Sunscreen/dp/B0BGMJZ3GY',
  95: 'https://www.sephora.com/product/major-fade-disco-block-discoloration-treatment-spf-50-broad-spectrum-sunscreen-with-ceramides-and-glycerin-P517651',
  96: 'https://www.amazon.com/Paulas-Choice-vitamin-pnini/dp/B0D489NTPQ',
  97: 'https://www.amazon.com/Shiseido-Urban-Environment-Oil-Free-Sunscreen/dp/B0BGMKH4TT?th=1',
  98: 'https://www.amazon.com/First-Aid-Beauty-Weightless-Sunscreen/dp/B0C4Q9N3QM',
  99: 'https://www.amazon.ca/Murad-Superactive-Mattifying-Control-Moisturizer/dp/B0FW35GL3X',
};

function ProductStepCard({ product }) {
  const shopUrl = shopUrls[product.product_id] ||
    `https://www.google.com/search?q=${encodeURIComponent(product.name + ' ' + product.brand + ' buy')}`;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition">
      <div className="flex items-start gap-4">
        <img
          src={`/images/products/${product.product_id}.jpg`}
          alt={product.name}
          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
            {product.step}
          </p>
          <h3 className="font-semibold text-gray-900 mt-1">{product.name}</h3>
          <p className="text-sm text-gray-400">{product.brand}</p>
          <p className="text-lg font-bold text-gray-900 mt-2">${product.price}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {(product.ingredients || []).map((ing) => (
              <span key={ing} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {ing}
              </span>
            ))}
          </div>
          <a
            href={shopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-sm font-medium text-purple-600 hover:text-purple-800 underline underline-offset-2"
          >
            Shop Now &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Routine() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, savedRoutineId } = useSelector((s) => s.routine);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-gray-500 mb-6">
            No routine yet. Complete the quiz to get your personalized plan.
          </p>
          <Link
            to="/quiz"
            className="inline-block px-6 py-3 bg-gray-900 text-white rounded-2xl font-medium"
          >
            Take the Quiz
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await api.post("/routines", {
        routineType: data.routine,
        products: data.products,
      });
      dispatch(setSavedRoutineId(res.data.id));
      setSaved(true);
    } catch (err) {
      setError(err.response?.data?.error || "Could not save routine");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">
          Your personalized plan
        </p>
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
          {data.routine.replace(" Routine", "")} Routine
        </h1>
        <p className="text-gray-400 mt-2">
          Model confidence:{" "}
          <span className="font-semibold text-gray-700">{data.confidence}%</span>
        </p>

        <div className="mt-10 flex flex-col gap-4">
          {data.products?.map((p) => (
            <ProductStepCard key={`${p.step}-${p.product_id}`} product={p} />
          ))}
        </div>

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || saved}
            className="flex-1 py-4 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 disabled:opacity-50 transition"
          >
            {saved ? "✓ Routine Saved" : saving ? "Saving…" : "Save Routine"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/quiz")}
            className="flex-1 py-4 border border-gray-200 bg-white text-gray-700 rounded-2xl font-medium hover:bg-gray-50 transition"
          >
            Back to Quiz
          </button>
        </div>

        {saved && (
          <p className="text-center text-sm text-gray-400 mt-4">
            <Link to="/dashboard" className="text-purple-600 hover:underline">
              View on Dashboard →
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}