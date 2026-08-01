import { GalleryEditor } from "@/components/admin/editors/GalleryEditor";
import { getSection } from "@/lib/cms/repository";

export const metadata = { title: "갤러리 수정 | 관리자" };

export default async function Page() {
  const initial = await getSection("gallery");
  return <GalleryEditor initial={initial} />;
}
