import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Food } from "@/types/Food";
import { api } from "@/lib/api";
import { Command } from "cmdk";
import { CommandGroup, CommandInput, CommandItem } from "./ui/command";

interface FoodComboboxProps {
  onSelect: (food: Food) => void;
}

export function FoodCombobox({ onSelect }: FoodComboboxProps) {
  const [foods, setFoods] = useState<Food[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search.length < 3) {
      setFoods(x => x.length === 0 ? x : []);
      return;
    }

    setLoading(true);
    api.get(`/api/foods?q=${search}`)
      .then(res => res.json())
      .then(foods => setFoods(foods))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));

  }, [search]);

  const handleSelect = (food_name: string) => {
    onSelect(foods.find(x => x.name.toLowerCase().trim() === food_name)!);
  }

  return (
    <Command label="Adicionar Alimento" shouldFilter={false}>
      <CommandInput
        loading={loading}
        value={search}
        onValueChange={setSearch}
        placeholder="Pesquise por alimentos"
      />

      <Command.List>
        <CommandGroup className="max-h-40 overflow-y-auto">
          {foods.map(food => (
            <CommandItem
              key={food.id}
              value={food.name}
              className="cursor-pointer"
              onSelect={handleSelect}
            >
              <Plus className="mr-2 h-4 w-4" />
              {food.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </Command.List>
    </Command>
  )
}
