import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "secondary" | "destructive" | "outline" | "farming" | "achievement" | "syndicate";
  className?: string;
}

export default function Badge({ 
  children, 
  variant = "default", 
  className 
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80": variant === "default",
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80": variant === "destructive",
          "text-foreground": variant === "outline",
          "border-primary/30 bg-primary/10 text-primary animate-pulse": variant === "farming",
          "border-accent/50 bg-gradient-to-br from-accent/10 to-accent/30 text-accent": variant === "syndicate",
          "border-primary/50 bg-gradient-to-r from-primary/20 to-primary-glow/20 text-primary shadow-sm shadow-primary/20": variant === "achievement",
        },
        className
      )}
    >
      {children}
    </div>
  );
}