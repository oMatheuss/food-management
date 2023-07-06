import {
  Home,
  List,
  LogOut,
  Menu,
  Settings,
  UtensilsCrossed,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { logout } from '@/lib/utils';

interface UserInfo {
  email: string;
  username: string;
}

const matheus: UserInfo = {
  email: 'matheussmoura@outlook.com',
  username: 'matheus',
};

const menuItems = [
  { title: 'Início', href: '/', icon: Home },
  { title: 'Catálago', href: '/foods', icon: List },
  { title: 'Refeições', href: '/meals', icon: UtensilsCrossed },
  { title: 'Configurações', href: '/settings', icon: Settings },
];

export function MobileNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='transition hover:scale-110'>
        <Menu className='h-8 w-8' />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-screen font-comfortaa'
        align='end'
        forceMount
      >
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {matheus.username}
            </p>
            <p className='text-xs leading-none text-muted-foreground'>
              {matheus.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menuItems.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link to={item.href}>
                <item.icon className='mr-2 h-4 w-4' />
                <span>{item.title}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-red-600' asChild>
          <Link to='/logout'>
            <LogOut className='mr-2 h-4 w-4' />
            <span>Sair</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
