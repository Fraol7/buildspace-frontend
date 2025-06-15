import NextAuth, { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: "investor" | "startup";
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          "http://buildspace.onrender.com/auth/email/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const data = await res.json();

        console.log("Response from login:", data);

        if (res.ok && data?.token) {
          const payload = JSON.parse(
            Buffer.from(data.token.split(".")[1], "base64").toString()
          );
          console.log("Decoded JWT payload:", payload);
          return {
            id: payload.email, // or payload.uid if available
            name: credentials?.email,
            email: payload.email,
            role: payload.role,
            accessToken: data.token,
            firebaseToken: data.firebase_token,
          };
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role; // <-- Add this line
        token.image = user.image || null;
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: JWT }) {
      session.accessToken = token.accessToken;
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        role: token.role,
        image: token.image || null,
      };
      return session;
    },
  },

  session: {
    strategy: "jwt" as SessionStrategy,
  },
};
