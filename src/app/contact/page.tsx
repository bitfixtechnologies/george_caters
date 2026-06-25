"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ContactPage() {
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

      {/* Inner Hero Section */}
      <section className="section" style={{ paddingTop: "160px", paddingBottom: "60px", background: "linear-gradient(180deg, var(--color-bg-light) 0%, var(--color-bg-dark) 100%)" }}>
        <div className="container">
          <div className="text-center" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span className="section-tag" style={{ marginBottom: "1rem" }}>Contact Us</span>
            <h1 className="hero-title" style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>
              Request Catering <span>& Order Pickup</span>
            </h1>
            <p className="hero-description" style={{ fontSize: "1.15rem", color: "var(--color-text-muted)" }}>
              Have questions about our catering packages, or want to arrange a large order for pickup at one of our hubs? Fill out the form below or reach us directly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="inquiry-wrapper">
            <div className="inquiry-info">
              <span className="section-tag" style={{ alignSelf: 'flex-start' }}>Get in Touch</span>
              <h2 className="inquiry-info-title">Order Catering & Takeaway</h2>
              <p className="inquiry-info-desc">
                We'd love to supply the food for your next gathering. Fill out our inquiry form, and our catering team will contact you within 24 hours.
              </p>

              <div className="contact-channels" style={{ marginTop: "2.5rem" }}>
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <span className="contact-label">Call Us</span>
                    <span className="contact-value">+1 (555) 797-8890</span>
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

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <span className="contact-label">Headquarters</span>
                    <span className="contact-value">742 Gourmet Ave, Beverly Hills, CA</span>
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
                    <span>Thank you! Your catering/takeaway inquiry has been received. We will contact you shortly.</span>
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
                  <label htmlFor="requirements" className="form-label">Dietary & Platter Requests</label>
                  <textarea 
                    id="requirements" 
                    name="requirements" 
                    placeholder="Describe your vision, platter selections, pickup hub preference, or dietary options..." 
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

      {/* Hub Locations */}
      <section className="section">
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: "4rem" }}>
            <span className="section-tag">Find Us</span>
            <h2>Our Takeaway Food Hubs</h2>
            <p>Select your preferred pickup location when placing an order or inquiry.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            <div className="service-card" style={{ padding: "2.5rem" }}>
              <h4 style={{ fontSize: "1.25rem", color: "var(--color-accent)", marginBottom: "0.5rem" }}>Beverly Hills Hub</h4>
              <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", marginBottom: "1rem" }}>742 Gourmet Ave, Beverly Hills, CA 90210</p>
              <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>Hours: 10:00 AM - 10:00 PM</span>
            </div>
            <div className="service-card" style={{ padding: "2.5rem" }}>
              <h4 style={{ fontSize: "1.25rem", color: "var(--color-accent)", marginBottom: "0.5rem" }}>Downtown LA Hub</h4>
              <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", marginBottom: "1rem" }}>108 Culinary Way, Los Angeles, CA 90012</p>
              <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>Hours: 11:00 AM - 11:00 PM</span>
            </div>
            <div className="service-card" style={{ padding: "2.5rem" }}>
              <h4 style={{ fontSize: "1.25rem", color: "var(--color-accent)", marginBottom: "0.5rem" }}>Santa Monica Hub</h4>
              <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", marginBottom: "1rem" }}>45 Ocean Terrace, Santa Monica, CA 90401</p>
              <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>Hours: 10:00 AM - 09:00 PM</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
