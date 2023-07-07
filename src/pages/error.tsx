import { Button } from '@/components/ui/button';
import { ArrowLeftSquare, ServerCrash } from 'lucide-react';
import { Link, useRouteError } from 'react-router-dom';

export default function Error() {
  const error = useRouteError() as { message: string } | undefined;
  return (
    <div className='flex flex-col justify-center items-center font-comfortaa'>
      <ServerCrash className='text-red-500 my-5 h-14 w-14' />
      <h1 className='text-red-500 text-2xl font-extrabold text-center mb-5 max-w-xl'>
        Ops! Ocorreu algum erro.
      </h1>
      <p className='text-center mb-5 max-w-xl'>
        Um erro ocorreu na nossa aplicação. Por favor recarrege a página e em
        caso de persistência do erro contate um administrador.
      </p>
      {error && error.message && (
        <p className='text-center mb-5 max-w-xl'>{error.message}</p>
      )}
      <Button className='hover:text-yellow-200' asChild>
        <Link to='/login'>
          <ArrowLeftSquare className='mr-2' /> Voltar
        </Link>
      </Button>
    </div>
  );
}
