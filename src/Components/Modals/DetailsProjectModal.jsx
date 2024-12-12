/* eslint-disable react/prop-types */
import { Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
import "../Modals/styles.css";
import { useAxiosSecure } from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const DetailsProjectModal = ({ setIsOpen, isOpen, projId }) => {
  // console.log(projId)

  const axiosSecure = useAxiosSecure();

  const { data: projectDetails = [] } = useQuery({
    queryKey: ["projectDetails", projId],
    queryFn: () => projData(),
  });
  // console.log(data)

  const projData = async () => {
    const { data } = await axiosSecure(`/projects/${projId}`);
    return data;
  };

  // console.log(projectDetails)

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className=" flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-in duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-out duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-100"
            >
              <DialogPanel
                className={` md:w-8/12 h-auto rounded-2xl bg-white p-6 text-left shadow-xl transition-all`}
              >
                <DialogTitle
                  as="h3"
                  className="lg:text-2xl md:text-lg text-base uppercase underline text-center leading-6 text-amber-600 font-extrabold"
                >
                  Project Details
                </DialogTitle>
                <div className=" mt-4 mx-auto text-justify space-y-3 flex flex-col items-start justify-start">
                  <h1 className="lg:text-2xl md:text-xl text-base font-extrabold capitalize">
                    <span className="text-amber-500">Project Name:</span>{" "}
                    {projectDetails?.projTitle}
                  </h1>
                  <h3 className="md:text-lg text-xs capitalize">
                    <span className="text-amber-500 font-extrabold ">
                      Idea:
                    </span>{" "}
                    {projectDetails?.shortDescription}
                  </h3>
                  <h4 className="text-sm overflow-y-auto max-h-56 bg-scroll">
                    <span className="text-amber-500 font-extrabold">
                      Description:{" "}
                    </span>
                    {projectDetails?.descriptionOfProject}
                  </h4>
                  <div className="flex w-full justify-center items-center">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="md:px-5 md:py-2 px-3 py-2 bg-red-600 hover:bg-primary hover:text-red-600 text-white duration-300 rounded-md font-bold text-right"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DetailsProjectModal;
