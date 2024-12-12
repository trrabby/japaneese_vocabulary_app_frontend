/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAxiosSecure } from "../Components/Hooks/useAxiosSecure";

export const ContextApi = createContext(null);

export const ContextProvider = ({ children }) => {
  const [goTo, setGoTo] = useState("home");
  // console.log(goTo)
  const [loading, setLoading] = useState(false);
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
    // Loading user from localStorage on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // Empty dependency array means this effect runs only once, on mount

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

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     console.log("CurrentUser-->", currentUser);
  //     setLoading(false);
  //     // if user exist then provide a token
  //     if (currentUser) {
  //       const loggedPerson = { email: currentUser.email };

  //       try {
  //         axiosSecure
  //           .post("/jwt", loggedPerson)
  //           .then((res) => console.log("token response", res.data));
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //   });
  //   return () => {
  //     return unsubscribe();
  //   };
  // }, [user]);

  // const signOutfromLogin = async () => {
  //   toast.success("Signed Out Successfully");
  //   // const {data} = await axiosSecure.post('/logout')
  //   // console.log('cookie logout',data)
  //   return signOut(auth);
  // };

  const ContextValue = {
    goTo,
    setGoTo,
    handleLogout,
    loading,
    setLoading,
    err,
    setErr,
    user,
    setUser,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    toggle,
    setToggle,
  };

  return (
    <ContextApi.Provider value={ContextValue}>{children}</ContextApi.Provider>
  );
};
