"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Search,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Calendar,
  User,
  AlertCircle,
  Lightbulb,
  Flag,
  SortAsc,
  SortDesc,
} from "lucide-react"
import Link from "next/link"

// Dados simulados
const document = {
  id: "1",
  title: "Política de Privacidade v2.0",
  totalContributions: 23,
}

const contributions = [
  {
    id: "1",
    title: "Clarificar tipos de dados coletados",
    content:
      "A seção 3.2 sobre coleta de dados precisa ser mais específica sobre quais tipos de dados pessoais são coletados. Sugiro adicionar uma lista detalhada com exemplos práticos.",
    user: {
      name: "Maria Silva",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Especialista Legal",
    },
    timestamp: "2024-01-15T14:30:00Z",
    section: "3. Uso dos Dados",
    type: "suggestion",
    priority: "high",
    likes: 8,
    dislikes: 1,
    replies: 3,
    status: "open",
  },
  {
    id: "2",
    title: "Erro de digitação na seção 5",
    content: "Encontrei um erro de digitação na seção 5.1: 'direitos do usuários' deveria ser 'direitos dos usuários'.",
    user: {
      name: "João Santos",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Revisor",
    },
    timestamp: "2024-01-15T12:15:00Z",
    section: "5. Direitos do Usuário",
    type: "correction",
    priority: "low",
    likes: 5,
    dislikes: 0,
    replies: 1,
    status: "resolved",
  },
  {
    id: "3",
    title: "Prazo de retenção muito vago",
    content:
      "O prazo de retenção de dados mencionado na seção 4.3 está muito vago. Seria melhor especificar períodos exatos para diferentes tipos de dados, conforme exigido pela LGPD.",
    user: {
      name: "Ana Costa",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Consultora LGPD",
    },
    timestamp: "2024-01-14T16:45:00Z",
    section: "4. Compartilhamento",
    type: "concern",
    priority: "critical",
    likes: 12,
    dislikes: 0,
    replies: 5,
    status: "in-review",
  },
  {
    id: "4",
    title: "Como exercer direitos na prática?",
    content:
      "A seção sobre direitos do usuário está clara teoricamente, mas falta informação sobre como exercer esses direitos na prática. Poderia incluir um passo-a-passo?",
    user: {
      name: "Carlos Oliveira",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Usuário",
    },
    timestamp: "2024-01-14T10:20:00Z",
    section: "5. Direitos do Usuário",
    type: "question",
    priority: "medium",
    likes: 6,
    dislikes: 1,
    replies: 2,
    status: "open",
  },
  {
    id: "5",
    title: "Linguagem muito técnica",
    content:
      "Algumas partes do documento usam linguagem muito técnica que pode ser difícil para usuários comuns entenderem. Sugiro simplificar a linguagem em certas seções.",
    user: {
      name: "Lucia Ferreira",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "UX Writer",
    },
    timestamp: "2024-01-13T14:10:00Z",
    section: "2. Dados Coletados",
    type: "suggestion",
    priority: "medium",
    likes: 9,
    dislikes: 2,
    replies: 4,
    status: "open",
  },
]

const typeConfig = {
  suggestion: { label: "Sugestão", icon: Lightbulb, color: "bg-blue-100 text-blue-800" },
  correction: { label: "Correção", icon: AlertCircle, color: "bg-red-100 text-red-800" },
  question: { label: "Pergunta", icon: MessageSquare, color: "bg-yellow-100 text-yellow-800" },
  concern: { label: "Preocupação", icon: Flag, color: "bg-orange-100 text-orange-800" },
}

const statusConfig = {
  open: { label: "Aberto", color: "bg-green-100 text-green-800" },
  "in-review": { label: "Em Análise", color: "bg-blue-100 text-blue-800" },
  resolved: { label: "Resolvido", color: "bg-gray-100 text-gray-800" },
}

const priorityConfig = {
  low: { label: "Baixa", color: "bg-gray-100 text-gray-800" },
  medium: { label: "Média", color: "bg-yellow-100 text-yellow-800" },
  high: { label: "Alta", color: "bg-orange-100 text-orange-800" },
  critical: { label: "Crítica", color: "bg-red-100 text-red-800" },
}

export default function ContributionsPage({ params }: { params: { id: string } }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const filteredContributions = contributions
    .filter((contrib) => {
      const matchesSearch =
        contrib.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contrib.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contrib.user.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === "all" || contrib.type === filterType
      const matchesStatus = filterStatus === "all" || contrib.status === filterStatus
      return matchesSearch && matchesType && matchesStatus
    })
    .sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "newest":
          comparison = new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          break
        case "likes":
          comparison = b.likes - a.likes
          break
        case "priority":
          const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
          comparison =
            priorityOrder[b.priority as keyof typeof priorityOrder] -
            priorityOrder[a.priority as keyof typeof priorityOrder]
          break
        default:
          comparison = 0
      }
      return sortOrder === "desc" ? comparison : -comparison
    })

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Agora mesmo"
    if (diffInHours < 24) return `${diffInHours}h atrás`
    if (diffInHours < 48) return "1 dia atrás"
    return `${Math.floor(diffInHours / 24)} dias atrás`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/documents/${params.id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Todas as Contribuições</h2>
            <p className="text-muted-foreground">
              {document.title} • {document.totalContributions} contribuições
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/documents/${params.id}/contribute`}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Nova Contribuição
          </Link>
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar contribuições..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="suggestion">Sugestões</SelectItem>
                  <SelectItem value="correction">Correções</SelectItem>
                  <SelectItem value="question">Perguntas</SelectItem>
                  <SelectItem value="concern">Preocupações</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos status</SelectItem>
                  <SelectItem value="open">Aberto</SelectItem>
                  <SelectItem value="in-review">Em Análise</SelectItem>
                  <SelectItem value="resolved">Resolvido</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Ordenar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mais recente</SelectItem>
                  <SelectItem value="likes">Mais curtidas</SelectItem>
                  <SelectItem value="priority">Prioridade</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}>
                {sortOrder === "desc" ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Mostrando {filteredContributions.length} de {contributions.length} contribuições
        </span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            {contributions.filter((c) => c.status === "open").length} Abertas
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            {contributions.filter((c) => c.status === "in-review").length} Em Análise
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            {contributions.filter((c) => c.status === "resolved").length} Resolvidas
          </span>
        </div>
      </div>

      {/* Contributions List */}
      <div className="space-y-4">
        {filteredContributions.map((contribution, index) => {
          const typeInfo = typeConfig[contribution.type as keyof typeof typeConfig]
          const statusInfo = statusConfig[contribution.status as keyof typeof statusConfig]
          const priorityInfo = priorityConfig[contribution.priority as keyof typeof priorityConfig]

          return (
            <Card key={contribution.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{contribution.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge className={typeInfo.color}>
                          <typeInfo.icon className="h-3 w-3 mr-1" />
                          {typeInfo.label}
                        </Badge>
                        <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
                        <Badge className={priorityInfo.color}>{priorityInfo.label}</Badge>
                        <Badge variant="outline">{contribution.section}</Badge>
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(contribution.timestamp)}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        ID: #{contribution.id}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground leading-relaxed">{contribution.content}</p>

                  <Separator />

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={contribution.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {contribution.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{contribution.user.name}</p>
                          <p className="text-xs text-muted-foreground">{contribution.user.role}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {contribution.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ThumbsDown className="h-3 w-3 mr-1" />
                          {contribution.dislikes}
                        </Button>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {contribution.replies} respostas
                        </span>
                      </div>
                      <Button size="sm" variant="outline">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredContributions.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhuma contribuição encontrada</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || filterType !== "all" || filterStatus !== "all"
                  ? "Tente ajustar os filtros de busca"
                  : "Seja o primeiro a contribuir com este documento"}
              </p>
              <Button asChild>
                <Link href={`/documents/${params.id}/contribute`}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Nova Contribuição
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
