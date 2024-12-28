/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ContextApi } from "../../Providers/ContextProvider";

export const DashboardAside = () => {
  // console.log(participantsRole)
  const { user, isAsideOpen, setIsAsideOpen } = useContext(ContextApi);
  const admin = user.role === "admin";

  return (
    <div
      className={`bg-accent w-64 h-[calc(100vh-100px)] text-base text-white font-bold py-2 rounded-lg flex flex-col md:sticky top-[90px] md:translate-x-0 absolute md:mt-0 mt-[-5px] duration-500 z-40 ${
        isAsideOpen ? "translate-x-0" : "translate-x-[-300px]"
      }`}
    >
      {admin && (
        <div className="flex flex-col">
          <NavLink
            to={"profile"}
            onClick={() => setIsAsideOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-white font-extrabold p-2 text-right underline"
                : "hover:text-white hover:underline p-2 font-bold text-right hover:duration-500 hover:bg-accent"
            }
          >
            Profile
          </NavLink>
          <NavLink
            to={"/dashboard/addLesson"}
            onClick={() => setIsAsideOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-white underline font-extrabold p-2 text-right"
                : "hover:text-white hover:underline p-2 font-bold text-right hover:duration-500 hover:bg-accent"
            }
          >
            Add Lesson
          </NavLink>
          <NavLink
            to={"/dashboard/addVocabulary"}
            onClick={() => setIsAsideOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-white underline font-extrabold p-2 text-right"
                : "hover:text-white hover:underline p-2 font-bold text-right hover:duration-500 hover:bg-accent"
            }
          >
            Add Vocabulary
          </NavLink>
          <NavLink
            to={"mngRegCamp"}
            onClick={() => setIsAsideOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-white underline font-extrabold p-2 text-right"
                : "hover:text-white hover:underline p-2 font-bold text-right hover:duration-500 hover:bg-accent"
            }
          >
            Manage Registered Camp
          </NavLink>{" "}
          <hr />
        </div>
      )}
    </div>
  );
};
