"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BLOG_POSTS, BlogPost } from "../../data/blogData";
import WhatsAppIcon from "../../components/WhatsAppIcon";

const CATEGORIES = [
  "All",
  "Wedding Catering",
  "Corporate Events",
  "Culinary Secrets",
  "Party Planning"
] as const;

export default function BlogListPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesQuery =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section
        className="section"
        style={{
          paddingTop: "160px",
          paddingBottom: "60px",
          background: "linear-gradient(180deg, var(--color-bg-light) 0%, var(--color-bg-dark) 100%)",
        }}
      >
        <div className="container">
          <div className="text-center" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span className="section-tag" style={{ marginBottom: "1rem" }}>
              Culinary Journal & Insights
            </span>
            <h1 className="hero-title" style={{ fontSize: "3.5rem", marginBottom: "1.2rem" }}>
              Flavors, Events <span>& Culinary Inspiration</span>
            </h1>
            <p
              className="hero-description"
              style={{
                fontSize: "1.15rem",
                color: "var(--color-text-muted)",
                textAlign: "center",
                marginBottom: "2.5rem"
              }}
            >
              Discover expert event planning guides, Kerala & fusion catering secrets, and insider menu advice from the master chefs of George Foods & Caters.
            </p>

            {/* Search Bar */}
            <div
              style={{
                position: "relative",
                maxWidth: "560px",
                margin: "0 auto",
                boxShadow: "var(--shadow-md)",
                borderRadius: "var(--border-radius-lg)",
                overflow: "hidden"
              }}
            >
              <input
                id="blog-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, wedding tips, recipes..."
                aria-label="Search blog posts"
                style={{
                  width: "100%",
                  padding: "1.1rem 1.5rem",
                  paddingRight: "3.5rem",
                  borderRadius: "var(--border-radius-lg)",
                  border: "2px solid var(--color-border)",
                  fontSize: "1rem",
                  outline: "none",
                  backgroundColor: "var(--color-white)",
                  color: "var(--color-purple-dark)"
                }}
              />
              <span
                style={{
                  position: "absolute",
                  right: "1.2rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--color-purple-dark)",
                  opacity: 0.6,
                  pointerEvents: "none"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section" style={{ paddingTop: "20px", paddingBottom: "100px" }}>
        <div className="container">
          {/* Category Filter Pills */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginBottom: "3.5rem"
            }}
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                id={`filter-btn-${category.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setSelectedCategory(category)}
                className={`btn ${selectedCategory === category ? "btn-primary" : ""}`}
                style={{
                  padding: "0.6rem 1.4rem",
                  fontSize: "0.95rem",
                  borderRadius: "30px",
                  border: selectedCategory === category ? "none" : "1px solid var(--color-border)",
                  backgroundColor: selectedCategory === category ? "var(--color-purple-dark)" : "var(--color-white)",
                  color: selectedCategory === category ? "var(--color-gold)" : "var(--color-purple-dark)",
                  cursor: "pointer",
                  transition: "all var(--transition-fast)"
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Article Card (Shows when on 'All' and no search query) */}
          {selectedCategory === "All" && !searchQuery && featuredPost && (
            <div
              style={{
                marginBottom: "4rem",
                borderRadius: "var(--border-radius-xl)",
                overflow: "hidden",
                backgroundColor: "var(--color-white)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-md)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                alignItems: "stretch"
              }}
            >
              <div style={{ position: "relative", minHeight: "340px" }}>
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "1.2rem",
                    left: "1.2rem",
                    backgroundColor: "var(--color-gold)",
                    color: "var(--color-purple-dark)",
                    padding: "0.35rem 1rem",
                    borderRadius: "20px",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    letterSpacing: "0.05em",
                    boxShadow: "var(--shadow-sm)"
                  }}
                >
                  FEATURED ARTICLE
                </span>
              </div>

              <div
                style={{
                  padding: "3rem 2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                  <span style={{ fontWeight: 600, color: "var(--color-purple-dark)" }}>{featuredPost.category}</span>
                  <span>•</span>
                  <span>{featuredPost.date}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>

                <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "var(--color-purple-dark)" }}>
                  <Link href={`/blog/${featuredPost.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                    {featuredPost.title}
                  </Link>
                </h2>

                <p style={{ color: "var(--color-text-muted)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "1.8rem" }}>
                  {featuredPost.excerpt}
                </p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover" }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--color-purple-dark)" }}>{featuredPost.author.name}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{featuredPost.author.role}</div>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="btn btn-primary"
                    style={{ padding: "0.6rem 1.4rem", fontSize: "0.9rem" }}
                  >
                    Read Full Story &rarr;
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Articles Grid */}
          {filteredPosts.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "2.5rem"
              }}
            >
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="blog-card"
                >
                  <div className="blog-card-img-wrapper">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="blog-card-img"
                    />
                    <span className="blog-card-category">
                      {post.category}
                    </span>
                  </div>

                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="blog-card-title">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="blog-card-excerpt">
                      {post.excerpt}
                    </p>

                    <div className="blog-card-footer">
                      <span className="blog-card-author">
                        By {post.author.name.split(" ")[1] || post.author.name}
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="blog-card-link"
                      >
                        Read Article &rarr;
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 2rem",
                backgroundColor: "var(--color-white)",
                borderRadius: "var(--border-radius-lg)",
                border: "1px dashed var(--color-border)"
              }}
            >
              <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>No Articles Found</h3>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
                We couldn't find any blog posts matching your search query or category filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="btn btn-primary"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Event Catering CTA Banner */}
          <div
            style={{
              marginTop: "5rem",
              background: "linear-gradient(135deg, var(--color-purple-dark) 0%, #150630 100%)",
              borderRadius: "var(--border-radius-xl)",
              padding: "3.5rem 2.5rem",
              color: "var(--color-white)",
              textAlign: "center",
              boxShadow: "var(--shadow-lg)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <div style={{ position: "relative", zIndex: 2, maxWidth: "700px", margin: "0 auto" }}>
              <span
                style={{
                  display: "inline-block",
                  color: "var(--color-gold)",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  marginBottom: "0.8rem"
                }}
              >
                PLANNING AN UPCOMING EVENT?
              </span>
              <h2 style={{ color: "var(--color-white)", fontSize: "2.4rem", marginBottom: "1.2rem" }}>
                Let Our Executive Chefs Craft Your Custom Catering Menu
              </h2>
              <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "1.1rem", marginBottom: "2rem" }}>
                Whether it's a dream wedding, corporate summit, or family celebration, we bring gourmet culinary precision right to your venue.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/contact" className="btn btn-primary" style={{ padding: "0.8rem 2rem", fontSize: "1rem" }}>
                  Request Catering Quote
                </Link>
                <a
                  href="https://wa.me/919495227110?text=Hello%20George%20Foods%2C%20I%20read%20your%20blog%20and%20would%20like%20to%20discuss%20catering%20for%20my%20event."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{
                    backgroundColor: "#25D366",
                    color: "white",
                    padding: "0.8rem 1.8rem",
                    fontSize: "1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    border: "none",
                    borderRadius: "var(--border-radius-md)",
                    fontWeight: 600
                  }}
                >
                  <WhatsAppIcon size={18} /> WhatsApp Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
