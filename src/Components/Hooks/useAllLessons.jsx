import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useAllLessons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: lessons = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: () => lessonsData(),
  });

  const lessonsData = async () => {
    const { data } = await axiosSecure("/lessons");
    return data;
  };

  return lessons.data;
};
