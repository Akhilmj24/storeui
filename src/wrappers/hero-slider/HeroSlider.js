import { EffectFade } from "swiper";
import Swiper, { SwiperSlide } from "../../components/swiper";
import HeroSliderSingle from "../../components/hero-slider/HeroSliderSingle.js";
import { silderimageData } from "../../data/hero-sliders/heroSilder";
import { useEffect, useState } from "react";
import { getApi } from "../../service/axiosCall";
import { apiBanner } from "../../service/api";

const params = {
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  modules: [EffectFade],
  loop: true,
  speed: 1000,
  navigation: true,
  autoHeight: false,
};

const HeroSlider = () => {
  const [banner, setbanner] = useState(null);
  useEffect(() => {
    getApi(apiBanner.getbanner)
      .then((res) => setbanner(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="slider-area">
      <div className="slider-active nav-style-1">
        {banner && (
          <Swiper options={params}>
            {banner.map((single, key) => (
              <SwiperSlide key={key}>
                <HeroSliderSingle data={single} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {/* imageSize 1920*850 */}
      </div>
    </div>
  );
};

export default HeroSlider;
