import React from "react";
import "./WhatsAppWidget.css";

const WhatsAppWidget = () => {
  const phoneNumber = "918667696097";

  const message = encodeURIComponent(
    "Hello, I would like to know more about your services."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-widget"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="whatsapp-widget__text">
        Chat with us
      </span>

      <span className="whatsapp-widget__icon">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
          alt="WhatsApp"
        />
      </span>
    </a>
  );
};

export default WhatsAppWidget;