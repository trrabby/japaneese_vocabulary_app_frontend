import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Form, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ContextApi } from "../Providers/ContextProvider";
import { MdAddPhotoAlternate } from "react-icons/md";
import { LoadingSpinner } from "../Components/LoadingSpinner";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAxiosSecure } from "../Components/Hooks/useAxiosSecure";

export const Register = () => {
  const { setErr, err, loading, setLoading, setUser } = useContext(ContextApi);
  const [toggle, setToggle] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [thumbnail, setThumbnails] = useState("");

  const onSubmit = async (formInfo) => {
    if (!thumbnail) {
      return toast.error("Please add at lease one photo.");
    } else {
      delete formInfo.img;

      const infoWithAddl = {
        ...formInfo,
        photoUrl: thumbnail,
      };
      //   console.log(infoWithAddl);
      try {
        setLoading(true);
        const { data } = await axiosSecure.post(
          "/users/create-user",
          infoWithAddl
        );
        // console.log(data);
        const user = data.data;

        if (user) {
          toast.success("User created successfully");
          delete user.password;
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          navigate("/lessons");
          reset();
        }
      } catch (err) {
        toast.error("Please check back all information");
        console.log(err.response.data);
        setErr(
          `${err.message}, keep in mind that user can be created once with one email.`
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePhotoPreview = async (e) => {
    setLoading(true);
    const file = e.target.files[0]; // Get the first file only
    const formData = new FormData();

    formData.append("image", file);

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_aip_imgbb}`,
        formData
      );
      const photoUrl = data.data.display_url; // Get the photo URL

      // Update the thumbnail with the new photo URL
      setThumbnails(photoUrl); // Set the photo URL as a string
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const handleDeletePhoto = () => {
    // Clear the thumbnail
    setThumbnails("");
  };

  return (
    <div className="lg:w-full w-10/12 mx-auto mt-5 bg-cover bg-center rounded-lg flex flex-col items-start justify-center text-center md:p-10 lg:p-0 border-2  ">
      <Helmet>
        <title>TokyoBangla | Register</title>
      </Helmet>
      <div className="lg:w-10/12 md:w-11/12 w-full mx-auto flex gap-5 items-center justify-center  text-black rounded-xl space-y-2 font-extrabold ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto flex flex-1 flex-col gap-5 lg:w-8/12 md:w-10/12 w-full relative"
        >
          <label
            data-aos="zoom-out-right"
            data-aos-duration="1000"
            className="input input-bordered flex items-center gap-2"
          >
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
              className="text-black w-full text-sm"
              type="email"
              name="email"
              placeholder="Email"
              required
              {...register("email", { required: true })}
            />
          </label>
          {errors.email && (
            <span className="text-red-600 text-xs">This field is required</span>
          )}

          <label
            data-aos="zoom-out-left"
            data-aos-duration="1000"
            className="input input-bordered flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              className="text-black w-full"
              type="text"
              name="name"
              placeholder="Full Name"
              required
              {...register("name", { required: true })}
            />
          </label>
          {errors.name && (
            <span className="text-red-600 text-xs">This field is required</span>
          )}
          <label
            data-aos="zoom-out-right"
            data-aos-duration="1000"
            className="input input-bordered flex items-center gap-2 relative"
          >
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
              className="text-black w-full"
              type={toggle ? "text" : "password"}
              placeholder="Password"
              name="password"
              required
              {...register("password", { required: true })}
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
          {errors.password && (
            <span className="text-red-600 text-xs">This field is required</span>
          )}
          {err && <p className="text-red-500 flex w-full text-xs">{err}</p>}

          {loading && (
            <div className="md:hidden flex items-center justify-center gap-4">
              <p>Please Wait..</p>
              <LoadingSpinner></LoadingSpinner>
            </div>
          )}
          <Form
            onInput={handlePhotoPreview}
            className="input input-bordered flex items-center gap-2 animate__animated animate__flipInX animate__slow 1s fileLvl"
          >
            <MdAddPhotoAlternate className="h-7 w-7" />
            <input
              className="w-full imgFile cursor-pointer"
              type="file"
              name="img"
              placeholder="Thumbnail Image"
              accept="image/*"
              {...register("img", { required: true })}
            />
          </Form>
          {errors.img && (
            <span className="text-red-600 text-xs">This field is required</span>
          )}
          <Link
            to={"/login"}
            onClick={() => setErr(null)}
            className="text-sm text-primary font-extrabold text-left flex gap-2 w-auto "
          >
            Have an account?{" "}
            <span className="hover:text-accent text-black">Log in</span>
          </Link>
          <button
            className="btn btn-outline text-white bg-accent hover:bg-primary hover:text-black"
            type="submit"
          >
            Register
          </button>
        </form>

        <div className="flex-col items-start justify-start w-4/12 bg-center bg-cover lg:flex hidden">
          {loading && (
            <div className="md:flex items-center justify-center gap-4 hidden">
              <p>Please Wait..</p>
              <LoadingSpinner></LoadingSpinner>
            </div>
          )}
          {!thumbnail && (
            <div className="w-full bg-center bg-cover bg-[url('https://i.ibb.co/fnpD264/sign-up-concept-illustration-114360-7895.jpg')] lg:flex hidden">
              <p className="w-full lg:h-96 text-white">
                {" "}
                <span className="bg-accent  rounded-lg"></span>{" "}
              </p>
            </div>
          )}

          {thumbnail && (
            <div
              className={`w-full lg:flex flex-col hidden bg-white p-2 rounded-xl`}
            >
              <p className="w-full text-black pb-5">
                <span className="underline rounded-lg p-3">Image Previews</span>
              </p>
              <div className="grid grid-flow-row grid-cols-1 gap-2 justify-around ">
                <div className="relative hover:z-50 hover:scale-150 duration-300">
                  <img
                    className={`rounded-lg mb-2 p-2 hover:shadow-accent shadow-sm cursor-pointer`}
                    src={thumbnail}
                    alt=""
                  />
                  <button
                    onClick={() => handleDeletePhoto()}
                    className="absolute top-1 right-3 p-1 text-red-600 font-extrabold text-xl duration-500 hover:cursor-pointer hover:bg-red-600 hover:text-white rounded-full"
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
