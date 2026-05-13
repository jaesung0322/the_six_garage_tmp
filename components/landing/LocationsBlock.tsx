import Link from "next/link";

const cities = [
  "North District",
  "West End",
  "Lakeside",
  "Uptown",
  "Riverfront",
  "Midtown",
  "South Loop",
  "Eastgate",
  "Highland",
  "Creekside",
];

function PinIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 text-brand" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
  );
}

export function LocationsBlock() {
  return (
    <section className="scroll-mt-20 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 id="about" className="scroll-mt-20 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Experience vehicle perfection at our facilities
        </h2>
        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-brand" aria-hidden />
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-zinc-600">
          Cars are major investments—we protect and refine them with modern tools,
          repeatable processes, and technicians who care about the details. From
          daily drivers to weekend builds, we align protection and aesthetics with
          how you actually use the vehicle.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-zinc-600">
          We serve drivers across the metro and surrounding communities, including:
        </p>
        <div id="locations" className="scroll-mt-20">
          <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 text-left sm:grid-cols-2">
            {cities.map((city) => (
              <li
                key={city}
                className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-800"
              >
                <PinIcon />
                {city}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-10 text-sm text-zinc-500">
          Replace city names and copy with your real service areas and story.
        </p>
        <Link
          href="#book"
          className="mt-8 inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
        >
          Schedule a visit
        </Link>
      </div>
    </section>
  );
}
