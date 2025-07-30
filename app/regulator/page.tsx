import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Gavel, FileText, MessageSquare, AlertTriangle, CheckCircle, BarChart2 } from "lucide-react"
import Link from "next/link"

// Dados simulados para a visão do Regulador
const regulatorStats = {
  totalDocuments: 12,
  documentsUnderReview: 3,
  criticalAlerts: 2,
  complianceScore: 88, // %
  avgResolutionTime: "3 dias",
}

const criticalDocuments = [
  {
    id: "1",
    title: "Política de Privacidade v2.0",
    status: "Em Revisão Crítica",
    alerts: 3,
    lastActivity: "2 horas atrás",
    complianceRisk: "Alto",
  },
  {
    id: "2",
    title: "Termos de Uso Atualizados",
    status: "Em Análise",
    alerts: 1,
    lastActivity: "1 dia atrás",
    complianceRisk: "Médio",
  },
]

const recentComplianceAlerts = [
  {
    id: "A1",
    document: "Política de Privacidade v2.0",
    alert: "Seção 3.2: Ambiguidade na coleta de dados pessoais.",
    severity: "Crítica",
    date: "2024-01-20",
  },
  {
    id: "A2",
    document: "Termos de Uso Atualizados",
    alert: "Cláusula 7.1: Potencial conflito com nova regulamentação.",
    severity: "Alta",
    date: "2024-01-19",
  },
  {
    id: "A3",
    document: "Manual do Usuário v3.1",
    alert: "Linguagem técnica excessiva em seção chave.",
    severity: "Média",
    date: "2024-01-18",
  },
]

export default function RegulatorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Gavel className="h-7 w-7" />
          Dashboard do Regulador
        </h2>
        <p className="text-muted-foreground">Visão geral de conformidade e documentos sob supervisão</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documentos Monitorados</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{regulatorStats.totalDocuments}</div>
            <p className="text-xs text-muted-foreground">Total na plataforma</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Revisão</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{regulatorStats.documentsUnderReview}</div>
            <p className="text-xs text-muted-foreground">Documentos ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Críticos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{regulatorStats.criticalAlerts}</div>
            <p className="text-xs text-muted-foreground">Exigem atenção imediata</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score de Conformidade</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{regulatorStats.complianceScore}%</div>
            <p className="text-xs text-muted-foreground">Média da plataforma</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Critical Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Documentos Críticos</CardTitle>
            <CardDescription>Documentos com alto risco de conformidade ou muitos alertas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {criticalDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{doc.title}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="h-3 w-3 text-red-500" />
                    {doc.alerts} alertas
                    <span>•</span>
                    Risco: <Badge variant="destructive">{doc.complianceRisk}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{doc.status}</Badge>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/documents/${doc.id}`}>Ver</Link>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Compliance Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Alertas de Conformidade Recentes
            </CardTitle>
            <CardDescription>Problemas detectados pela IA ou usuários</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentComplianceAlerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="mt-1">
                  {alert.severity === "Crítica" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                  {alert.severity === "Alta" && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                  {alert.severity === "Média" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">{alert.alert}</p>
                  <p className="text-xs text-muted-foreground">
                    Documento: {alert.document} • Data: {alert.date}
                  </p>
                </div>
                <Badge variant={alert.severity === "Crítica" ? "destructive" : "secondary"}>{alert.severity}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Overall Compliance Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5" />
            Tendências de Conformidade
          </CardTitle>
          <CardDescription>Evolução do score de conformidade e tempo de resolução</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="font-medium mb-2">Score de Conformidade (Últimos 6 meses)</h4>
            <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-muted-foreground">
              Gráfico de Linha (simulado)
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Tempo Médio de Resolução (Últimos 6 meses)</h4>
            <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-muted-foreground">
              Gráfico de Barras (simulado)
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
