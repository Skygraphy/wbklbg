import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getAllPopupStands, createPopupStand, updatePopupStand, togglePopupStand, deletePopupStand, swapSortOrder } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	return { stands: await getAllPopupStands() };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const d = await request.formData();
		const name = (d.get('name') as string)?.trim();
		const date_from = d.get('date_from') as string;
		const date_to = (d.get('date_to') as string) || null;
		const address = (d.get('address') as string)?.trim() || null;
		const note = (d.get('note') as string)?.trim() || null;
		if (!name || !date_from) return fail(400, { error: 'Name und Von-Datum sind Pflichtfelder.' });
		if (date_to && date_to < date_from) return fail(400, { error: 'Das Bis-Datum muss >= Von-Datum sein.' });
		const icon = (d.get('icon') as string)?.trim() || null;
		await createPopupStand({ name, date_from, date_to, active: true, address, note, icon });
	},
	update: async ({ request }) => {
		const d = await request.formData();
		const id = parseInt(d.get('id') as string);
		const name = (d.get('name') as string)?.trim();
		const date_from = d.get('date_from') as string;
		const date_to = (d.get('date_to') as string) || null;
		const active = d.get('active') === 'true';
		const address = (d.get('address') as string)?.trim() || null;
		const note = (d.get('note') as string)?.trim() || null;
		if (!id || !name || !date_from) return fail(400, { error: 'Ungültige Daten.' });
		if (date_to && date_to < date_from) return fail(400, { error: 'Das Bis-Datum muss >= Von-Datum sein.' });
		const icon = (d.get('icon') as string)?.trim() || null;
		await updatePopupStand(id, { name, date_from, date_to, active, address, note, icon });
	},
	toggle: async ({ request }) => {
		const d = await request.formData();
		const id = parseInt(d.get('id') as string);
		const active = d.get('active') === 'true';
		if (!id) return fail(400, { error: 'Ungültige ID.' });
		await togglePopupStand(id, active);
	},
	delete: async ({ request }) => {
		const d = await request.formData();
		const id = parseInt(d.get('id') as string);
		if (!id) return fail(400, { error: 'Ungültige ID.' });
		await deletePopupStand(id);
	},
	reorder: async ({ request }) => {
		const d = await request.formData();
		const idA = parseInt(d.get('idA') as string);
		const idB = parseInt(d.get('idB') as string);
		if (!idA || !idB) return fail(400, { error: 'Ungültige IDs.' });
		await swapSortOrder('popup_stands', idA, idB);
	}
};
