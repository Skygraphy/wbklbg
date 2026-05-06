import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getContactSubmissions, deleteContactSubmission } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	return { orders: await getContactSubmissions() };
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const d = await request.formData();
		const id = parseInt(d.get('id') as string);
		if (!id) return fail(400, { error: 'Ungültige ID.' });
		await deleteContactSubmission(id);
	}
};
