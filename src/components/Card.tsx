import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "farming" | "glow" | "syndicate";
  hover?: boolean;
}

export default function Card({ 
  children, 
  className, 
  variant = "default", 
  hover = false 
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300",
        {
          "farming-grid bg-gradient-to-br from-card to-muted/20": variant === "farming",
          "border-accent/40 bg-gradient-to-br from-card to-accent/10": variant === "syndicate",
          "border-primary/50 shadow-lg shadow-primary/10 animate-neon-glow": variant === "glow",
          "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20": hover,
        },
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string; 
}) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string; 
}) {
  return (
    <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)}>
      {children}
    </h3>
  );
}

export function CardContent({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string; 
}) {
  return (
    <div className={cn("p-6 pt-0", className)}>
      {children}
    </div>
  );
}

export function CardFooter({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string; 
}) {
  return (
    <div className={cn("flex items-center p-6 pt-0", className)}>
      {children}
    </div>
  );
}