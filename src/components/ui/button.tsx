import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "relative bg-gradient-to-r from-primary via-primary-dark to-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_35px_hsl(var(--primary)/0.5)] hover:scale-105 hover:-translate-y-0.5 before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-r before:from-primary-light before:to-primary-dark before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        destructive:
          "relative bg-gradient-to-r from-destructive via-destructive/90 to-destructive text-destructive-foreground shadow-[0_0_20px_hsl(var(--destructive)/0.3)] hover:shadow-[0_0_35px_hsl(var(--destructive)/0.5)] hover:scale-105 hover:-translate-y-0.5",
        outline:
          "border-2 border-primary bg-background/50 backdrop-blur-sm text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_25px_hsl(var(--primary)/0.4)] hover:scale-105 hover:border-primary-light transition-all duration-300",
        secondary:
          "relative bg-gradient-to-r from-accent via-accent-dark to-accent text-accent-foreground shadow-[0_0_20px_hsl(var(--accent)/0.3)] hover:shadow-[0_0_35px_hsl(var(--accent)/0.5)] hover:scale-105 hover:-translate-y-0.5 before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-r before:from-accent-light before:to-accent-dark before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        ghost: "hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 hover:text-primary hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] transition-all duration-300",
        link: "text-primary underline-offset-4 hover:underline hover:text-accent hover:scale-105 transition-all duration-300",
        premium: "relative overflow-hidden bg-gradient-to-r from-primary via-accent to-primary-dark text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_50px_hsl(var(--accent)/0.6)] hover:scale-110 hover:-translate-y-1 before:absolute before:inset-0 before:bg-gradient-to-r before:from-accent-light before:via-primary-light before:to-accent-light before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] after:bg-[length:250%_250%] after:animate-[shimmer_3s_linear_infinite] animate-pulse",
        glow: "relative bg-gradient-to-br from-primary-light via-primary to-primary-dark text-primary-foreground shadow-[0_0_40px_hsl(var(--primary)/0.5),inset_0_0_20px_hsl(var(--primary-light)/0.3)] hover:shadow-[0_0_60px_hsl(var(--primary)/0.7),inset_0_0_30px_hsl(var(--primary-light)/0.5)] hover:scale-110 hover:-translate-y-1 border-2 border-primary-light/50 hover:border-primary-light transition-all duration-500",
        neon: "relative bg-background text-primary border-2 border-primary shadow-[0_0_10px_hsl(var(--primary)/0.5),0_0_20px_hsl(var(--primary)/0.3),inset_0_0_10px_hsl(var(--primary)/0.1)] hover:shadow-[0_0_20px_hsl(var(--primary)/0.8),0_0_40px_hsl(var(--primary)/0.5),inset_0_0_20px_hsl(var(--primary)/0.2)] hover:bg-primary/10 hover:scale-110 hover:-translate-y-1 hover:border-primary-light transition-all duration-500",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
