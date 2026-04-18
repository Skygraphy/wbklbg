export interface ContactSubmission {
	id: number;
	name: string;
	email: string;
	qty: string | null;
	message: string | null;
	submitted_at: string;
}
