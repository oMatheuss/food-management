import { createBrowserRouter, redirect } from 'react-router-dom';
import Home, { loader as HomeLoader } from '@/pages/home';
import Login, { action as LoginAction } from '@/pages/login';
import Layout from '@/components/layout';
import Foods, { loader as FoodsLoader } from '@/pages/foods';
import Settings from '@/pages/settings';
import UserMeals from '@/pages/meals';
import Error from '@/pages/error';
import { logout } from './lib/utils';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: HomeLoader,
      },
      {
        path: '/foods',
        element: <Foods />,
        loader: FoodsLoader,
      },
      {
        path: '/meals',
        element: <UserMeals />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
    action: LoginAction,
    index: true,
  },
  {
    path: 'logout',
    errorElement: <Error />,
    loader: async () => {
      await logout();
      return redirect('/login');
    },
  },
]);

export default router;
