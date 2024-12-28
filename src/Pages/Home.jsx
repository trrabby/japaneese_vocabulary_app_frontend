/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { Slider } from "../Components/Swipers/Slider";
import { Link as ScrollLink } from "react-scroll";

const handleSubscribe = (e) => {
  e.preventDefault();
  const data = e.target.subscribe.value;

  if (data) {
    toast.success("Subscribed Successfully");
    e.target.subscribe.value = "";
  }
};
export const Home = () => {
  return (
    <div>
      <Helmet>
        <title>TokyoBangla | Home</title>
      </Helmet>
      {/* banner */}
      <section className="bg-gray-50 shadow-sm h-[calc(100vh-110px)] shadow-third rounded-xl my-5 ">
        <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:items-center w-full ">
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="mx-auto py-20 text-center space-y-5  w-full flex flex-col items-center "
          >
            <h1 className="text-3xl font-extrabold sm:text-5xl  ">
              Welcome to
              <strong className="font-extrabold text-third sm:block mt-5">
                {" "}
                TOKYO BANGLA{" "}
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed w-6/12 text-center">
              "Welcome to our Japanese Language Platform, your gateway to
              mastering vocabulary, lessons, and pronunciation with ease and
              fun!"
            </p>

            <div>
              <div className="mt-8 flex justify-center items-center gap-4 w-full ">
                <Link
                  data-aos="fade-right"
                  data-aos-duration="1000"
                  className="block border border-third rounded bg-third px-12 py-3 text-sm text-white font-bold hover:text-accent duration-700 shadow hover:bg-primary focus:outline-none focus:ring  sm:w-auto"
                  to={"/lessons"}
                >
                  Get Started
                </Link>

                <ScrollLink
                  data-aos="fade-left"
                  data-aos-duration="1000"
                  className="block rounded px-10 py-3 text-sm font-bold border-accent border-2 text-accent shadow hover:text-primary focus:outline-none focus:ring hover:bg-accent duration-500 sm:w-auto cursor-pointer"
                  to="footer"
                >
                  Learn More
                </ScrollLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* carousel */}
      <section>
        <div className="mx-auto max-w-screen-2xl  px-4 lg:py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:h-screen lg:grid-cols-2">
            <div className="lg:w-6/12 z-10 lg:py-16 h-full">
              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                className="object-contain h-full"
              >
                {/* Slider */}
                <Slider></Slider>
              </div>
            </div>

            <div className="lg:w-6/12 items-center text-center bg-gray-100">
              <div className="p-8 sm:p-16 lg:p-24 space-y-6">
                <h2
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="text-2xl font-bold sm:text-3xl"
                >
                  "Unlocking the World of Japanese Language and Culture"
                </h2>

                <p
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  className="my-4 text-gray-600 text-justify"
                >
                  "Learning the Japanese language is a rewarding journey that
                  opens doors to understanding Japan's rich culture, history,
                  and traditions. With its unique writing systems—Hiragana,
                  Katakana, and Kanji—Japanese offers a fascinating blend of
                  simplicity and complexity. Mastering Japanese enables deeper
                  connections with native speakers and enhances experiences when
                  traveling or working in Japan. It also provides access to a
                  wealth of literature, anime, films, and other media in their
                  original form. While the grammar structure may seem different
                  from many Western languages, its logical patterns make it
                  approachable with consistent practice. Embracing Japanese not
                  only builds linguistic skills but also fosters an appreciation
                  for a vibrant and dynamic culture."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* extra section */}

      {/* Newsletters */}
      <section
        id="subscribe"
        className="container relative flex flex-wrap lg:flex-row flex-col-reverse justify-end lg:items-center lg:mt-20 my-10 lg:my-0 gap-10"
      >
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          className="text-center sm:text-left md:col-span-4 lg:col-span-2"
        >
          <p className="text-2xl font-extrabold text-gray-900">Stay in Touch</p>

          <div className="mx-auto mt-8 max-w-md sm:ms-0">
            <p className="lg:text-left  leading-relaxed text-gray-500 ltr:sm:text-left rtl:sm:text-right">
              "Connect with us today! Reach out for inquiries, collaborations,
              or just to say hello. We're here to listen and assist."
            </p>

            <form onSubmit={handleSubscribe} className="mt-4">
              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-start">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>

                <input
                  className="lg:w-full w-10/12 mx-auto rounded-sm border-gray-200 px-6 py-3 shadow-sm shadow-accent"
                  type="email"
                  placeholder="Enter your email"
                  name="subscribe"
                  required
                />

                <button
                  className="block w-4/12 mx-auto lg:m-0 rounded-sm px-5 py-2 text-base font-bold shadow-accent shadow-lg hover:shadow-primary border duration-500 sm:w-auto "
                  type="submit"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="h-64 w-full sm:h-96 lg:w-6/12">
          <img
            alt=""
            src="https://i.ibb.co/NNwHwZ8/premium-photo-1681883457631-e21611e38757.jpg"
            className="inset-0 h-full w-full object-cover rounded-t-xl"
          />
        </div>
      </section>
    </div>
  );
};
