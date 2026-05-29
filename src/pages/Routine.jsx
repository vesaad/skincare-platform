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
  const ingredients = product.ingredients || [];

  return (
    <article className="group rounded-[2rem] border border-white/75 bg-white/60 p-4 shadow-sm shadow-black/5 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/75 hover:shadow-xl hover:shadow-[#8b7a6d]/10 md:p-5">
      <div className="grid gap-5 sm:grid-cols-[140px_1fr]">
        <div className="flex min-h-40 items-center justify-center rounded-[1.5rem] bg-[#fbf8f4] p-5 ring-1 ring-white/80">
          <img
            src={`/images/products/${product.product_id}.jpg`}
            alt={product.name}
            className="h-32 w-full object-contain transition duration-300 group-hover:scale-105"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
        <div className="flex min-w-0 flex-col">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#844D63]">
                {product.step}
              </p>
              <h3 className="mt-2 text-xl font-semibold leading-tight text-[#151712]">
                {product.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-[#8b8a7f]">
                {product.brand}
              </p>
            </div>
            <p className="rounded-full bg-[#ead5dd] px-4 py-2 text-lg font-bold text-[#844D63]">
              ${product.price}
            </p>
          </div>

          <p className="mt-4 text-sm leading-6 text-[#62665d]">
            Selected for this step because it supports your recommended routine
            with ingredients that match your skin profile.
          </p>

          {ingredients.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {ingredients.map((ing) => (
                <span
                  key={ing}
                  className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-[#62665d] ring-1 ring-[#eadfd9]"
                >
                  {ing}
                </span>
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#151712]/90 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-black/10 transition hover:bg-[#303326]"
            >
              Shop now
            </a>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#9b948a]">
              Step matched by AuraSkin
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function MiniProductCard({ product }) {
  return (
    <div className="rounded-[1.5rem] border border-white/70 bg-white/55 p-4 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <img
          src={`/images/products/${product.product_id}.jpg`}
          alt={product.name}
          className="h-16 w-16 rounded-2xl bg-[#fbf8f4] object-contain p-2"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#844D63]">
            {product.step}
          </p>
          <p className="truncate text-sm font-semibold text-[#151712]">
            {product.name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Routine() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, savedRoutineId, profile } = useSelector((s) => s.routine);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f3ec] px-6">
        <div className="max-w-md rounded-[2.5rem] border border-white/70 bg-white/55 p-8 text-center shadow-2xl shadow-black/10 backdrop-blur-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#844D63]">
            No routine yet
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[#151712]">
            Start with your skin profile.
          </h1>
          <p className="mt-4 text-sm leading-6 text-[#62665d]">
            Complete the AuraSkin quiz to reveal a personalized plan.
          </p>
          <Link
            to="/quiz"
            className="mt-6 inline-block rounded-full bg-[#151712]/90 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-black/10"
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

  const products = data.products || [];
  const routineName = data.routine?.replace(" Routine", "") || "Personalized";
  const confidence = Math.round(data.confidence || 0);
  const totalPrice = products.reduce(
    (sum, product) => sum + Number(product.price || 0),
    0,
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f3ec] text-[#151712]">
      <section className="relative px-4 py-10 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(132,77,99,0.14),transparent_30%),radial-gradient(circle_at_92%_12%,rgba(184,146,95,0.18),transparent_30%),linear-gradient(135deg,#fbf8f4_0%,#f7f3ec_55%,#efe7df_100%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_0.58fr]">
            <div className="rounded-[3rem] border border-white/70 bg-white/45 p-6 shadow-2xl shadow-[#8b7a6d]/15 backdrop-blur-2xl md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#844D63]">
                Your personalized plan
              </p>
              <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <div>
                  <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
                    {routineName} Routine
                  </h1>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-[#62665d]">
                    A polished routine built from your quiz answers, organized
                    into simple steps you can actually follow.
                  </p>
                </div>
                <div className="rounded-[2rem] border border-white/75 bg-white/55 p-5 text-center shadow-sm backdrop-blur-xl">
                  <p className="text-5xl font-semibold text-[#844D63]">
                    {confidence}%
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#8b8a7f]">
                    Match confidence
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.5rem] bg-white/60 p-4 ring-1 ring-white/80">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#844D63]">
                    Products
                  </p>
                  <p className="mt-2 text-2xl font-semibold">{products.length}</p>
                </div>
                <div className="rounded-[1.5rem] bg-white/60 p-4 ring-1 ring-white/80">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#844D63]">
                    Estimated total
                  </p>
                  <p className="mt-2 text-2xl font-semibold">${totalPrice}</p>
                </div>
                <div className="rounded-[1.5rem] bg-white/60 p-4 ring-1 ring-white/80">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#844D63]">
                    Skin type
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {profile?.Skin_Type || "Personal"}
                  </p>
                </div>
              </div>
            </div>

            <aside className="rounded-[3rem] border border-white/70 bg-white/35 p-6 shadow-xl shadow-black/5 backdrop-blur-2xl md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#844D63]">
                Routine preview
              </p>
              <div className="mt-5 space-y-3">
                {products.slice(0, 3).map((product) => (
                  <MiniProductCard
                    key={`${product.step}-${product.product_id}-mini`}
                    product={product}
                  />
                ))}
              </div>
              <div className="mt-6 rounded-[2rem] bg-[#151712]/90 p-5 text-white shadow-xl shadow-black/10">
                <p className="text-sm font-semibold">Why this routine?</p>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  Because your quiz profile points to {routineName.toLowerCase()}
                  -focused support with products ordered by routine step.
                </p>
              </div>
            </aside>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.22fr_1fr]">
            <div className="hidden lg:block">
              <div className="sticky top-32 rounded-[2rem] border border-white/70 bg-white/40 p-5 shadow-sm backdrop-blur-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#844D63]">
                  Steps
                </p>
                <div className="mt-5 space-y-4">
                  {products.map((product, index) => (
                    <div key={`${product.step}-nav`} className="flex gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ead5dd] text-xs font-bold text-[#844D63]">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#151712]">
                          {product.step}
                        </p>
                        <p className="text-xs text-[#8b8a7f]">
                          {product.brand}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#844D63]">
                    Recommended products
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold">
                    Your step-by-step routine.
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/quiz")}
                  className="w-fit rounded-full border border-white/75 bg-white/60 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-[#844D63] shadow-sm backdrop-blur-xl transition hover:bg-white"
                >
                  Retake quiz
                </button>
              </div>

              <div className="space-y-5">
                {products.map((p) => (
                  <ProductStepCard key={`${p.step}-${p.product_id}`} product={p} />
                ))}
              </div>
            </div>
          </div>

          {error && (
            <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="mt-8 rounded-[2.5rem] border border-white/70 bg-white/45 p-5 shadow-xl shadow-black/5 backdrop-blur-2xl md:p-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || saved || !!savedRoutineId}
                className="flex-1 rounded-full bg-[#151712]/90 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#303326] disabled:opacity-50"
              >
                {saved || savedRoutineId
                  ? "Routine saved"
                  : saving
                    ? "Saving..."
                    : "Save routine"}
              </button>
              <Link
                to="/dashboard"
                className="flex-1 rounded-full border border-white/80 bg-white/65 px-6 py-4 text-center text-sm font-semibold uppercase tracking-wide text-[#844D63] shadow-sm transition hover:bg-white"
              >
                View dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

