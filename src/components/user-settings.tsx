import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';
import { User } from '@/types/User';
import { Form } from 'react-router-dom';

interface UserSettingsProps {
  user: User;
  onUpdate: (e: React.FormEvent<HTMLFormElement>) => void;
  isFetching: boolean;
}

const UserSettings = ({ user, onUpdate, isFetching }: UserSettingsProps) => {
  return (
    <Form method='put' onSubmit={onUpdate} className='flex flex-col space-y-2'>
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
        <Textarea name='bio' defaultValue='Eu tenho um computador'></Textarea>
        <span className='text-muted-foreground text-xs'>
          Você pode @mencionar outros usuários.
        </span>
      </div>
      <input type='hidden' name='id' value={user.id} />
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
