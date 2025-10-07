import { JSX } from "preact";

interface TikiBarProps {
  rank: number;
  name: string;
  description: string;
  location: string;
  favoriteDrinks: string[];
  images: string[];      // Changed from single image to array
  lastVisit: string;
  googleMapsUrl: string;
  websiteUrl: string;    
}

export default function TikiBarInfo({
  rank = 1,
  name = "The Blue Palm",
  description = "A tropical escape with classic tiki cocktails and a laid-back vibe. The staff are so cool. They really know their craft cocktails and are happy to make recommendations based on your preferences. The ambiance is fantastic, with vibrant decor, tiki mugs, and a fun, relaxed atmosphere that makes you feel like you're on a mini-vacation. Their menu features a great selection of tropical drinks, including their signature Blue Hawaiian and Mai Tai, which are both delicious and beautifully presented. It's a perfect spot for a casual night out with friends or a fun date night.",
  location = "Kansas City, KS",
  favoriteDrinks = ["Mai Tai", "Zombie", "Blue Hawaiian", "Piña Colada"],
  images = [
    "/images/blue_palm/bluepalm_000.webp",
    "/images/blue_palm/bluepalm_001.webp",
    "/images/blue_palm/bluepalm_002.webp",
  ],
  lastVisit = "2025-06-15",
  googleMapsUrl = "https://maps.google.com/?q=204+Orchahttps://maps.app.goo.gl/Mp1dcPJVgagZKvHp9rd+St,+Kansas+City,+KS",
  websiteUrl = "https://bluepalmtiki.com/",
}: Partial<TikiBarProps>): JSX.Element {
  const truncatedDescription =
    (description?.length ?? 0) > 150 ? description!.slice(0, 150) + "..." : description ?? "";
  
  const modalId = `modal_${rank}_${name.replace(/\s+/g, '_')}`;
  const carouselImages = images && images.length > 0 ? images : ["/images/blue_palm/bluepalm_000.webp"];

  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl mx-auto">
        <figure className="lg:w-1/2 relative aspect-square">
          {/* Carousel */}
          <div className="carousel w-full h-full">
            {carouselImages.map((img, index) => {
              const slideId = `slide_${rank}_${index}`;
              const prevIndex = index === 0 ? carouselImages.length - 1 : index - 1;
              const nextIndex = index === carouselImages.length - 1 ? 0 : index + 1;
              const prevSlideId = `slide_${rank}_${prevIndex}`;
              const nextSlideId = `slide_${rank}_${nextIndex}`;

              return (
                <div key={index} id={slideId} className="carousel-item relative w-full h-full">
                  <img
                    src={img}
                    alt={`${name} - Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  {carouselImages.length > 1 && (
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                      <a href={`#${prevSlideId}`} className="btn btn-circle">❮</a>
                      <a href={`#${nextSlideId}`} className="btn btn-circle">❯</a>
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
            <div className="flex-shrink-0 bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold text-3xl w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
              {rank}
            </div>
          </div>

          <div>
            <p className="text-base-content/80">{truncatedDescription}</p>
            {(description?.length ?? 0) > 150 && (
              <button type="button"
                className="btn btn-link btn-xs p-0 h-auto min-h-0 text-primary mt-1"
                onClick={() => (document.getElementById(modalId) as HTMLDialogElement)?.showModal()}
              >
                Read more
              </button>
            )}
          </div>

          <div className="divider"></div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🗺️</span>
              <div className="flex-1">
                <h3 className="font-semibold">Location</h3>
                <p className="text-sm">{location}</p>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity"
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
                        day: "numeric",
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
                  {(favoriteDrinks || []).map((drink, i) => (
                    <span key={i} className="badge badge-accent badge-outline">
                      {drink}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for full description */}
      <dialog id={modalId} className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-2xl text-primary mb-4">{name}</h3>
          <p className="py-4 text-base-content/80 leading-relaxed">{description}</p>
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