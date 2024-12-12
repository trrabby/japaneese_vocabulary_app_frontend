import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Navbar/navbar.css";
import { FiFacebook } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";
import { SiSkypeforbusiness } from "react-icons/si";
import { SlSocialLinkedin } from "react-icons/sl";
import { FaGithub } from "react-icons/fa";
import { ContextApi } from "../../Providers/ContextProvider";
import toast from "react-hot-toast";
import { Link as ScrollLink } from "react-scroll";

export const SmNavbar = () => {
  const navigate = useNavigate();
  const { goTo, setGoTo, user, signOutfromLogin, toggle, setToggle } =
    useContext(ContextApi);
  // console.log(goTo)

  const homeActive = goTo === "home";
  const aboutActive = goTo === "about";
  const projectActive = goTo === "project";
  const contactsActive = goTo === "contacts";

  const links = (
    <ul className="navbarr">
      <li>
        <ScrollLink
          to="home"
          onClick={() => {
            setGoTo("home");
            setToggle(!toggle);
          }}
          className={`md:text-fourth font-extrabold p-2 hover:text-primary ${
            homeActive ? "text-primary bg-[#0b2016] rounded-lg" : ""
          }`}
        >
          Home
        </ScrollLink>
      </li>
      <li>
        <ScrollLink
          to="about"
          onClick={() => {
            setGoTo("about");
            setToggle(!toggle);
          }}
          className={`text-fourth font-extrabold p-2 hover:text-primary 
    ${aboutActive ? "text-primary bg-[#0b2016] rounded-lg" : ""}`}
        >
          About
        </ScrollLink>
      </li>
      <li>
        <ScrollLink
          to="projects"
          onClick={() => {
            setGoTo("project");
            setToggle(!toggle);
          }}
          className={`text-fourth font-extrabold p-2 hover:text-primary ${
            projectActive ? "text-primary bg-[#0b2016] rounded-lg" : ""
          }`}
        >
          Projects
        </ScrollLink>
      </li>
      <li>
        <ScrollLink
          to=""
          onClick={() => {
            toast("Coming Soon...");
            setToggle(!toggle);
          }}
          className={`text-fourth font-extrabold p-2 hover:text-primary `}
        >
          My Blogs
        </ScrollLink>
      </li>
      <li>
        <ScrollLink
          to="contact"
          onClick={() => {
            setGoTo("contacts");
            setToggle(!toggle);
          }}
          className={`text-fourth font-extrabold p-2 hover:text-primary ${
            contactsActive ? "text-primary bg-[#0b2016] rounded-lg" : ""
          }`}
        >
          Contacts
        </ScrollLink>
      </li>
    </ul>
  );

  const social = (
    <ul className="social">
      <a href="https://facebook.com/profile.trrabby" target="_blank">
        <FiFacebook />
      </a>
      <a href="https://linkedin.com/in/towfiqueWeb" target="_blank">
        <SlSocialLinkedin />
      </a>
      <a href="https://github.com/trrabby " target="_blank">
        <FaGithub />
      </a>
      <a href="https://twitter.com/towfique_veer" target="_blank">
        <FiTwitter />
      </a>
      <a href="https://join.skype.com/invite/wj2WRec0GlAB" target="_blank">
        <SiSkypeforbusiness />
      </a>
    </ul>
  );

  const handleLogOut = async () => {
    setToggle(!toggle);
    await signOutfromLogin();
    navigate("/");
  };

  return (
    <div className="md:fixed w-full pl-0 md:ml-[-2px]">
      <div className="h-[calc(100vh-30px)] rounded-l-lg bg-accent shadow-lg shadow-primary w-full flex flex-col justify-between">
        <div className="flex items-center justify-center w-full py-5 px-6">
          <a href="/">
            <img
              className="h-30"
              src={
                "https://i.ibb.co/cTGMV5L/towfiqs-portfolio-high-resolution-logo-transparent-1.png"
              }
              alt=""
            />
          </a>
        </div>
        {!user && <div className="md:text-xl text-xl">{links}</div>}
        {user && (
          <div className="flex flex-col items-center justify-center gap-2 text-center text-white">
            <Link
              onClick={() => setToggle(!toggle)}
              to={"addProject"}
              className="p-1 px-3 border hover:bg-primary hover:text-accent w-11/12 mx-auto rounded-lg duration-500"
            >
              Add Project
            </Link>
            <Link
              onClick={() => setToggle(!toggle)}
              to={"addBlogs"}
              className="p-1 px-3 border hover:bg-primary hover:text-accent w-11/12 mx-auto rounded-lg duration-500"
            >
              Add Blog
            </Link>
            <Link
              onClick={() => setToggle(!toggle)}
              to={"manageItems"}
              className="p-1 px-3 border hover:bg-primary hover:text-accent w-11/12 mx-auto rounded-lg duration-500"
            >
              Manage Items
            </Link>
            <p className="text-base">{user.email}</p>
            <button
              onClick={handleLogOut}
              className="px-3 border bg-red-500 py-2 w-11/12 mx-auto rounded-lg font-extrabold 
        hover:bg-red-600 hover:text-white duration-300"
            >
              Log Out
            </button>
          </div>
        )}
        {/* <Link to={'dashboard/addProject'} className='p-1 px-3 border hover:bg-primary hover:text-accent w-11/12 mx-auto rounded-lg duration-500'>Add Project</Link> */}
        <div>{social}</div>
      </div>
    </div>
  );
};
