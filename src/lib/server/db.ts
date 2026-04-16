import { neon } from '@neondatabase/serverless';
import { NEON_DATABASE_URL } from '$env/static/private';
import type { PopupStand } from '$lib/types/popup-stand';

const sql = neon(NEON_DATABASE_URL);

export async function getPopupStands(): Promise<PopupStand[]> {
	const rows = await sql`
		SELECT id, location, date::text, description
		FROM popup_stands
		WHERE date >= CURRENT_DATE
		ORDER BY date ASC
	`;
	return rows as PopupStand[];
}

export async function createPopupStand(
	data: Omit<PopupStand, 'id'>
): Promise<PopupStand> {
	const [row] = await sql`
		INSERT INTO popup_stands (location, date, description)
		VALUES (${data.location}, ${data.date}, ${data.description})
		RETURNING id, location, date::text, description
	`;
	return row as PopupStand;
}
