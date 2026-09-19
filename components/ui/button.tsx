import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
};

const variants = {
  primary: "bg-primary text-white hover:bg-text",
  secondary: "border border-primary/30 bg-white text-primary hover:border-primary",
  ghost: "text-primary hover:bg-primary/5",
};

export function Button({ children, href, variant = "primary", className, type = "button" }: ButtonProps) {
  const classes = cn(
    "inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-medium transition-colors",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type}>
      {children}
    </button>
  );
}
