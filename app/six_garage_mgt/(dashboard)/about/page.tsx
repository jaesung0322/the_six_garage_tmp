import { AboutEditor } from "@/components/admin/editors/AboutEditor";
import { getSection } from "@/lib/cms/repository";

export const metadata = { title: "소개 수정 | 관리자" };

export default async function Page() {
  const initial = await getSection("about");
  return <AboutEditor initial={initial} />;
}
