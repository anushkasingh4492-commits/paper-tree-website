import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUserByEmail, verifyPassword, InstituteUser } from "./users";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = findUserByEmail(credentials.email);
        if (!user) {
          return null;
        }
        const ok = await verifyPassword(credentials.password, user.password);
        if (!ok) {
          return null;
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          instituteSlug: user.instituteSlug,
          instituteName: user.instituteName,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.instituteSlug = (user as InstituteUser).instituteSlug;
        token.instituteName = (user as InstituteUser).instituteName;
        token.role = (user as InstituteUser).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as Record<string, unknown>).instituteSlug =
          token.instituteSlug;
        (session.user as Record<string, unknown>).instituteName =
          token.instituteName;
        (session.user as Record<string, unknown>).role = token.role;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);