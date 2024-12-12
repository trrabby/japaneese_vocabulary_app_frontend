import { useContext } from "react";
import { Outlet } from "react-router-dom";

/* Animate css and aos imports */
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
AOS.init();
import "animate.css";
import { ContextApi } from "../Providers/ContextProvider";
import { Navbar } from "../Components/Navbar/Navbar";

export const MainLayout = () => {
  const { onTouchStart, onTouchMove, onTouchEnd } = useContext(ContextApi);

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="w-full container mx-auto"
    >
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};
