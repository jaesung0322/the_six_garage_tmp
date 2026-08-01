import { FooterEditor } from "@/components/admin/editors/FooterEditor";
import { getSection } from "@/lib/cms/repository";

export const metadata = { title: "푸터 수정 | 관리자" };

export default async function Page() {
  const initial = await getSection("footer");
  return <FooterEditor initial={initial} />;
}
