import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { compare } from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

// Extend session to include user.id
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    };
  }
  interface JWT {
    id?: string;
  }
}

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          await connectToDatabase();

          const user = await User.findOne({ email: credentials.email.toLowerCase() });

          if (!user || !user.password) return null;

          const isValid = await compare(credentials.password, user.password);
          if (!isValid) return null;

          const userId = user._id?.toString() || "";

          return {
            id: userId,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // Attach user.id to JWT token
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    // Attach user.id from token to session.user
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to main page after successful login
      if (url.startsWith(baseUrl)) return `${baseUrl}/app/mainpage`;
      return url;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
