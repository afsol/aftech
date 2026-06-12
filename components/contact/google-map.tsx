"use client"; // Only if you’re using App Router with Client Components

import React from "react";

export default function ContactMap() {
  return (
    <div className="w-full flex justify-center my-8">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.4909112089877!2d73.1357631755389!3d33.56660107334372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfedb0ed1f7423%3A0x4104040b13593336!2sAF%20Technologies%20Security%20Solution!5e0!3m2!1sen!2s!4v1752671492831!5m2!1sen!2s"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded shadow-lg"
      ></iframe>
    </div>
  );
}
