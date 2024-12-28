import { useContext } from "react";
import { Outlet } from "react-router-dom";

/* Animate css and aos imports */
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
AOS.init();
import "animate.css";
import { ContextApi } from "../Providers/ContextProvider";
import { Navbar } from "../Components/Navbar/Navbar";
import { Footer } from "../Pages/Footer";

export const MainLayout = () => {
  const { onTouchStart, onTouchMove, onTouchEnd } = useContext(ContextApi);

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="w-full container mx-auto"
    >
      <div className="sticky top-0 z-50">
        <Navbar></Navbar>
      </div>
      <div className="pb-5 min-h-screen">
        <Outlet></Outlet>
      </div>
      {window.location.pathname === "/" && <Footer></Footer>}
    </div>
  );
};
