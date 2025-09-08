
import { useState, useEffect } from "react";
// Se estiver usando Next.js, troque para:
// import Link from "next/link";
import { Link } from "react-router-dom";
import { Sprout, Zap, Users, ArrowRight, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/Card";
import Badge from "@/components/Badge";

export default function Home() {

  const [greeting, setGreeting] = useState("");
  const [tgUser, setTgUser] = useState(null);
  // Dados mock para as outras infos
  const mockData = {
    balance: 1247.89,
    totalHarvested: 12450,
    daysActive: 42,
    syndicateName: "Green Thumbs",
  };

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    if (typeof window !== "undefined") {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.ready();
        tg.expand();
        setTgUser(tg.initDataUnsafe?.user || null);
      } else {
        // Fallback para desenvolvimento local fora do Telegram
        setTgUser({ first_name: "Tester" });
      }
    }
  }, []);

  return (
    <div className="min-h-screen farming-grid">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 mb-4 animate-float">
              <img
                src="/KALE_syndicate_logo_notext.png"
                alt="KALE Syndicate Logo"
                className="h-12 w-12 object-contain animate-neon-glow"
                draggable="false"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
              {greeting}, {tgUser ? tgUser.first_name : "..."}!
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Welcome to the KALE Syndicate. Your decentralized farming empire awaits.
            Farm tokens, build syndicates, and cultivate the future of DeFi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link to="/harvest">
              <Button variant="farming" size="lg" className="text-lg px-8 py-6">
                <Zap className="mr-2 h-5 w-5" />
                Start Farming
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/syndicate">
              <Button variant="syndicate" size="lg" className="text-lg px-8 py-6">
                <Users className="mr-2 h-5 w-5" />
                Join Syndicate
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card variant="glow" hover>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">KALE Balance</CardTitle>
              <Coins className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {mockData.balance.toLocaleString()} KALE
              </div>
              <p className="text-xs text-muted-foreground">
                +12% from last harvest
              </p>
            </CardContent>
          </Card>

          <Card hover>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Harvested</CardTitle>
              <Sprout className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockData.totalHarvested.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Lifetime harvest
              </p>
            </CardContent>
          </Card>

          <Card hover>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Days Active</CardTitle>
              <Badge variant="farming" className="text-xs">
                Active
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockData.daysActive}
              </div>
              <p className="text-xs text-muted-foreground">
                Farming streak
              </p>
            </CardContent>
          </Card>

          <Card hover>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Syndicate</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold text-accent">
                {mockData.syndicateName}
              </div>
              <p className="text-xs text-muted-foreground">
                Rank #3 globally
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card variant="farming" className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/harvest" className="group">
                <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all duration-300 text-center group-hover:scale-105">
                  <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">Plant Now</p>
                </div>
              </Link>
              
              <Link to="/syndicate" className="group">
                <div className="p-4 rounded-lg border border-accent/20 bg-accent/5 hover:bg-accent/10 transition-all duration-300 text-center group-hover:scale-105">
                  <Users className="h-8 w-8 text-accent mx-auto mb-2" />
                  <p className="text-sm font-medium">Syndicate Hub</p>
                </div>
              </Link>
              
              <Link to="/leaderboard" className="group">
                <div className="p-4 rounded-lg border border-border bg-muted/20 hover:bg-muted/30 transition-all duration-300 text-center group-hover:scale-105">
                  <Badge variant="achievement" className="mx-auto mb-2">
                    <span className="text-xs">🏆</span>
                  </Badge>
                  <p className="text-sm font-medium">Rankings</p>
                </div>
              </Link>
              
              <Link to="/profile" className="group">
                <div className="p-4 rounded-lg border border-border bg-muted/20 hover:bg-muted/30 transition-all duration-300 text-center group-hover:scale-105">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 mx-auto mb-2 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{tgUser ? tgUser.first_name[0] : "?"}</span>
                  </div>
                  <p className="text-sm font-medium">Profile</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}