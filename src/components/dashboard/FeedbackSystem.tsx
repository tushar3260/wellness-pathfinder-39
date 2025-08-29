import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Send, 
  User,
  Calendar,
  Lightbulb,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface FeedbackItem {
  id: string;
  type: "session" | "therapist" | "platform" | "suggestion";
  title: string;
  content: string;
  date: string;
  rating?: number;
  status: "pending" | "reviewed" | "implemented";
  therapist?: string;
  session?: string;
}

const mockFeedback: FeedbackItem[] = [
  {
    id: "1",
    type: "session",
    title: "Physical Therapy Session Feedback",
    content: "The session was very helpful. The exercises were challenging but manageable.",
    date: "2024-01-14",
    rating: 5,
    status: "reviewed",
    therapist: "Dr. Sarah Johnson",
    session: "PT Session #17"
  },
  {
    id: "2",
    type: "platform",
    title: "App Navigation Improvement",
    content: "It would be great to have a dark mode option for the dashboard.",
    date: "2024-01-12",
    status: "pending"
  },
  {
    id: "3",
    type: "therapist",
    title: "Therapist Review",
    content: "Dr. Chen is very understanding and provides excellent guidance.",
    date: "2024-01-10",
    rating: 5,
    status: "reviewed",
    therapist: "Dr. Michael Chen"
  }
];

export function FeedbackSystem() {
  const [selectedTab, setSelectedTab] = useState("submit");
  const [feedbackType, setFeedbackType] = useState("session");
  const [rating, setRating] = useState(0);
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning text-warning-foreground";
      case "reviewed":
        return "bg-info text-info-foreground";
      case "implemented":
        return "bg-success text-success-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "session":
        return <Calendar className="h-4 w-4" />;
      case "therapist":
        return <User className="h-4 w-4" />;
      case "platform":
        return <MessageSquare className="h-4 w-4" />;
      case "suggestion":
        return <Lightbulb className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const handleSubmitFeedback = () => {
    toast({
      title: "Feedback Submitted",
      description: "This feature will be available once Supabase is connected for data storage.",
    });
  };

  const renderStarRating = (currentRating: number, interactive: boolean = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= currentRating 
                ? "fill-warning text-warning" 
                : "text-muted-foreground"
            } ${interactive ? "cursor-pointer hover:text-warning" : ""}`}
            onClick={interactive ? () => setRating(star) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Feedback System</h1>
        <p className="text-muted-foreground">Share your experience and help us improve your therapy journey</p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="submit">Submit Feedback</TabsTrigger>
          <TabsTrigger value="history">Feedback History</TabsTrigger>
        </TabsList>

        <TabsContent value="submit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Share Your Feedback</CardTitle>
              <CardDescription>Help us improve your therapy experience by sharing your thoughts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="feedback-type">Feedback Type</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { value: "session", label: "Session Review", icon: Calendar },
                    { value: "therapist", label: "Therapist Review", icon: User },
                    { value: "platform", label: "App Feedback", icon: MessageSquare },
                    { value: "suggestion", label: "Suggestion", icon: Lightbulb }
                  ].map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <Button
                        key={type.value}
                        variant={feedbackType === type.value ? "default" : "outline"}
                        className="flex flex-col gap-2 h-auto p-4"
                        onClick={() => setFeedbackType(type.value)}
                      >
                        <IconComponent className="h-5 w-5" />
                        <span className="text-xs">{type.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {(feedbackType === "session" || feedbackType === "therapist") && (
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex items-center gap-4">
                    {renderStarRating(rating, true)}
                    <span className="text-sm text-muted-foreground">
                      {rating > 0 ? `${rating}/5 stars` : "Click to rate"}
                    </span>
                  </div>
                </div>
              )}

              {feedbackType === "session" && (
                <div className="space-y-2">
                  <Label htmlFor="session-select">Select Session</Label>
                  <Input id="session-select" placeholder="Choose a recent session" />
                </div>
              )}

              {feedbackType === "therapist" && (
                <div className="space-y-2">
                  <Label htmlFor="therapist-select">Select Therapist</Label>
                  <Input id="therapist-select" placeholder="Choose a therapist" />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="feedback-title">Title</Label>
                <Input id="feedback-title" placeholder="Brief summary of your feedback" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback-content">Your Feedback</Label>
                <Textarea 
                  id="feedback-content" 
                  placeholder="Share your detailed thoughts, suggestions, or concerns..."
                  className="min-h-24"
                />
              </div>

              <Button onClick={handleSubmitFeedback} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Submit Feedback
              </Button>
            </CardContent>
          </Card>

          {/* Quick Feedback Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:shadow-md cursor-pointer" onClick={handleSubmitFeedback}>
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="p-2 bg-success/10 rounded-lg">
                  <ThumbsUp className="h-6 w-6 text-success" />
                </div>
                <div>
                  <h3 className="font-medium">Quick Positive Feedback</h3>
                  <p className="text-sm text-muted-foreground">Had a great session today</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md cursor-pointer" onClick={handleSubmitFeedback}>
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <h3 className="font-medium">Report an Issue</h3>
                  <p className="text-sm text-muted-foreground">Something needs attention</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Feedback History</CardTitle>
              <CardDescription>Track your submitted feedback and responses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockFeedback.map((feedback) => (
                <div key={feedback.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-1 bg-muted rounded">
                        {getTypeIcon(feedback.type)}
                      </div>
                      <div>
                        <h3 className="font-medium">{feedback.title}</h3>
                        <p className="text-sm text-muted-foreground">{feedback.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {feedback.rating && renderStarRating(feedback.rating)}
                      <Badge className={getStatusColor(feedback.status)}>
                        {feedback.status}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm">{feedback.content}</p>

                  {(feedback.therapist || feedback.session) && (
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      {feedback.therapist && (
                        <span>Therapist: {feedback.therapist}</span>
                      )}
                      {feedback.session && (
                        <span>Session: {feedback.session}</span>
                      )}
                    </div>
                  )}

                  {feedback.status === "implemented" && (
                    <div className="flex items-center gap-2 text-sm text-success">
                      <CheckCircle className="h-4 w-4" />
                      <span>Thank you! Your feedback has been implemented.</span>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}