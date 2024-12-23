import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const fullName = formData.get('fullName') as string;
    const companyName = formData.get('companyName') as string;
    const website = formData.get('website') as string;

    if (!fullName || !companyName || !website) {
      return fail(400, {
        error: 'All fields are required',
        values: { fullName, companyName, website }
      });
    }

    const { error: err } = await locals.supabase
      .from('profiles')
      .update({
        full_name: fullName,
        company_name: companyName,
        website: website,
        updated_at: new Date()
      })
      .eq('id', locals.user.id);

    if (err) {
      return fail(500, {
        error: 'Error updating profile',
        values: { fullName, companyName, website }
      });
    }

    return { success: true };
  }
} satisfies Actions; 