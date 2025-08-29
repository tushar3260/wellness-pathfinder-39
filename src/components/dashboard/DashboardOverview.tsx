import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Activity, TrendingUp, Award, Clock, CheckCircle } from "lucide-react";

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Track your health journey and appointments</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Today</div>
            <p className="text-xs text-muted-foreground">Physical Therapy at 2:00 PM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Therapies</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Physical, Mental, Occupational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 new this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your latest therapy sessions and progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="bg-therapy-physical/10 p-2 rounded-full">
                <CheckCircle className="h-4 w-4 text-therapy-physical" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Physical Therapy Session</p>
                <p className="text-xs text-muted-foreground">Completed 2 hours ago</p>
              </div>
              <Badge variant="secondary">Completed</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-therapy-mental/10 p-2 rounded-full">
                <Clock className="h-4 w-4 text-therapy-mental" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Mental Health Check-in</p>
                <p className="text-xs text-muted-foreground">Scheduled for tomorrow</p>
              </div>
              <Badge variant="outline">Upcoming</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-therapy-occupational/10 p-2 rounded-full">
                <Award className="h-4 w-4 text-therapy-occupational" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Milestone Achievement</p>
                <p className="text-xs text-muted-foreground">Earned "Consistency Champion" badge</p>
              </div>
              <Badge className="bg-success text-success-foreground">New!</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Therapy Progress</CardTitle>
            <CardDescription>Your progress across different therapy types</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Physical Therapy</span>
                <span className="text-sm text-muted-foreground">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Mental Health</span>
                <span className="text-sm text-muted-foreground">72%</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Occupational Therapy</span>
                <span className="text-sm text-muted-foreground">68%</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}