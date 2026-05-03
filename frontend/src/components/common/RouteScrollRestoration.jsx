import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteScrollRestoration = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly snap to the top of the page when the route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // 'instant' is better here so users don't see a weird hyper-scroll
    });
  }, [pathname]);

  return null; // This component is strictly functional and renders nothing to the UI
};

export default RouteScrollRestoration;