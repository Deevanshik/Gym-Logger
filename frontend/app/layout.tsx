import "./globals.css";
import { barlow, barlowCondensed } from "./fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable}`}
    >
      <body className="font-barlow bg-[#0d0d0d] text-[#e8e8e8]">
        {children}
      </body>
    </html>
  );
}
