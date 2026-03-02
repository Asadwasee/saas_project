import "./index.css";
import HomePage from "./pages/HomePage";
import PricingPage from "./pages/PricingPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import FaqPage from "./pages/FaqPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import SimpleNavbar from "./components/SimpleNavbar";

const routeMap = {
  "/": HomePage,
  "/home": HomePage,
  "/homepage": HomePage,
  "/pricing": PricingPage,
  "/case-studies": CaseStudiesPage,
  "/faq": FaqPage,
  "/contact": ContactPage,
};

function getPathname() {
  const path = window.location.pathname || "/";
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

function App() {
  const CurrentPage = routeMap[getPathname()] || NotFoundPage;

  return (
    <div className="site-shell">
      <div className="bg-lava bg-lava-a" aria-hidden="true" />
      <div className="bg-lava bg-lava-b" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />

      <SimpleNavbar />
      <main className="page-wrap">
        <CurrentPage />
      </main>
    </div>
  );
}

export default App;
