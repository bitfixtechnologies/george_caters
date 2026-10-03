import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getBlogPostBySlug, getRelatedBlogPosts, BLOG_POSTS } from "../../../data/blogData";
import WhatsAppIcon from "../../../components/WhatsAppIcon";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | George Foods & Caters",
    };
  }

  return {
    title: `${post.title} | George Foods & Caters Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://georgefoods.in/blog/${post.slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://georgefoods.in/blog/${post.slug}/`,
      images: [{ url: post.image }],
      type: "article",
    },
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(slug, 3);

  const whatsappMessage = encodeURIComponent(
    `Hello George Foods & Caters, I read your article "${post.title}" and would like to inquire about your catering services!`
  );

  return (
    <>
      <Header />

      {/* Header Banner */}
      <section
        className="section"
        style={{
          paddingTop: "160px",
          paddingBottom: "60px",
          background: "linear-gradient(180deg, var(--color-bg-light) 0%, var(--color-bg-dark) 100%)",
          borderBottom: "1px solid var(--color-border)"
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            {/* Breadcrumb */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.9rem",
                color: "var(--color-text-muted)",
                marginBottom: "1.5rem"
              }}
            >
              <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
              <span>/</span>
              <Link href="/blog" style={{ color: "inherit", textDecoration: "none" }}>Blog</Link>
              <span>/</span>
              <span style={{ color: "var(--color-purple-dark)", fontWeight: 600 }}>{post.category}</span>
            </div>

            {/* Category & Details Badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <span
                style={{
                  backgroundColor: "var(--color-purple-dark)",
                  color: "var(--color-gold)",
                  padding: "0.3rem 0.9rem",
                  borderRadius: "20px",
                  fontSize: "0.85rem",
                  fontWeight: 600
                }}
              >
                {post.category}
              </span>
              <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>{post.date}</span>
              <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>•</span>
              <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>{post.readTime}</span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                lineHeight: 1.25,
                color: "var(--color-purple-dark)",
                marginBottom: "1.2rem"
              }}
            >
              {post.title}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: "1.2rem",
                color: "var(--color-text-muted)",
                lineHeight: 1.6,
                marginBottom: "2rem"
              }}
            >
              {post.subtitle}
            </p>

            {/* Author Metadata */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img
                src={post.author.avatar}
                alt={post.author.name}
                style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover" }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--color-purple-dark)" }}>{post.author.name}</div>
                <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>{post.author.role}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="section" style={{ paddingTop: "60px", paddingBottom: "100px" }}>
        <div className="container">
          <article style={{ maxWidth: "860px", margin: "0 auto" }}>
            {/* Main Featured Image */}
            <div
              style={{
                borderRadius: "var(--border-radius-xl)",
                overflow: "hidden",
                marginBottom: "3rem",
                boxShadow: "var(--shadow-lg)",
                maxHeight: "500px"
              }}
            >
              <img
                src={post.image}
                alt={post.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Introduction */}
            <p
              style={{
                fontSize: "1.25rem",
                lineHeight: 1.8,
                color: "var(--color-purple-dark)",
                fontWeight: 500,
                marginBottom: "2.5rem",
                paddingLeft: "1.5rem",
                borderLeft: "4px solid var(--color-gold)"
              }}
            >
              {post.content.introduction}
            </p>

            {/* Sections */}
            {post.content.sections.map((sec, idx) => (
              <div key={idx} style={{ marginBottom: "2.8rem" }}>
                <h2
                  style={{
                    fontSize: "1.8rem",
                    marginBottom: "1rem",
                    color: "var(--color-purple-dark)",
                    fontFamily: "var(--font-serif)"
                  }}
                >
                  {sec.heading}
                </h2>
                <p
                  style={{
                    fontSize: "1.08rem",
                    lineHeight: 1.8,
                    color: "var(--color-text-muted)",
                    marginBottom: sec.quote || sec.bulletPoints ? "1.5rem" : "0"
                  }}
                >
                  {sec.text}
                </p>

                {sec.quote && (
                  <blockquote
                    style={{
                      margin: "1.8rem 0",
                      padding: "1.8rem 2rem",
                      backgroundColor: "var(--color-light-bg-alt)",
                      borderRadius: "var(--border-radius-md)",
                      borderLeft: "4px solid var(--color-purple-dark)",
                      fontSize: "1.1rem",
                      fontStyle: "italic",
                      color: "var(--color-purple-dark)",
                      fontWeight: 600,
                      boxShadow: "var(--shadow-sm)"
                    }}
                  >
                    "{sec.quote}"
                  </blockquote>
                )}

                {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                  <ul
                    style={{
                      paddingLeft: "1.5rem",
                      marginBottom: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.6rem"
                    }}
                  >
                    {sec.bulletPoints.map((pt, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: "1.05rem",
                          color: "var(--color-purple-dark)",
                          lineHeight: 1.6
                        }}
                      >
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Conclusion */}
            <div
              style={{
                backgroundColor: "var(--color-white)",
                borderRadius: "var(--border-radius-lg)",
                padding: "2rem",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)",
                marginBottom: "3rem"
              }}
            >
              <h3 style={{ fontSize: "1.4rem", color: "var(--color-purple-dark)", marginBottom: "0.8rem" }}>
                Summary & Next Steps
              </h3>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--color-text-muted)" }}>
                {post.content.conclusion}
              </p>
            </div>

            {/* Tags & Direct Action CTA */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1.5rem",
                borderTop: "1px solid var(--color-border)",
                borderBottom: "1px solid var(--color-border)",
                padding: "1.5rem 0",
                marginBottom: "4rem"
              }}
            >
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--color-purple-dark)", marginRight: "0.5rem" }}>Tags:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      backgroundColor: "var(--color-light-bg-alt)",
                      color: "var(--color-purple-dark)",
                      padding: "0.3rem 0.8rem",
                      borderRadius: "15px",
                      fontSize: "0.82rem",
                      border: "1px solid var(--color-border)"
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <a
                href={`https://wa.me/919495227110?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  backgroundColor: "#25D366",
                  color: "white",
                  padding: "0.6rem 1.4rem",
                  fontSize: "0.9rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  border: "none",
                  borderRadius: "var(--border-radius-md)",
                  fontWeight: 600
                }}
              >
                <WhatsAppIcon size={16} /> Consult via WhatsApp
              </a>
            </div>

            {/* Related Articles Section */}
            {relatedPosts.length > 0 && (
              <div style={{ marginTop: "4rem" }}>
                <h3 style={{ fontSize: "1.8rem", marginBottom: "2rem", color: "var(--color-purple-dark)" }}>
                  Related Articles
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "2rem"
                  }}
                >
                  {relatedPosts.map((relPost) => (
                    <article
                      key={relPost.id}
                      className="blog-card"
                    >
                      <div className="blog-card-img-wrapper" style={{ height: "160px" }}>
                        <img
                          src={relPost.image}
                          alt={relPost.title}
                          className="blog-card-img"
                        />
                        <span className="blog-card-category" style={{ fontSize: "0.7rem", padding: "0.2rem 0.6rem" }}>
                          {relPost.category}
                        </span>
                      </div>
                      <div className="blog-card-content" style={{ padding: "1.2rem" }}>
                        <h4 className="blog-card-title" style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>
                          <Link href={`/blog/${relPost.slug}`}>
                            {relPost.title}
                          </Link>
                        </h4>
                        <Link
                          href={`/blog/${relPost.slug}`}
                          className="blog-card-link"
                          style={{ fontSize: "0.85rem" }}
                        >
                          Read &rarr;
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </section>

      <Footer />
    </>
  );
}
