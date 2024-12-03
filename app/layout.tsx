import "./globals.css";
import { Poppins } from "next/font/google";
import SessionWrapper from "./components/SessionWrapper";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--poppins-font",
});

export const metadata = {
  title: "Noted",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={poppins.variable}>{children}</body>
      </html>
    </SessionWrapper>
  );
}
