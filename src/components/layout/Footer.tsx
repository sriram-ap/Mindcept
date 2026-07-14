import Link from "next/link";
import { site } from "@/content/site";
import { pillars } from "@/content/services";
import { SocialLinks } from "@/components/ui/SocialIcons";

export function Footer() {
  return (
    <footer className="bg-contrast text-white/75">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <p className="font-display text-lg font-bold text-white">
            Mind<span className="text-ember">Cept</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed">{site.tagline}.</p>
          <p className="mt-2 text-sm leading-relaxed">{site.description}</p>
          <SocialLinks className="mt-5 text-white" />
        </div>

        <nav aria-label="Services">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ember-bright">
            Services
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {pillars.map((pillar) => (
              <li key={pillar.slug}>
                <Link
                  href={`/services/${pillar.children[0]}`}
                  className="transition-colors hover:text-white"
                >
                  {pillar.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ember-bright">
            Company
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/about" className="transition-colors hover:text-white">
                About us
              </Link>
            </li>
            <li>
              <Link href="/clients" className="transition-colors hover:text-white">
                Clients
              </Link>
            </li>
            <li>
              <Link href="/insights" className="transition-colors hover:text-white">
                Research &amp; insights
              </Link>
            </li>
            <li>
              <Link href="/#calculator" className="transition-colors hover:text-white">
                Calculator
              </Link>
            </li>
            <li>
              <Link
                href="/#list-property"
                className="transition-colors hover:text-white"
              >
                List your property
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ember-bright">
            Get in touch
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-white"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phonePrimary.replace(/\s/g, "")}`}
                className="transition-colors hover:text-white"
              >
                {site.phonePrimary}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phoneSecondary.replace(/\s/g, "")}`}
                className="transition-colors hover:text-white"
              >
                {site.phoneSecondary}
              </a>
            </li>
            <li>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                WhatsApp
              </a>
            </li>
            <li className="pt-2 text-white/65">
              {site.address.city}, {site.address.region}, India
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
