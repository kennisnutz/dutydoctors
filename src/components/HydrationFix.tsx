import React, { useState, useEffect } from 'react';

function HydrationFix({ children }: { children: React.ReactNode }) {
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    setShowing(true);
  }, []);

  if (!showing) {
    return null;
  }
  return <div>{children}</div>;
}

export default HydrationFix;
