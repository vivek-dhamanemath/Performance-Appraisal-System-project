
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react"; // Renamed to avoid conflict

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <SettingsIcon className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>
            Manage your preferences and application settings. Role-specific settings will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is currently under development. Check back soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}
