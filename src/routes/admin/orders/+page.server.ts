import type { PageServerLoad } from './$types';
import { getContactSubmissions } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	return { orders: await getContactSubmissions() };
};
