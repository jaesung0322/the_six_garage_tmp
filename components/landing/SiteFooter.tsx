import Link from "next/link";
import type { FooterContent } from "@/lib/cms/types";

export function SiteFooter({ content }: { content: FooterContent }) {
  if (!content.visible) return null;

  const year = new Date().getFullYear();
  const copyright = content.copyright.replace("{year}", String(year));
  const directionLinks = content.directionLinks.filter((l) => l.visible);
  const contactLinks = content.contactLinks.filter((l) => l.visible);

  return (
    <footer id="contact" className="bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-10 sm:flex-row sm:items-center">
          <div>
            <p className="text-2xl font-bold text-white">
              {content.brandPrefix}
              <span className="text-brand">{content.brandAccent}</span>
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed">
              {content.tagline}
            </p>
          </div>
        </div>
        <div className="grid gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              {content.servicesHeading}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {content.serviceLabels.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              {content.directionsHeading}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {directionLinks.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              {content.contactHeading}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {contactLinks.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-zinc-500">
          {copyright}
        </p>
      </div>
    </footer>
  );
}
