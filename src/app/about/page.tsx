"use client";

import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* Inner Hero Section */}
      <section className="section" style={{ paddingTop: "160px", paddingBottom: "80px", background: "linear-gradient(180deg, var(--color-bg-light) 0%, var(--color-bg-dark) 100%)" }}>
        <div className="container">
          <div className="text-center" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span className="section-tag" style={{ marginBottom: "1rem" }}>Our Story</span>
            <h1 className="hero-title" style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>
              Crafting Culinary Excellence <span>for Every Plate</span>
            </h1>
            <p className="hero-description" style={{ fontSize: "1.15rem", color: "var(--color-text-muted)", textAlign: "center"}}>
              At George Foods & Caters, we bring together high-end gourmet recipes, fresh local ingredients, and exceptional catering services to make every meal memorable.
            </p>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="features-grid" style={{ gap: "4rem" }}>
            <div className="hero-image-container" style={{ minHeight: "450px" }}>
              <div className="hero-image-wrapper">
                <img 
                  src="/hero.png" 
                  alt="George Foods & Caters Kitchen Craft" 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
              </div>
            </div>

            <div className="features-content" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span className="section-tag" style={{ alignSelf: "flex-start", marginBottom: "0.5rem" }}>Who We Are</span>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>A Passion for Exquisite Flavors</h2>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem", lineHeight: "1.8" }}>
                George Foods & Caters began with a simple vision: to make gourmet quality meals accessible through premium catering and convenient takeaway food hubs. We believe that fine dining shouldn't be confined to traditional restaurants.
              </p>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem", lineHeight: "1.8" }}>
                Whether you are ordering a fresh meal for pickup from one of our local food hubs or booking full-service catering for a wedding or corporate reception, our team of master chefs prepares every dish with artistic presentation and precise flavor coordination.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                <div>
                  <h4 style={{ color: "var(--color-accent)", fontSize: "1.2rem", marginBottom: "0.5rem" }}>Gourmet Sourcing</h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>We partner with organic local farms to secure fresh seasonal vegetables and premium herbs.</p>
                </div>
                <div>
                  <h4 style={{ color: "var(--color-accent)", fontSize: "1.2rem", marginBottom: "0.5rem" }}>Culinary Mastery</h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>Our chefs bring years of Michelin-style experience directly to our menus and takeaway trays.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing / Hubs Philosophy */}
      <section className="section">
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: "4rem" }}>
            <span className="section-tag">How We Operate</span>
            <h2>Takeaway Hubs & Premium Catering</h2>
            <p>We designed our services to fit seamlessly into your life—whether you need individual meals or bulk orders.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem" }}>
            {/* Box 1 */}
            <div className="service-card" style={{ padding: "3rem 2.5rem" }}>
              <h3 style={{ fontSize: "1.5rem", color: "var(--color-accent)", marginBottom: "1rem" }}>Gourmet Takeaway Hubs</h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: "1.7", marginBottom: "1.5rem" }}>
                Our hubs act as gourmet grab-and-go points. Pre-order your favorite artisan meals or party platters online or via phone and pick them up hot, fresh, and perfectly packaged.
              </p>
            </div>

            {/* Box 2 */}
            <div className="service-card" style={{ padding: "3rem 2.5rem" }}>
              <h3 style={{ fontSize: "1.5rem", color: "var(--color-accent)", marginBottom: "1rem" }}>Full-Service Catering</h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: "1.7", marginBottom: "1.5rem" }}>
                For weddings, corporate gatherings, or private parties, we offer complete culinary catering. We coordinate custom menu designs, beautiful buffet setups, and supply professional waitstaff.
              </p>
            </div>

            {/* Box 3 */}
            <div className="service-card" style={{ padding: "3rem 2.5rem" }}>
              <h3 style={{ fontSize: "1.5rem", color: "var(--color-accent)", marginBottom: "1rem" }}>Our Clean Kitchen Promise</h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: "1.7", marginBottom: "1.5rem" }}>
                Every meal is prepared in a highly sanitized, state-of-the-art industrial kitchen under strict quality control, ensuring absolute health safety and consistency in taste.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
