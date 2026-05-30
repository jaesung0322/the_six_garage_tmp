import Link from "next/link";

const footerColumns = [
  {
    title: "Services",
    links: [
      ["Car Wash", "#CarWash"],
      ["Detailing", "#Detailing"],
      ["Polishing", "#Polishing"],
      ["Dress Up", "#DressUp"]
    ],
  },
  {
    title: "Locations",
    links: [
      ["Naver Map", "#NaverMap"]
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "#about"],
      ["Careers", "#book"],
      ["Reviews", "#book"]
    ],
  },
  {
    title: "Contact",
    links: [
      ["Kakao Talk", "#KakaoTalk"],
      ["Naver Blog", "#NaverBlog"],
      ["Daangn", "#Daangn"]
    ],
  },
]; 
export function SiteFooter() {
  return (
    <footer id="contact" className="scroll-mt-20 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-10 sm:flex-row sm:items-center">
          <div>
            <p className="text-2xl font-bold text-white">
              The 6<span className="text-brand"> Garage</span>
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed">
              We make your car look its best—with protection that lasts and
              finishes you will notice every time you walk up to it.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="#book"
              className="rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
            >
              Book appointment
            </Link>
          </div>
        </div>
        <div className="grid gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} The 6 Garage. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
