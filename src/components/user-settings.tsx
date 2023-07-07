import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Save, UserCircle2 } from 'lucide-react';
import { User } from '@/types/User';
import { Form } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface UserSettingsProps {
  user: User;
  onUpdate: (e: React.FormEvent<HTMLFormElement>) => void;
  isFetching: boolean;
}

const UserSettings = ({ user, onUpdate, isFetching }: UserSettingsProps) => {
  return (
    <Form
      method='put'
      onSubmit={onUpdate}
      className='flex flex-col max-w-prose mx-auto space-y-2 pb-4'
    >
      <div>
        <Label htmlFor='name'>Nome</Label>
        <Input name='name' defaultValue={user.name} type='text' />
        <span className='text-muted-foreground text-xs'>
          Esse é o nome que será exibido no seu perfil e emails.
        </span>
      </div>
      <div>
        <Label htmlFor='email'>Email</Label>
        <Input name='email' defaultValue={user.email} type='email' />
        <span className='text-muted-foreground text-xs'>
          Esse é o email para o qual enviaremos notificações importantes.
        </span>
      </div>
      <div>
        <Label htmlFor='bio'>Bio</Label>
        <Textarea name='bio' defaultValue={user.bio ?? ''}></Textarea>
        <span className='text-muted-foreground text-xs'>
          Você pode @mencionar outros usuários.
        </span>
      </div>
      <div>
        <Label htmlFor='imgUser'>Avatar</Label>
        <div className='flex flex-row items-center space-x-6'>
          <Avatar className='h-14 w-14 drag'>
            <AvatarImage src={user.avatar ?? ''} alt={user.username} />
            <AvatarFallback>
              <UserCircle2 size={56} />
            </AvatarFallback>
          </Avatar>
          <label className='block'>
            <span className='sr-only'>Choose profile photo</span>
            <input
              type='file'
              name='avatar'
              className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-comfortaa file:bg-violet-50 file:bg-primary file:text-white file:text-primary-foreground file:hover:bg-primary/90 file:cursor-pointer'
            />
          </label>
        </div>
        <span className='text-muted-foreground text-xs'>
          Uma imagem que representa você.
        </span>
      </div>
      <div>
        <Button type='submit' disabled={isFetching}>
          {!isFetching ? (
            <Save className='mr-2' />
          ) : (
            <Loader2 className='mr-2 animate-spin' />
          )}{' '}
          Salvar
        </Button>
      </div>
    </Form>
  );
};

export default UserSettings;
