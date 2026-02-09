"use client";

import { useEffect, useMemo, useState } from "react";

const TABS = [
  { id: "all", label: "All Episodes" },
  { id: "leadership", label: "Leadership", kw: ["leadership", "leader"] },
  { id: "entrepreneurship", label: "Entrepreneurship", kw: ["entrepreneur", "startup", "founder"] },
  { id: "transformation", label: "Transformation", kw: ["transform", "change", "growth"] },
  { id: "human", label: "Human Potentials", kw: ["human", "mindset", "habits", "potential"] },
  { id: "community", label: "Community", kw: ["community", "people", "team"] },
];

export default function PlaylistGridPage() {
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const PLAYLIST_ID = process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID;

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [q, setQ] = useState("");
  const [nextToken, setNextToken] = useState(null);
  const [prevToken, setPrevToken] = useState(null);

  const fetchPlaylist = async (pageToken = "") => {
    if (!API_KEY) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const params = new URLSearchParams({
      part: "snippet,contentDetails",
      maxResults: "18",
      playlistId: PLAYLIST_ID,
      key: API_KEY,
    });
    if (pageToken) params.set("pageToken", pageToken);

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}`
    );
    const data = await res.json();

    if (!res.ok) {
      console.error("YouTube API error:", data);
      setVideos([]);
      setLoading(false);
      return;
    }

    const items =
      data.items?.map((it) => {
        const sn = it.snippet;
        const videoId = it.contentDetails?.videoId;
        const title = sn?.title || "";
        const desc = sn?.description || "";
        const thumb =
          sn?.thumbnails?.maxres?.url ||
          sn?.thumbnails?.high?.url ||
          sn?.thumbnails?.medium?.url ||
          sn?.thumbnails?.default?.url;

        const publishedAt = sn?.publishedAt ? new Date(sn.publishedAt) : null;

        return {
          videoId,
          title,
          desc,
          thumb,
          channelTitle: sn?.channelTitle || "",
          publishedAt,
        };
      }) || [];

    setVideos(items);
    setNextToken(data.nextPageToken || null);
    setPrevToken(data.prevPageToken || null);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlaylist("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_KEY, PLAYLIST_ID]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    let list = videos;

    // tab filter (keyword-based)
    if (activeTab !== "all") {
      const tab = TABS.find((t) => t.id === activeTab);
      const kws = tab?.kw || [];
      list = list.filter((v) => {
        const text = (v.title + " " + v.desc).toLowerCase();
        return kws.some((k) => text.includes(k));
      });
    }

    // search filter
    if (query) {
      list = list.filter((v) => v.title.toLowerCase().includes(query));
    }

    return list;
  }, [videos, activeTab, q]);

  return (
    <section className="min-h-screen bg-black text-white">
      {/* single-file CSS (for clamp + nice scroll) */}
      <style jsx global>{`
        .lineClamp2 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          -webkit-line-clamp: 2;
        }
        .lineClamp3 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          -webkit-line-clamp: 3;
        }
      `}</style>

      {/* Background glow like screenshot */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-0 h-[520px] w-[680px] rounded-full bg-[#ff6a00]/20 blur-[120px]" />
          <div className="absolute left-[-200px] top-40 h-[520px] w-[520px] rounded-full bg-[#ff6a00]/10 blur-[140px]" />
        </div>

        <div className="relative mx-auto w-full container mx-auto px-4 py-10 md:py-12">
          {/* Top pill nav */}
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md">
            <div className="flex items-center gap-2 overflow-x-auto">
              {TABS.map((t) => {
                const active = t.id === activeTab;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={[
                      "shrink-0 rounded-full px-4 py-2 text-xs md:text-sm transition",
                      active
                        ? "bg-[#ff6a00] text-black"
                        : "text-white/70 hover:text-white",
                    ].join(" ")}
                  >
                    {t.label}
                  </button>
                );
              })}

              <div className="ml-auto flex items-center gap-2 pl-2">
                <div className="relative">
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search..."
                    className="w-[160px] md:w-[220px] rounded-full border border-white/10 bg-black/30 px-4 py-2 pr-10 text-xs md:text-sm text-white/90 outline-none placeholder:text-white/35 focus:border-white/25"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/45">
                    🔍
                  </span>
                </div>
              </div>
            </div>
          </div>

          {!API_KEY && (
            <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">
              NEXT_PUBLIC_YOUTUBE_API_KEY missing.
              <div className="mt-2 text-xs text-red-100/80">
                .env.local:
                <br />
                <code className="rounded bg-black/30 px-2 py-1">
                  NEXT_PUBLIC_YOUTUBE_API_KEY=YOUR_KEY
                </code>
                <br />
                <code className="rounded bg-black/30 px-2 py-1">
                  NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID={PLAYLIST_ID}
                </code>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
              : filtered.map((v) => <EpisodeCard key={v.videoId} v={v} />)}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              disabled={!prevToken || loading}
              onClick={() => fetchPlaylist(prevToken || "")}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/80 hover:bg-white/10 disabled:opacity-40"
            >
              Prev
            </button>
            <button
              disabled={!nextToken || loading}
              onClick={() => fetchPlaylist(nextToken || "")}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/80 hover:bg-white/10 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function EpisodeCard({ v }) {
  console.log('v: ', v);
  const dateText = v.publishedAt
    ? v.publishedAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "";

  // Transcript placeholder: YouTube API se transcript direct nahi milta (separate services needed)
  const onTranscript = () => {
    alert("Transcript: YouTube provides transcripts per-video, but API se direct fetch nahi hota. Chaho to main official caption-based approach bata dunga.");
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#ff6a00]/25 bg-white/5 shadow-[0_25px_70px_rgba(0,0,0,0.55)]">
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={v.thumb}
          alt={v.title}
          className="h-full w-auto"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
      </div>

      {/* Body */}
      <div className="p-5">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] text-white/70">
          {guessTag(v.title)}
        </span>

        <h3 className="mt-3 text-base font-semibold leading-snug text-white">
          {v.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-white/50 lineClamp3">
          {v.desc || "—"}
        </p>

        <div className="mt-4 flex items-center gap-3 text-xs text-white/55">
          <span>{dateText}</span>
          <span className="h-1 w-1 rounded-full bg-white/25" />
          <span>~ 42 min</span>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <a
            href={`https://www.youtube.com/watch?v=${v.videoId}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#ff6a00] px-4 py-2 text-xs font-semibold text-black hover:brightness-110"
          >
            Play Episode
          </a>

          <button
            onClick={onTranscript}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 hover:bg-white/10"
          >
            Show Transcript
          </button>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="aspect-[16/9] animate-pulse bg-white/10" />
      <div className="p-5">
        <div className="h-6 w-24 animate-pulse rounded-full bg-white/10" />
        <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-white/10" />
        <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-white/10" />
        <div className="mt-5 flex gap-3">
          <div className="h-9 w-24 animate-pulse rounded-full bg-white/10" />
          <div className="h-9 w-28 animate-pulse rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

function guessTag(title) {
  const t = (title || "").toLowerCase();
  if (t.includes("leader")) return "Leadership";
  if (t.includes("entrepreneur") || t.includes("startup") || t.includes("founder")) return "Entrepreneurship";
  if (t.includes("transform") || t.includes("growth") || t.includes("change")) return "Transformation";
  if (t.includes("community") || t.includes("team")) return "Community";
  if (t.includes("human") || t.includes("mindset") || t.includes("habits")) return "Human Potentials";
  return "All Episodes";
}
