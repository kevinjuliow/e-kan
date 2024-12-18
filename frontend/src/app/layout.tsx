import type { Metadata } from "next";
// import localFont from "next/font/local";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import { Provider } from "./providers";
import Navbar from "./components/navbar/Navbar";
import MobileNavbar from "./components/mobile/MobileNavbar";
import { getServerSession } from "next-auth";
import { AuthOptions } from "./libs/auth/auth";
import { UserProvider } from "./userprovider";
import { ItemProvider } from "./itemprovider";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const leagueSpartan = League_Spartan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    absolute: "", // to ignore the template
    default: "e-kan",
    template: "%s | e-kan" // using %s so it can be dynamic title name
  },
  description: "e-kan",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // fetching the session on the server before rendering the components,
  // ensuring the session is available immediately and avoiding any loading state on the client-side.
  const session = await getServerSession(AuthOptions);
  
  return (
    <html lang="en">
      <Provider session={session}>
        <UserProvider>
          <ItemProvider>
            <body className={`${leagueSpartan.className} bg-[#D4EBEF]`}>
              <Navbar />
              <main className="flex flex-wrap flex-col items-center justify-between mx-auto w-full text-gray-800">
                {children}
              </main>
              <MobileNavbar />
            </body>
          </ItemProvider>
        </UserProvider>
      </Provider>
    </html>
  );
}
