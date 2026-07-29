import type { Metadata } from "next";
import { Inclusive_Sans, Inconsolata, Noto_Sans_Georgian } from "next/font/google";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/features/auth/auth-provider";
import "./globals.css";


const inclusiveSans = Inclusive_Sans({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-inclusive-sans",
  display: "swap",
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-inconsolata",
  display: "swap",
});

const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ["latin", "georgian"],
  weight: ["300", "400", "500"],
  variable: "--font-noto-sans-georgian",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YOUTHs - Unite, Inspire, Impact",
  description: "A youth organization empowering young minds to unite, inspire, and make an impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        inclusiveSans.variable,
        inconsolata.variable,
        notoSansGeorgian.variable,
        "h-full antialiased"
      )}
    >
      <body className="flex min-h-full flex-col bg-[#eef0ff] text-[#171717]">
        <AuthProvider>{children}</AuthProvider>
      </body>

    </html>
  );
}
