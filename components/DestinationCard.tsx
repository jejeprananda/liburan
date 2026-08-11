import Image from "next/image";
import type { Destination } from "@/lib/destinations";

type DestinationCardProps = {
  destination: Destination;
};

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <a
      href={`#${destination.id}`}
      className="group block overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-emerald-200"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {destination.coverImage ? (
          <Image
            src={destination.coverImage}
            alt={destination.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 to-emerald-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-sm text-white/80">{destination.province}</p>
          <h3 className="text-xl font-semibold text-white">{destination.name}</h3>
        </div>
      </div>
      <div className="space-y-2 p-5">
        <p className="text-sm text-zinc-600">{destination.tagline}</p>
        {destination.travelTime && (
          <div className="flex items-center gap-2 text-sm text-emerald-700">
            <span aria-hidden="true">🚗</span>
            <span>{destination.travelTime} dari rumah</span>
          </div>
        )}
      </div>
    </a>
  );
}
