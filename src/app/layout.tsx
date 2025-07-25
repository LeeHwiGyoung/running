import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/component/BottomNav";
import TrackerWrap from "@/component/running/TrackerWrap";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="max-w-md m-auto">
        {children}
        <BottomNav/>
        <div id="modal-root"></div>
        <TrackerWrap />
      </body>
    </html>
  );
}
