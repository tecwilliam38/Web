import React, { useState, useEffect } from 'react';
import './stylecookie.css'; // Estilize como quiser

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      <p>
        Este site utiliza cookies para melhorar sua experiência.{' '}
        <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">
          Saiba mais
        </a>
      </p>
      <button onClick={handleAccept}>Aceitar</button>
    </div>
  );
};

export default CookieBanner;