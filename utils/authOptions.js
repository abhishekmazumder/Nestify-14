import GoogleProvider from "next-auth/providers/google";

import connectDB from "@/config/db";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizations: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful authentication/sign-in
    async signIn({ profile }) {
      // 1.connect to the database
      await connectDB();
      // 2.check if user exists
      const userExists = await User.findOne({ email: profile.email });
      // 3.if not, create a new user
      if (!userExists) {
        // Truncate user name if too long
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // 4. if user is authenticated, return true to allow sign-in
      return true;
    },
    // Session callback function that modifies the session object
    async session({ session }) {
      // 1.Get the user from database
      const user = await User.findOne({ email: session.user.email });
      // 2.Assign user id from session
      session.user.id = user._id.toString();
      // 3.Return the session
      return session;
    },
  },
};
