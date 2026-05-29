import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Profile",
    text: "Answer a few guided questions about skin type, lifestyle, sensitivity, and goals.",
  },
  {
    number: "02",
    title: "Analysis",
    text: "AuraSkin translates your answers into concerns like hydration, dullness, texture, and resilience.",
  },
  {
    number: "03",
    title: "Routine",
    text: "Review a simple morning and night routine with product matches that fit your needs.",
  },
];

const testimonials = [
  {
    score: "10/10",
    quote:
      "The quiz made skincare feel less confusing. I knew exactly what to try first and why it matched my skin.",
    name: "Mira",
    role: "Combination skin",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    score: "10/10",
    quote:
      "It felt like a calm consultation, not a sales page. The routine breakdown was clear and easy to follow.",
    name: "Elira",
    role: "Sensitive skin",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    score: "9/10",
    quote:
      "I liked that I could browse products manually, but the assessment gave me a much better starting point.",
    name: "Arta",
    role: "Dry skin",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const carouselProducts = [
  {
    image: "/images/products/11.jpg",
    name: "Barrier Renewal Cream",
    concern: "Hydration",
    price: "$37",
    note: "Comforting support for dry-feeling skin.",
  },
  {
    image: "/images/products/25.jpg",
    name: "Bright Balance Serum",
    concern: "Dullness",
    price: "$28",
    note: "A lightweight treatment for glow and tone.",
  },
  {
    image: "/images/products/42.jpg",
    name: "Daily Clarity Cleanser",
    concern: "Cleanse",
    price: "$40",
    note: "A simple first step for a clean routine.",
  },
  {
    image: "/images/products/86.jpg",
    name: "Soft Shield SPF",
    concern: "Protection",
    price: "$105",
    note: "Daily daytime support for healthy-looking skin.",
  },
];

export default function Home() {
  const [activeProduct, setActiveProduct] = useState(0);
  const [communityReviews, setCommunityReviews] = useState([]);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const testimonialCarouselRef = useRef(null);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    role: "",
    score: "10",
    quote: "",
  });
  const product = carouselProducts[activeProduct];
  const visibleTestimonials = [...testimonials, ...communityReviews];

  useEffect(() => {
    const savedReviews = window.localStorage.getItem("auraskin-reviews");

    if (savedReviews) {
      try {
        setCommunityReviews(JSON.parse(savedReviews));
      } catch {
        window.localStorage.removeItem("auraskin-reviews");
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "auraskin-reviews",
      JSON.stringify(communityReviews),
    );
  }, [communityReviews]);

  const nextProduct = () => {
    setActiveProduct((index) => (index + 1) % carouselProducts.length);
  };

  const previousProduct = () => {
    setActiveProduct(
      (index) =>
        (index - 1 + carouselProducts.length) % carouselProducts.length,
    );
  };

  const scrollTestimonials = (direction) => {
    if (!testimonialCarouselRef.current) {
      return;
    }

    testimonialCarouselRef.current.scrollBy({
      left: direction === "next" ? 420 : -420,
      behavior: "smooth",
    });
  };

  const updateReviewForm = (event) => {
    const { name, value } = event.target;
    setReviewForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const submitReview = (event) => {
    event.preventDefault();

    const name = reviewForm.name.trim();
    const role = reviewForm.role.trim();
    const quote = reviewForm.quote.trim();

    if (!name || !role || !quote) {
      return;
    }

    setCommunityReviews((currentReviews) => [
      ...currentReviews,
      {
        id: Date.now(),
        name,
        role,
        quote,
        score: `${reviewForm.score}/10`,
        initials: name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
      },
    ]);

    setReviewForm({
      name: "",
      role: "",
      score: "10",
      quote: "",
    });
    setIsReviewFormOpen(false);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f3ec] text-[#151712]">
      <section className="relative min-h-[calc(100vh-72px)] overflow-hidden">
        <img
          src="/images/aura-hero-lab.png"
          alt="AuraSkin lab skincare consultation"
          className="absolute inset-0 h-full w-full scale-100 object-cover object-[20%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/18 to-[#f7f3ec]/88" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-[#f7f3ec]/35" />

        <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl items-center px-4 py-12 md:px-8">
          <div className="ml-auto mr-[-24px] max-w-lg rounded-[2.5rem] border border-white/70 bg-white/45 p-6 shadow-2xl shadow-[#8b7a6d]/15 backdrop-blur-2xl md:mr-[-10px] md:p-9 lg:mr-[-18px] xl:mr-[-34px]">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/60 bg-white/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#6f5a4f] shadow-sm backdrop-blur-xl">
              AuraSkin Intelligence
            </div>
            <h1 className="text-4xl font-semibold leading-[1.04] tracking-normal text-[#151712] md:text-6xl">
              Your personal skincare consultant.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#545a4f]">
              Discover your perfect skincare match through a calm, guided
              assessment. AuraSkin turns your skin goals into a polished routine
              you can actually understand.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/quiz"
                className="rounded-full border border-white/70 bg-[#151712]/90 px-7 py-4 text-sm font-semibold uppercase tracking-wide text-white shadow-xl shadow-black/10 backdrop-blur transition hover:-translate-y-0.5 hover:bg-[#303326]"
              >
                Start your assessment
              </Link>
              <Link
                to="/products"
                className="rounded-full border border-white/70 bg-white/45 px-7 py-4 text-sm font-semibold uppercase tracking-wide text-[#2c3427] shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/75"
              >
                Explore products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#844D63]">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                A guided routine in three steps.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#6d6c63]">
              No camera scan. No confusing diagnosis. Just a focused skincare
              profile that helps you choose with confidence.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-[2rem] border border-white/70 bg-white/45 p-6 shadow-sm backdrop-blur-xl"
              >
                <p className="text-sm font-semibold text-[#B8925F]">
                  {step.number}
                </p>
                <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#65675f]">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-white/70 bg-white/45 p-6 shadow-xl shadow-black/5 backdrop-blur-2xl md:p-10">
          <div className="mb-10 flex flex-col gap-5 text-center md:flex-row md:items-end md:justify-between md:text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#844D63]">
                Community proof
              </p>
              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                What our community is saying.
              </h2>
            </div>
            <div className="mx-auto flex items-center gap-3 md:mx-0">
              <button
                type="button"
                onClick={() => scrollTestimonials("previous")}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/65 text-xl text-[#844D63] shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white"
                aria-label="Previous reviews"
              >
                &lt;
              </button>
              <button
                type="button"
                onClick={() => scrollTestimonials("next")}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/65 text-xl text-[#844D63] shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white"
                aria-label="Next reviews"
              >
                &gt;
              </button>
              <button
                type="button"
                onClick={() => setIsReviewFormOpen(true)}
                className="rounded-full border border-white/70 bg-white/65 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#844D63] shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white"
              >
                Write a review
              </button>
            </div>
          </div>

          <div
            ref={testimonialCarouselRef}
            className="flex snap-x gap-5 overflow-x-auto scroll-smooth pb-3"
          >
            {visibleTestimonials.map((review) => (
              <article
                key={review.id || review.name}
                className="min-h-64 w-[82vw] shrink-0 snap-start rounded-[1.75rem] border border-white/80 bg-white/70 p-5 shadow-sm backdrop-blur sm:w-[420px]"
              >
                <div className="flex items-center gap-4">
                  {review.photo ? (
                    <img
                      src={review.photo}
                      alt={`${review.name} customer`}
                      className="h-14 w-14 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ead5dd] to-[#f7efe2] text-sm font-bold text-[#844D63] shadow-inner">
                      {review.initials}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-[#151712]">
                      {review.name}
                    </p>
                    <p className="text-xs text-[#8c8c80]">{review.role}</p>
                  </div>
                </div>
                <p className="mt-5 text-sm font-bold text-[#B8925F]">
                  {review.score}
                </p>
                <p className="mt-3 text-sm leading-6 text-[#4d5047]">
                  "{review.quote}"
                </p>
              </article>
            ))}
          </div>

          {isReviewFormOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#151712]/35 px-4 py-8 backdrop-blur-sm">
              <form
                onSubmit={submitReview}
                className="w-full max-w-2xl rounded-[2.25rem] border border-white/80 bg-[#fbf8f4]/90 p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl md:p-7"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#844D63]">
                      Add your review
                    </p>
                    <h3 className="mt-2 text-3xl font-semibold">
                      Share your glow story.
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#6d6c63]">
                      Your review appears instantly and stays saved on this
                      device.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsReviewFormOpen(false)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/70 text-xl leading-none text-[#844D63] shadow-sm transition hover:bg-white"
                    aria-label="Close review form"
                  >
                    x
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-[1fr_1fr_130px]">
                  <label className="text-sm font-medium text-[#4d5047]">
                    Name
                    <input
                      name="name"
                      value={reviewForm.name}
                      onChange={updateReviewForm}
                      placeholder="Your name"
                      required
                      className="mt-2 w-full rounded-2xl border border-[#eadfd9] bg-white/80 px-4 py-3 text-[#151712] outline-none transition placeholder:text-[#aaa397] focus:border-[#844D63] focus:ring-4 focus:ring-[#ead5dd]/60"
                    />
                  </label>
                  <label className="text-sm font-medium text-[#4d5047]">
                    Skin type
                    <input
                      name="role"
                      value={reviewForm.role}
                      onChange={updateReviewForm}
                      placeholder="Dry skin..."
                      required
                      className="mt-2 w-full rounded-2xl border border-[#eadfd9] bg-white/80 px-4 py-3 text-[#151712] outline-none transition placeholder:text-[#aaa397] focus:border-[#844D63] focus:ring-4 focus:ring-[#ead5dd]/60"
                    />
                  </label>
                  <label className="text-sm font-medium text-[#4d5047]">
                    Rating
                    <select
                      name="score"
                      value={reviewForm.score}
                      onChange={updateReviewForm}
                      className="mt-2 w-full rounded-2xl border border-[#eadfd9] bg-white/80 px-4 py-3 text-[#151712] outline-none transition focus:border-[#844D63] focus:ring-4 focus:ring-[#ead5dd]/60"
                    >
                      <option value="10">10/10</option>
                      <option value="9">9/10</option>
                      <option value="8">8/10</option>
                      <option value="7">7/10</option>
                    </select>
                  </label>
                </div>

                <label className="mt-4 block text-sm font-medium text-[#4d5047]">
                  Review
                  <textarea
                    name="quote"
                    value={reviewForm.quote}
                    onChange={updateReviewForm}
                    placeholder="Tell us what helped, what felt easy, or what you liked."
                    rows="4"
                    required
                    className="mt-2 w-full resize-none rounded-2xl border border-[#eadfd9] bg-white/80 px-4 py-3 text-[#151712] outline-none transition placeholder:text-[#aaa397] focus:border-[#844D63] focus:ring-4 focus:ring-[#ead5dd]/60"
                  />
                </label>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setIsReviewFormOpen(false)}
                    className="rounded-full border border-white/80 bg-white/65 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#844D63] shadow-sm transition hover:bg-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-[#151712]/90 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#303326]"
                  >
                    Add review
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#844D63]">
                Product showcase
              </p>
              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Explore the AuraSkin edit.
              </h2>
            </div>
            <Link
              to="/products"
              className="w-fit rounded-full border border-white/70 bg-white/55 px-5 py-3 text-sm font-semibold text-[#2c3427] shadow-sm backdrop-blur-xl hover:bg-white/80"
            >
              View all products
            </Link>
          </div>

          <div className="grid gap-6 rounded-[2.5rem] border border-white/70 bg-white/35 p-5 shadow-xl shadow-black/5 backdrop-blur-2xl lg:grid-cols-[1fr_0.9fr]">
            <div className="flex min-h-96 items-center justify-center rounded-[2rem] bg-[#fbf7f1]/80 p-8">
              <img
                src={product.image}
                alt={product.name}
                className="h-80 w-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-center p-4 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#844D63]">
                {product.concern}
              </p>
              <h3 className="mt-3 text-4xl font-semibold">{product.name}</h3>
              <p className="mt-4 text-base leading-7 text-[#62665d]">
                {product.note}
              </p>
              <p className="mt-6 text-xl font-semibold">{product.price}</p>

              <div className="mt-8 flex items-center gap-3">
                <button
                  type="button"
                  onClick={previousProduct}
                  className="h-11 w-11 rounded-full border border-white/70 bg-white/60 text-lg shadow-sm backdrop-blur transition hover:bg-white"
                  aria-label="Previous product"
                >
                  &lt;
                </button>
                <button
                  type="button"
                  onClick={nextProduct}
                  className="h-11 w-11 rounded-full border border-white/70 bg-white/60 text-lg shadow-sm backdrop-blur transition hover:bg-white"
                  aria-label="Next product"
                >
                  &gt;
                </button>
                <div className="ml-2 flex gap-2">
                  {carouselProducts.map((item, index) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setActiveProduct(index)}
                      className={`h-2.5 rounded-full transition ${
                        index === activeProduct
                          ? "w-8 bg-[#844D63]"
                          : "w-2.5 bg-[#d8c7bd]"
                      }`}
                      aria-label={`Show ${item.name}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
