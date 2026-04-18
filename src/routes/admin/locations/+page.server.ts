import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getPickupLocations, createPickupLocation, updatePickupLocation, deletePickupLocation } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	return { locations: await getPickupLocations() };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const d = await request.formData();
		const name = (d.get('name') as string)?.trim();
		if (!name) return fail(400, { error: 'Name ist ein Pflichtfeld.' });
		await createPickupLocation({
			name,
			address: (d.get('address') as string)?.trim() || null,
			email: (d.get('email') as string)?.trim() || null,
			phone: (d.get('phone') as string)?.trim() || null,
		});
	},
	update: async ({ request }) => {
		const d = await request.formData();
		const id = parseInt(d.get('id') as string);
		const name = (d.get('name') as string)?.trim();
		if (!id || !name) return fail(400, { error: 'Ungültige Daten.' });
		await updatePickupLocation(id, {
			name,
			address: (d.get('address') as string)?.trim() || null,
			email: (d.get('email') as string)?.trim() || null,
			phone: (d.get('phone') as string)?.trim() || null,
		});
	},
	delete: async ({ request }) => {
		const d = await request.formData();
		const id = parseInt(d.get('id') as string);
		if (!id) return fail(400, { error: 'Ungültige ID.' });
		await deletePickupLocation(id);
	}
};
