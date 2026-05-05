/**
 * AnnouncementBar.jsx
 * Barra roxa de anúncios no topo da página.
 */

import { useEffect, useState } from "react";

export default function AnnounceBar() {
  const [showReturns, setShowReturns] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowReturns(prev => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="announce-bar">
      <div className="announce-bar__inner">
        
        <div className="announce-bar__item">
          <strong>50% OFF COUPONS</strong>
          <span>SIGN UP NOW</span>
        </div>

        <div className="announce-bar__divider" />

        <div className="announce-bar__item">
          <strong>FREE SHIPPING</strong>
          <span>SEE CONDITIONS</span>
        </div>

        <div className="announce-bar__divider" />

        <div className="announce-bar__item">
          {showReturns ? (
            <>
              <strong>FREE RETURNS</strong>
              <span>SEE CONDITIONS</span>
            </>
          ) : (
            <>
              <strong>WE SHIP ALL OVER BRAZIL</strong>
            </>
          )}
        </div>

      </div>
    </div>
  );
}