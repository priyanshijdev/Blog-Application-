import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Blog App",
  description: "Blog App",
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}:{
  children: React.ReactNode
}) {
   return (
    <html lang="en">
    <body className={inter.className}>
      <header className="bg-slate-800 text-white p-4">
        <div className="container mx-auto">
          <nav className="flex justify-between items-center">
            <a href="/" className="text-xl font-bold">
              My Blog
            </a>
            <ul className="flex gap-4">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {children}
      {/* <footer className="bg-slate-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} My Simple Blog</p>
        </div>
      </footer> */}
    </body>
  </html>
   )
}