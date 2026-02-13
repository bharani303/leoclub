import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Holi2026 from './pages/Holi2026'
import AdminDashboard from './pages/AdminDashboard'
import { useEffect } from 'react'
import Lenis from 'lenis'

// Wrapper to handle Lenis and Route changes
const AppWrapper = () => {
  const location = useLocation();

  useEffect(() => {
    // Re-initialize or reset scroll on route change if needed
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/holi-2026" element={<Holi2026 />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </StrictMode>,
)
