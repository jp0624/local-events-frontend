export interface Venue {
	id: string;
	name: string;
	address?: string;
	city?: string;
	province?: string;
	postalCode?: string;
	lat?: number;
	lng?: number;
	organizerId?: string;
}
