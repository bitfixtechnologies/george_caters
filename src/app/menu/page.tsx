"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const menuData = {
  appetizers: [
    {
      title: "Truffle Mushroom Bruschetta",
      price: "$18",
      description: "Crispy artisanal sourdough, roasted wild forest mushrooms, white truffle oil, shaved pecorino Romano.",
      badge: "Popular"
    },
    {
      title: "Seared Ahi Tuna Bites",
      price: "$24",
      description: "Sesame-crusted rare yellowfin tuna, wasabi-lime aioli, pickled ginger, micro greens on crisp wonton.",
      badge: "Signature"
    },
    {
      title: "Duck Confit Croquettes",
      price: "$22",
      description: "Slow-cooked duck leg, Gruyère cheese, panko crust, served with a spiced plum dipping sauce."
    },
    {
      title: "Fig & Goat Cheese Tartlets",
      price: "$19",
      description: "Sweet mission figs, caramelized balsamic onions, warm goat cheese, wildflower honey drizzle.",
      badge: "Vegetarian"
    }
  ],
  mains: [
    {
      title: "Herb-Crusted Rack of Lamb",
      price: "$48",
      description: "Rosemary and garlic crusted lamb, red wine reduction, roasted garlic potato purée, glazed heirloom carrots.",
      badge: "Chef's Special"
    },
    {
      title: "Pan-Seared Chilean Sea Bass",
      price: "$46",
      description: "Miso-glazed sea bass, ginger-infused black rice, baby bok choy, lemongrass butter sauce.",
      badge: "Signature"
    },
    {
      title: "Truffled Wild Mushroom Risotto",
      price: "$34",
      description: "Acquerello carnaroli rice, roasted forest mushrooms, fresh herbs, 24-month aged Parmigiano-Reggiano.",
      badge: "Vegetarian"
    },
    {
      title: "Dry-Aged Tomahawk Slice",
      price: "$52",
      description: "Charred prime ribeye, bone marrow reduction, wood-fired asparagus, truffle butter splash."
    }
  ],
  desserts: [
    {
      title: "Deconstructed Golden Cannoli",
      price: "$16",
      description: "Crisp pastry shards, sweet sheep's milk ricotta, dark chocolate chips, candied orange peel, pistachios.",
      badge: "Classic"
    },
    {
      title: "Tahitian Vanilla Bean Crème Brûlée",
      price: "$15",
      description: "Rich custard infused with real vanilla beans, hand-torched sugar crust, fresh seasonal berries."
    },
    {
      title: "Dark Chocolate Fondant",
      price: "$17",
      description: "Warm molten center cake, salted caramel drizzle, organic lavender-honey ice cream.",
      badge: "Popular"
    }
  ],
  drinks: [
    {
      title: "Smoked Rosemary Old Fashioned",
      price: "$20",
      description: "Double oaked bourbon, Angostura & orange bitters, smoked rosemary sprig infusion, large ice sphere."
    },
    {
      title: "Spiced Hibiscus Mezcalita",
      price: "$19",
      description: "Artisanal Mezcal, wild hibiscus flower reduction, key lime juice, agave nectar, chili-salt rim."
    },
    {
      title: "Elderflower Pear Sparkler",
      price: "$17",
      description: "Organic pear nectar, wild elderflower liqueur, Valdo prosecco, fresh garden mint.",
      badge: "Refreshing"
    }
  ]
};

type MenuCategory = keyof typeof menuData;

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<MenuCategory>("appetizers");

  return (
    <>
      <Header />

      {/* Inner Hero Section */}
      <section className="section" style={{ paddingTop: "160px", paddingBottom: "60px", background: "linear-gradient(180deg, var(--color-bg-light) 0%, var(--color-bg-dark) 100%)" }}>
        <div className="container">
          <div className="text-center" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span className="section-tag" style={{ marginBottom: "1rem" }}>Our Offerings</span>
            <h1 className="hero-title" style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>
              Signature Menu <span>& Party Platters</span>
            </h1>
            <p className="hero-description" style={{ fontSize: "1.15rem", color: "var(--color-text-muted)" }}>
              Explore our selection of handcrafted chef specialties, tailored catering menu items, and family-style sharing platters perfect for pickup or venue delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Main Menu Tabs Section */}
      <section className="section section-dark" style={{ paddingBottom: "100px" }}>
        <div className="container">
          <div className="menu-tabs" style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "3rem", flexWrap: "wrap" }}>
            {(Object.keys(menuData) as MenuCategory[]).map((category) => (
              <button
                key={category}
                className={`menu-tab-btn ${activeTab === category ? "active" : ""}`}
                onClick={() => setActiveTab(category)}
                style={{
                  textTransform: "capitalize"
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="menu-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "2.5rem" }}>
            {menuData[activeTab].map((item, idx) => (
              <div
                key={idx}
                className="menu-item-card"
                style={{
                  background: "var(--color-card-bg)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "15px",
                  padding: "2rem",
                  boxShadow: "0 10px 30px rgba(36, 14, 76, 0.05)",
                  transition: "var(--transition-normal)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem" }}>
                  <h3 style={{ fontSize: "1.35rem", fontWeight: "600", fontFamily: "var(--font-serif)", color: "var(--color-text-light)" }}>
                    {item.title}
                  </h3>
                  <span style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--color-accent)" }}>{item.price}</span>
                </div>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1rem" }}>
                  {item.description}
                </p>
                {"badge" in item && (
                  <span
                    style={{
                      background: "rgba(255, 215, 0, 0.12)",
                      color: "var(--color-accent)",
                      padding: "0.25rem 0.75rem",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      borderRadius: "50px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em"
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Takeaway Hubs Flow */}
      <section className="section">
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: "4rem" }}>
            <span className="section-tag">Easy Ordering</span>
            <h2>Gourmet Hub Takeaway Process</h2>
            <p>Skip the cooking and pick up artisan dishes from our local neighborhood hubs in minutes.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
            <div className="service-card" style={{ padding: "2.5rem" }}>
              <span style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--color-accent)", display: "block", marginBottom: "1rem" }}>01</span>
              <h4 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.5rem" }}>Browse & Select</h4>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>Explore our menu here and pick out signature dishes or custom family sharing platters.</p>
            </div>
            <div className="service-card" style={{ padding: "2.5rem" }}>
              <span style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--color-accent)", display: "block", marginBottom: "1rem" }}>02</span>
              <h4 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.5rem" }}>Order & Set Time</h4>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>Call us or place your takeaway query online, selecting your nearest pickup hub and timeframe.</p>
            </div>
            <div className="service-card" style={{ padding: "2.5rem" }}>
              <span style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--color-accent)", display: "block", marginBottom: "1rem" }}>03</span>
              <h4 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.5rem" }}>Pick Up Hot</h4>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>Arrive at the food hub where our team will hand over your order, hot and ready to enjoy.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
