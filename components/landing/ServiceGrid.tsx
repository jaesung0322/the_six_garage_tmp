import Image from "next/image";
import Link from "next/link";

const tiles = [
  {
    title: "Paint protection film",
    href: "#ppf",
    src: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    alt: "Vehicle front with protective film context",
  },
  {
    title: "Window tinting",
    href: "#tint",
    src: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
    alt: "Car side window",
  },
  {
    title: "Ceramic coating",
    href: "#ceramic",
    src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    alt: "Glossy sports car paint",
  },
  {
    title: "Schedule online",
    href: "#book",
    src: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=800&q=80",
    alt: "Service desk scheduling",
  },
];

export function ServiceGrid() {
  return (
    <section id="services" className="scroll-mt-20 w-full bg-zinc-900 py-10 sm:py-14">
      <div className="grid w-full grid-cols-2 md:grid-cols-4">
        {tiles.map((tile) => (
          <Link
            key={tile.title}
            href={tile.href}
            className="group relative aspect-square min-w-0 overflow-hidden ring-1 ring-zinc-800/90"
          >
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 md:p-5">
              <span className="text-xs font-semibold uppercase tracking-wide text-white sm:text-sm">
                {tile.title}
              </span>
              <span className="mt-1 block text-[10px] text-brand sm:text-xs">
                Learn more →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
