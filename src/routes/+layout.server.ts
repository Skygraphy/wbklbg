import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	try {
		// Dynamic import to avoid build errors when NEON_DATABASE_URL is not set
		const { getPopupStands } = await import('$lib/server/db');
		const popupStands = await getPopupStands();
		return { popupStands };
	} catch {
		// Return empty array if DB is not configured yet
		return { popupStands: [] };
	}
};
