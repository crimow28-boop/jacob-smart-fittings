import React, { useEffect } from 'react';

export default function SEO({ title, description, keywords }) {
  useEffect(() => {
    // Update title
    const brandName = "ג׳ייקוב פרזול חכם | Jacob Smart Fittings";
    if (title) {
        document.title = `${title} | ${brandName}`;
    } else {
        document.title = brandName;
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

    // Update meta keywords
    if (keywords) {
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.name = "keywords";
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.content = keywords;
    }
  }, [title, description, keywords]);

  return null;
}