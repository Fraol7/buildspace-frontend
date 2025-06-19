import { Session, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: "investor" | "startup";
  accessToken: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      role: "investor" | "startup";
      accessToken: string;
    };
    accessToken?: string;
  }
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
          "https://buildspace.onrender.com/auth/email/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        if (!res.ok) {
          console.error("Failed to authenticate:", res.statusText);
          return null;
        }

        const data = await res.json();

        console.log("Authentication response:", data);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${data.token}`);

        const userRes = await fetch("https://buildspace.onrender.com/user/me", {
          method: "GET",
          headers: myHeaders,
          credentials: "omit" as RequestCredentials,
          redirect: "follow" as RequestRedirect,
        });

        if (!userRes.ok) {
          console.error("Failed to fetch user data:", userRes.statusText);
          return null;
        }

        const userData = await userRes.json();

        if (res.ok && data?.token) {
          const payload = JSON.parse(
            Buffer.from(data.token.split(".")[1], "base64").toString()
          );
          console.log("Decoded JWT payload:", payload);
          return {
            id: userData.id, // or payload.uid if available
            name: userData.first_name + " " + userData.last_name,
            email: payload.email,
            role: payload.role,
            accessToken: data.token,
          };
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User | undefined }) {
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

    async session({ session, token }: { session: Session; token: JWT }) {
      if (!token.id || !token.name || !token.email || !token.role || !token.accessToken) {
        throw new Error('Invalid token: Missing required user data');
      }
      
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
          image: token.image || null,
          accessToken: token.accessToken,
        },
        accessToken: token.accessToken
      };
    },
  },

  session: {
    strategy: "jwt" as SessionStrategy,
  },
};
