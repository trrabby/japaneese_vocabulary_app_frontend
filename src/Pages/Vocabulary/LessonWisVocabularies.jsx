/* eslint-disable react/prop-types */
import { AiTwotoneSound } from "react-icons/ai";
import { SectionHead } from "../../Components/SectionHead";

export const LessonWisVocabularies = ({ data }) => {
  function pronounceWord(wordToSpeetch) {
    const utterance = new SpeechSynthesisUtterance(wordToSpeetch);
    utterance.lang = "ja-JP"; // Japanese
    window.speechSynthesis.speak(utterance);
  }
  const { word, meaning, pronunciation, when_to_say } = data;
  return (
    <div>
      <SectionHead title={""}></SectionHead>
      <div data-aos="fade-down">
        <article className="flex flex-col md:flex-row bg-white transition shadow-sm shadow-third hover:shadow-xl cursor-text">
          {/* <div className="basis-56">
            <img alt={lesson_name} className="h-full w-full object-cover" />
          </div> */}

          <div className="flex w-full justify-between">
            <div className="border-s w-6/12 border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
              <p className="mt-2 text-4xl line-clamp-3 text-gray-700">
                Word Meaning: {meaning}
              </p>
              <p className="mt-2 flex items-center gap-4 line-clamp-3 text-xl text-gray-700">
                Pronunciation:
                <span
                  onClick={() => pronounceWord(pronunciation)}
                  className="p-2 border rounded-full hover:text-primary hover:bg-accent cursor-pointer"
                >
                  <AiTwotoneSound />
                </span>
              </p>
              <p className="mt-2 line-clamp-3 text-xl text-gray-700">
                When to say: {when_to_say}
              </p>
            </div>
            <div
              onClick={() => pronounceWord(word)}
              className="border-l-2 w-6/12 text-8xl font-extrabold cursor-pointer flex justify-center items-center border"
            >
              {word}
            </div>

            {/* <div className="flex items-center justify-around pb-5">
              <Link
                to={`/lessons/${lesson_no}`}
                className="bg-accent px-5 py-3 text-center text-xs font-bold uppercase text-white transition hover:bg-primary hover:text-black duration-700"
              >
                Details
              </Link>
            </div> */}
          </div>
        </article>
      </div>
    </div>
  );
};
