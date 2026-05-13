import Link from "next/link";

const nav = [
  { href: "#services", label: "Services" },
  { href: "#locations", label: "Locations" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 shrink-0 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-white sm:text-xl"
        >
          The 6<span className="text-brand"> Garage</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-200 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <details className="relative md:hidden">
            <summary className="list-none cursor-pointer rounded-md border border-white/15 px-3 py-2 text-sm text-white">
              Menu
            </summary>
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-white/10 bg-zinc-900 py-2 shadow-xl">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-zinc-200 hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
          <Link
            href="#book"
            className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
