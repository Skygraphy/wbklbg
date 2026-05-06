import type { Handle } from '@sveltejs/kit';
import { getSetting } from '$lib/server/db';

export const handle: Handle = async ({ event, resolve }) => {
	const path = event.url.pathname;

	// Admin, maintenance page itself, impressum, and internal SvelteKit assets pass through
	if (
		path.startsWith('/admin') ||
		path === '/wartung' ||
		path === '/impressum' ||
		path.startsWith('/_app') ||
		path.startsWith('/favicon')
	) {
		return resolve(event);
	}

	try {
		const maintenance = await getSetting('maintenance_mode');
		if (maintenance === 'true') {
			if (path.startsWith('/api')) {
				return new Response(JSON.stringify({ message: 'Wartungsarbeiten laufen. Bitte später versuchen.' }), {
					status: 503,
					headers: { 'Content-Type': 'application/json' }
				});
			}
			return new Response(null, {
				status: 307,
				headers: { Location: '/wartung' }
			});
		}
	} catch {
		// DB error: let the request through normally
	}

	return resolve(event);
};
