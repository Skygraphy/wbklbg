import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getPopupStands, createPopupStand } from '$lib/server/db';
import { POPUP_STANDS_SECRET } from '$env/static/private';

export const GET: RequestHandler = async () => {
	const stands = await getPopupStands();
	return json(stands);
};

export const POST: RequestHandler = async ({ request }) => {
	// Simple secret-header protection – replace with proper auth later
	const authHeader = request.headers.get('x-admin-secret');
	if (!authHeader || authHeader !== POPUP_STANDS_SECRET) {
		throw error(401, { message: 'Unauthorized.' });
	}

	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		throw error(400, { message: 'Ungültige Anfrage.' });
	}

	const { location, date, description } = body as Record<string, string>;

	if (!location?.trim() || !date?.trim()) {
		throw error(400, { message: 'location und date sind Pflichtfelder.' });
	}

	const stand = await createPopupStand({ location, date, description: description ?? null });
	return json(stand, { status: 201 });
};
