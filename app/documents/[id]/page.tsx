// app/documents/[id]/page.tsx
import { DocumentPage } from "@/components/document-page";

export default function Page({ params }: { params: { id: string } }) {
  return <DocumentPage id={params.id} />;
}
