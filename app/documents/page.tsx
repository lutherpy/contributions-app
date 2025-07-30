import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, MessageSquare, Calendar, Search } from "lucide-react";
import Link from "next/link";

const documents = [
  {
    id: "1",
    title: "Política de Privacidade v2.0",
    description:
      "Documento atualizado com as novas diretrizes de proteção de dados",
    uploadDate: "2024-01-15",
    contributions: 23,
    status: "active",
    category: "Legal",
  },
  {
    id: "2",
    title: "Termos de Uso Atualizados",
    description: "Revisão dos termos de uso da plataforma",
    uploadDate: "2024-01-12",
    contributions: 18,
    status: "review",
    category: "Legal",
  },
  {
    id: "3",
    title: "Manual do Utilizador v3.1",
    description: "Guia completo para utilização da plataforma",
    uploadDate: "2024-01-10",
    contributions: 31,
    status: "active",
    category: "Documentação",
  },
  {
    id: "4",
    title: "Código de Conduta",
    description: "Diretrizes de comportamento para a comunidade",
    uploadDate: "2024-01-08",
    contributions: 12,
    status: "active",
    category: "Políticas",
  },
  {
    id: "5",
    title: "Guia de Segurança",
    description: "Melhores práticas de segurança para usuários",
    uploadDate: "2024-01-05",
    contributions: 7,
    status: "draft",
    category: "Segurança",
  },
  {
    id: "6",
    title: "FAQ - Perguntas Frequentes",
    description: "Respostas para as dúvidas mais comuns",
    uploadDate: "2024-01-03",
    contributions: 15,
    status: "active",
    category: "Suporte",
  },
];

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Documentos</h2>
          <p className="text-muted-foreground">
            Explore e contribua com os documentos disponíveis
          </p>
        </div>
        <Button asChild>
          <Link href="/admin">
            <FileText className="mr-2 h-4 w-4" />
            Novo Documento
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar documentos..." className="pl-10" />
              </div>
            </div>
            <Button variant="outline">Filtros</Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{doc.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {doc.description}
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    doc.status === "active"
                      ? "default"
                      : doc.status === "review"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {doc.status === "active"
                    ? "Ativo"
                    : doc.status === "review"
                    ? "Revisão"
                    : "Rascunho"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(doc.uploadDate).toLocaleDateString("pt-BR")}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {doc.category}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">{doc.contributions}</span>
                  <span className="text-muted-foreground">contribuições</span>
                </div>

                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href={`/documents/${doc.id}`}>Ver Documento</Link>
                  </Button>
                  <Button variant="outline" size="icon">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
