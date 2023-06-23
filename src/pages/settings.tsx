import { Separator } from "@/components/ui/separator";
import UserSettings from "@/components/user-settings";

const Settings = () => {
  return (
    <div className="space-y-6 max-w-prose mx-3 sm:mx-auto">
      <div>
        <h3 className="text-lg font-medium">Configurações</h3>
        <p className="text-sm text-muted-foreground">
          Gerencie as configurações da sua conta e preferencias de email
        </p>
      </div>
      <Separator />
      <UserSettings />
    </div>
  );
};

export default Settings;
