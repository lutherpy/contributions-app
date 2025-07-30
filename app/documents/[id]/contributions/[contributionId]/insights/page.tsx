"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Brain,
  Download,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Dados simulados para uma contribuição específica
const mockContributions = [
  {
    id: "1",
    title: "Clarificar Coleta de Dados",
    content:
      "A seção 3.2 sobre coleta de dados precisa ser mais específica sobre quais tipos de dados pessoais são coletados.",
    user: { name: "Maria Silva" },
    section: "Seção 3.2",
    timestamp: "2024-01-15T14:30:00Z",
    likes: 5,
  },
  {
    id: "2",
    title: "Adicionar Exemplos de Direitos",
    content:
      "Sugiro adicionar um exemplo prático de como o utilizador pode exercer seus direitos de acordo com a LGPD.",
    user: { name: "João Santos" },
    section: "Seção 5.1",
    timestamp: "2024-01-15T12:15:00Z",
    likes: 3,
  },
  {
    id: "3",
    title: "Definir Prazos de Retenção",
    content:
      "O prazo de retenção de dados mencionado na seção 4.3 está muito vago. Seria melhor especificar períodos exatos.",
    user: { name: "Ana Costa" },
    section: "Seção 4.3",
    timestamp: "2024-01-14T16:45:00Z",
    likes: 8,
  },
];

// Função simulada para obter insights da IA para uma contribuição
const getAIInsightsForContribution = (contributionId: string) => {
  const contribution = mockContributions.find((c) => c.id === contributionId);

  if (!contribution) {
    return null;
  }

  // Insights simulados baseados no ID da contribuição
  let insights;
  switch (contributionId) {
    case "1":
      insights = {
        summary:
          "A IA analisou esta contribuição e identificou uma alta relevância para a clareza da seção de coleta de dados.",
        keyFindings: [
          {
            title: "Foco na Especificidade",
            description:
              "A contribuição destaca a necessidade de detalhes sobre os tipos de dados.",
            confidence: 95,
            type: "critical",
          },
          {
            title: "Sentimento de Preocupação",
            description:
              "O tom da contribuição indica uma preocupação com a conformidade e transparência.",
            confidence: 88,
            type: "alert",
          },
        ],
        suggestedActions: [
          "Revisar a Seção 3.2 para incluir uma lista exaustiva de dados coletados.",
          "Adicionar exemplos de cenários de coleta de dados.",
          "Consultar especialista em privacidade para validação.",
        ],
        sentiment: { positive: 10, neutral: 30, negative: 60 },
      };
      break;
    case "2":
      insights = {
        summary:
          "Esta contribuição é uma sugestão construtiva para melhorar a usabilidade e compreensão dos direitos do utilizador.",
        keyFindings: [
          {
            title: "Necessidade de Exemplos Práticos",
            description:
              "A IA detectou que usuários se beneficiam de exemplos concretos para aplicar seus direitos.",
            confidence: 90,
            type: "improvement",
          },
          {
            title: "Sentimento Positivo/Neutro",
            description:
              "A contribuição é construtiva e busca melhoria, sem tom negativo.",
            confidence: 80,
            type: "suggestion",
          },
        ],
        suggestedActions: [
          "Criar um FAQ ou seção de 'Como Fazer' para os direitos do utilizador.",
          "Desenvolver infográficos ou fluxogramas simples.",
        ],
        sentiment: { positive: 70, neutral: 20, negative: 10 },
      };
      break;
    case "3":
      insights = {
        summary:
          "A IA identificou que esta contribuição aponta uma ambiguidade crítica nos prazos de retenção de dados.",
        keyFindings: [
          {
            title: "Ambiguidade Crítica",
            description:
              "A falta de prazos específicos pode gerar riscos legais e confusão.",
            confidence: 98,
            type: "critical",
          },
          {
            title: "Sentimento de Urgência",
            description:
              "O tom da contribuição sugere uma necessidade imediata de revisão.",
            confidence: 92,
            type: "alert",
          },
        ],
        suggestedActions: [
          "Definir prazos de retenção claros e baseados em regulamentações.",
          "Consultar o departamento jurídico para validação dos prazos.",
        ],
        sentiment: { positive: 5, neutral: 15, negative: 80 },
      };
      break;
    default:
      insights = {
        summary:
          "Nenhum insight específico da IA disponível para esta contribuição.",
        keyFindings: [],
        suggestedActions: [],
        sentiment: { positive: 0, neutral: 0, negative: 0 },
      };
  }

  return { contribution, insights };
};

export default function ContributionInsightsPage() {
  const params = useParams();
  const contributionId = params.contributionId as string;
  const documentId = params.id as string;

  const data = getAIInsightsForContribution(contributionId);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] text-muted-foreground">
        <Brain className="h-16 w-16 mb-4" />
        <h2 className="text-xl font-semibold mb-2">
          Contribuição não encontrada
        </h2>
        <p>Não foi possível carregar os insights para esta contribuição.</p>
        <Button asChild className="mt-4">
          <Link href={`/documents/${documentId}/contributions`}>
            Voltar para Contribuições
          </Link>
        </Button>
      </div>
    );
  }

  const { contribution, insights } = data;

  const handleExportInsights = () => {
    const insightsText = `
Insights da IA para Contribuição #${contribution.id} - "${contribution.title}"

Documento: ${documentId}
Autor: ${contribution.user.name}
Seção: ${contribution.section}
Data: ${new Date(contribution.timestamp).toLocaleDateString("pt-BR")}
Curtidas: ${contribution.likes}

---
Resumo da IA:
${insights.summary}

---
Principais Descobertas:
${insights.keyFindings
  .map((f) => `- ${f.title} (${f.confidence}% confiança): ${f.description}`)
  .join("\n")}

---
Ações Sugeridas:
${insights.suggestedActions.map((a) => `- ${a}`).join("\n")}

---
Análise de Sentimento:
Positivo: ${insights.sentiment.positive}%
Neutro: ${insights.sentiment.neutral}%
Negativo: ${insights.sentiment.negative}%
    `.trim();

    const blob = new Blob([insightsText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `insights_contribuicao_${contribution.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "improvement":
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "suggestion":
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      default:
        return <Brain className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/documents/${documentId}/contributions`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Insights da IA para Contribuição
            </h2>
            <p className="text-muted-foreground">
              "{contribution.title}" por {contribution.user.name}
            </p>
          </div>
        </div>
        <Button onClick={handleExportInsights}>
          <Download className="mr-2 h-4 w-4" />
          Exportar Insights
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content - Insights */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Análise da IA
              </CardTitle>
              <CardDescription>{insights.summary}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Key Findings */}
              <div>
                <h4 className="font-medium mb-3">Principais Descobertas</h4>
                <div className="space-y-3">
                  {insights.keyFindings.map((finding, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1">{getInsightIcon(finding.type)}</div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{finding.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {finding.description}
                        </p>
                        <Badge variant="outline" className="text-xs mt-2">
                          {finding.confidence}% confiança
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Suggested Actions */}
              <div>
                <h4 className="font-medium mb-3">Ações Sugeridas</h4>
                <ul className="space-y-2">
                  {insights.suggestedActions.map((action, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              {/* Sentiment Analysis */}
              <div>
                <h4 className="font-medium mb-2">Análise de Sentimento</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Positivo</span>
                    <span>{insights.sentiment.positive}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${insights.sentiment.positive}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Neutro</span>
                    <span>{insights.sentiment.neutral}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-400 h-2 rounded-full"
                      style={{ width: `${insights.sentiment.neutral}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-red-600">Negativo</span>
                    <span>{insights.sentiment.negative}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${insights.sentiment.negative}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Contribution Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes da Contribuição</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Título:</p>
                <p className="text-muted-foreground">{contribution.title}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Conteúdo:</p>
                <p className="text-muted-foreground">{contribution.content}</p>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="font-medium">Autor:</span>
                <span className="text-muted-foreground">
                  {contribution.user.name}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Seção:</span>
                <span className="text-muted-foreground">
                  {contribution.section}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Data:</span>
                <span className="text-muted-foreground">
                  {new Date(contribution.timestamp).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Curtidas:</span>
                <span className="text-muted-foreground">
                  {contribution.likes}
                </span>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-full mt-4 bg-transparent"
              >
                <Link href={`/documents/${documentId}/contributions`}>
                  Ver Todas Contribuições
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
