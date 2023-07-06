import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Loader2 className='w-14 h-14 animate-spin' />
    </div>
  );
}
