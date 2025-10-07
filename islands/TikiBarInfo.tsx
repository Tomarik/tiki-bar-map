import { JSX } from "preact";

interface TikiBarProps {
  rank: number;
  name: string;
  description: string;
  location: string;
  favoriteDrinks: string[];
  image: string;            // single image only
  lastVisit: string;
  googleMapsUrl: string;
  websiteUrl: string;       // direct link to the bar's website
}

export default function TikiBarInfo({
  rank = 1,
  name = "Blue Palm",
  description = "A tropical escape with classic tiki cocktails and a laid-back vibe.",
  location = "123 Paradise Lane, Miami, FL",
  favoriteDrinks = ["Mai Tai", "Zombie", "Blue Hawaiian", "Piña Colada"],
  image = "/bluepalm_000.webp",
  lastVisit = "2024-09-15",
  googleMapsUrl = "https://maps.google.com/?q=123+Paradise+Lane+Miami+FL",
  websiteUrl = "https://bluepalmtiki.com/",
}: Partial<TikiBarProps>): JSX.Element {
  const truncatedDescription =
    (description?.length ?? 0) > 150 ? description!.slice(0, 150) + "..." : description ?? "";

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl mx-auto">
      <figure className="lg:w-1/2 relative aspect-square">
        <img
          src={image || "/bluepalm_000.webp"}
          alt={`${name} - Photo`}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </figure>

      <div className="card-body lg:w-1/2">
        <div className="flex items-start justify-between gap-4">
          <h2 className="card-title text-3xl text-primary flex-1">{name}</h2>
          <div className="flex-shrink-0 bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold text-2xl w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
            {rank}
          </div>
        </div>

        <div>
          <p className="text-base-content/80">{truncatedDescription}</p>
          {(description?.length ?? 0) > 150 && (
            <details className="mt-1">
              <summary className="btn btn-link btn-xs p-0 h-auto min-h-0 text-primary">
                Read more
              </summary>
              <p className="mt-1 text-base-content/80">{description}</p>
            </details>
          )}
        </div>

        <div className="divider"></div>

        <div className="space-y-3">
          {/* Location row WITH Google Maps button inline */}
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

          {/* Direct website link */}
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
  );
}
