import { MealFood } from '@/types/Meal';
import { Button } from './ui/button';
import { XIcon } from 'lucide-react';

interface MealInfoProps {
  info: MealFood[];
  onDelete: () => void;
}

export const MealInfo = ({ info, onDelete }: MealInfoProps) => {
  return (
    <div className='flex flex-col'>
      <ol className='list-decimal flex flex-col gap-y-2 list-inside px-3'>
        {info.map((food) => (
          <li key={food.food_id}>
            {Number(food.quantity)}g x {food.name}
          </li>
        ))}
      </ol>
      <div className='flex flex-row justify-end'>
        <Button
          onClick={onDelete}
          variant='destructive'
          size='sm'
          className='mt-3'
        >
          Apagar <XIcon />
        </Button>
      </div>
    </div>
  );
};

MealInfo.FallBack = () => {
  return <h2>🌀 Loading...</h2>;
};
