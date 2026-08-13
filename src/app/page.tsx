"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Menu Data
const menuData = {
  breakfast: [
    {
      title: "Palappam & Mutton Khorma",
      tag: "Breakfast Set 03",
      description: "Soft lacy Palappams served with rich slow-cooked Mutton Khorma & boiled eggs.",
      badge: "Popular"
    },
    {
      title: "Idly & Uzhunnu Vada Feast",
      tag: "Breakfast Set 02",
      description: "Fluffy Idlis & golden crispy Uzhunnu Vadas with authentic drumstick sambar & coconut chutney.",
      badge: "100% Veg"
    },
    {
      title: "Palappam & Traditional Fish Molly",
      tag: "Breakfast Set 07",
      description: "Traditional Kerala fish stew in coconut cream curry with lacy hoppers & steamed bananas.",
      badge: "Heritage"
    },
    {
      title: "Idiyappam & Veg Molly Platter",
      tag: "Breakfast Set 04",
      description: "Steamed rice string hoppers with aromatic vegetable molly & seasoned tapioca masala.",
      badge: "100% Veg"
    }
  ],
  starters: [
    {
      title: "Chicken Lollipop with Hot Garlic Sauce",
      tag: "Banquet Starter",
      description: "Crispy seasoned chicken winglets glazed in spicy garlic sauce.",
      badge: "Chef Special"
    },
    {
      title: "Prawns & Paneer Shashlik",
      tag: "Grill Special",
      description: "Marinated succulent prawns and paneer skewers char-grilled on bamboo sticks.",
      badge: "Signature"
    },
    {
      title: "Beef & Veg Spring Rolls",
      tag: "Finger Food",
      description: "Crispy golden fried spring rolls filled with seasoned beef & garden vegetables."
    },
    {
      title: "Baby Corn Crum Fried & Tartar Dip",
      tag: "Veg Starter",
      description: "Crispy breaded baby corn sticks served with garlic tartar dip.",
      badge: "100% Veg"
    }
  ],
  mains: [
    {
      title: "Kerala Fish Vattichathu & Matta Rice",
      tag: "Royal Feast",
      description: "Thick reduced clay-pot fish curry served with traditional Kerala Matta rice & Avial.",
      badge: "Top Seller"
    },
    {
      title: "Butter Chicken & Garlic Naan",
      tag: "North Indian",
      description: "Tandoori chicken in velvet tomato butter gravy with clay-oven garlic naan."
    },
    {
      title: "Beef Coconut Roast (Ularthiyathu)",
      tag: "Kerala Special",
      description: "Tender beef slow-roasted with fried coconut slivers & aromatic curry leaves.",
      badge: "Traditional"
    },
    {
      title: "Duck Varutharachathu & Pathiri",
      tag: "Grand Special",
      description: "Slow-cooked duck in roasted coconut spice reduction served with thin Nice Pathiri.",
      badge: "Special"
    }
  ],
  desserts: [
    {
      title: "Tender Coconut Pudding",
      tag: "Signature Sweet",
      description: "Velvety smooth tender coconut cream pudding served chilled.",
      badge: "Best Seller"
    },
    {
      title: "Golden Gulab Jamun & Carrot Halwa",
      tag: "Traditional",
      description: "Soft milk solids in warm cardamom syrup accompanied by ghee carrot halwa."
    },
    {
      title: "Fruit Truffle & Butterscotch Ice Cream",
      tag: "Double Delight",
      description: "Layered sponge cake fruit truffle topped with rich butterscotch scoops.",
      badge: "Popular"
    },
    {
      title: "Live Refreshments & Fresh Juices",
      tag: "Live Counter",
      description: "Live Mojito station, watermelon, pineapple, mint lemon juice & cardamom tea."
    }
  ],
  specialDishes: [
    {
      title: "Live Sugar Candy & Chocolate Fountain",
      tag: "Live Sweet Counter",
      description: "Spun fluffy pink & blue sugar candy machine along with cascading warm chocolate fountain, fruit skewers & marshmallows.",
      badge: "Kids Favourite"
    },
    {
      title: "Live Chaat Counter (Pani Puri, Bhel Puri, Masala Puri)",
      tag: "Street Food Live",
      description: "Authentic live preparation of Pani Puri with chilled mint water, tangy Bhel Puri, Masala Puri & Sev Puri.",
      badge: "Popular"
    },
    {
      title: "Live Sea Food Counter (Fish Thoran & Fish Tawa Fry)",
      tag: "Coastal Special",
      description: "Fresh catch Fish Tawa Fry (Fish Thava) pan-fried hot live & Nadan Fish Thoran with grated coconut.",
      badge: "Fresh Catch"
    },
    {
      title: "Nadan Ruchi Counter (Kappa Puzhukku, Chakka & Liver)",
      tag: "Kerala Heritage",
      description: "Traditional steamed Kappa Puzhukku, Chakka delicacy, and spicy Nadan Liver Roast with black pepper & curry leaves.",
      badge: "Signature"
    }
  ]
};

type MenuCategory = keyof typeof menuData;



interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ target, suffix = "", duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp: number | null = null;
          
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Easing function (easeOutQuad)
            const easedProgress = progress * (2 - progress);
            
            setCount(Math.floor(easedProgress * target));
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };
          
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target, duration]);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <span ref={elementRef} className="stat-number">
      {formatNumber(count)}{suffix}
    </span>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<MenuCategory>("breakfast");

  
  // Booking Form State
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "",
    serviceType: "catering",
    requirements: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form
      setFormState({
        name: "",
        email: "",
        phone: "",
        date: "",
        guests: "",
        serviceType: "catering",
        requirements: ""
      });
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section id="home" className="hero">
        {/* Full Background Image with Overlay */}
        <div className="hero-bg-container">
          <img 
            src="/hero_v2.png" 
            alt="Luxurious gourmet catering buffet setup" 
            className="hero-bg-img" 
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px' }}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              PREMIUM CATERING & TAKEAWAY HUBS
            </div>
            <h1 className="hero-title">
              Premium Catering <span>& Gourmet Takeaway Hubs</span>
            </h1>
            <p className="hero-description">
              Bring outstanding flavor to your gatherings, weddings, and parties. We deliver custom culinary creations directly to your venue or offer fresh pickup from our gourmet food hubs.
            </p>
            <div className="hero-buttons">
              <a href="/menu" className="btn btn-primary">
                Explore Signature Menu
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
              <a href="/contact" className="btn btn-secondary">Request Catering</a>
            </div>

            {/* Elegant Stats Row */}
            <div className="hero-stats-row">
              <div className="hero-stat-badge">
                <span className="hero-stat-num">5.0 ★</span>
                <span className="hero-stat-txt">Star Rated Service</span>
              </div>
              <div className="hero-stat-badge">
                <span className="hero-stat-num">15+</span>
                <span className="hero-stat-txt">Years of Culinary Art</span>
              </div>
              <div className="hero-stat-badge">
                <span className="hero-stat-num">100%</span>
                <span className="hero-stat-txt">Bespoke Menus</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <AnimatedCounter target={1200} suffix="+" />
              <span className="stat-label">Gatherings Catered</span>
            </div>
            <div className="stat-item">
              <AnimatedCounter target={45} suffix="+" />
              <span className="stat-label">Gourmet Platters</span>
            </div>
            <div className="stat-item">
              <AnimatedCounter target={25} suffix="+" />
              <span className="stat-label">Master Chefs</span>
            </div>
            <div className="stat-item">
              <AnimatedCounter target={15000} suffix="+" />
              <span className="stat-label">Happy Foodies</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        id="services" 
        className="section section-dark"
        style={{ 
          position: "relative", 
          overflow: "hidden",
          background: "transparent"
        }}
      >
        {/* Parallax Background */}
        <div 
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/services_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            zIndex: 1,
            opacity: 0.8,
            pointerEvents: "none"
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="section-header text-center">
            <span className="section-tag">Our Specialties</span>
            <h2>Catering & Takeaway Services</h2>
            <p>From large-scale event catering to quick takeaway orders from our local hubs, we prepare exceptional gourmet meals for any occasion.</p>
          </div>

          <div className="services-grid">
            {/* Service 1 */}
            <div className="service-card">
              <div className="service-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M12 8v8"/>
                  <path d="M8 12h8"/>
                </svg>
              </div>
              <h3 className="service-title">Wedding Catering</h3>
              <p className="service-description">
                Exquisite multi-course buffets, elegant sharing platters, and custom menus designed to delight your wedding guests.
              </p>
              <a href="/contact" className="service-link">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>

            {/* Service 2 */}
            <div className="service-card">
              <div className="service-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <h3 className="service-title">Corporate Catering</h3>
              <p className="service-description">
                Impress partners and executives with gourmet boxed lunches, hot catering buffets, and custom break-time snacks.
              </p>
              <a href="/contact" className="service-link">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>

            {/* Service 3 */}
            <div className="service-card">
              <div className="service-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h3 className="service-title">Takeaway Hubs & Platters</h3>
              <p className="service-description">
                Freshly prepared gourmet meals ready for pickup at our hubs, and family-style sharing platters perfect for casual parties and gatherings.
              </p>
              <a href="/contact" className="service-link">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Showcase Section */}
      <section id="menu" className="section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Taste of Luxury</span>
            <h2>Signature Culinary Offerings</h2>
            <p>A curated sample of our artisanal creations. We specialize in designing custom menus that match your specific dietary preference.</p>
          </div>

          {/* Menu Tabs */}
          <div className="menu-tabs">
            <button 
              className={`menu-tab-btn ${activeTab === "breakfast" ? "active" : ""}`}
              onClick={() => setActiveTab("breakfast")}
            >
              Breakfast Specials
            </button>
            <button 
              className={`menu-tab-btn ${activeTab === "starters" ? "active" : ""}`}
              onClick={() => setActiveTab("starters")}
            >
              Starters & Appetizers
            </button>
            <button 
              className={`menu-tab-btn ${activeTab === "mains" ? "active" : ""}`}
              onClick={() => setActiveTab("mains")}
            >
              Main Course Feasts
            </button>
            <button 
              className={`menu-tab-btn ${activeTab === "desserts" ? "active" : ""}`}
              onClick={() => setActiveTab("desserts")}
            >
              Desserts & Refreshments
            </button>
            <button 
              className={`menu-tab-btn ${activeTab === "specialDishes" ? "active" : ""}`}
              onClick={() => setActiveTab("specialDishes")}
            >
              🎪 Special Dishes & Live Counters
            </button>
          </div>

          {/* Menu Items Grid */}
          <div className="menu-container">
            {/* Left Column */}
            <div className="menu-list">
              {menuData[activeTab].slice(0, 2).map((item, idx) => (
                <div className="menu-item animate-fade-in" key={idx}>
                  <div className="menu-item-header">
                    <span className="menu-item-title">{item.title}</span>
                    <span className="menu-item-line"></span>
                    <span className="menu-item-price" style={{ color: "var(--color-purple-dark)", fontSize: "0.85rem", fontWeight: "700" }}>{item.tag}</span>
                  </div>
                  <p className="menu-item-description">{item.description}</p>
                  {item.badge && <span className="menu-item-badge">{item.badge}</span>}
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="menu-list">
              {menuData[activeTab].slice(2, 4).map((item, idx) => (
                <div className="menu-item" key={idx}>
                  <div className="menu-item-header">
                    <span className="menu-item-title">{item.title}</span>
                    <span className="menu-item-line"></span>
                    <span className="menu-item-price" style={{ color: "var(--color-purple-dark)", fontSize: "0.85rem", fontWeight: "700" }}>{item.tag}</span>
                  </div>
                  <p className="menu-item-description">{item.description}</p>
                  {item.badge && <span className="menu-item-badge">{item.badge}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="section section-dark">
        <div className="container">
          <div className="features-grid">
            <div className="features-image">
              <div 
                className="animate-float-luxury"
                style={{ 
                  position: "relative",
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: "2px solid var(--color-border)",
                  boxShadow: "var(--glow-purple)",
                  height: "450px"
                }}
              >
                <img 
                  src="/catering_specialty.png" 
                  alt="Premium catering gourmet buffet setup" 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
                <div 
                  style={{ 
                    position: "absolute", 
                    inset: 0, 
                    background: "linear-gradient(to top, rgba(36, 14, 76, 0.95), transparent)" 
                  }}
                ></div>
                <div style={{ position: "absolute", bottom: "30px", left: "30px", right: "30px" }}>
                  <h4 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "var(--color-accent)" }}>Artistry in Every Plate</h4>
                  <p style={{ fontSize: "0.95rem", color: "#ffffff" }}>We believe catering is not just about cooking, it's about crafting an immersive dining experience that stays with your guests forever.</p>
                </div>
              </div>
            </div>

            <div className="features-content">
              <div>
                <span className="section-tag" style={{ marginBottom: "0.5rem" }}>The Violet Difference</span>
                <h2 style={{ marginBottom: "1.5rem" }}>Crafting Culinary Excellence</h2>
                <p style={{ marginBottom: "2rem" }}>We focus on absolute culinary precision, delivering fresh gourmet creations and seamless pickup solutions that exceed expectations.</p>
              </div>

              <div className="feature-item">
                <div className="feature-num">01</div>
                <div>
                  <h4 className="feature-title">Tailored Epicurean Menus</h4>
                  <p className="feature-desc">Every menu and platter is fully customizable to match your gatherings, pickup times, and dietary preferences.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-num">02</div>
                <div>
                  <h4 className="feature-title">Seamless Delivery & Pickup</h4>
                  <p className="feature-desc">Our catering staff and hub coordinators ensure your food arrives hot, fresh, and perfectly timed for your schedule.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-num">03</div>
                <div>
                  <h4 className="feature-title">Ethical & Local Sourcing</h4>
                  <p className="feature-desc">We work with local organic farms and sustainable fisheries to ensure the freshest, highest quality ingredients.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Reviews</span>
            <h2>What Our Customers Say</h2>
            <p>Delivering fresh gourmet food and catering is our passion. Here is what our customers say about their experiences.</p>
          </div>

          <div className="testimonials-grid">
            {/* Review 1 */}
            <div className="testimonial-card">
              <div>
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-quote">
                  "Royal Violet exceeded every expectation! The Truffle Mushroom Bruschetta was the talk of our wedding reception. The service was fluid, professional, and incredibly kind. We couldn't be happier."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">EG</div>
                <div>
                  <span className="author-name">Emily & Greg S.</span>
                  <p className="author-role">Wedding Catering Customers</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="testimonial-card">
              <div>
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-quote">
                  "For our annual corporate gala, we wanted something premium and seamless. The team set up a marvelous buffet that matched our brand colors, and the Sea Bass was cooked to absolute perfection."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">MC</div>
                <div>
                  <span className="author-name">Marcus Chen</span>
                  <p className="author-role">VP, Vertex Global | Corporate Catering</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="testimonial-card">
              <div>
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-quote">
                  "An intimate 50th birthday dinner that felt like a 3-Michelin star restaurant inside my own garden. Chef Antonis explained every dish, and the Elderflower Pear Cocktails were beautifully crafted."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">HL</div>
                <div>
                  <span className="author-name">Helena Laurent</span>
                  <p className="author-role">Birthday Party Platter Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry / Booking Form Section */}
      <section 
        id="contact" 
        className="section section-dark"
        style={{ 
          position: "relative", 
          overflow: "hidden",
          background: "transparent"
        }}
      >
        {/* Parallax Background */}
        <div 
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/contact_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            zIndex: 1,
            opacity: 0.8,
            pointerEvents: "none"
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="inquiry-wrapper">
            <div className="inquiry-info">
              <span className="section-tag" style={{ alignSelf: 'flex-start' }}>Get in Touch</span>
              <h2 className="inquiry-info-title">Order Catering & Takeaway</h2>
              <p className="inquiry-info-desc">
                We'd love to supply the food for your next gathering. Fill out our inquiry form, and our catering team will contact you within 24 hours.
              </p>

              <div className="contact-channels">
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <span className="contact-label">Call Us</span>
                    <span className="contact-value">+91 9495227110</span>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <span className="contact-label">Email Us</span>
                    <span className="contact-value">reserve@georgefoodscaters.com</span>
                  </div>
                </div>

                <div className="contact-item" style={{ alignItems: "flex-start" }}>
                  <div className="contact-icon" style={{ marginTop: "4px" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <span className="contact-label">Takeaway Huts</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", marginTop: "0.25rem", color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
                      <div>Adat Center: <a href="tel:7736221331" style={{ color: "var(--color-text-light)", fontWeight: "600" }}>7736221331</a></div>
                      <div>Parappur: <a href="tel:8089718087" style={{ color: "var(--color-text-light)", fontWeight: "600" }}>8089718087</a></div>
                      <div>Peramangalam: <a href="tel:9995233121" style={{ color: "var(--color-text-light)", fontWeight: "600" }}>9995233121</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form className="booking-form" onSubmit={handleFormSubmit}>
                {submitSuccess && (
                  <div className="success-message">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>Thank you! Your catering inquiry has been received. We will call you shortly.</span>
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="John Doe" 
                    className="form-input"
                    value={formState.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div>
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="john@example.com" 
                    className="form-input"
                    value={formState.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    placeholder="(555) 000-0000" 
                    className="form-input"
                    value={formState.phone}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div>
                  <label htmlFor="date" className="form-label">Catering / Pickup Date</label>
                  <input 
                    type="date" 
                    id="date" 
                    name="date" 
                    className="form-input"
                    value={formState.date}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div>
                  <label htmlFor="guests" className="form-label">Estimated Guests</label>
                  <input 
                    type="number" 
                    id="guests" 
                    name="guests" 
                    placeholder="50" 
                    min="10"
                    className="form-input"
                    value={formState.guests}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div>
                  <label htmlFor="serviceType" className="form-label">Service Type</label>
                  <select 
                    id="serviceType" 
                    name="serviceType" 
                    className="form-input"
                    value={formState.serviceType}
                    onChange={handleInputChange}
                  >
                    <option value="catering">Full-Service Catering</option>
                    <option value="delivery">Party Platter Delivery</option>
                    <option value="pickup">Hub Takeaway / Pickup</option>
                  </select>
                </div>

                <div className="form-group-full">
                  <label htmlFor="requirements" className="form-label">Dietary & Menu Requests</label>
                  <textarea 
                    id="requirements" 
                    name="requirements" 
                    placeholder="Describe your vision, dietary preferences, or specific dish interests..." 
                    className="form-input"
                    value={formState.requirements}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Sending Inquiry..." : "Submit Catering Inquiry"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
