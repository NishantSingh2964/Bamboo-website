import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VANA Bamboo Homeware",
  description: "Bamboo homeware shaped for everyday life.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-background text-text">{children}</body>
    </html>
  );
}
