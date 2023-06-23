import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRef } from "react";
import { NewMealFoods } from "@/types/Food";
import NewMealDataTable from "@/components/new-meal-datatable";

const NewMeal = () => {
  const foods = useRef<NewMealFoods[]>([]);
  const { toast } = useToast();

  const insertMeal = () => {
    toast({
      className: "font-comfortaa bg-green-200",
      title: "Refeição Inserida!",
      description: "Seus dados foram atualizados",
    });
  };

  return (
    <div className="flex flex-col space-y-2">
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input name="name" placeholder="Almoço, Janta..." type="text" autoComplete="off" />
        <span className="text-muted-foreground text-xs">
          Esse é o nome para identificar sua refeição.
        </span>
      </div>
      <div>
        <NewMealDataTable foodsRef={foods}/>
      </div>
      <div>
        <Button>
          <Save className="mr-2" onClick={insertMeal}/> Criar
        </Button>
      </div>
    </div>
  );
};

export default NewMeal;
