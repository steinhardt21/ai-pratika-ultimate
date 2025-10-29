import { cn } from "@/lib/utils";

export function AdminShell({ children, className, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
    return (
      <div className={cn("grid items-start gap-8", className)} {...props}>
        {children}
      </div>
    )
  }