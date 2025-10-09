import { JSX } from "preact";

interface DrinkBadge {
  name: string;
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "info"
    | "success"
    | "warning"
    | "error";
}

interface TikiBarProps {
  rank: number;
  name: string;
  description: string;
  location: string;
  favoriteDrinks: DrinkBadge[];
  images: string[];
  lastVisit: string;
  googleMapsUrl: string;
  websiteUrl: string;
}

export default function TikiBarInfo({
  rank = 1,
  name = "The Blue Palm",
  description =
    "A tropical escape with classic tiki cocktails and a laid-back vibe. The staff are so cool and know their craft cocktails.",
  location = "Kansas City, KS",
  favoriteDrinks = [
    { name: "Saturn", color: "accent" },
    { name: "Cobra Fang", color: "error" },
  ],
  images = [
    "/images/blue_palm/bluepalm_000.webp",
    "/images/blue_palm/bluepalm_001.webp",
    "/images/blue_palm/bluepalm_002.webp",
  ],
  lastVisit = "2025-06-15",
  googleMapsUrl = "https://maps.app.goo.gl/F2A8SkjPQJfZY4gEA",
  websiteUrl = "https://bluepalmtiki.com/",
}: Partial<TikiBarProps>): JSX.Element {
  const modalId = `modal_${rank}_${name.replace(/\s+/g, "_")}`;
  const carouselImages = images && images.length > 0
    ? images
    : ["/images/blue_palm/bluepalm_000.webp"];

  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl mx-auto">
        <figure className="lg:w-1/2 relative aspect-square">
          {/* Carousel */}
          <div className="carousel w-full h-full" id={`carousel_${rank}`}>
            {carouselImages.map((img, index) => {
              const slideId = `slide_${rank}_${index}`;
              const prevIndex = index === 0
                ? carouselImages.length - 1
                : index - 1;
              const nextIndex = index === carouselImages.length - 1
                ? 0
                : index + 1;

              const handlePrev = () => {
                const carousel = document.getElementById(`carousel_${rank}`);
                const targetSlide = document.getElementById(
                  `slide_${rank}_${prevIndex}`,
                );
                if (carousel && targetSlide) {
                  carousel.scrollLeft = targetSlide.offsetLeft;
                }
              };

              const handleNext = () => {
                const carousel = document.getElementById(`carousel_${rank}`);
                const targetSlide = document.getElementById(
                  `slide_${rank}_${nextIndex}`,
                );
                if (carousel && targetSlide) {
                  carousel.scrollLeft = targetSlide.offsetLeft;
                }
              };

              return (
                <div
                  key={index}
                  id={slideId}
                  className="carousel-item relative w-full h-full"
                >
                  <img
                    src={img}
                    alt={`${name} - Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  {carouselImages.length > 1 && (
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                      <button
                        type="button"
                        className="btn btn-circle"
                        onClick={handlePrev}
                      >
                        ❮
                      </button>
                      <button
                        type="button"
                        className="btn btn-circle"
                        onClick={handleNext}
                      >
                        ❯
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </figure>

        <div className="card-body lg:w-1/2">
          <div className="flex items-start justify-between gap-4">
            <h2 className="card-title text-3xl text-primary flex-1">{name}</h2>
            <div className="flex-shrink-0 bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold text-xl md:text-3xl w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg">
              {rank}
            </div>
          </div>

          <div>
            <p className="text-base-content/80">{description}</p>
            <button
              type="button"
              className="btn btn-link btn-xs p-0 h-auto min-h-0 text-primary mt-1"
              onClick={() =>
                (document.getElementById(modalId) as HTMLDialogElement)
                  ?.showModal()}
            >
              Read our review
            </button>
          </div>

          <div className="divider"></div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
                aria-label="Open in Google Maps"
                title="Open in Google Maps"
              >
                <img
                  src="/google_maps_icon.webp"
                  alt=""
                  className="w-8 h-8"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <div className="flex-1">
                <h3 className="font-semibold">Location</h3>
                <p className="text-sm">{location}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xl">🌐</span>
              <div className="flex-1">
                <h3 className="font-semibold">Website</h3>
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-primary text-sm break-all"
                >
                  {websiteUrl}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-2xl">📅</span>
              <div>
                <h3 className="font-semibold">Last Visit</h3>
                <p className="text-sm">
                  {new Date(lastVisit || "").toString() !== "Invalid Date"
                    ? new Date(lastVisit!).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })
                    : "—"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-2xl">🍹</span>
              <div>
                <h3 className="font-semibold">Our Favorite Drinks</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(favoriteDrinks || []).map((drink, i) => {
                    const colorClasses = {
                      primary: "badge badge-primary badge-outline",
                      secondary: "badge badge-secondary badge-outline",
                      accent: "badge badge-accent badge-outline",
                      neutral: "badge badge-neutral badge-outline",
                      info: "badge badge-info badge-outline",
                      success: "badge badge-success badge-outline",
                      warning: "badge badge-warning badge-outline",
                      error: "badge badge-error badge-outline",
                    };
                    const badgeClass = colorClasses[drink.color || "accent"];

                    return (
                      <span key={i} className={badgeClass}>
                        {drink.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal with review */}
      <dialog id={modalId} className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-2xl text-primary mb-4">
            Our Review: {name}
          </h3>

          <div className="space-y-4">
            {/* Review content - customize this section as needed */}
            <div>
              <h4 className="font-semibold text-lg mb-2">🍹 Drinks & Menu</h4>
              <p className="text-base-content/80">
                The cocktail menu is impressive with classic tiki drinks and
                creative house specials. Their Mai Tai is perfectly balanced and
                the Zombie packs a punch!
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">
                🏝️ Ambiance & Decor
              </h4>
              <p className="text-base-content/80">
                Vibrant tiki decor with bamboo accents, tiki mugs, and tropical
                vibes throughout. The lighting is dim and cozy, perfect for date
                nights or hanging with friends.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">👥 Service & Staff</h4>
              <p className="text-base-content/80">
                The staff really know their craft cocktails and are happy to
                make recommendations based on your preferences. Service is
                friendly and attentive.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">
                ⭐ Overall Impression
              </h4>
              <p className="text-base-content/80">
                A fantastic spot that makes you feel like you're on a mini
                tropical vacation. Highly recommend for anyone who loves tiki
                culture and expertly crafted cocktails.
              </p>
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button type="submit" className="btn btn-primary">Close</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="submit">close</button>
        </form>
      </dialog>
    </>
  );
}
