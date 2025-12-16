import "@/styles/globals.scss";
import { montserrat } from "@/fonts/montserrat";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased main-layout`}>
        {children}
      </body>
    </html>
  );
}
