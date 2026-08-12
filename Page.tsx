import TopRow from "@/components/TopRow";
import Player from "@/components/Player";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      <div className="hero-bg -z-20" aria-hidden />
      <div className="hero-scrim -z-20" aria-hidden />
      <div className="grain-overlay -z-10" aria-hidden />

      <TopRow />

      <div className="safe-pb flex w-full flex-1 items-end justify-center px-4">
        <Player />
      </div>
    </main>
  );
}