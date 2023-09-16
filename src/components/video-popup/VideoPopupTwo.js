import { useState } from "react";
import { Link } from "react-router-dom";
// import ModalVideo from "react-modal-video";
import clsx from "clsx";
import coverImage from "../../assets/images/longbanner.jpg";
import coverImage2 from "../../assets/images/longBanner2.jpg";

const VideoPopupTwo = ({ spaceBottomClass }) => {
  const [modalStatus, isOpen] = useState(false);
  return (
    <div className={clsx("video-popup-2", spaceBottomClass)}>
      <div
        className="video-popup-2__left bg-img"
        style={{
          backgroundImage: `url(${coverImage})`,
        }}
        // 960*451
      >
        <div className="video-popup-2__content">
          <h2 className="title mb-30">
            Clothing 2023 <br /> Collections
          </h2>
          <p className="text mb-30">
            Lorem ipsum dolor sit amet consectetur adipisici elit sed do eiusm.
          </p>
          <div className="link">
            <Link to={"/shop-products/All/All"}>Shop Now</Link>
          </div>
        </div>
        {/* <ModalVideo
          channel="youtube"
          isOpen={modalStatus}
          videoId="feOScd2HdiU"
          onClose={() => isOpen(false)}
        /> */}
        <div className="video-popup-2__button">
          <button onClick={() => isOpen(true)}>
            <img
              src={"/assets/img/icon-img/play.png"}
              alt=""
            />
          </button>
        </div>
      </div>
      <div
        className="video-popup-2__right bg-img"
        style={{
          backgroundImage: `url(${coverImage2})`,
        }}
        // 960*451
      ></div>
    </div>
  );
};

export default VideoPopupTwo;
