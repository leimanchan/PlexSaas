import { redirect } from '@sveltejs/kit';
import { isProfileComplete } from '$lib/components/shared/users/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url, depends }) => {
  // Add dependency on session
  depends('app:session');

  // Allow access to login pages without a session
  if (url.pathname.startsWith('/login/') || url.pathname === '/auth/signout') {
    console.log('Allowing access to:', url.pathname);
    return {
      session: null,
      profile: null,
      user: null,
      role: null
    };
  }

  const { data: { session } } = await locals.supabase.auth.getSession();
  console.log('Session status:', !!session);

  // If not logged in and trying to access protected routes
  if (!session && url.pathname.startsWith('/account')) {
    throw redirect(303, '/login/sign_in');
  }

  // If logged in, get profile and role
  if (session) {
    const { data: profile } = await locals.supabase
      .from('profiles')
      .select('*, role')
      .eq('id', session.user.id)
      .single();

    return {
      session,
      profile,
      user: session.user,
      role: profile?.role || null
    };
  }

  // Default return for public routes
  return {
    session: null,
    profile: null,
    user: null,
    role: null
  };
}; 