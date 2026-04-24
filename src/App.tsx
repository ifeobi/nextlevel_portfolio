import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
} from "./components";
const StarsCanvas = lazy(() => import("./components/canvas/Stars"));
import PrivacyPolicy from "./pages/PrivacyPolicy";
const ChatWidget = lazy(() => import("./ifex/ChatWidget"));

const Footer = () => (
  <footer className="w-full py-4 px-6 flex justify-center items-center gap-6 border-t border-[#1a1a4a]" style={{ backgroundColor: "#050816" }}>
    <p className="text-[#aaa6c3] text-[12px]">
      © {new Date().getFullYear()} Ife Obijiofor
    </p>
    <span className="text-[#2a2a6a]">·</span>
    <Link to="/privacy-policy" className="text-[#aaa6c3] text-[12px] hover:text-[#915eff] transition-colors">
      Privacy Policy
    </Link>
  </footer>
);

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="relative z-10 bg-primary">
                <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                  <Navbar />
                  <Hero />
                </div>
                <About />
                <Experience />
                <Tech />
                <Works />
              </div>
              <div className="relative z-0">
                <Contact />
                <Suspense fallback={null}>
                  <StarsCanvas />
                </Suspense>
              </div>
              <Footer />
              <Suspense fallback={null}>
                <ChatWidget />
              </Suspense>
            </>
          }
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
    <Analytics />
    </>
  );
};

export default App;
