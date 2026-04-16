import type { LayoutServerLoad } from './$types';
import { getPopupStands } from '$lib/server/db';

export const load: LayoutServerLoad = async () => {
	try {
		const popupStands = await getPopupStands();
		return { popupStands };
	} catch {
		// Return empty array if DB is not configured
		return { popupStands: [] };
	}
};
