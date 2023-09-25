import { useState } from "react";
import "./main.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";

const Main = () => {
  const [swiper, setSwiper] = useState(null);
  const swiperParms = {
    navigation: false,
    onSwiper: setSwiper,
    autoplay: { delay: 1000, disableOnInteraction: false },
    loop: true,
  };
  SwiperCore.use([Autoplay]);
  return (
    <div className="main-slide">
      <Swiper {...swiperParms} ref={setSwiper}>
        <SwiperSlide>
          <img src="/image/cat2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image/cat4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image/cat5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image/cat6.jpg" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Main;
