import { ReactNode } from "react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "farming" | "syndicate";
  className?: string;
  online?: boolean;
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

export default function Avatar({
  src,
  alt = "",
  fallback,
  size = "md",
  variant = "default",
  className,
  online,
}: AvatarProps) {
  const baseClasses = cn(
    "relative inline-flex shrink-0 overflow-hidden rounded-full",
    sizeClasses[size],
    {
      "border-2 border-primary/30 shadow-lg shadow-primary/10": variant === "farming",
      "border-2 border-accent/30 bg-gradient-to-br from-accent/10 to-accent/5": variant === "syndicate",
    },
    className
  );

  return (
    <div className={baseClasses}>
      {src ? (
        <img
          className="aspect-square h-full w-full object-cover"
          src={src}
          alt={alt}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted">
          {fallback || <User className="h-1/2 w-1/2 text-muted-foreground" />}
        </div>
      )}
      
      {online && (
        <div className="absolute bottom-0 right-0 flex h-3 w-3 items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <div className="absolute h-3 w-3 rounded-full bg-primary/30 animate-ping" />
        </div>
      )}
    </div>
  );
}