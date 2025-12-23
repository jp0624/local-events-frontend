const API_BASE =
	process.env.DRUPAL_API_URL || "http://local-events.ddev.site/jsonapi";

async function fetchJson(endpoint: string) {
	const url = `${API_BASE}${endpoint}`;
	const res = await fetch(url);
	if (!res.ok) {
		const text = await res.text();
		console.error(`Fetch failed for ${url}:`, res.status, text);
		throw new Error(`Failed to fetch ${endpoint}`);
	}
	return res.json();
}

export async function fetchEvents() {
	return fetchJson("/node/event");
}

export async function fetchVenues() {
	return fetchJson("/node/venue");
}

export async function fetchOrganizers() {
	return fetchJson("/node/organizer");
}
