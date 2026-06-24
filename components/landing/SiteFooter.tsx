import Link from "next/link";

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-zinc-950 text-zinc-400">
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
        </div>
        <div className="grid gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Services
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="#CarWash" className="hover:text-white">
                  Car Wash
                </Link>
              </li>
              <li>
                <Link href="#Detailing" className="hover:text-white">
                  Detailing
                </Link>
              </li>
              <li>
                <Link href="#Polishing" className="hover:text-white">
                  Polishing
                </Link>
              </li>
              <li>
                <Link href="#DressUp" className="hover:text-white">
                  Dress Up
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Directions
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="#directions" className="hover:text-white">
                  Naver Map
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="#KakaoTalk" className="hover:text-white">
                  Kakao Talk
                </Link>
              </li>
              <li>
                <Link href="#NaverBlog" className="hover:text-white">
                  Naver Blog
                </Link>
              </li>
              <li>
                <Link href="#Daangn" className="hover:text-white">
                  Daangn
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} The 6 Garage. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
