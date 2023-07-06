import { getUser } from './utils';

const getHeaders = (): HeadersInit => ({
  Authorization: getUser()?.token ?? '',
  'Content-Type': 'application/json',
});

export const api = {
  interceptors: new Set<(res: Response) => Response>(),

  addInterceptor: (fn: (res: Response) => Response) => {
    api.interceptors.add(fn);
    return () => {
      api.interceptors.delete(fn);
    };
  },

  post: async (url: string, body: any) => {
    let res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: getHeaders(),
    });
    return Array.from(api.interceptors).reduce((p, c) => c(p), res);
  },
  put: async (url: string, body: any) => {
    let res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: getHeaders(),
    });
    return Array.from(api.interceptors).reduce((p, c) => c(p), res);
  },
  get: async (url: string) => {
    let res = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
    });
    return Array.from(api.interceptors).reduce((p, c) => c(p), res);
  },
  delete: async (url: string) => {
    let res = await fetch(url, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return Array.from(api.interceptors).reduce((p, c) => c(p), res);
  },
};
