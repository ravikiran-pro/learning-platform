import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
    providers: [
        GitHubProvider({
            name: "github",
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),

        LinkedInProvider({
            name: "linkedin",
            clientId: process.env.LINKEDIN_CLIENT_ID!,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
            issuer: "https://www.linkedin.com/oauth",
            wellKnown: "https://www.linkedin.com/oauth/.well-known/openid-configuration",
            authorization: { params: { scope: "openid profile email" } },
            async profile(profile) {
                return {
                    id: profile.sub,
                    name: `${profile.given_name ?? profile.localizedFirstName} ${profile.family_name ?? profile.localizedLastName
                        }`,
                    email: profile.email,
                    image: profile.picture ?? null,
                };
            },
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email) throw new Error("Invalid email or password");

                return {
                    id: "1",
                    email: credentials.email.trim().toLowerCase(),
                    name: "Test User",
                    provider: "credentials",
                } as User;
            },
        }),
    ],

    session: { strategy: "jwt" , maxAge: 30 * 24 * 60 * 60,},

    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: any }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.provider = user.provider;
                token.role = user.role ?? "USER";
                token.avatar = user.image ?? null;
            }
            return token;
        },

        async session({ session, token }: {
            session: Session;
            token: JWT;
        }) {
            session.user.id = token.id as string;
            session.user.email = token.email as string;
            session.user.name = token.name as string;
            session.user.provider = token.provider as string;
            session.user.role = token.role as string;
            session.user.avatar = token.avatar as string | null;
            return session;
        },

        async signIn({ user, account }: { user: any; account: any | null }) {
            if (!user.email) return false;

            let existingUser = await prisma.user.findUnique({
                where: { email: user.email },
            });
            if (!existingUser) {
                existingUser = await prisma.user.create({
                    data: {
                        email: user.email,
                        name: user.name ?? null,
                        provider: account?.provider ?? "credentials",
                        avatar: user.image ?? null,
                        role: "USER",
                    },
                });
            }

            user.id = existingUser.id;
            user.provider = existingUser.provider;
            user.role = existingUser.role;

            return true;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
});


export { handler as GET, handler as POST };
