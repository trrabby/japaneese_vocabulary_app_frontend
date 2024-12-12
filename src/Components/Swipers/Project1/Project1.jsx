import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import img1 from '../../../assets/health bridge proj1 Pic/3.jpg'
import img2 from '../../../assets/health bridge proj1 Pic/4.jpg'
import img3 from '../../../assets/health bridge proj1 Pic/5.jpg'
import img4 from '../../../assets/health bridge proj1 Pic/7.jpg'

// Import Swiper styles
import 'swiper/css';
import './styles.css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';


// import required modules
import { Autoplay, FreeMode, Pagination, Thumbs } from 'swiper/modules';


export const Project1 = ({photos}) => {
    // console.log(photos)
    const [thumbsSwiper, setThumbsSwiper] = useState(img1);

    return (
        <div>
            <Swiper
                style={{
                    // '--swiper-navigation-color': '#204969',
                    '--swiper-pagination-color': '#204969',
                    '--swiper-navigation-height': '2px'
                }}
                loop={false}
                spaceBetween={10}
                // navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Autoplay, Pagination, FreeMode, Thumbs]}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                className="mySwiper2"
            >
                <SwiperSlide>
                    <img src={photos[0]} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={photos[1]} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={photos[2]} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={photos[3]} />
                </SwiperSlide>

            </Swiper>
            {/* <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={img1} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img2} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img3} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img4} />
                </SwiperSlide>

            </Swiper> */}
        </div>
    )
}
