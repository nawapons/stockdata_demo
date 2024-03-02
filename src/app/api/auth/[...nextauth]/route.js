import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/models/userModel";
import { connect } from "@/app/mongodb"
import bcryptjs from "bcryptjs"

connect();

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email address", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (credentials == null) throw new Error("Please provide a valid credentials");
                const { email, password } = credentials;
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error("Invalid credentials");
                }
                const isValid = await bcryptjs.compare(password, user.password);
                if (!isValid) {
                    throw new Error("Invalid credentials");
                }
                return user;
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 4 * 60 * 60 // 4 hours
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user._id.toString();
            }
            return token;
        },
        async session({ session, token }) {
            if (token.id) {
                session.user = { id: token.id, name: token.name, email: token.email }
            }
            return session;
        },
    },
})
export { handler as GET, handler as POST }