
import React from 'react';

interface HeroBackgroundProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ videoRef }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute w-full h-full object-cover"
        style={{ filter: 'brightness(0.4) saturate(1.2)' }}
      >
        <source src="https://cdn.pixabay.com/video/2022/06/21/121470-724697516_large.mp4" type="video/mp4" />
      </video>
      {/* Stronger gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-blue-950/85 to-teal-950/80"></div>
      {/* Additional subtle patterns for depth */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjwvcmVjdD4KPC9zdmc+')] opacity-20"></div>
    </div>
  );
};

export default HeroBackground;
