// ShareButton.js
import React, { useState, useRef, useEffect } from "react";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { FaInstagram, FaShareAlt } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const ShareButton = ({ url, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleWebShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: `Angalia ${title} kwenye platform yetu!`,
          url: url,
        })
        .then(() => console.log("Content shared successfully!"))
        .catch((error) => console.error("Error sharing content:", error));
    } else {
      alert("Sharing is not supported on this browser.");
    }
    setIsOpen(false);
  };

  const instagramShareUrl = `https://www.instagram.com/?url=${encodeURIComponent(url)}`;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-border rounded-md shadow-sm bg-body hover:bg-theme-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 text-default dark:text-default"
      >
        <FaShareAlt className="w-4 h-4" />
        <span>Share</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-body border border-border rounded-md shadow-lg z-50 dark:bg-theme-light">
          <div className="py-1">
            {/* Web Share Button */}
            <button
              onClick={handleWebShare}
              className="w-full text-left px-4 py-2 text-sm text-default hover:bg-theme-light focus:outline-none focus:bg-theme-light transition-colors duration-150 dark:hover:bg-theme-dark dark:focus:bg-theme-dark"
            >
              Share Link
            </button>

            {/* Social Media Share Buttons */}
            <div className="px-4 py-2 hover:bg-theme-light transition-colors duration-150 dark:hover:bg-theme-dark">
              <FacebookShareButton 
                url={url} 
                quote={`Check out ${title} on our platform!`}
                className="flex items-center gap-2 w-full text-sm text-default"
              >
                <FacebookIcon size={24} round />
                <span>Facebook</span>
              </FacebookShareButton>
            </div>

            <div className="px-4 py-2 hover:bg-theme-light transition-colors duration-150 dark:hover:bg-theme-dark">
              <TwitterShareButton 
                url={url} 
                title={`Check out ${title} on our platform!`}
                className="flex items-center gap-2 w-full text-sm text-default"
              >
                <BsTwitterX size={24} className="text-dark dark:text-light" />
                <span>Twitter</span>
              </TwitterShareButton>
            </div>

            <div className="px-4 py-2 hover:bg-theme-light transition-colors duration-150 dark:hover:bg-theme-dark">
              <WhatsappShareButton 
                url={url} 
                title={`Check out ${title} on our platform!`}
                className="flex items-center gap-2 w-full text-sm text-default"
              >
                <WhatsappIcon size={24} round />
                <span>WhatsApp</span>
              </WhatsappShareButton>
            </div>

            {/* Instagram Share Button */}
            <a
              href={instagramShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm text-default hover:bg-theme-light transition-colors duration-150 dark:hover:bg-theme-dark"
              onClick={() => setIsOpen(false)}
            >
              <FaInstagram size={24} className="text-primary" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;