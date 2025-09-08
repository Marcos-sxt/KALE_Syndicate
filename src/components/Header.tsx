import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sprout, Home, Zap, Users, Trophy, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock Connect Wallet Button (must be outside Header to use hooks)
function MockConnectWallet() {
  const [connected, setConnected] = React.useState(false);
  return (
    <div>
      {!connected ? (
        <Button
          variant="outline"
          className="px-4 py-2 text-sm font-bold"
          onClick={() => setConnected(true)}
        >
          Connect Wallet
        </Button>
      ) : (
        <span className="text-green-400 font-mono px-4">Wallet: GABC...XYZ</span>
      )}
    </div>
  );
}

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Farm", href: "/harvest", icon: Zap },
  { name: "Syndicate", href: "/syndicate", icon: Users },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Profile", href: "/profile", icon: User },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="relative">
            <img
              src="/KALE_syndicate_logo.png"
              alt="KALE Syndicate Logo"
              className="h-10 w-32 object-contain object-left"
              style={{ maxWidth: '140px', minWidth: '80px' }}
              draggable="false"
            />
            <div className="absolute inset-0 animate-neon-glow rounded-full" />
          </div>
          {/* Logo text removed as requested; only logo image remains */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 ml-8 flex-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "inline-flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-4 ml-auto">
          <MockConnectWallet />
          {/* Profile Avatar - Desktop */}
          <div className="hidden md:block">
            <Link to="/profile">
              <Button variant="ghost" size="sm" className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
              </Button>
            </Link>
          </div>
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

        </div>
      </div>
    </header>
  );
}
