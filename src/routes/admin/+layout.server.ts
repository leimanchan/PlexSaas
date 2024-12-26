import type { LayoutServerLoad } from "./$types";
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
  const { session, role } = locals;

  // Log the role for debugging
  console.log('User role:', role);

  // Redirect if not authenticated or not a CSR
  if (!session || role !== 'csr') {
    throw redirect(303, '/login'); // Redirect to login page
  }

  return {
    session,
    role,
  };
}; 