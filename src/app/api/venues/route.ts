import { fetchFromDrupal } from "@/lib/drupal";
import { Venue } from "@/types/venue";

export async function GET() {
	const data = await fetchFromDrupal<any>(
		"/jsonapi/node/venue?include=field_organizer"
	);

	const venues: Venue[] = data.data.map((item: any) => ({
		id: item.id,
		name: item.attributes.title,
		address: item.attributes.field_address?.value,
		city: item.attributes.field_city,
		province: item.attributes.field_province,
		postalCode: item.attributes.field_postal_code,
		lat: item.attributes.field_lat,
		lng: item.attributes.field_lng,
		organizerId: item.relationships.field_organizer?.data?.id,
	}));

	return Response.json(venues);
}
