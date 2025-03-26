
import React from 'react';

const HeroBackground: React.FC<{
  videoRef: React.RefObject<HTMLVideoElement>;
  videoLoaded?: boolean;
}> = ({ videoRef, videoLoaded = false }) => {
  return (
    <>
      {/* Static background gradient - shown immediately */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-blue-950 to-teal-950"></div>
      
      {/* Video background - only requested after critical content is loaded */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        className={`absolute w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-20' : 'opacity-0'}`}
        style={{ filter: 'brightness(0.3) saturate(1.2)' }}
      />
      
      {/* Subtle patterns - loaded with CSS to improve performance */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjwvcmVjdD4KPC9zdmc+')] opacity-20"></div>
    </>
  );
};

export default HeroBackground;
