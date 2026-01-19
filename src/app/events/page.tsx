import { fetchEvents, fetchWithSession } from "@/lib/drupal";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AuthButtons from "@/components/AuthButtons";

export default async function EventsPage() {
	// Get session token for OAuth2
	const session = await getServerSession(authOptions);
	const accessToken = session?.accessToken;

	let json: any = { data: [] };
	try {
		json = await fetchEvents(accessToken);
	} catch (err) {
		console.error("Failed to fetch events:", err);
	}

	return (
		<main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
			<h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
				Upcoming Events
			</h1>
			<AuthButtons />

			<ul style={{ display: "grid", gap: 12, listStyle: "none", padding: 0 }}>
				{json.data?.map((e: any) => (
					<li
						key={e.id}
						style={{
							border: "1px solid #e5e7eb",
							borderRadius: 12,
							padding: 16,
						}}
					>
						<div style={{ fontSize: 18, fontWeight: 650 }}>
							{e.attributes?.title}
						</div>
						{e.attributes?.field_start && (
							<div style={{ marginTop: 6, color: "#4b5563" }}>
								Starts: {new Date(e.attributes.field_start).toLocaleString()}
							</div>
						)}
					</li>
				))}
			</ul>
		</main>
	);
}
