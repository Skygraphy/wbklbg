export interface ContactSubmission {
	id: number;
	name: string;
	email: string;
	subject: string | null;
	qty: string | null;
	message: string | null;
	submitted_at: string;
}
