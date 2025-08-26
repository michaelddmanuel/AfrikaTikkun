import React, { useState, useEffect } from 'react';

interface DOMRenderGuardProps {
  children: React.ReactNode;
  waitTime?: number;
}

/**
 * A simple component that delays rendering to prevent DOM measurement errors
 */
const DOMRenderGuard: React.FC<DOMRenderGuardProps> = ({ 
  children, 
  waitTime = 100 
}) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, waitTime);

    return () => clearTimeout(timer);
  }, [waitTime]);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
};

export default DOMRenderGuard;
