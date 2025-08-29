import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Star, Trophy, Medal, Target, Zap, Heart, Brain } from "lucide-react";

interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: "therapy" | "consistency" | "milestone" | "special";
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  requirement: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const badges: BadgeData[] = [
  {
    id: "1",
    name: "First Step",
    description: "Complete your first therapy session",
    icon: Award,
    category: "milestone",
    earned: true,
    earnedDate: "2024-01-10",
    requirement: "Complete 1 therapy session",
    rarity: "common"
  },
  {
    id: "2",
    name: "Consistency Champion",
    description: "Attend 5 consecutive sessions without missing",
    icon: Star,
    category: "consistency",
    earned: true,
    earnedDate: "2024-01-20",
    requirement: "5 consecutive sessions",
    rarity: "rare"
  },
  {
    id: "3",
    name: "Progress Pioneer",
    description: "Achieve 50% progress in any therapy type",
    icon: Trophy,
    category: "milestone",
    earned: true,
    earnedDate: "2024-01-15",
    requirement: "50% progress milestone",
    rarity: "common"
  },
  {
    id: "4",
    name: "Wellness Warrior",
    description: "Complete 10 mental health sessions",
    icon: Brain,
    category: "therapy",
    earned: false,
    progress: 70,
    requirement: "Complete 10 mental health sessions",
    rarity: "rare"
  },
  {
    id: "5",
    name: "Strength Builder",
    description: "Complete 15 physical therapy sessions",
    icon: Zap,
    category: "therapy",
    earned: false,
    progress: 87,
    requirement: "Complete 15 physical therapy sessions",
    rarity: "common"
  },
  {
    id: "6",
    name: "Dedication Master",
    description: "Maintain therapy schedule for 30 days",
    icon: Medal,
    category: "consistency",
    earned: false,
    progress: 60,
    requirement: "30 days of consistent therapy",
    rarity: "epic"
  },
  {
    id: "7",
    name: "Health Hero",
    description: "Upload health data for 20 consecutive days",
    icon: Heart,
    category: "special",
    earned: false,
    progress: 45,
    requirement: "20 days of health data uploads",
    rarity: "rare"
  },
  {
    id: "8",
    name: "Goal Crusher",
    description: "Complete all assigned therapy goals",
    icon: Target,
    category: "milestone",
    earned: false,
    progress: 75,
    requirement: "Complete all therapy goals",
    rarity: "legendary"
  }
];

export function BadgeSystem() {
  const earnedBadges = badges.filter(badge => badge.earned);
  const inProgressBadges = badges.filter(badge => !badge.earned && badge.progress);
  const lockedBadges = badges.filter(badge => !badge.earned && !badge.progress);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-l-4 border-l-muted";
      case "rare":
        return "border-l-4 border-l-info";
      case "epic":
        return "border-l-4 border-l-warning";
      case "legendary":
        return "border-l-4 border-l-destructive";
      default:
        return "border-l-4 border-l-secondary";
    }
  };

  const getRarityBadge = (rarity: string) => {
    const colors = {
      common: "bg-muted text-muted-foreground",
      rare: "bg-info text-info-foreground", 
      epic: "bg-warning text-warning-foreground",
      legendary: "bg-destructive text-destructive-foreground"
    };
    return colors[rarity as keyof typeof colors] || colors.common;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "therapy":
        return <Award className="h-4 w-4" />;
      case "consistency":
        return <Star className="h-4 w-4" />;
      case "milestone":
        return <Trophy className="h-4 w-4" />;
      case "special":
        return <Medal className="h-4 w-4" />;
      default:
        return <Award className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Achievement Badges</h1>
        <p className="text-muted-foreground">Track your accomplishments and unlock new achievements</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{earnedBadges.length}</div>
            <p className="text-xs text-muted-foreground">Out of {badges.length} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />  
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressBadges.length}</div>
            <p className="text-xs text-muted-foreground">Almost there!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((earnedBadges.length / badges.length) * 100)}%</div>
            <p className="text-xs text-muted-foreground">Overall progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rare Badges</CardTitle>
            <Medal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {earnedBadges.filter(b => b.rarity === "rare" || b.rarity === "epic" || b.rarity === "legendary").length}
            </div>
            <p className="text-xs text-muted-foreground">Special achievements</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="earned" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="earned">Earned ({earnedBadges.length})</TabsTrigger>
          <TabsTrigger value="progress">In Progress ({inProgressBadges.length})</TabsTrigger>
          <TabsTrigger value="locked">Locked ({lockedBadges.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="earned" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnedBadges.map((badge) => {
              const IconComponent = badge.icon;
              return (
                <Card key={badge.id} className={`${getRarityColor(badge.rarity)} bg-success/5`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-success/10">
                          <IconComponent className="h-6 w-6 text-success" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{badge.name}</CardTitle>
                          <Badge className={getRarityBadge(badge.rarity)} variant="secondary">
                            {badge.rarity}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Earned: {badge.earnedDate}</span>
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(badge.category)}
                        <span className="capitalize">{badge.category}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inProgressBadges.map((badge) => {
              const IconComponent = badge.icon;
              return (
                <Card key={badge.id} className={getRarityColor(badge.rarity)}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-warning/10">
                        <IconComponent className="h-6 w-6 text-warning" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{badge.name}</CardTitle>
                        <Badge className={getRarityBadge(badge.rarity)} variant="secondary">
                          {badge.rarity}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">{badge.progress}%</span>
                      </div>
                      <Progress value={badge.progress} className="h-2" />
                    </div>
                    <p className="text-xs text-muted-foreground">{badge.requirement}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="locked" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedBadges.map((badge) => {
              const IconComponent = badge.icon;
              return (
                <Card key={badge.id} className={`${getRarityColor(badge.rarity)} opacity-60`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted/10">
                        <IconComponent className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-muted-foreground">{badge.name}</CardTitle>
                        <Badge className={getRarityBadge(badge.rarity)} variant="secondary">
                          {badge.rarity}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>
                    <p className="text-xs text-muted-foreground">{badge.requirement}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}