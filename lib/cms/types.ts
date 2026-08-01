/**
 * CMS 콘텐츠 스키마.
 * Supabase `site_sections` (또는 로컬 data/site-content.json)에 저장됩니다.
 */

export type SectionKey =
  | "site"
  | "header"
  | "hero"
  | "about"
  | "services"
  | "gallery"
  | "youtube"
  | "directions"
  | "footer";

export type NavItem = {
  id: string;
  href: string;
  label: string;
  visible: boolean;
};

export type StatItem = {
  id: string;
  label: string;
  value: string;
  suffix: string;
};

export type LinkItem = {
  id: string;
  label: string;
  href: string;
  visible: boolean;
};

export type SnsLink = LinkItem & {
  iconSrc?: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  priceImage: string;
  priceImageAlt: string;
  workImages: string[];
  visible: boolean;
};

export type GalleryShot = {
  id: string;
  src: string;
  alt: string;
  visible: boolean;
};

export type SiteMeta = {
  title: string;
  description: string;
  ogImage: string;
  ogImageAlt: string;
};

export type HeaderContent = {
  brandPrefix: string;
  brandAccent: string;
  navItems: NavItem[];
};

export type HeroContent = {
  visible: boolean;
  eyebrow: string;
  headline: string;
  subheadline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
};

export type AboutContent = {
  visible: boolean;
  eyebrow: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  quote: string;
  quoteBy: string;
  logo: string;
  logoAlt: string;
  stats: StatItem[];
};

export type ServicesContent = {
  visible: boolean;
  items: ServiceItem[];
};

export type GalleryContent = {
  visible: boolean;
  title: string;
  subtitle: string;
  shots: GalleryShot[];
};

export type YoutubeContent = {
  visible: boolean;
  eyebrow: string;
  title: string;
  videoId: string;
  embedTitle: string;
};

export type DirectionsContent = {
  visible: boolean;
  title: string;
  subtitle: string;
  mapImage: string;
  mapAlt: string;
  phoneLabel: string;
  phoneDisplay: string;
  phoneHref: string;
  kakaoLabel: string;
  kakaoDisplay: string;
  kakaoHref: string;
  hoursLabel: string;
  hoursBody: string;
  hoursNote: string;
  snsLabel: string;
  snsLinks: SnsLink[];
};

export type FooterContent = {
  visible: boolean;
  brandPrefix: string;
  brandAccent: string;
  tagline: string;
  servicesHeading: string;
  serviceLabels: string[];
  directionsHeading: string;
  directionLinks: LinkItem[];
  contactHeading: string;
  contactLinks: LinkItem[];
  copyright: string;
};

export type SiteContent = {
  site: SiteMeta;
  header: HeaderContent;
  hero: HeroContent;
  about: AboutContent;
  services: ServicesContent;
  gallery: GalleryContent;
  youtube: YoutubeContent;
  directions: DirectionsContent;
  footer: FooterContent;
};

export type ContentSectionMeta = {
  key: SectionKey;
  name: string;
  description: string;
  /** 랜딩 React 컴포넌트명 (관리 UI 표시용) */
  component: string;
  /** app/page.tsx 기준 렌더 순서 (작을수록 위) */
  order: number;
};
