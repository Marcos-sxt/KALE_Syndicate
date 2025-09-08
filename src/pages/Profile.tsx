import { useState } from "react";
import { User, Edit3, Award, Coins, TrendingUp, Calendar, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/Card";
import Badge from "@/components/Badge";
import Avatar from "@/components/Avatar";

// Mock user data
const mockUser = {
  name: "John Farmer",
  username: "@johnfarms",
  joinDate: "March 2024",
  totalHarvest: 12470,
  currentBalance: 1247.89,
  farmsOwned: 8,
  syndicateName: "Green Thumbs",
  syndicateRank: "Member",
  globalRank: 4,
  achievements: [
    { id: 1, name: "Early Adopter", icon: "🌱", description: "Joined in the first month", rarity: "legendary" },
    { id: 2, name: "Harvest Master", icon: "⚡", description: "Harvested 10,000+ KALE", rarity: "epic" },
  { id: 3, name: "Syndicate Founder", icon: "👑", description: "Founded a successful syndicate", rarity: "rare" },
    { id: 4, name: "Daily Farmer", icon: "📅", description: "30 days consecutive farming", rarity: "common" },
    { id: 5, name: "Top 10", icon: "🏆", description: "Reached top 10 global ranking", rarity: "epic" },
    { id: 6, name: "KALE Whale", icon: "🐋", description: "Hold 1000+ KALE tokens", rarity: "legendary" },
  ],
  stats: {
    totalHours: 156,
    avgDaily: 42.3,
    bestStreak: 28,
    efficiency: 87,
  }
};

const rarityColors = {
  legendary: "from-yellow-500 to-orange-500",
  epic: "from-purple-500 to-pink-500",
  rare: "from-blue-500 to-cyan-500",
  common: "from-green-500 to-emerald-500",
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "achievements" | "stats">("overview");

  return (
    <div className="min-h-screen farming-grid">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card variant="glow" className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              {/* Avatar */}
              <div className="relative">
                <Avatar
                  size="xl"
                  variant="farming"
                  fallback="J"
                  online={true}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-background border border-border"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold mb-1">{mockUser.name}</h1>
                <p className="text-muted-foreground mb-3">{mockUser.username}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  <Badge variant="farming">Rank #{mockUser.globalRank}</Badge>
                  <Badge variant="syndicate">{mockUser.syndicateName}</Badge>
                  <Badge variant="secondary">Joined {mockUser.joinDate}</Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {mockUser.currentBalance.toFixed(0)}
                    </p>
                    <p className="text-xs text-muted-foreground">KALE Balance</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {mockUser.totalHarvest.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Total Harvest</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockUser.farmsOwned}</p>
                    <p className="text-xs text-muted-foreground">Farms Owned</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent">#{mockUser.globalRank}</p>
                    <p className="text-xs text-muted-foreground">Global Rank</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            onClick={() => setActiveTab("overview")}
          >
            <User className="mr-2 h-4 w-4" />
            Overview
          </Button>
          <Button
            variant={activeTab === "achievements" ? "default" : "ghost"}
            onClick={() => setActiveTab("achievements")}
          >
            <Award className="mr-2 h-4 w-4" />
            Achievements
          </Button>
          <Button
            variant={activeTab === "stats" ? "default" : "ghost"}
            onClick={() => setActiveTab("stats")}
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Statistics
          </Button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Harvested 45 KALE", time: "2 hours ago", icon: "⚡" },
                    { action: "Joined syndicate battle", time: "5 hours ago", icon: "⚔️" },
                    { action: "Upgraded Farm #3", time: "1 day ago", icon: "🔧" },
                    { action: "Earned achievement", time: "2 days ago", icon: "🏆" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
                      <span className="text-xl">{activity.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Farm Efficiency</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${mockUser.stats.efficiency}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{mockUser.stats.efficiency}%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Best Streak</span>
                    <Badge variant="farming">{mockUser.stats.bestStreak} days</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Daily Average</span>
                    <span className="font-medium">{mockUser.stats.avgDaily} KALE</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Total Hours</span>
                    <span className="font-medium">{mockUser.stats.totalHours}h</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-2">Achievement Collection</h2>
              <p className="text-muted-foreground">
                {mockUser.achievements.length} achievements unlocked
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockUser.achievements.map((achievement) => (
                <Card key={achievement.id} hover className="text-center">
                  <CardContent className="pt-6">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${rarityColors[achievement.rarity as keyof typeof rarityColors]} flex items-center justify-center text-2xl animate-neon-glow`}>
                      {achievement.icon}
                    </div>
                    <h3 className="font-bold mb-1">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {achievement.description}
                    </p>
                    <Badge 
                      variant={
                        achievement.rarity === "legendary" ? "achievement" : 
                        achievement.rarity === "epic" ? "farming" : 
                        "secondary"
                      }
                      className="capitalize"
                    >
                      {achievement.rarity}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === "stats" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="farming">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Coins className="mr-2 h-5 w-5 text-primary" />
                  Earnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">
                  {mockUser.totalHarvest.toLocaleString()} KALE
                </div>
                <p className="text-sm text-muted-foreground">Lifetime harvest</p>
                <div className="mt-4 text-sm">
                  <div className="flex justify-between mb-1">
                    <span>This week</span>
                    <span className="font-medium">+342 KALE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>This month</span>
                    <span className="font-medium">+1,420 KALE</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Rankings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">#{mockUser.globalRank}</div>
                <p className="text-sm text-muted-foreground">Global ranking</p>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Syndicate rank</span>
                    <Badge variant="syndicate">#2</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Best rank</span>
                    <Badge variant="achievement">#1</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">{mockUser.stats.efficiency}%</div>
                <p className="text-sm text-muted-foreground">Farm efficiency</p>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Active streak</span>
                    <span className="font-medium">{mockUser.stats.bestStreak} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Farms owned</span>
                    <span className="font-medium">{mockUser.farmsOwned}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Profile Actions */}
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Button variant="syndicate">
            <Edit3 className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="ghost">
            <Award className="mr-2 h-4 w-4" />
            Share Achievements
          </Button>
        </div>
      </div>
    </div>
  );
}