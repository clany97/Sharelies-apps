import { useState } from "react";
import { AppShell } from "@sharelies/ui/components/app-shell";
import { Button } from "@sharelies/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@sharelies/ui/components/card";
import meta from "../app.json";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <AppShell>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="font-display text-2xl">
            {meta.emoji} {meta.name}
          </CardTitle>
          <p className="text-muted-foreground">{meta.description}</p>
        </CardHeader>
        <CardContent>
          <Button size="lg" onClick={() => setCount((c) => c + 1)}>
            Tapped {count} times
          </Button>
        </CardContent>
      </Card>
    </AppShell>
  );
}
