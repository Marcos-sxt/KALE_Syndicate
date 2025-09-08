import { useState } from "react";
import { Trophy, Crown, Medal, TrendingUp, Users, Zap } from "lucide-react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/Card";
import Badge from "@/components/Badge";
import Avatar from "@/components/Avatar";

// Mock leaderboard data
const mockPlayers = [
  { rank: 1, name: "Alice", syndicate: "Green Thumbs", harvest: 15420, avatar: "A", trend: "up" },
  { rank: 2, name: "Bob", syndicate: "Crypto Cultivators", harvest: 14850, avatar: "B", trend: "up" },
  { rank: 3, name: "Carol", syndicate: "HODL Harvesters", harvest: 13960, avatar: "C", trend: "down" },
  { rank: 4, name: "John", syndicate: "Green Thumbs", harvest: 12470, avatar: "J", trend: "up", isCurrentUser: true },
  { rank: 5, name: "Diana", syndicate: "DeFi Dragons", harvest: 11230, avatar: "D", trend: "up" },
  { rank: 6, name: "Mike", syndicate: "Token Titans", harvest: 10850, avatar: "M", trend: "same" },
  { rank: 7, name: "Sarah", syndicate: "Yield Hunters", harvest: 9670, avatar: "S", trend: "down" },
  { rank: 8, name: "Tom", syndicate: "Farm Force", harvest: 8920, avatar: "T", trend: "up" },
];

const mockSyndicates = [
  { rank: 1, name: "Green Thumbs", totalHarvest: 125000, members: 24, avatar: "🌱", isCurrentSyndicate: true },
  { rank: 2, name: "HODL Harvesters", totalHarvest: 118500, members: 31, avatar: "💎" },
  { rank: 3, name: "Crypto Cultivators", totalHarvest: 98000, members: 18, avatar: "🚀" },
  { rank: 4, name: "DeFi Dragons", totalHarvest: 87600, members: 22, avatar: "🐉" },
  { rank: 5, name: "Token Titans", totalHarvest: 76300, members: 19, avatar: "⚡" },
];

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<"players" | "syndicates">("players");

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-orange-600" />;
      default:
        return <span className="text-sm font-bold">#{rank}</span>;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default:
        return <div className="h-4 w-4" />;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank <= 3) return "achievement";
    if (rank <= 10) return "farming";
    return "secondary";
  };

  return (
    <div className="min-h-screen farming-grid">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border border-yellow-500/30 mb-4 animate-float">
            <Trophy className="h-8 w-8 text-yellow-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-yellow-500 to-primary bg-clip-text text-transparent">
              Global Rankings
            </span>
          </h1>
          <p className="text-muted-foreground">
            See how you stack up against the best KALE farmers
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab("players")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === "players"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <Users className="inline-block mr-2 h-4 w-4" />
            Top Players
          </button>
          <button
            onClick={() => setActiveTab("syndicates")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === "syndicates"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <Trophy className="inline-block mr-2 h-4 w-4" />
            Top Syndicates
          </button>
        </div>

  {/* Players Leaderboard */}
  {activeTab === "players" && (
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Top KALE Farmers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockPlayers.map((player) => (
                    <div
                      key={player.rank}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                        player.isCurrentUser
                          ? "bg-primary/10 border-2 border-primary/30 shadow-lg"
                          : "bg-muted/20 hover:bg-muted/30 border border-border/40"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        {/* Rank */}
                        <div className="flex items-center justify-center w-10">
                          {getRankIcon(player.rank)}
                        </div>

                        {/* Avatar */}
                        <Avatar
                          fallback={player.avatar}
                          variant={player.rank <= 3 ? "farming" : "default"}
                          size="md"
                        />

                        {/* Player Info */}
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className={`font-semibold ${player.isCurrentUser ? "text-primary" : ""}`}>
                              {player.name}
                            </p>
                            {player.isCurrentUser && (
                              <Badge variant="farming">You</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{player.syndicate}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        {/* Trend */}
                        <div className="flex items-center">
                          {getTrendIcon(player.trend)}
                        </div>

                        {/* Harvest Amount */}
                        <div className="text-right">
                          <p className="font-bold text-primary">
                            {player.harvest.toLocaleString()} KALE
                          </p>
                          <Badge variant={getRankBadge(player.rank)} className="text-xs">
                            Rank #{player.rank}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Syndicates Leaderboard */}
        {activeTab === "syndicates" && (
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5" />
                  Top Syndicates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockSyndicates.map((syndicate) => (
                    <div
                      key={syndicate.rank}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                        syndicate.isCurrentSyndicate
                          ? "bg-primary/10 border-2 border-primary/30 shadow-lg"
                          : "bg-muted/20 hover:bg-muted/30 border border-border/40"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        {/* Rank */}
                        <div className="flex items-center justify-center w-10">
                          {getRankIcon(syndicate.rank)}
                        </div>

                        {/* Syndicate Avatar */}
                        <div className="text-3xl">{syndicate.avatar}</div>

                        {/* Syndicate Info */}
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className={`font-semibold ${syndicate.isCurrentSyndicate ? "text-primary" : ""}`}>
                              {syndicate.name}
                            </p>
                            {syndicate.isCurrentSyndicate && (
                              <Badge variant="farming">Your Syndicate</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {syndicate.members} members
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-primary">
                          {syndicate.totalHarvest.toLocaleString()} KALE
                        </p>
                        <Badge variant={getRankBadge(syndicate.rank)} className="text-xs">
                          Rank #{syndicate.rank}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Achievement Showcase */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card variant="farming">
            <CardHeader>
              <CardTitle className="flex items-center text-center w-full justify-center">
                <Zap className="mr-2 h-5 w-5" />
                Weekly Challenge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-4xl">🏆</div>
                <h3 className="text-xl font-bold">Harvest Master Challenge</h3>
                <p className="text-muted-foreground">
                  Harvest 1,000 KALE this week to earn a special badge and bonus rewards
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">847</p>
                    <p className="text-xs text-muted-foreground">Your Progress</p>
                  </div>
                  <div className="text-muted-foreground">/</div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">1,000</p>
                    <p className="text-xs text-muted-foreground">Target</p>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all duration-300" 
                    style={{ width: "84.7%" }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}