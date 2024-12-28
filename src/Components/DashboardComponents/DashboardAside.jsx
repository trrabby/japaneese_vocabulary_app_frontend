/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ContextApi } from "../../Providers/ContextProvider";

export const DashboardAside = () => {
  // console.log(participantsRole)
  const { isAsideOpen, setIsAsideOpen } = useContext(ContextApi);

  const dashboardLinks = [
    {
      path: "/profile",
      name: "Profile",
    },
    {
      path: "/dashboard/addLesson",
      name: "Add Lesson",
    },
    {
      path: "/dashboard/addVocabulary",
      name: "Add Vocabulary",
    },
    {
      path: "/dashboard/mngt",
      name: "Mangage Items",
    },
  ];

  return (
    <div
      className={`bg-accent w-64 h-[calc(100vh-100px)] text-base text-white font-bold py-2 rounded-lg flex flex-col md:sticky top-[90px] md:translate-x-0 absolute md:mt-0 mt-[-5px] duration-500 z-40 ${
        isAsideOpen ? "translate-x-0" : "translate-x-[-300px]"
      }`}
    >
      <div className="flex flex-col">
        {dashboardLinks.map((link) => {
          return (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsAsideOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "font-extrabold p-2 text-right text-primary"
                  : " hover:text-primary p-2 font-bold text-right hover:duration-500 hover:bg-accent"
              }
            >
              {link.name}
            </NavLink>
          );
        })}

        <hr />
      </div>
    </div>
  );
};
