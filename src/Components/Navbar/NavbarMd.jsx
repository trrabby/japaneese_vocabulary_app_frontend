import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { ContextApi } from "../../Providers/ContextProvider";

export const NavbarMd = () => {
  const { user, handleLogout } = useContext(ContextApi);

  const [theme, setTheme] = useState("light");
  const savedTheme = localStorage.getItem("theme");

  const handleToggle = (e) => {
    const value = e.target.checked;
    console.log(value);
    console.log(theme);

    if (value) {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const getTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", getTheme);
  }, [theme]);

  const handleToast = () => {
    if (!user) {
      // setLoading(false)
      return toast.error("log in required to proceed");
    }
  };

  const navlinks = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/lessons",
      name: "Lessons",
    },
    {
      path: "/vocabularies",
      name: "Vocabularies",
    },
  ];
  return (
    <div className="flex items-center bg-accent text-black sticky shadow-sm shadow-[#4d4d00] top-0 rounded-b-2xl justify-center z-30 w-full">
      <div className="navbar  flex justify-between items-center">
        <div className="flex flex-row lg:flex-row justify-between items-center lg:flex-1">
          <div>
            <p className="text-primary text-3xl font-extrabold p-2 px-4">
              <span className="text-cyan-500 text-4xl">Tokyo</span>Bangla
            </p>
          </div>
          {/* Menu */}
          <div className="p-0 flex flex-1 justify-around">
            {/* Menu lg */}
            <div className="navbar-center hidden md:flex gap-3 text-fourth">
              {navlinks.map((navLink) => {
                return (
                  <NavLink
                    onClick={handleToast}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary font-extrabold p-2"
                        : "hover:text-primary p-2 font-extrabold"
                    }
                    to={navLink.path}
                    key={navLink.path} // Ensure a unique key
                  >
                    {navLink.name}
                  </NavLink>
                );
              })}

              {!user && (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-extrabold p-2"
                      : "hover:text-primary p-2 font-extrabold"
                  }
                  to={"/logIn"}
                >
                  Log In
                </NavLink>
              )}
              {!user && (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-extrabold p-2"
                      : "hover:text-primary p-2 font-extrabold"
                  }
                  to={"/register"}
                >
                  Register
                </NavLink>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 text-primary">
          <div
            className="dropdown dropdown-end tooltip tooltip-bottom"
            data-tip="Profile"
          >
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              {user ? (
                <>
                  <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button">
                      <div className=" font-bold h-8 w-8 rounded-full">
                        {user.photoUrl ? (
                          <div className="h-full w-full">
                            <img
                              className="rounded-full object-center"
                              src={user.photoUrl}
                            />
                          </div>
                        ) : (
                          <FaUserCircle className="w-full h-full" />
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className="tooltip tooltip-bottom flex items-center justify-center"
                  data-tip="Settings"
                >
                  <button className="border-none">
                    {" "}
                    <FaUserCircle className="w-8 h-8" />
                  </button>
                </div>
              )}
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 dark:bg-white rounded-box w-64 text-black font-bold"
            >
              <li>
                {user && (
                  <a className="justify-between hover:text-accent">
                    {user.name || "No Name Found"}
                  </a>
                )}
                {user && (
                  <a className="justify-between hover:text-accent">
                    {user.email || "No email Found"}
                  </a>
                )}
              </li>
              <li>
                <a>
                  Dashboard{" "}
                  <span className="badge">{user?.role || "No Role Found"}</span>
                </a>
              </li>

              {user && (
                <li>
                  <Link
                    to={"/login"}
                    onClick={() => handleLogout()}
                    className="btn btn-ghost hover:text-red-700"
                  >
                    Sign Out
                  </Link>
                </li>
              )}
              <Link to={"/login"}>
                {!user && (
                  <li>
                    <button className="btn btn-ghost font-bold">Log In</button>
                  </li>
                )}
              </Link>
            </ul>
          </div>

          <label
            htmlFor="AcceptConditions"
            className="relative h-8 w-14 cursor-pointer rounded-full bg-third transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-primary"
          >
            <input
              onChange={handleToggle}
              defaultChecked={savedTheme === "dark" ? true : false}
              type="checkbox"
              id="AcceptConditions"
              className="peer sr-only"
            />

            <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-accent ring-[6px] ring-inset ring-white transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-accent peer-checked:ring-transparent"></span>
          </label>
        </div>
      </div>
    </div>
  );
};
