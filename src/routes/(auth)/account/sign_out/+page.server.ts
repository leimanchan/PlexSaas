import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  // Clear the session
  await locals.supabase.auth.signOut();
  
  // Invalidate all cookies
  const cookiesToRemove = ['sb-access-token', 'sb-refresh-token'];
  cookiesToRemove.forEach(name => {
    locals.cookies?.set(name, '', {
      path: '/',
      expires: new Date(0),
    });
  });

  throw redirect(303, '/');
}; 