import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    CredentialsProvider({
    
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      
      async authorize(credentials) {
        console.log(credentials)
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return { id: user.id, name: user.name, email: user.email};
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
        if (account.provider === "google") {
          // Check if user exists in DB
          const existingUser = await prisma.user.findUnique({
            where: { email: profile.email },
          });
  
          if (!existingUser) {
            // Create new user with image from Google
            await prisma.user.create({
              data: {
                name: profile.name,
                email: profile.email,
                image: profile.picture, // Store Google profile image
                emailVerified: profile.email_verified ? new Date() : null,
              },
            });
          }else if (!existingUser.emailVerified && profile.email_verified) {
            // Update emailVerified if user exists but not verified
            await prisma.user.update({
              where: { email: profile.email },
              data: { emailVerified: new Date() },
            });
          }
        
        }
        return true;
      },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
});
