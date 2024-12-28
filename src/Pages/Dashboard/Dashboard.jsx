import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { BsMenuButtonWide } from "react-icons/bs";
import { ContextApi } from "../../Providers/ContextProvider";
import { DashboardAside } from "../../Components/DashboardComponents/DashboardAside";

export const DashBoard = () => {
  const { isAsideOpen, setIsAsideOpen } = useContext(ContextApi);

  const handleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  return (
    <div className="flex gap-3">
      <div className="py-2  w-[20%]">
        <div className="fixed">
          <DashboardAside></DashboardAside>
        </div>

        <button
          onClick={handleAside}
          className="md:hidden absolute p-2 right-0"
        >
          <BsMenuButtonWide className="w-6 h-6" />
        </button>
      </div>
      <div className="mt-3 flex-1 ">
        <Outlet></Outlet>
      </div>
    </div>
  );
};
