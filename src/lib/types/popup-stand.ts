export interface PopupStand {
	id: number;
	name: string;
	date_from: string; // ISO date string "YYYY-MM-DD"
	date_to: string | null; // null = valid only on date_from
	active: boolean;
	address: string | null;
	note: string | null;
	icon: string | null;
}
