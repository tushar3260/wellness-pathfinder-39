import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PatientSidebar } from "@/components/dashboard/PatientSidebar";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { AppointmentBooking } from "@/components/dashboard/AppointmentBooking";
import { TherapySelection } from "@/components/dashboard/TherapySelection";
import { ProgressTracking } from "@/components/dashboard/ProgressTracking";
import { BadgeSystem } from "@/components/dashboard/BadgeSystem";
import { HealthDataUpload } from "@/components/dashboard/HealthDataUpload";
import { FeedbackSystem } from "@/components/dashboard/FeedbackSystem";

type DashboardSection = 
  | "overview"
  | "appointments" 
  | "therapy"
  | "progress"
  | "badges"
  | "health-data"
  | "feedback";

const PatientDashboard = () => {
  const [activeSection, setActiveSection] = useState<DashboardSection>("overview");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />;
      case "appointments":
        return <AppointmentBooking />;
      case "therapy":
        return <TherapySelection />;
      case "progress":
        return <ProgressTracking />;
      case "badges":
        return <BadgeSystem />;
      case "health-data":
        return <HealthDataUpload />;
      case "feedback":
        return <FeedbackSystem />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <PatientSidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <main className="flex-1 p-6 bg-muted/20">
          {renderActiveSection()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PatientDashboard;