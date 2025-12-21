const BASE = process.env.DRUPAL_BASE_URL;

if (!BASE) throw new Error("Missing DRUPAL_BASE_URL in .env.local");

export async function fetchEvents() {
	const url = `${BASE}/jsonapi/node/event?sort=field_start`;

	const res = await fetch(url, {
		// Server-side fetch cache; refresh every minute
		next: { revalidate: 60 },
	});

	if (!res.ok) {
		throw new Error(`Failed to fetch events: ${res.status} ${res.statusText}`);
	}

	return res.json();
}
