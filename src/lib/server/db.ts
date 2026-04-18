import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '$env/static/private';
import type { PopupStand } from '$lib/types/popup-stand';
import type { PickupLocation } from '$lib/types/pickup-location';
import type { Promotion } from '$lib/types/promotion';
import type { ContactSubmission } from '$lib/types/contact-submission';

const sql = neon(DATABASE_URL);

// ─── Popup Stands ────────────────────────────────────────────────────────────

export async function getPopupStands(): Promise<PopupStand[]> {
	const rows = await sql`
		SELECT id, name, date::text, address, note
		FROM popup_stands
		WHERE date >= CURRENT_DATE
		ORDER BY date ASC
	`;
	return rows as PopupStand[];
}

export async function getAllPopupStands(): Promise<PopupStand[]> {
	const rows = await sql`
		SELECT id, name, date::text, address, note
		FROM popup_stands
		ORDER BY date ASC
	`;
	return rows as PopupStand[];
}

export async function createPopupStand(data: Omit<PopupStand, 'id'>): Promise<PopupStand> {
	const [row] = await sql`
		INSERT INTO popup_stands (name, date, address, note)
		VALUES (${data.name}, ${data.date}, ${data.address ?? null}, ${data.note ?? null})
		RETURNING id, name, date::text, address, note
	`;
	return row as PopupStand;
}

export async function updatePopupStand(id: number, data: Omit<PopupStand, 'id'>): Promise<PopupStand> {
	const [row] = await sql`
		UPDATE popup_stands
		SET name = ${data.name}, date = ${data.date},
		    address = ${data.address ?? null}, note = ${data.note ?? null}
		WHERE id = ${id}
		RETURNING id, name, date::text, address, note
	`;
	return row as PopupStand;
}

export async function deletePopupStand(id: number): Promise<void> {
	await sql`DELETE FROM popup_stands WHERE id = ${id}`;
}

// ─── Promotions ──────────────────────────────────────────────────────────────

const PROMOTION_COLS = sql`id, icon, valid_from::text, valid_to::text, name, active,
	price1_qty, price1_amt, price2_qty, price2_amt, price3_qty, price3_amt`;

export async function getActivePromotions(): Promise<Promotion[]> {
	const rows = await sql`
		SELECT id, icon, valid_from::text, valid_to::text, name, active,
		       price1_qty, price1_amt, price2_qty, price2_amt, price3_qty, price3_amt
		FROM promotions
		WHERE valid_from <= CURRENT_DATE AND valid_to >= CURRENT_DATE AND active = true
		ORDER BY valid_from ASC
	`;
	return rows as Promotion[];
}

export async function getAllPromotions(): Promise<Promotion[]> {
	const rows = await sql`
		SELECT id, icon, valid_from::text, valid_to::text, name, active,
		       price1_qty, price1_amt, price2_qty, price2_amt, price3_qty, price3_amt
		FROM promotions
		ORDER BY valid_from DESC
	`;
	return rows as Promotion[];
}

export async function createPromotion(data: Omit<Promotion, 'id'>): Promise<Promotion> {
	const [row] = await sql`
		INSERT INTO promotions
			(icon, valid_from, valid_to, name, active,
			 price1_qty, price1_amt, price2_qty, price2_amt, price3_qty, price3_amt)
		VALUES
			(${data.icon}, ${data.valid_from}, ${data.valid_to}, ${data.name}, ${data.active ?? true},
			 ${data.price1_qty ?? null}, ${data.price1_amt ?? null},
			 ${data.price2_qty ?? null}, ${data.price2_amt ?? null},
			 ${data.price3_qty ?? null}, ${data.price3_amt ?? null})
		RETURNING id, icon, valid_from::text, valid_to::text, name, active,
		          price1_qty, price1_amt, price2_qty, price2_amt, price3_qty, price3_amt
	`;
	return row as Promotion;
}

export async function updatePromotion(id: number, data: Omit<Promotion, 'id'>): Promise<Promotion> {
	const [row] = await sql`
		UPDATE promotions SET
			icon = ${data.icon}, valid_from = ${data.valid_from}, valid_to = ${data.valid_to},
			name = ${data.name}, active = ${data.active},
			price1_qty = ${data.price1_qty ?? null}, price1_amt = ${data.price1_amt ?? null},
			price2_qty = ${data.price2_qty ?? null}, price2_amt = ${data.price2_amt ?? null},
			price3_qty = ${data.price3_qty ?? null}, price3_amt = ${data.price3_amt ?? null}
		WHERE id = ${id}
		RETURNING id, icon, valid_from::text, valid_to::text, name, active,
		          price1_qty, price1_amt, price2_qty, price2_amt, price3_qty, price3_amt
	`;
	return row as Promotion;
}

export async function togglePromotion(id: number, active: boolean): Promise<void> {
	await sql`UPDATE promotions SET active = ${active} WHERE id = ${id}`;
}

export async function deletePromotion(id: number): Promise<void> {
	await sql`DELETE FROM promotions WHERE id = ${id}`;
}

// ─── Pickup Locations ────────────────────────────────────────────────────────

export async function getPickupLocations(): Promise<PickupLocation[]> {
	const rows = await sql`
		SELECT id, name, address, email, phone
		FROM pickup_locations
		ORDER BY id ASC
	`;
	return rows as PickupLocation[];
}

export async function createPickupLocation(data: Omit<PickupLocation, 'id'>): Promise<PickupLocation> {
	const [row] = await sql`
		INSERT INTO pickup_locations (name, address, email, phone)
		VALUES (${data.name}, ${data.address ?? null}, ${data.email ?? null}, ${data.phone ?? null})
		RETURNING id, name, address, email, phone
	`;
	return row as PickupLocation;
}

export async function updatePickupLocation(id: number, data: Omit<PickupLocation, 'id'>): Promise<PickupLocation> {
	const [row] = await sql`
		UPDATE pickup_locations
		SET name = ${data.name}, address = ${data.address ?? null},
		    email = ${data.email ?? null}, phone = ${data.phone ?? null}
		WHERE id = ${id}
		RETURNING id, name, address, email, phone
	`;
	return row as PickupLocation;
}

export async function deletePickupLocation(id: number): Promise<void> {
	await sql`DELETE FROM pickup_locations WHERE id = ${id}`;
}

// ─── Contact Submissions ─────────────────────────────────────────────────────

export async function saveContactSubmission(data: {
	name: string;
	email: string;
	qty: string | null;
	message: string | null;
}): Promise<void> {
	await sql`
		INSERT INTO contact_submissions (name, email, qty, message)
		VALUES (${data.name}, ${data.email}, ${data.qty ?? null}, ${data.message ?? null})
	`;
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
	const rows = await sql`
		SELECT id, name, email, qty, message, submitted_at::text
		FROM contact_submissions
		ORDER BY submitted_at DESC
	`;
	return rows as ContactSubmission[];
}
