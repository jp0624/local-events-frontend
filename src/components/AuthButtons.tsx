"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
	const { data: session } = useSession();

	if (session) {
		return (
			<div>
				<p>Signed in as {session.user?.email}</p>
				<button
					onClick={() => signOut()}
					style={{ padding: "6px 12px", marginTop: 8 }}
				>
					Sign Out
				</button>
			</div>
		);
	}

	return (
		<button onClick={() => signIn("drupal")} style={{ padding: "6px 12px" }}>
			Sign in with Drupal
		</button>
	);
}
