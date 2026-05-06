import { writable } from 'svelte/store';

export const contactPrefill = writable<{
	subject: string;
	qty: string;
	message: string;
} | null>(null);

export function setOrderPrefill(price: number, template: string) {
	contactPrefill.set({
		subject: 'Bestellung',
		qty: '1',
		message: template.replace('{preis}', String(price))
	});
}
