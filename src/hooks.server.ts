import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ resolve, event }) => {
  if (event.url.pathname.startsWith('/api')) {
    if(event.request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        }
      });
    }
  }

  let response = await resolve(event);
  if (event.url.pathname.startsWith('/api')) {
    try {
        response.headers.append('Access-Control-Allow-Origin', `*`);
    } catch (error) {
        console.log(error);
    }
  }
  return response;
};