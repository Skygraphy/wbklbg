import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getAllPromotions, createPromotion, updatePromotion, togglePromotion, deletePromotion, swapSortOrder, deactivateAllPromotions } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	return { promotions: await getAllPromotions() };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const d = await request.formData();
		const name = (d.get('name') as string)?.trim();
		const icon = (d.get('icon') as string)?.trim() || '🎁';
		const valid_from = d.get('valid_from') as string;
		const valid_to = d.get('valid_to') as string;
		if (!name || !valid_from || !valid_to) return fail(400, { error: 'Pflichtfelder fehlen.' });

		await deactivateAllPromotions();
		await createPromotion({
			name, icon, valid_from, valid_to, active: true,
			price1_qty: (d.get('price1_qty') as string) || null,
			price1_amt: d.get('price1_amt') ? parseFloat(d.get('price1_amt') as string) : null,
			price2_qty: (d.get('price2_qty') as string) || null,
			price2_amt: d.get('price2_amt') ? parseFloat(d.get('price2_amt') as string) : null,
			price3_qty: (d.get('price3_qty') as string) || null,
			price3_amt: d.get('price3_amt') ? parseFloat(d.get('price3_amt') as string) : null,
			note: (d.get('note') as string)?.trim() || null,
		});
	},
	update: async ({ request }) => {
		const d = await request.formData();
		const id = parseInt(d.get('id') as string);
		const name = (d.get('name') as string)?.trim();
		const icon = (d.get('icon') as string)?.trim() || '🎁';
		const valid_from = d.get('valid_from') as string;
		const valid_to = d.get('valid_to') as string;
		const active = d.get('active') === 'true';
		if (!id || !name || !valid_from || !valid_to) return fail(400, { error: 'Ungültige Daten.' });

		if (active) await deactivateAllPromotions(id);
		await updatePromotion(id, {
			name, icon, valid_from, valid_to, active,
			price1_qty: (d.get('price1_qty') as string) || null,
			price1_amt: d.get('price1_amt') ? parseFloat(d.get('price1_amt') as string) : null,
			price2_qty: (d.get('price2_qty') as string) || null,
			price2_amt: d.get('price2_amt') ? parseFloat(d.get('price2_amt') as string) : null,
			price3_qty: (d.get('price3_qty') as string) || null,
			price3_amt: d.get('price3_amt') ? parseFloat(d.get('price3_amt') as string) : null,
			note: (d.get('note') as string)?.trim() || null,
		});
	},
	toggle: async ({ request }) => {
		const d = await request.formData();
		const id = parseInt(d.get('id') as string);
		const active = d.get('active') === 'true';
		if (!id) return fail(400, { error: 'Ungültige ID.' });
		if (active) await deactivateAllPromotions(id);
		await togglePromotion(id, active);
	},
	delete: async ({ request }) => {
		const d = await request.formData();
		const id = parseInt(d.get('id') as string);
		if (!id) return fail(400, { error: 'Ungültige ID.' });
		await deletePromotion(id);
	},
	reorder: async ({ request }) => {
		const d = await request.formData();
		const idA = parseInt(d.get('idA') as string);
		const idB = parseInt(d.get('idB') as string);
		if (!idA || !idB) return fail(400, { error: 'Ungültige IDs.' });
		await swapSortOrder('promotions', idA, idB);
	}
};
