import { fetchVenues } from "@/lib/drupal";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function VenuesPage() {
	const session = await getServerSession(authOptions);
	const accessToken = session?.accessToken;

	let json: any = { data: [] };
	try {
		json = await fetchVenues(accessToken);
	} catch (err) {
		console.error("Failed to fetch venues:", err);
	}

	return (
		<main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
			<h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
				Venues
			</h1>

			<ul style={{ display: "grid", gap: 12, listStyle: "none", padding: 0 }}>
				{json.data?.map((v: any) => (
					<li
						key={v.id}
						style={{
							border: "1px solid #e5e7eb",
							borderRadius: 12,
							padding: 16,
						}}
					>
						<div style={{ fontSize: 18, fontWeight: 650 }}>
							{v.attributes?.title}
						</div>
						{v.attributes?.field_address && (
							<div style={{ marginTop: 6, color: "#4b5563" }}>
								Address: {v.attributes.field_address}
							</div>
						)}
					</li>
				))}
			</ul>
		</main>
	);
}
