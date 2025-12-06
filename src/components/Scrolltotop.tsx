import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation(); // Hook to get the current location

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [pathname]); // Dependency on pathname (which changes when the route changes)

  return null; // No UI rendered
};

export default ScrollToTop;
