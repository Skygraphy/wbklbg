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
		SELECT id, name, date_from::text, date_to::text, active, address, note, icon
		FROM popup_stands
		WHERE active = true AND COALESCE(date_to, date_from) >= CURRENT_DATE
		ORDER BY sort_order ASC, date_from ASC
	`;
	return rows as PopupStand[];
}

export async function getAllPopupStands(): Promise<PopupStand[]> {
	const rows = await sql`
		SELECT id, name, date_from::text, date_to::text, active, address, note, icon
		FROM popup_stands
		ORDER BY sort_order ASC, date_from ASC
	`;
	return rows as PopupStand[];
}

export async function createPopupStand(data: Omit<PopupStand, 'id'>): Promise<PopupStand> {
	const [{ maxOrder }] = await sql`SELECT COALESCE(MAX(sort_order), 0) AS "maxOrder" FROM popup_stands`;
	const [row] = await sql`
		INSERT INTO popup_stands (name, date_from, date_to, active, address, note, icon, sort_order)
		VALUES (${data.name}, ${data.date_from}, ${data.date_to ?? null}, ${data.active ?? true},
		        ${data.address ?? null}, ${data.note ?? null}, ${data.icon ?? null}, ${maxOrder + 1})
		RETURNING id, name, date_from::text, date_to::text, active, address, note, icon
	`;
	return row as PopupStand;
}

export async function updatePopupStand(id: number, data: Omit<PopupStand, 'id'>): Promise<PopupStand> {
	const [row] = await sql`
		UPDATE popup_stands
		SET name = ${data.name}, date_from = ${data.date_from}, date_to = ${data.date_to ?? null},
		    active = ${data.active}, address = ${data.address ?? null}, note = ${data.note ?? null},
		    icon = ${data.icon ?? null}
		WHERE id = ${id}
		RETURNING id, name, date_from::text, date_to::text, active, address, note, icon
	`;
	return row as PopupStand;
}

export async function togglePopupStand(id: number, active: boolean): Promise<void> {
	await sql`UPDATE popup_stands SET active = ${active} WHERE id = ${id}`;
}

export async function deletePopupStand(id: number): Promise<void> {
	await sql`DELETE FROM popup_stands WHERE id = ${id}`;
}

export async function swapSortOrder(table: 'popup_stands' | 'promotions' | 'pickup_locations', idA: number, idB: number): Promise<void> {
	// Neon tagged templates don't support dynamic identifiers via sql(table),
	// so we use explicit per-table queries.
	let rows: { id: number; sort_order: number | null }[];
	if (table === 'popup_stands') {
		rows = await sql`SELECT id, sort_order FROM popup_stands WHERE id IN (${idA}, ${idB})` as typeof rows;
	} else if (table === 'promotions') {
		rows = await sql`SELECT id, sort_order FROM promotions WHERE id IN (${idA}, ${idB})` as typeof rows;
	} else {
		rows = await sql`SELECT id, sort_order FROM pickup_locations WHERE id IN (${idA}, ${idB})` as typeof rows;
	}
	if (rows.length !== 2) return;
	const [a, b] = rows;
	// Fall back to id if sort_order was never initialized for a row
	const orderA = a.sort_order ?? a.id;
	const orderB = b.sort_order ?? b.id;
	if (table === 'popup_stands') {
		await sql`UPDATE popup_stands SET sort_order = ${orderB} WHERE id = ${a.id}`;
		await sql`UPDATE popup_stands SET sort_order = ${orderA} WHERE id = ${b.id}`;
	} else if (table === 'promotions') {
		await sql`UPDATE promotions SET sort_order = ${orderB} WHERE id = ${a.id}`;
		await sql`UPDATE promotions SET sort_order = ${orderA} WHERE id = ${b.id}`;
	} else {
		await sql`UPDATE pickup_locations SET sort_order = ${orderB} WHERE id = ${a.id}`;
		await sql`UPDATE pickup_locations SET sort_order = ${orderA} WHERE id = ${b.id}`;
	}
}

// ─── Promotions ──────────────────────────────────────────────────────────────

export async function getActivePromotions(): Promise<Promotion[]> {
	const rows = await sql`
		SELECT id, icon, valid_from::text, valid_to::text, name, active,
		       price1_qty, price1_amt, price2_qty, price2_amt, price3_qty, price3_amt, note
		FROM promotions
		WHERE active = true AND valid_to >= CURRENT_DATE
		ORDER BY sort_order ASC
		LIMIT 1
	`;
	return rows as Promotion[];
}

export async function getAllPromotions(): Promise<Promotion[]> {
	const rows = await sql`
		SELECT id, icon, valid_from::text, valid_to::text, name, active,
		       price1_qty, price1_amt, price2_qty, price2_amt, price3_qty, price3_amt, note
		FROM promotions
		ORDER BY sort_order ASC
	`;
	return rows as Promotion[];
}

export async function createPromotion(data: Omit<Promotion, 'id'>): Promise<Promotion> {
	const [{ maxOrder }] = await sql`SELECT COALESCE(MAX(sort_order), 0) AS "maxOrder" FROM promotions`;
	const [row] = await sql`
		INSERT INTO promotions
			(icon, valid_from, valid_to, name, active, sort_order,
			 price1_qty, price1_amt, price2_qty, price2_amt, price3_qty, price3_amt, note)
		VALUES
			(${data.icon}, ${data.valid_from}, ${data.valid_to}, ${data.name}, ${data.active ?? true}, ${maxOrder + 1},
			 ${data.price1_qty ?? null}, ${data.price1_amt ?? null},
			 ${data.price2_qty ?? null}, ${data.price2_amt ?? null},
			 ${data.price3_qty ?? null}, ${data.price3_amt ?? null},
			 ${data.note ?? null})
		RETURNING id, icon, valid_from::text, valid_to::text, name, active,
		          price1_qty, price1_amt, price2_qty, price2_amt, price3_qty, price3_amt, note
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
			price3_qty = ${data.price3_qty ?? null}, price3_amt = ${data.price3_amt ?? null},
			note = ${data.note ?? null}
		WHERE id = ${id}
		RETURNING id, icon, valid_from::text, valid_to::text, name, active,
		          price1_qty, price1_amt, price2_qty, price2_amt, price3_qty, price3_amt, note
	`;
	return row as Promotion;
}

export async function togglePromotion(id: number, active: boolean): Promise<void> {
	await sql`UPDATE promotions SET active = ${active} WHERE id = ${id}`;
}

export async function deactivateAllPromotions(exceptId?: number): Promise<void> {
	if (exceptId) {
		await sql`UPDATE promotions SET active = false WHERE id != ${exceptId}`;
	} else {
		await sql`UPDATE promotions SET active = false`;
	}
}

export async function deletePromotion(id: number): Promise<void> {
	await sql`DELETE FROM promotions WHERE id = ${id}`;
}

// ─── Pickup Locations ────────────────────────────────────────────────────────

export async function getPickupLocations(): Promise<PickupLocation[]> {
	const rows = await sql`
		SELECT id, name, active, address, email, phone, icon, note
		FROM pickup_locations
		WHERE active = true
		ORDER BY sort_order ASC
	`;
	return rows as PickupLocation[];
}

export async function getAllPickupLocations(): Promise<PickupLocation[]> {
	const rows = await sql`
		SELECT id, name, active, address, email, phone, icon, note
		FROM pickup_locations
		ORDER BY sort_order ASC
	`;
	return rows as PickupLocation[];
}

export async function createPickupLocation(data: Omit<PickupLocation, 'id'>): Promise<PickupLocation> {
	const [{ maxOrder }] = await sql`SELECT COALESCE(MAX(sort_order), 0) AS "maxOrder" FROM pickup_locations`;
	const [row] = await sql`
		INSERT INTO pickup_locations (name, active, address, email, phone, icon, note, sort_order)
		VALUES (${data.name}, ${data.active ?? true}, ${data.address ?? null}, ${data.email ?? null}, ${data.phone ?? null}, ${data.icon ?? null}, ${data.note ?? null}, ${maxOrder + 1})
		RETURNING id, name, active, address, email, phone, icon, note
	`;
	return row as PickupLocation;
}

export async function updatePickupLocation(id: number, data: Omit<PickupLocation, 'id'>): Promise<PickupLocation> {
	const [row] = await sql`
		UPDATE pickup_locations
		SET name = ${data.name}, active = ${data.active},
		    address = ${data.address ?? null}, email = ${data.email ?? null},
		    phone = ${data.phone ?? null}, icon = ${data.icon ?? null},
		    note = ${data.note ?? null}
		WHERE id = ${id}
		RETURNING id, name, active, address, email, phone, icon, note
	`;
	return row as PickupLocation;
}

export async function togglePickupLocation(id: number, active: boolean): Promise<void> {
	await sql`UPDATE pickup_locations SET active = ${active} WHERE id = ${id}`;
}

export async function deletePickupLocation(id: number): Promise<void> {
	await sql`DELETE FROM pickup_locations WHERE id = ${id}`;
}

// ─── Contact Submissions ─────────────────────────────────────────────────────

export async function saveContactSubmission(data: {
	name: string;
	email: string;
	subject: string | null;
	qty: string | null;
	message: string | null;
}): Promise<void> {
	await sql`
		INSERT INTO contact_submissions (name, email, subject, qty, message)
		VALUES (${data.name}, ${data.email}, ${data.subject}, ${data.qty}, ${data.message})
	`;
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
	const rows = await sql`
		SELECT id, name, email, subject, qty, message, submitted_at::text
		FROM contact_submissions
		ORDER BY submitted_at DESC
	`;
	return rows as ContactSubmission[];
}

export async function deleteContactSubmission(id: number): Promise<void> {
	await sql`DELETE FROM contact_submissions WHERE id = ${id}`;
}

// ─── Settings ────────────────────────────────────────────────────────────────

export type SettingKey =
	| 'standard_price'
	| 'order_prefill_message'
	| 'promotion_message'
	| 'promotion_inquiry_message'
	| 'contact_email'
	| 'contact_isbn'
	| 'maintenance_mode'
	| 'impressum_name'
	| 'impressum_address'
	| 'impressum_email'
	| 'impressum_business';

export async function getSetting(key: SettingKey): Promise<string | null> {
	const [row] = await sql`SELECT value FROM settings WHERE key = ${key}`;
	return row?.value ?? null;
}

export async function getSettings<K extends SettingKey>(keys: K[]): Promise<Record<K, string | null>> {
	const rows = await sql`SELECT key, value FROM settings WHERE key = ANY(${keys})`;
	const map = Object.fromEntries(rows.map((r) => [r.key, r.value])) as Record<K, string | null>;
	return Object.fromEntries(keys.map((k) => [k, map[k] ?? null])) as Record<K, string | null>;
}

export async function updateSetting(key: SettingKey, value: string): Promise<void> {
	await sql`INSERT INTO settings (key, value) VALUES (${key}, ${value}) ON CONFLICT (key) DO UPDATE SET value = ${value}`;
}
