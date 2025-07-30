import { FileText, Home, Upload, Users, BarChart3, Settings, Gavel, User } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import Link from "next/link"

const menuItems = [
  {
    title: "Dashboard Geral",
    url: "/",
    icon: Home,
  },
  {
    title: "Documentos",
    url: "/documents",
    icon: FileText,
  },
  {
    title: "Upload (Admin)",
    url: "/admin",
    icon: Upload,
  },
  {
    title: "Usuários",
    url: "/users",
    icon: Users,
  },
  {
    title: "Relatórios",
    url: "/reports",
    icon: BarChart3,
  },
]

// Novos itens de menu para as visões de perfil
const profileViews = [
  {
    title: "Visão do Regulador",
    url: "/regulator",
    icon: Gavel,
  },
  {
    title: "Visão do Participante",
    url: "/participant",
    icon: User,
  },
]

const documents = [
  { id: "1", title: "Política de Privacidade", contributions: 12 },
  { id: "2", title: "Termos de Uso", contributions: 8 },
  { id: "3", title: "Manual do Usuário", contributions: 15 },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <FileText className="h-6 w-6" />
          <span className="font-semibold">ContribDocs</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Visões de Perfil</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {profileViews.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Documentos Recentes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {documents.map((doc) => (
                <SidebarMenuItem key={doc.id}>
                  <SidebarMenuButton asChild>
                    <Link href={`/documents/${doc.id}`}>
                      <FileText className="h-4 w-4" />
                      <span className="truncate">{doc.title}</span>
                      <span className="ml-auto text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {doc.contributions}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <Settings />
                <span>Configurações</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
