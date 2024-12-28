import { useContext } from "react";
import { SectionHead } from "../../../Components/SectionHead";
import { Helmet } from "react-helmet-async";
import { ContextApi } from "../../../Providers/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useAxiosSecure } from "../../../Components/Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { FaPen } from "react-icons/fa";
import toast from "react-hot-toast";
import { LoadingSpinner } from "../../../Components/LoadingSpinner";

export const AddLesson = () => {
  const { user, loading, setLoading, setErr } = useContext(ContextApi);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formInfo) => {
    console.log(formInfo);
    setLoading(true);
    const email = user.email;
    const allInfo = {
      ...formInfo,
      email,
    };
    // console.log(allInfo);
    try {
      const response = await axiosSecure.post(
        "/lessons/create-lesson",
        allInfo
      );
      const lessonData = response.data.data;
      // console.log(response);
      toast.success("Lesson has been created Successfully");
      navigate(`/lessons/${lessonData.lesson_no}`);
      setErr("");
      reset();
    } catch (err) {
      const errorMessage = err.response.data.errorSources[0].message;
      if (errorMessage.includes("duplicate")) {
        return toast.error("There is already a Lesson found in this name.");
      } else {
        console.log(err.response.data.errorSources[0]);
      }
      setErr(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addProject text-black min-h-screen ">
      <SectionHead title={"Add Lesson"}></SectionHead>
      <Helmet>
        <title>Tokyo Bangla | Add Lesson</title>
      </Helmet>

      <div className="lg:w-full w-10/12 mx-auto lg:min-h-[calc(100vh-170px)] bg-cover bg-center  rounded-lg mb-5 flex flex-col items-center justify-center text-center">
        <div className="lg:w-11/12 w-full mx-auto flex gap-5 lg:flex-row-reverse items-center justify-between  text-black  p-5  rounded-xl space-y-2 font-medium md:my-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto flex flex-col gap-5 lg:w-6/12 w-full"
          >
            <div className="flex lg:flex-row flex-col gap-5 w-full campForm">
              <div className="w-full flex flex-col gap-3">
                <label className="input input-bordered flex items-center gap-2 animate__animated animate__flipInX animate__slow 1s">
                  <FaPen />
                  <input
                    className=" w-full"
                    type="text"
                    placeholder="Lesson Name"
                    name="lesson_name"
                    {...register("lesson_name", { required: true })}
                  />
                </label>
                {errors.lesson_name && (
                  <span className="text-red-600 text-xs">
                    This field is required
                  </span>
                )}
              </div>
            </div>

            <button
              className="text-white font-extrabold bg-accent hover:bg-primary px-3 py-2 hover:text-accent rounded-lg duration-300"
              type="submit"
            >
              {loading ? <LoadingSpinner /> : "Add Lesson"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
