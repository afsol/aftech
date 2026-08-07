"use client";

import React from "react";
import Swal from "sweetalert2";

export default function PricingAlertPage() {
  const handleShowAlert = () => {
    // Define your contact details
    const email = "info@aftechnologies.pk";

    Swal.fire({
      title: "<strong>Pricing Not Set</strong>",
      icon: "info",
      html: `
        <div style="text-align: left; font-size: 15px; line-height: 1.6;">
          <p style="margin-bottom: 12px; color: #555;">
            Pricing has not been set for this item yet. Kindly contact us directly using the details below:
          </p>
          <ul style="list-style-type: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 8px;">
              <strong>Email:</strong> 
              <a href="mailto:${email}" style="color: #3085d6; text-decoration: none;">${email}</a>
            </li>
            <li>
              <strong>Phone:</strong> 
              <a href="tel:+923360518240" style="color: #28a745; text-decoration: none; font-weight: bold;">
                📞 +92-336-0518240 (Tap to Call)
              </a>
            </li>
          </ul>
        </div>
      `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Call Now",
      confirmButtonColor: "#28a745",
      cancelButtonText: "Close",
      cancelButtonColor: "#d33",
    }).then((result) => {
      // If the user clicks the "Call Now" button inside the alert footer
      if (result.isConfirmed) {
        window.location.href = `tel:+923360518240`;
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <button
        onClick={handleShowAlert}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: "#3085d6",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Check Pricing Details
      </button>
    </div>
  );
}
