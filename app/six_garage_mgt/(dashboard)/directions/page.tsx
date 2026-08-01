import { DirectionsEditor } from "@/components/admin/editors/DirectionsEditor";
import { getSection } from "@/lib/cms/repository";

export const metadata = { title: "오시는 길 수정 | 관리자" };

export default async function Page() {
  const initial = await getSection("directions");
  return <DirectionsEditor initial={initial} />;
}
