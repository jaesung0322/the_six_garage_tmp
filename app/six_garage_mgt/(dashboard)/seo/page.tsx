import { SeoEditor } from "@/components/admin/editors/SeoEditor";
import { getSection } from "@/lib/cms/repository";

export const metadata = { title: "SEO 수정 | 관리자" };

export default async function Page() {
  const initial = await getSection("site");
  return <SeoEditor initial={initial} />;
}
