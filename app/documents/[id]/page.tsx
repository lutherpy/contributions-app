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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Send,
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";

// Dados simulados
const document = {
  id: "1",
  title: "Política de Privacidade v2.0",
  uploadDate: "2024-01-15",
  size: "2.3 MB",
  totalContributions: 23,
  status: "active",
};

const contributions = [
  {
    id: "1",
    user: {
      name: "Maria Silva",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content:
      "A seção 3.2 sobre coleta de dados precisa ser mais específica sobre quais tipos de dados pessoais são coletados.",
    timestamp: "2 horas atrás",
    likes: 5,
    dislikes: 0,
    section: "Seção 3.2",
  },
  {
    id: "2",
    user: {
      name: "João Santos",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content:
      "Sugiro adicionar um exemplo prático de como o utilizador pode exercer seus direitos de acordo com a LGPD.",
    timestamp: "4 horas atrás",
    likes: 3,
    dislikes: 1,
    section: "Seção 5.1",
  },
  {
    id: "3",
    user: { name: "Ana Costa", avatar: "/placeholder.svg?height=32&width=32" },
    content:
      "O prazo de retenção de dados mencionado na seção 4.3 está muito vago. Seria melhor especificar períodos exatos.",
    timestamp: "1 dia atrás",
    likes: 8,
    dislikes: 0,
    section: "Seção 4.3",
  },
];

// Dados de análise da IA simplificados
const aiAnalysis = {
  summary:
    "A IA analisou 23 contribuições e identificou as principais áreas de melhoria e preocupação.",
  topSuggestions: [
    {
      type: "critical",
      title: "Clarificar Coleta de Dados (Seção 3.2)",
      description:
        "Muitas dúvidas sobre quais dados são coletados. Alta prioridade.",
      confidence: 92,
    },
    {
      type: "improvement",
      title: "Adicionar Exemplos de Direitos (Seção 5.1)",
      description:
        "Utilizadores querem exemplos práticos de como exercer seus direitos.",
      confidence: 85,
    },
    {
      type: "alert",
      title: "Definir Prazos de Retenção (Seção 4.3)",
      description:
        "Prazos de retenção estão vagos e precisam ser especificados.",
      confidence: 88,
    },
  ],
  overallSentiment: {
    positive: 65,
    neutral: 25,
    negative: 10,
  },
  keyTrend: {
    title: "Aumento de 40% em Contribuições sobre LGPD",
    description:
      "Crescimento significativo em questões relacionadas à conformidade nas últimas semanas.",
    trend: "up", // 'up', 'down', 'stable'
  },
};

export default function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [newContribution, setNewContribution] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitContribution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContribution.trim()) return;

    setIsSubmitting(true);
    // Simular envio
    setTimeout(() => {
      setIsSubmitting(false);
      setNewContribution("");
    }, 1000);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "improvement":
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default:
        return <Brain className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Document Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {document.title}
          </h2>
          <div className="flex items-center gap-4 text-muted-foreground mt-2">
            <span className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              {document.size}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              {document.totalContributions} contribuições
            </span>
            <Badge
              variant={document.status === "active" ? "default" : "secondary"}
            >
              {document.status === "active" ? "Ativo" : "Revisão"}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={`/documents/${id}/contribute`}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Nova Contribuição
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/documents/${id}/contributions`}>
              Ver Todas ({document.totalContributions})
            </Link>
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Ver PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* PDF Viewer Placeholder */}
          <Card>
            <CardContent className="p-6">
              <div className="aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-gray-500">Visualizador de PDF</p>
                  <p className="text-sm text-gray-400 mt-2">{document.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* New Contribution Form */}
          <Card>
            <CardHeader>
              <CardTitle>Nova Contribuição</CardTitle>
              <CardDescription>
                Compartilhe suas sugestões e comentários sobre este documento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitContribution} className="space-y-4">
                <Textarea
                  placeholder="Digite sua contribuição aqui..."
                  value={newContribution}
                  onChange={(e) => setNewContribution(e.target.value)}
                  rows={4}
                />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Seja específico e construtivo em seus comentários
                  </p>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !newContribution.trim()}
                  >
                    {isSubmitting ? (
                      <>Enviando...</>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Contributions List */}
          <Card>
            <CardHeader>
              <CardTitle>Contribuições ({contributions.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {contributions.map((contribution, index) => (
                <div key={contribution.id}>
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage
                        src={contribution.user.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        {contribution.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {contribution.user.name}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {contribution.section}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {contribution.timestamp}
                        </span>
                      </div>
                      <p className="text-sm">{contribution.content}</p>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {contribution.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ThumbsDown className="h-3 w-3 mr-1" />
                          {contribution.dislikes}
                        </Button>
                        <Button asChild variant="outline" size="sm">
                          <Link
                            href={`/documents/${id}/contributions/${contribution.id}/insights`}
                          >
                            Ver Insights IA
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index < contributions.length - 1 && (
                    <Separator className="mt-6" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Simplified AI Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Insights da IA
              </CardTitle>
              <CardDescription>{aiAnalysis.summary}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Top Suggestions */}
              <div>
                <h4 className="font-medium mb-3">Sugestões Principais</h4>
                <div className="space-y-3">
                  {aiAnalysis.topSuggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1">
                        {getInsightIcon(suggestion.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {suggestion.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {suggestion.description}
                        </p>
                        <Badge variant="outline" className="text-xs mt-2">
                          {suggestion.confidence}% confiança
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Overall Sentiment */}
              <div>
                <h4 className="font-medium mb-2">Sentimento Geral</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Positivo</span>
                    <span>{aiAnalysis.overallSentiment.positive}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${aiAnalysis.overallSentiment.positive}%`,
                      }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Neutro</span>
                    <span>{aiAnalysis.overallSentiment.neutral}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-400 h-2 rounded-full"
                      style={{
                        width: `${aiAnalysis.overallSentiment.neutral}%`,
                      }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-red-600">Negativo</span>
                    <span>{aiAnalysis.overallSentiment.negative}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{
                        width: `${aiAnalysis.overallSentiment.negative}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Key Trend */}
              <div>
                <h4 className="font-medium mb-2">Tendência Chave</h4>
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {aiAnalysis.keyTrend.trend === "up" && (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    )}
                    {aiAnalysis.keyTrend.trend === "down" && (
                      <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                    )}
                    {aiAnalysis.keyTrend.trend === "stable" && (
                      <Brain className="h-4 w-4 text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">
                      {aiAnalysis.keyTrend.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {aiAnalysis.keyTrend.description}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Total de Contribuições</span>
                <span className="font-medium">
                  {document.totalContributions}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Contribuidores Únicos</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Média por Seção</span>
                <span className="font-medium">3.8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Última Atividade</span>
                <span className="font-medium">2h atrás</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
