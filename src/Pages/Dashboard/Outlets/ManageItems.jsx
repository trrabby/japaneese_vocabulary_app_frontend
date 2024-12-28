import { useContext, useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { GrDocumentUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ContextApi } from "../../../Providers/ContextProvider";
import { handleDelete } from "../../../utils/handleDelete";
import { useAxiosSecure } from "../../../Components/Hooks/useAxiosSecure";
import { AiTwotoneSound } from "react-icons/ai";
import { pronounceWord } from "../../../utils/wordPronouncer";
import { SectionHead } from "../../../Components/SectionHead";

export const ManageItems = () => {
  const axiosSecure = useAxiosSecure();
  const { setLoading } = useContext(ContextApi);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [meta, setMeta] = useState({}); // for pagination
  const itemsPerPage = 10; // Define how many items per page

  const vocabulariesDataFun = async () => {
    const { data } = await axiosSecure(
      `/vocabularies?page=${currentPage}&limit=${itemsPerPage}`
    );
    setMeta(data.data.meta); // Assuming your API returns meta information
    return data.data.result; // Assuming your API returns the vocabularies in `result`
  };

  const {
    data: vocabularies = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["vocabularies", currentPage],
    queryFn: vocabulariesDataFun,
    keepPreviousData: true, // Keep data while fetching the next page
  });

  useEffect(() => {
    const pages = [...Array(meta?.totalPage).keys()]; // Create an array of page numbers
    setPages(pages);
  }, [meta]);

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

  const deleteHandler = async (routeWithId) => {
    console.log(routeWithId);
    try {
      await handleDelete(routeWithId, refetch, setLoading);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mngItems min-h-screen">
      <SectionHead title={"Manage Items"}></SectionHead>

      <div>
        <Tabs>
          <div className="text-center md:w-4/12 w-8/12 mx-auto bottom-0">
            <TabList className="bottom-0 flex justify-around items-center bg-[#173e862c] rounded-2xl p-2 text-lg">
              <Tab>Lessons</Tab>
              <Tab>Vocabularies</Tab>
            </TabList>
          </div>

          <TabPanel>
            <div className="text-white">Lessons</div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col">
              <div>
                {!vocabularies && (
                  <div className="flex justify-center items-center min-h-[calc(100vh-300px)]">
                    <div className="flex justify-center items-center text-center md:text-2xl text-base gap-2">
                      <h4>Please Add Some Vocabularies First</h4>
                      <Link
                        to={"/dashboard/addVocabulary"}
                        className="p-1 px-3 border 
                       hover:bg-primary hover:text-accent mx-auto rounded-lg duration-500"
                      >
                        Add Vocabularies
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div
                className={`overflow-x-auto w-full flex flex-col ${
                  !vocabularies ? "hidden" : "flex"
                }`}
              >
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
                      <th>Update | Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vocabularies &&
                      vocabularies.map((item, i) => (
                        <tr
                          key={item._id}
                          className="hover:bg-[#dab9b93b] border-b"
                        >
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
                          <td className="flex gap-3 items-center justify-center">
                            <Link
                              to={`/dashboard/updateVocabulary/${item._id}`}
                            >
                              <button className=" bg-accent p-2 text-center text-xs font-bold  text-white hover:bg-primary hover:text-black hover:scale-105 hover:duration-500 flex items-center gap-2 justify-center">
                                {" "}
                                <GrDocumentUpdate />
                              </button>
                            </Link>
                            <button
                              onClick={() =>
                                deleteHandler(`/vocabularies/${item._id}`)
                              }
                              className="bg-accent p-2 text-center text-xs font-bold uppercase text-white transition hover:bg-red-500 hover:text-black duration-700 flex items-center gap-2"
                            >
                              <MdDeleteOutline />
                            </button>
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
                  <div className="text-center bg-accent backdrop-blur-0 p-2 text-white flex gap-2 justify-center items-center">
                    <button
                      onClick={handlePrev}
                      className="bg-white text-black hover:bg-fourth duration-500 mr-3 px-3 rounded-full"
                    >
                      Prev
                    </button>
                    {pages &&
                      pages.map((page, i) => {
                        const count = parseInt(page + 1);
                        // console.log(count, currentPage);
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
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};
