import { MainNav } from '@/components/main-nav';
import { MobileNav } from '@/components/mobile-nav';
import { api } from '@/lib/api';
import { getUser } from '@/lib/utils';
import { useEffect } from 'react';
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';

const Layout = () => {
  let navigate = useNavigate();

  useEffect(() => {
    let user = getUser();
    if (!user) {
      navigate('/login');
      return;
    }

    let unsub = api.addInterceptor((res) => {
      if (res.status === 401 || res.status === 403) {
        navigate('/login');
      }
      return res;
    });
    return unsub;
  }, []);

  return (
    <div className='font-comfortaa'>
      <div className='flex h-16 items-center mx-3'>
        <MainNav className='hidden sm:mx-auto sm:block' />
        <h1 className='sm:hidden'>Food Management</h1>
        <div className='sm:hidden ml-auto flex items-center space-x-4'>
          <MobileNav />
        </div>
      </div>
      <Outlet />
      <ScrollRestoration />
    </div>
  );
};

export default Layout;
