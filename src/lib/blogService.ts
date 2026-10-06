import { client } from "../sanity/lib/client";
import { postsQuery, postBySlugQuery } from "../sanity/lib/queries";
import { BLOG_POSTS, BlogPost } from "../data/blogData";

export async function fetchAllPosts(): Promise<BlogPost[]> {
  try {
    const sanityPosts = await client.fetch(postsQuery);

    if (sanityPosts && sanityPosts.length > 0) {
      return sanityPosts.map((p: any) => ({
        id: p._id,
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle || "",
        excerpt: p.excerpt || "",
        category: p.category || "Wedding Catering",

        date: p.publishedAt
          ? new Date(p.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : "Recently Published",

        readTime: p.readTime || "5 min read",

        author: {
          name: p.author?.name || "George Foods Team",
          role: p.author?.role || "Culinary Specialist",
          avatar:
            p.author?.avatarUrl ||
            "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=150&q=80",
        },

        image: p.imageUrl || "/blog/wedding-catering-guide.png",

        featured: Boolean(p.featured),

        tags: p.tags || ["Catering"],

        // SEO data from Sanity
        seo: {
          metaTitle: p.seo?.metaTitle || "",
          metaDescription: p.seo?.metaDescription || "",
        },

        content: p.content,
      }));
    }
  } catch (error) {
    console.warn("Sanity fetch fallback active:", error);
  }

  return BLOG_POSTS;
}

export async function fetchPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  try {
    const p = await client.fetch(postBySlugQuery, { slug });

    if (p) {
      return {
        id: p._id,
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle || "",
        excerpt: p.excerpt || "",
        category: p.category || "Wedding Catering",

        date: p.publishedAt
          ? new Date(p.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : "Recently Published",

        readTime: p.readTime || "5 min read",

        author: {
          name: p.author?.name || "George Foods Team",
          role: p.author?.role || "Culinary Specialist",
          avatar:
            p.author?.avatarUrl ||
            "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=150&q=80",
        },

        image: p.imageUrl || "/blog/wedding-catering-guide.png",

        featured: Boolean(p.featured),

        tags: p.tags || ["Catering"],

        // SEO data from Sanity
        seo: {
          metaTitle: p.seo?.metaTitle || "",
          metaDescription: p.seo?.metaDescription || "",
        },

        content: p.content,
      };
    }
  } catch (error) {
    console.warn("Sanity fetch for slug fallback active:", error);
  }

  return BLOG_POSTS.find((post) => post.slug === slug);
}