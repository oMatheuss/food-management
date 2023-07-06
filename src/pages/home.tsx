import { MealInfo } from '@/components/MealInfo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { api } from '@/lib/api';
import { getUser } from '@/lib/utils';
import { MealFood, type Meal } from '@/types/Meal';
import { useState } from 'react';
import { useLoaderData, type LoaderFunction, redirect } from 'react-router-dom';

export const loader: LoaderFunction = () => {
  let user = getUser();
  if (!user) return redirect('/login');
  return api.get(`/api/mealbyuserid/${user.id}`);
};

const Home = () => {
  const mealsData = useLoaderData() as Meal[];
  const [meals, setMeals] = useState(mealsData);

  const [mealsInfo, setMealsInfo] = useState(
    () => new Map<number, MealFood[]>()
  );

  const handleClickItem = async (id: number) => {
    if (mealsInfo.has(id)) return;

    let res = await api.get(`/api/infousermeal/${id}`);
    let mealFood = (await res.json()) as MealFood[];

    setMealsInfo((x) => new Map(x.set(id, mealFood)));
  };

  const handleDeleteItem = async (id: number) => {
    let res = await api.delete(`/api/deleteusermeal/${id}`);

    if (res.ok) {
      console.log('ok');
      setMeals((prev) => prev.filter((x) => x.list_id !== id));
      setMealsInfo((x) => {
        let newMap = new Map(x);
        newMap.delete(id);
        return newMap;
      });
    }
  };

  return (
    <div className='space-y-6 max-w-prose w-full mx-auto px-2'>
      <div>
        <h3 className='text-lg font-medium'>Suas Refeições</h3>
        <p className='text-sm text-muted-foreground'>
          Veja abaixo as suas refeições.
        </p>
      </div>
      <Separator />
      <Accordion type='single' collapsible className='w-full'>
        {meals.map((meal) => (
          <AccordionItem
            onClick={() => handleClickItem(meal.list_id)}
            key={meal.list_id}
            value={meal.name}
          >
            <AccordionTrigger>{meal.name}</AccordionTrigger>
            <AccordionContent>
              {mealsInfo.has(meal.list_id) ? (
                <MealInfo
                  info={mealsInfo.get(meal.list_id)!}
                  onDelete={() => handleDeleteItem(meal.list_id)}
                />
              ) : (
                <MealInfo.FallBack />
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Home;
