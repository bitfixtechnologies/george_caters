"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Header / Navigation */}
      <header className={`header ${isScrolled ? "header-scrolled" : ""}`}>
        <div className="container">
          <Link href="/" className="logo">
            <img src="/logo.png?v=2" alt="George Foods & Caters Logo" className="logo-img" />
            <span className="logo-text">GEORGE FOODS & CATERING</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="nav-bar">
            <ul className="nav-menu">
              <li>
                <Link 
                  href="/" 
                  className={`nav-link ${pathname === "/" ? "active" : ""}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className={`nav-link ${pathname === "/about" ? "active" : ""}`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/#services" 
                  className="nav-link"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/menu" 
                  className={`nav-link ${pathname === "/menu" ? "active" : ""}`}
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className={`nav-link ${pathname === "/contact" ? "active" : ""}`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="nav-actions">
            <Link 
              href="/contact" 
              className="btn btn-primary" 
              style={{ padding: "0.5rem 1.5rem", fontSize: "0.9rem" }}
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? "open" : ""}`}>
        <Link href="/" className="logo" style={{ marginBottom: "2rem" }} onClick={() => setMobileMenuOpen(false)}>
          <img src="/logo.png?v=2" alt="George Foods & Caters Logo" className="logo-img" />
          <span className="logo-text">GEORGE FOODS & CATERS</span>
        </Link>
        <Link href="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
        <Link href="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</Link>
        <Link href="/#services" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Services</Link>
        <Link href="/menu" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Menu</Link>
        <Link href="/contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        <Link href="/contact" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>Book Now</Link>
      </div>
    </>
  );
}
