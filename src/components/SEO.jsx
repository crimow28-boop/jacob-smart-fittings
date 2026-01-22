import React, { useEffect } from 'react';

export default function SEO({ title, description }) {
  useEffect(() => {
    // Update title
    if (title) {
        document.title = `${title} | Jacob Smart Fittings`;
    }

    // Update meta description
    if (description) {
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = "description";
            document.head.appendChild(metaDescription);
        }
        metaDescription.content = description;
    }
  }, [title, description]);

  return null;
}