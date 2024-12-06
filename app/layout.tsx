import "./globals.css";
import { Poppins } from "next/font/google";
import StyledComponentsRegistry from "./lib/registry";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--poppins-font",
});

export const metadata = {
  title: "Noted Ai",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={poppins.variable}>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </body>
      </html>
  );
}
