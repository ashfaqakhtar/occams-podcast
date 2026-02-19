import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata = {
    title: "Occams Podcast",
    description: "Powered By Occams Digital",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                <link rel="icon" href="/logo/Fevicon.svg" />

                <LenisProvider>
                    <Navbar />

                    {children}

                    <Footer />
                </LenisProvider>
            </body>
        </html>
    );
}
