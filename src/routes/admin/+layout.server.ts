import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { ADMIN_SESSION_SECRET } from '$env/static/private';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	if (url.pathname === '/admin/login') return {};

	if (cookies.get('admin_session') !== ADMIN_SESSION_SECRET) {
		redirect(302, '/admin/login');
	}
};
