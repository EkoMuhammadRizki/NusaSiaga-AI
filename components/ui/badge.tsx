import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-emerald-500/30 bg-emerald-500/20 text-emerald-300",
        waspada: "border-yellow-500/40 bg-yellow-500/20 text-yellow-300",
        siaga: "border-orange-500/40 bg-orange-500/20 text-orange-300",
        awas: "border-red-500/40 bg-red-500/20 text-red-300 animate-pulse",
        outline: "border-white/20 text-white/70",
        secondary: "border-white/10 bg-white/5 text-white/60",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
