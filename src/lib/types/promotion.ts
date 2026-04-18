export interface Promotion {
	id: number;
	icon: string;
	valid_from: string;
	valid_to: string;
	name: string;
	active: boolean;
	price1_qty: string | null;
	price1_amt: number | null;
	price2_qty: string | null;
	price2_amt: number | null;
	price3_qty: string | null;
	price3_amt: number | null;
}
