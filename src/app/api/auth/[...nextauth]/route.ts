// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
	providers: [
		{
			id: "drupal",
			name: "Drupal",
			type: "oauth", // Specify the type as 'oauth'
			version: "2.0",
			clientId: process.env.DRUPAL_CLIENT_ID,
			clientSecret: process.env.DRUPAL_CLIENT_SECRET,
			authorization: {
				url: `${process.env.DRUPAL_BASE_URL}/oauth/authorize`,
				params: { scope: "content_read" },
			},
			token: `${process.env.DRUPAL_BASE_URL}/oauth/token`,
			userinfo: `${process.env.DRUPAL_BASE_URL}/oauth/userinfo`,
			profile(profile) {
				return {
					id: profile.id,
					name: profile.name || profile.username || "Drupal User",
					email: profile.email || null,
				};
			},
		},
	],
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/api/auth/signin",
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
