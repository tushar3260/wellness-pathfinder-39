import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Brain, Hand, MessageCircle, Play, Pause, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TherapyType {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  duration: string;
  progress: number;
  status: "active" | "completed" | "available";
  sessions: number;
  totalSessions: number;
}

const therapyTypes: TherapyType[] = [
  {
    id: "1",
    name: "Physical Therapy",
    description: "Improve mobility, strength, and physical function through targeted exercises and treatments.",
    icon: Activity,
    color: "therapy-physical",
    duration: "8-12 weeks",
    progress: 85,
    status: "active",
    sessions: 17,
    totalSessions: 20
  },
  {
    id: "2", 
    name: "Mental Health Therapy",
    description: "Address emotional wellness, stress management, and psychological health through counseling.",
    icon: Brain,
    color: "therapy-mental",
    duration: "12-16 weeks", 
    progress: 72,
    status: "active",
    sessions: 9,
    totalSessions: 12
  },
  {
    id: "3",
    name: "Occupational Therapy", 
    description: "Develop daily living skills and adapt to physical or cognitive challenges.",
    icon: Hand,
    color: "therapy-occupational",
    duration: "6-10 weeks",
    progress: 68,
    status: "active", 
    sessions: 7,
    totalSessions: 10
  },
  {
    id: "4",
    name: "Speech Therapy",
    description: "Improve communication skills, speech clarity, and language development.",
    icon: MessageCircle,
    color: "therapy-speech", 
    duration: "10-14 weeks",
    progress: 0,
    status: "available",
    sessions: 0,
    totalSessions: 12
  }
];

export function TherapySelection() {
  const [selectedTherapies, setSelectedTherapies] = useState<string[]>(["1", "2", "3"]);
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "completed":
        return "bg-info text-info-foreground";
      case "available":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleTherapyToggle = (therapyId: string) => {
    toast({
      title: "Therapy Selection",
      description: "This feature will be available once Supabase is connected for data storage.",
    });
  };

  const handleStartSession = (therapyId: string) => {
    toast({
      title: "Start Therapy Session",
      description: "This feature will be available once Supabase is connected.",
    });
  };

  const handleViewProgress = (therapyId: string) => {
    toast({
      title: "View Progress",
      description: "Detailed progress tracking will be available once Supabase is connected.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Therapy Selection</h1>
        <p className="text-muted-foreground">Choose and manage your therapy programs</p>
      </div>

      {/* AI Recommendation */}
      <Card className="border-l-4 border-l-info bg-info/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-info" />
            AI Therapy Recommendation
          </CardTitle>
          <CardDescription>
            Based on your progress and health data, we recommend adding Speech Therapy to complement your current program
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Speech Therapy Program</p>
              <p className="text-sm text-muted-foreground">Focuses on communication enhancement and clarity</p>
            </div>
            <Button variant="outline" onClick={() => handleTherapyToggle("4")}>
              Add to Program
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Therapy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {therapyTypes.map((therapy) => {
          const IconComponent = therapy.icon;
          const isSelected = selectedTherapies.includes(therapy.id);
          
          return (
            <Card key={therapy.id} className={`relative ${isSelected ? 'ring-2 ring-primary' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${therapy.color}/10`}>
                      <IconComponent className={`h-6 w-6 text-${therapy.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{therapy.name}</CardTitle>
                      <Badge className={getStatusColor(therapy.status)}>
                        {therapy.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="mt-2">
                  {therapy.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Duration: {therapy.duration}</span>
                  <span>Sessions: {therapy.sessions}/{therapy.totalSessions}</span>
                </div>
                
                {therapy.status !== "available" && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">{therapy.progress}%</span>
                    </div>
                    <Progress value={therapy.progress} className="h-2" />
                  </div>
                )}
                
                <div className="flex gap-2">
                  {therapy.status === "available" ? (
                    <Button 
                      className="flex-1" 
                      onClick={() => handleTherapyToggle(therapy.id)}
                    >
                      Start Program
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleStartSession(therapy.id)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        New Session
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => handleViewProgress(therapy.id)}
                      >
                        View Progress
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your therapy programs efficiently</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => handleStartSession("1")}>
            <Play className="h-4 w-4" />
            Start Today's Session
          </Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={() => handleViewProgress("all")}>
            <Activity className="h-4 w-4" />
            View All Progress
          </Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={() => handleTherapyToggle("new")}>
            <CheckCircle className="h-4 w-4" />
            Request New Therapy
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}