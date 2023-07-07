import { MoveRight, UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const NoMeals = () => {
  return (
    <div className='flex flex-col justify-center items-center font-comfortaa'>
      <div className='flex flex-row space-x-5 items-center mb-5'>
        <UtensilsCrossed className='text-blue-500 h-10 w-10' />
        <h1 className='text-2xl font-extrabold text-center max-w-xl'>Hum!?</h1>
      </div>
      <p className='mb-5 max-w-xl'>
        Nenhuma refeição encontrada. Adicione algumas de suas refeições diarias
        e descubra calorias e nutrientes consumidos.
      </p>
      <Button variant='link' className='hover:text-green-700' size='sm' asChild>
        <Link to='meals'>
          Adicionar refeição <MoveRight className='ml-3' />
        </Link>
      </Button>
    </div>
  );
};

export default NoMeals;
