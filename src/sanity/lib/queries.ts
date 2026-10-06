import { groq } from "next-sanity";

export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  subtitle,
  excerpt,
  category,
  featured,
  publishedAt,
  readTime,
  tags,

  seo {
    metaTitle,
    metaDescription
  },

  "imageUrl": mainImage.asset->url,

  author-> {
    name,
    role,
    "avatarUrl": avatar.asset->url
  }
}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  subtitle,
  excerpt,
  category,
  featured,
  publishedAt,
  readTime,
  tags,

  seo {
    metaTitle,
    metaDescription
  },

  "imageUrl": mainImage.asset->url,
  content,

  author-> {
    name,
    role,
    "avatarUrl": avatar.asset->url
  }
}`;

export const relatedPostsQuery = groq`*[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  category,
  publishedAt,
  readTime,
  "imageUrl": mainImage.asset->url
}`;