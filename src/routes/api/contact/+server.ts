import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Resend } from 'resend';
import { RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_EMAIL } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: RequestHandler = async ({ request }) => {
	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		throw error(400, { message: 'Ungültige Anfrage.' });
	}

	const { name, email, qty, message, website } = body as Record<string, string>;

	// Honeypot check
	if (website) {
		return json({ success: true }); // silently discard
	}

	// Validation
	if (!name?.trim() || !email?.trim() || !qty) {
		throw error(400, { message: 'Bitte fülle alle Pflichtfelder aus.' });
	}
	if (!emailRegex.test(email)) {
		throw error(400, { message: 'Bitte gib eine gültige E-Mail-Adresse ein.' });
	}
	if (!['1', '3'].includes(qty)) {
		throw error(400, { message: 'Ungültige Anzahl.' });
	}

	const priceMap: Record<string, string> = { '1': '€ 39', '3': '€ 109' };
	const price = priceMap[qty];

	const { error: sendError } = await resend.emails.send({
		from: RESEND_FROM_EMAIL,
		to: RESEND_TO_EMAIL,
		replyTo: email,
		subject: `📚 Neue Bestellung – ${qty}x Wimmelbuch von ${name}`,
		html: `
			<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px;">
				<h1 style="color: #3D2B1F; font-size: 24px; margin-bottom: 8px;">
					Neue Bestellung – Wimmelbuch Klosterneuburg
				</h1>
				<hr style="border: 1px solid #EDD9BA; margin-bottom: 24px;" />

				<table style="width: 100%; border-collapse: collapse;">
					<tr>
						<td style="padding: 8px 0; color: #6B4C38; font-weight: bold; width: 140px;">Name:</td>
						<td style="padding: 8px 0; color: #3D2B1F;">${name}</td>
					</tr>
					<tr>
						<td style="padding: 8px 0; color: #6B4C38; font-weight: bold;">E-Mail:</td>
						<td style="padding: 8px 0; color: #3D2B1F;">
							<a href="mailto:${email}" style="color: #D97706;">${email}</a>
						</td>
					</tr>
					<tr>
						<td style="padding: 8px 0; color: #6B4C38; font-weight: bold;">Anzahl:</td>
						<td style="padding: 8px 0; color: #3D2B1F;">${qty} Exemplar${qty === '1' ? '' : 'e'} – ${price}</td>
					</tr>
					${
						message
							? `<tr>
							<td style="padding: 8px 0; color: #6B4C38; font-weight: bold; vertical-align: top;">Nachricht:</td>
							<td style="padding: 8px 0; color: #3D2B1F;">${message.replace(/\n/g, '<br/>')}</td>
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
