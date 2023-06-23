import NewMeal from "@/components/new-meal";
import { Separator } from "@/components/ui/separator";

const UserMeals = () => {
  return (
    <div className="space-y-6 max-w-prose mx-3 sm:mx-auto">
      <div>
        <h3 className="text-lg font-medium">Refeições</h3>
        <p className="text-sm text-muted-foreground">
          Crie ou edite suas refeições
        </p>
      </div>
      <Separator/>
      <NewMeal/>
    </div>
  );
}

export default UserMeals;