import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Heart, 
  Activity, 
  Scale, 
  Thermometer, 
  Calendar,
  TrendingUp,
  FileText,
  Camera,
  Smartphone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HealthMetric {
  id: string;
  name: string;
  value: string;
  unit: string;
  date: string;
  icon: React.ComponentType<any>;
  status: "normal" | "high" | "low" | "critical";
}

const mockHealthData: HealthMetric[] = [
  {
    id: "1",
    name: "Blood Pressure",
    value: "120/80",
    unit: "mmHg",
    date: "2024-01-14",
    icon: Heart,
    status: "normal"
  },
  {
    id: "2", 
    name: "Heart Rate",
    value: "72",
    unit: "bpm",
    date: "2024-01-14", 
    icon: Activity,
    status: "normal"
  },
  {
    id: "3",
    name: "Weight",
    value: "68.5",
    unit: "kg",
    date: "2024-01-13",
    icon: Scale,
    status: "normal"
  },
  {
    id: "4",
    name: "Body Temperature", 
    value: "98.6",
    unit: "°F",
    date: "2024-01-14",
    icon: Thermometer,
    status: "normal"
  }
];

export function HealthDataUpload() {
  const [selectedTab, setSelectedTab] = useState("manual");
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-success text-success-foreground";
      case "high":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-info text-info-foreground";
      case "critical":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const handleManualUpload = () => {
    toast({
      title: "Health Data Upload",
      description: "This feature will be available once Supabase is connected for secure data storage.",
    });
  };

  const handleFileUpload = () => {
    toast({
      title: "File Upload",
      description: "File upload and storage will be available once Supabase is connected.",
    });
  };

  const handleDeviceSync = () => {
    toast({
      title: "Device Synchronization",
      description: "Device integration will be available once backend services are connected.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Health Data Upload</h1>
        <p className="text-muted-foreground">Track and upload your health metrics and medical records</p>
      </div>

      {/* Upload Progress */}
      <Card className="border-l-4 border-l-success">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-success" />
            Weekly Upload Goal
          </CardTitle>
          <CardDescription>Keep your health data up to date for better therapy insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress this week</span>
              <span className="text-sm text-muted-foreground">5/7 days</span>
            </div>
            <Progress value={71} className="h-2" />
            <p className="text-xs text-muted-foreground">2 more uploads to reach your weekly goal!</p>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="upload">File Upload</TabsTrigger>
          <TabsTrigger value="sync">Device Sync</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enter Health Metrics</CardTitle>
              <CardDescription>Manually input your daily health measurements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="blood-pressure">Blood Pressure (mmHg)</Label>
                  <Input id="blood-pressure" placeholder="120/80" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heart-rate">Heart Rate (bpm)</Label>
                  <Input id="heart-rate" placeholder="72" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg/lbs)</Label>
                  <Input id="weight" placeholder="68.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature (°F/°C)</Label>
                  <Input id="temperature" placeholder="98.6" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pain-level">Pain Level (1-10)</Label>
                  <Input id="pain-level" placeholder="3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mood">Mood Score (1-10)</Label>
                  <Input id="mood" placeholder="7" />
                </div>
              </div>
              <Button onClick={handleManualUpload} className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Save Health Data
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Medical Files</CardTitle>
              <CardDescription>Upload lab results, medical reports, and other health documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-dashed border-2 hover:border-primary/50 cursor-pointer" onClick={handleFileUpload}>
                  <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                    <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="font-medium">Lab Results</h3>
                    <p className="text-sm text-muted-foreground">Upload blood tests, X-rays, MRIs</p>
                  </CardContent>
                </Card>
                
                <Card className="border-dashed border-2 hover:border-primary/50 cursor-pointer" onClick={handleFileUpload}>
                  <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                    <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="font-medium">Progress Photos</h3>
                    <p className="text-sm text-muted-foreground">Track visual progress over time</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="border-dashed border-2 border-muted p-8 text-center hover:border-primary/50 cursor-pointer" onClick={handleFileUpload}>
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">Drag and drop files here</h3>
                <p className="text-sm text-muted-foreground mb-4">or click to browse and select files</p>
                <p className="text-xs text-muted-foreground">Supports: PDF, JPG, PNG, DICOM files (Max 10MB)</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connect Health Devices</CardTitle>
              <CardDescription>Automatically sync data from your wearables and health apps</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="hover:shadow-md cursor-pointer" onClick={handleDeviceSync}>
                  <CardContent className="flex items-center gap-4 pt-6">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Smartphone className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Apple Health</h3>
                      <p className="text-sm text-muted-foreground">Sync iPhone health data</p>
                    </div>
                    <Badge variant="outline">Connect</Badge>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md cursor-pointer" onClick={handleDeviceSync}>
                  <CardContent className="flex items-center gap-4 pt-6">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <Activity className="h-6 w-6 text-success" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Fitbit</h3>
                      <p className="text-sm text-muted-foreground">Activity and heart rate data</p>
                    </div>
                    <Badge variant="outline">Connect</Badge>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md cursor-pointer" onClick={handleDeviceSync}>
                  <CardContent className="flex items-center gap-4 pt-6">
                    <div className="p-2 bg-info/10 rounded-lg">
                      <Heart className="h-6 w-6 text-info" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Samsung Health</h3>
                      <p className="text-sm text-muted-foreground">Comprehensive health metrics</p>
                    </div>
                    <Badge variant="outline">Connect</Badge>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md cursor-pointer" onClick={handleDeviceSync}>
                  <CardContent className="flex items-center gap-4 pt-6">
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <Scale className="h-6 w-6 text-warning" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Smart Scale</h3>
                      <p className="text-sm text-muted-foreground">Weight and body composition</p>
                    </div>
                    <Badge variant="outline">Connect</Badge>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Health Data */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Health Data</CardTitle>
          <CardDescription>Your latest uploaded health metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockHealthData.map((metric) => {
              const IconComponent = metric.icon;
              return (
                <Card key={metric.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <IconComponent className="h-5 w-5 text-muted-foreground" />
                      <Badge className={getStatusColor(metric.status)} variant="secondary">
                        {metric.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.name}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className="text-xs text-muted-foreground">
                        {metric.unit} • {metric.date}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}