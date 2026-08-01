import { ServicesEditor } from "@/components/admin/editors/ServicesEditor";
import { getSection } from "@/lib/cms/repository";

export const metadata = { title: "서비스 수정 | 관리자" };

export default async function Page() {
  const initial = await getSection("services");
  return <ServicesEditor initial={initial} />;
}
