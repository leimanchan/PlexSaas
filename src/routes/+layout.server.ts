import { redirect } from '@sveltejs/kit';
import { isProfileComplete } from '$lib/components/shared/users/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const { data: { session } } = await locals.supabase.auth.getSession();

  // If not logged in and trying to access protected routes
  if (!session && url.pathname.startsWith('/account')) {
    throw redirect(303, '/login/sign_in');
  }

  // If logged in, get profile
  if (session) {
    const { data: profile } = await locals.supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    // If logged in but profile isn't complete
    // and not already on create_profile or trying to sign out
    if (!isProfileComplete(profile) && 
        !url.pathname.includes('/account/create_profile') &&
        !url.pathname.includes('/auth/signout')) {
      throw redirect(303, '/account/create_profile');
    }

    return {
      session,
      profile
    };
  }

  return {
    session: null,
    profile: null
  };
}; 