import MediaGallery from "@/components/MediaGallery";
import type { Destination } from "@/lib/destinations";
import { getWhatsAppUrl } from "@/lib/destinations";

type DestinationDetailProps = {
  destination: Destination;
};

function InfoRow({ label, value }: { label: string; value: string }) {
  if (!value.trim()) return null;

  return (
    <div className="space-y-1">
      <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </dt>
      <dd className="text-sm text-zinc-800 sm:text-base">{value}</dd>
    </div>
  );
}

export default function DestinationDetail({ destination }: DestinationDetailProps) {
  const whatsappUrl = destination.phone ? getWhatsAppUrl(destination.phone) : null;

  return (
    <section
      id={destination.id}
      className="scroll-mt-20 border-t border-emerald-100 bg-white"
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 space-y-3">
          <p className="text-sm font-medium uppercase tracking-widest text-emerald-600">
            Detail Tujuan
          </p>
          <h2 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
            {destination.name}
          </h2>
          <p className="max-w-2xl text-zinc-600">{destination.tagline}</p>
        </div>

        {destination.availabilityNote && (
          <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 sm:text-base">
            <p className="font-medium">Ketersediaan</p>
            <p className="mt-1">{destination.availabilityNote}</p>
          </div>
        )}

        <div
          className={`grid gap-10 ${destination.media.length > 0 ? "lg:grid-cols-2 lg:gap-12" : "max-w-3xl"}`}
        >
          {destination.media.length > 0 && (
            <div>
              <h3 className="mb-4 text-lg font-semibold text-zinc-900">Galeri</h3>
              <MediaGallery media={destination.media} />
            </div>
          )}

          <div className="space-y-8">
            <dl className="grid gap-5 sm:grid-cols-2">
              <InfoRow label="Alamat" value={destination.address} />
              <InfoRow label="Provinsi" value={destination.province} />
              <InfoRow label="Lama Perjalanan" value={destination.travelTime} />
              <InfoRow label="Telepon" value={destination.phone} />
              <InfoRow label="Jam Operasional" value={destination.hours} />
            </dl>

            {destination.pricing.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-semibold text-zinc-900">
                  Biaya
                </h3>
                <div className="space-y-3">
                  {destination.pricing.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4"
                    >
                      <p className="font-medium text-zinc-900">{item.label}</p>
                      <p className="text-lg font-semibold text-emerald-700">
                        {item.value}
                      </p>
                      {item.note && (
                        <p className="mt-1 text-sm text-zinc-600">{item.note}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {destination.exampleCalculation && (
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <h3 className="mb-2 text-lg font-semibold text-zinc-900">
                  Contoh Perhitungan
                </h3>
                <p className="whitespace-pre-line text-sm text-zinc-700 sm:text-base">
                  {destination.exampleCalculation}
                </p>
              </div>
            )}

            {destination.facilities.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-semibold text-zinc-900">
                  Fasilitas
                </h3>
                <ul className="space-y-2">
                  {destination.facilities.map((facility) => (
                    <li
                      key={facility}
                      className="flex items-start gap-2 text-sm text-zinc-700 sm:text-base"
                    >
                      <span className="mt-0.5 text-emerald-600" aria-hidden="true">
                        ✓
                      </span>
                      {facility}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {destination.views.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-semibold text-zinc-900">View</h3>
                <ul className="space-y-2">
                  {destination.views.map((view) => (
                    <li
                      key={view}
                      className="flex items-start gap-2 text-sm text-zinc-700 sm:text-base"
                    >
                      <span className="mt-0.5 text-emerald-600" aria-hidden="true">
                        ◉
                      </span>
                      {view}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {destination.notes.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-semibold text-zinc-900">Catatan</h3>
                <ul className="space-y-3">
                  {destination.notes.map((note) => (
                    <li
                      key={note}
                      className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 sm:text-base"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              {destination.mapsUrl && (
                <a
                  href={destination.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-emerald-800"
                >
                  Buka di Google Maps
                </a>
              )}
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-700 px-6 py-3 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
                >
                  Hubungi via WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
