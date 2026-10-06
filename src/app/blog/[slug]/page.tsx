"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getRelatedBlogPosts } from "../../../data/blogData";
import WhatsAppIcon from "../../../components/WhatsAppIcon";
import { PortableText } from "@portabletext/react";

export default function BlogPostDetailPage() {
  const pathname = usePathname();

  const slug = pathname
    .replace(/^\/blog\/?/, "")
    .replace(/\/$/, "");

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      try {
        const query = `*[_type == "post" && slug.current == $slug][0]{
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
          seo{
            metaTitle,
            metaDescription
          },
          "imageUrl": mainImage.asset->url,
          content,
          author->{
            name,
            role,
            "avatarUrl": avatar.asset->url
          }
        }`;

        const apiUrl =
          "https://u1mx3eth.api.sanity.io/v2024-01-01/data/query/production?" +
          new URLSearchParams({
            query,
            $slug: JSON.stringify(slug),
          }).toString();

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Sanity API request failed");
        }

        const data = await response.json();

        const sanityPost = data.result;

        if (!sanityPost) {
          setPost(null);
          return;
        }

        const formattedPost = {
          id: sanityPost._id,
          slug: sanityPost.slug,
          title: sanityPost.title,
          subtitle: sanityPost.subtitle || "",
          excerpt: sanityPost.excerpt || "",
          category:
            sanityPost.category || "Wedding Catering",

          date: sanityPost.publishedAt
            ? new Date(
                sanityPost.publishedAt
              ).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "Recently Published",

          readTime:
            sanityPost.readTime || "5 min read",

          author: {
            name:
              sanityPost.author?.name ||
              "George Foods Team",

            role:
              sanityPost.author?.role ||
              "Culinary Specialist",

            avatar:
              sanityPost.author?.avatarUrl ||
              "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=150&q=80",
          },

          image:
            sanityPost.imageUrl ||
            "/blog/wedding-catering-guide.png",

          featured: Boolean(sanityPost.featured),

          tags:
            sanityPost.tags || ["Catering"],

          seo: {
            metaTitle:
              sanityPost.seo?.metaTitle || "",

            metaDescription:
              sanityPost.seo?.metaDescription || "",
          },

          content: sanityPost.content,
        };

        setPost(formattedPost);

        // Browser SEO
        const metaTitle =
          formattedPost.seo.metaTitle ||
          `${formattedPost.title} | George Foods & Caters Blog`;

        const metaDescription =
          formattedPost.seo.metaDescription ||
          formattedPost.excerpt ||
          "";

        document.title = metaTitle;

        let descriptionTag =
          document.querySelector(
            'meta[name="description"]'
          );

        if (!descriptionTag) {
          descriptionTag =
            document.createElement("meta");

          descriptionTag.setAttribute(
            "name",
            "description"
          );

          document.head.appendChild(descriptionTag);
        }

        descriptionTag.setAttribute(
          "content",
          metaDescription
        );
      } catch (error) {
        console.error(
          "Sanity blog loading error:",
          error
        );

        setPost(null);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />

        <main
          style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "150px 20px",
          }}
        >
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--color-text-muted)",
            }}
          >
            Loading article...
          </p>
        </main>

        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />

        <main
          style={{
            minHeight: "60vh",
            padding: "160px 20px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              color: "var(--color-purple-dark)",
              marginBottom: "1rem",
            }}
          >
            Article Not Found
          </h1>

          <p
            style={{
              color: "var(--color-text-muted)",
              marginBottom: "2rem",
            }}
          >
            The requested article could not be found.
          </p>

          <Link
            href="/blog"
            className="btn"
          >
            Back to Blog
          </Link>
        </main>

        <Footer />
      </>
    );
  }

  const relatedPosts =
    getRelatedBlogPosts(slug, 3);

  const whatsappMessage = encodeURIComponent(
    `Hello George Foods & Caters, I read your article "${post.title}" and would like to inquire about your catering services!`
  );

  const isPortableText =
    Array.isArray(post.content);

  return (
    <>
      <Header />

      {/* Header Banner */}
      <section
        className="section"
        style={{
          paddingTop: "160px",
          paddingBottom: "60px",
          background:
            "linear-gradient(180deg, var(--color-bg-light) 0%, var(--color-bg-dark) 100%)",
          borderBottom:
            "1px solid var(--color-border)",
        }}
      >
        <div className="container">
          <div
            style={{
              maxWidth: "860px",
              margin: "0 auto",
            }}
          >
            {/* Breadcrumb */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.9rem",
                color: "var(--color-text-muted)",
                marginBottom: "1.5rem",
              }}
            >
              <Link
                href="/"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Home
              </Link>

              <span>/</span>

              <Link
                href="/blog"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Blog
              </Link>

              <span>/</span>

              <span
                style={{
                  color:
                    "var(--color-purple-dark)",
                  fontWeight: 600,
                }}
              >
                {post.category}
              </span>
            </div>

            {/* Category & Details */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  backgroundColor:
                    "var(--color-purple-dark)",
                  color: "var(--color-gold)",
                  padding: "0.3rem 0.9rem",
                  borderRadius: "20px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                {post.category}
              </span>

              <span
                style={{
                  fontSize: "0.9rem",
                  color: "var(--color-text-muted)",
                }}
              >
                {post.date}
              </span>

              <span
                style={{
                  fontSize: "0.9rem",
                  color: "var(--color-text-muted)",
                }}
              >
                •
              </span>

              <span
                style={{
                  fontSize: "0.9rem",
                  color: "var(--color-text-muted)",
                }}
              >
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize:
                  "clamp(2.2rem, 4vw, 3.2rem)",
                lineHeight: 1.25,
                color:
                  "var(--color-purple-dark)",
                marginBottom: "1.2rem",
              }}
            >
              {post.title}
            </h1>

            {/* Subtitle */}
            {post.subtitle && (
              <p
                style={{
                  fontSize: "1.2rem",
                  color:
                    "var(--color-text-muted)",
                  lineHeight: 1.6,
                  marginBottom: "2rem",
                }}
              >
                {post.subtitle}
              </p>
            )}

            {/* Author */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <img
                src={post.author.avatar}
                alt={post.author.name}
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />

              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "1rem",
                    color:
                      "var(--color-purple-dark)",
                  }}
                >
                  {post.author.name}
                </div>

                <div
                  style={{
                    fontSize: "0.85rem",
                    color:
                      "var(--color-text-muted)",
                  }}
                >
                  {post.author.role}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section
        className="section"
        style={{
          paddingTop: "60px",
          paddingBottom: "100px",
        }}
      >
        <div className="container">
          <article
            style={{
              maxWidth: "860px",
              margin: "0 auto",
            }}
          >
            {/* Featured Image */}
            <div
              style={{
                borderRadius:
                  "var(--border-radius-xl)",
                overflow: "hidden",
                marginBottom: "3rem",
                boxShadow: "var(--shadow-lg)",
                maxHeight: "500px",
              }}
            >
              <img
                src={post.image}
                alt={post.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            {/* Content */}
            {isPortableText ? (
              <div
                className="sanity-portable-text"
                style={{
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                  color:
                    "var(--color-purple-dark)",
                }}
              >
                <PortableText
                  value={
                    post.content as unknown as any[]
                  }
                />
              </div>
            ) : typeof post.content ===
                "object" &&
              post.content?.sections ? (
              <>
                {post.content.introduction && (
                  <p
                    style={{
                      fontSize: "1.25rem",
                      lineHeight: 1.8,
                      color:
                        "var(--color-purple-dark)",
                      fontWeight: 500,
                      marginBottom: "2.5rem",
                      paddingLeft: "1.5rem",
                      borderLeft:
                        "4px solid var(--color-gold)",
                    }}
                  >
                    {post.content.introduction}
                  </p>
                )}

                {post.content.sections.map(
                  (sec: any, idx: number) => (
                    <div
                      key={idx}
                      style={{
                        marginBottom: "2.8rem",
                      }}
                    >
                      <h2
                        style={{
                          fontSize: "1.8rem",
                          marginBottom: "1rem",
                          color:
                            "var(--color-purple-dark)",
                          fontFamily:
                            "var(--font-serif)",
                        }}
                      >
                        {sec.heading}
                      </h2>

                      <p
                        style={{
                          fontSize: "1.08rem",
                          lineHeight: 1.8,
                          color:
                            "var(--color-text-muted)",
                        }}
                      >
                        {sec.text}
                      </p>

                      {sec.quote && (
                        <blockquote
                          style={{
                            margin: "1.8rem 0",
                            padding:
                              "1.8rem 2rem",
                            backgroundColor:
                              "var(--color-light-bg-alt)",
                            borderRadius:
                              "var(--border-radius-md)",
                            borderLeft:
                              "4px solid var(--color-purple-dark)",
                            fontSize: "1.1rem",
                            fontStyle: "italic",
                            color:
                              "var(--color-purple-dark)",
                            fontWeight: 600,
                          }}
                        >
                          "{sec.quote}"
                        </blockquote>
                      )}
                    </div>
                  )
                )}

                {post.content.conclusion && (
                  <div
                    style={{
                      backgroundColor:
                        "var(--color-white)",
                      borderRadius:
                        "var(--border-radius-lg)",
                      padding: "2rem",
                      border:
                        "1px solid var(--color-border)",
                      boxShadow:
                        "var(--shadow-sm)",
                      marginBottom: "3rem",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.4rem",
                        color:
                          "var(--color-purple-dark)",
                        marginBottom: "0.8rem",
                      }}
                    >
                      Summary & Next Steps
                    </h3>

                    <p
                      style={{
                        fontSize: "1.05rem",
                        lineHeight: 1.7,
                        color:
                          "var(--color-text-muted)",
                      }}
                    >
                      {post.content.conclusion}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <p
                style={{
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                }}
              >
                {post.excerpt}
              </p>
            )}

            {/* Tags + WhatsApp */}
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1.5rem",
                borderTop:
                  "1px solid var(--color-border)",
                borderBottom:
                  "1px solid var(--color-border)",
                padding: "1.5rem 0",
                marginTop: "3rem",
                marginBottom: "4rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color:
                      "var(--color-purple-dark)",
                    marginRight: "0.5rem",
                  }}
                >
                  Tags:
                </span>

                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    style={{
                      backgroundColor:
                        "var(--color-light-bg-alt)",
                      color:
                        "var(--color-purple-dark)",
                      padding:
                        "0.3rem 0.8rem",
                      borderRadius: "15px",
                      fontSize: "0.82rem",
                      border:
                        "1px solid var(--color-border)",
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
                  padding:
                    "0.6rem 1.4rem",
                  fontSize: "0.9rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  border: "none",
                  borderRadius:
                    "var(--border-radius-md)",
                  fontWeight: 600,
                }}
              >
                <WhatsAppIcon size={16} />
                Consult via WhatsApp
              </a>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div
                style={{
                  marginTop: "4rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.8rem",
                    marginBottom: "2rem",
                    color:
                      "var(--color-purple-dark)",
                  }}
                >
                  Related Articles
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "2rem",
                  }}
                >
                  {relatedPosts.map(
                    (relPost) => (
                      <article
                        key={relPost.id}
                        className="blog-card"
                      >
                        <div
                          className="blog-card-img-wrapper"
                          style={{
                            height: "160px",
                          }}
                        >
                          <img
                            src={relPost.image}
                            alt={relPost.title}
                            className="blog-card-img"
                          />

                          <span
                            className="blog-card-category"
                            style={{
                              fontSize:
                                "0.7rem",
                              padding:
                                "0.2rem 0.6rem",
                            }}
                          >
                            {relPost.category}
                          </span>
                        </div>

                        <div
                          className="blog-card-content"
                          style={{
                            padding: "1.2rem",
                          }}
                        >
                          <h4
                            className="blog-card-title"
                            style={{
                              fontSize:
                                "1.1rem",
                              marginBottom:
                                "0.75rem",
                            }}
                          >
                            <Link
                              href={`/blog/${relPost.slug}`}
                            >
                              {relPost.title}
                            </Link>
                          </h4>

                          <Link
                            href={`/blog/${relPost.slug}`}
                            className="blog-card-link"
                            style={{
                              fontSize:
                                "0.85rem",
                            }}
                          >
                            Read &rarr;
                          </Link>
                        </div>
                      </article>
                    )
                  )}
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