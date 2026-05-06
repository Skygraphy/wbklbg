import type { PageServerLoad } from './$types';
import { getAllPopupStands, getAllPromotions, getAllPickupLocations, getContactSubmissions } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const today = new Date().toISOString().slice(0, 10);
	const [stands, promotions, locations, orders] = await Promise.all([
		getAllPopupStands(),
		getAllPromotions(),
		getAllPickupLocations(),
		getContactSubmissions()
	]);
	return {
		counts: {
			stands: stands.length,
			standsUpcoming: stands.filter(s => s.active && (s.date_to ?? s.date_from) >= today).length,
			promotions: promotions.length,
			promotionsActive: promotions.filter(p => p.active).length,
			locations: locations.length,
			locationsActive: locations.filter(l => l.active).length,
			orders: orders.length
		},
		recentOrders: orders.slice(0, 5)
	};
};
