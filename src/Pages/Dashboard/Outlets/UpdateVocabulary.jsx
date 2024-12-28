import { useNavigate, useParams } from "react-router-dom";
import { useAllLessons } from "../../../Components/Hooks/useAllLessons";
import { useContext, useState } from "react";
import { ContextApi } from "../../../Providers/ContextProvider";
import { useAxiosSecure } from "../../../Components/Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SectionHead } from "../../../Components/SectionHead";
import { Helmet } from "react-helmet-async";
import { FaPen } from "react-icons/fa";
import { LoadingSpinner } from "../../../Components/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../../assets/groovyWalk.json";

export const UpdateVocabulary = () => {
  const { id } = useParams();
  //   console.log(id);
  const lessons = useAllLessons();
  const [lessonNo, setLessonNo] = useState();
  const { user, loading, setLoading, setErr } = useContext(ContextApi);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const vocabularyDataFun = async () => {
    const { data } = await axiosSecure(`/vocabularies/${id}`);
    return data.data; // Assuming your API returns the vocabularies in `result`
  };

  const { data: vocabulary = [], isLoading } = useQuery({
    queryKey: ["vocabulary"],
    queryFn: vocabularyDataFun,
    keepPreviousData: true, // Keep data while fetching the next page
  });

  const {
    word,
    meaning,
    pronunciation,
    when_to_say,
    lesson_no: lessonFromServer,
  } = vocabulary;

  const handleLessonSelection = (e) => {
    const lesson_no_form = e.target.value;
    // console.log(lesson_no_form);
    setLessonNo(lesson_no_form);
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
    const lesson_no = lessonNo || lessonFromServer;
    const allInfo = {
      ...formInfo,
      email,
      lesson_no,
    };
    // console.log(allInfo);
    try {
      const response = await axiosSecure.patch(`/vocabularies/${id}`, allInfo);
      console.log(response);
      const vocabularyData = response.data.data;
      toast.success(`${response.data.message}`);
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

  if (isLoading) {
    return <Lottie className="h-52" animationData={groovyWalkAnimation} />;
  }

  return (
    <div className="addProject text-black min-h-screen ">
      <SectionHead title={"Update Vocabulary"}></SectionHead>
      <Helmet>
        <title>Tokyo Bangla | Update Vocabulary</title>
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
                    defaultValue={word}
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
                    defaultValue={meaning}
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
                    defaultValue={pronunciation}
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
                    defaultValue={when_to_say}
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
                    defaultValue={lessonFromServer}
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
              {loading ? <LoadingSpinner /> : "Update"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
