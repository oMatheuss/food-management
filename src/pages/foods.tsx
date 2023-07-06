import FoodDataTable from '@/components/food-datatable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { api } from '@/lib/api';
import { Food } from '@/types/Food';
import { Loader2, Search } from 'lucide-react';
import { Form, useLoaderData, useNavigation } from 'react-router-dom';
import type { LoaderFunction } from 'react-router-dom';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const query = searchParams.get('q');
  if (!query || query.length < 1) {
    return [];
  }
  return api.get(`/api/foods?q=${query}`);
};

const Foods = () => {
  const foods = useLoaderData() as Food[];
  const { state } = useNavigation();

  return (
    <div className='space-y-6 max-w-prose mx-3 sm:mx-auto'>
      <div>
        <h3 className='text-lg font-medium'>Catálago</h3>
        <p className='text-sm text-muted-foreground'>
          Pesquise por alimentos especificos no nosso catálago.
        </p>
      </div>
      <Separator />
      <Form>
        <Label htmlFor='name'>Nome</Label>
        <div className='flex flex-row'>
          <Input
            name='q'
            type='text'
            className='rounded-e-none z-10'
            autoComplete='off'
          />
          <Button
            type='submit'
            className='rounded-s-none'
            disabled={state === 'loading'}
          >
            {state === 'loading' ? (
              <Loader2 className='animate-spin' />
            ) : (
              <Search />
            )}
          </Button>
        </div>
        <span className='text-muted-foreground text-xs'>
          Pesquise alimentos pelo nome.
        </span>
      </Form>
      <FoodDataTable data={foods} />
    </div>
  );
};

export default Foods;
