import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { ContextApi } from "../Providers/ContextProvider";
import { SectionHead } from "../Components/SectionHead";
import { LoadingSpinner } from "../Components/LoadingSpinner";
import { useAxiosSecure } from "../Components/Hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { loading, setLoading, setUser, setErr, err } = useContext(ContextApi);
  const [toggle, setToggle] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formInfo) => {
    // console.log(formInfo)
    setLoading(true);
    const email = formInfo.email;
    const password = parseInt(formInfo.pass);
    try {
      const response = await axiosSecure.post("/login", { email, password });
      const { user } = response.data;
      console.log(user);
      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      toast.success("Login Successfully");
      navigate(location?.state ? location.state : "/");
      setErr("");
      reset();
    } catch (err) {
      toast.error("Information mismatched. Please check back.");
      setErr(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center login">
      <SectionHead
        title={"Your IP is in danger!"}
        special={"You are getting tracked. Leave this page soon."}
      ></SectionHead>
      <div className="flex flex-col lg:flex-row items-center justify-center text-center w-full">
        <div className="lg:w-6/12 rounded-lg mb-5 lg:mt-5 flex flex-col items-center justify-center text-center  ">
          <div className="w-full rounded-lg mb-5 mt-5 flex flex-col items-center justify-center text-center">
            <Helmet>
              <title> TokyoBangla | Login</title>
            </Helmet>

            <div className="w-full mx-auto flex flex-col items-center justify-center  text-white bg-[#36215eb2] p-5 min-h-[calc(100vh-270px)] rounded-xl space-y-2 font-extrabold md:my-5 shadow-lg shadow-accent hover:shadow-primary">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-auto mt-10 flex flex-col gap-5 w-full lg:w-8/12"
              >
                <label className="input input-bordered flex items-center gap-2 animate__animated animate__flipInX animate__slow	1s">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    className="text-white md:bg-slate-800 bg-black w-full p-3 rounded-lg"
                    type="email"
                    name="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                  />
                </label>
                {errors.email && (
                  <span className="text-red-600 text-xs">
                    This field is required
                  </span>
                )}

                <div>
                  <label className="input input-bordered flex items-center gap-2 animate__animated animate__flipInX animate__slow 1s">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <input
                      className="text-white md:bg-slate-800 bg-black w-full p-3 rounded-lg"
                      type={toggle ? "text" : "password"}
                      placeholder="Password"
                      name="pass"
                      {...register("pass", { required: true })}
                    />
                    <span
                      onClick={() => setToggle(!toggle)}
                      className="flex right-0 text-white font-extrabold"
                    >
                      {toggle ? (
                        <FaRegEyeSlash className="text-fourth font-extrabold h-10" />
                      ) : (
                        <FaRegEye className="text-fourth font-extrabold h-10" />
                      )}
                    </span>
                  </label>
                </div>
                {errors.pass && (
                  <span className="text-red-600 text-xs">
                    This field is required
                  </span>
                )}
                {err && (
                  <p className="text-red-500 flex w-full text-xs">{err}</p>
                )}

                <button
                  className=" hover:bg-primary text-black hover:text-accent w-6/12 mx-auto p-3 rounded-xl bg-fourth duration-500"
                  type="submit"
                >
                  {loading ? <LoadingSpinner></LoadingSpinner> : "Get In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
