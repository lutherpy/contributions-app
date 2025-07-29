// app/documents/[id]/contributions/page.tsx (Server Component)
import { ReactNode } from "react";
import ContributionsPage from "./ClientContributionsPage";

export default function Page({ params }: { params: { id: string } }) {
  return <ContributionsPage documentId={params.id} />;
}
