import { useState } from "react";
import { Zap, Coins, Sprout, TrendingUp, Timer, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/Card";
import Badge from "@/components/Badge";

// Mock data
const mockHarvestData = {
  currentBalance: 1247.89,
  harvestRate: 15.4,
  nextHarvestIn: 3600, // seconds
  totalFarms: 8,
  activeBoosts: 2,
  efficiency: 87,
};

export default function Harvest() {
  const [isHarvesting, setIsHarvesting] = useState(false);
  const [lastHarvest, setLastHarvest] = useState(0);
  // const [showConfetti, setShowConfetti] = useState(false);

  const handleHarvest = async () => {
    setIsHarvesting(true);
    // Simulate harvesting
    await new Promise(resolve => setTimeout(resolve, 2000));
    const newHarvest = Math.random() * 50 + 25; // 25-75 KALE
    setLastHarvest(newHarvest);
    setIsHarvesting(false);
    // Confetti/emoji removido
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen farming-grid">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 mb-4 animate-float">
            <Zap className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              KALE Farm Hub
            </span>
          </h1>
          <p className="text-muted-foreground">
            Cultivate your tokens and watch your KALE grow
          </p>
        </div>

  {/* Confetti Effect REMOVIDO */}
  {/* (efeito visual removido conforme solicitado) */}

        {/* Main Harvest Card */}
        <div className="max-w-2xl mx-auto mb-8">
          <Card variant="glow" className="text-center p-8">
            <CardContent className="space-y-6">
              {/* Current Balance */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Current Balance</p>
                <div className="text-4xl font-bold text-primary">
                  {(mockHarvestData.currentBalance + lastHarvest).toFixed(2)} KALE
                </div>
                {lastHarvest > 0 && (
                  <Badge variant="farming" className="mt-2">
                    +{lastHarvest.toFixed(2)} KALE harvested!
                  </Badge>
                )}
              </div>

              {/* Harvest Rate */}
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center text-primary">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {mockHarvestData.harvestRate} KALE/hour
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Timer className="h-4 w-4 mr-1" />
                  Next: {formatTime(mockHarvestData.nextHarvestIn)}
                </div>
              </div>

              {/* Harvest Button */}
              <Button 
                variant="farming" 
                size="lg" 
                className="text-xl px-12 py-8 h-auto"
                onClick={handleHarvest}
                disabled={isHarvesting}
              >
                {isHarvesting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3" />
                    Planting...
                  </>
                ) : (
                  <>
                    <Sprout className="mr-3 h-6 w-6" />
                    Farm KALE
                  </>
                )}
              </Button>

              {/* Botão para entrar em mais farms do syndicate */}
              <div className="flex justify-center pt-2">
                <Button variant="syndicate" size="sm" className="mt-4">
                  Join next syndicate farm
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Farm Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card hover>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Farms</CardTitle>
              <Sprout className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockHarvestData.totalFarms}</div>
              <p className="text-xs text-muted-foreground">
                All farms operational
              </p>
            </CardContent>
          </Card>

          <Card hover>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Boosts</CardTitle>
              <Award className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{mockHarvestData.activeBoosts}</div>
              <p className="text-xs text-muted-foreground">
                +3% harvest rate
              </p>
            </CardContent>
          </Card>

          <Card hover>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockHarvestData.efficiency}%</div>
              <p className="text-xs text-muted-foreground">
                Excellent performance
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Farm Management */}
        <Card variant="farming">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sprout className="mr-2 h-5 w-5 text-primary" />
              Farm Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Farm Slots */}
              <div className="grid grid-cols-2 gap-4">
                {/* Player's Farm */}
                <div className="aspect-square rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 cursor-pointer group">
                  <div className="text-center">
                    <Sprout className="h-8 w-8 text-primary mx-auto mb-2 group-hover:animate-bounce" />
                    <p className="text-xs font-medium text-primary">Your Farm</p>
                    <Badge variant="farming" className="mt-1 text-xs">
                      Active
                    </Badge>
                  </div>
                </div>
                {/* Syndicate Farm */}
                <div className="aspect-square rounded-lg border-2 border-dashed border-accent/30 bg-accent/5 flex items-center justify-center hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 cursor-pointer group">
                  <div className="text-center">
                    <Sprout className="h-8 w-8 text-accent mx-auto mb-2 group-hover:animate-bounce" />
                    <p className="text-xs font-medium text-accent">Syndicate Farm</p>
                    <Badge variant="syndicate" className="mt-1 text-xs">
                      Active
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Upgrade Options */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-border/40">
                <Button variant="syndicate" size="sm">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Upgrade Farms
                </Button>
                <Button variant="outline" size="sm">
                  <Award className="mr-2 h-4 w-4" />
                  Activate Boost
                </Button>
                <Button variant="ghost" size="sm">
                  <Timer className="mr-2 h-4 w-4" />
                  Auto-Farm
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}