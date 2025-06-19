import { Session, SessionStrategy, DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      role: "investor" | "startup";
      accessToken: string;
    };
    accessToken: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    role: "investor" | "startup";
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    role: "investor" | "startup";
    accessToken: string;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: { token: DefaultJWT; user?: any }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image || null,
          accessToken: user.accessToken,
        } as DefaultJWT;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: DefaultJWT }) {
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
      } as Session;
    },
  },

  session: {
    strategy: "jwt" as SessionStrategy,
  },
};
