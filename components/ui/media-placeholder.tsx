import { cn } from "@/lib/utils";

export function MediaPlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex min-h-48 items-center justify-center rounded-md border border-dashed border-primary/25 bg-leaf/40 p-6 text-center text-xs font-medium uppercase tracking-[0.18em] text-primary/70",
        className,
      )}
    >
      {label}
    </div>
  );
}
