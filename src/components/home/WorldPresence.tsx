import { WORLD_LAND_PATH } from "@/content/world-map";
import { corridors } from "@/content/corridors";

/** Market marker positions in the 1000x500 world viewBox (projected lon/lat). */
const MARKETS: {
  name: string;
  short: string;
  x: number;
  y: number;
  status: "hq" | "operational" | "future";
  dx?: number;
  dy?: number;
  anchor?: "start" | "middle" | "end";
}[] = [
  { name: "Pune", short: "Pune", x: 705, y: 234, status: "hq", dx: 12, dy: 5, anchor: "start" },
  { name: "United Arab Emirates", short: "UAE", x: 651, y: 212, status: "operational", dx: 9, dy: -7, anchor: "start" },
  { name: "Saudi Arabia", short: "Saudi Arabia", x: 625, y: 214, status: "future", dx: -9, dy: 9, anchor: "end" },
  { name: "United Kingdom", short: "United Kingdom", x: 496, y: 112, status: "future", dx: 0, dy: -11, anchor: "middle" },
  { name: "Singapore", short: "Singapore", x: 788, y: 295, status: "future", dx: 8, dy: 13, anchor: "start" },
];

/**
 * Our Presence — a champagne-gold annual-report panel with a real world
 * landmass map (Natural Earth, land only, no political borders) and glowing
 * market markers. Communicates global presence and cross-border capability,
 * not geography.
 */
export function WorldPresence({
  indiaCount,
  internationalCount,
}: {
  indiaCount: number;
  internationalCount: number;
}) {
  return (
    <div className="lg:sticky lg:top-24">
      <div
        className="relative overflow-hidden rounded-2xl p-7 sm:p-9"
        style={{
          background:
            "linear-gradient(135deg, #efe2c2 0%, #ddc491 46%, #cdb277 100%)",
          boxShadow: "0 30px 70px -34px rgba(120, 92, 40, 0.55)",
        }}
      >
        {/* brushed-gold sheen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 78% 8%, rgba(255,251,240,0.9), transparent 60%)",
          }}
        />
        <p className="relative text-[11px] font-semibold uppercase tracking-[0.3em] text-[#6b5220]">
          Global Capability
        </p>
        <h3 className="relative mt-2 font-serif text-2xl font-medium text-[#3a2c10]">
          Cross-border real estate advisory.
        </h3>

        <svg
          viewBox="0 0 1000 500"
          role="img"
          aria-label="MindCept operational markets in India and the United Arab Emirates, with future expansion into Saudi Arabia, Singapore and the United Kingdom."
          className="relative mt-6 w-full"
        >
          <defs>
            <radialGradient id="mk-op" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#5a4215" />
              <stop offset="1" stopColor="#8a6a2e" />
            </radialGradient>
          </defs>
          {/* Continent outlines — deep bronze, land only, no borders */}
          <path
            d={WORLD_LAND_PATH}
            fill="#c9ab6b"
            fillOpacity="0.35"
            stroke="#6b5220"
            strokeOpacity="0.55"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          {/* Markers */}
          {MARKETS.map((m) => (
            <g key={m.name}>
              {m.status === "hq" ? (
                <>
                  {/* soft pulse — motion-reduce safe (globals.css) */}
                  <circle
                    cx={m.x}
                    cy={m.y}
                    r="7"
                    fill="none"
                    stroke="#5a4215"
                    strokeWidth="1.4"
                    className="reach-pulse"
                    style={{ transformOrigin: `${m.x}px ${m.y}px` }}
                  />
                  <circle cx={m.x} cy={m.y} r="13" fill="#5a4215" opacity="0.16" />
                  {/* gold outer ring — primary market */}
                  <circle cx={m.x} cy={m.y} r="9.5" fill="none" stroke="#8a6a2e" strokeWidth="1.2" />
                  <circle cx={m.x} cy={m.y} r="6.4" fill="url(#mk-op)" stroke="#fdf6e5" strokeWidth="1.4" />
                </>
              ) : m.status === "operational" ? (
                <>
                  <circle cx={m.x} cy={m.y} r="10" fill="#5a4215" opacity="0.16" />
                  <circle cx={m.x} cy={m.y} r="4.4" fill="url(#mk-op)" stroke="#fdf6e5" strokeWidth="1.1" />
                </>
              ) : (
                <circle
                  cx={m.x}
                  cy={m.y}
                  r="4"
                  fill="none"
                  stroke="#6b5220"
                  strokeOpacity="0.8"
                  strokeWidth="1.3"
                  strokeDasharray="2.4 2.4"
                />
              )}
              <text
                x={m.x + (m.dx ?? 8)}
                y={m.y + (m.dy ?? 0)}
                textAnchor={m.anchor ?? "start"}
                className="font-sans"
                style={{
                  fontSize: m.status === "hq" ? "14px" : "13px",
                  fontWeight: m.status === "future" ? 500 : 700,
                  textTransform: m.status === "hq" ? "uppercase" : "none",
                  letterSpacing: m.status === "hq" ? "0.06em" : "0",
                }}
                fill={m.status === "future" ? "#6b5220" : "#3a2c10"}
              >
                {m.short}
              </text>
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="relative mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#5a4620]">
          <span className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full border border-[#fdf6e5] bg-[#5a4215]" />
            Operational
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full border border-dashed border-[#6b5220]" />
            Future expansion
          </span>
        </div>

        {/* Operating markets — named elegantly, no geography */}
        <div className="relative mt-7 grid grid-cols-1 gap-5 border-t border-[#6b5220]/25 pt-6 sm:grid-cols-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b5220]">
              India
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#4a3a16]">
              Pune · Mumbai · Bengaluru · Hyderabad · Chennai · Delhi NCR ·
              Ahmedabad · Nagpur · Indore
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b5220]">
              United Arab Emirates
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#4a3a16]">
              Dubai · Abu Dhabi · Sharjah
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b5220]">
              International
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#4a3a16]">
              Singapore · Saudi Arabia · United Kingdom
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="relative mt-7 grid grid-cols-3 gap-4 border-t border-[#6b5220]/25 pt-6 text-center">
          {[
            [indiaCount, "India markets"],
            [internationalCount, "Middle East"],
            [corridors.length, "Corridors"],
          ].map(([value, label]) => (
            <div key={label as string}>
              <p className="font-serif text-2xl font-medium text-[#3a2c10]">{value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-[#6b5220]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
