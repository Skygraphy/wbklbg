import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getAllPickupLocations, createPickupLocation, updatePickupLocation, togglePickupLocation, deletePickupLocation, swapSortOrder } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	return { locations: await getAllPickupLocations() };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const d = await request.formData();
		const name = (d.get('name') as string)?.trim();
		if (!name) return fail(400, { error: 'Name ist ein Pflichtfeld.' });
		await createPickupLocation({
			name, active: true,
			address: (d.get('address') as string)?.trim() || null,
			email: (d.get('email') as string)?.trim() || null,
			phone: (d.get('phone') as string)?.trim() || null,
			icon: (d.get('icon') as string)?.trim() || null,
			note: (d.get('note') as string)?.trim() || null,
		});
	},
	update: async ({ request }) => {
		const d = await request.formData();
		const id = parseInt(d.get('id') as string);
		const name = (d.get('name') as string)?.trim();
		const active = d.get('active') === 'true';
		if (!id || !name) return fail(400, { error: 'Ungültige Daten.' });
		await updatePickupLocation(id, {
			name, active,
			address: (d.get('address') as string)?.trim() || null,
			email: (d.get('email') as string)?.trim() || null,
			phone: (d.get('phone') as string)?.trim() || null,
			icon: (d.get('icon') as string)?.trim() || null,
			note: (d.get('note') as string)?.trim() || null,
		});
	},
	toggle: async ({ request }) => {
		const d = await request.formData();
		const id = parseInt(d.get('id') as string);
		const active = d.get('active') === 'true';
		if (!id) return fail(400, { error: 'Ungültige ID.' });
		await togglePickupLocation(id, active);
	},
	delete: async ({ request }) => {
		const d = await request.formData();
		const id = parseInt(d.get('id') as string);
		if (!id) return fail(400, { error: 'Ungültige ID.' });
		await deletePickupLocation(id);
	},
	reorder: async ({ request }) => {
		const d = await request.formData();
		const idA = parseInt(d.get('idA') as string);
		const idB = parseInt(d.get('idB') as string);
		if (!idA || !idB) return fail(400, { error: 'Ungültige IDs.' });
		await swapSortOrder('pickup_locations', idA, idB);
	}
};
