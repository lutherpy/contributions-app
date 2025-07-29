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
} from "lucide-react";
import Link from "next/link";
import { AIInsightsDashboard } from "@/components/ai-insights-dashboard";

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

const aiAnalysis = {
  summary:
    "Análise de 23 contribuições de 12 colaboradores únicos revela padrões significativos de preocupação com conformidade LGPD e clareza de linguagem.",

  keyInsights: [
    {
      type: "trend",
      title: "Aumento de 40% em contribuições sobre LGPD",
      description:
        "Nas últimas 2 semanas, houve crescimento significativo em questões relacionadas à conformidade",
      impact: "high",
      confidence: 94,
      trend: "up",
      data: [12, 15, 18, 23], // últimas 4 semanas
    },
    {
      type: "pattern",
      title: "Seções 3.2 e 4.3 concentram 60% das preocupações",
      description:
        "Padrão consistente de confusão sobre coleta de dados e retenção",
      impact: "critical",
      confidence: 89,
      affectedSections: ["3.2", "4.3", "5.1"],
    },
    {
      type: "quality",
      title: "Contribuições de especialistas têm 85% mais engajamento",
      description:
        "Utilizadors com background legal recebem mais interações positivas",
      impact: "medium",
      confidence: 76,
      metrics: { avgLikes: 8.4, avgReplies: 3.2 },
    },
  ],

  sentimentAnalysis: {
    overall: {
      positive: 45,
      neutral: 35,
      negative: 20,
      trend: "improving", // improving, declining, stable
    },
    bySection: [
      { section: "1. Introdução", positive: 70, neutral: 25, negative: 5 },
      {
        section: "2. Dados Coletados",
        positive: 30,
        neutral: 40,
        negative: 30,
      },
      { section: "3. Uso dos Dados", positive: 25, neutral: 35, negative: 40 },
      {
        section: "4. Compartilhamento",
        positive: 35,
        neutral: 30,
        negative: 35,
      },
      {
        section: "5. Direitos do Utilizador",
        positive: 60,
        neutral: 30,
        negative: 10,
      },
    ],
    emotionalTones: [
      { emotion: "Preocupação", percentage: 35, trend: "up" },
      { emotion: "Confusão", percentage: 28, trend: "stable" },
      { emotion: "Satisfação", percentage: 22, trend: "up" },
      { emotion: "Frustração", percentage: 15, trend: "down" },
    ],
  },

  topicClusters: [
    {
      topic: "Conformidade LGPD",
      contributions: 8,
      avgSentiment: 0.2, // -1 to 1
      keywords: ["LGPD", "dados pessoais", "consentimento", "direitos"],
      urgency: "high",
    },
    {
      topic: "Clareza de Linguagem",
      contributions: 6,
      avgSentiment: -0.1,
      keywords: ["linguagem técnica", "simplificar", "exemplos"],
      urgency: "medium",
    },
    {
      topic: "Prazos e Retenção",
      contributions: 5,
      avgSentiment: -0.3,
      keywords: ["prazo", "retenção", "período", "específico"],
      urgency: "high",
    },
    {
      topic: "Exercício de Direitos",
      contributions: 4,
      avgSentiment: 0.1,
      keywords: ["como exercer", "passo a passo", "prático"],
      urgency: "medium",
    },
  ],

  actionableRecommendations: [
    {
      priority: "critical",
      title: "Revisar Seção 3.2 - Coleta de Dados",
      description:
        "85% das contribuições críticas apontam falta de especificidade",
      estimatedEffort: "2-3 horas",
      expectedImpact: "Redução de 60% nas dúvidas sobre coleta",
      suggestedActions: [
        "Adicionar lista detalhada de tipos de dados",
        "Incluir exemplos práticos de coleta",
        "Especificar finalidades para cada tipo",
      ],
    },
    {
      priority: "high",
      title: "Criar Guia Prático de Direitos",
      description:
        "Utilizadors pedem orientações práticas sobre exercício de direitos",
      estimatedEffort: "4-5 horas",
      expectedImpact: "Melhoria de 40% na satisfação do utilizador",
      suggestedActions: [
        "Desenvolver passo-a-passo ilustrado",
        "Adicionar formulários de exemplo",
        "Incluir prazos de resposta",
      ],
    },
    {
      priority: "medium",
      title: "Simplificar Linguagem Técnica",
      description: "28% das contribuições mencionam dificuldade de compreensão",
      estimatedEffort: "6-8 horas",
      expectedImpact: "Aumento de 30% na compreensibilidade",
      suggestedActions: [
        "Substituir jargão jurídico por linguagem simples",
        "Adicionar glossário de termos",
        "Incluir analogias e exemplos",
      ],
    },
  ],

  collaboratorInsights: {
    mostActive: [
      {
        name: "Maria Silva",
        contributions: 5,
        avgQuality: 4.2,
        expertise: "Legal",
      },
      {
        name: "Ana Costa",
        contributions: 4,
        avgQuality: 4.8,
        expertise: "LGPD",
      },
      {
        name: "João Santos",
        contributions: 3,
        avgQuality: 3.9,
        expertise: "Revisão",
      },
    ],
    expertiseDistribution: {
      Legal: 35,
      "UX/UI": 20,
      Técnico: 15,
      "Utilizador Final": 30,
    },
    engagementMetrics: {
      avgContributionsPerUser: 1.9,
      avgLikesPerContribution: 5.2,
      responseRate: 78, // % de contribuições que recebem respostas
    },
  },

  predictions: {
    nextWeekContributions: {
      estimated: 8,
      confidence: 82,
      factors: ["Prazo de revisão se aproximando", "Aumento de engajamento"],
    },
    potentialIssues: [
      {
        issue: "Sobrecarga na Seção 3.2",
        probability: 75,
        timeframe: "próximos 3 dias",
        mitigation: "Priorizar revisão desta seção",
      },
    ],
    qualityTrend: {
      direction: "improving",
      confidence: 71,
      factors: ["Mais especialistas participando", "Feedback mais estruturado"],
    },
  },

  comparisonMetrics: {
    vsLastDocument: {
      contributionsChange: +15,
      qualityChange: +8,
      resolutionTimeChange: -20, // % improvement
    },
    vsBenchmark: {
      engagementScore: 87, // vs industry average of 65
      satisfactionScore: 78, // vs benchmark of 70
      completionRate: 92, // vs benchmark of 85
    },
  },
};
interface DocumentPageProps {
  id: string;
}
export function DocumentPage({ id }: DocumentPageProps) {
  const [newContribution, setNewContribution] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitContribution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContribution.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setNewContribution("");
    }, 1000);
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
          {/* AI Analysis */}
          <AIInsightsDashboard analysis={aiAnalysis} />

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
