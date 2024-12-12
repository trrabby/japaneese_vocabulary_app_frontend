import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../Components/Hooks/useAxiosSecure";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/groovyWalk.json";
import { SectionHead } from "../../Components/SectionHead";
import { Lesson } from "./Lesson";

export const LessonsPage = () => {
  const axiosSecure = useAxiosSecure();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["lessons"],
    queryFn: () => lessonsDataFun(),
  });

  const lessonsDataFun = async () => {
    const { data } = await axiosSecure("/lessons");
    return data;
  };
  if (isLoading) {
    return <Lottie className="h-52" animationData={groovyWalkAnimation} />;
  }
  console.log(lessons);
  return (
    <div>
      <SectionHead
        title={"Learn our easy understandable lessons"}
        para={"Learn with us and conquer the world"}
      ></SectionHead>
      <div className="my-10 space-y-24">
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="text-center space-y-5"
        ></div>

        <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 justify-between gap-5 p-0 mb-10 lg:w-full w-10/12 mx-auto mt-5 ">
          {lessons &&
            lessons.data?.map((lesson) => {
              return <Lesson data={lesson} key={lesson._id}></Lesson>;
            })}
        </div>
      </div>
    </div>
  );
};
