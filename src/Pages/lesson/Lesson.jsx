import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export const Lesson = ({ data }) => {
  const { lesson_name, lesson_no } = data;

  return (
    <div>
      <div data-aos="fade-down">
        <article className="flex flex-col md:flex-row bg-white transition shadow-sm shadow-third hover:shadow-xl cursor-text">
          {/* <div className="basis-56">
            <img alt={lesson_name} className="h-full w-full object-cover" />
          </div> */}

          <div className="flex flex-1 flex-col justify-between">
            <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
              <a>
                <h3 className="font-bold text-xl uppercase text-gray-900">
                  {lesson_name}
                </h3>
              </a>

              <p className="mt-2 text-xl line-clamp-3 text-gray-700">
                {lesson_no}
              </p>
            </div>

            <div className="flex items-center justify-around pb-5">
              <Link
                to={`/lessons/${lesson_no}`}
                className="bg-accent px-5 py-3 text-center text-xs font-bold uppercase text-white transition hover:bg-primary hover:text-black duration-700"
              >
                Details
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
