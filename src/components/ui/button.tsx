import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300 relative overflow-hidden before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:bg-[linear-gradient(90deg,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%))] before:bg-[length:200%_100%] before:animate-rgb-shift before:-z-10",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:shadow-[0_0_20px_rgba(255,100,100,0.5),0_0_40px_rgba(100,255,100,0.3),0_0_60px_rgba(100,100,255,0.2)] hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100 active:shadow-sm [&:hover_svg]:rotate-12 [&:hover_svg]:scale-110",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:shadow-[0_0_20px_rgba(255,100,100,0.5),0_0_40px_rgba(100,255,100,0.3),0_0_60px_rgba(100,100,255,0.2)] hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100 [&:hover_svg]:rotate-12 [&:hover_svg]:scale-110",
        outline: "border border-input bg-background hover:text-accent-foreground hover:shadow-[0_0_20px_rgba(255,100,100,0.5),0_0_40px_rgba(100,255,100,0.3),0_0_60px_rgba(100,100,255,0.2)] hover:-translate-y-1 hover:scale-[1.02] hover:border-accent active:translate-y-0 active:scale-100 [&:hover_svg]:-translate-y-0.5 [&:hover_svg]:scale-110",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:shadow-[0_0_20px_rgba(255,100,100,0.5),0_0_40px_rgba(100,255,100,0.3),0_0_60px_rgba(100,100,255,0.2)] hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100 [&:hover_svg]:rotate-6 [&:hover_svg]:scale-105",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100 [&:hover_svg]:-translate-y-0.5 [&:hover_svg]:scale-110",
        link: "text-primary underline-offset-4 hover:underline hover:opacity-80 transition-opacity [&:hover_svg]:translate-x-0.5",
        premium: "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-sm hover:shadow-[0_0_20px_rgba(255,100,100,0.5),0_0_40px_rgba(100,255,100,0.3),0_0_60px_rgba(100,100,255,0.2)] hover:-translate-y-1 hover:scale-[1.02] hover:brightness-110 active:translate-y-0 active:scale-100 [&:hover_svg]:rotate-[360deg] [&:hover_svg]:scale-110",
        glow: "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_20px_rgba(255,100,100,0.5),0_0_40px_rgba(100,255,100,0.3),0_0_60px_rgba(100,100,255,0.2)] hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100 [&:hover_svg]:rotate-12 [&:hover_svg]:scale-125",
        neon: "bg-background text-primary border border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(255,100,100,0.5),0_0_40px_rgba(100,255,100,0.3),0_0_60px_rgba(100,100,255,0.2)] hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100 [&:hover_svg]:-rotate-12 [&:hover_svg]:scale-110",
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
