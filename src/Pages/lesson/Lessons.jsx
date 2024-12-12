import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../Components/Hooks/useAxiosSecure";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/groovyWalk.json";
import { SectionHead } from "../../Components/SectionHead";

export const Lessons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => lessonsData(),
  });

  const lessonsData = async () => {
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
      ></SectionHead>
      {}
    </div>
  );
};
