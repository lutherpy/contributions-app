import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  MessageSquare,
  Users,
  TrendingUp,
  Brain,
  AlertCircle,
  CheckCircle,
  Target,
} from "lucide-react";
import Link from "next/link";

// Dados simulados
const stats = {
  totalDocuments: 12,
  totalContributions: 156,
  activeUsers: 34,
  avgContributionsPerDoc: 13,
};

const recentDocuments = [
  {
    id: "1",
    title: "Política de Privacidade v2.0",
    contributions: 23,
    status: "active",
    lastActivity: "2 horas atrás",
    aiSuggestions: 5,
  },
  {
    id: "2",
    title: "Termos de Uso Atualizados",
    contributions: 18,
    status: "review",
    lastActivity: "1 dia atrás",
    aiSuggestions: 3,
  },
  {
    id: "3",
    title: "Manual do Utilizador v3.1",
    contributions: 31,
    status: "active",
    lastActivity: "3 horas atrás",
    aiSuggestions: 8,
  },
];

const aiInsights = [
  {
    type: "critical",
    title: "Padrão de Confusão Detectado na Seção 3.2",
    document: "Política de Privacidade v2.0",
    confidence: 94,
    impact: "Alto",
    details: "85% das contribuições mencionam dificuldade de compreensão",
    trend: "increasing",
    affectedUsers: 12,
    estimatedResolution: "2-3 horas",
  },
  {
    type: "opportunity",
    title: "Aumento de 40% em Contribuições de Qualidade",
    document: "Manual do Utilizador v3.1",
    confidence: 89,
    impact: "Positivo",
    details: "Especialistas estão mais engajados, melhorando qualidade geral",
    trend: "stable",
    affectedUsers: 8,
    estimatedResolution: "Manter estratégia atual",
  },
  {
    type: "prediction",
    title: "Pico de Atividade Previsto para Próxima Semana",
    document: "Termos de Uso Atualizados",
    confidence: 76,
    impact: "Médio",
    details: "Prazo de revisão se aproximando, espera-se 15+ contribuições",
    trend: "increasing",
    affectedUsers: 20,
    estimatedResolution: "Preparar moderação extra",
  },
  {
    type: "success",
    title: "Resolução 60% Mais Rápida com IA",
    document: "Geral",
    confidence: 92,
    impact: "Alto",
    details: "Sugestões automáticas aceleram processo de revisão",
    trend: "improving",
    affectedUsers: 34,
    estimatedResolution: "Expandir para outros documentos",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Visão geral das contribuições e análises de documentos
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Documentos
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDocuments}</div>
            <p className="text-xs text-muted-foreground">+2 este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contribuições</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContributions}</div>
            <p className="text-xs text-muted-foreground">+12% desde ontem</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Utilizadores Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">+5 esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média por Doc</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.avgContributionsPerDoc}
            </div>
            <p className="text-xs text-muted-foreground">contribuições</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Documentos Recentes</CardTitle>
            <CardDescription>
              Documentos com atividade recente de contribuições
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="space-y-1">
                  <p className="font-medium">{doc.title}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageSquare className="h-3 w-3" />
                    {doc.contributions} contribuições
                    <span>•</span>
                    {doc.lastActivity}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={doc.status === "active" ? "default" : "secondary"}
                  >
                    {doc.status === "active" ? "Ativo" : "Revisão"}
                  </Badge>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/documents/${doc.id}`}>Ver</Link>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Insights da IA
            </CardTitle>
            <CardDescription>
              Análises automáticas e sugestões baseadas nas contribuições
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 border rounded-lg"
              >
                <div className="mt-1">
                  {insight.type === "critical" && (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  {insight.type === "opportunity" && (
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  )}
                  {insight.type === "prediction" && (
                    <Brain className="h-5 w-5 text-blue-500" />
                  )}
                  {insight.type === "success" && (
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{insight.title}</p>
                    <Badge variant="outline" className="text-xs">
                      {insight.confidence}% confiança
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {insight.document}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {insight.details}
                  </p>

                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{insight.affectedUsers} usuários</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      <span>Impacto {insight.impact}</span>
                    </div>
                    {insight.trend === "increasing" && (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    )}
                    {insight.trend === "improving" && (
                      <CheckCircle className="h-3 w-3 text-blue-500" />
                    )}
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs font-medium text-gray-700">
                      Ação Recomendada:
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {insight.estimatedResolution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
