import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { Food, NewMealFoods } from '@/types/Food';
import NewMealDataTable from '@/components/new-meal-datatable';
import { api } from '@/lib/api';
import { FoodCombobox } from './food-combobox';

const NewMeal = () => {
  const [name, setName] = useState('');
  const [foods, setFoods] = useState<NewMealFoods[]>([]);
  const { toast } = useToast();

  const insertMeal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      name,
      foods: foods.map((x) => ({ food_id: x.id, quantity: x.quantity })),
    };

    let response = await api.post('/api/addusermeal', body);

    if (response.ok) {
      toast({
        className: 'font-comfortaa bg-green-200',
        title: 'Refeição Inserida!',
        description: 'Sua nova refeição foi gravada com sucesso!',
      });
    } else {
      let data = (await response.json()) as { message: string };
      toast({
        className: 'font-comfortaa bg-yellow-200',
        title: 'Atenção!',
        description: data.message ?? 'Mais um erro na api!',
      });
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleAddFood = (food: Food) => {
    setFoods((prev) => {
      if (!prev.find((x) => x.id === food.id)) {
        return [...prev, { id: food.id, name: food.name, quantity: 0 }];
      } else {
        return prev;
      }
    });
  };

  return (
    <form onSubmit={insertMeal} className='flex flex-col space-y-2'>
      <div>
        <Label htmlFor='name'>Nome</Label>
        <Input
          name='name'
          placeholder='Almoço, Janta...'
          type='text'
          autoComplete='off'
          value={name}
          onChange={handleNameChange}
          maxLength={25}
          minLength={5}
          required
        />
        <span className='text-muted-foreground text-xs'>
          Esse é o nome para identificar sua refeição.
        </span>
      </div>
      <div>
        <FoodCombobox onSelect={handleAddFood} />
      </div>
      <div>
        <NewMealDataTable foods={foods} setFoods={setFoods} />
      </div>
      <div>
        <Button type='submit'>
          <Save className='mr-2' /> Criar
        </Button>
      </div>
    </form>
  );
};

export default NewMeal;
