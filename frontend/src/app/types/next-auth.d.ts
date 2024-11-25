import { DefaultSession } from "next-auth";

// Adding property id to useSession nextauth
// because the default properties are only email, image, and name
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    } & DefaultSession["user"];
    accessToken: string
  }
}