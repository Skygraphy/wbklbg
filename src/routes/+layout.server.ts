import type { LayoutServerLoad } from './$types';
import { getPopupStands, getPickupLocations, getActivePromotions, getSetting } from '$lib/server/db';

export const load: LayoutServerLoad = async () => {
	try {
		const [popupStands, pickupLocations, promotions, standardPrice, orderPrefillMessage, promotionMessage, promotionInquiryMessage, contactEmail, contactIsbn] = await Promise.all([
			getPopupStands(),
			getPickupLocations(),
			getActivePromotions(),
			getSetting('standard_price'),
			getSetting('order_prefill_message'),
			getSetting('promotion_message'),
			getSetting('promotion_inquiry_message'),
			getSetting('contact_email'),
			getSetting('contact_isbn'),
		]);
		return {
			popupStands, pickupLocations, promotions,
			standardPrice: parseFloat(standardPrice ?? '39'),
			orderPrefillMessage: orderPrefillMessage ?? '',
			promotionMessage: promotionMessage ?? '',
			promotionInquiryMessage: promotionInquiryMessage ?? '',
			contactEmail: contactEmail ?? 'kontakt@wimmelbuch-klosterneuburg.at',
			contactIsbn: contactIsbn ?? '',
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
