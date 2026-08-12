"use client";

import { useEffect, useRef, useState } from "react";
import { tracks } from "@/lib/tracks";
import { formatTime } from "@/lib/format";
import Vinyl from "./Vinyl";
import SeekBar from "./SeekBar";
import { PauseIcon, PlayIcon, PrevIcon, NextIcon } from "./icons";

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const track = tracks[index];
  const duration = track.duration;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, index]);

  const isFirstRender = useRef(true);
  useEffect(() => {
    setCurrentTime(0);
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setIsPlaying(true);
  }, [index]);

  function handleTimeUpdate() {
    const audio = audioRef.current;
    if (audio) setCurrentTime(audio.currentTime);
  }

  function togglePlay() {
    setIsPlaying((p) => !p);
  }

  function goNext() {
    setIndex((i) => (i + 1) % tracks.length);
  }

  function goPrev() {
    setIndex((i) => (i - 1 + tracks.length) % tracks.length);
  }

  function seek(ratio: number) {
    const audio = audioRef.current;
    const target = ratio * duration;
    setCurrentTime(target);
    if (audio) audio.currentTime = target;
  }

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <>
      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={goNext}
        preload="metadata"
      />

      {/* Desktop pill */}
      <div className="hidden w-full max-w-xl sm:flex">
        <div className="glass flex w-full items-center gap-4 rounded-full p-3 pr-5">
          <Vinyl title={track.title} accent={track.accent} spinning={isPlaying} size={80} />

          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-baseline gap-2">
              <p className="truncate font-display text-[15px] font-semibold text-cream">
                {track.title}
              </p>
            </div>
            <p className="truncate text-[12.5px] text-cream/70">{track.movie}</p>

            <div className="mt-1.5 flex items-center gap-2">
              <SeekBar progress={progress} onSeek={seek} accent={track.accent} />
            </div>
            <div className="flex justify-between font-mono text-[10.5px] tabular-nums text-cream/55">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              aria-label="Previous track"
              onClick={goPrev}
              className="rounded-full p-2 text-cream/80 transition hover:bg-white/10 hover:text-cream"
            >
              <PrevIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label={isPlaying ? "Pause" : "Play"}
              onClick={togglePlay}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink transition hover:brightness-95"
            >
              {isPlaying ? (
                <PauseIcon className="h-4.5 w-4.5" />
              ) : (
                <PlayIcon className="ml-0.5 h-4.5 w-4.5" />
              )}
            </button>
            <button
              type="button"
              aria-label="Next track"
              onClick={goNext}
              className="rounded-full p-2 text-cream/80 transition hover:bg-white/10 hover:text-cream"
            >
              <NextIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile stacked card */}
      <div className="w-full max-w-xl px-1 sm:hidden">
        <div className="glass flex w-full flex-col items-center gap-3 rounded-[28px] p-5">
          <Vinyl title={track.title} accent={track.accent} spinning={isPlaying} size={108} />

          <div className="w-full min-w-0 text-center">
            <p className="truncate font-display text-base font-semibold text-cream">
              {track.title}
            </p>
            <p className="truncate text-[13px] text-cream/70">{track.movie}</p>
          </div>

          <div className="w-full">
            <SeekBar progress={progress} onSeek={seek} accent={track.accent} />
            <div className="flex justify-between font-mono text-[11px] tabular-nums text-cream/55">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button
              type="button"
              aria-label="Previous track"
              onClick={goPrev}
              className="rounded-full p-2 text-cream/80 transition hover:bg-white/10 hover:text-cream"
            >
              <PrevIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label={isPlaying ? "Pause" : "Play"}
              onClick={togglePlay}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-ink transition hover:brightness-95"
            >
              {isPlaying ? (
                <PauseIcon className="h-5 w-5" />
              ) : (
                <PlayIcon className="ml-0.5 h-5 w-5" />
              )}
            </button>
            <button
              type="button"
              aria-label="Next track"
              onClick={goNext}
              className="rounded-full p-2 text-cream/80 transition hover:bg-white/10 hover:text-cream"
            >
              <NextIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
