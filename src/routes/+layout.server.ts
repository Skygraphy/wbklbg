import type { LayoutServerLoad } from './$types';
import { getPopupStands, getPickupLocations, getActivePromotions } from '$lib/server/db';

export const load: LayoutServerLoad = async () => {
	try {
		const [popupStands, pickupLocations, promotions] = await Promise.all([
			getPopupStands(),
			getPickupLocations(),
			getActivePromotions()
		]);
		return { popupStands, pickupLocations, promotions };
	} catch {
		return { popupStands: [], pickupLocations: [], promotions: [] };
	}
};
