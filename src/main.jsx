import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Holi2026 from './pages/Holi2026'
import AdminDashboard from './pages/AdminDashboard'
import { useEffect } from 'react'
import Lenis from 'lenis'

// Lenis is initialized once at app level — no cleanup needed inside AppWrapper
let lenisInstance = null;
let rafId = null;

function initLenis() {
  if (lenisInstance) return;

  lenisInstance = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothTouch: false,     // disable on touch devices (performance)
    touchMultiplier: 1.5,
  });

  function raf(time) {
    lenisInstance.raf(time);
    rafId = requestAnimationFrame(raf);
  }

  rafId = requestAnimationFrame(raf);
}

// Start Lenis immediately on module load
initLenis();

const AppWrapper = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    // Also reset Lenis scroll position
    if (lenisInstance) lenisInstance.scrollTo(0, { immediate: true });
  }, [location.pathname]);

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
