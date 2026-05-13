import Link from "next/link";

type CTABannerProps = {
  id?: string;
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
  variant?: "brand" | "dark";
};

export function CTABanner({
  id,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  variant = "brand",
}: CTABannerProps) {
  const bg =
    variant === "brand"
      ? "bg-brand text-brand-foreground"
      : "bg-brand text-white";

  return (
    <section
      id={id}
      className={`scroll-mt-20 py-16 sm:py-20 ${bg}`}
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          {title}
        </h2>
        {subtitle ? (
          <p className={`mt-3 text-sm sm:text-base ${variant === "brand" ? "text-white/90" : "text-white/80"}`}>
            {subtitle}
          </p>
        ) : null}
        <Link
          href={ctaHref}
          className={`mt-8 inline-flex rounded-md px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90 ${
            variant === "brand"
              ? "bg-white text-zinc-900"
              : "bg-white text-brand"
          }`}
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
