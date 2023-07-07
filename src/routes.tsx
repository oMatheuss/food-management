import { createBrowserRouter, redirect } from 'react-router-dom';
import Layout from '@/components/layout';
import Home, { loader as HomeLoader } from '@/pages/home';
import Login from '@/pages/login';
import Foods, { loader as FoodsLoader } from '@/pages/foods';
import Settings from '@/pages/settings';
import UserMeals from '@/pages/meals';
import Error from '@/pages/error';
import Register from '@/pages/register';
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
  {
    path: 'register',
    errorElement: <Error />,
    element: <Register />,
  },
]);

export default router;
