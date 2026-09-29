import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://georgefoods.in/menu/",
  },
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
