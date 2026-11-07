import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paper Tree Educational Studio",
  description: "Online testing for educational institutes.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const isLoggedIn = Boolean(session);
  const user = (session as { user?: Record<string, unknown> } | null)?.user;
  const institute = (user?.instituteName as string) || "";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="shellbar">
          <div className="shellwrap">
            <a href="/" className="shellbrand">
              Paper Tree<span className="shellbrand-sub">CBT</span>
            </a>
            <div className="shellnav">
              {isLoggedIn ? (
                <>
                  <a
                    href={`/dashboard/${user?.instituteSlug}`}
                    className="shellink"
                  >
                    {institute} Dashboard
                  </a>
                  <form action="/api/auth/signout" method="POST">
                    <button type="submit" className="shellbtn">
                      Logout
                    </button>
                  </form>
                </>
              ) : (
                <a href="/login" className="shellbtn">
                  Login
                </a>
              )}
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
