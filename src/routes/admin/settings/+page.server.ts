import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getSetting, updateSetting } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const [standardPrice, orderPrefillMessage, promotionMessage, promotionInquiryMessage,
		impressumName, impressumAddress, impressumEmail, impressumBusiness,
		contactEmail, contactIsbn] = await Promise.all([
		getSetting('standard_price'),
		getSetting('order_prefill_message'),
		getSetting('promotion_message'),
		getSetting('promotion_inquiry_message'),
		getSetting('impressum_name'),
		getSetting('impressum_address'),
		getSetting('impressum_email'),
		getSetting('impressum_business'),
		getSetting('contact_email'),
		getSetting('contact_isbn'),
	]);
	return {
		standardPrice: parseFloat(standardPrice ?? '39'),
		orderPrefillMessage: orderPrefillMessage ?? '',
		promotionMessage: promotionMessage ?? '',
		promotionInquiryMessage: promotionInquiryMessage ?? '',
		impressumName: impressumName ?? '',
		impressumAddress: impressumAddress ?? '',
		impressumEmail: impressumEmail ?? '',
		impressumBusiness: impressumBusiness ?? '',
		contactEmail: contactEmail ?? 'kontakt@wimmelbuch-klosterneuburg.at',
		contactIsbn: contactIsbn ?? '',
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const d = await request.formData();

		const raw = (d.get('standard_price') as string)?.trim();
		const value = parseFloat(raw);
		if (isNaN(value) || value <= 0) return fail(400, { error: 'Ungültiger Preis.' });

		await Promise.all([
			updateSetting('standard_price', value.toString()),
			updateSetting('order_prefill_message', (d.get('order_prefill_message') as string)?.trim() ?? ''),
			updateSetting('promotion_message', (d.get('promotion_message') as string)?.trim() ?? ''),
			updateSetting('promotion_inquiry_message', (d.get('promotion_inquiry_message') as string)?.trim() ?? ''),
			updateSetting('impressum_name', (d.get('impressum_name') as string)?.trim() ?? ''),
			updateSetting('impressum_address', (d.get('impressum_address') as string)?.trim() ?? ''),
			updateSetting('impressum_email', (d.get('impressum_email') as string)?.trim() ?? ''),
			updateSetting('impressum_business', (d.get('impressum_business') as string)?.trim() ?? ''),
			updateSetting('contact_email', (d.get('contact_email') as string)?.trim() ?? ''),
			updateSetting('contact_isbn', (d.get('contact_isbn') as string)?.trim() ?? ''),
		]);

		return { success: true };
	}
};
