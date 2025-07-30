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
  User,
  MessageSquare,
  FileText,
  ThumbsUp,
  Clock,
  Bell,
  Star,
  CheckCircle,
  ArrowRight,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";

// Dados simulados para a visão do Participante
const participantStats = {
  totalContributions: 15,
  activeDocuments: 4,
  totalLikesReceived: 28,
  pendingReviews: 2,
};

const myRecentContributions = [
  {
    id: "C1",
    document: "Política de Privacidade v2.0",
    title: "Clarificar coleta de dados",
    status: "Em Análise",
    lastActivity: "1 hora atrás",
    likes: 5,
  },
  {
    id: "C2",
    document: "Manual do Utilizador v3.1",
    title: "Sugestão de exemplo prático",
    status: "Resolvido",
    lastActivity: "3 dias atrás",
    likes: 8,
  },
  {
    id: "C3",
    document: "Termos de Uso Atualizados",
    title: "Pergunta sobre cláusula 4.2",
    status: "Aberto",
    lastActivity: "1 dia atrás",
    likes: 2,
  },
];

const documentsFollowing = [
  {
    id: "D1",
    title: "Política de Privacidade v2.0",
    myContributions: 3,
    totalContributions: 23,
    status: "Ativo",
    lastUpdate: "2 horas atrás",
  },
  {
    id: "D2",
    title: "Termos de Uso Atualizados",
    myContributions: 1,
    totalContributions: 18,
    status: "Em Revisão",
    lastUpdate: "1 dia atrás",
  },
];

const recentNotifications = [
  {
    id: "N1",
    type: "reply",
    message:
      "Sua contribuição 'Clarificar coleta de dados' recebeu uma resposta.",
    link: "/documents/1/contributions/C1/insights",
    time: "30 minutos atrás",
  },
  {
    id: "N2",
    type: "like",
    message:
      "Sua contribuição 'Sugestão de exemplo prático' foi curtida por Maria S.",
    link: "/documents/3/contributions/C2/insights",
    time: "2 horas atrás",
  },
  {
    id: "N3",
    type: "status_update",
    message: "O documento 'Política de Privacidade v2.0' foi atualizado.",
    link: "/documents/1",
    time: "1 dia atrás",
  },
];

export default function ParticipantDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <User className="h-7 w-7" />
          Dashboard do Participante
        </h2>
        <Button asChild>
          <Link href="/contribute">
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Nova Contribuição
          </Link>
        </Button>
      </div>
      <p className="text-muted-foreground">
        Suas contribuições e documentos monitorados
      </p>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Minhas Contribuições
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {participantStats.totalContributions}
            </div>
            <p className="text-xs text-muted-foreground">Total enviadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Documentos Ativos
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {participantStats.activeDocuments}
            </div>
            <p className="text-xs text-muted-foreground">Que estou seguindo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Curtidas Recebidas
            </CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {participantStats.totalLikesReceived}
            </div>
            <p className="text-xs text-muted-foreground">
              Em minhas contribuições
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Revisões Pendentes
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {participantStats.pendingReviews}
            </div>
            <p className="text-xs text-muted-foreground">
              Minhas contribuições
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* My Recent Contributions */}
        <Card>
          <CardHeader>
            <CardTitle>Minhas Contribuições Recentes</CardTitle>
            <CardDescription>
              Status e atividade das suas últimas contribuições
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {myRecentContributions.map((contrib) => (
              <div
                key={contrib.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="space-y-1">
                  <p className="font-medium">{contrib.title}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-3 w-3" />
                    {contrib.document}
                    <span>•</span>
                    <ThumbsUp className="h-3 w-3" />
                    {contrib.likes}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      contrib.status === "Resolvido" ? "default" : "secondary"
                    }
                  >
                    {contrib.status}
                  </Badge>
                  <Button asChild size="sm" variant="outline">
                    <Link
                      href={`/documents/1/contributions/${contrib.id}/insights`}
                    >
                      Ver
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Documents I'm Following */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Documentos que Sigo
            </CardTitle>
            <CardDescription>
              Documentos com atualizações e minhas contribuições
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {documentsFollowing.map((doc, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 border rounded-lg"
              >
                <div className="mt-1">
                  <FileText className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">{doc.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Suas contribuições: {doc.myContributions} • Total:{" "}
                    {doc.totalContributions}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="outline">{doc.status}</Badge>
                    <span className="text-muted-foreground">
                      Última atualização: {doc.lastUpdate}
                    </span>
                  </div>
                </div>
                <Button asChild size="sm" variant="ghost">
                  <Link href={`/documents/${doc.id}`}>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificações Recentes
          </CardTitle>
          <CardDescription>
            Atualizações sobre suas atividades e documentos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentNotifications.map((notification, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 border rounded-lg"
            >
              <div className="mt-1">
                {notification.type === "reply" && (
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                )}
                {notification.type === "like" && (
                  <ThumbsUp className="h-4 w-4 text-green-500" />
                )}
                {notification.type === "status_update" && (
                  <CheckCircle className="h-4 w-4 text-purple-500" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium text-sm">{notification.message}</p>
                <p className="text-xs text-muted-foreground">
                  {notification.time}
                </p>
              </div>
              <Button asChild size="sm" variant="ghost">
                <Link href={notification.link}>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
