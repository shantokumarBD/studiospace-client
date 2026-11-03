import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins"


const client = new MongoClient(
  process.env.DB_URL || "mongodb://localhost:27017/studiospace",
);
const db = client.db("studiospace");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.BETTER_GOOGLE_CLIENT as string,
      clientSecret: process.env.BETTER_GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [jwt()],
  session: {
    cookieCache: {
      enabled: true,
      strategy: 'jwt',
      maxAge: 7 * 24 * 60 * 60 
    }
  }
});
