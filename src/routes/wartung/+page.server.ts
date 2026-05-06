import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getSetting } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const [maintenance, contactEmail] = await Promise.all([
		getSetting('maintenance_mode'),
		getSetting('contact_email'),
	]);
	if (maintenance !== 'true') {
		redirect(307, '/');
	}
	return {
		contactEmail: contactEmail ?? 'kontakt@wimmelbuch-klosterneuburg.at',
	};
};
