import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";



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
      <body
        className={`${inter.className} antialiased`}>
        <Navbar />
        {children}

      </body>
    </html>
  );
}
