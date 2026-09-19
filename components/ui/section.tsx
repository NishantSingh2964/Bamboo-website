import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  compact = false,
}: {
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
}) {
  return <section className={cn(compact ? "py-10" : "py-16 sm:py-20", className)}>{children}</section>;
}
