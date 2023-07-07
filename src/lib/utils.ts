import { User } from '@/types/User';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { api } from './api';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUser() {
  let user_str = localStorage.getItem('usuario');
  if (!user_str) return null;
  return JSON.parse(user_str) as User;
}

export async function logout() {
  let res = await api.post('api/logout', {});
  if (res.ok) {
    localStorage.removeItem('usuario');
  } else {
    throw new Error('Erro ao realizar logout!');
  }
}

export const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
};
