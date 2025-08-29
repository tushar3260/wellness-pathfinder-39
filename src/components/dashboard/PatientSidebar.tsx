import { 
  Home, 
  Calendar, 
  Activity, 
  TrendingUp, 
  Award, 
  Upload, 
  MessageSquare,
  User
} from "lucide-react";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type DashboardSection = 
  | "overview"
  | "appointments" 
  | "therapy"
  | "progress"
  | "badges"
  | "health-data"
  | "feedback";

interface PatientSidebarProps {
  activeSection: DashboardSection;
  setActiveSection: (section: DashboardSection) => void;
}

const navigationItems = [
  { 
    section: "overview" as const, 
    title: "Dashboard", 
    icon: Home 
  },
  { 
    section: "appointments" as const, 
    title: "Appointments", 
    icon: Calendar 
  },
  { 
    section: "therapy" as const, 
    title: "Therapy Selection", 
    icon: Activity 
  },
  { 
    section: "progress" as const, 
    title: "Progress Tracking", 
    icon: TrendingUp 
  },
  { 
    section: "badges" as const, 
    title: "Achievements", 
    icon: Award 
  },
  { 
    section: "health-data" as const, 
    title: "Health Data", 
    icon: Upload 
  },
  { 
    section: "feedback" as const, 
    title: "Feedback", 
    icon: MessageSquare 
  },
];

export function PatientSidebar({ activeSection, setActiveSection }: PatientSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div>
              <h2 className="font-semibold text-sm">Patient Portal</h2>
              <p className="text-xs text-muted-foreground">Welcome back!</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.section}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.section)}
                    className={`w-full justify-start ${
                      activeSection === item.section 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-accent"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}