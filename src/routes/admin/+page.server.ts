import type { PageServerLoad } from './$types';
import { getAllPopupStands, getAllPromotions, getPickupLocations, getContactSubmissions } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const [stands, promotions, locations, orders] = await Promise.all([
		getAllPopupStands(),
		getAllPromotions(),
		getPickupLocations(),
		getContactSubmissions()
	]);
	return {
		counts: {
			stands: stands.length,
			promotions: promotions.length,
			promotionsActive: promotions.filter(p => p.active).length,
			locations: locations.length,
			orders: orders.length
		},
		recentOrders: orders.slice(0, 5)
	};
};
