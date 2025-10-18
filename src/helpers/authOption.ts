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
          const res = await fetch("http://localhost:5000/api/v1/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            console.error("❌ Login Failed", await res.text());
            return null;
          }

          const user = await res.json();
          console.log("✅ User response:", user);

          const userData = user?.data;
          
          if (userData?.id || userData?.id) {
            return {
              id: userData.id || userData.id,
              email: userData.email,
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
      if (user) token.id = user.id;
      return token;
    },
    async session({ token, session }) {
      if (session.user) session.user.id  = token.id;
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
