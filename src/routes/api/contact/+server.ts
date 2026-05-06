import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Resend } from 'resend';
import { RESEND_API_KEY, CONTACT_EMAIL } from '$env/static/private';
import { saveContactSubmission } from '$lib/server/db';

const resend = new Resend(RESEND_API_KEY);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_SUBJECTS = new Set(['Anfrage', 'Reservierung', 'Bestellung', 'Anderes']);

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

export const POST: RequestHandler = async ({ request }) => {
	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		throw error(400, { message: 'Ungültige Anfrage.' });
	}

	const getString = (k: string) => (typeof body[k] === 'string' ? (body[k] as string) : '');
	const name = getString('name').trim();
	const email = getString('email').trim();
	const subject = getString('subject').trim();
	const qty = getString('qty').trim();
	const message = getString('message').trim();
	const website = getString('website');

	// Honeypot check
	if (website) {
		console.warn('Honeypot triggered:', { name, email });
		return json({ success: true });
	}

	// Validation
	if (!name || !email) {
		throw error(400, { message: 'Bitte fülle alle Pflichtfelder aus.' });
	}
	if (!emailRegex.test(email)) {
		throw error(400, { message: 'Bitte gib eine gültige E-Mail-Adresse ein.' });
	}
	if (!subject || !ALLOWED_SUBJECTS.has(subject)) {
		throw error(400, { message: 'Bitte wähle einen gültigen Betreff.' });
	}
	const qtyNum = qty ? parseInt(qty, 10) : null;
	if (qtyNum !== null && (isNaN(qtyNum) || qtyNum < 1 || qtyNum > 10)) {
		throw error(400, { message: 'Ungültige Anzahl.' });
	}

	// Save to DB (non-blocking)
	saveContactSubmission({
		name,
		email,
		subject,
		qty: qty || null,
		message: message || null
	}).catch((e) => console.error('DB save error:', e));

	const qtyLine = qty
		? `${qty} Exemplar${qty === '1' ? '' : 'e'}`
		: 'Keine Angabe';

	const safeName = escapeHtml(name);
	const safeSubject = escapeHtml(subject);
	const safeEmail = escapeHtml(email);
	const safeMessage = message ? escapeHtml(message).replace(/\n/g, '<br/>') : '';
	const safeQtyLine = escapeHtml(qtyLine);

	const headerSubject = subject.replace(/[\r\n]/g, ' ');
	const headerName = name.replace(/[\r\n]/g, ' ');

	const { error: sendError } = await resend.emails.send({
		from: 'Wimmelbuch Klosterneuburg <kontakt@wimmelbuch-klosterneuburg.at>',
		to: CONTACT_EMAIL,
		replyTo: email,
		subject: `📚 ${headerSubject ? headerSubject + ' – ' : ''}Wimmelbuch von ${headerName}`,
		html: `
			<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px;">
				<h1 style="color: #3D2B1F; font-size: 24px; margin-bottom: 8px;">
					Neue Bestellung – Wimmelbuch Klosterneuburg
				</h1>
				<hr style="border: 1px solid #EDD9BA; margin-bottom: 24px;" />

				<table style="width: 100%; border-collapse: collapse;">
					<tr>
						<td style="padding: 8px 0; color: #6B4C38; font-weight: bold; width: 140px;">Name:</td>
						<td style="padding: 8px 0; color: #3D2B1F;">${safeName}</td>
					</tr>
					<tr>
						<td style="padding: 8px 0; color: #6B4C38; font-weight: bold;">Betreff:</td>
						<td style="padding: 8px 0; color: #3D2B1F;">${safeSubject}</td>
					</tr>
					<tr>
						<td style="padding: 8px 0; color: #6B4C38; font-weight: bold;">E-Mail:</td>
						<td style="padding: 8px 0; color: #3D2B1F;">
							<a href="mailto:${safeEmail}" style="color: #D97706;">${safeEmail}</a>
						</td>
					</tr>
					<tr>
						<td style="padding: 8px 0; color: #6B4C38; font-weight: bold;">Anzahl:</td>
						<td style="padding: 8px 0; color: #3D2B1F;">${safeQtyLine}</td>
					</tr>
					${
						safeMessage
							? `<tr>
							<td style="padding: 8px 0; color: #6B4C38; font-weight: bold; vertical-align: top;">Nachricht:</td>
							<td style="padding: 8px 0; color: #3D2B1F;">${safeMessage}</td>
						</tr>`
							: ''
					}
				</table>

				<hr style="border: 1px solid #EDD9BA; margin: 24px 0;" />
				<p style="color: #6B4C38; font-size: 12px;">
					Gesendet über wimmelbuch-klosterneuburg.at
				</p>
			</div>
		`
	});

	if (sendError) {
		console.error('Resend error:', sendError);
		throw error(500, { message: 'Die E-Mail konnte nicht gesendet werden. Bitte versuche es später erneut.' });
	}

	return json({ success: true });
};
