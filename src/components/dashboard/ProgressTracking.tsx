import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Activity, Calendar, Target, Award } from "lucide-react";

const progressData = {
  overall: {
    score: 78,
    change: +12,
    trend: "up"
  },
  therapies: [
    {
      name: "Physical Therapy",
      progress: 85,
      change: +8,
      trend: "up",
      color: "therapy-physical",
      sessions: 17,
      goals: 3,
      achievements: 5
    },
    {
      name: "Mental Health",
      progress: 72,
      change: +15,
      trend: "up", 
      color: "therapy-mental",
      sessions: 9,
      goals: 2,
      achievements: 3
    },
    {
      name: "Occupational Therapy",
      progress: 68,
      change: -3,
      trend: "down",
      color: "therapy-occupational", 
      sessions: 7,
      goals: 4,
      achievements: 2
    }
  ],
  goals: [
    {
      id: "1",
      title: "Complete 20 PT sessions",
      progress: 85,
      deadline: "2024-02-15",
      status: "on-track"
    },
    {
      id: "2", 
      title: "Improve mobility score by 25%",
      progress: 68,
      deadline: "2024-02-28",
      status: "at-risk"
    },
    {
      id: "3",
      title: "Reduce anxiety levels",
      progress: 78,
      deadline: "2024-02-20",
      status: "on-track"
    }
  ],
  milestones: [
    {
      date: "2024-01-10",
      title: "First Physical Therapy Session",
      type: "session",
      completed: true
    },
    {
      date: "2024-01-15",
      title: "Completed Initial Assessment",
      type: "assessment", 
      completed: true
    },
    {
      date: "2024-01-20",
      title: "Reached 50% Progress Milestone",
      type: "milestone",
      completed: true
    },
    {
      date: "2024-01-25",
      title: "Mid-Program Evaluation",
      type: "evaluation",
      completed: false
    }
  ]
};

export function ProgressTracking() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "bg-success text-success-foreground";
      case "at-risk":
        return "bg-warning text-warning-foreground";
      case "behind":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-success" />
    ) : (
      <TrendingDown className="h-4 w-4 text-destructive" />
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Progress Tracking</h1>
        <p className="text-muted-foreground">Monitor your therapy progress and achievements</p>
      </div>

      {/* Overall Progress */}
      <Card className="border-l-4 border-l-success">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-success" />
            Overall Progress Score
          </CardTitle>
          <CardDescription>Your combined progress across all therapy programs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="text-4xl font-bold">{progressData.overall.score}%</div>
              <div className="flex items-center gap-2">
                {getTrendIcon(progressData.overall.trend)}
                <span className={`text-sm ${progressData.overall.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                  {progressData.overall.change > 0 ? '+' : ''}{progressData.overall.change}% from last month
                </span>
              </div>
            </div>
            <Progress value={progressData.overall.score} className="w-32 h-4" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="therapies" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="therapies">Therapy Progress</TabsTrigger>
          <TabsTrigger value="goals">Goals & Targets</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        <TabsContent value="therapies" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {progressData.therapies.map((therapy, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {therapy.name}
                    {getTrendIcon(therapy.trend)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">{therapy.progress}%</span>
                    </div>
                    <Progress value={therapy.progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-bold">{therapy.sessions}</div>
                      <div className="text-xs text-muted-foreground">Sessions</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{therapy.goals}</div>
                      <div className="text-xs text-muted-foreground">Goals</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{therapy.achievements}</div>
                      <div className="text-xs text-muted-foreground">Badges</div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    View Detailed Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {progressData.goals.map((goal) => (
              <Card key={goal.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Target className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">{goal.title}</h3>
                        <p className="text-sm text-muted-foreground">Due: {goal.deadline}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(goal.status)}>
                      {goal.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Achievement Timeline</CardTitle>
              <CardDescription>Track your journey and major milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {progressData.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${milestone.completed ? 'bg-success' : 'bg-muted'}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-medium ${!milestone.completed ? 'text-muted-foreground' : ''}`}>
                          {milestone.title}
                        </h4>
                        <span className="text-sm text-muted-foreground">{milestone.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground capitalize">{milestone.type}</p>
                    </div>
                    {milestone.completed && (
                      <Award className="h-4 w-4 text-success" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}