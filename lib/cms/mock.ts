import type { ContentSectionMeta, SiteContent } from "./types";

export const CONTENT_SECTIONS: ContentSectionMeta[] = [
  {
    key: "site",
    name: "사이트 SEO",
    description: "브라우저 타이틀·OG 이미지",
    component: "layout metadata",
    order: 0,
  },
  {
    key: "header",
    name: "헤더",
    description: "브랜드명·메뉴 항목",
    component: "SiteHeader",
    order: 1,
  },
  {
    key: "hero",
    name: "히어로",
    description: "상단 메인 비주얼과 카피",
    component: "Hero",
    order: 2,
  },
  {
    key: "about",
    name: "소개",
    description: "브랜드 스토리·통계·로고",
    component: "AboutStory",
    order: 3,
  },
  {
    key: "services",
    name: "서비스",
    description: "서비스 카드·가격표·작업 사진",
    component: "ServiceShowcase",
    order: 4,
  },
  {
    key: "gallery",
    name: "갤러리",
    description: "OUR WORK 슬라이더",
    component: "GalleryStrip",
    order: 5,
  },
  {
    key: "youtube",
    name: "비디오",
    description: "유튜브 영상 임베드",
    component: "YouTubeSection",
    order: 6,
  },
  {
    key: "directions",
    name: "오시는 길",
    description: "지도·연락처·운영시간·SNS",
    component: "Directions",
    order: 7,
  },
  {
    key: "footer",
    name: "푸터",
    description: "하단 브랜드·링크·저작권",
    component: "SiteFooter",
    order: 8,
  },
];

export const MOCK_CONTENT: SiteContent = {
  site: {
    title: "The 6 Garage | Vehicle Detailing & Paint Protection",
    description:
      "Detailing, paint protection film, ceramic coating, and window tint—professional care for your vehicle.",
    ogImage: "/images/sns_01.webp",
    ogImageAlt: "The 6 Garage",
  },
  header: {
    brandPrefix: "The 6",
    brandAccent: " Garage",
    navItems: [
      { id: "nav-home", href: "#top", label: "HOME", visible: true },
      { id: "nav-about", href: "#about", label: "ABOUT", visible: true },
      { id: "nav-services", href: "#services", label: "SERVICES", visible: true },
      { id: "nav-gallery", href: "#gallery", label: "GALLERY", visible: true },
      { id: "nav-video", href: "#videos", label: "VIDEO", visible: true },
      { id: "nav-directions", href: "#directions", label: "DIRECTIONS", visible: true },
    ],
  },
  hero: {
    visible: true,
    eyebrow: "Local vehicle care",
    headline: "The 6 Garage",
    subheadline: "Detailing & Auto Care Services",
    body: "외부 · 내부 세차 및 디테일링 그리고 좋은 제품으로 광택을 꼼꼼히 진행하고\n차량 드레스 업 작업에 대한 맞춤 서비스도 함께합니다.",
    ctaLabel: "서비스 보기",
    ctaHref: "#services",
    image: "/images/hero_01_01.webp",
    imageAlt: "Professional vehicle bay",
  },
  about: {
    visible: true,
    eyebrow: "Our Story",
    title: "ABOUT",
    subtitle: "정직함으로 키운 개인 디테일링 오토케어 브랜드",
    paragraphs: [
      "The 6 Garage는 디테일링 오토케어 서비스를 제공하는 일명 젊은 차덕후의 개인 브랜드입니다.",
      "출장 픽업 세차만 해도 2년 차에 접어든 나름 경기 남부지역에서는 신뢰가 어느정도 쌓인 개인 출장 세차 브랜드로서, 보다 더 나은 서비스를 위해 매일 공부하며 노력하고 있습니다.",
      "이미 당근 마켓 업체로는 꽤 많은 단골이 서비스를 애용해주고 계시며, 많은 후기와 더불어 아직까지 별점 5점 만점을 유지 중인 이동식 세차가 바로 더 식스 게러지입니다.",
    ],
    quote: "“고객님의 소중한 차량의 외장, 앞으로 제가 관리해 드리겠습니다.”",
    quoteBy: "— Detailor 이동식",
    logo: "/images/about_logo_01.webp",
    logoAlt: "The 6 Garage 로고",
    stats: [
      { id: "stat-1", label: "단골 고객", value: "100", suffix: "+" },
      { id: "stat-2", label: "누적 후기", value: "60", suffix: "+" },
      { id: "stat-3", label: "평균 별점", value: "5.0", suffix: "" },
    ],
  },
  services: {
    visible: true,
    items: [
      {
        id: "svc-self",
        title: "셀프 세차 도우미",
        description:
          "세차시 세차에 필요한 도구와 케미컬 제공 및 사용 방법을 안내해드리며, 오로지 세차만 직접 하실 수 있도록 서포트하는 서비스 입니다.\n소요 시간은 보통 1시간 30분 정도 소요되며, 오염 및 숙달 상태에 따라 변동 될 수 있습니다.",
        priceImage: "/images/price_01_edit_02.webp",
        priceImageAlt: "셀프 세차 도우미 가격표",
        workImages: [
          "/images/a45_01.webp",
          "/images/a45_02.webp",
          "/images/a45_03.webp",
          "/images/a45_04.webp",
          "/images/tt_01.webp",
          "/images/tt_02.webp",
          "/images/tt_03.webp",
          "/images/tt_04.webp",
        ],
        visible: true,
      },
      {
        id: "svc-basic",
        title: "출장 픽업 세차(기본형)",
        description:
          "가장 기본적인 세차 작업의 형태이며, 제가 직접 차량을 픽업하여 안내된 내용에 따라 작업을 진행하고 본래 있던 위치까지 원위치 시키는 출장 픽업 세차 서비스 입니다.\n소요 시간은 보통 2시간 30분 정도 소요되며, 오염 상태에 따라 변동 되거나 추가 작업을 요청할 수 있습니다.",
        priceImage: "/images/price_02_edit_02.webp",
        priceImageAlt: "출장 픽업 세차 기본형 가격표",
        workImages: [
          "/images/gls_01.webp",
          "/images/gls_02.webp",
          "/images/gls_03.webp",
          "/images/gls_04.webp",
          "/images/gls_05.webp",
          "/images/gls_06.webp",
          "/images/gls_07.webp",
          "/images/gls_08.webp",
        ],
        visible: true,
      },
      {
        id: "svc-polish",
        title: "출장 픽업 세차(광택형)",
        description:
          "기본적인 세차 수준을 넘어 일상속에서 발생될 수 있는 잔기스 및 세차로 생긴 스월 마크를 관리할 수 있는 서비스로, 도장면 최상단의 클리어층을 미세하게 다듬어 최대한 매끈한 상태로 보일 수 있도록 복원하는 것에 초점을 맞춘 프로그램입니다.\n소요 시간은 보통 6시간 정도 소요되며, 오염 및 표면 상태에 따라 변동 되거나 추가 작업을 요청할 수 있습니다.",
        priceImage: "/images/price_03_edit_02.webp",
        priceImageAlt: "출장 픽업 세차 광택형 가격표",
        workImages: [
          "/images/exp_01.webp",
          "/images/exp_02.webp",
          "/images/exp_03.webp",
          "/images/exp_04.webp",
          "/images/exp_05.webp",
          "/images/exp_06.webp",
          "/images/exp_07.webp",
          "/images/exp_08.webp",
        ],
        visible: true,
      },
    ],
  },
  gallery: {
    visible: true,
    title: "OUR WORK",
    subtitle: "Car Wash, Detailing, Polishing, Dress Up",
    shots: [
      { id: "gal-1", src: "/images/car_wash_01.webp", alt: "Car Wash", visible: true },
      { id: "gal-2", src: "/images/detailing_01.webp", alt: "Detailing", visible: true },
      { id: "gal-3", src: "/images/polishing_01.webp", alt: "Polishing", visible: true },
      { id: "gal-4", src: "/images/dress_up_01.webp", alt: "Dress Up", visible: true },
    ],
  },
  youtube: {
    visible: true,
    eyebrow: "Watch",
    title: "VIDEO",
    videoId: "bLrCyE-4Q4I",
    embedTitle: "The 6 Garage YouTube 영상",
  },
  directions: {
    visible: true,
    title: "Directions",
    subtitle: "Check Business Hours Before Visiting.",
    mapImage: "/images/tmp_map_03.webp",
    mapAlt: "The 6 Garage 위치 지도",
    phoneLabel: "통화 예약 문의",
    phoneDisplay: "010-4090-3476",
    phoneHref: "01040903476",
    kakaoLabel: "카카오톡 예약 문의",
    kakaoDisplay: "the6garage",
    kakaoHref: "#",
    hoursLabel: "운영시간",
    hoursBody:
      "월 - 목 18:00 ~ 04:00\n토 00:00 ~ 다음날 05:00\n(휴게시간 12:00 ~ 20:00)\n일 22:00 ~ 24:00",
    hoursNote: "설, 추석, 금 정기휴무",
    snsLabel: "SNS",
    snsLinks: [
      {
        id: "sns-kakao",
        label: "카카오톡 채널",
        href: "#KakaoTalk",
        visible: true,
      },
      {
        id: "sns-naver",
        label: "네이버 블로그",
        href: "https://blog.naver.com/6detailing",
        iconSrc: "/images/sns_naver_app.webp",
        visible: true,
      },
      {
        id: "sns-daangn",
        label: "당근",
        href: "https://www.daangn.com/kr/local-profile/%EC%9D%B4%EB%8F%99%EC%8B%9D-%EC%84%B8%EC%B0%A8-citihr7tusrz/",
        iconSrc: "/images/sns_danggeun_icon.webp",
        visible: true,
      },
    ],
  },
  footer: {
    visible: true,
    brandPrefix: "The 6",
    brandAccent: " Garage",
    tagline:
      "We make your car look its best—with protection that lasts and finishes you will notice every time you walk up to it.",
    servicesHeading: "Services",
    serviceLabels: ["Car Wash", "Detailing", "Polishing", "Dress Up"],
    directionsHeading: "Directions",
    directionLinks: [
      { id: "ft-map", label: "Naver Map", href: "#directions", visible: true },
    ],
    contactHeading: "Contact",
    contactLinks: [
      { id: "ft-kakao", label: "Kakao Talk", href: "#KakaoTalk", visible: true },
      { id: "ft-blog", label: "Naver Blog", href: "#NaverBlog", visible: true },
      { id: "ft-daangn", label: "Daangn", href: "#Daangn", visible: true },
    ],
    copyright: "© {year} The 6 Garage. All rights reserved.",
  },
};

export function getSectionMeta(key: string): ContentSectionMeta | undefined {
  return CONTENT_SECTIONS.find((s) => s.key === key);
}

export function isSectionKey(key: string): key is keyof SiteContent {
  return CONTENT_SECTIONS.some((s) => s.key === key);
}

export function isSectionVisible(content: SiteContent, key: keyof SiteContent): boolean {
  const section = content[key];
  if (section && typeof section === "object" && "visible" in section) {
    return Boolean((section as { visible?: boolean }).visible);
  }
  return true;
}
