import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../Components/Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { pronounceWord } from "../../utils/wordPronouncer";
import { AiTwotoneSound } from "react-icons/ai";
import { FaPen } from "react-icons/fa";
import { useEffect, useState } from "react";

export const Vocabularies = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [meta, setMeta] = useState({}); // for pagination
  const [currentPage, setCurrentPage] = useState(1); // Start from page 1
  const [pages, setPages] = useState([]);

  const itemsPerPage = 10; // Define how many items per page

  const vocabulariesDataFun = async () => {
    const { data } = await axiosSecure(
      `/vocabularies?${
        searchTerm && `searchTerm=${searchTerm}`
      }&page=${currentPage}&limit=${itemsPerPage}`
    );
    setMeta(data.data.meta); // Assuming your API returns meta information
    return data.data.result; // Assuming your API returns the vocabularies in `result`
  };

  const { data: vocabularies = [], isLoading } = useQuery({
    queryKey: ["vocabularies", searchTerm, currentPage],
    queryFn: vocabulariesDataFun,
    keepPreviousData: true, // Keep data while fetching the next page
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    // console.log(e.target.value);
    setCurrentPage(1); // Reset to the first page on new search
  };
  useEffect(() => {
    const pages = [...Array(meta?.totalPage).keys()]; // Create an array of page numbers
    setPages(pages);
  }, [meta]);
  console.log(pages);
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(parseInt(currentPage) - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < meta?.totalPage) {
      setCurrentPage(parseInt(currentPage) + 1);
    }
  };

  return (
    <div className="mt-5">
      <Helmet>
        <title>Tokyo Bangla | Vocabularies</title>
      </Helmet>
      <div className="overflow-x-auto">
        <section>
          <div className="w-7/12 mx-auto flex flex-col gap-3">
            <form onKeyUp={handleSubmit}>
              <label className="input input-bordered flex items-center gap-2 animate__animated animate__flipInX animate__slow 1s">
                <FaPen />
                <input
                  className="w-full"
                  type="text"
                  placeholder="Search Vocabulary by Word | Meaning | When to say"
                  name="searchWord"
                />
              </label>
            </form>
          </div>
        </section>
        <table className="table-sm w-full text-center ">
          {/* head */}
          <thead className="underline">
            <tr>
              <th></th>
              <th>Word</th>
              <th>Meaning</th>
              <th className="text-left">When to say</th>
              <th>Prononunciation</th>
              <th>Sound</th>
            </tr>
          </thead>
          <tbody>
            {vocabularies &&
              vocabularies.map((item, i) => (
                <tr key={item._id} className="hover:bg-[#dab9b93b] border-b">
                  <th>{i + 1}.</th>
                  <td>{item.word}</td>
                  <td>{item.meaning}</td>
                  <td className="text-left">{item.when_to_say}</td>
                  <td>{item.pronunciation}</td>
                  <td
                    onClick={() => pronounceWord(item.pronunciation)}
                    className="hover:text-amber-700 cursor-pointer text-center"
                  >
                    <AiTwotoneSound className="w-10 h-8 text-center" />
                  </td>
                </tr>
              ))}
            {isLoading && (
              <tr>
                <td colSpan="6">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
        {!isLoading && (
          <div className="text-center bg-accent backdrop-blur-0 p-2 text-black flex gap-2 justify-center items-center">
            <button
              onClick={handlePrev}
              className="bg-white text-black hover:bg-fourth duration-500 mr-3 px-3 rounded-full"
            >
              Prev
            </button>
            {pages &&
              pages.map((page, i) => {
                const count = parseInt(page + 1);
                // console.log(currentPage, count);

                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(count)}
                    className={` text-black hover:bg-fourth duration-500 mr-3 px-2 rounded-full ${
                      currentPage === count
                        ? "bg-primary text-black"
                        : "bg-white"
                    }`}
                  >
                    {count}
                  </button>
                );
              })}
            <button
              onClick={handleNext}
              className="bg-white text-black hover:bg-fourth duration-500 mr-3 px-3 rounded-full"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
