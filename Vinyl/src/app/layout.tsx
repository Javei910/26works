import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

export const metadata: Metadata = {
    title: "VinylFlow - Custom Vinyl, CD & Media Manufacturing",
    description: "Design and manufacture your custom vinyl records, CDs, and cassettes with premium quality and automated fulfillment.",
    keywords: ["vinyl", "custom vinyl", "vinyl pressing", "CD manufacturing", "cassette", "print on demand"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <body className="font-sans">
                {children}
            </body>
        </html>
    );
}
