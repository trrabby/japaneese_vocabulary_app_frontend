import { useContext, useState } from "react";
import { SectionHead } from "../../../Components/SectionHead";
import { Helmet } from "react-helmet-async";
import { ContextApi } from "../../../Providers/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useAxiosSecure } from "../../../Components/Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { FaPen } from "react-icons/fa";
import toast from "react-hot-toast";
import { LoadingSpinner } from "../../../Components/LoadingSpinner";
import { useAllLessons } from "../../../Components/Hooks/useAllLessons";

export const AddVocabulary = () => {
  const lessons = useAllLessons();
  const [lessonNo, setLessonNo] = useState("Lesson_1");
  const { user, loading, setLoading, setErr } = useContext(ContextApi);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleLessonSelection = (e) => {
    const lesson_no = e.target.value;
    setLessonNo(lesson_no);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formInfo) => {
    // console.log(formInfo);
    setLoading(true);
    const email = user.email;
    const lesson_no = lessonNo;
    const allInfo = {
      ...formInfo,
      email,
      lesson_no,
    };
    // console.log(allInfo);
    try {
      const response = await axiosSecure.post(
        "/vocabularies/create-vocabulary",
        allInfo
      );
      const vocabularyData = response.data.data;
      //   console.log(response);
      toast.success("Lesson has been created Successfully");
      navigate(`/lessons/${vocabularyData.lesson_no}`);
      setErr("");
      reset();
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.errorSources[0]?.message) {
        const errorMessage = err?.response?.data?.errorSources[0]?.message;
        toast.error(errorMessage);
      } else {
        if (err?.response?.data?.message && err?.response?.status) {
          return toast.error(
            `${err?.response?.status}, ${err?.response?.data?.message}`
          );
        } else {
          console.log(err);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addProject text-black min-h-screen ">
      <SectionHead title={"Add Vocabulary"}></SectionHead>
      <Helmet>
        <title>Tokyo Bangla | Add Vocabulary</title>
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
                    placeholder="Insert a Japanese Word"
                    name="word"
                    {...register("word", { required: true })}
                  />
                </label>
                {errors.word && (
                  <span className="text-red-600 text-xs">
                    This field is required
                  </span>
                )}
                <label className="input input-bordered flex items-center gap-2 animate__animated animate__flipInX animate__slow 1s">
                  <FaPen />
                  <input
                    className=" w-full"
                    type="text"
                    placeholder="Meaning of the Japanese Word"
                    name="meaning"
                    {...register("meaning", { required: true })}
                  />
                </label>
                {errors.meaning && (
                  <span className="text-red-600 text-xs">
                    This field is required
                  </span>
                )}
                <label className="input input-bordered flex items-center gap-2 animate__animated animate__flipInX animate__slow 1s">
                  <FaPen />
                  <input
                    className=" w-full"
                    type="text"
                    placeholder="Pronunciation"
                    name="pronunciation"
                    {...register("pronunciation", { required: true })}
                  />
                </label>
                {errors.pronunciation && (
                  <span className="text-red-600 text-xs">
                    This field is required
                  </span>
                )}
                <label className="input input-bordered flex items-center gap-2 animate__animated animate__flipInX animate__slow 1s">
                  <FaPen />
                  <input
                    className=" w-full"
                    type="text"
                    placeholder="When to say"
                    name="when_to_say"
                    {...register("when_to_say", { required: true })}
                  />
                </label>
                {errors.when_to_say && (
                  <span className="text-red-600 text-xs">
                    This field is required
                  </span>
                )}
                <label className="input input-bordered flex items-center gap-2 animate__animated animate__flipInX animate__slow 1s">
                  <FaPen />
                  <select
                    onChange={handleLessonSelection}
                    name="lesson_no"
                    className="w-full"
                  >
                    {lessons &&
                      lessons?.map((lesson) => {
                        return (
                          <option
                            key={lesson.lesson_no}
                            value={lesson.lesson_no}
                          >
                            {lesson.lesson_no}, {lesson.lesson_name}
                          </option>
                        );
                      })}
                  </select>
                </label>
                {errors.lesson_no && (
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
              {loading ? <LoadingSpinner /> : "Add Vocabulary"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
