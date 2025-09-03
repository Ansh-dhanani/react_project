import React, { useState, useEffect } from "react";

const Loading = ({ onLoadingComplete }) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // Check if first visit
    const hasVisited = localStorage.getItem('hasVisitedPortfolio');

    if (!hasVisited) {
      // First time visitor - show loading for 5 seconds
      setShowLoading(true);

      const timer = setTimeout(() => {
        setShowLoading(false);
        localStorage.setItem('hasVisitedPortfolio', 'true');
        if (onLoadingComplete) {
          onLoadingComplete();
        }
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      // Returning visitor - skip loading
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    }
  }, [onLoadingComplete]);

  if (!showLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <div className="text-xl font-semibold text-gray-700">Loading...</div>
      <div className="text-sm text-gray-500 mt-2">Please wait 5 seconds</div>
    </div>
  );
};

export default Loading;
