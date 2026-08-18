"use client";

import React from "react";
import Link from "next/link";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-logo-desc">
            <Link href="/" className="logo">
              <img src="/logo.png?v=2" alt="George Foods & Caters Logo" className="logo-img" />
              <span className="logo-text">GEORGE FOODS</span>
            </Link>
            <p className="footer-desc">
              Exquisite culinary arts, professional coordination, and outstanding service for weddings, gatherings, and daily takeaway hubs.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/" className="footer-link">Home</Link></li>
              <li><Link href="/about" className="footer-link">About Us</Link></li>
              <li><Link href="/#services" className="footer-link">Specialties</Link></li>
              <li><Link href="/menu" className="footer-link">Signature Menu</Link></li>
              <li><Link href="/contact" className="footer-link">Contact & Order</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Our Services</h4>
            <ul className="footer-links">
              <li><Link href="/#services" className="footer-link">Wedding Catering</Link></li>
              <li><Link href="/#services" className="footer-link">Corporate Catering</Link></li>
              <li><Link href="/#services" className="footer-link">Takeaway Food Hubs</Link></li>
              <li><Link href="/menu" className="footer-link">Gourmet Party Platters</Link></li>
              <li><Link href="/contact" className="footer-link">Custom Menu Design</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Contact & Order</h4>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <div style={{ display: "inline-flex", alignItems: "center", flexWrap: "wrap", gap: "0.4rem" }}>
                  <a href="tel:+919495227110" style={{ color: "white" }}>+91 9495227110</a>
                  <a
                    href="https://wa.me/919495227110?text=Hello%20George%20Foods%20%26%20Caters%2C%20I%20would%20like%20to%20inquire%20about%20catering%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-inline-badge"
                    title="Chat with us on WhatsApp"
                  >
                    <WhatsAppIcon size={14} /> WhatsApp
                  </a>
                </div>
              </div>
              <div className="footer-contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>Georgefood85@gmail.com</span>
              </div>
              <div style={{ marginTop: "1rem", borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "1rem" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--color-accent)", display: "block", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Takeaway Huts</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.85rem" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.3rem" }}>
                    <span>Adat Center: <a href="tel:7736221331" style={{ color: "white" }}>7736221331</a></span>
                    <a
                      href="https://wa.me/917736221331?text=Hello%20George%20Foods%20Adat%20Center%2C%20I%20would%20like%20to%20place%20an%20order."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whatsapp-inline-badge"
                      title="WhatsApp Adat Center"
                    >
                      <WhatsAppIcon size={13} /> Chat
                    </a>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.3rem" }}>
                    <span>Parappur: <a href="tel:8089718087" style={{ color: "white" }}>8089718087</a></span>
                    <a
                      href="https://wa.me/918089718087?text=Hello%20George%20Foods%20Parappur%2C%20I%20would%20like%20to%20place%20an%20order."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whatsapp-inline-badge"
                      title="WhatsApp Parappur"
                    >
                      <WhatsAppIcon size={13} /> Chat
                    </a>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.3rem" }}>
                    <span>Peramangalam: <a href="tel:9995233121" style={{ color: "white" }}>9995233121</a></span>
                    <a
                      href="https://wa.me/919995233121?text=Hello%20George%20Foods%20Peramangalam%2C%20I%20would%20like%20to%20place%20an%20order."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whatsapp-inline-badge"
                      title="WhatsApp Peramangalam"
                    >
                      <WhatsAppIcon size={13} /> Chat
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} George Foods & Caters. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link">Privacy Policy</a>
            <a href="#" className="footer-bottom-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
