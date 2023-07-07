import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AtSign, Lock, LogIn, Mail, User as UserIcon } from 'lucide-react';
import { Form, Link, useNavigate } from 'react-router-dom';
import backgroud from '@/assets/login-bg.jpg';
import { api } from '@/lib/api';
import { useState } from 'react';

type ErrorMessage = { message: string };

const Register = () => {
  const navigate = useNavigate();
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState<ErrorMessage | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);

    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');

    if (password !== confirmPassword) {
      setError({ message: 'As senhas diferem!' });
      return;
    }

    setError(null);
    setFetching(true);
    const response = await api
      .post('api/register', {
        name: formData.get('name'),
        username: formData.get('username'),
        email: formData.get('email'),
        password: password,
      })
      .finally(() => setFetching(false));

    if (response.ok) {
      const user = await response.text();
      localStorage.setItem('usuario', user);
      navigate('/');
    } else {
      const defaultMessage = 'Erro ao criar conta!';
      const error = { message: '' };
      error.message = await response
        .json()
        .then((x) => x.message ?? defaultMessage)
        .catch(() => defaultMessage);
      setError(error);
    }
  };

  return (
    <div className='antialiased relative min-h-screen flex justify-center font-comfortaa'>
      <img
        src={backgroud}
        className='absolute w-full h-full object-center object-cover'
      />
      <div className='z-10 w-full max-w-lg mx-3 my-auto sm:m-auto p-8 rounded-3xl bg-gray-100 bg-opacity-90'>
        <h1 className='text-3xl mb-3 rounded'>Registro</h1>
        <Form method='post' onSubmit={handleSubmit} className='w-full'>
          <div className='mb-3 relative'>
            <UserIcon className='absolute w-6 top-1/2 transform -translate-y-1/2 left-1 text-slate-700' />
            <Input
              type='text'
              name='name'
              placeholder='Nome'
              className='ps-7 border-slate-500'
              required
            />
          </div>

          <div className='mb-3 relative'>
            <AtSign className='absolute w-6 top-1/2 transform -translate-y-1/2 left-1 text-slate-700' />
            <Input
              type='text'
              name='username'
              pattern='[\w\.]{3,16}'
              placeholder='Username'
              className='ps-7 border-slate-500'
              required
            />
          </div>

          <div className='mb-3 relative'>
            <Mail className='absolute w-6 top-1/2 transform -translate-y-1/2 left-1 text-slate-700' />
            <Input
              type='email'
              name='email'
              placeholder='Email'
              className='ps-7 border-slate-500'
              required
            />
          </div>

          <div className='mb-3 relative'>
            <Lock className='absolute w-6 top-1/2 transform -translate-y-1/2 left-1 text-slate-700' />
            <Input
              type='password'
              name='password'
              placeholder='Senha'
              className='ps-7 border-slate-500'
              required
            />
          </div>

          <div className='mb-3 relative'>
            <Lock className='absolute w-6 top-1/2 transform -translate-y-1/2 left-1 text-slate-700' />
            <Input
              type='password'
              name='confirm-password'
              placeholder='Confirmar Senha'
              className='ps-7 border-slate-500'
              required
            />
          </div>

          {error ? (
            <div className='mb-3 text-red-400 text-sm'>{error.message}</div>
          ) : null}

          <Button className='w-full mb-3' type='submit' disabled={isFetching}>
            <LogIn className='h-6 w-6 mr-2' />
            Entrar
          </Button>
        </Form>

        <p className='text-center'>
          Já possui uma conta?{' '}
          <Link to='/login' className='text-green-700 hover:underline'>
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
