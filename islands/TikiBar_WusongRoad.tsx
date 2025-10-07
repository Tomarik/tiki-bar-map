import { JSX } from "preact";

interface TikiBarProps {
  rank: number;
  name: string;
  description: string;
  location: string;
  favoriteDrinks: string[];
  image: string;      
  lastVisit: string;
  googleMapsUrl: string;
  websiteUrl: string;    
}

export default function TikiBarInfo({
  rank = 2,
  name = "Wusong Road",
  description = "Boston's best tiki bar blending New England Chinese flavors with tropical escapism. Hidden in Harvard Square's historic Conductor's Building, this minority and LGBTQ+ owned two-story paradise features Asian American tapas by Chef Jason Doo, signature cocktails in custom mugs, and an immersive atmosphere with basket lamps, sculpted clouds, and grass ceilings. Famous for handmade baos, crab rangoons, and the best Mai Tai in Boston.",
  location = "Cambridge, MA",
  favoriteDrinks = ["Mai Tai", "The Saturn", "Scorpion Bowl", "Mango Piña Colada"],
  image = "/images/wusong_road/wusongroad_000.webp",
  lastVisit = "2025-09-20",
  googleMapsUrl = "https://maps.app.goo.gl/EmzjRDfhpjuAK98a7",
  websiteUrl = "https://www.wusongroad.com/",
}: Partial<TikiBarProps>): JSX.Element {
  const truncatedDescription =
    (description?.length ?? 0) > 150 ? description!.slice(0, 150) + "..." : description ?? "";

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl mx-auto">
      <figure className="lg:w-1/2 relative aspect-square">
        <img
          src={image || "/images/wusong_road/wusongroad_000.webp"}
          alt={`${name} - Photo`}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
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