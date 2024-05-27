import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "rounded bg-primary text-font shadow-md hover:bg-primary/90",
        destructive:
          "rounded bg-danger text-white hover:opacity-75",
        outline:
          "rounded border border-input hover:bg-accent hover:text-accent-foreground",
        secondary:
          "rounded bg-background text-font hover:opacity-75",
        ghost: "shadow-none",
        rounded:
          "rounded-full shadow-none",
      },
      size: {
        default: "h-8 px-4 py-2",
        sm: "h-8 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        iconsm: "h-4 w-4 p-0",
        icon: "h-8 w-8 p-0",
        iconlg: "h-10 w-10 p-0",
        lg2: "h-max py-2 px-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends VariantProps<typeof buttonVariants>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {}


  export default function Button({ className, variant, size, ...props }: ButtonProps) {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        {...props}
      />
    );
  }
