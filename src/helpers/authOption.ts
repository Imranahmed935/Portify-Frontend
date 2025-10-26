import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("⚠️ Missing credentials");
          return null;
        }

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            
          });

          if (!res.ok) {
            console.error("❌ Login Failed", await res.text());
            return null;
          }

          const userData = await res.json();
          const user = userData?.data;


          if (user?.id && user?.email) {
            return {
              id: user.id,
              email: user.email,
              role: user.role,
              accessToken: user.accessToken, 
              refreshToken: user.refreshTokenToken, 
            };
          }

          return null;
        } catch (error) {
          console.error("🔥 Authorize error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },


    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as number;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refreshToken as string;
      }
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
