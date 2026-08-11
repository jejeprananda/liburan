import Countdown from "@/components/Countdown";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/image/hero.png)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      <div className="relative z-10 flex max-w-3xl flex-col items-center gap-8">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-200/90 sm:text-base">
            Rencana Liburan
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Liburan Keluarga
            <span className="mt-2 block text-emerald-300">Zyan Rayyan</span>
          </h1>
        </div>

        <Countdown />

        <a
          href="#destinations"
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur-sm transition hover:bg-white/20"
        >
          Lihat pilihan tujuan
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
