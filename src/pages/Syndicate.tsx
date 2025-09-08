import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { HelpCircle } from "lucide-react";
import { Users, Crown, Shield, Swords, Plus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from "@/components/Card";
import Badge from "@/components/Badge";
import Avatar from "@/components/Avatar";

// Mock data
const mockSyndicates = [
  {
    id: 1,
    name: "Green Thumbs",
    description: "Elite farming syndicate focused on maximum yields",
    members: 24,
    totalHarvest: 125000,
    rank: 3,
    isJoined: true,
    avatar: "🌱",
    leader: "Alice",
  },
  {
    id: 2,
    name: "Crypto Cultivators", 
    description: "DeFi farmers building the future of agriculture",
    members: 18,
    totalHarvest: 98000,
    rank: 7,
    isJoined: false,
    avatar: "🚀",
    leader: "Bob",
  },
      {
        id: 3,
        name: "HODL Harvesters",
        description: "Diamond hands farming for the long term",
        members: 31,
        totalHarvest: 156000,
        rank: 1,
        isJoined: false,
        avatar: "💎",
        leader: "Carol",
      },
    ];

    const mockMembers = [
      { name: "Alice", role: "Leader", harvest: 8500, online: true, avatar: "A" },
      { name: "John", role: "Member", harvest: 6200, online: true, avatar: "J" },
      { name: "Diana", role: "Officer", harvest: 7100, online: false, avatar: "D" },
      { name: "Mike", role: "Member", harvest: 5800, online: true, avatar: "M" },
    ];

    export default function Syndicate() {
      const [activeTab, setActiveTab] = useState<"my-syndicate" | "discover" | "create">("my-syndicate");
      const [showCreateForm, setShowCreateForm] = useState(false);
      const currentSyndicate = mockSyndicates.find(s => s.isJoined);

      return (
        <div className="min-h-screen farming-grid">
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 mb-4 animate-float">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Syndicate Hub
                </span>
                <Popover>
                  <PopoverTrigger asChild>
                    <button type="button" className="ml-1 text-accent hover:text-primary focus:outline-none">
                      <HelpCircle className="w-5 h-5" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="center" sideOffset={8} className="max-w-xs text-sm">
                    <div className="font-semibold mb-2">What are Syndicates?</div>
                    <div>
                      Syndicates are collaborative farming groups where players unite to maximize their KALE harvest, share strategies, and compete for global rankings. Join or create a syndicate to unlock exclusive rewards and climb the leaderboards together!<br /><br />
                      <span className="font-semibold text-accent">Bonus:</span> Your syndicate receives <span className="font-semibold">half of your active bonus harvest rate</span> as a collaborative bonus for every farmer in the group while farming together. The more active members, the greater the collective rewards!
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <p className="text-muted-foreground">
                Unite with fellow farmers and dominate the harvest
              </p>
            </div>
            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Button
                variant={activeTab === "my-syndicate" ? "default" : "ghost"}
                onClick={() => setActiveTab("my-syndicate")}
                className="px-6"
              >
                My Syndicate
              </Button>
              <Button
                variant={activeTab === "discover" ? "default" : "ghost"}
                onClick={() => setActiveTab("discover")}
                className="px-6"
              >
                Discover Syndicates
              </Button>
              <Button
                variant={activeTab === "create" ? "default" : "ghost"}
                onClick={() => setActiveTab("create")}
                className="px-6"
              >
                Create Syndicate
              </Button>
            </div>
            {/* My Syndicate Tab */}
            {activeTab === "my-syndicate" && currentSyndicate && (
              <div className="space-y-6">
                {/* Syndicate Overview */}
                <Card variant="syndicate" className="text-center">
                  <CardHeader>
                    <div className="text-6xl mb-4">{currentSyndicate.avatar}</div>
                    <CardTitle className="text-2xl text-accent">{currentSyndicate.name}</CardTitle>
                    <p className="text-muted-foreground">{currentSyndicate.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{currentSyndicate.members}</div>
                        <p className="text-sm text-muted-foreground">Members</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {currentSyndicate.totalHarvest.toLocaleString()}
                        </div>
                        <p className="text-sm text-muted-foreground">Total KALE</p>
                      </div>
                      <div className="text-center">
                        <Badge variant="achievement" className="text-lg px-4 py-2">
                          #{currentSyndicate.rank} Global
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Syndicate Members */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="mr-2 h-5 w-5" />
                      Syndicate Members ({mockMembers.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockMembers.map((member, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/40 bg-muted/20 hover:bg-muted/30 transition-colors">
                          <div className="flex items-center space-x-3">
                            <Avatar 
                              fallback={member.avatar} 
                              variant="syndicate"
                              online={member.online}
                            />
                            <div>
                              <div className="flex items-center space-x-2">
                                <p className="font-semibold">{member.name}</p>
                                {member.role === "Leader" && <Crown className="h-4 w-4 text-yellow-500" />}
                                {member.role === "Officer" && <Shield className="h-4 w-4 text-blue-500" />}
                              </div>
                              <p className="text-sm text-muted-foreground">{member.role}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{member.harvest.toLocaleString()} KALE</p>
                            <p className="text-sm text-muted-foreground">Total harvest</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                {/* Syndicate Actions */}
                <div className="flex flex-wrap gap-4 justify-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="syndicate">
                        <Swords className="mr-2 h-4 w-4" />
                        Syndicate Wars
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="center" sideOffset={8} className="max-w-xs text-sm">
                      <div className="font-semibold mb-2">What is Syndicate Wars?</div>
                      <div>
                        Syndicate Wars are competitive events where syndicates face off in special farming challenges. Work together with your syndicate members to complete objectives, earn points, and climb the event leaderboard. Top syndicates win exclusive rewards and global recognition!<br /><br />
                        <span className="font-semibold text-accent">Tip:</span> Strategy and teamwork are key to victory. Prepare your syndicate and join the battle!
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Button variant="outline">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Stats
                  </Button>
                  <Button variant="ghost">
                    <Plus className="mr-2 h-4 w-4" />
                    Invite Members
                  </Button>
                </div>
              </div>
            )}
            {/* Discover Syndicates Tab */}
            {activeTab === "discover" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockSyndicates.filter(s => !s.isJoined).map((syndicate) => (
                  <Card key={syndicate.id} hover variant="syndicate">
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-2">{syndicate.avatar}</div>
                      <CardTitle className="text-accent">{syndicate.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{syndicate.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Members:</span>
                          <span className="font-semibold">{syndicate.members}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Total KALE:</span>
                          <span className="font-semibold text-primary">
                            {syndicate.totalHarvest.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Global Rank:</span>
                          <Badge variant="achievement">#{syndicate.rank}</Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="syndicate">
                        <Users className="mr-2 h-4 w-4" />
                        Join Syndicate
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
            {/* Create Syndicate Tab */}
            {activeTab === "create" && (
              <div className="max-w-2xl mx-auto">
                <Card variant="farming">
                  <CardHeader>
                    <CardTitle className="flex items-center text-center w-full justify-center">
                      <Plus className="mr-2 h-5 w-5" />
                      Create Your Syndicate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Syndicate Name</label>
                        <input
                          type="text"
                          placeholder="Enter syndicate name..."
                          className="w-full px-4 py-2 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                          placeholder="Describe your syndicate's mission and values..."
                          rows={4}
                          className="w-full px-4 py-2 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Syndicate Avatar</label>
                        <div className="grid grid-cols-6 gap-2">
                          {["🌱", "🚀", "💎", "⚡", "🔥", "🏆", "🌿", "💰", "⭐", "🌊", "🎯", "🛡️"].map((emoji) => (
                            <button
                              key={emoji}
                              className="text-2xl p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                      <Button className="w-full" variant="farming" size="lg">
                        <Plus className="mr-2 h-5 w-5" />
                        Create Syndicate (100 KALE)
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      );
    }