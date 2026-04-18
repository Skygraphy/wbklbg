import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { ADMIN_PASSWORD, ADMIN_SESSION_SECRET } from '$env/static/private';

export const load: PageServerLoad = async ({ cookies }) => {
	if (cookies.get('admin_session') === ADMIN_SESSION_SECRET) {
		redirect(302, '/admin');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const password = data.get('password') as string;

		if (!password || password !== ADMIN_PASSWORD) {
			return fail(401, { error: 'Falsches Passwort.' });
		}

		cookies.set('admin_session', ADMIN_SESSION_SECRET, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
			maxAge: 60 * 60 * 24 * 7 // 7 Tage
		});

		redirect(302, '/admin');
	}
};
