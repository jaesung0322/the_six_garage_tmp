export type AdminLink = {
  href: string;
  label: string;
  hint?: string;
  exact?: boolean;
};

/** 사이드바·대시보드용 — 컴포넌트 1개 = 페이지 1개 */
export const adminPages: AdminLink[] = [
  { href: "/six_garage_mgt", label: "홈", hint: "전체 목록", exact: true },
  { href: "/six_garage_mgt/mypage", label: "마이페이지", hint: "계정·비밀번호" },
  { href: "/six_garage_mgt/hero", label: "히어로", hint: "Hero" },
  { href: "/six_garage_mgt/about", label: "소개", hint: "AboutStory" },
  { href: "/six_garage_mgt/services", label: "서비스", hint: "ServiceShowcase" },
  { href: "/six_garage_mgt/gallery", label: "갤러리", hint: "GalleryStrip" },
  { href: "/six_garage_mgt/youtube", label: "비디오", hint: "YouTubeSection" },
  { href: "/six_garage_mgt/directions", label: "오시는 길", hint: "Directions" },
  { href: "/six_garage_mgt/header", label: "헤더", hint: "SiteHeader" },
  { href: "/six_garage_mgt/footer", label: "푸터", hint: "SiteFooter" },
  { href: "/six_garage_mgt/seo", label: "SEO", hint: "사이트 제목·공유 이미지" },
];
