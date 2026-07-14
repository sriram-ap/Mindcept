import type { Metadata } from "next";
import { Archivo, Fraunces, Inter } from "next/font/google";
import { site } from "@/content/site";
import { organizationJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* Elegant serif for luxury headlines (Vantrock-grade display type).
   Pinned to the display weights actually used (400/500/600) rather than the
   full variable range, so the hero-headline LCP payload stays small. */
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal"],
  variable: "--font-fraunces",
  // "optional": never blocks or late-swaps the hero-headline LCP. Shows the
  // size-matched Georgia serif fallback on a cold slow load, Fraunces once
  // cached — protecting Lighthouse LCP with no layout shift.
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preload the hero image — it is the homepage LCP element. */}
        <link rel="preload" as="image" href="/hero/executive.jpg" fetchPriority="high" />
      </head>
      <body>
        {/* Theme bootstrap — applies the persisted theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var m={'2bhai':'corporate',signature:'executive',midnight:'executive',mindcept:'brightday'};var t=localStorage.getItem('mc-theme');t=m[t]||t;if(t==='corporate'||t==='brightday'){document.documentElement.dataset.theme=t}else if(t==='executive'){}var l=localStorage.getItem('mc-locale');if(l==='ar'||l==='ur'){document.documentElement.dir='rtl';document.documentElement.lang=l}}catch(e){}})()",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ember focus:px-4 focus:py-2 focus:text-on-accent"
        >
          Skip to content
        </a>
        <LocaleProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FloatingActions />
        </LocaleProvider>
      </body>
    </html>
  );
}
