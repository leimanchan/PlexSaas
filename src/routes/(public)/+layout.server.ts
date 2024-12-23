import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Access the user data from locals, which is set by hooks.server.ts
  const user = locals.user;

  // Return the user data to be accessible in the client-side layout
  return {
    user
  };
};