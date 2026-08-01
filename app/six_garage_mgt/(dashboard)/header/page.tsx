import { HeaderEditor } from "@/components/admin/editors/HeaderEditor";
import { getSection } from "@/lib/cms/repository";

export const metadata = { title: "헤더 수정 | 관리자" };

export default async function Page() {
  const initial = await getSection("header");
  return <HeaderEditor initial={initial} />;
}
