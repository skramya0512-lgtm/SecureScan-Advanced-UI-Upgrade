import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/layout.css";

function MainLayout() {
  return (
    <div className="layout">

      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}

export default MainLayout;