/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAxiosSecure } from "../Components/Hooks/useAxiosSecure";

export const ContextApi = createContext(null);

export const ContextProvider = ({ children }) => {
  const [goTo, setGoTo] = useState("home");
  // console.log(goTo)
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true); // Added to track user loading
  const [err, setErr] = useState(null);
  const [user, setUser] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [toggle, setToggle] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 30; // minimum distance in px to be considered a swipe

  const onTouchStart = (e) => {
    setTouchEnd(null); // clear touchEnd to prevent multiple swipes
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setToggle(!toggle);
      // console.log('LEFT swipe');
    }

    if (isRightSwipe) {
      setToggle(true);
      // console.log('right swipe');
    }
  };

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setUserLoading(false); // Set user loading to false once done
  }, []);

  useEffect(() => {
    // Logging the user after it has been updated
    console.log("CurrentUser-->", user);
  }, [user]); // This effect runs every time 'user' changes

  const handleLogout = async () => {
    try {
      await axiosSecure.post("/logout");
      localStorage.removeItem("user");
      toast.success("Signed Out Successfully");
      setUser(null);
    } catch (err) {
      console.error("Error logging out", err);
    }
  };

  const ContextValue = {
    goTo,
    setGoTo,
    handleLogout,
    loading,
    setLoading,
    userLoading, // Expose userLoading to context consumers
    err,
    setErr,
    user,
    setUser,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    toggle,
    setToggle,
    isAsideOpen,
    setIsAsideOpen,
  };

  return (
    <ContextApi.Provider value={ContextValue}>{children}</ContextApi.Provider>
  );
};
