// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./sliderStyles.css";
import { useRef } from "react";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";

export const Slider = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
  };
  return (
    <div className="h-full object-cover">
      <Swiper
        spaceBetween={30}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper rounded-xl"
      >
        <SwiperSlide>
          <div className="flex flex-col h-full items-end text-left space-y-2 justify-end bg-gray-400 dark:bg-gray-700 dark:text-white bg-[url('https://i.ibb.co.com/8YJgqT6/best-things-to-do-osaka-10.jpg')] w-full bg-cover bg-center lg:pt-5 lg:pb-5 p-5 rounded-lg">
            <div className="flex flex-col h-auto lg:w-8/12 w-full items-center justify-center p-5 pl-10 rounded-lg bg-[#071f1f73] space-y-1">
              <p className="lg:text-3xl md:text-xl text-base text-orange-200 font-extrabold">
                Kyoto
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col h-full items-end text-left space-y-2 justify-end bg-gray-400 dark:bg-gray-700 dark:text-white bg-[url('https://i.ibb.co.com/jbdvCpq/Tokyo.jpg')] w-full bg-cover bg-center  lg:pt-5 lg:pb-5 p-5 rounded-lg">
            <div className="flex flex-col h-auto lg:w-8/12 w-full items-cenert justify-center p-5 pl-10 rounded-lg bg-[#071f1f73] space-y-1">
              <p className="lg:text-3xl md:text-xl text-base text-orange-200 font-extrabold">
                Tokyo
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col h-full items-end text-left space-y-2 justify-end bg-gray-400 dark:bg-gray-700 dark:text-white bg-[url('https://i.ibb.co.com/DfCPbSf/monuntain-fuzi-istockphoto-1192780580-612x612.jpg')] w-full bg-cover bg-center  lg:pt-5 lg:pb-5 p-5 rounded-lg">
            <div className="flex flex-col h-auto lg:w-8/12 w-full items-cenert justify-center p-5 pl-10 rounded-lg bg-[#071f1f73] space-y-1">
              <p className="lg:text-3xl md:text-xl text-base text-orange-200 font-extrabold">
                Mount Fuji
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col h-full items-end text-left space-y-2 justify-end bg-gray-400 dark:bg-gray-700 dark:text-white bg-[url('https://i.ibb.co.com/McJQF1v/1703825874-higashiyama-the-old-town-kyoto.jpg')] w-full bg-cover bg-center  lg:pt-5 lg:pb-5 p-5 rounded-lg">
            <div className="flex flex-col h-auto lg:w-8/12 w-full items-cenert justify-center p-5 pl-10 rounded-lg bg-[#071f1f73] space-y-1">
              <p className="lg:text-3xl md:text-xl text-base text-orange-200 font-extrabold">
                Osaka
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col h-full items-end text-left space-y-2 justify-end bg-gray-400 dark:bg-gray-700 dark:text-white bg-[url('https://i.ibb.co.com/nfw0r8r/hiroshima.jpg')] w-full bg-cover bg-center  lg:pt-5 lg:pb-5 p-5 rounded-lg">
            <div className="flex flex-col h-auto lg:w-8/12 w-full items-cenert justify-center p-5 pl-10 rounded-lg bg-[#071f1f73] space-y-1">
              <p className="lg:text-3xl md:text-xl text-base text-orange-200 font-extrabold">
                Hiroshima
              </p>
            </div>
          </div>
        </SwiperSlide>
        <div className="autoplay-progress text-accent" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
};
