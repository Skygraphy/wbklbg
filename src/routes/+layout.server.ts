import type { LayoutServerLoad } from './$types';
import { getPopupStands, getPickupLocations, getActivePromotions, getSettings } from '$lib/server/db';

export const load: LayoutServerLoad = async () => {
	try {
		const [popupStands, pickupLocations, promotions, settings] = await Promise.all([
			getPopupStands(),
			getPickupLocations(),
			getActivePromotions(),
			getSettings(['standard_price', 'order_prefill_message', 'promotion_message', 'promotion_inquiry_message', 'contact_email', 'contact_isbn']),
		]);
		return {
			popupStands, pickupLocations, promotions,
			standardPrice: parseFloat(settings.standard_price ?? '39'),
			orderPrefillMessage: settings.order_prefill_message ?? '',
			promotionMessage: settings.promotion_message ?? '',
			promotionInquiryMessage: settings.promotion_inquiry_message ?? '',
			contactEmail: settings.contact_email ?? 'kontakt@wimmelbuch-klosterneuburg.at',
			contactIsbn: settings.contact_isbn ?? '',
		};
	} catch (e) {
		console.error('Layout load failed:', e);
		return {
			popupStands: [],
			pickupLocations: [],
			promotions: [],
			standardPrice: 39,
			orderPrefillMessage: '',
			promotionMessage: '',
			promotionInquiryMessage: '',
			contactEmail: 'kontakt@wimmelbuch-klosterneuburg.at',
			contactIsbn: '',
		};
	}
};
