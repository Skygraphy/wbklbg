import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getAllPopupStands, createPopupStand, updatePopupStand, deletePopupStand } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	return { stands: await getAllPopupStands() };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const d = await request.formData();
		const name = (d.get('name') as string)?.trim();
		const date = d.get('date') as string;
		const address = (d.get('address') as string)?.trim() || null;
		const note = (d.get('note') as string)?.trim() || null;
		if (!name || !date) return fail(400, { error: 'Name und Datum sind Pflichtfelder.' });
		await createPopupStand({ name, date, address, note });
	},
	update: async ({ request }) => {
		const d = await request.formData();
		const id = parseInt(d.get('id') as string);
		const name = (d.get('name') as string)?.trim();
		const date = d.get('date') as string;
		const address = (d.get('address') as string)?.trim() || null;
		const note = (d.get('note') as string)?.trim() || null;
		if (!id || !name || !date) return fail(400, { error: 'Ungültige Daten.' });
		await updatePopupStand(id, { name, date, address, note });
	},
	delete: async ({ request }) => {
		const d = await request.formData();
		const id = parseInt(d.get('id') as string);
		if (!id) return fail(400, { error: 'Ungültige ID.' });
		await deletePopupStand(id);
	}
};
