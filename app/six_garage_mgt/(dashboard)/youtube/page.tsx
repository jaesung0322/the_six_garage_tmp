import { YoutubeEditor } from "@/components/admin/editors/YoutubeEditor";
import { getSection } from "@/lib/cms/repository";

export const metadata = { title: "비디오 수정 | 관리자" };

export default async function Page() {
  const initial = await getSection("youtube");
  return <YoutubeEditor initial={initial} />;
}
