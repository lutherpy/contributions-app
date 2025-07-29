"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Target,
  BarChart3,
  Clock,
  Zap,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react"

interface AIInsightsProps {
  analysis: any // Tipo seria mais específico em produção
}

export function AIInsightsDashboard({ analysis }: AIInsightsProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-3 w-3 text-green-500" />
      case "down":
        return <ArrowDown className="h-3 w-3 text-red-500" />
      default:
        return <Minus className="h-3 w-3 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Análise Avançada da IA
          </CardTitle>
          <CardDescription>{analysis.summary}</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="insights" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="sentiment">Sentimento</TabsTrigger>
          <TabsTrigger value="topics">Tópicos</TabsTrigger>
          <TabsTrigger value="recommendations">Ações</TabsTrigger>
          <TabsTrigger value="predictions">Predições</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4">
            {analysis.keyInsights.map((insight: any, index: number) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {insight.type === "trend" && <TrendingUp className="h-5 w-5 text-blue-500" />}
                      {insight.type === "pattern" && <Target className="h-5 w-5 text-purple-500" />}
                      {insight.type === "quality" && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{insight.title}</h4>
                        <div className="flex items-center gap-2">
                          {insight.trend && getTrendIcon(insight.trend)}
                          <Badge variant="outline">{insight.confidence}% confiança</Badge>
                          <Badge className={getPriorityColor(insight.impact)}>
                            {insight.impact === "high"
                              ? "Alto Impacto"
                              : insight.impact === "critical"
                                ? "Crítico"
                                : "Médio Impacto"}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>

                      {insight.data && (
                        <div className="mt-3">
                          <p className="text-xs text-muted-foreground mb-2">Tendência (últimas 4 semanas):</p>
                          <div className="flex items-end gap-1 h-8">
                            {insight.data.map((value: number, i: number) => (
                              <div
                                key={i}
                                className="bg-blue-500 rounded-sm flex-1"
                                style={{ height: `${(value / Math.max(...insight.data)) * 100}%` }}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {insight.affectedSections && (
                        <div className="flex gap-1 mt-2">
                          {insight.affectedSections.map((section: string) => (
                            <Badge key={section} variant="outline" className="text-xs">
                              Seção {section}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sentimento Geral</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-600">Positivo</span>
                    <span className="text-sm">{analysis.sentimentAnalysis.overall.positive}%</span>
                  </div>
                  <Progress value={analysis.sentimentAnalysis.overall.positive} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Neutro</span>
                    <span className="text-sm">{analysis.sentimentAnalysis.overall.neutral}%</span>
                  </div>
                  <Progress value={analysis.sentimentAnalysis.overall.neutral} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-red-600">Negativo</span>
                    <span className="text-sm">{analysis.sentimentAnalysis.overall.negative}%</span>
                  </div>
                  <Progress value={analysis.sentimentAnalysis.overall.negative} className="h-2" />
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Tendência:</span>
                    <Badge variant={analysis.sentimentAnalysis.overall.trend === "improving" ? "default" : "secondary"}>
                      {analysis.sentimentAnalysis.overall.trend === "improving" ? "Melhorando" : "Estável"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tons Emocionais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.sentimentAnalysis.emotionalTones.map((tone: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{tone.emotion}</span>
                        {getTrendIcon(tone.trend)}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${tone.percentage}%` }} />
                        </div>
                        <span className="text-sm text-muted-foreground w-8">{tone.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sentimento por Seção</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.sentimentAnalysis.bySection.map((section: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{section.section}</span>
                      <div className="flex gap-2 text-xs">
                        <span className="text-green-600">{section.positive}%</span>
                        <span className="text-gray-600">{section.neutral}%</span>
                        <span className="text-red-600">{section.negative}%</span>
                      </div>
                    </div>
                    <div className="flex h-2 rounded-full overflow-hidden">
                      <div className="bg-green-500" style={{ width: `${section.positive}%` }} />
                      <div className="bg-gray-400" style={{ width: `${section.neutral}%` }} />
                      <div className="bg-red-500" style={{ width: `${section.negative}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {analysis.topicClusters.map((topic: any, index: number) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{topic.topic}</h4>
                      <Badge className={getPriorityColor(topic.urgency)}>
                        {topic.urgency === "high" ? "Alta Urgência" : "Média Urgência"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{topic.contributions} contribuições</span>
                      <span>•</span>
                      <span>
                        Sentimento:{" "}
                        {topic.avgSentiment > 0 ? "Positivo" : topic.avgSentiment < 0 ? "Negativo" : "Neutro"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {topic.keywords.map((keyword: string) => (
                        <Badge key={keyword} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Intensidade do Sentimento</span>
                        <span>{Math.abs(topic.avgSentiment * 100).toFixed(0)}%</span>
                      </div>
                      <Progress
                        value={Math.abs(topic.avgSentiment * 100)}
                        className={`h-2 mt-1 ${topic.avgSentiment < 0 ? "[&>div]:bg-red-500" : "[&>div]:bg-green-500"}`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          {analysis.actionableRecommendations.map((rec: any, index: number) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{rec.title}</h4>
                        <Badge className={getPriorityColor(rec.priority)}>
                          {rec.priority === "critical" ? "Crítico" : rec.priority === "high" ? "Alto" : "Médio"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>

                      <div className="grid gap-2 md:grid-cols-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span>Esforço: {rec.estimatedEffort}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-green-500" />
                          <span>Impacto: {rec.expectedImpact}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm">
                      <Zap className="h-4 w-4 mr-2" />
                      Implementar
                    </Button>
                  </div>

                  <div className="border-t pt-3">
                    <p className="text-sm font-medium mb-2">Ações Sugeridas:</p>
                    <ul className="space-y-1">
                      {rec.suggestedActions.map((action: string, actionIndex: number) => (
                        <li key={actionIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Previsões
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Contribuições na Próxima Semana</span>
                      <Badge variant="outline">
                        {analysis.predictions.nextWeekContributions.confidence}% confiança
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {analysis.predictions.nextWeekContributions.estimated}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Fatores: {analysis.predictions.nextWeekContributions.factors.join(", ")}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Tendência de Qualidade</span>
                      <Badge variant="outline">{analysis.predictions.qualityTrend.confidence}% confiança</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium text-green-600">Melhorando</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {analysis.predictions.qualityTrend.factors.join(", ")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Alertas Preditivos
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analysis.predictions.potentialIssues.map((issue: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{issue.issue}</span>
                      <Badge variant="destructive">{issue.probability}%</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">Prazo: {issue.timeframe}</div>
                    <div className="text-xs bg-yellow-50 text-yellow-800 p-2 rounded">
                      <strong>Mitigação:</strong> {issue.mitigation}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Métricas Comparativas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-3">vs. Documento Anterior</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Contribuições</span>
                      <span className="text-green-600">
                        +{analysis.comparisonMetrics.vsLastDocument.contributionsChange}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Qualidade</span>
                      <span className="text-green-600">
                        +{analysis.comparisonMetrics.vsLastDocument.qualityChange}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tempo de Resolução</span>
                      <span className="text-green-600">
                        {analysis.comparisonMetrics.vsLastDocument.resolutionTimeChange}%
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">vs. Benchmark da Indústria</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Engajamento</span>
                      <span className="text-green-600">
                        {analysis.comparisonMetrics.vsBenchmark.engagementScore}/100
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Satisfação</span>
                      <span className="text-green-600">
                        {analysis.comparisonMetrics.vsBenchmark.satisfactionScore}/100
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxa de Conclusão</span>
                      <span className="text-green-600">{analysis.comparisonMetrics.vsBenchmark.completionRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
