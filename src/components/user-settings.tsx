import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const UserSettings = () => {
  const { toast } = useToast();

  const updateInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let values = Object.fromEntries(new FormData(e.currentTarget).entries());
    console.log(values);
    toast({
      className: "font-comfortaa bg-green-200",
      title: "Dados Atualizados!",
      description: "Seus dados foram atualizados",
    });
  };

  return (
    <form onSubmit={updateInfo} className="flex flex-col space-y-2">
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input name="name" defaultValue="Matheus" type="text" />
        <span className="text-muted-foreground text-xs">
          Esse é o nome que será exibido no seu perfil e emails.
        </span>
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          defaultValue="matheussmoura@outlook.com"
          type="email"
        />
        <span className="text-muted-foreground text-xs">
          Esse é o email para o qual enviaremos notificações importantes.
        </span>
      </div>
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea name="bio" defaultValue="Eu tenho um computador"></Textarea>
        <span className="text-muted-foreground text-xs">
          Você pode @mencionar outros usuários.
        </span>
      </div>
      <div>
        <Button type="submit">
          <Save className="mr-2" /> Salvar
        </Button>
      </div>
    </form>
  );
};

export default UserSettings;
