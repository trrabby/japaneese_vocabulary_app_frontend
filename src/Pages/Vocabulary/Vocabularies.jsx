import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../Components/Hooks/useAxiosSecure";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/groovyWalk.json";

export const Vocabularies = () => {
  const axiosSecure = useAxiosSecure();

  const { data: vocabularies = [], isLoading } = useQuery({
    queryKey: ["vocabularies"],
    queryFn: () => vocabulariesDataFun(),
  });

  const vocabulariesDataFun = async () => {
    const { data } = await axiosSecure("/vocabularies");
    return data;
  };
  if (isLoading) {
    return <Lottie className="h-52" animationData={groovyWalkAnimation} />;
  }
  console.log(vocabularies);
  return <div>Vocabularies</div>;
};
