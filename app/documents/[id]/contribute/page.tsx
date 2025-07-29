"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Send,
  FileText,
  AlertCircle,
  Lightbulb,
  MessageSquare,
  Flag,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Dados simulados do documento
const document = {
  id: "1",
  title: "Política de Privacidade v2.0",
  sections: [
    "1. Introdução",
    "2. Dados Coletados",
    "3. Uso dos Dados",
    "4. Compartilhamento",
    "5. Direitos do Utilizador",
    "6. Segurança",
    "7. Retenção de Dados",
    "8. Contato",
  ],
};

const contributionTypes = [
  {
    value: "suggestion",
    label: "Sugestão",
    icon: Lightbulb,
    color: "bg-blue-100 text-blue-800",
  },
  {
    value: "correction",
    label: "Correção",
    icon: AlertCircle,
    color: "bg-red-100 text-red-800",
  },
  {
    value: "question",
    label: "Pergunta",
    icon: MessageSquare,
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "concern",
    label: "Preocupação",
    icon: Flag,
    color: "bg-orange-100 text-orange-800",
  },
];

export default function ContributePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    section: "",
    type: "",
    priority: "medium",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio
    setTimeout(() => {
      setIsSubmitting(false);
      router.push(`/documents/${params.id}`);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectedType = contributionTypes.find(
    (type) => type.value === formData.type
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href={`/documents/${params.id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Nova Contribuição
          </h2>
          <p className="text-muted-foreground">{document.title}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes da Contribuição</CardTitle>
              <CardDescription>
                Forneça informações detalhadas sobre sua sugestão, correção ou
                comentário
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Título */}
                <div className="space-y-2">
                  <Label htmlFor="title">Título da Contribuição *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Clarificar seção sobre coleta de dados"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>

                {/* Tipo e Seção */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Contribuição *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) =>
                        handleInputChange("type", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {contributionTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <type.icon className="h-4 w-4" />
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="section">Seção do Documento</Label>
                    <Select
                      value={formData.section}
                      onValueChange={(value) =>
                        handleInputChange("section", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a seção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Documento Geral</SelectItem>
                        {document.sections.map((section, index) => (
                          <SelectItem key={index} value={section}>
                            {section}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Prioridade */}
                <div className="space-y-2">
                  <Label htmlFor="priority">Prioridade</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) =>
                      handleInputChange("priority", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixa</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="critical">Crítica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Conteúdo */}
                <div className="space-y-2">
                  <Label htmlFor="content">Descrição Detalhada *</Label>
                  <Textarea
                    id="content"
                    placeholder="Descreva sua contribuição de forma clara e detalhada..."
                    value={formData.content}
                    onChange={(e) =>
                      handleInputChange("content", e.target.value)
                    }
                    rows={8}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Seja específico e forneça contexto. Inclua sugestões de
                    melhoria quando possível.
                  </p>
                </div>

                {/* Botões */}
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={
                      isSubmitting || !formData.title || !formData.content
                    }
                  >
                    {isSubmitting ? (
                      <>Enviando...</>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar Contribuição
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href={`/documents/${params.id}`}>Cancelar</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preview */}
          {(formData.title || formData.content) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pré-visualização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {formData.title && (
                  <div>
                    <h4 className="font-medium">{formData.title}</h4>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {selectedType && (
                    <Badge className={selectedType.color}>
                      <selectedType.icon className="h-3 w-3 mr-1" />
                      {selectedType.label}
                    </Badge>
                  )}
                  {formData.section && (
                    <Badge variant="outline">{formData.section}</Badge>
                  )}
                  {formData.priority && (
                    <Badge
                      variant={
                        formData.priority === "critical"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {formData.priority === "low" && "Baixa"}
                      {formData.priority === "medium" && "Média"}
                      {formData.priority === "high" && "Alta"}
                      {formData.priority === "critical" && "Crítica"}
                    </Badge>
                  )}
                </div>

                {formData.content && (
                  <div>
                    <p className="text-sm text-muted-foreground line-clamp-4">
                      {formData.content}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Diretrizes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex gap-2">
                <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Seja específico</p>
                  <p className="text-muted-foreground">
                    Indique exatamente qual parte precisa ser alterada
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <MessageSquare className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Forneça contexto</p>
                  <p className="text-muted-foreground">
                    Explique por que a mudança é necessária
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Sugira soluções</p>
                  <p className="text-muted-foreground">
                    Quando possível, proponha alternativas
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="font-medium">{document.title}</p>
                <p className="text-muted-foreground">
                  23 contribuições existentes
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                >
                  <Link href={`/documents/${params.id}`}>Ver Documento</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
