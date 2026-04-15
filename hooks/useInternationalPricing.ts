'use client';

import { useState, useEffect } from 'react';

export function useInternationalPricing() {
  const [isInternational, setIsInternational] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkLocation = async () => {
      try {
        // Check localStorage first to avoid repeated API calls
        const cachedCountry = localStorage.getItem('user_country');
        
        if (cachedCountry) {
          setIsInternational(cachedCountry !== 'IN');
          setIsReady(true);
          return;
        }

        // Fetch from geojs.io (free, no auth, CORS enabled)
        const response = await fetch('https://get.geojs.io/v1/ip/country.json');
        
        if (response.ok) {
          const data = await response.json();
          const countryCode = data.country; // e.g., 'IN', 'US', 'GB'
          
          localStorage.setItem('user_country', countryCode);
          setIsInternational(countryCode !== 'IN');
        }
      } catch (error) {
        console.error('Error fetching location:', error);
        // Default to non-international on error
        setIsInternational(false);
      } finally {
        setIsReady(true);
      }
    };

    checkLocation();
  }, []);

  return { isInternational, isReady };
}
