import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { env } from "~/env";

import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      credits: number;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    // DiscordProvider,
    GoogleProvider({
      clientId: env.AUTH_GOOGLE_CLIENT_ID || "",
      clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      allowDangerousEmailAccountLinking: true,
      // redirectProxyUrl
    }),
    GithubProvider({
      clientId: env.AUTH_GITHUB_CLIENT_ID || "",
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers
     */
  ],

  pages: {
    signIn: "/auth/signin", // Custom sign-in page
    error: "/auth/error",
  },

  // Using PrismaAdapter to store user data in the database
  adapter: PrismaAdapter(db),

  // Configure JWT session strategy for stateless sessions
  session: {
    strategy: "jwt",
  },

  // Optional: JWT callback to include user ID in session
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        // Ensure user.id is assigned to token only when user is defined
        token.id = user.id;
      }
      return token;
    },

    async session({ session, user: _user, token }) {
      // Ensure user is defined before accessing user.id
      if (token?.id) {
        session.user.id = token.id as string; // Add user id to the session
      }
      const userData = await db.user.findUnique({
        where: { id: session.user.id },
      });
      if (userData) {
        session.user = {
          ...session.user,
          image: userData.profile_picture,
          credits: userData.credits,
        };
        // session.user.image = userData.profile_picture;
        // session.user.image = userData.profile_picture;
      }
      return session;
    },

    async signIn({ user, account, profile }) {
      // Custom logic when a user signs in with Google
      if (account && account.provider === "google" && user?.email) {
        const existingUser = await db.user.findUnique({
          where: { email: user.email },
        });

        if (existingUser && existingUser.google_id === "") {
          await db.user.update({
            where: { id: existingUser.id },
            data: { google_id: profile?.sub as string | undefined },
          });
          return true;
        }

        // If the user doesn't exist, create a new user in the database
        if (!existingUser) {
          await db.user.create({
            data: {
              email: user.email,
              google_id: profile?.sub ?? "",
              profile_picture: profile?.picture as string | undefined,
              name: profile!.name ?? user.email, // Can be modified to generate username
              username: user.email.split("@")[0]!, // Can be modified to generate username
            },
          });
        }
      }

      if (account && account.provider === "github" && profile) {
        const existingUser = await db.user.findUnique({
          where: { email: profile.email! },
        });

        if (existingUser && existingUser.github_id === "") {
          await db.user.update({
            where: { id: existingUser.id },
            data: { github_id: profile.id as string | undefined },
          });
          return true;
        }

        if (!existingUser) {
          await db.user.create({
            data: {
              email: profile.email,
              github_id: String(profile?.id) ?? "", // Store GitHub ID
              name: profile?.name, // Use GitHub login or email as the username
              profile_picture: profile?.picture as string | undefined,
              username: profile.email!.split("@")[0]!, // Can be modified to generate username
              // email_verified: profile?.email_verified ?? null,
            },
          });
        }
      }
      return true; // Allow sign-in
    },
  },

  // Security
  secret: env.AUTH_SECRET,
} satisfies NextAuthConfig;
