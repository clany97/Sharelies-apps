import { cn } from "@sharelies/ui/lib/utils";

/** The frame every Sharelies app sits in: back link to the hub, then the app. */
export function AppShell({ backLink = true, className, children }) {
  return (
    <div
      className={cn(
        "mx-auto min-h-dvh w-full max-w-5xl px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]",
        className,
      )}
    >
      {backLink && (
        <a href={`${import.meta.env.BASE_URL}../`} className="text-sm text-muted-foreground hover:text-foreground">
          ← All apps
        </a>
      )}
      {children}
    </div>
  );
}
