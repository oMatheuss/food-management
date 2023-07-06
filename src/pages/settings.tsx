import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import UserSettings from '@/components/user-settings';
import { api } from '@/lib/api';
import type { User } from '@/types/User';
import { useMemo, useState } from 'react';

const Settings = () => {
  const { toast } = useToast();
  const [isFetching, setIsFetching] = useState(false);

  const user = useMemo(() => {
    return JSON.parse(localStorage.getItem('usuario')!) as User;
  }, []);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    setIsFetching(true);
    const response = await api.put('api/user', {
      email: formData.get('email'),
      name: formData.get('name'),
      bio: formData.get('bio'),
    });
    setIsFetching(false);

    if (response.ok) {
      toast({
        title: 'Sucesso!',
        description: 'Dados da conta editados com sucesso.',
        className: 'bg-green-200 font-comfortaa',
      });
    } else {
      toast({
        title: 'Erro!',
        description: 'Ocorreu um erro ao editar os dados da conta.',
        className: 'bg-yellow-200 font-comfortaa',
      });
    }
  };

  return (
    <div className='space-y-6 max-w-prose mx-3 sm:mx-auto'>
      <div>
        <h3 className='text-lg font-medium'>Configurações</h3>
        <p className='text-sm text-muted-foreground'>
          Gerencie as configurações da sua conta e preferencias de email
        </p>
      </div>
      <Separator />
      <UserSettings
        user={user}
        onUpdate={handleUpdate}
        isFetching={isFetching}
      />
    </div>
  );
};

export default Settings;
