import { fetchEvents } from "@/lib/drupal";

export default async function EventsPage() {
	const json = await fetchEvents();

	return (
		<main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
			<h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
				Upcoming Events
			</h1>

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
