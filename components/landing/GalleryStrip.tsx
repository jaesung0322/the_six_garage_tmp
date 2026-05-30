import Image from "next/image";

const shots = [
  "/images/car_wash_01.jpg",
  "/images/detailing_01.jpg",
  "/images/polishing_01.jpeg",
  "/images/dress_up_01.jpg",
];

export function GalleryStrip() {
  return (
    <section className="border-y border-zinc-200 bg-zinc-100 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-xl font-bold text-zinc-900 sm:text-2xl">
          The 6 Garage 제공 서비스
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-zinc-600">
          Car wash, Detailing, Polishing, Dress Up
        </p>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {shots.map((src, i) => (
            <div
              key={src}
              className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md ring-1 ring-black/5"
            >
              <Image
                src={src}
                alt={`Shop gallery image ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
