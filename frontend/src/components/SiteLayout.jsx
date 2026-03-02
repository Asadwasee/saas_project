import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SiteLayout() {
  return (
    <div className="site-shell">
      <div className="bg-lava bg-lava-a" aria-hidden="true" />
      <div className="bg-lava bg-lava-b" aria-hidden="true" />
      <div className="bg-dots" aria-hidden="true" />

      <Navbar />
      <main className="page-wrap">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
