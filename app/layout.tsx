import "@/styles/globals.scss";
import { montserrat } from "@/fonts/montserrat";
import Header from "@/components/shared/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased main-layout`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
