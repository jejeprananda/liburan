import DestinationCard from "@/components/DestinationCard";
import DestinationDetail from "@/components/DestinationDetail";
import HeroSection from "@/components/HeroSection";
import PackingList from "@/components/PackingList";
import { getDestinations } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const destinations = await getDestinations();

  return (
    <>
      <HeroSection />

      <section
        id="destinations"
        className="scroll-mt-20 bg-emerald-50/60 px-6 py-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 space-y-3 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-emerald-600">
              Pilihan Tujuan
            </p>
            <h2 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
              Kemana kita liburan?
            </h2>
            <p className="mx-auto max-w-xl text-zinc-600">
              Beberapa destinasi yang sedang kita pertimbangkan untuk liburan
              keluarga.
            </p>
          </div>

          {destinations.length === 0 ? (
            <p className="text-center text-zinc-500">
              Belum ada tujuan. Jalankan{" "}
              <code className="rounded bg-white px-2 py-1 text-sm">
                npm run db:migrate
              </code>{" "}
              untuk memuat data.
            </p>
          ) : (
            <div className="mx-auto grid max-w-md gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
              {destinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {destinations.map((destination) => (
        <DestinationDetail key={destination.id} destination={destination} />
      ))}

      <PackingList />

      <footer className="border-t border-emerald-100 bg-white px-6 py-8 text-center text-sm text-zinc-500">
        Liburan Keluarga Zyan Rayyan · 2026
      </footer>
    </>
  );
}
