import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://georgefoods.in/contact/",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
