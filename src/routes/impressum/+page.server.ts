import type { PageServerLoad } from './$types';
import { getSetting } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const [name, address, email, business] = await Promise.all([
		getSetting('impressum_name'),
		getSetting('impressum_address'),
		getSetting('impressum_email'),
		getSetting('impressum_business'),
	]);
	return {
		name: name ?? '',
		address: address ?? '',
		email: email ?? '',
		business: business ?? '',
	};
};
