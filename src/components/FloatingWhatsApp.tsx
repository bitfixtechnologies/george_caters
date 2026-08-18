"use client";

import React from "react";
import WhatsAppIcon from "./WhatsAppIcon";

export default function FloatingWhatsApp() {
  const phoneNumber = "919495227110";
  const defaultMessage = encodeURIComponent(
    "Hello George Foods & Caters, I would like to inquire about your catering services."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="whatsapp-float-container">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        aria-label="Chat with George Foods on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <div className="whatsapp-float-pulse" />
        <WhatsAppIcon size={30} color="#FFFFFF" />
        <span className="whatsapp-float-tooltip">Chat on WhatsApp</span>
      </a>
    </div>
  );
}
