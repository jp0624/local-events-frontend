import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

const API_BASE =
	process.env.DRUPAL_API_URL || "http://local-events.ddev.site/jsonapi";

async function fetchJson(endpoint: string, accessToken?: string) {
	const url = `${API_BASE}${endpoint}`;
	const headers: Record<string, string> = {
		"Content-Type": "application/json",
	};

	if (accessToken) {
		headers["Authorization"] = `Bearer ${accessToken}`;
	}

	const res = await fetch(url, { headers });
	if (!res.ok) {
		const text = await res.text();
		console.error(`Fetch failed for ${url}:`, res.status, text);
		throw new Error(`Failed to fetch ${endpoint}`);
	}
	return res.json();
}

// Fetch with access token from session
export async function fetchWithSession(endpoint: string, req?: any, res?: any) {
	const session = await getServerSession(req, res, authOptions);
	const token = session?.accessToken;
	return fetchJson(endpoint, token);
}

export async function fetchEvents(accessToken?: string) {
	return fetchJson("/node/event", accessToken);
}

export async function fetchVenues(accessToken?: string) {
	return fetchJson("/node/venue", accessToken);
}

export async function fetchOrganizers(accessToken?: string) {
	return fetchJson("/node/organizer", accessToken);
}
