import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Culinary Journal | George Foods & Caters",
  description: "Explore expert catering tips, wedding planning advice, corporate event guides, and culinary secrets from George Foods & Caters.",
  alternates: {
    canonical: "https://georgefoods.in/blog/",
  },
  openGraph: {
    title: "Blog & Culinary Journal | George Foods & Caters",
    description: "Explore expert catering tips, wedding planning advice, corporate event guides, and culinary secrets.",
    url: "https://georgefoods.in/blog/",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
