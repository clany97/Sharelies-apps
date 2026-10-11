import { AppShell } from "@sharelies/ui/components/app-shell";
import { Badge } from "@sharelies/ui/components/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@sharelies/ui/components/card";
import { HOUSE } from "@sharelies/ui/house";

// Every apps/<slug>/app.json, read at build time. A new app appears here automatically.
const manifests = import.meta.glob("../../*/app.json", { eager: true, import: "default" });

const apps = Object.values(manifests)
  .filter((a) => a.status === "beta" || a.status === "live")
  .sort((a, b) => a.name.localeCompare(b.name));

export function App() {
  return (
    <AppShell backLink={false} className="max-w-xl">
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight">🏡 {HOUSE.houseName} apps</h1>
      <p className="mb-6 text-muted-foreground">Fun little things for our house. Tap one to open it.</p>
      {apps.length === 0 && (
        <Card>
          <CardHeader>
            <CardDescription>No apps yet. Ask for one with an “App idea” issue on GitHub.</CardDescription>
          </CardHeader>
        </Card>
      )}
      <div className="grid gap-3">
        {apps.map((app) => (
          <a key={app.slug} href={`${import.meta.env.BASE_URL}${app.slug}/`} className="block active:scale-[0.98] transition">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {app.emoji} {app.name}
                  {app.status === "beta" && <Badge variant="secondary">beta</Badge>}
                </CardTitle>
                <CardDescription>{app.description}</CardDescription>
              </CardHeader>
            </Card>
          </a>
        ))}
      </div>
    </AppShell>
  );
}
