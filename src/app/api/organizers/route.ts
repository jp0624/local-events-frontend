import { fetchFromDrupal } from "@/lib/drupal";
import { Organizer } from "@/types/organizer";

export async function GET() {
	const data = await fetchFromDrupal<any>("/jsonapi/node/organizer");

	const organizers: Organizer[] = data.data.map((item: any) => ({
		id: item.id,
		name: item.attributes.title,
		description: item.attributes.field_description?.value,
		website: item.attributes.field_website?.uri,
		email: item.attributes.field_email,
		phone: item.attributes.field_phone,
	}));

	return Response.json(organizers);
}
