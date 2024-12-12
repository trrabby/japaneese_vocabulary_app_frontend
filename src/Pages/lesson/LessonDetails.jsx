import { useParams } from "react-router-dom";
import { useAxiosSecure } from "../../Components/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/groovyWalk.json";
import { LessonWisVocabularies } from "../Vocabulary/LessonWisVocabularies";
import { SectionHead } from "../../Components/SectionHead";

export const LessonDetails = () => {
  const { lesson_no } = useParams();

  const axiosSecure = useAxiosSecure();

  const { data: lessonsData = [], isLoading } = useQuery({
    queryKey: ["lessonsData"],
    queryFn: () => lessonsDataFun(),
  });
  //   console.log(lessonsData.data);

  const lessonsDataFun = async () => {
    const { data } = await axiosSecure(`/lessons/${lesson_no}`);
    return data;
  };
  if (isLoading) {
    return <Lottie className="h-52" animationData={groovyWalkAnimation} />;
  }

  return (
    <div>
      <SectionHead
        title={lessonsData?.data?.lesson_name}
        para={`${lesson_no}, Created by: ${lessonsData?.data?.created_by?.name}`}
      ></SectionHead>
      {lessonsData.data.vocabulary.length &&
      lessonsData.data.vocabulary.length > 0
        ? lessonsData.data.vocabulary?.map((vocabulary) => {
            return (
              <LessonWisVocabularies
                data={vocabulary}
                key={vocabulary._id}
              ></LessonWisVocabularies>
            );
          })
        : "No vocabulary have been added in this lesson yet."}
    </div>
  );
};
