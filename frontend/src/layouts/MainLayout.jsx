import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-64 p-10">
        {children}
        <Footer />
      </div>

    </div>
  );
}