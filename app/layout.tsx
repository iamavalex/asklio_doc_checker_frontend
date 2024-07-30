import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "askLio Next App",
    description: "Procurement made easy!",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="corporate">
            <body className={`${inter.className} flex flex-col min-h-screen`}>
            <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    {children}
                </main>
            </body>
        </html>
    );
}
