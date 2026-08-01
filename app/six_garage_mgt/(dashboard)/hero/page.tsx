import { HeroEditor } from "@/components/admin/editors/HeroEditor";
import { getSection } from "@/lib/cms/repository";

export const metadata = { title: "히어로 수정 | 관리자" };

export default async function Page() {
  const initial = await getSection("hero");
  return <HeroEditor initial={initial} />;
}
