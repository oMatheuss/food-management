import { NavLink } from 'react-router-dom';

import { cn } from '@/lib/utils';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const getClassname = ({ isActive }: { isActive: boolean }) => {
    const defaultClassname = 'text-sm transition-colors hover:text-primary';
    return isActive
      ? defaultClassname
      : cn(defaultClassname, 'text-muted-foreground');
  };
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <NavLink to='/' className={getClassname}>
        Início
      </NavLink>
      <NavLink to='/foods' className={getClassname}>
        Catálago
      </NavLink>
      <NavLink to='/meals' className={getClassname}>
        Minhas Refeições
      </NavLink>
      <NavLink to='/settings' className={getClassname}>
        Configurações
      </NavLink>
      <NavLink to='/logout' className={getClassname}>
        <span className='text-red-400'>Logout</span>
      </NavLink>
    </nav>
  );
}
