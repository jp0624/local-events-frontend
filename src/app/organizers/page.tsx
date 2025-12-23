// app/organizers/page.tsx
import { fetchOrganizers } from "@/lib/drupal";

export default async function OrganizersPage() {
	const json = await fetchOrganizers();

	return (
		<main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
			<h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
				Organizers
			</h1>

			<ul style={{ display: "grid", gap: 12, listStyle: "none", padding: 0 }}>
				{json.data?.map((o: any) => (
					<li
						key={o.id}
						style={{
							border: "1px solid #e5e7eb",
							borderRadius: 12,
							padding: 16,
						}}
					>
						<div style={{ fontSize: 18, fontWeight: 650 }}>
							{o.attributes?.title}
						</div>
						{o.attributes?.field_contact_email && (
							<div style={{ marginTop: 6, color: "#4b5563" }}>
								Email: {o.attributes.field_contact_email}
							</div>
						)}
					</li>
				))}
			</ul>
		</main>
	);
}
